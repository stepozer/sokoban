using System.Collections.Generic;

namespace DataAccess.Entities
{
    public class LevelPack
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public int Position { get; set; }
        public int LevelsCount { get; set; }
        public virtual ICollection<Level> Levels { get; set; }
    }
}