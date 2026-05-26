using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Services
{
    public class GetServicesQueryHandler(IServiceProviderService serviceProviderService)
        : BaseQueryHandler, IRequestHandler<GetServicesRequestQuery, PaginatedItemsViewModel<ServiceListDto>>
    {
        public async Task<PaginatedItemsViewModel<ServiceListDto>> Handle(GetServicesRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await serviceProviderService
                .GetServicesBySubcategoryIdAsync(request.SubcategoryId, request.Page, request.PageSize);
            return response;
        }
    }

    public class GetServicesRequestQuery : PaginationRequestModel, IRequest<PaginatedItemsViewModel<ServiceListDto>>
    {
        public int SubcategoryId { get; set; }
    }
}
