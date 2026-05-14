using Solveit.Api.Core.Application.Features.Commands.Users;
using Solveit.Api.Core.Application.Features.Queries.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    }
}
