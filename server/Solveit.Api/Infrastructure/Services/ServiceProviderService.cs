using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;
using Solveit.Api.Infrastructure.Context;

namespace Solveit.Api.Infrastructure.Services
{
    public class ServiceProviderService(
        SolveitAppContext dbContext,
        IHttpContextAccessor httpContext,
        ILogger<AppUserService> logger,
        IMapper mapper)
        : BaseService<SolveitAppContext, Service, int>(dbContext, logger, httpContext, EventIds.ServiceProviderService),
            IServiceProviderService
    {
        public async Task<Result<bool>> CreateServiceAsync(ServiceCreateDto service)
        {
            if (service.MaxPrice.HasValue && service.MaxPrice.Value < service.MinPrice)
                service.MaxPrice = null;

            var serviceToAdd = mapper.Map<Service>(service);
            await AddAsync(serviceToAdd);
            var response = await SaveChangesAsync(serviceToAdd, DbOperation.Create);

            return response
                ? SuccessResult(true)
                : FailResult<bool>(ExceptionMessages.DbOperationFailed, StatusCodes.Status500InternalServerError);
        }

        public async Task<PaginatedItemsViewModel<ServiceListDto>> GetMyServicesAsync(int page, int pageSize)
        {
            var query = GetAll();
            var totalCount = await query.CountAsync();
            var services = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            var serviceDtos = mapper.Map<List<ServiceListDto>>(services);
            var result = new PaginatedItemsViewModel<ServiceListDto>(
                page,
                pageSize,
                totalCount,
                serviceDtos);

            return result;
        }

        public async Task<PaginatedItemsViewModel<ServiceListDto>> GetServicesBySubcategoryIdAsync(int subcategoryId, int page, int pageSize)
        {
            var query = GetAll()
                .Where(_ => _.SubcategoryId == subcategoryId && _.Status == ServiceStatusEnum.Active)
                .Include(_ => _.User);
            var totalCount = await query.CountAsync();
            var services = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            var serviceDtos = mapper.Map<List<ServiceListDto>>(services);
            var result = new PaginatedItemsViewModel<ServiceListDto>(
                page,
                pageSize,
                totalCount,
                serviceDtos);

            return result;
        }
    }
}
