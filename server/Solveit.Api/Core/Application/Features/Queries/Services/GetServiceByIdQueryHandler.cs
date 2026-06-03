using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Services
{
    public class GetServiceByIdQueryHandler(IServiceProviderService serviceProviderService)
        : BaseQueryHandler, IRequestHandler<GetServiceByIdRequestQuery, Result<ServiceListDto>>
    {
        public async Task<Result<ServiceListDto>> Handle(GetServiceByIdRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await serviceProviderService.GetServiceByIdAsync(request.ServiceId);
            return ToSuccessResult(response.Value, StatusCodes.Status200OK);
        }
    }

    public class GetServiceByIdRequestQuery : IRequest<Result<ServiceListDto>>
    {
        public int ServiceId { get; set; }
    }
}
