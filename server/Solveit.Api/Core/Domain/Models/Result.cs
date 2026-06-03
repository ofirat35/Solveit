namespace Solveit.Api.Core.Domain.Models
{
    public sealed class Result<T>
    {
        public bool IsSuccess { get; }
        public T? Value { get; }
        public List<string> Errors { get; } = [];
        public int? StatusCode { get; }

        private Result(bool isSuccess, T? value, List<string> errors, int? statusCode = null)
        {
            IsSuccess = isSuccess;
            Value = value;
            Errors = errors;
            StatusCode = statusCode;
        }

        public static Result<T> Success(T value, int? statusCode = null)
            => new(true, value, null, statusCode);

        public static Result<T> Fail(List<string> errors, int? statusCode = null)
            => new(false, default, errors, statusCode);

    }
}
