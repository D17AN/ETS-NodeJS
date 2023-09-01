using EventTicketSystem.Middlewares.ExceptionHandlingMiddleware;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Services.EventTypesService;
using Microsoft.AspNetCore.Mvc;

namespace EventTicketSystem.Controllers
{
    [Route("api")]
    [ApiController]
    public class EventTypesController : Controller
    {
        private readonly IEventTypesService _eventTypesService;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public EventTypesController(IEventTypesService eventTypesService, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _eventTypesService = eventTypesService;
            _logger = logger;
        }

        [HttpGet("eventTypes")]
        public async Task<ActionResult<IEnumerable<EventTypeDTO>>> GetAllEventTypes()
        {
            return Ok(await _eventTypesService.GetAllEventTypes());
        }
    }
}
