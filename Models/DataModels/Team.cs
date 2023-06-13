namespace Tournament.Models.DataModels
{
    public class Team
    {
        public int? Id { get; set; }
        public int? IdCap { get; set; }
        public string? Name { get; set; } = string.Empty;
        public int MembersCount { get; set; }
        public string ResultText { get; set; } = String.Empty;
        public int MatchesWon { get; set; }
        public string Status { get; set; } = String.Empty;
        public bool IsWinner { get; set; }  = false;
        public int GroupPassed { get; set; }
        public int TournamentsWon { get; set; }
        public List<Participant> members { get; set; } = new List<Participant>();
        public bool IsDeleted { get; set; } = false;
    }
}
