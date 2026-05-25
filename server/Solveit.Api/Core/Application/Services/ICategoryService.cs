using Solveit.Api.Core.Application.Repositories;
using Solveit.Api.Core.Domain.Entities;

namespace Solveit.Api.Core.Application.Services
{
    public interface ICategoryService : IGenericRepository<Category, int>
    {
        Task UploadCategoryImageAsync(IFormFile file, int categoryId);
    }
}
