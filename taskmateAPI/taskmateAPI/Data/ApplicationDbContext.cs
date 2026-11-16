using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using taskmateAPI.Models;
using taskmateAPI.Models.Parking;

namespace taskmateAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<TaskMate> TaskMate { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<RefreshToken> RefreshToken { get; set; }
        public DbSet<ParkingSlot> ParkingSlot { get; set; }
        public DbSet<ParkingOrder> ParkingOrder { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

             modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Keyboard", Price = 10.99m, ImageUrl = "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
                new Product { Id = 2, Name = "Mouse", Price = 19.99m, ImageUrl = "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
                new Product { Id = 3, Name = "Printer", Price = 5.99m, ImageUrl = "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" }
            );

            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id="11111111-1111-1111-1111-111111111111",
                    Name="Admin",
                    NormalizedName="ADMIN"
                },
                new IdentityRole
                {
                    Id="22222222-2222-2222-2222-222222222222",
                    Name="User",
                    NormalizedName="USER"
                }
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);


            modelBuilder.Entity<ParkingSlot>().HasData(
                new ParkingSlot
                {
                    Id=1,
                    Area="A",
                    SlotNumber="A1",
                    Status="Available"
                },
                new ParkingSlot
                {
                    Id=2,
                    Area="A",
                    SlotNumber="A2",
                    Status="Available"
                },
                new ParkingSlot
                {
                    Id=3,
                    Area="B",
                    SlotNumber="B1",
                    Status="Available"
                },
                new ParkingSlot
                {
                    Id=4,
                    Area="B",
                    SlotNumber="B2",
                    Status="Available"
                },
                new ParkingSlot
                {
                    Id=5,
                    Area="C",
                    SlotNumber="C1",
                    Status="Available"
                }
                
                );
        }
    }
}
