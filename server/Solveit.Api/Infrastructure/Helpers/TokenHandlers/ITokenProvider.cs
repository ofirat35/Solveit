namespace Solveit.Api.Infrastructure.Context.TokenHandlers
{
    public interface ITokenProvider
    {
        Task<string?> GetTokenAsync();
    }
}
