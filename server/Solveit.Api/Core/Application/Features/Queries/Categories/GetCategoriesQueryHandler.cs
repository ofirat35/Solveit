using MediatR;
using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Categories
{
    public class MyServicesQueryHandler(ICategoryService categoryService)
        : BaseQueryHandler, IRequestHandler<GetCategoriesRequestQuery, Result<List<Category>>>
    {
        public async Task<Result<List<Category>>> Handle(GetCategoriesRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await categoryService.GetAll().ToListAsync(cancellationToken);
            return ToSuccessResult(response);
        }
    }

    public class GetCategoriesRequestQuery : IRequest<Result<List<Category>>>
    {
    }
}
