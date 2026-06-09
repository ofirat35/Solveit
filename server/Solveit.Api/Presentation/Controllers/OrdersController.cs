using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solveit.Api.Core.Application.Features.Commands.Orders;
using Solveit.Api.Core.Application.Features.Queries.Orders;

namespace Solveit.Api.Presentation.Controllers
{
    [Authorize(Policies.BasicUser)]
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

        [HttpGet]
        public async Task<IActionResult> GetOrdersByServiceId([FromQuery] int serviceId, [FromQuery] int page, [FromQuery] int pageSize)
        {
            return Ok(await Mediator.Send(new GetOrdersByServiceIdRequestQuery { ServiceId = serviceId, Page = page, PageSize = pageSize }));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOrderStatus([FromBody] UpdateOrderStatusRequestCommand order)
        {
            return HandleResponse(await Mediator.Send(order));
        }
    }
}
