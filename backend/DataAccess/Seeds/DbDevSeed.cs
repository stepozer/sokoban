using System;
using System.Collections.Generic;
using System.IO;
using DataAccess.Entities;
using DataAccess.Repositories;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace DataAccess.Seeds
{
    public class DbDevSeed
    {
        private readonly LevelPackRepository _levelPackRepository;
        private readonly LevelRepository _levelRepository;

        public DbDevSeed(LevelPackRepository levelPackRepository, LevelRepository levelRepository)
        {
            _levelPackRepository = levelPackRepository;
            _levelRepository = levelRepository;
        }
        
        public void Execute()
        {
            var basePath = "/var/www/private/sokoban_dotnet/backend/";
            var levelPacks = Directory.GetDirectories(@$"{basePath}DataAccess/Seeds/Data", "*", SearchOption.TopDirectoryOnly);
            foreach (var levelPack in levelPacks)
            {
                var yaml = File.ReadAllText(levelPack + "/meta.yml");
                var deserializer = new DeserializerBuilder()
                    .WithNamingConvention(new CamelCaseNamingConvention())
                    .Build();
                var metadata = deserializer.Deserialize<MetadataDTO>(yaml);
                
                var levelPackEntity = new LevelPack {
                    Name = metadata.Name,
                    Description = metadata.Description,
                    Url = metadata.Slug,
                    Levels = new List<Level>()
                };
                var levels = Directory.GetFiles(@$"{levelPack}", "*.txt");
                foreach (var level in levels)
                {
                    var levelEntity = new Level {
                        Name = Path.GetFileName(level),
                        Map = File.ReadAllText(level),
                        LevelPack = levelPackEntity
                    };
                    levelPackEntity.Levels.Add(levelEntity);
                }
                _levelPackRepository.Add(levelPackEntity);
            }
        }
    }
}