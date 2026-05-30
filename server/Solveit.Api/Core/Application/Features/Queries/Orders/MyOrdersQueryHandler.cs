using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Orders;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Orders
{
    public class MyOrdersQueryHandler(IOrderService orderService)
        : BaseQueryHandler, IRequestHandler<MyOrdersRequestQuery, PaginatedItemsViewModel<OrderListDto>>
    {
        public async Task<PaginatedItemsViewModel<OrderListDto>> Handle(MyOrdersRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await orderService.GetMyOrdersAsync(request.Page, request.PageSize);
            return response;
        }
    }

    public class MyOrdersRequestQuery : PaginationRequestModel, IRequest<PaginatedItemsViewModel<OrderListDto>>
    {
    }
}
