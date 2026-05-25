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
        : BaseCommandHandler, IRequestHandler<SetServiceProviderRequestCommand, ResponseModel<Unit>>
    {
        public async Task<ResponseModel<Unit>> Handle(SetServiceProviderRequestCommand request, CancellationToken cancellationToken)
        {
            var userResponse = await userService.SetUserIsServiceProviderAsync(httpContext.GetUserId(), request.IsServiceProvider);
            if (!userResponse.IsSuccess)
                return ToFailResponseModel<Unit>(userResponse.Error, userResponse.StatusCode);

            return ToSuccessResponseModel(Unit.Value);
        }
    }

    public class SetServiceProviderRequestCommand : IRequest<ResponseModel<Unit>>
    {
        public bool IsServiceProvider { get; set; }
    }
}
