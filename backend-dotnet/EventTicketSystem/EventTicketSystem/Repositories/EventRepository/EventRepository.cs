using EventTicketSystem.Models;
using EventTicketSystem.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventTicketSystem.Repositories.EventRepository
{
    public class EventRepository : IEventRepository
    {
        private readonly EventTicketSystemContext _dbContext;

        public EventRepository(EventTicketSystemContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Event>> GetAllEvents()
        {
            return await _dbContext.Events
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetAllEventsByEventType(string eventTypeName)
        {
            return await _dbContext.Events.
                Where(@event => @event.EventType.EventTypeName.ToLower() == eventTypeName.ToLower())
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetAllEventsByVenueId(long venueId)
        {
            return await _dbContext.Events.Where(@event => @event.Venue.VenueId == venueId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetAllEventsByVenueIdAndEventType(long venueId, string eventTypeName)
        {
            return await _dbContext.Events.
                Where(_event => _event.Venue.VenueId == venueId && 
                _event.EventType.EventTypeName.ToLower() == eventTypeName.ToLower())
                .ToListAsync();
        }

        public async Task<long> GetAllEventsCount(
            string? searchKey, 
            List<long>? venuesIdList,
            List<string>? eventTypesList)
        {
            IQueryable<Event> query = _dbContext.Events;

            if (searchKey != null && searchKey.Trim() != "")
            {
                searchKey = searchKey.Trim().ToLower();
                query = query.Where(@event => @event.EventName.Contains(searchKey));
            }

            if (venuesIdList != null && venuesIdList.Any())
            {
                query = query.Where(@event => venuesIdList.Contains(@event.VenueId));
            }

            if (eventTypesList != null && eventTypesList.Any())
            {
                query = query.
                    Where(@event => eventTypesList
                    .Contains(@event.EventType.EventTypeName));
            }

            return (await query.CountAsync());
        }

        public async Task<Event?> GetEventById(long eventId)
        {   
            Event? @event = await _dbContext.Events
                .FirstOrDefaultAsync(e => e.EventId == eventId);
          
            return @event;
        }

        public async Task<IEnumerable<Event>> GetAllEventsPaginated(
            string? searchKey,
            List<long>? venuesIdList,
            List<string>? eventTypesList,
            int page, 
            int pageSize)
        {
            IQueryable<Event> query = _dbContext.Events;
            
            if (searchKey != null && searchKey.Trim() != "")
            {
                searchKey = searchKey.Trim().ToLower();
                query = query.Where(@event => @event.EventName.Contains(searchKey));
            }

            if (venuesIdList != null && venuesIdList.Any())
            {
                query = query.Where(@event => venuesIdList.Contains(@event.VenueId));
            }

            if (eventTypesList != null && eventTypesList.Any())
            {
                query = query.
                    Where(@event => eventTypesList
                    .Contains(@event.EventType.EventTypeName));
            }

            return (await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync());
        }
    }
}
