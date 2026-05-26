using Microsoft.Extensions.Options;
using Minio;
using Minio.DataModel.Args;
using Minio.DataModel.Response;
using Minio.Exceptions;
using Solveit.Api.Core.Application.Services;

namespace Solveit.Api.Infrastructure.Services
{
    public class MinioFileService(IOptions<Core.Domain.Options.MinioConfig> options) : IMinioFileService
    {
        private readonly IMinioClient _internalMinioClient = new MinioClient()
                .WithEndpoint(options.Value.Endpoint)
                .WithCredentials(options.Value.AccessKey, options.Value.SecretKey)
                .Build();

        private readonly IMinioClient _publicMinioClient = new MinioClient()
               .WithEndpoint(options.Value.PublicEndpoint)
               .WithCredentials(options.Value.AccessKey, options.Value.SecretKey)
               .Build();

        public async Task<PutObjectResponse> UploadFileAsync(
            IFormFile file,
            string bucketName,
            string objectPath)
        {
            await using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            stream.Position = 0;

            try
            {
                var exists = await _internalMinioClient.BucketExistsAsync(new BucketExistsArgs().WithBucket(bucketName));
                if (!exists) await _internalMinioClient.MakeBucketAsync(new MakeBucketArgs().WithBucket(bucketName));

                var putObjectArgs = new PutObjectArgs()
                    .WithBucket(bucketName)
                    .WithObject(objectPath)
                    .WithStreamData(stream)
                    .WithObjectSize(stream.Length)
                    .WithContentType(file.ContentType);

                return await _internalMinioClient.PutObjectAsync(putObjectArgs);
            }
            catch (MinioException ex)
            {
                throw;
            }
        }

        public async Task<bool> DeleteFileAsync(string bucketName, string objectPath)
        {
            try
            {
                var removeObjectArgs = new RemoveObjectArgs()
                    .WithBucket(bucketName)
                    .WithObject(objectPath);

                await _internalMinioClient.RemoveObjectAsync(removeObjectArgs);
                return true;
            }
            catch (MinioException)
            {
                return false;
            }
        }

        public async Task<string> GetPresignedUrl(string bucketName, string objectPath)
        {
            var args = new PresignedGetObjectArgs()
                .WithBucket(bucketName)
                .WithObject(objectPath)
                .WithExpiry(3600);

            return await _publicMinioClient.PresignedGetObjectAsync(args);
        }
    }
}
