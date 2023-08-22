using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Tournament.Models.DataModels
{

    public class Participant
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "id_role")]
        public int IdRole { get; set; }

        [JsonProperty(PropertyName = "id_depart")]
        public int IdDepart { get; set; }

        [JsonProperty(PropertyName = "first_name")]
        public string FirstName { get; set; } = string.Empty;

        [JsonProperty(PropertyName = "last_name")]
        public string LastName { get; set; } = string.Empty;

        [JsonProperty(PropertyName = "patronymic")]
        public string Patronymic { get; set; } = string.Empty;

        [JsonProperty(PropertyName = "birth_date")]
        public DateTime BirthDate { get; set; }

        [JsonProperty(PropertyName = "gender")]
        public char Gender { get; set; }

        [JsonProperty(PropertyName = "is_deleted")]
        public bool IsDeleted { get; set; }
    }
}
