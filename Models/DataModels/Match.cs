namespace Tournament.Models.DataModels
{
    public class Match
    {
        public int IdMatch { get; set; }
        public int IdNextMatch { get; set; }
        public int IdPrevMatch { get; set; }
        public int? IdWinner { get; set; }
        public int IdParent { get; set; }
        public string State { get; set; } = string.Empty;
        public bool IsTop { get; set; }
        public List<Team> Teams { get; set; } = new List<Team>();
        public bool IsDeleted { get; set; } = false;
    }
}
