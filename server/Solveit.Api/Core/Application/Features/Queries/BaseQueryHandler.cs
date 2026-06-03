using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries
{
    public class BaseQueryHandler
    {
        protected Result<TResp> ToSuccessResult<TResp>(TResp? data, int? statusCode = null)
        {
            return Result<TResp>.Success(
                data ?? default,
                statusCode ?? StatusCodes.Status200OK);
        }

        protected Result<TResp> ToFailResult<TResp>(List<string>? errorMessages, int? statusCode = null)
        {
            return Result<TResp>.Fail(
                errorMessages ?? [ExceptionMessages.UnexpectedException],
                statusCode ?? StatusCodes.Status500InternalServerError);
        }

        protected int ResolveStatusCode<T>(Result<T> result)
           => result.StatusCode ?? StatusCodes.Status400BadRequest;
    }
}
