
using Solveit.Api.Core.Application.Enums;

namespace Solveit.Api.Core.Domain.Entities
{
    public class Service : AuditableEntity<int>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public PricingEnum Pricing { get; set; }
        public float MinPrice { get; set; }
        public float? MaxPrice { get; set; }
        public ServiceStatusEnum Status { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public Category Category { get; set; }
        public Subcategory Subcategory { get; set; }
    }
}
