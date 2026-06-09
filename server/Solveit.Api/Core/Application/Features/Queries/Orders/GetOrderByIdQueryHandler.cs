using MediatR;
using Solveit.Api.Core.Application.Extensions;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Orders;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Orders
{
    public class GetOrderByIdQueryHandler(IOrderService orderService)
        : BaseQueryHandler, IRequestHandler<GetOrderByIdRequestQuery, Result<OrderListDto>>
    {
        public async Task<Result<OrderListDto>> Handle(GetOrderByIdRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await orderService.GetOrderByIdAsync(request.OrderId);
            return response.ToResult();
        }
    }

    public class GetOrderByIdRequestQuery : IRequest<Result<OrderListDto>>
    {
        public Guid OrderId { get; set; }
    }
}
