using Minio.DataModel.Response;

namespace Solveit.Api.Core.Application.Services
{
    public interface IMinioFileService
    {
        Task<PutObjectResponse> UploadFileAsync(
             IFormFile file,
             string bucketName,
             string objectPath);
        Task<bool> DeleteFileAsync(string bucketName, string objectPath);
        Task<string> GetPresignedUrl(string bucketName, string objectPath);
    }
}
