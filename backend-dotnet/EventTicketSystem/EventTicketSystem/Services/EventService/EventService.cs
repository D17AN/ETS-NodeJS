using AutoMapper;
using EventTicketSystem.Exceptions;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Models.Entities;
using EventTicketSystem.Repositories.EventRepository;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace EventTicketSystem.Services.EventService
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;

        public EventService(IEventRepository eventRepository, IMapper mapper)
        {
            _eventRepository = eventRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EventDTO>> GetAllEventsByVenueIdAndEventType(long venueId, string eventTypeName)
        {
            return (await _eventRepository.GetAllEventsByVenueIdAndEventType(venueId, eventTypeName))
                .Select(@event => _mapper.Map<EventDTO>(@event));
        }

        public async Task<IEnumerable<EventDTO>> GetAllEventsByVenueId(long venueId)
        {
            return (await _eventRepository.GetAllEventsByVenueId(venueId))
                .Select(@event => _mapper.Map<EventDTO>(@event));
        }

        public async Task<IEnumerable<EventDTO>> GetAllEventsByEventType(string eventTypeName)
        {
            return (await _eventRepository.GetAllEventsByEventType(eventTypeName))
                .Select(@event => _mapper.Map<EventDTO>(@event));
        }

        public async Task<IEnumerable<EventDTO>> GetAllEvents()
        {
            return (await _eventRepository.GetAllEvents())
                .Select(@event => _mapper.Map<EventDTO>(@event));
        }

        public async Task<EventDTO> GetEventById(long id)
        {
            Event? @event = (await _eventRepository.GetEventById(id));
            
            if (@event == null)
            {
                throw new ElementNotFoundException(nameof(@event), id);
            }

            return _mapper.Map<EventDTO>(@event);
        }
        
        public async Task<EventDTOWrapper> GetAllEventsPaginated(
            string? searchKey,
            List<long>? venuesIdList, 
            List<string>? eventTypesList, 
            long page, 
            long pageSize)
        {
            
            long numberOfEvents = await _eventRepository
                .GetAllEventsCount(searchKey, venuesIdList, eventTypesList);

            long numberOfPages = (numberOfEvents + pageSize - 1) / pageSize;

            IEnumerable<EventDTO> eventsDtos = (await _eventRepository
                .GetAllEventsPaginated(searchKey, venuesIdList, eventTypesList, (int)page, (int)pageSize))
                .Select(@event => _mapper.Map<EventDTO>(@event));

            EventDTOWrapper eventDTOWrapper = _mapper.Map<EventDTOWrapper>(eventsDtos);
            eventDTOWrapper.Page = page;
            eventDTOWrapper.NumberOfPages = numberOfPages;
            return eventDTOWrapper;
        }
    }
}
