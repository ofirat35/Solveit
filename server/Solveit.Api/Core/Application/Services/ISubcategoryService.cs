using Solveit.Api.Core.Application.Repositories;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Services
{
    public interface ISubcategoryService : IGenericRepository<Subcategory, int>
    {
        Task<Result<Subcategory>> UploadSubcategoryImageAsync(IFormFile file, int subcategoryId);
    }
}
