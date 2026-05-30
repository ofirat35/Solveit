using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Commands.Orders
{
    public class CancelOrderCommandHandler(IOrderService orderService)
        : BaseCommandHandler, IRequestHandler<CancelOrderRequestCommand, ResponseModel<bool>>
    {
        public async Task<ResponseModel<bool>> Handle(CancelOrderRequestCommand request, CancellationToken cancellationToken)
        {
            var response = await orderService.CancelOrderAsync(request.OrderId);
            return ToSuccessResponseModel(response.Value, StatusCodes.Status200OK);
        }
    }

    public class CancelOrderRequestCommand : IRequest<ResponseModel<bool>>
    {
        public Guid OrderId { get; set; }
    }
}
