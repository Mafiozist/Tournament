namespace Tournament.Models.DataModels
{
    public class Group
    {
        public int IdGroup { get; set; }
        public int IdTournament { get; set; }
        public int? IdFinalMatch { get; set; }
        public string Name { get; set; }
        public int MembersCount { get; set; }
        public int TeamsCount { get; set; }
        public List<Match> GroupMatches { get; set; }
    }
}
