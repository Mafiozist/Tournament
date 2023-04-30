using Microsoft.AspNetCore.Mvc;

namespace Tournament.Controllers
{
    public class TournamentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
