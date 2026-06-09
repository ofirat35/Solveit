using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.Orders;
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
            serviceToAdd.Status = ServiceStatusEnum.Pending;
            await AddAsync(serviceToAdd);
            var response = await SaveChangesAsync(serviceToAdd, DbOperation.Create);

            return response
                ? SuccessResult(true)
                : FailResult<bool>([ExceptionMessages.DbOperationFailed], StatusCodes.Status500InternalServerError);
        }

        public async Task<Result<bool>> UpdateServiceAsync(ServiceUpdateDto service)
        {
            var existingService = await GetByIdAsync(service.Id);
            if (existingService is null)
                return FailResult<bool>([DbOperation.Query], StatusCodes.Status404NotFound);
            if (existingService.ProviderId != CurrentUserId)
                return FailResult<bool>([ExceptionMessages.ForbiddenException], StatusCodes.Status403Forbidden);

            mapper.Map(service, existingService);
            var response = await SaveChangesAsync(existingService, DbOperation.Update);

            return response
                ? SuccessResult(true)
                : FailResult<bool>([ExceptionMessages.DbOperationFailed], StatusCodes.Status500InternalServerError);
        }

        public async Task<PaginatedItemsViewModel<ServiceListDto>> GetUserServicesAsync(string userId, int page, int pageSize)
        {
            var baseQuery = GetAll().Where(s => s.ProviderId == userId);
            var totalCount = await baseQuery.CountAsync();
            if (totalCount == 0) return new PaginatedItemsViewModel<ServiceListDto>(page, pageSize, 0, []);

            var services = baseQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            if (CurrentUserId != userId || CurrentUserId == null)
                services = services.Where(_ => _.Status == ServiceStatusEnum.Active);

            var serviceDtos = mapper.Map<List<ServiceListDto>>(await services.ToListAsync());

            var ordersGroup = DbContext.Orders
                .OrderByDescending(o => o.CreatedDate)
                .Include(o => o.User);

            foreach (var dto in serviceDtos)
            {
                dto.TotalOrdersCount = await ordersGroup.Where(o => o.ServiceId == dto.Id).CountAsync();
                dto.Orders = mapper.Map<List<OrderListDto>>(
                    await ordersGroup.Where(o => o.ServiceId == dto.Id).Take(2).ToListAsync()
                );
            }

            return new PaginatedItemsViewModel<ServiceListDto>(
                page,
                pageSize,
                totalCount,
                serviceDtos);
        }

        public async Task<PaginatedItemsViewModel<ServiceListDto>> GetServicesBySubcategoryIdAsync(int subcategoryId, int page, int pageSize)
        {
            var query = GetAll()
                .Where(_ => _.SubcategoryId == subcategoryId && _.Status == ServiceStatusEnum.Active)
                .Include(_ => _.Provider);
            var totalCount = await query.CountAsync();
            if (totalCount == 0) return new PaginatedItemsViewModel<ServiceListDto>(page, pageSize, 0, []);

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

        public async Task<Result<ServiceListDto>> GetServiceByIdAsync(int serviceId)
        {
            var service = await GetAll()
                .Where(_ => _.Id == serviceId)
                .Include(_ => _.Provider)
                .FirstOrDefaultAsync();
            if (service is null)
                return FailResult<ServiceListDto>([DbOperation.Query], StatusCodes.Status404NotFound);

            var mappedService = mapper.Map<ServiceListDto>(service);
            mappedService.TotalOrdersCount = await DbContext.Orders.Where(_ => _.ServiceId == serviceId).CountAsync();

            return SuccessResult(mappedService);
        }


        public async Task<Result<bool>> ApplyForServiceAsync(int serviceId)
        {
            IServiceBase service = await GetSingleAsync(_ => _.Id == serviceId);
            if (service is null) return FailResult<bool>([DbOperation.Query], StatusCodes.Status404NotFound);

            var order = mapper.Map<Order>(service);
            order.Id = Guid.NewGuid();
            order.UserId = CurrentUserId;
            order.ServiceId = serviceId;

            await DbContext.AddAsync(order);
            var result = await SaveChangesAsync(order, DbOperation.Create);

            return result ? SuccessResult(true) : FailResult<bool>([ExceptionMessages.DbOperationFailed]);
        }
    }
}
