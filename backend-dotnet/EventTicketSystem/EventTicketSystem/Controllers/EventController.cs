using EventTicketSystem.Middlewares.ExceptionHandlingMiddleware;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Services.EventService;
using Microsoft.AspNetCore.Mvc;

namespace EventTicketSystem.Controllers
{
    [Route("api")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public EventController(IEventService eventService, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _eventService = eventService;
            _logger = logger;
        }

        [HttpGet("events")]
        public async Task<ActionResult<EventDTOWrapper>> GetAllEvents(
            [FromQuery] string? searchKey,
            [FromQuery] List<long>? venuesIdList, 
            [FromQuery] List<string>? eventTypesList, 
            long page = 1,
            long pageSize = 10)
        {
               
            EventDTOWrapper eventDTOWrapper = await _eventService
                .GetAllEventsPaginated(searchKey, venuesIdList, eventTypesList, page, pageSize);
            
            return Ok(eventDTOWrapper);
        }

        [HttpGet("events/{eventId}")]
        public async Task<ActionResult<EventDTO>> GetEventById(long eventId)
        {
            EventDTO eventDTO = await _eventService.GetEventById(eventId);
            return Ok(eventDTO);
        }
    }
}
