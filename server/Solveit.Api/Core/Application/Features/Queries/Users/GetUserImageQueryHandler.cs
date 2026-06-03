using MediatR;
using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Users
{
    public class GetUserImageQueryHandler(IMinioFileService fileService, IAppUserService userService)
       : BaseQueryHandler, IRequestHandler<GetUserImageRequestQuery, Result<UserImageListDto>>
    {
        public async Task<Result<UserImageListDto>> Handle(GetUserImageRequestQuery request, CancellationToken cancellationToken)
        {
            var user = await userService.GetAll().Include(_ => _.Image).FirstOrDefaultAsync(_ => _.Id == request.UserId && _.IsValid);
            if (user is null || user.Image is null)
                return ToFailResult<UserImageListDto>([ExceptionMessages.EntityNotFound], StatusCodes.Status404NotFound);

            var mappedImage = new UserImageListDto
            {
                CreatedDate = user.Image.CreatedDate,
                Id = user.Image.Id,
                ImagePath = await fileService.GetPresignedUrl(MinioBucket.UserImages, user.Image.ObjectName)
            };

            return ToSuccessResult(mappedImage);
        }
    }

    public class GetUserImageRequestQuery : IRequest<Result<UserImageListDto>>
    {
        public string UserId { get; set; }
    }
}
