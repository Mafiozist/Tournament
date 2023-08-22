using Dapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;
using Tournament.Models.DataModels;

namespace Tournament.Controllers
{
    [ApiController]
    [Route("[controller]/api/")]
    public class ParticipantsController : BaseController
    {
        public ParticipantsController(IConfiguration configuration) : base(configuration) { }

        [HttpGet("GetParticipants")]
        public string GetParticipants()
        {
            Models.JsonModels.Request res = new Models.JsonModels.Request();

            using (var db = new NpgsqlConnection(_connectionString))
            {
                db.Open();

                try
                {
                    var participants = db.Query(@"SELECT id_member as id
                                                        , id_role
                                                        , first_name
                                                        , last_name
                                                        , patronymic
                                                        , depart as id_depart
                                                        , birth_date
                                                        , gender
                                                        , is_deleted
                                                  FROM public.participant 
                                                  ORDER BY last_name;")
                                        .ToList();

                    return JsonConvert.SerializeObject(participants);
                }
                catch (Exception ex)
                {
                    res.Status = -1;
                    res.Msg = ex.Message;

                    return JsonConvert.SerializeObject(res);
                }

            }
        }

        [HttpGet("GetRoles")]
        public string GetRoles()
        {
            Models.JsonModels.Request res = new Models.JsonModels.Request();

            using (var db = new NpgsqlConnection(_connectionString))
            {
                db.Open();

                try
                {
                    var roles = db.Query(@"SELECT id_role
                                                  , name 
                                           FROM public.role;")
                                .ToList();

                    return JsonConvert.SerializeObject(roles);
                }
                catch (Exception ex)
                {
                    res.Status = -1;
                    res.Msg = ex.Message;

                    return JsonConvert.SerializeObject(res);
                }

            }
        }

        [HttpGet("GetParticipant")]
        public string GetParticipant(int id)
        {
            Models.JsonModels.Request res = new Models.JsonModels.Request();

            using (var db = new NpgsqlConnection(_connectionString))
            {
                db.Open();

                try
                {
                    var participants = db.Query($@"SELECT 
                                                       id_member as id
                                                       , id_role
                                                       , first_name
                                                       , last_name
                                                       , patronymic
                                                       , depart as id_depart
                                                       , birth_date
                                                       , gender
                                                       , is_deleted
                                                    FROM public.participant
                                                    WHERE id_member = '{id}' ")
                                        .ToList();

                    return JsonConvert.SerializeObject(participants);
                }
                catch (Exception ex)
                {
                    res.Status = -1;
                    res.Msg = ex.Message;

                    return JsonConvert.SerializeObject(res);
                }

            }
        }

        [HttpPost("EditOrCreateParticipant")]
        
        public string EditOrCreateParticipant(Participant person)
        {
            Models.JsonModels.Request res = new Models.JsonModels.Request();

            using (var db = new NpgsqlConnection(_connectionString))
            {
                db.Open();
                var transact = db.BeginTransaction();

                try
                {
                    
                    if (person.Id <= 0) //Добавление в 
                    {
                        int status = db.Execute($@"INSERT INTO public.participant (first_name,last_name,patronymic,depart,birth_date,gender, id_role) 
                                    VALUES ('{person.FirstName}', '{person.LastName}', '{person.Patronymic}', '{person.IdDepart}', '{person.BirthDate.ToShortDateString()}', '{person.Gender}', '{person.IdRole}')");

                        if (status != 1) throw new Exception("Пользователь не был добавлен.");

                        res.Status = 1;
                        res.Msg = "Пользователь был успешно добавлен";

                        transact.Commit();

                        return JsonConvert.SerializeObject(res);
                    }

                    int val = db.Execute($@"UPDATE public.participant 
                                            SET first_name='{person.FirstName}'
                                            ,last_name='{person.LastName}'
                                            ,patronymic='{person.Patronymic}'
                                            ,depart='{person.IdDepart}'
                                            ,birth_date='{person.BirthDate.ToShortDateString()}'
                                            ,gender='{person.Gender}'
                                            ,is_deleted='{person.IsDeleted}'
                                            ,id_role='{person.IdRole}'
                                            WHERE id_member='{person.Id}'");

                    if (val != 1) throw new Exception("Не удалось обновить информацию об пользователе.");

                    transact.Commit();

                    res.Status = 1;
                    res.Msg = "Информация о пользователе успешно обновлена";

                    return JsonConvert.SerializeObject(res);
                }
                catch (Exception ex)
                {
                    transact.Rollback();
                    res.Status = -1;
                    res.Msg = ex.Message;

                    return JsonConvert.SerializeObject(res);
                }
            }
        }

        [HttpPost]
        public string LoadParticipantsFromExcel(IFormFile file)
        {


            return string.Empty;
        }
    }
}
