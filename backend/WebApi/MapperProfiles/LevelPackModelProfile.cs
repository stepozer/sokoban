using AutoMapper;
using DataAccess.Entities;
using WebApi.Models;

namespace WebApi.MapperProfiles
{
    public class LevelPackModelProfile : Profile
    {
        public LevelPackModelProfile()
        {
            CreateMap<LevelPackModel, LevelPack>()
                .ForMember(t=> t.Position, opt=>opt.Ignore())
                .ForMember(t=> t.Levels, opt=>opt.Ignore())
                .ReverseMap();
        }
    }
}