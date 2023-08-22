using Newtonsoft.Json;

namespace Tournament.Models.DTO
{
    public class MatchInfo
    {
        public int IdMatch { get; set; }
        public int IdNextMatch { get; set; }
        public int IdTour { get; set; }
        public int IdWinner { get; set; }
        public string Result { get; set; }
    }

    public class TeamDto
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string TeamName { get; set; }

        [JsonProperty(PropertyName = "users")]
        public int[]? Users { get; set; }

        [JsonProperty(PropertyName = "is_deleted")]
        public bool IsDeleted { get; set; }
    }

    public class TournInfo
    {
        public string Name { get; set; }
        public int[] Teams { get; set; }
    }
}
