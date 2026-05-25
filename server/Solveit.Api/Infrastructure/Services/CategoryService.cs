using Azure.Core;
using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Infrastructure.Context;

namespace Solveit.Api.Infrastructure.Services
{
    public class CategoryService(
        SolveitAppContext dbContext,
        IHttpContextAccessor httpContext,
        IFileService fileService,
        ILogger<AppUserService> logger)
        : BaseService<SolveitAppContext, Category, int>(dbContext, logger, httpContext, EventIds.CategoryService),
            ICategoryService
    {
        public async Task UploadCategoryImageAsync(IFormFile file, int categoryId)
        {
            var filePath = await fileService.UploadFileAsync(file, "Categories");
            var category = await GetByIdAsync(categoryId);
            category.ImageUrl = filePath;
            await SaveChangesAsync(category, DbOperation.Update);
        }
    }
}
