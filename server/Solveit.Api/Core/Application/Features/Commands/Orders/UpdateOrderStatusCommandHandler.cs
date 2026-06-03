using MediatR;
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Extensions;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Commands.Orders
{
    public class UpdateOrderStatusCommandHandler(IOrderService orderService)
        : BaseCommandHandler, IRequestHandler<UpdateOrderStatusRequestCommand, Result<bool>>
    {
        public async Task<Result<bool>> Handle(UpdateOrderStatusRequestCommand request, CancellationToken cancellationToken)
        {
            var response = await orderService.UpdateOrderStausAsync(request.OrderId, request.OrderStatus);
            return response.ToResult();
        }
    }

    public class UpdateOrderStatusRequestCommand : IRequest<Result<bool>>
    {
        public Guid OrderId { get; set; }
        public OrderStatusEnum OrderStatus { get; set; }
    }
}
