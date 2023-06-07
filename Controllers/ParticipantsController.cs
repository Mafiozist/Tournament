using Microsoft.AspNetCore.Mvc;

namespace Tournament.Controllers
{
    public class ParticipantsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
