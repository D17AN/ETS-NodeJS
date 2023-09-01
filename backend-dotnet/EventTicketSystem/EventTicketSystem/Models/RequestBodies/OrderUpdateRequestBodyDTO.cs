namespace EventTicketSystem.Models.RequestBodies
{
    public class OrderUpdateRequestBodyDTO
    {
        public long? TicketCategoryId { get; set;}

        public int? NumberOfTickets { get; set;}
    }
}
