using AutoMapper;
using MediatR;
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Extensions;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Commands.Services
{
    public class CreateServiceCommandHandler(
        IServiceProviderService serviceProviderService,
        IMapper mapper)
        : BaseCommandHandler, IRequestHandler<CreateServiceRequestCommand, Result<bool>>
    {
        public async Task<Result<bool>> Handle(CreateServiceRequestCommand request, CancellationToken cancellationToken)
        {
            var response = await serviceProviderService.CreateServiceAsync(mapper.Map<ServiceCreateDto>(request));
            return response.ToResult();
        }
    }

    public class CreateServiceRequestCommand : IRequest<Result<bool>>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public PricingEnum Pricing { get; set; }
        public float MinPrice { get; set; }
        public float? MaxPrice { get; set; }
        public string ProviderId { get; set; }
    }
}
