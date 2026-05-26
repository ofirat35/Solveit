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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .HasMany(c => c.Subcategories)
                .WithOne(sc => sc.Category)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Category>()
                .HasMany(c => c.Services)
                .WithOne(s => s.Category)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Service>()
              .HasOne(s => s.User)
              .WithMany()
              .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Service>()
              .HasOne(s => s.Subcategory)
              .WithMany()
              .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<AppUser>()
              .HasOne(c => c.AppFile)
              .WithOne()
              .HasForeignKey<AppUser>(_ => _.AppFileId)
              .IsRequired(false);

            modelBuilder.Entity<AppUser>()
                .Property(u => u.AppFileId)
                .IsRequired(false)
                .HasDefaultValue(null);

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Subcategory> Subcategories { get; set; }
        public DbSet<AppFile> AppFiles { get; set; }
    }
}
