using MediatR;
using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Categories
{
    public class GetSubcategoriesByCategoryIdQueryHandler(ISubcategoryService subcategoryService)
        : BaseQueryHandler, IRequestHandler<GetSubcategoriesByCategoryIdRequestQuery, Result<List<Subcategory>>>
    {
        public async Task<Result<List<Subcategory>>> Handle(GetSubcategoriesByCategoryIdRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await subcategoryService.GetAll().Where(_ => _.CategoryId == request.Id).ToListAsync(cancellationToken);
            return ToSuccessResult(response);
        }
    }

    public class GetSubcategoriesByCategoryIdRequestQuery : IRequest<Result<List<Subcategory>>>
    {
        public int Id { get; set; }
    }
}
