using AutoMapper;
using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;
using Solveit.Api.Extensions;
using Solveit.Api.Infrastructure.Context;

namespace Solveit.Api.Infrastructure.Services
{
    public class AppUserService(
        SolveitAppContext dbContext,
        IAppCacheService cacheService,
        IMapper mapper,
        IHttpContextAccessor httpContext,
        ILogger<AppUserService> logger)
        : BaseService<SolveitAppContext, AppUser, string>(dbContext, logger, httpContext, EventIds.AppUserService),
            IAppUserService
    {
        private static string GetUserCacheKey(string id) => $"User:{id}";

        public async Task<Result<bool>> CreateAppUserAsync(AppUserCreateDto user)
        {
            var mappedUser = mapper.Map<AppUser>(user);
            mappedUser.FirstName = mappedUser.FirstName.Trim();
            mappedUser.LastName = mappedUser.LastName.Trim();
            mappedUser.CountryCode = mappedUser.CountryCode = mappedUser.CountryCode.Trim().ToUpper();
            await AddAsync(mappedUser);
            var response = await SaveChangesAsync(user, DbOperation.Create);

            return response
                ? SuccessResult(true)
                : FailResult<bool>([ExceptionMessages.DbOperationFailed], StatusCodes.Status500InternalServerError);
        }


        public async Task<Result<bool>> DeleteAppUserAsync(string id)
        {
            var user = await GetByIdAsync(id, true);

            if (user is null)
            {
                LogEntityNotFound<AppUser>(id);
                return FailResult<bool>([ExceptionMessages.EntityNotFound], StatusCodes.Status404NotFound);
            }

            await cacheService.RemoveAsync(GetUserCacheKey(id));
            await DeleteByIdAsync(id);
            var response = await SaveChangesAsync(user, DbOperation.Delete);

            return response
               ? SuccessResult(true)
               : FailResult<bool>([ExceptionMessages.DbOperationFailed], StatusCodes.Status500InternalServerError);
        }

        public async Task<Result<AppUserListDto>> GetAppUserByIdAsync(string id)
        {
            var cacheKey = GetUserCacheKey(id);
            var user = await cacheService.GetOrSetAsync(cacheKey, async () =>
            {
                var user = await GetByIdAsync(id);
                return user is null ? null : mapper.Map<AppUserListDto>(user);
            }, TimeSpan.FromMinutes(30));

            if (user is null)
            {
                LogEntityNotFound<AppUser>(id);
                return FailResult<AppUserListDto>([ExceptionMessages.EntityNotFound], StatusCodes.Status404NotFound);
            }

            return SuccessResult(user);
        }

        public async Task<Result<bool>> UpdateAppUserAsync(AppUserUpdateDto userDto)
        {
            var user = await GetByIdAsync(userDto.Id);
            if (user is null)
            {
                LogEntityNotFound<AppUser>(userDto.Id);
                return FailResult<bool>([ExceptionMessages.EntityNotFound], StatusCodes.Status404NotFound);
            }

            await cacheService.RemoveAsync(GetUserCacheKey(userDto.Id));
            mapper.Map(userDto, user);

            var response = await SaveChangesAsync(user, DbOperation.Update);

            return response
                ? SuccessResult(true)
                : FailResult<bool>([ExceptionMessages.DbOperationFailed], StatusCodes.Status500InternalServerError);
        }

        public async Task<Result<bool>> SetUserIsServiceProviderAsync(string userId, bool isServiceProvider)
        {
            var user = await GetByIdAsync(userId);
            if (user is null)
            {
                LogEntityNotFound<AppUser>(userId);
                return FailResult<bool>([ExceptionMessages.EntityNotFound], StatusCodes.Status404NotFound);
            }

            await cacheService.RemoveAsync(GetUserCacheKey(userId));
            user.IsServiceProvider = isServiceProvider;
            var response = await SaveChangesAsync(user, DbOperation.Update);

            return response
                ? SuccessResult(true)
                : FailResult<bool>([ExceptionMessages.DbOperationFailed], StatusCodes.Status500InternalServerError);
        }

        public async Task<Result<bool>> CheckUserIsServiceProviderAsync(string userId)
        {
            var cacheKey = GetUserCacheKey(userId);
            var user = await cacheService.GetOrSetAsync(cacheKey, async () =>
            {
                var user = await GetByIdAsync(userId);
                return user is null ? null : mapper.Map<AppUserListDto>(user);
            }, TimeSpan.FromMinutes(30));

            if (user is null)
            {
                LogEntityNotFound<AppUser>(userId);
                return FailResult<bool>([ExceptionMessages.EntityNotFound], StatusCodes.Status404NotFound);
            }

            return SuccessResult(user.IsServiceProvider);
        }
    }
}
