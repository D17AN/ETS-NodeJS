using System.ComponentModel.DataAnnotations;

namespace EventTicketSystem.Models.Entities;

public partial class Event
{
    [Range(0, long.MaxValue, ErrorMessage = "Event id out of range!")]
    public long EventId { get; set; }

    [Range(0, long.MaxValue, ErrorMessage = "Venue id out of range!")]
    public long VenueId { get; set; }

    [Range(0, long.MaxValue, ErrorMessage = "Event type id out of range!")]
    public long EventTypeId { get; set; }

    [MaxLength(256, ErrorMessage = "Event description too long!")]
    public string? EventDescription { get; set; }

    [MaxLength(256, ErrorMessage = "Event name too long!")]
    public string EventName { get; set; } = null!;

    [MaxLength(1000, ErrorMessage = "Event image URL too long!")]
    public string? EventImageUrl { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public virtual EventType EventType { get; set; } = null!;

    public virtual ICollection<TicketCategory> TicketCategories { get; set; } = new List<TicketCategory>();

    public virtual Venue Venue { get; set; } = null!;
}
