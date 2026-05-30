using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
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
        IAppUserService userService,
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
            var baseQuery = GetAll().Where(s => s.ProviderId == CurrentUserId);
            var totalCount = await baseQuery.CountAsync();

            var services = await baseQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var serviceDtos = mapper.Map<List<ServiceListDto>>(services);
            var serviceIds = serviceDtos.Select(s => s.Id).ToList();

            var ordersGroup = await DbContext.Orders
                .Where(o => serviceIds.Contains(o.ServiceId))
                .Include(o => o.User)
                .AsNoTracking()
                .ToListAsync();

            foreach (var dto in serviceDtos)
            {
                var allServiceOrders = ordersGroup.Where(o => o.ServiceId == dto.Id).ToList();

                dto.TotalOrdersCount = allServiceOrders.Count;

                dto.Orders = mapper.Map<List<OrderListDto>>(
                    allServiceOrders.OrderByDescending(o => o.CreatedDate).Take(2).ToList()
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

        public async Task<Result<ServiceListDto>> GetServicesByIdAsync(int serviceId)
        {
            var service = await GetAll()
                .Where(_ => _.Id == serviceId && _.Status == ServiceStatusEnum.Active)
                .Include(_ => _.Provider)
                .FirstOrDefaultAsync();
            if (service is null)
                return FailResult<ServiceListDto>(DbOperation.Query, StatusCodes.Status404NotFound);


            return SuccessResult(mapper.Map<ServiceListDto>(service));
        }

        public async Task<Result<bool>> ApplyForServiceAsync(int serviceId)
        {
            IServiceBase service = await GetSingleAsync(_ => _.Id == serviceId);
            if (service is null) return FailResult<bool>(DbOperation.Query, StatusCodes.Status404NotFound);

            var order = mapper.Map<Order>(service);
            order.Id = Guid.NewGuid();
            order.UserId = CurrentUserId;
            order.ServiceId = serviceId;

            await DbContext.AddAsync(order);
            var result = await SaveChangesAsync(order, DbOperation.Create);

            return result ? SuccessResult(true) : FailResult<bool>(ExceptionMessages.DbOperationFailed);
        }
    }
}
