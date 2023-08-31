namespace EventTicketSystem.Models.DTOs
{
    public class TicketCategoryDTO
    {
        public long TicketCategoryId { get; set; }

        public string? TicketType { get; set; }
        
        public decimal Price { get; set; }
    }
}
