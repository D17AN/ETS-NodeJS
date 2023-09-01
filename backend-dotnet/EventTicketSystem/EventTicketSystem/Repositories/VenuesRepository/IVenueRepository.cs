using EventTicketSystem.Models.Entities;

namespace EventTicketSystem.Repositories.VenuesRepository
{
    public interface IVenueRepository
    {
        Task<IEnumerable<Venue>> GetAllVenues();
    }
}
