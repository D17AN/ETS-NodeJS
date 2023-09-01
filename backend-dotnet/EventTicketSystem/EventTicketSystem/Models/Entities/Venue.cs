using System.ComponentModel.DataAnnotations;

namespace EventTicketSystem.Models.Entities;

public partial class Venue
{
    [Range(0, long.MaxValue, ErrorMessage = "Venue id out of range!")]
    public long VenueId { get; set; }

    [Range(0, long.MaxValue, ErrorMessage = "Location id out of range!")]
    public long LocationId { get; set; }

    [MaxLength(256, ErrorMessage = "Venue type too long!")]
    public string Type { get; set; } = null!;

    [Range(0, int.MaxValue, ErrorMessage = "Venue capacity must be positive!")]
    public int Capacity { get; set; }

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    public virtual Location Location { get; set; } = null!;
}
