using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Application.Services;
using Solveit.Api.Extensions;
using Solveit.Api.Infrastructure.Context;
using Solveit.Api.Infrastructure.Services;
using Solveit.Api.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDependencies(builder.Configuration);
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IFileService, LocalFileService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<SolveitAppContext>();
        await db.Database.MigrateAsync();

    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
    }

}

app.UseCustomExceptionHandling();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();