using System.Text.Json.Serialization;

namespace Solveit.Api.Core.Domain.Dtos.Auth
{
    public class KeyCloakUserUpdateDto
    {
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; } = default!;
        [JsonPropertyName("lastName")]
        public string LastName { get; set; } = default!;
        [JsonPropertyName("email")]
        public string Email { get; init; } = default!;
    }
}
