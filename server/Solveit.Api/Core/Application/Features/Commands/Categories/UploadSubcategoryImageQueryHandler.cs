using AutoMapper;
using MediatR;
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Models;
using Solveit.Api.Infrastructure.Services;

namespace Solveit.Api.Core.Application.Features.Commands.Categories
{
    public class UploadSubcategoryImageQueryHandler(ISubcategoryService subcategoryService)
        : BaseCommandHandler, IRequestHandler<UploadSubcategoryImageRequestCommand, Unit>
    {
        public async Task<Unit> Handle(UploadSubcategoryImageRequestCommand request, CancellationToken cancellationToken)
        {
            await subcategoryService.UploadSubcategoryImageAsync(request.File, request.SubcategoryId);
            return Unit.Value;
        }
    }

    public class UploadSubcategoryImageRequestCommand : IRequest<Unit>
    {
        public int SubcategoryId { get; set; }
        public IFormFile File { get; set; }
    }
}
