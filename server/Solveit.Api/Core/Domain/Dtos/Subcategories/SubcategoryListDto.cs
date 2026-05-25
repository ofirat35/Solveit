using Solveit.Api.Core.Domain.Entities;

namespace Solveit.Api.Core.Domain.Dtos.Subcategories
{
    public class SubcategoryListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public int CategoryId { get; set; }
        public DateTime CreatedDate { get; set; } 
        public DateTime? UpdatedDate { get; set; }
    }
}
