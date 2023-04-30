using Microsoft.AspNetCore.Mvc;

namespace Tournament.Controllers
{
    public class TeamController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
