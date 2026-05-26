using MediatR;
using Solveit.Api.Core.Application.Services;

namespace Solveit.Api.Core.Application.Features.Commands.Categories
{
    public class UploadCategoryImageQueryHandler(ICategoryService categoryService)
        : BaseCommandHandler, IRequestHandler<UploadCategoryImageRequestCommand, Unit>
    {
        public async Task<Unit> Handle(UploadCategoryImageRequestCommand request, CancellationToken cancellationToken)
        {
            await categoryService.UploadCategoryImageAsync(request.File, request.CategoryId);
            return Unit.Value;
        }
    }

    public class UploadCategoryImageRequestCommand : IRequest<Unit>
    {
        public int CategoryId { get; set; }
        public IFormFile File { get; set; }
    }
}
