using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Models;
using Solveit.Api.Extensions;

namespace Solveit.Api.Core.Application.Features.Commands.Users
{
    public class SetServiceProviderCommandHandler(
        IAppUserService userService,
        IHttpContextAccessor httpContext
        )
        : BaseCommandHandler, IRequestHandler<SetServiceProviderRequestCommand, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(SetServiceProviderRequestCommand request, CancellationToken cancellationToken)
        {
            var userResponse = await userService.SetUserIsServiceProviderAsync(httpContext.GetUserId(), request.IsServiceProvider);
            if (!userResponse.IsSuccess)
                return ToFailResult<Unit>(userResponse.Errors, userResponse.StatusCode);

            return ToSuccessResult(Unit.Value);
        }
    }

    public class SetServiceProviderRequestCommand : IRequest<Result<Unit>>
    {
        public bool IsServiceProvider { get; set; }
    }
}
