using System.ComponentModel.DataAnnotations;

namespace EventTicketSystem.Models.Entities;

public partial class TicketCategory
{
    [Range(0, long.MaxValue, ErrorMessage = "Ticket category id out of range!")]
    public long TicketCategoryId { get; set; }

    [Range(0, long.MaxValue, ErrorMessage = "Ticket category event id out of range!")]
    public long EventId { get; set; }

    [MaxLength(256, ErrorMessage = "Ticket type too long.")]
    [RegularExpression("^(standard|vip)$", ErrorMessage = "The ticket type must be standard or vip!")]
    public string TicketType { get; set; } = null!;

    [Range(0, double.MaxValue, ErrorMessage = "The ticket price must be standard or vip!")]
    public decimal Price { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
