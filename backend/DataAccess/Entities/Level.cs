namespace DataAccess.Entities
{
    public class Level
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Map { get; set; }
        public virtual LevelPack LevelPack { get; set; }
    }
}