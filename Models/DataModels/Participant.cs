namespace Tournament.Models.DataModels
{
    public class Participant
    {
        public int IdParticipant { get; set; }
        public int IdRole { get; set; }
        public int IdDepart { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string SecondName { get; set; } = string.Empty;
        public string Patronymic { get; set; } = string.Empty;
        public int Age { get; set; }
        public char Gender { get; set; }
        public bool IsDeleted { get; set; }
    }
}
