namespace Solveit.Api.Core.Domain.Entities.Files
{
    public class ServiceFile : AppFile
    {
        public int ServiceId { get; set; }
        public Service Service { get; set; }
    }
}
