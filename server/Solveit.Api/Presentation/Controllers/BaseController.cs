using MediatR;
using Microsoft.AspNetCore.Mvc;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Presentation.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected IActionResult HandleResponse<T>(Result<T> response)
        {
            if (!response.IsSuccess)
            {
                return StatusCode(response.StatusCode ?? StatusCodes.Status400BadRequest, new
                {
                    response.Errors
                });
            }
            return StatusCode(response.StatusCode ?? StatusCodes.Status200OK, response.Value);
        }

        protected static class Policies
        {
            public const string BasicUser = "BasicUser";
            public const string SilverUser = "SilverUser";
            public const string Admin = "Admin";
        }
    }
}
