using Solveit.Api.Core.Application.Repositories;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Services
{
    public interface IServiceProviderService : IGenericRepository<Service, int>
    {
        Task<Result<bool>> CreateServiceAsync(ServiceCreateDto service);
        Task<Result<bool>> UpdateServiceAsync(ServiceUpdateDto service);
        Task<PaginatedItemsViewModel<ServiceListDto>> GetUserServicesAsync(string userId, int page, int pageSize);
        Task<PaginatedItemsViewModel<ServiceListDto>> GetServicesBySubcategoryIdAsync(int subcategoryId, int page, int pageSize);
        Task<Result<ServiceListDto>> GetServiceByIdAsync(int serviceId);
        Task<Result<bool>> ApplyForServiceAsync(int serviceId);
    }
}
