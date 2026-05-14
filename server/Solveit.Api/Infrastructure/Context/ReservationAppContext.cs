using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Domain.Entities;

namespace Solveit.Api.Infrastructure.Context
{
    public class SolveitAppContext(DbContextOptions<SolveitAppContext> options) : DbContext(options)
    {
        public override int SaveChanges()
        {
            HandleSaveChanges();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            HandleSaveChanges();
            return base.SaveChangesAsync(cancellationToken);
        }

        public void HandleSaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                if (entry.State == EntityState.Added)
                {
                    if (entry.Entity is IHasCreatedDate c)
                        c.CreatedDate = DateTime.UtcNow;

                    if (entry.Entity is IHasSoftDelete sd)
                        sd.IsValid = true;
                }

                if (entry.State == EntityState.Modified)
                {
                    if (entry.Entity is IHasUpdatedDate u)
                        u.UpdatedDate = DateTime.UtcNow;
                }

                if (entry.State == EntityState.Deleted)
                {
                    if (entry.Entity is IHasSoftDelete s)
                    {
                        entry.State = EntityState.Modified;
                        s.IsValid = false;
                    }
                    if (entry.Entity is IHasUpdatedDate sd)
                        sd.UpdatedDate = DateTime.UtcNow;
                }
            }
        }


        public DbSet<AppUser> AppUsers { get; set; }
    }
}
