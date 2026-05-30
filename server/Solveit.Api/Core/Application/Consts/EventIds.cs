namespace Solveit.Api.Core.Application.Consts
{
    public static class EventIds
    {
        public static readonly EventId AppUserService = new(1020, nameof(AppUserService));
        public static readonly EventId KeycloakService = new(1030, nameof(KeycloakService));
        public static readonly EventId CategoryService = new(1040, nameof(CategoryService));
        public static readonly EventId SubcategoryService = new(1050, nameof(SubcategoryService));
        public static readonly EventId ServiceProviderService = new(1060, nameof(ServiceProviderService));
        public static readonly EventId OrderService = new(1070, nameof(OrderService));
    }
}
