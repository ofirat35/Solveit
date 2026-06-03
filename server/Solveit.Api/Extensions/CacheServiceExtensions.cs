using Solveit.Api.Core.Application.Services;

namespace Solveit.Api.Extensions
{
    public static class CacheServiceExtensions
    {
        public static async Task<T?> GetOrSetAsync<T>(
            this IAppCacheService cacheService,
            string cacheKey,
            Func<Task<T?>> factory,
            TimeSpan? expiration = null) where T : class
        {
            var cachedData = await cacheService.GetAsync<T>(cacheKey);
            if (cachedData is not null)
            {
                return cachedData;
            }

            var freshData = await factory();
            if (freshData is null)
            {
                return null;
            }

            var ttl = expiration ?? TimeSpan.FromMinutes(30);
            await cacheService.SetAsync(cacheKey, freshData, ttl);

            return freshData;
        }
    }
}
