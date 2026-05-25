using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Infrastructure.Context;

namespace Solveit.Api.Infrastructure.Services
{
    public class SubcategoryService(
        SolveitAppContext dbContext,
        IHttpContextAccessor httpContext,
        IFileService fileService,
        ILogger<AppUserService> logger)
        : BaseService<SolveitAppContext, Subcategory, int>(dbContext, logger, httpContext, EventIds.CategoryService),
            ISubcategoryService
    {
        public async Task UploadSubcategoryImageAsync(IFormFile file, int subcategoryId)
        {
            var filePath = await fileService.UploadFileAsync(file, "Subcategories");
            var subcategory = await GetByIdAsync(subcategoryId);
            subcategory.ImageUrl = filePath;
            await SaveChangesAsync(subcategory, DbOperation.Update);
        }
    }
}
