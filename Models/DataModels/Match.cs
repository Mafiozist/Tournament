namespace Tournament.Models.DataModels
{
    public class Match
    {
        public int Id_Match { get; set; }
        public int Id_Next_Match { get; set; }
        public int Id_Prev_Match { get; set; }
        public int? Id_Winner { get; set; }
        public int Id_Parent { get; set; }
        public string State { get; set; } = string.Empty;
        public int Status { get; set; }
        public bool Is_Top { get; set; }
        public List<Team> Teams { get; set; } = new List<Team>();
        public bool Is_Deleted { get; set; } = false;
    }
}
