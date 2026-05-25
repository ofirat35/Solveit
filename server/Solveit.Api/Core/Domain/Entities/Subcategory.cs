namespace Solveit.Api.Core.Domain.Entities
{
    public class Subcategory : AuditableEntity<int>
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
