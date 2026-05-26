namespace Solveit.Api.Core.Domain.Dtos
{
    public record FileDownloadDto(
      Stream Stream,
      string FileName,
      string ContentType
  );
}
