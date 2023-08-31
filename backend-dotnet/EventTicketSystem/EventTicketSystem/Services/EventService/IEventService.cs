using EventTicketSystem.Models.DTOs;

namespace EventTicketSystem.Services.EventService
{
    public interface IEventService
    {
        Task<IEnumerable<EventDTO>> GetAllEventsByVenueIdAndEventType(long venueId, 
            string eventTypeName);
        Task<IEnumerable<EventDTO>> GetAllEventsByVenueId(long venueId);
        Task<IEnumerable<EventDTO>> GetAllEventsByEventType(string eventTypeName);
        Task<IEnumerable<EventDTO>> GetAllEvents();
        Task<EventDTOWrapper> GetAllEventsPaginated(
            string? searchKey,
            List<long>? venuesIdList,
            List<string>? eventTypesList,
            long page,
            long pageSize);
        Task<EventDTO> GetEventById(long id);
    }
}
