using AutoMapper;
using Solveit.Api.Core.Application.Features.Commands.Auth;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Dtos.Auth;
using Solveit.Api.Core.Domain.Entities;

namespace Solveit.Api.Core.Application.Mappings
{
    public class MappingsProfiles : Profile
    {
        public MappingsProfiles()
        {
            CreateMap<RegisterUserRequestCommand, KeycloakUserCreateRequestDto>();
            CreateMap<RegisterUserRequestCommand, AppUserCreateDto>();
            CreateMap<AppUserCreateDto, AppUser>();


        }
    }
}
