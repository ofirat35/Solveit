using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solveit.Api.Core.Application.Features.Commands.Users;
using Solveit.Api.Core.Application.Features.Queries.Users;

namespace Solveit.Api.Presentation.Controllers
{
    [Authorize(Policies.BasicUser)]
    public class UsersController : BaseController
    {
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById([FromRoute] GetUserByIdRequestQuery query)
        {
            return HandleResponse(await Mediator.Send(query));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            return HandleResponse(await Mediator.Send(new UserDeleteRequestCommand()));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UserUpdateRequestCommand command)
        {
            return HandleResponse(await Mediator.Send(command));
        }

        [HttpPost]
        public async Task<IActionResult> SetIsServiceProvider([FromBody] SetServiceProviderRequestCommand command)
        {
            return HandleResponse(await Mediator.Send(command));
        }

        [HttpGet("{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckIsServiceProvider([FromRoute] CheckUserIsServiceProviderRequestQuery query)
        {
            return HandleResponse(await Mediator.Send(query));
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] UploadUserImageRequestCommand command)
        {
            return HandleResponse(await Mediator.Send(command));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserImage([FromQuery] GetUserImageRequestQuery query)
        {
            return HandleResponse(await Mediator.Send(query));
        }
    }
}
