using System.Collections.Generic;
using System.Linq;
using DataAccess.Entities;

namespace DataAccess.Repositories
{
    public class LevelRepository
    {
        private readonly AppDbContext _dbContext;

        public LevelRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public List<Level> All()
        {
            return _dbContext.Levels.ToList();
        }
        
        public Level GetById(int id)
        {
            return _dbContext.Levels.Find(id);
        }
    }
}