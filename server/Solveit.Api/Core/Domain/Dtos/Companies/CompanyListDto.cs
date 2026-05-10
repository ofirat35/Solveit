using Solveit.Api.Core.Application.Enums;

namespace Solveit.Api.Core.Domain.Dtos.Companies
{
    public class CompanyListDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public GenderEnum Gender { get; set; }
        public string Email { get; set; }
        public DateOnly Birthday { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
