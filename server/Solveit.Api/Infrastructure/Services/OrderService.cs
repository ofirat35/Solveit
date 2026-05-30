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

        public async Task<Result<OrderListDto>> GetOrderByIdAsync(Guid id)
        {
            var application = await GetSingleAsync(a => a.Id == id);
            var provider = await userService.GetSingleAsync(_ => _.Id == application.ProviderId);

            var serviceApplication = mapper.Map<OrderListDto>(application);
            serviceApplication.Provider = mapper.Map<AppUserListDto>(provider);

            return SuccessResult(serviceApplication);
        }

        public async Task<Result<bool>> CancelOrderAsync(Guid orderId)
        {
            var serviceApplication = await GetSingleAsync(_ => _.Id == orderId);
            serviceApplication.OrderStatus = OrderStatusEnum.Canceled;
            var result = await SaveChangesAsync(serviceApplication, DbOperation.Create);

            return result ? SuccessResult(true) : FailResult<bool>(ExceptionMessages.DbOperationFailed);
        }
    }
}
