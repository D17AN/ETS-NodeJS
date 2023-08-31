using EventTicketSystem.Models.DataAnnotationsValidations;
using System.ComponentModel.DataAnnotations;

namespace EventTicketSystem.Models.Entities;

public partial class Order
{
    [Range(0, long.MaxValue, ErrorMessage = "Order id out of range!")]
    public long OrderId { get; set; }

    [Range(0, long.MaxValue, ErrorMessage = "Order user id out of range!")]
    public long UserId { get; set; }

    [Range(0, long.MaxValue, ErrorMessage = "Order ticket category id out of range!")]
    public long TicketCategoryId { get; set; }

    [NotFutureDate(ErrorMessage = "Order date cannot be in the future!")]
    public DateTime OrderedAt { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "The number of tickets must be positive!")]
    public int NumberOfTickets { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "The total price must be positive!")]
    public decimal TotalPrice { get; set; }

    public virtual TicketCategory TicketCategory { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
