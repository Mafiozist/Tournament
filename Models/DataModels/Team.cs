using Newtonsoft.Json;

namespace Tournament.Models.DataModels
{
    public class Team
    {
        [JsonProperty(PropertyName = "id")]
        public int? Id { get; set; }

        [JsonProperty(PropertyName = "id_cap")]
        public int? IdCap { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string? Name { get; set; } = string.Empty;

        [JsonProperty(PropertyName = "members_count")]
        public int MembersCount { get; set; }

        [JsonProperty(PropertyName = "resultText")] //Для библиотеки по отображению сетки
        public string ResultText { get; set; } = String.Empty;

        [JsonProperty(PropertyName = "matches_won")]
        public int MatchesWon { get; set; }

        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; } = String.Empty;

        public bool IsWinner { get; set; }  = false; //Для библиотеки по отображению сетки

        [JsonProperty(PropertyName = "group_passed")]
        public int GroupPassed { get; set; }

        [JsonProperty(PropertyName = "tournaments_won")]
        public int TournamentsWon { get; set; }
        public List<Participant> members { get; set; } = new List<Participant>();

        [JsonProperty(PropertyName = "is_deleted")]
        public bool IsDeleted { get; set; }
    }
}
