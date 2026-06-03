using AutoMapper;
using Solveit.Api.Core.Application.Features.Commands.Auth;
using Solveit.Api.Core.Application.Features.Commands.Services;
using Solveit.Api.Core.Application.Features.Commands.Users;
using Solveit.Api.Core.Domain.Dtos.AppUsers;
using Solveit.Api.Core.Domain.Dtos.Auth;
using Solveit.Api.Core.Domain.Dtos.Categories;
using Solveit.Api.Core.Domain.Dtos.Orders;
using Solveit.Api.Core.Domain.Dtos.Services;
using Solveit.Api.Core.Domain.Dtos.Subcategories;
using Solveit.Api.Core.Domain.Entities;

namespace Solveit.Api.Core.Application.Mappings
{
    public class MappingsProfiles : Profile
    {
        public MappingsProfiles()
        {
            CreateMap<RegisterUserRequestCommand, KeycloakUserCreateRequestDto>();
            CreateMap<RegisterUserRequestCommand, AppUserCreateDto>();

            CreateMap<UserUpdateRequestCommand, KeyCloakUserUpdateDto>();
            CreateMap<UserUpdateRequestCommand, AppUserUpdateDto>();

            CreateMap<AppUserCreateDto, AppUser>();
            CreateMap<AppUserUpdateDto, AppUser>();
            CreateMap<AppUser, AppUserListDto>();

            CreateMap<CreateServiceRequestCommand, ServiceCreateDto>();
            CreateMap<ServiceCreateDto, Service>();
            CreateMap<Service, ServiceListDto>();

            CreateMap<Category, CategoryListDto>();
            CreateMap<Subcategory, SubcategoryListDto>();

            CreateMap<Service, OrderListDto>();
            CreateMap<Order, OrderListDto>();
            CreateMap<IServiceBase, Order>();

            CreateMap<UpdateServiceRequestCommand, ServiceUpdateDto>();
            CreateMap<ServiceUpdateDto, Service>();
        }
    }
}
