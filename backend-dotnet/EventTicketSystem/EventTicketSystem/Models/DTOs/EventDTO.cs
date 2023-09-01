namespace EventTicketSystem.Models.DTOs
{
    public class EventDTO
    {
        public long EventId { get; set; }

        public VenueDTO? Venue { get; set; }

        public EventTypeDTO? EventType { get; set; }

        public string? EventDescription { get; set; }

        public string? EventName { get; set; }

        public string? EventImageUrl { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public ICollection<TicketCategoryDTO> TicketCategories { get; set; } = new List<TicketCategoryDTO>();


    }
}
