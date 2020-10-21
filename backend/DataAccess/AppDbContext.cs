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
            optionsBuilder.UseNpgsql("Host=localhost;Port=9200;Database=sokoban_dev;Username=pg;Password=pg");
        }

        private void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
        }
    }
}