using EventTicketSystem.Middlewares.ExceptionHandlingMiddleware;
using EventTicketSystem.Models;
using EventTicketSystem.Repositories.EventRepository;
using EventTicketSystem.Repositories.EventTypeRepository;
using EventTicketSystem.Repositories.TicketCategoryRepository;
using EventTicketSystem.Repositories.UserRepository;
using EventTicketSystem.Repositories.VenuesRepository;
using EventTicketSystem.Repository.OrderRepository;
using EventTicketSystem.Services.EventService;
using EventTicketSystem.Services.EventTypesService;
using EventTicketSystem.Services.OrdersService;
using EventTicketSystem.Services.UserService;
using EventTicketSystem.Services.VenueService;
using Microsoft.EntityFrameworkCore;
using NLog.Web;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Logging.ClearProviders();
builder.Host.UseNLog();

builder.Services.AddAutoMapper(typeof(Program).Assembly);

IConfiguration configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

string? databaseConnectionString = configuration.GetConnectionString("DatabaseConnection");

builder.Services.AddDbContext<EventTicketSystemContext>
    (options => 
        options.UseSqlServer(databaseConnectionString)
        .UseLazyLoadingProxies()
        );

builder.Services.AddTransient<IOrderRepository, OrderRepository>();
builder.Services.AddTransient<IEventRepository, EventRepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<ITicketCategoryRepository, TicketCategoryRepository>();
builder.Services.AddTransient<IVenueRepository, VenueRepository>();
builder.Services.AddTransient<IEventTypesRepository, EventTypesRepository>();
builder.Services.AddTransient<IVenueService, VenueService>();
builder.Services.AddTransient<IEventService, EventService>();
builder.Services.AddTransient<IOrderService, OrderService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IEventTypesService, EventTypesService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin() // You can restrict origins here if needed
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors();
app.MapControllers();
app.Run();