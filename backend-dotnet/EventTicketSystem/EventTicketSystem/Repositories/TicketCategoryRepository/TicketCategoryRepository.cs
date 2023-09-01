using EventTicketSystem.Models;
using EventTicketSystem.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventTicketSystem.Repositories.TicketCategoryRepository
{
    public class TicketCategoryRepository : ITicketCategoryRepository
    {
        private readonly EventTicketSystemContext _dbContext;

        public TicketCategoryRepository(EventTicketSystemContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<TicketCategory>> GetAllTicketCategories()
        {
            return await _dbContext.TicketCategories.ToListAsync();
        }

        public async Task<IEnumerable<TicketCategory>> GetAllTicketCategoriesByEventId(long eventId)
        {
           return await _dbContext.TicketCategories
                .Where(@event => @event.EventId == eventId).ToListAsync();
        }

        public async Task<TicketCategory?> GetTicketCategoryById(long ticketCategoryId)
        {
            TicketCategory? ticketCategory = await _dbContext.TicketCategories
                .FirstOrDefaultAsync(ticketCategory => ticketCategory.TicketCategoryId == ticketCategoryId);

            return ticketCategory;
        }
    }
}
