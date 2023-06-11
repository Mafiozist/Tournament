using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;


namespace Tournament.Controllers
{
    [ApiController]
    [Route("[controller]/api/")]
    public class TeamsController : Controller
    {
        private IConfiguration _configuration;

        public TeamsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("GetTeams")]
        public IEnumerable<Models.DataModels.Team> GetTeams()
        {
            using (IDbConnection db = new NpgsqlConnection(_configuration.GetConnectionString("competition")))
            {
                return db.Query($@"SELECT * FROM public.team;").Select(i=> new Models.DataModels.Team
                {
                    IdTeam = i.id_team,
                    IdCap = i.id_cap ?? -1,
                    Name = i.name,
                }).ToList();
            }
        }

        [HttpPost("CreateTeam")]
        public int CreateTeam([FromBody] string teamName)
        {
            using (IDbConnection db = new NpgsqlConnection(_configuration.GetConnectionString("competition"))) 
            { 
                return db.Execute($@"INSERT INTO public.team (name) VALUES('{teamName}') RETURNING id_team;");
            }
        }
    }
}
