using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Npgsql;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Tournament.Models.DTO;

namespace Tournament.Controllers
{
    [ApiController]
    [Route("[controller]/api/")]
    public class TeamsController : BaseController
    {
        public TeamsController(IConfiguration configuration) : base(configuration) { }

        [HttpGet("GetTeams")]
        public string GetTeams()
        {
            using (IDbConnection db = new NpgsqlConnection(_configuration.GetConnectionString("competition")))
            {
                var teams = db.Query($@"SELECT * FROM public.team;")
                    .Select(i=> new Models.DataModels.Team()
                    {
                        Id=i.id_team,
                        IdCap=i.id_cap ?? -1,
                        Name=i.name,
                        MembersCount=i.members_count ?? 0,
                        MatchesWon=i.matches_won ?? 0,
                        GroupPassed=i.group_passed ?? 0,
                        TournamentsWon=i.tournaments_won ?? 0,
                        IsDeleted=i.is_deleted,
                    })
                    .ToList();

                return JsonConvert.SerializeObject(teams);
            }
        }

        [HttpGet("GetTeam")]
        public string GetTeam(int id)
        {
            using (IDbConnection db = new NpgsqlConnection(_configuration.GetConnectionString("competition")))
            {
                var team = db.Query($@"SELECT * FROM public.team WHERE id_team='{id}'")
                    .Select(i => new Models.DataModels.Team()
                    {
                        Id = i.id_team,
                        IdCap = i.id_cap ?? -1,
                        Name = i.name,
                        MembersCount = i.members_count ?? 0,
                        MatchesWon = i.matches_won ?? 0,
                        GroupPassed = i.group_passed ?? 0,
                        TournamentsWon = i.tournaments_won ?? 0,
                        IsDeleted = i.is_deleted,
                    })
                    .FirstOrDefault();

                return JsonConvert.SerializeObject(team);
            }
        }

        private string PrepareTeamToAdd(int? idTeam, IEnumerable<int> users)
        {
            if (idTeam is null) throw new ArgumentException(nameof(idTeam));

            StringBuilder str = new StringBuilder();

            foreach(var id in users)
            {
                if(id == users.Last())
                {
                    str.Append($"('{idTeam}','{id}')");
                    break;
                };
                str.Append($"('{idTeam}','{id}'),");
            }

            return str.ToString();
        }

        [HttpPost("SetDeleteTeam")]
        public string SetDeleteTeam(TeamDto team)
        {
            using (var db = new NpgsqlConnection(_configuration.GetConnectionString("competition")))
            {
                db.Open();
                var trans = db.BeginTransaction();
                Models.JsonModels.Request res = new Models.JsonModels.Request();

                try
                {

                    db.Execute($@"UPDATE team SET is_deleted={(team.IsDeleted? "FALSE" : "TRUE")} WHERE id_team ='{team.Id}';", transaction: trans);
                      
                    trans.Commit();
                    res.Msg = "Команда успешно удалена/возвращена";
                    res.Status = 1;
                    return JsonConvert.SerializeObject(res);
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    res.Status = -1;
                    res.Msg = "Возникла ошибка при удалении команды";
                    return JsonConvert.SerializeObject(res);
                }

            }
        }


        [HttpPost("EditOrCreateTeam")]
        public string EditOrCreateTeam(TeamDto team)
        {
            using (var db = new NpgsqlConnection(_configuration.GetConnectionString("competition"))) 
            {
                db.Open();
                var trans = db.BeginTransaction();
                Models.JsonModels.Request res = new Models.JsonModels.Request();

                try
                {
                    int? id = team.Id; 

                    if (team.Id<=0)
                    {
                        id = db.Query<int>($@"INSERT INTO public.team (name) VALUES('{team.TeamName}') RETURNING id_team;", transaction: trans).FirstOrDefault();
                        if(team.Users != null && team.Users.Length > 0) db.Execute($@"INSERT INTO public.team_members (id_team, id_member) VALUES {PrepareTeamToAdd(id, team.Users)}", transaction: trans);
                    }
                    else
                    {
                        //Обновляем информацию о команде
                        db.Execute($"UPDATE public.team SET name='{team.TeamName}' WHERE id_team='{team.Id}';", transaction: trans);

                        //Получаем текущее состояние участников в команде
                        var currentState = db.Query<int>($"SELECT id_member FROM public.team_members WHERE id_team='{team.Id}'").ToList();

                        //Определяем каких участников необходимо добавить, а каких удалить
                        var valToDel = (team.Users is null)? new List<int>() : currentState.Where(id => !team.Users.Contains(id)).ToList();
                        var valToAdd = team.Users?.Where(id => !currentState.Contains(id)).ToList();

                        if(valToDel != null && valToDel.Count > 0) db.Execute($"DELETE FROM team_members WHERE id_member IN ({String.Join(',',valToDel)}) AND id_team ='{team.Id}';", transaction: trans);
                        if (valToAdd!= null && valToAdd.Count > 0) db.Execute($@"INSERT INTO public.team_members (id_team, id_member) VALUES {PrepareTeamToAdd(team.Id, valToAdd)}", transaction: trans);
                    }

                    trans.Commit();

                    res.Data = (id != null)? GetTeam((int)id) : null;
                    res.Msg = "Команда успешно создана/обновлена";
                    res.Status = 1;
                    return JsonConvert.SerializeObject(res);
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    res.Status = -1;
                    res.Msg = "Возникла ошибка при обновлении команды";
                    return JsonConvert.SerializeObject(res);
                }

            }
        }

        [HttpPost("GetTeamsMembers")]
        public string GetTeamsMembers([FromQuery] int idTeam)
        {
            using (var db = new NpgsqlConnection(_configuration.GetConnectionString("competition")))
            {
                db.Open();
                var trans = db.BeginTransaction();
                Models.JsonModels.Request res = new Models.JsonModels.Request();

                try
                {

                    res.Data = db.Query<int>($@"SELECT id_member FROM team_members WHERE id_team='{idTeam}';").ToList();

                    trans.Commit();
                    res.Msg = "Данные об участниках в команде успешно получены";
                    res.Status = 1;

                    return JsonConvert.SerializeObject(res);
                }
                catch (Exception ex)
                {
                    res.Status = -1;
                    res.Msg = "Не удалось получить информацию о наличии участников в команде";
                    return JsonConvert.SerializeObject(res);
                }

            }
        }
    }
}
