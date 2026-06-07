using MediatR;
using Solveit.Api.Core.Application.Extensions;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Users
{
    public class GetUserByIdQueryHandler(IAppUserService userService)
        : BaseQueryHandler, IRequestHandler<GetUserByIdRequestQuery, Result<AppUserListDto>>
    {
        public async Task<Result<AppUserListDto>> Handle(GetUserByIdRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await userService.GetAppUserByIdAsync(request.Id);
            return response.ToResult();
        }
    }

    public class GetUserByIdRequestQuery : IRequest<Result<AppUserListDto>>
    {
        public string Id { get; set; }
    }
}
