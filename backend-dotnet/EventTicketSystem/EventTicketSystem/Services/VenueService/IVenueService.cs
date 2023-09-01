using EventTicketSystem.Models.DTOs;

namespace EventTicketSystem.Services.VenueService
{
    public interface IVenueService
    {
        Task<IEnumerable<VenueDTO>> GetAllVenues();
    }
}
