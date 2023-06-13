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
}
