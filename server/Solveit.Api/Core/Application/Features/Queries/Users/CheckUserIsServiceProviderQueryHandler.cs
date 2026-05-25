using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Users
{
    public class CheckUserIsServiceProviderQueryHandler(IAppUserService userService)
        : BaseQueryHandler, IRequestHandler<CheckUserIsServiceProviderRequestQuery, ResponseModel<bool>>
    {
        public async Task<ResponseModel<bool>> Handle(CheckUserIsServiceProviderRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await userService.CheckUserIsServiceProviderAsync(request.UserId);
            return response.IsSuccess
                 ? ToSuccessResponseModel(response.Value)
                 : ToFailResponseModel<bool>(response.Error, StatusCodes.Status404NotFound);
        }
    }

    public class CheckUserIsServiceProviderRequestQuery : IRequest<ResponseModel<bool>>
    {
        public string UserId { get; set; }
    }
}
