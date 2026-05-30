using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Dtos.Orders;
using Solveit.Api.Core.Domain.Entities;

namespace Solveit.Api.Core.Domain.Dtos.Services
{
    public class ServiceListDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public PricingEnum Pricing { get; set; }
        public float MinPrice { get; set; }
        public float? MaxPrice { get; set; }
        public ServiceStatusEnum Status { get; set; }
        public bool IsActive { get; set; }
        public string ProviderId { get; set; }
        public AppUserListDto Provider { get; set; }
        public List<OrderListDto> Orders { get; set; }
        public int TotalOrdersCount{ get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
