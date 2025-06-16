using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vis.Model;
using Vis.Repository.Interfaces;

namespace Vis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisplayController : ControllerBase
    {
        private readonly IDisplayService _displayService;
        public DisplayController(IDisplayService displayService)
        {
            _displayService = displayService;
        }

        [AllowAnonymous] 
        [HttpGet("view-basepremium-plans")]
        public ActionResult<IEnumerable<BasePremium>> ViewBasePremiumPlans()
        {
            var data = _displayService.ViewBasePremiumPlans();
            return Ok(data);
        }

        [AllowAnonymous]
        [HttpGet("view-addons")]
        public ActionResult<IEnumerable<AddOn>> ViewAddOns()
        {
            var data = _displayService.ViewAddOns();
            return Ok(data);
        }
    }
}
