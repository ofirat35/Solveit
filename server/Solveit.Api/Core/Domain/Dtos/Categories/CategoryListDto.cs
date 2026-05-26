using Solveit.Api.Core.Domain.Dtos.Subcategories;

namespace Solveit.Api.Core.Domain.Dtos.Categories
{
    public class CategoryListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public List<SubcategoryListDto> Subcategories { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
