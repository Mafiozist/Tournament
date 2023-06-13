using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;
using Microsoft.Data.SqlClient;
using Npgsql;
using Tournament.Models.DataModels;
using System.Text;
using Tournament.Models.JsonModels;
using Tournament.Models.DTO;
using System.Text.RegularExpressions;
using Match = Tournament.Models.DataModels.Match;

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

        public class MatchResult
        {
            public int RealMatches { get; set; }
            public int DummyMatches { get; set; }
        }

        public static MatchResult CalculateMatches(int numOfTeams)
        {
            int realMatches = 0;
            int dummyMatches = 0;

            // Находим ближайшую меньшую степень двойки
            int powerOfTwo = (int)Math.Pow(2, Math.Floor(Math.Log(numOfTeams, 2)));

            if (numOfTeams <= powerOfTwo * 2)
            {
                realMatches = numOfTeams - powerOfTwo;
                dummyMatches = powerOfTwo - realMatches;
            }
            else
            {
                realMatches = powerOfTwo;
                dummyMatches = numOfTeams - powerOfTwo;
            }

            return new MatchResult { RealMatches = realMatches, DummyMatches = dummyMatches };
        }


        private void LinkMatches(ref List<Match> matches)
        {
            if(matches.Count == 1) return;

            var rootIndex = Convert.ToInt32(Math.Floor(matches.Count / 2d));
            
            var leftSub = matches.GetRange(0, rootIndex);
            var righSub = matches.GetRange(rootIndex + 1, matches.Count - leftSub.Count - 1);

            var childrenIndex = Convert.ToInt32(Math.Floor(leftSub.Count / 2d));

            leftSub.ElementAt(childrenIndex).NextMatchId = matches[rootIndex].Id;
            righSub.ElementAt(childrenIndex).NextMatchId = matches[rootIndex].Id;

            LinkMatches(ref leftSub);
            LinkMatches(ref righSub);
        }

        [HttpPost("CreateTournament")]
        public Request CreateTournament([FromBody] TournInfo tourn)
        {

            using (IDbConnection db = new NpgsqlConnection(_configuration.GetConnectionString("competition")))
            {
                db.Open();
                var transaction = db.BeginTransaction();
                Request res = new Request();
                var teamsToManage = new Queue<int>(tourn.Teams.AsEnumerable());

                try
                {
                    //Создаем турнир и берем его id
                    int idTour = db.Query<int>($@"INSERT INTO public.tournament(name) VALUES('{tourn.Name}') RETURNING id_tour;", transaction).First();
                    StringBuilder qry = new StringBuilder($"INSERT INTO public.tourn_match(id_tourn) VALUES");

                    var countOfMatches = CalculateMatches(tourn.Teams.Length);
                    var matchesCount = (countOfMatches.RealMatches + countOfMatches.DummyMatches) * 2; //Поскольку countOfMatches считает значения только для первого этапа

                    //Поскольку команд у нас teams кол-во, тогда общее кол-во матчей будет teams-1
                    for (int i = 0; i < matchesCount - 1; i++)
                    {
                        qry.Append($"('{idTour}'),");
                    }

                    qry.Replace(',', ';', qry.Length - 1, 1);

                    int insCnt = db.Execute(qry.ToString(), transaction);

                    //Если число созданных матчей не совпадает
                    if (insCnt != matchesCount -1)
                    {
                        transaction.Rollback();
                        res.Status = -1;
                        res.Msg = "Ошибка запроса. Не удалось добавить нужное кол-во матчей.";

                        return res;
                    }

                    var matches =  db.Query($"SELECT * FROM public.tourn_match WHERE id_tourn='{idTour}';")
                        .Select(i => new Models.DataModels.Match()
                        {
                            Id = (int) i.id_tourn_match,
                            Participants = new List<Team>(){ new Team() { Id = (int) (i.id_team1 ?? 0) }, new Team() { Id = (int) (i.id_team2 ?? 0)} },
                            IsTop = i.is_top,
                            NextMatchId= (int) (i.id_next_tourn_match ?? 0),
                            IdParent = idTour
                        }).ToList();

                    //Соединяем матчи
                    LinkMatches(ref matches);
                    matches[Convert.ToInt32(Math.Floor(matches.Count / 2d))].IsTop = true;
                    
                    bool switcher = true;
                    var referenceMatches = matches.Where(i=> i.NextMatchId !=0)
                                                   .Select(node => node.NextMatchId)
                                                   .Distinct()
                                                   .ToList();

                    var firstRoundMatches = matches.Where(i => !referenceMatches.Contains(i.Id))
                                                   .Distinct()
                                                   .ToList();

                    int tmpDummy = countOfMatches.DummyMatches;
                    int tmpReal = countOfMatches.RealMatches;
                    foreach (var match in firstRoundMatches)
                    {

                        if (switcher && tmpReal!=0)//Переключатель для того чтобы не было подряд идущих пустых команд по началу
                        {
                            var item = matches.Find(i => i.Id == match.Id);
                                item.Participants[0].Id = teamsToManage.Dequeue();
                                item.Participants[1].Id = teamsToManage.Dequeue();
                            --tmpReal;
                            if (tmpDummy > 0) switcher = false; 
                        }
                        else if (!switcher && tmpDummy > 0)//DummyMatches
                        {
                            int Id = teamsToManage.Dequeue();
                            var item = matches.Find(i => i.Id == match.Id);
                            item.Participants[0].Id = Id;
                            item.Status = 1;//Завершен, потому что матч пустышка
                            item.IdWinner = Id;

                            var partId = matches.Find(m => m.Id == match.NextMatchId).Participants[0].Id;
                            
                            if (partId == null || partId == 0)
                            {  //Устанавливаем в следующий матч команду пустышку
                                matches.Find(m => m.Id == match.NextMatchId).Participants[0].Id = Id;
                            }
                            else matches.Find(m => m.Id == match.NextMatchId).Participants[1].Id = Id;
                            
                            --tmpDummy;
                            if(tmpReal > 0) switcher = true;
                        }
                    }


                    //Обновить все связ в матчах к базе
                    var updateStmTemplate = new String("UPDATE tourn_match SET id_team1=@idTeam1, id_team2=@idTeam2, id_next_tourn_match=@idNextMatch, id_tourn=@idTourn, is_top=@isTop, id_winner=@idWinner, status=@Status WHERE id_tourn_match=@idMatch");

                    foreach (var match in matches)
                    {
                        db.Execute(updateStmTemplate, new { idTeam1 = match?.Participants[0]?.Id, idTeam2 = match?.Participants[1]?.Id, idNextMatch=match?.NextMatchId,  idTourn=match.IdParent, isTop=match.IsTop,  idMatch=match.Id, idWinner=match.IdWinner, Status=match.Status }, transaction);
                    }

                    res.Data = null;
                    res.Status = 1;
                    res.Msg = "Турнир успешно создан. Матчи укомплектованы.";

                    transaction.Commit();

                    return res;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    res.Status= -1; 
                    res.Msg += ex.Message;
                    return res;
                }
            }
        }

        [HttpGet("GetTournaments")]
        public IEnumerable<Models.DataModels.Tournament> GetTournaments()
        {
            using (IDbConnection db = new NpgsqlConnection(_configuration.GetConnectionString("competition")))
            {
                return db.Query($@"SELECT * FROM public.tournament;").Select(i=> new Models.DataModels.Tournament()
                {
                    IdTour=i.id_tour,
                    Name=i.name,
                    IsEnded=i.is_ended,
                }).ToList();
            }
        }

        [HttpPut("UpdateMatches")]
        public Request UpdateWinnerMatches(List<MatchInfo> matches)
        {
            Request res = new Request();

            using (IDbConnection db = new NpgsqlConnection(_configuration.GetConnectionString("competition")))
            {
                try
                {
                    db.Open();
                    var transaction = db.BeginTransaction();

                    foreach (var match in matches)
                    {
                        //Обновляем состояние текущего матча
                        db.Execute($"UPDATE tourn_match SET id_winner=@idWinner, result=@Result, status=1 WHERE id_tourn_match=@IdMatch", new { match.IdWinner, match.Result, match.IdMatch }, transaction);

                        //Если есть победители в матче
                        if(match.IdNextMatch != -1 && match.IdWinner > 1)
                        {
                            string qry = $@"UPDATE tourn_match SET id_team1 = (CASE WHEN part.id_team1>0 THEN part.id_team1 ELSE {match.IdWinner} END),
                                                                 id_team2 = (CASE WHEN part.id_team2>0 THEN part.id_team2 ELSE {match.IdWinner} END)
                                          FROM (SELECT id_team1, id_team2 FROM tourn_match WHERE id_tourn_match={match.IdNextMatch}) AS part
                                          WHERE id_tourn_match = '{match.IdNextMatch}';";

                            db.Execute(qry, transaction);

                        }

                        
                    }

                    
                    transaction.Commit();
                    return res;
                }
                catch (Exception ex) 
                {
                    res.Msg = ex.Message;
                    res.Status = -1;
                    return res;
                }
            }
        }

        [HttpGet("GetMatches")]
        public IEnumerable<Match> GetMatches([FromQuery] int idTour)
        {
            using (IDbConnection db = new NpgsqlConnection(_configuration.GetConnectionString("competition")))
            {
                return db.Query($@"SELECT tm.id_tourn_match
                                    ,tm.id_next_tourn_match
                                    ,tm.id_winner
                                    ,tm.id_tourn  
                                    ,tm.status
                                    ,tm.is_top
                                    ,tm.result
                                    ,te.id_team id_team1
                                    ,te.name first_team_name
                                    ,te2.id_team id_team2
                                    ,te2.name second_team_name
                                    FROM public.tourn_match tm
                                    LEFT JOIN public.team te ON te.id_team = tm.id_team1
                                    LEFT JOIN public.team te2 ON te2.id_team = tm.id_team2
                                    WHERE tm.id_tourn='{idTour}';")
                    .Select(i => new Match
                    { 
                        Id = Convert.ToInt32(i.id_tourn_match ?? null),
                        NextMatchId = Convert.ToInt32(i.id_next_tourn_match ?? -1),
                        IdWinner = Convert.ToInt32(i.id_winner ?? -1),
                        IdParent = Convert.ToInt32(i.id_tourn ?? -1),
                        Status = i.status,
                        Result = i.result,
                        State =  i.status==1? "SCORE_DONE" : "",
                        IsTop = i.is_top,
                        Participants = new List<Team>() { 
                        new Team() { 
                            Id = Convert.ToInt32(i.id_team1 ?? -1), 
                            Name=i.first_team_name, 
                            ResultText= String.IsNullOrEmpty(i.result)? "" : Convert.ToString(i.result).Split('/')[0],
                            IsWinner = (i.id_winner == i.id_team1 && i.id_winner != -1),
                            Status = GetMemberStatusOfMatch((int ?) i.id_team1, (int ?) i.id_team2, (int ?) i.status, (int ?) i.id_winner),
                        }, 
                        new Team() {
                            Id = Convert.ToInt32(i.id_team2 ?? -1), 
                            Name = i.second_team_name,
                            ResultText= String.IsNullOrEmpty(i.result)? "" : Convert.ToString(i.result).Split('/')[1],
                            IsWinner = (i.id_winner == i.id_team2 && i.id_winner != -1),
                            Status = GetMemberStatusOfMatch( (int?) i.id_team2, (int?) i.id_team1, (int ?) i.status, (int ?) i.id_winner),
                        } 
                    }
                });
            }
        }

        private string GetMemberStatusOfMatch(int? team, int? opponent, int? matchStatus, int? winner)
        {
            if (team != null && team == winner && opponent > 0) return "PLAYED";
            else if (team != null && matchStatus == 1 && (opponent==null || opponent <= 0)) return "WALK_OVER";
            else return null;

        }
    }
}
