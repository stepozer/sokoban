using System.Collections.Generic;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        private readonly LevelPackRepository _levelPackRepository;

        public GameController(LevelPackRepository levelPackRepository)
        {
            _levelPackRepository = levelPackRepository;
        }
        
        [HttpGet("level_packs")]
        public List<LevelPackModel> Index()
        {
            var levelPacks = _levelPackRepository.All();
            // automapper
            return new List<LevelPackModel>();
        }
    }
}