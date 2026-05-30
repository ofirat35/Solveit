using Microsoft.AspNetCore.Mvc;
using Solveit.Api.Core.Application.Features.Commands.Orders;
using Solveit.Api.Core.Application.Features.Commands.Services;
using Solveit.Api.Core.Application.Features.Queries.Orders;
using Solveit.Api.Core.Application.Features.Queries.Services;

namespace Solveit.Api.Presentation.Controllers
{
    public class OrdersController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> MyOrders([FromQuery] int page, [FromQuery] int pageSize)
        {
            return Ok(await Mediator.Send(new MyOrdersRequestQuery { Page = page, PageSize = pageSize }));
        }

        [HttpGet]
        public async Task<IActionResult> GetOrderById([FromQuery] Guid orderId)
        {
            return HandleResponse(await Mediator.Send(new GetOrderByIdRequestQuery { OrderId = orderId }));
        }

        [HttpPost]
        public async Task<IActionResult> CancelOrder([FromBody] CancelOrderRequestCommand order)
        {
            return HandleResponse(await Mediator.Send(order));
        }
    }
}
