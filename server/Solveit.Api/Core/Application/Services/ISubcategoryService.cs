using Solveit.Api.Core.Application.Repositories;
using Solveit.Api.Core.Domain.Entities;

namespace Solveit.Api.Core.Application.Services
{
    public interface ISubcategoryService : IGenericRepository<Subcategory, int>
    {
        Task UploadSubcategoryImageAsync(IFormFile file, int subcategoryId);
    }
}
