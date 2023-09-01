namespace EventTicketSystem.Models.DTOs
{
    public class VenueDTO
    {
        public long VenueId { get; set; }

        public LocationDTO? Location { get; set; }
        
        public string? Type { get; set; }

        public int Capacity { get; set; }
    }
}
