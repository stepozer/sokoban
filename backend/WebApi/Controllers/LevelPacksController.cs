using System.Collections.Generic;
using AutoMapper;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("level_packs")]
    public class LevelPacksController : ControllerBase
    {
        private readonly LevelPackRepository _levelPackRepository;
        private readonly IMapper _mapper;

        public LevelPacksController(LevelPackRepository levelPackRepository, IMapper mapper)
        {
            _levelPackRepository = levelPackRepository;
            _mapper = mapper;
        }
        
        [HttpGet("listing")]
        public List<LevelPackModel> Listing()
        {
            var levelPacks = _levelPackRepository.All();
            return _mapper.Map<List<LevelPackModel>>(levelPacks);
        }
        
        [HttpGet("show")]
        public LevelPackModel Show(int id)
        {
            var levelPack = _levelPackRepository.GetById(id);
            return _mapper.Map<LevelPackModel>(levelPack);
        }
    }
}