using MediatR;
using Microsoft.EntityFrameworkCore;
using Minio.DataModel.Response;
using Minio.Exceptions;
using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Models;
using Solveit.Api.Extensions;

namespace Solveit.Api.Core.Application.Features.Commands.Users
{
    public class UploadUserImageCommandHandler(
        IMinioFileService fileService,
        IHttpContextAccessor httpContext,
        IAppUserService userService)
        : BaseCommandHandler, IRequestHandler<UploadUserImageRequestCommand, ResponseModel<UserImageListDto>>
    {
        public async Task<ResponseModel<UserImageListDto>> Handle(UploadUserImageRequestCommand request, CancellationToken cancellationToken)
        {
            var userId = httpContext.GetUserId();
            PutObjectResponse response;
            try
            {
                var extension = request.File.ContentType switch
                {
                    "image/jpeg" => ".jpg",
                    "image/png" => ".png",
                    "image/webp" => ".webp",
                    _ => throw new InvalidOperationException("Unsupported file type")
                };
                var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };
                if (!allowed.Contains(extension))
                    throw new InvalidOperationException("Unsupported file type");


                var objectPath = $"{userId}/{Guid.NewGuid()}{extension}";
                response = await fileService.UploadFileAsync(request.File, MinioBucket.UserImages, objectPath);
                var image = new AppFile
                {
                    Bucket = MinioBucket.UserImages,
                    ObjectName = response.ObjectName,
                    Size = response.Size,
                };
                var user = await userService.GetByIdAsync(userId, true, _ => _.AppFile);
                if (user.AppFile is null)
                {
                    user.AppFile = image;
                }
                else
                {
                    await fileService.DeleteFileAsync(user.AppFile.Bucket, user.AppFile.ObjectName);
                    user.AppFile.Bucket = MinioBucket.UserImages;
                    user.AppFile.ObjectName = response.ObjectName;
                    user.AppFile.Size = response.Size;
                    user.AppFile.CreatedDate = DateTime.Now;
                }

                await userService.SaveChangesAsync();

                return ToSuccessResponseModel(
                    new UserImageListDto
                    {
                        CreatedDate = image.CreatedDate,
                        Id = image.Id,
                        ImagePath = await fileService.GetPresignedUrl(MinioBucket.UserImages, image.ObjectName)
                    }, 200);
            }
            catch (MinioException ex)
            {
                return ToFailResponseModel<UserImageListDto>(ex.Message, StatusCodes.Status500InternalServerError);
            }
        }
    }

    public class UploadUserImageRequestCommand : IRequest<ResponseModel<UserImageListDto>>
    {
        public IFormFile File { get; set; }
    }
}
