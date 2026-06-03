using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Services
{
    //public class MyServicesQueryHandler(IServiceProviderService serviceProviderService)
    //    : BaseQueryHandler, IRequestHandler<MyServicesRequestQuery, PaginatedItemsViewModel<ServiceListDto>>
    //{
    //    public async Task<PaginatedItemsViewModel<ServiceListDto>> Handle(MyServicesRequestQuery request, CancellationToken cancellationToken)
    //    {
    //        var response = await serviceProviderService.GetUserServicesAsync(request.Page, request.PageSize);
    //        return response;
    //    }
    //}

    //public class MyServicesRequestQuery : PaginationRequestModel, IRequest<PaginatedItemsViewModel<ServiceListDto>>
    //{
    //}
}
