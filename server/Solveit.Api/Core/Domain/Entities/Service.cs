
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Domain.Entities.Files;

namespace Solveit.Api.Core.Domain.Entities
{
    public class Service : AuditableEntity<int>, IServiceBase
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public PricingEnum Pricing { get; set; }
        public float MinPrice { get; set; }
        public float? MaxPrice { get; set; }
        public ServiceStatusEnum Status { get; set; }
        public string ProviderId { get; set; }

        public AppUser Provider { get; set; }
        public List<Order> Orders { get; set; }
        public Category Category { get; set; }
        public Subcategory Subcategory { get; set; }
        public List<ServiceFile> Images { get; set; }
    }

    public interface IServiceBase
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public PricingEnum Pricing { get; set; }
        public float MinPrice { get; set; }
        public float? MaxPrice { get; set; }
        public string ProviderId { get; set; }
    }
}
