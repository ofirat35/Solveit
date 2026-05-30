using Solveit.Api.Core.Application.Enums;

namespace Solveit.Api.Core.Domain.Entities
{
    public class Order : AuditableEntity<Guid>, IHasSoftDelete, IServiceBase
    {
        // To keep the previous state
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public PricingEnum Pricing { get; set; }
        public float MinPrice { get; set; }
        public float? MaxPrice { get; set; }
        public string ProviderId { get; set; }

        public string UserId { get; set; }
        public AppUser User { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; }
        public OrderStatusEnum OrderStatus { get; set; }
        public bool IsValid { get; set; }
    }
}
