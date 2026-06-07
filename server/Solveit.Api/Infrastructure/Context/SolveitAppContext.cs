using Microsoft.EntityFrameworkCore;
using Solveit.Api.Core.Domain.Entities;
using Solveit.Api.Core.Domain.Entities.Files;

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
              .HasOne(s => s.Provider)
              .WithMany()
              .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Service>()
              .HasOne(s => s.Subcategory)
              .WithMany()
              .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<AppUser>()
              .HasOne(c => c.Image)
              .WithOne()
              .HasForeignKey<AppUser>(_ => _.ImageId)
              .IsRequired(false);
            modelBuilder.Entity<AppUser>()
                .Property(u => u.ImageId)
                .IsRequired(false)
                .HasDefaultValue(null);

            modelBuilder.Entity<Order>()
            .HasOne(o => o.Provider)
            .WithMany()
            .HasForeignKey(o => o.ProviderId)
            .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Subcategory> Subcategories { get; set; }
        public DbSet<UserFile> UserFiles { get; set; }
        public DbSet<ServiceFile> ServiceFiles { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
