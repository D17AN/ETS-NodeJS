using EventTicketSystem.Models.Entities;

namespace EventTicketSystem.Repositories.EventRepository
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllEvents();
        Task<IEnumerable<Event>> GetAllEventsPaginated(
            string? searchKey,
            List<long>? venuesIdList,
            List<string>? eventTypesList,
            int page, 
            int pageSize);
        Task<IEnumerable<Event>> GetAllEventsByVenueIdAndEventType(long venueId, string eventTypeName);
        Task<IEnumerable<Event>> GetAllEventsByVenueId(long venueId);
        Task<IEnumerable<Event>> GetAllEventsByEventType(string eventTypeName);
        Task<Event?> GetEventById(long eventId);
        Task<long> GetAllEventsCount(
            string? searchKey,
            List<long>? venuesIdList,
            List<string>? eventTypesList);
    }
}
