using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Users
{
    public class GetUserByIdQueryHandler(IAppUserService userService)
        : BaseQueryHandler, IRequestHandler<GetUserByIdRequestQuery, ResponseModel<AppUserListDto>>
    {
        public async Task<ResponseModel<AppUserListDto>> Handle(GetUserByIdRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await userService.GetAppUserByIdAsync(request.Id);
            return response.IsSuccess
                 ? ToSuccessResponseModel(response.Value)
                 : ToFailResponseModel<AppUserListDto>(response.Error, StatusCodes.Status404NotFound);
        }
    }

    public class GetUserByIdRequestQuery : IRequest<ResponseModel<AppUserListDto>>
    {
        public string Id { get; set; }
    }
}
