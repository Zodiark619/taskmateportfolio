using Microsoft.EntityFrameworkCore;
using taskmateAPI.Models;

namespace taskmateAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<TaskMate> TaskMate { get; set; }
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected ApplicationDbContext()
        {
        }
    }
}
