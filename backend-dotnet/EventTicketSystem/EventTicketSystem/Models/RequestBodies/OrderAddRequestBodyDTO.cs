namespace EventTicketSystem.Models.RequestBodies
{
    public class OrderAddRequestBodyDTO
    {
        public long TicketCategoryId { get; set; }

        public long EventId {  get; set; }

        public int NumberOfTickets { get; set; }
    }
}
