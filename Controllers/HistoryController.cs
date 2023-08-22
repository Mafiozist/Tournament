using Dapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;

namespace Tournament.Controllers
{

    [ApiController]
    [Route("[controller]/api/")]
    public class HistoryController : BaseController
    {
        public HistoryController(IConfiguration configuration) : base(configuration){ }

        [HttpPost("GetTeamMembersHistory")]
        public string GetTeamMembersHistory(int idTeam)
        {
            Models.JsonModels.Request res = new Models.JsonModels.Request();

            using (var db = new NpgsqlConnection(_connectionString))
            {
                db.Open();

                try
                {
                    var participants = db.Query(@$"SELECT  id_team_members_hist as id
                                                         , first_name
                                                         , last_name
                                                         , patronymic
                                                         , type
                                                         , dt 
                                                  FROM public.team_members_hist tmh
                                                  INNER JOIN public.participant t ON tmh.id_member = t.id_member
                                                  WHERE id_team = '{idTeam}'
                                                  ORDER BY id_team_members_hist DESC ")
                                        .ToList();

                    res.Data = participants;
                    res.Status = 1;
                    res.Msg = participants.Count == 0? "Запрос выполнился, но изменений нет." : "История успешно получена.";

                    return JsonConvert.SerializeObject(res);
                }
                catch (Exception ex)
                {
                    res.Status = -1;
                    res.Msg = ex.Message;

                    return JsonConvert.SerializeObject(res);
                }

            }
        }
        }
}
