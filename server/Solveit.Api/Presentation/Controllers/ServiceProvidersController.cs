using Microsoft.AspNetCore.Mvc;
using Solveit.Api.Core.Application.Features.Commands.Services;
using Solveit.Api.Core.Application.Features.Queries.Categories;
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

    }
}
