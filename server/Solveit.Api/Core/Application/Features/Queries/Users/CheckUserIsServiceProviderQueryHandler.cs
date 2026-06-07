using MediatR;
using Solveit.Api.Core.Application.Extensions;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Users
{
    public class CheckUserIsServiceProviderQueryHandler(IAppUserService userService)
        : BaseQueryHandler, IRequestHandler<CheckUserIsServiceProviderRequestQuery, Result<bool>>
    {
        public async Task<Result<bool>> Handle(CheckUserIsServiceProviderRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await userService.CheckUserIsServiceProviderAsync(request.UserId);
            return response.ToResult();
        }
    }

    public class CheckUserIsServiceProviderRequestQuery : IRequest<Result<bool>>
    {
        public string UserId { get; set; }
    }
}
