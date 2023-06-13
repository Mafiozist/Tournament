namespace Tournament.Models.DataModels
{
    public class Match
    {
        public int Id { get; set; }
        public int? NextMatchId { get; set; }
        public int? IdWinner { get; set; }
        public int IdParent { get; set; }
        public string State { get; set; } = string.Empty;
        public string Result { get; set; } = string.Empty;
        public int Status { get; set; }
        public bool IsTop { get; set; }
        public List<Team> Participants { get; set; } = new List<Team>();
        public bool IsDeleted { get; set; } = false;
    }
}
