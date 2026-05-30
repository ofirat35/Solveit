using Microsoft.AspNetCore.Mvc;
using Solveit.Api.Core.Application.Features.Commands.Services;
using Solveit.Api.Core.Application.Features.Queries.Orders;
using Solveit.Api.Core.Application.Features.Queries.Services;

namespace Solveit.Api.Presentation.Controllers
{
    public class ServiceProvidersController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateServiceRequestCommand command)
        {
            return HandleResponse(await Mediator.Send(command));
        }

        [HttpGet]
        public async Task<IActionResult> MyServices([FromQuery] int page, [FromQuery] int pageSize)
        {
            return Ok(await Mediator.Send(new MyServicesRequestQuery { Page = page, PageSize = pageSize }));
        }


        [HttpGet]
        public async Task<IActionResult> GetOrderById([FromQuery] Guid orderId)
        {
            return HandleResponse(await Mediator.Send(new GetOrderByIdRequestQuery { OrderId = orderId }));
        }

        [HttpGet]
        public async Task<IActionResult> ServicesBySubcategoryId([FromQuery] int subcategoryId, [FromQuery] int page, [FromQuery] int pageSize)
        {
            return Ok(await Mediator.Send(new GetServicesRequestQuery { SubcategoryId = subcategoryId, Page = page, PageSize = pageSize }));
        }

        [HttpGet]
        public async Task<IActionResult> GetServiceById([FromQuery] int serviceId)
        {
            return HandleResponse(await Mediator.Send(new GetServiceByIdRequestQuery { ServiceId = serviceId }));
        }

        [HttpPost]
        public async Task<IActionResult> ApplyForService([FromBody] ApplyForServiceRequestCommand command)
        {
            return HandleResponse(await Mediator.Send(command));
        }
    }
}
