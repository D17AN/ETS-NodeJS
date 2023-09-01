using EventTicketSystem.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventTicketSystem.Models;

public partial class EventTicketSystemContext : DbContext
{
    public EventTicketSystemContext()
    {
    }

    public EventTicketSystemContext(DbContextOptions<EventTicketSystemContext> options)
        : base(options)
    {
        
    }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<EventType> EventTypes { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<TicketCategory> TicketCategories { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Venue> Venues { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.EventId).HasName("PK__Event__2DC7BD697B7EA2CB");

            entity.ToTable("Event");

            entity.Property(e => e.EventId).HasColumnName("eventID");
            entity.Property(e => e.EndDate)
                .HasColumnType("datetime")
                .HasColumnName("endDate");
            entity.Property(e => e.EventDescription)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("eventDescription");
            entity.Property(e => e.EventImageUrl)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("eventImageURL");
            entity.Property(e => e.EventName)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("eventName");
            entity.Property(e => e.EventTypeId).HasColumnName("eventTypeID");
            entity.Property(e => e.StartDate)
                .HasColumnType("datetime")
                .HasColumnName("startDate");
            entity.Property(e => e.VenueId).HasColumnName("venueID");

            entity.HasOne(d => d.EventType).WithMany(p => p.Events)
                .HasForeignKey(d => d.EventTypeId)
                .HasConstraintName("FK__Event__eventType__70A8B9AE");

            entity.HasOne(d => d.Venue).WithMany(p => p.Events)
                .HasForeignKey(d => d.VenueId)
                .HasConstraintName("FK__Event__venueID__6FB49575");
        });

        modelBuilder.Entity<EventType>(entity =>
        {
            entity.HasKey(e => e.EventTypeId).HasName("PK__EventTyp__04ACC49D75245BB9");

            entity.ToTable("EventType");

            entity.HasIndex(e => e.EventTypeName, "UQ__EventTyp__F1C27EB16381C619").IsUnique();

            entity.Property(e => e.EventTypeId).HasColumnName("eventTypeID");
            entity.Property(e => e.EventTypeName)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("eventTypeName");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.LocationId).HasName("PK__Location__30646B0E450E04F5");

            entity.ToTable("Location");

            entity.Property(e => e.LocationId).HasColumnName("locationID");
            entity.Property(e => e.Address)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.CityName)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("cityName");
            entity.Property(e => e.CountryName)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("countryName");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Order__0809337DB1B8EE4C");

            entity.ToTable("Order");

            entity.Property(e => e.OrderId).HasColumnName("orderID");
            entity.Property(e => e.NumberOfTickets).HasColumnName("numberOfTickets");
            entity.Property(e => e.OrderedAt)
                .HasColumnType("datetime")
                .HasColumnName("orderedAt");
            entity.Property(e => e.TicketCategoryId).HasColumnName("ticketCategoryID");
            entity.Property(e => e.TotalPrice)
                .HasColumnType("decimal(20, 2)")
                .HasColumnName("totalPrice");
            entity.Property(e => e.UserId).HasColumnName("userID");

            entity.HasOne(d => d.TicketCategory).WithMany(p => p.Orders)
                .HasForeignKey(d => d.TicketCategoryId)
                .HasConstraintName("FK__Order__ticketCat__793DFFAF");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Order__userID__7849DB76");
        });

        modelBuilder.Entity<TicketCategory>(entity =>
        {
            entity.HasKey(e => e.TicketCategoryId).HasName("PK__TicketCa__56F2E67A38FB5946");

            entity.ToTable("TicketCategory");

            entity.HasIndex(e => new { e.EventId, e.TicketType }, "UC_TicketCategory_Event").IsUnique();

            entity.Property(e => e.TicketCategoryId).HasColumnName("ticketCategoryID");
            entity.Property(e => e.EventId).HasColumnName("eventID");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("price");
            entity.Property(e => e.TicketType)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("ticketType");

            entity.HasOne(d => d.Event).WithMany(p => p.TicketCategories)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("FK__TicketCat__event__74794A92");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__CB9A1CDF69801459");

            entity.ToTable("User");

            entity.HasIndex(e => e.UserEmail, "UQ__User__D54ADF553660F77C").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("userID");
            entity.Property(e => e.HashedPassword)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("hashedPassword");
            entity.Property(e => e.Salt)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("salt");
            entity.Property(e => e.UserEmail)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("userEmail");
            entity.Property(e => e.UserName)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("userName");
            entity.Property(e => e.UserRole)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasDefaultValueSql("('customer')")
                .HasColumnName("userRole");
        });

        modelBuilder.Entity<Venue>(entity =>
        {
            entity.HasKey(e => e.VenueId).HasName("PK__Venue__4DDFB71FBEAADC48");

            entity.ToTable("Venue");

            entity.HasIndex(e => e.LocationId, "UQ__Venue__30646B0F25795AE5").IsUnique();

            entity.Property(e => e.VenueId).HasColumnName("venueID");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
            entity.Property(e => e.LocationId).HasColumnName("locationID");
            entity.Property(e => e.Type)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("type");

            entity.HasOne(d => d.Location).WithOne(p => p.Venue)
                .HasForeignKey<Venue>(d => d.LocationId)
                .HasConstraintName("FK__Venue__locationI__69FBBC1F");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
