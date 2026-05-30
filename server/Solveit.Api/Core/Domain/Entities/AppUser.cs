
using Solveit.Api.Core.Application.Enums;
using Solveit.Api.Core.Domain.Entities.Files;

namespace Solveit.Api.Core.Domain.Entities
{
    public class AppUser : AuditableEntity<string>, IHasSoftDelete
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public GenderEnum Gender { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public DateOnly? Birthday { get; set; }
        public Guid? ImageId { get; set; }
        public UserFile? Image { get; set; }
        public List<Order> Orders { get; set; }
        public bool IsServiceProvider { get; set; }
        public AppUserStatus Status { get; set; }
        public bool IsValid { get; set; }
    }
}
