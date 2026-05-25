using AutoMapper;
using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;
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
            await AddAsync(mappedUser);
            var response = await SaveChangesAsync(user, DbOperation.Create);

            return response
                ? SuccessResult(true)
                : FailResult<bool>(ExceptionMessages.DbOperationFailed, StatusCodes.Status500InternalServerError);
        }


        public async Task<Result<bool>> DeleteAppUserAsync(string id)
        {
            var user = await GetByIdAsync(id, true);

            if (user is null)
            {
                LogEntityNotFound<AppUser>(id);
                return FailResult<bool>(ExceptionMessages.EntityNotFound, StatusCodes.Status404NotFound);
            }

            await cacheService.RemoveAsync(GetUserCacheKey(id));
            await DeleteByIdAsync(id);
            var response = await SaveChangesAsync(user, DbOperation.Delete);

            return response
               ? SuccessResult(true)
               : FailResult<bool>(ExceptionMessages.DbOperationFailed, StatusCodes.Status500InternalServerError);
        }

        public async Task<Result<AppUserListDto>> GetAppUserByIdAsync(string id)
        {
            var cacheKey = GetUserCacheKey(id);
            var cachedData = await cacheService.GetAsync<AppUserListDto>(cacheKey);

            if (cachedData is null)
            {
                var user = await GetByIdAsync(id);

                if (user is null)
                {
                    LogEntityNotFound<AppUser>(id);
                    return FailResult<AppUserListDto>(ExceptionMessages.EntityNotFound, StatusCodes.Status404NotFound);
                }

                cachedData = mapper.Map<AppUserListDto>(user);
                await cacheService.SetAsync(cacheKey, cachedData, TimeSpan.FromMinutes(30));
            }

            return SuccessResult(cachedData);
        }

        public async Task<Result<bool>> UpdateAppUserAsync(AppUserUpdateDto userDto)
        {
            await cacheService.RemoveAsync(GetUserCacheKey(userDto.Id));
            var user = await GetByIdAsync(userDto.Id);
            if (user is null)
            {
                LogEntityNotFound<AppUser>(userDto.Id);
                return FailResult<bool>(ExceptionMessages.EntityNotFound, StatusCodes.Status404NotFound);
            }

            mapper.Map(userDto, user);

            var response = await SaveChangesAsync(user, DbOperation.Update);

            return response
                ? SuccessResult(true)
                : FailResult<bool>(ExceptionMessages.DbOperationFailed, StatusCodes.Status500InternalServerError);
        }

        public async Task<Result<bool>> SetUserIsServiceProviderAsync(string userId, bool isServiceProvider)
        {
            await cacheService.RemoveAsync(GetUserCacheKey(userId));
            var user = await GetByIdAsync(userId);
            if (user is null)
            {
                LogEntityNotFound<AppUser>(userId);
                return FailResult<bool>(ExceptionMessages.EntityNotFound, StatusCodes.Status404NotFound);
            }

            user.IsServiceProvider = isServiceProvider;
            var response = await SaveChangesAsync(user, DbOperation.Update);

            return response
                ? SuccessResult(true)
                : FailResult<bool>(ExceptionMessages.DbOperationFailed, StatusCodes.Status500InternalServerError);
        }

        public async Task<Result<bool>> CheckUserIsServiceProviderAsync(string userId)
        {
            var cacheKey = GetUserCacheKey(userId);
            var cachedData = await cacheService.GetAsync<AppUserListDto>(cacheKey);

            if (cachedData is null)
            {
                var user = await GetByIdAsync(userId);

                if (user is null)
                {
                    LogEntityNotFound<AppUser>(userId);
                    return FailResult<bool>(ExceptionMessages.EntityNotFound, StatusCodes.Status404NotFound);
                }

                cachedData = mapper.Map<AppUserListDto>(user);
                await cacheService.SetAsync(cacheKey, cachedData, TimeSpan.FromMinutes(30));

                return SuccessResult(user.IsServiceProvider);
            }

            return SuccessResult(cachedData.IsServiceProvider);
        }
    }
}
