using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Models;
using Solveit.Api.Extensions;

namespace Solveit.Api.Core.Application.Features.Commands.Users
{
    public class UserDeleteCommandHandler(
        IAppUserService userService,
        IKeycloakService keycloakService,
        IHttpContextAccessor httpContext)
        : BaseCommandHandler, IRequestHandler<UserDeleteRequestCommand, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(UserDeleteRequestCommand request, CancellationToken cancellationToken)
        {
            var userId = httpContext.GetUserId();
            var keyCloakResponse = await keycloakService.DeleteUserAsync(userId);
            if (!keyCloakResponse.IsSuccess)
                return ToFailResult<Unit>(keyCloakResponse.Errors, keyCloakResponse.StatusCode);

            var userResponse = await userService.DeleteAppUserAsync(userId);
            if (!userResponse.IsSuccess)
                return ToFailResult<Unit>(userResponse.Errors, userResponse.StatusCode);

            return ToSuccessResult(Unit.Value);
        }
    }

    public class UserDeleteRequestCommand : IRequest<Result<Unit>>
    {
    }
}
