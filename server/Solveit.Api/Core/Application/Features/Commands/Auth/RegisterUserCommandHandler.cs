using AutoMapper;
using MediatR;
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Dtos.Auth;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Commands.Auth
{
    public class RegisterUserCommandHandler(
        IKeycloakService keyCloakService,
        IAppUserService userService,
        IMapper mapper)
        : BaseCommandHandler, IRequestHandler<RegisterUserRequestCommand, ResponseModel<bool>>
    {
        public async Task<ResponseModel<bool>> Handle(RegisterUserRequestCommand request, CancellationToken cancellationToken)
        {
            var keyCloakUserId = "";
            var keyCloakModel = mapper.Map<KeycloakUserCreateRequestDto>(request);
            var appModel = mapper.Map<AppUserCreateDto>(request);
            try
            {
                var keycloakResponse = await keyCloakService.CreateUserAsync(keyCloakModel);
                if (!keycloakResponse.IsSuccess)
                {
                    return ToFailResponseModel<bool>(
                    keycloakResponse.Error, keycloakResponse.StatusCode!.Value);
                }
                keyCloakUserId = keycloakResponse.Value!;

                await keyCloakService.AssignClientRoleAsync(keyCloakUserId, "user");

                appModel.Id = keyCloakUserId;
                var userResponse = await userService.CreateAppUserAsync(appModel);
                if (!userResponse.IsSuccess)
                {
                    await keyCloakService.DeleteUserAsync(keyCloakUserId);
                    return ToFailResponseModel<bool>(userResponse.Error, ResolveStatusCode(userResponse));
                }

                return ToSuccessResponseModel(userResponse.Value, StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                return ToFailResponseModel<bool>(ex.Message, StatusCodes.Status500InternalServerError);
            }
        }

    }

    public class RegisterUserRequestCommand : IRequest<ResponseModel<bool>>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public GenderEnum Gender { get; set; }
        public string? Bio { get; set; }
        public string? Phone { get; set; }
        public string Email { get; set; } = default!;
        public DateOnly Birthday { get; set; }
        public string Password { get; set; }
    }
}
