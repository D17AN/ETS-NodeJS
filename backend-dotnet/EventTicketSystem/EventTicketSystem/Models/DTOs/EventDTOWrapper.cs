namespace EventTicketSystem.Models.DTOs
{
    public class EventDTOWrapper
    {
        public IEnumerable<EventDTO> Events { get; set; } = new List<EventDTO>();

        public long Page { get; set; }

        public long NumberOfPages { get; set; }
    }
}
