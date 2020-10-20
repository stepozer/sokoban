using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Level> Levels { get; set; }
        public virtual DbSet<LevelPack> LevelPacks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("server=localhost;port=3306;user=root;password=ms;database=gdsparser;Allow User Variables=True");
        }

        private void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
        }
    }
}