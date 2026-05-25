using Solveit.Api.Core.Application.Repositories;
using Solveit.Api.Core.Domain.Entities;

namespace Solveit.Api.Core.Application.Services
{
    public interface ICompanyService : IGenericRepository<AppUser, string>
    {
        //Task<Result<CompanyUserListDto>> GetCompanyUserByIdAsync(string id);
        //Task<Result<bool>> UpdateCompanyUserAsync(CompanyUserUpdateDto user);
        //Task<Result<bool>> DeleteCompanyUserAsync(string id);
        //Task<Result<bool>> CreateCompanyUserAsync(CompanyUserCreateDto user);
    }
}
