using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Services
{
    public class GetUserServicesQueryHandler(IServiceProviderService serviceProviderService)
        : BaseQueryHandler, IRequestHandler<GetUserServicesRequestQuery, PaginatedItemsViewModel<ServiceListDto>>
    {
        public async Task<PaginatedItemsViewModel<ServiceListDto>> Handle(GetUserServicesRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await serviceProviderService.GetUserServicesAsync(request.UserId, request.Page, request.PageSize);
            return response;
        }
    }

    public class GetUserServicesRequestQuery : PaginationRequestModel, IRequest<PaginatedItemsViewModel<ServiceListDto>>
    {
        public string UserId { get; set; }
    }
}
