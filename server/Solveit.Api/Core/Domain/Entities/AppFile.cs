namespace Solveit.Api.Core.Domain.Entities
{
    public class AppFile : BaseEntity<Guid>, IHasCreatedDate
    {
        public string Bucket { get; set; }
        public string ObjectName { get; set; }
        public long Size { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
