using System.ComponentModel.DataAnnotations;

namespace EventTicketSystem.Models.Entities;

public partial class User
{
    [Range(0, long.MaxValue, ErrorMessage = "User id out of range!")]
    public long UserId { get; set; }

    [MaxLength(256, ErrorMessage = "User name too long!")]
    public string UserName { get; set; } = null!;

    [MaxLength(256, ErrorMessage = "User email too long!")]
    [EmailAddress(ErrorMessage = "User email must be a valid email!")]
    public string UserEmail { get; set; } = null!;

    [MaxLength(256, ErrorMessage = "User role too long!")]
    [RegularExpression("^(admin|customer)$", ErrorMessage = "The user role must be admin or customer!")]
    public string UserRole { get; set; } = null!;

    [MinLength(16, ErrorMessage = "The salt must have 16 characters!")]
    [MaxLength(16, ErrorMessage = "The salt must have 16 characters!")]
    public string? Salt { get; set; }

    [MaxLength(256, ErrorMessage = "Password too long!")]
    public string HashedPassword { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
