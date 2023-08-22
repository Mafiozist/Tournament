using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Tournament.Models.JsonModels
{
    public class Request
    {
        public Request()
        {
            Data = null;
            Status = -1;
            Msg = "Сообщение по-умолчанию. Отсутствуют данные.";
        }

        [JsonProperty(PropertyName ="data")]
        public Object Data { get; set; }
        
        [JsonProperty(PropertyName = "status")]
        public int Status { get; set; }

        [JsonProperty(PropertyName = "msg")]
        public string Msg { get; set; } = string.Empty;
    }
}
