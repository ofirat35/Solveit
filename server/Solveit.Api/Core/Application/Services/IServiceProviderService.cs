using Solveit.Api.Core.Application.Repositories;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Services
{
    public interface IServiceProviderService : IGenericRepository<Service, int>
    {
        Task<Result<bool>> CreateServiceAsync(ServiceCreateDto service);
        Task<PaginatedItemsViewModel<ServiceListDto>> GetMyServicesAsync(int page, int pageSize);
    }
}
