using Newtonsoft.Json;

namespace Tournament.Models.DataModels
{
    public class Match
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

 
        public int? NextMatchId { get; set; }

        public int? IdWinner { get; set; }

        [JsonProperty(PropertyName = "id_parent")]
        public int IdParent { get; set; } //Турнир или группа
        public int State { get; set; }
        public string Result { get; set; } = string.Empty;
        public string Status { get; set; }
        public bool IsTop { get; set; }
        public List<Team> Participants { get; set; } = new List<Team>();
        public bool IsDeleted { get; set; } = false;
    }
}
