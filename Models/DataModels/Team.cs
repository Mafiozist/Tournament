namespace Tournament.Models.DataModels
{
    public class Team
    {
        public int? IdTeam { get; set; }
        public int? IdCap { get; set; }
        public string? Name { get; set; } = string.Empty;
        public int MembersCount { get; set; }
        public int MatchesWon { get; set; }
        public int GroupPassed { get; set; }
        public int TournamentsWon { get; set; }
        public List<Participant> Participants { get; set; } = new List<Participant>();
        public bool IsDeleted { get; set; } = false;
    }
}
