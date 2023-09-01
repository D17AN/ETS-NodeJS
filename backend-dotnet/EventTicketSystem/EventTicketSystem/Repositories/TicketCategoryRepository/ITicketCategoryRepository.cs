using EventTicketSystem.Models.Entities;

namespace EventTicketSystem.Repositories.TicketCategoryRepository
{
    public interface ITicketCategoryRepository
    {
        Task<IEnumerable<TicketCategory>> GetAllTicketCategories();
        Task<IEnumerable<TicketCategory>> GetAllTicketCategoriesByEventId(long eventId);
        Task<TicketCategory?> GetTicketCategoryById(long ticketCategoryId);
    }
}
