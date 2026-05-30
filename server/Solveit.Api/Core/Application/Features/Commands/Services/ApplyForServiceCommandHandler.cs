using AutoMapper;
using MediatR;
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Commands.Services
{
    public class ApplyForServiceCommandHandler(IServiceProviderService serviceProviderService)
        : BaseCommandHandler, IRequestHandler<ApplyForServiceRequestCommand, ResponseModel<bool>>
    {
        public async Task<ResponseModel<bool>> Handle(ApplyForServiceRequestCommand request, CancellationToken cancellationToken)
        {
            var response = await serviceProviderService.ApplyForServiceAsync(request.ServiceId);
            return ToSuccessResponseModel(response.Value, StatusCodes.Status201Created);
        }
    }

    public class ApplyForServiceRequestCommand : IRequest<ResponseModel<bool>>
    {
        public int ServiceId { get; set; }
    }
}
