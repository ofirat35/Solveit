namespace Solveit.Api.Core.Domain.Entities.Files
{
    public class UserFile : AppFile
    {
        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}
