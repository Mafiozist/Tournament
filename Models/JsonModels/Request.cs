using System.Text.Json.Serialization;

namespace Tournament.Models.JsonModels
{
    public class Request
    {
        [JsonPropertyName("data")]
        public string Data { get; set; } = string.Empty;
        
        [JsonPropertyName("status")]
        public string Status { get; set; } = string.Empty;

        [JsonPropertyName("msg")]
        public string Msg { get; set; } = string.Empty;
    }
}
