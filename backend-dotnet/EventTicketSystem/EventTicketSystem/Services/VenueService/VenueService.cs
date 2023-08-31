using AutoMapper;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Repositories.VenuesRepository;

namespace EventTicketSystem.Services.VenueService
{
    public class VenueService : IVenueService
    {
        private readonly IVenueRepository _venueRepository;
        private readonly IMapper _mapper;

        public VenueService(IVenueRepository venueRepository, IMapper mapper)
        {
            _venueRepository = venueRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<VenueDTO>> GetAllVenues()
        {
            return (await _venueRepository.GetAllVenues())
                .Select(venue => _mapper.Map<VenueDTO>(venue));
        }
    }
}
