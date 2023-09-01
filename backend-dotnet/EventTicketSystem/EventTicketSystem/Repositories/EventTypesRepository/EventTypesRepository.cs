using EventTicketSystem.Models;
using EventTicketSystem.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventTicketSystem.Repositories.EventTypeRepository
{
    public class EventTypesRepository : IEventTypesRepository
    {
        private readonly EventTicketSystemContext _dbContext;

        public EventTypesRepository(EventTicketSystemContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<EventType>> GetAllEventTypes()
        {
            return (await _dbContext.EventTypes.ToListAsync());
        }
    }
}
