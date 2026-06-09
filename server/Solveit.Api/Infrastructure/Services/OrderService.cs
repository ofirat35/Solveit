using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Dtos.Orders;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;
using Solveit.Api.Infrastructure.Context;

namespace Solveit.Api.Infrastructure.Services
{
    public class OrderService(
        SolveitAppContext dbContext,
        IAppUserService userService,
        IMapper mapper,
        IHttpContextAccessor httpContext,
        ILogger<AppUserService> logger)
        : BaseService<SolveitAppContext, Order, Guid>(dbContext, logger, httpContext, EventIds.OrderService),
            IOrderService
    {

        public async Task<PaginatedItemsViewModel<OrderListDto>> GetMyOrdersAsync(int page, int pageSize)
        {
            var query = GetAll().Where(a => a.UserId == CurrentUserId);
            var totalCount = await query.CountAsync();
            if (totalCount == 0) return new PaginatedItemsViewModel<OrderListDto>(page, pageSize, 0, []);

            var applications = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var providerIds = applications.Select(a => a.ProviderId).Distinct().ToList();
            var providers = await userService.GetAll().Where(_ => providerIds.Contains(_.Id)).ToListAsync();
            var applicationList = new List<OrderListDto>();
            foreach (var application in applications)
            {
                var dto = mapper.Map<OrderListDto>(application);
                dto.Provider = mapper.Map<AppUserListDto>(providers.First(_ => _.Id == application.ProviderId));
                applicationList.Add(dto);
            }
            var result = new PaginatedItemsViewModel<OrderListDto>(
                page,
                pageSize,
                totalCount,
                applicationList);

            return result;
        }

        public async Task<PaginatedItemsViewModel<OrderListDto>> GetOrdersByServiceId(int serviceId, int page, int pageSize)
        {
            var query = DbContext.Orders
                .Where(_ => _.ServiceId == serviceId)
                .Include(_ => _.User);
            var totalCount = await query.CountAsync();
            if (totalCount == 0) return new PaginatedItemsViewModel<OrderListDto>(page, pageSize, 0, []);

            var orders = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            var orderDtos = mapper.Map<List<OrderListDto>>(orders);
            var result = new PaginatedItemsViewModel<OrderListDto>(
                page,
                pageSize,
                totalCount,
                orderDtos);

            return result;
        }

        public async Task<Result<OrderListDto>> GetOrderByIdAsync(Guid id)
        {
            var order = await GetAll()
                .Where(a => a.Id == id)
                .Include(_ => _.User)
                .Include(_ => _.Provider)
                .FirstOrDefaultAsync();
            if (order is null)
                return FailResult<OrderListDto>([DbOperation.Query], StatusCodes.Status404NotFound);

            return SuccessResult(mapper.Map<OrderListDto>(order));
        }

        public async Task<Result<bool>> UpdateOrderStausAsync(Guid orderId, OrderStatusEnum orderStatus)
        {
            var order = await GetSingleAsync(_ => _.Id == orderId && (_.ProviderId == CurrentUserId || _.UserId == CurrentUserId));
            if (order is null)
                return FailResult<bool>([DbOperation.Query], StatusCodes.Status404NotFound);

            order.OrderStatus = orderStatus;
            var result = await SaveChangesAsync(order, DbOperation.Update);

            return result ? SuccessResult(true) : FailResult<bool>([ExceptionMessages.DbOperationFailed]);
        }
    }
}
