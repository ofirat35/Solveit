namespace Solveit.Api.Core.Application.Services
{
    public interface IFileService
    {
        Task<string> UploadFileAsync(IFormFile file, string folder);
    }
}
