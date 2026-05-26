using Microsoft.AspNetCore.Mvc;
using Solveit.Api.Core.Application.Features.Commands.Users;
using Solveit.Api.Core.Application.Features.Queries.Users;

namespace Solveit.Api.Presentation.Controllers
{
    //[Authorize]
    public class UsersController : BaseController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] GetUserByIdRequestQuery query)
        {
            return HandleResponse(await Mediator.Send(query));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] UserDeleteRequestCommand command)
        {
            return HandleResponse(await Mediator.Send(command));
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
        public async Task<IActionResult> GetUserImage([FromQuery] GetUserImageRequestQuery query)
        {
            return HandleResponse(await Mediator.Send(query));
        }
    }
}
