using EventTicketSystem.Models;
using EventTicketSystem.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventTicketSystem.Repositories.VenuesRepository
{
    public class VenueRepository : IVenueRepository
    {
        private readonly EventTicketSystemContext _dbContext;

        public VenueRepository(EventTicketSystemContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Venue>> GetAllVenues()
        {
            return await _dbContext.Venues.ToListAsync();
        }
    }
}
