using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Abstractions;
using Vis.Repository.Interfaces;

namespace Vis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        //[AllowAnonymous]
        [Authorize(Roles = "Admin")]
        [HttpGet("view-log")]
        public ActionResult<IEnumerable<LogEntry>> ViewLog()
        {
            var logs = _adminService.ViewLog();

            if (!logs.Any())
            {
                return NotFound("No Entries yet");
            }

            return Ok(logs);
        }
    }
}
