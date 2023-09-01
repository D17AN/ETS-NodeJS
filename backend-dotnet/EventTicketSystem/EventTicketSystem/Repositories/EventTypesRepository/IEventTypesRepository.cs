using EventTicketSystem.Models.Entities;

namespace EventTicketSystem.Repositories.EventTypeRepository
{
    public interface IEventTypesRepository
    {
        public Task<IEnumerable<EventType>> GetAllEventTypes();
    }
}
