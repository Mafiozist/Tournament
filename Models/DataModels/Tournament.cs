namespace Tournament.Models.DataModels
{
    public class Tournament
    {
        public int Id_Tour { get; set; }
        public int Id_Discipline { get; set; }
        public int? Id_First_Winner { get; set; }
        public int? Id_Second_Winner { get; set; }
        public int? Id_Third_Winner { get; set; }
        public int? Id_Final_Match { get; set; }
        public string Name { get; set; }
        public bool Is_Ended { get; set; }
        public string? Prize { get; set; }
        public string? Place { get; set; }
        public int Teams_Count { get; set; }
        public int Members_Count { get; set; }
        public int Matches_Count { get; set; }
        public Group Group { get; set; }
        public List<Match> TournamentMatches { get; set; }
    }
}
