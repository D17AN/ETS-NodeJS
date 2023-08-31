using EventTicketSystem.Models.DTOs;

namespace EventTicketSystem.Services.EventTypesService
{
    public interface IEventTypesService
    {
        Task<IEnumerable<EventTypeDTO>> GetAllEventTypes();
    }
}
