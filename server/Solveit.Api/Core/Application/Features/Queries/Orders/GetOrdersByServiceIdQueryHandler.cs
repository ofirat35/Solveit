using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Orders;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Orders
{
    public class GetOrdersByServiceIdQueryHandler(IOrderService orderService)
        : BaseQueryHandler, IRequestHandler<GetOrdersByServiceIdRequestQuery, PaginatedItemsViewModel<OrderListDto>>
    {
        public async Task<PaginatedItemsViewModel<OrderListDto>> Handle(GetOrdersByServiceIdRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await orderService.GetOrdersByServiceId(request.ServiceId, request.Page, request.PageSize);
            return response;
        }
    }

    public class GetOrdersByServiceIdRequestQuery : PaginationRequestModel, IRequest<PaginatedItemsViewModel<OrderListDto>>
    {
        public int ServiceId { get; set; }
    }
}
