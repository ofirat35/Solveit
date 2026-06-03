using AutoMapper;
using MediatR;
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Dtos.Auth;
using Solveit.Api.Core.Domain.Models;
using Solveit.Api.Extensions;

namespace Solveit.Api.Core.Application.Features.Commands.Users
{
    public class UserUpdateCommandHandler(
        IAppUserService userService,
        IKeycloakService keycloakService,
        IHttpContextAccessor httpContext,
        IMapper mapper)
        : BaseCommandHandler, IRequestHandler<UserUpdateRequestCommand, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(UserUpdateRequestCommand request, CancellationToken cancellationToken)
        {
            if(request.Id != httpContext.GetUserId())
                return ToFailResult<Unit>(["Unauthorized"], StatusCodes.Status401Unauthorized);

            var keyCloakModel = mapper.Map<KeyCloakUserUpdateDto>(request);
            var userModel = mapper.Map<AppUserUpdateDto>(request);

            var keyCloakResponse = await keycloakService.UpdateUserAsync(keyCloakModel, request.Id);
            if (!keyCloakResponse.IsSuccess)
                return ToFailResult<Unit>(keyCloakResponse.Errors, keyCloakResponse.StatusCode);

            var userResponse = await userService.UpdateAppUserAsync(userModel);
            if (!userResponse.IsSuccess)
                return ToFailResult<Unit>(userResponse.Errors, userResponse.StatusCode);

            return ToSuccessResult(Unit.Value);
        }
    }

    public class UserUpdateRequestCommand : IRequest<Result<Unit>>
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
