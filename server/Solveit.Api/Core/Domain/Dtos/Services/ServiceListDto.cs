using Solveit.Api.Core.Application.Enums;

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
        public string UserId { get; set; }
        public DateTime CreatedDate { get; set; } 
        public DateTime? UpdatedDate { get; set; }
    }
}
