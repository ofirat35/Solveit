using Microsoft.AspNetCore.Mvc;
using Solveit.Api.Core.Application.Services;

namespace Solveit.Api.Infrastructure.Services
{
    public class LocalFileService(
        IWebHostEnvironment env, 
        IHttpContextAccessor httpContextAccessor) : IFileService
    {
        public async Task<string> UploadFileAsync(IFormFile file, string folder)
        {
            if (file == null || file.Length == 0)
                throw new DirectoryNotFoundException("No file provided");

            var allowedTypes = new[] { "image/jpeg", "image/png", "image/webp" };
            if (!allowedTypes.Contains(file.ContentType))
                throw new FormatException("Only JPEG, PNG, and WebP are allowed");

            var uploadsPath = Path.Combine(env.ContentRootPath, "Uploads", folder);
            Directory.CreateDirectory(uploadsPath);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsPath, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            var request = httpContextAccessor.HttpContext!.Request;
            var imageUrl = $"{request.Scheme}://{request.Host}/Uploads/{folder}/{fileName}";

            return imageUrl;
        }
    }
}
