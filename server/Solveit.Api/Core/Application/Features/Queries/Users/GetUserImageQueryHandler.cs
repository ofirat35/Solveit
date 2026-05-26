using MediatR;
using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Application.Consts;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Models;

namespace Solveit.Api.Core.Application.Features.Queries.Users
{
    public class GetUserImageQueryHandler(IMinioFileService fileService, IAppUserService userService)
       : BaseQueryHandler, IRequestHandler<GetUserImageRequestQuery, ResponseModel<UserImageListDto>>
    {
        public async Task<ResponseModel<UserImageListDto>> Handle(GetUserImageRequestQuery request, CancellationToken cancellationToken)
        {
            var user = await userService.GetAll().Include(_ => _.AppFile).FirstOrDefaultAsync(_ => _.Id == request.UserId && _.IsValid);
            if (user is null || user.AppFile is null)
                return ToFailResponseModel<UserImageListDto>(ExceptionMessages.EntityNotFound, StatusCodes.Status404NotFound);

            var mappedImage = new UserImageListDto
            {
                CreatedDate = user.AppFile.CreatedDate,
                Id = user.AppFile.Id,
                ImagePath = await fileService.GetPresignedUrl(MinioBucket.UserImages, user.AppFile.ObjectName)
            };

            return ToSuccessResponseModel(mappedImage);
        }
    }

    public class GetUserImageRequestQuery : IRequest<ResponseModel<UserImageListDto>>
    {
        public string UserId { get; set; }
    }
}
