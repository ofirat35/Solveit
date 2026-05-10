using Solveit.Api.Core.Application.Enums;

namespace Solveit.Api.Core.Domain.Dtos.Companies
{
    public class CompanyCreateDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public GenderEnum Gender { get; set; }
        public string? Bio { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; } = default!;
        public DateOnly Birthday { get; set; }
    }
}
