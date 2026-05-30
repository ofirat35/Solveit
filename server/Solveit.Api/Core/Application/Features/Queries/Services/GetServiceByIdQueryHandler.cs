using MediatR;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Services
{
    public class GetServiceByIdQueryHandler(IServiceProviderService serviceProviderService)
        : BaseQueryHandler, IRequestHandler<GetServiceByIdRequestQuery, ResponseModel<ServiceListDto>>
    {
        public async Task<ResponseModel<ServiceListDto>> Handle(GetServiceByIdRequestQuery request, CancellationToken cancellationToken)
        {
            var response = await serviceProviderService
                .GetServicesByIdAsync(request.ServiceId);
            return ToSuccessResponseModel(response.Value, StatusCodes.Status200OK);
        }
    }

    public class GetServiceByIdRequestQuery : IRequest<ResponseModel<ServiceListDto>>
    {
        public int ServiceId { get; set; }
    }
}
