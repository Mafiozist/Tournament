using Microsoft.AspNetCore.Mvc;

namespace Tournament.Controllers
{
    public class HistoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
