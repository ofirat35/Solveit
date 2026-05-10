
using Solveit.Api.Core.Application.Enums;

namespace Solveit.Api.Core.Domain.Entities
{
    public class Company : AuditableEntity<string>, IHasSoftDelete
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public GenderEnum Gender { get; set; }
        public string Email { get; set; }
        public string? Country { get; set; }
        public DateOnly? Birthday { get; set; }
        public bool IsValid { get; set; }
    }
}
