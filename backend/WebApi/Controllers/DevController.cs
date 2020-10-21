using DataAccess.Seeds;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("dev")]
    public class DevController
    {
        private readonly DbDevSeed _dbDevSeed;

        public DevController(DbDevSeed dbDevSeed)
        {
            _dbDevSeed = dbDevSeed;
        }
        
        [HttpGet("seeds")]
        public string Seeds()
        {
            _dbDevSeed.Execute();
            return "ok";
        }
    }
}