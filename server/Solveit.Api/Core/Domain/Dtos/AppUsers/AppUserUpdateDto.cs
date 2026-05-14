using Solveit.Api.Core.Application.Enums;

namespace Solveit.Api.Core.Domain.Dtos.AppUsers
{
    public class AppUserUpdateDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public GenderEnum Gender { get; set; }
        public string Email { get; set; } = default!;
        public string? Phone { get; set; }
        public DateOnly Birthday { get; set; }
    }
}
