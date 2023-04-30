using Microsoft.AspNetCore.Mvc;

namespace Tournament.Controllers
{
    public class ParticipantController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
