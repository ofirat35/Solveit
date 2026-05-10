using Solveit.Api.Core.Application.Repositories;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Services
{
    public interface IAppUserService : IGenericRepository<AppUser, string>
    {
        Task<Result<AppUserListDto>> GetAppUserByIdAsync(string id);
        Task<Result<bool>> UpdateAppUserAsync(AppUserUpdateDto user);
        Task<Result<bool>> DeleteAppUserAsync(string id);
        Task<Result<bool>> CreateAppUserAsync(AppUserCreateDto user);
    }
}
