using MediatR;
using Solveit.Api.Core.Application.Extensions;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Commands.Services
{
    public class ApplyForServiceCommandHandler(IServiceProviderService serviceProviderService)
        : BaseCommandHandler, IRequestHandler<ApplyForServiceRequestCommand, Result<bool>>
    {
        public async Task<Result<bool>> Handle(ApplyForServiceRequestCommand request, CancellationToken cancellationToken)
        {
            var response = await serviceProviderService.ApplyForServiceAsync(request.ServiceId);
            return response.ToResult();
        }
    }

    public class ApplyForServiceRequestCommand : IRequest<Result<bool>>
    {
        public int ServiceId { get; set; }
    }
}
