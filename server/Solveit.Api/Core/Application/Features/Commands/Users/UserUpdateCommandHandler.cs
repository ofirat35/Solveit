using AutoMapper;
using MediatR;
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Dtos.Auth;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Commands.Users
{
    public class UserUpdateCommandHandler(
        IAppUserService userService,
        IKeycloakService keycloakService,
        IMapper mapper)
        : BaseCommandHandler, IRequestHandler<UserUpdateRequestCommand, ResponseModel<Unit>>
    {
        public async Task<ResponseModel<Unit>> Handle(UserUpdateRequestCommand request, CancellationToken cancellationToken)
        {
            var keyCloakModel = mapper.Map<KeyCloakUserUpdateDto>(request);
            var userModel = mapper.Map<AppUserUpdateDto>(request);

            var keyCloakResponse = await keycloakService.UpdateUserAsync(keyCloakModel, request.Id);
            if (!keyCloakResponse.IsSuccess)
                return ToFailResponseModel<Unit>(keyCloakResponse.Error, keyCloakResponse.StatusCode);

            var userResponse = await userService.UpdateAppUserAsync(userModel);
            if (!userResponse.IsSuccess)
                return ToFailResponseModel<Unit>(userResponse.Error, userResponse.StatusCode);

            return ToSuccessResponseModel(Unit.Value);
        }
    }

    public class UserUpdateRequestCommand : IRequest<ResponseModel<Unit>>
    {
        public string Id { get; set; }
        // Auth
        public string Email { get; set; }

        // Profile
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public GenderEnum Gender { get; set; }
        public string? Phone { get; set; }
        public DateOnly Birthday { get; set; }
    }
}
