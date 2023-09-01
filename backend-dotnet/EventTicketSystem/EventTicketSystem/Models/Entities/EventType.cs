using System.ComponentModel.DataAnnotations;

namespace EventTicketSystem.Models.Entities;

public partial class EventType
{
    [Range(0, int.MaxValue, ErrorMessage = "Event id out of range!")]
    public long EventTypeId { get; set; }

    [MaxLength(256, ErrorMessage = "Event type name too long!")]
    public string EventTypeName { get; set; } = null!;

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();
}
