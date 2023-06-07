using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;
using Microsoft.Data.SqlClient;
using Npgsql;
using Tournament.Models.DataModels;

namespace Tournament.Controllers
{
    [ApiController]
    [Route("[controller]/api/")]
    public class TournamentsController : Controller
    {

        /// <summary>
        /// Получение или создание  всех групповых матчей для текущего турнира
        /// </summary>
        /// <param name="idTourn">Идентификатор турнира</param>
        /// <returns>
        /// Возвращает готовый json для отображения
        /// </returns>
        /// 
        /// Struct of JSON for match
        /// {
        ///id: 20464,
        ///name: 'Semi Final - Match 1',
        ///nextMatchId: 20463,
        ///nextLooserMatchId: null,
        ///tournamentRoundText: '2',
        ///startTime: '2021-07-28T00:00:00.000+00:00',
        ///state: 'SCORE_DONE', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        ///participants: [
        ///],
        ///},


        //    {
        //        id: '9fd1f0e6-eb92-4159-a96d-6657fbdd963e',
        //        resultText: 12,
        //        isWinner: true,
        //        status: 'WO', //// 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        //        name: 'GlootOne',
        //      },
        //      {
        //id: '1d11ce35-de11-49de-b48e-cec5427eb82c',
        //        resultText: null,
        //        isWinner: false,
        //        status: 'NO_SHOW',
        //        name: 'Alex',
        //      },

        private IConfiguration _configuration;

        public TournamentsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("GetOrCreateGroupMatches")]
        public string GetOrCreateGroupMatches(string idTourn)
        {
            return "";
        }

        [HttpPost("CreateTournament")]
        public Models.DataModels.Tournament CreateTournament(string name)
        {
            using (IDbConnection db = new NpgsqlConnection(_configuration.GetConnectionString("competition")))
            { 
                return db.Query<Models.DataModels.Tournament>($@"INSERT INTO public.tournament(name) VALUES('{name}'); --RETURNING id_tour; 
                                                                 SELECT * FROM public.tournament WHERE id_tour=lastval();").First();
            }
        }
       
    }
}
