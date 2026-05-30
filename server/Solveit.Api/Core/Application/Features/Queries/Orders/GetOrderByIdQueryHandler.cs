using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Orders;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Orders
{
    public class GetOrderByIdQueryHandler(IOrderService orderService)
        : BaseQueryHandler, IRequestHandler<GetOrderByIdRequestQuery, ResponseModel<OrderListDto>>
    {
        public async Task<ResponseModel<OrderListDto>> Handle(GetOrderByIdRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await orderService.GetOrderByIdAsync(request.OrderId);
            return ToSuccessResponseModel(response.Value);
        }
    }

    public class GetOrderByIdRequestQuery : IRequest<ResponseModel<OrderListDto>>
    {
        public Guid OrderId { get; set; }
    }
}
