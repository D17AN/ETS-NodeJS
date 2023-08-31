using System.ComponentModel.DataAnnotations;

namespace EventTicketSystem.Models.Entities;

public partial class Location
{
    [Range(0, long.MaxValue, ErrorMessage = "Location id out of range!")]
    public long LocationId { get; set; }

    [MaxLength(256, ErrorMessage = "Location country name too long!")]
    public string CountryName { get; set; } = null!;

    [MaxLength(256, ErrorMessage = "Location city name too long!")]
    public string CityName { get; set; } = null!;

    [MaxLength(256, ErrorMessage = "Location address too long!")]
    public string Address { get; set; } = null!;

    public virtual Venue? Venue { get; set; }
}
