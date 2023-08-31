using AutoMapper;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Repositories.EventTypeRepository;

namespace EventTicketSystem.Services.EventTypesService
{
    public class EventTypesService : IEventTypesService
    {
        private readonly IEventTypesRepository _eventTypesRepository;
        private readonly IMapper _mapper;

        public EventTypesService(IEventTypesRepository eventTypesRepository, IMapper mapper)
        {
            _eventTypesRepository = eventTypesRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EventTypeDTO>> GetAllEventTypes()
        {
            return (await _eventTypesRepository.GetAllEventTypes())
                .Select(eventType => _mapper.Map<EventTypeDTO>(eventType));
        }
    }
}
