using EventTicketSystem.Middlewares.ExceptionHandlingMiddleware;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Services.VenueService;
using Microsoft.AspNetCore.Mvc;

namespace EventTicketSystem.Controllers
{

    [Route("api")]
    [ApiController]
    public class VenueController : Controller
    {
        
        private readonly IVenueService _venueService;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public VenueController(IVenueService venueService, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _venueService = venueService;
            _logger = logger;
        }

        [HttpGet("venues")]
        public async Task<ActionResult<IEnumerable<VenueDTO>>> GetAllVenues()
        {
            return Ok(await _venueService.GetAllVenues());
        }
    }
}
