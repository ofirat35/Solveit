using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Commands.Users
{
    public class UserDeleteCommandHandler(IAppUserService userService, IKeycloakService keycloakService)
        : BaseCommandHandler, IRequestHandler<UserDeleteRequestCommand, ResponseModel<Unit>>
    {
        public async Task<ResponseModel<Unit>> Handle(UserDeleteRequestCommand request, CancellationToken cancellationToken)
        {
            var keyCloakResponse = await keycloakService.DeleteUserAsync(request.Id);
            if (!keyCloakResponse.IsSuccess)
                return ToFailResponseModel<Unit>(keyCloakResponse.Error, keyCloakResponse.StatusCode);

            var userResponse = await userService.DeleteAppUserAsync(request.Id);
            if (!userResponse.IsSuccess)
                return ToFailResponseModel<Unit>(userResponse.Error, userResponse.StatusCode);

            return ToSuccessResponseModel(Unit.Value);
        }
    }

    public class UserDeleteRequestCommand : IRequest<ResponseModel<Unit>>
    {
        public string Id { get; set; }
    }
}
