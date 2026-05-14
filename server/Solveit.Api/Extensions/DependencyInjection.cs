using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Core.Domain.Dtos;
using Solveit.Api.Infrastructure.Context;
using Solveit.Api.Infrastructure.Context.TokenHandlers;
using Solveit.Api.Infrastructure.Services;
using System.Reflection;

namespace Solveit.Api.Extensions
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMediatR(config =>
            {
                config.RegisterServicesFromAssemblyContaining<Program>();
            });
            services.AddAutoMapper(_ => { }, Assembly.GetExecutingAssembly());


            var registrations = AppDomain.CurrentDomain.GetAssemblies()
                .Where(a => a.FullName!.StartsWith("Solveit.Api"))
                .SelectMany(a => a.GetTypes())
                .Where(t =>
                    t.IsClass &&
                    !t.IsAbstract &&
                    t.Namespace != null &&
                    t.Name.EndsWith("Service"))
                .SelectMany(t => t.GetInterfaces()
                    .Where(i => i.Name == $"I{t.Name}")
                    .Select(i => new
                    {
                        Service = i,
                        Implementation = t
                    }));
            foreach (var registration in registrations)
            {
                services.TryAddScoped(registration.Service, registration.Implementation);
            }
            services.AddScoped<IAppCacheService, InMemoryCacheService>();
            services.AddControllers();
            services.AddDbContext<SolveitAppContext>(o =>
            {
                o.UseSqlServer(configuration.GetConnectionString("SqlConnectionString"));
            });
            services.AddMemoryCache();
            services.AddCors((options) =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });
            services.AddKeycloakWebApiAuthentication(configuration, opt =>
            {
                opt.RequireHttpsMetadata = false;
                opt.TokenValidationParameters.ValidIssuers = [
                        "http://localhost:8080/realms/SolveitApp",
                        "http://10.0.2.2:8080/realms/SolveitApp"
                    ];
                opt.TokenValidationParameters.ValidateIssuer = true;

                //opt.Events = new JwtBearerEvents
                //{
                //    OnMessageReceived = context =>
                //    {
                //        var accessToken = context.Request.Query["access_token"];

                //        var path = context.HttpContext.Request.Path;

                //        if (!string.IsNullOrEmpty(accessToken) &&
                //            path.StartsWithSegments("/hubs"))
                //        {
                //            context.Token = accessToken;
                //        }

                //        return Task.CompletedTask;
                //    }
                //};
            });
            services.Configure<KeycloakConfig>(configuration.GetSection("KeycloakClientConfig"));
            services.AddHttpContextAccessor();
            services.AddHttpClient();

            services.AddTransient<KeycloakClientTokenProvider>();

            services.AddScoped<KeycloakClientTokenHandler>();
            services.AddHttpClient("keycloak_client",
                client => client.Timeout = TimeSpan.FromSeconds(20))
                .AddHttpMessageHandler<KeycloakClientTokenHandler>();

            return services;
        }
    }
}
