namespace Tournament.Models.DataModels
{
    public class Team
    {
        public int Id_Team { get; set; }
        public int Id_Cap { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Members_Count { get; set; }
        public int Matches_Won { get; set; }
        public int Group_Passed { get; set; }
        public int Tournaments_Won { get; set; }
        public List<Participant> Participants { get; set; } = new List<Participant>();
        public bool Is_Deleted { get; set; } = false;
    }
}
