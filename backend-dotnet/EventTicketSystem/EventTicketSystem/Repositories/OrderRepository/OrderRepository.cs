using EventTicketSystem.Models;
using EventTicketSystem.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventTicketSystem.Repository.OrderRepository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly EventTicketSystemContext _dbContext;
        public OrderRepository(EventTicketSystemContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddOrder(Order order)
        {
            await _dbContext.Orders.AddAsync(order);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteOrder(Order order)
        {
            _dbContext.Orders.Remove(order);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            return await _dbContext.Orders.ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetAllOrdersByEventId(long eventId)
        {
            return await _dbContext.Orders
                .Where(order => order.TicketCategory.EventId == eventId).ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetAllOrdersOfUser(long userId)
        {
            return await _dbContext.Orders
                .Where(order => order.UserId == userId).ToListAsync();
        }

        public async Task<Order?> GetOrderById(long orderId)
        {
            Order? order = await _dbContext.Orders
                .FirstOrDefaultAsync(order => order.OrderId == orderId);
         
            return order;
        }

        public async Task UpdateOrder(Order newOrder)
        {
            Order? oldOrder = await GetOrderById(newOrder.OrderId);
            
            if (oldOrder == null)
            {
                return;
            }

            oldOrder.TicketCategoryId = newOrder.TicketCategoryId;
            oldOrder.NumberOfTickets = newOrder.NumberOfTickets;
            oldOrder.TotalPrice = newOrder.TotalPrice;
            await _dbContext.SaveChangesAsync();
        }
    }
}
