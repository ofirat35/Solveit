namespace Solveit.Api.Core.Domain.Entities
{
    public class Category : AuditableEntity<int>
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public List<Subcategory> Subcategories { get; set; }
        public List<Service> Services { get; set; }
    }
}
