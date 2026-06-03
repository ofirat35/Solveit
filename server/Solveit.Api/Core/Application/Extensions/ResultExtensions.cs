using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Extensions
{
    public static class ResultExtensions
    {
        public static Result<TResp> ToResult<TResp>(this Result<TResp> result)
        {
            if (!result.IsSuccess)
            {
                int statusCode = result.StatusCode ?? 400;
                return Result<TResp>.Fail(result.Errors ?? ["An error occurred"], statusCode);
            }

            return Result<TResp>.Success(result.Value ?? default, result.StatusCode ?? 200);
        }
    }
}
