using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;
using Solveit.Api.Infrastructure.Context;
using System.Reactive;

namespace Solveit.Api.Infrastructure.Services
{
    public class SubcategoryService(
        SolveitAppContext dbContext,
        IHttpContextAccessor httpContext,
        IFileService fileService,
        ILogger<AppUserService> logger)
        : BaseService<SolveitAppContext, Subcategory, int>(dbContext, logger, httpContext, EventIds.SubcategoryService),
            ISubcategoryService
    {
        public async Task<Result<Subcategory>> UploadSubcategoryImageAsync(IFormFile file, int subcategoryId)
        {
            var subcategory = await GetByIdAsync(subcategoryId);
            if (subcategory is null) return FailResult<Subcategory>([ExceptionMessages.EntityNotFound], StatusCodes.Status404NotFound);
            var filePath = await fileService.UploadFileAsync(file, "Subcategories");
            subcategory.ImageUrl = filePath;
            var saveResult = await SaveChangesAsync(subcategory, DbOperation.Update);

            return saveResult 
                ? SuccessResult(subcategory) 
                : FailResult<Subcategory>([ExceptionMessages.DbOperationFailed], StatusCodes.Status500InternalServerError);
        }
    }
}
