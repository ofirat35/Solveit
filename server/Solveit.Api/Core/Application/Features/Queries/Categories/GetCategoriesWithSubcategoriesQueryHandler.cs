using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Categories;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Categories
{
    public class GetCategoriesWithSubcategoriesQueryHandler(
        ICategoryService categoryService,
        IMapper mapper
        )
        : BaseQueryHandler, IRequestHandler<GetCategoriesWithSubcategoriesRequestQuery, Result<List<CategoryListDto>>>
    {
        public async Task<Result<List<CategoryListDto>>> Handle(GetCategoriesWithSubcategoriesRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await categoryService.GetAll().Include(c => c.Subcategories).ToListAsync();
            return ToSuccessResult(mapper.Map<List<CategoryListDto>>(response));
        }
    }

    public class GetCategoriesWithSubcategoriesRequestQuery : IRequest<Result<List<CategoryListDto>>>
    {
    }
}
