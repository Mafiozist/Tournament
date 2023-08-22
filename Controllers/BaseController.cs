using Microsoft.AspNetCore.Mvc;

namespace Tournament.Controllers
{
    public class BaseController : Controller
    {
        protected IConfiguration _configuration;
        protected string _connectionString;

        public BaseController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("competition");
        }
    }
}
