namespace EventTicketSystem.Models.DTOs
{
    public class OrderDTO
    {
        public long OrderId { get; set; }

        public long EventId { get; set; }
        
        public DateTime OrderedAt { get; set; }

        public long TicketCategoryId { get; set; }

        public int NumberOfTickets { get; set; }

        public decimal TotalPrice { get; set; }

    }
}
