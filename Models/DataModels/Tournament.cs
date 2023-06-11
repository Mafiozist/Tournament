namespace Tournament.Models.DataModels
{
    public class Tournament
    {
        public int IdTour { get; set; }
        public int IdDiscipline { get; set; }
        public int? IdFirstWinner { get; set; }
        public int? IdSecondWinner { get; set; }
        public int? IdThirdWinner { get; set; }
        public int? IdFinalMatch { get; set; }
        public string Name { get; set; }
        public bool IsEnded { get; set; }
        public string? Prize { get; set; }
        public string? Place { get; set; }
        public int TeamsCount { get; set; }
        public int MembersCount { get; set; }
        public int MatchesCount { get; set; }
        public Group Group { get; set; }
        public List<Match> TournamentMatches { get; set; }
    }
}
