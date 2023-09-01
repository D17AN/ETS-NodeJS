using AutoMapper;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Models.Entities;

namespace EventTicketSystem.Models.AutoMappers
{
    public class EventProfile : Profile 
    {
        public EventProfile()
        {
            CreateMap<Event, EventDTO>().ReverseMap();
            CreateMap<Venue, VenueDTO>().ReverseMap();
            CreateMap<Location, LocationDTO>().ReverseMap();
            CreateMap<EventType, EventTypeDTO>().ReverseMap();
            CreateMap<TicketCategory, TicketCategoryDTO>().ReverseMap();

            CreateMap<IEnumerable<EventDTO>, EventDTOWrapper>()
                .ForMember(dest => dest.Events, opt => opt.MapFrom(src => src))
                .ForMember(dest => dest.Page, opt => opt.Ignore())
                .ForMember(dest => dest.NumberOfPages, opt => opt.Ignore());

        }
    }
}
