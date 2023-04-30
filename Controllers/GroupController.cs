using Microsoft.AspNetCore.Mvc;

namespace Tournament.Controllers
{
    public class GroupController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
