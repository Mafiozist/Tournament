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
                return db.Query<Models.DataModels.Team>($@"SELECT * FROM public.team;").ToList();
            }
        }

        [HttpPost("CreateTeam")]
        public int CreateTeam(string name)
        {
            using (IDbConnection db = new NpgsqlConnection(_configuration.GetConnectionString("competition"))) 
            { 
                return db.Execute($@"INSERT INTO public.team (name) VALUES('{name}') RETURNING id_team;");
            }
        }
    }
}
