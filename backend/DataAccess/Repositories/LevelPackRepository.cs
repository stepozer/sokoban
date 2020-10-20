using System.Collections.Generic;
using System.Linq;
using DataAccess.Entities;

namespace DataAccess.Repositories
{
    public class LevelPackRepository
    {
        private readonly AppDbContext _dbContext;

        public LevelPackRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public List<LevelPack> All()
        {
            return _dbContext.LevelPacks.ToList();
        }
    }
}