using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Application.Repositories;
using Solveit.Api.Core.Domain.Dtos.Orders;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Services
{
    public interface IOrderService : IGenericRepository<Order, Guid>
    {
        Task<PaginatedItemsViewModel<OrderListDto>> GetMyOrdersAsync(int page, int pageSize);
        Task<Result<OrderListDto>> GetOrderByIdAsync(Guid id);
        Task<PaginatedItemsViewModel<OrderListDto>> GetOrdersByServiceId(int serviceId, int page, int pageSize);
        Task<Result<bool>> UpdateOrderStausAsync(Guid orderId, OrderStatusEnum orderStatus);
    }
}
