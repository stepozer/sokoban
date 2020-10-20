using AutoMapper;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class LevelsController : Controller
    {
        private readonly LevelRepository _levelRepository;
        private readonly IMapper _mapper;

        public LevelsController(LevelRepository levelRepository, IMapper mapper)
        {
            _levelRepository = levelRepository;
            _mapper = mapper;
        }

        [HttpGet("show")]
        public LevelModel Show(int id)
        {
            var level = _levelRepository.GetById(id);
            return _mapper.Map<LevelModel>(level);
        }
    }
}