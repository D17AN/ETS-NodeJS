using EventTicketSystem.Models.Entities;

namespace EventTicketSystem.Repository.OrderRepository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllOrders();
        Task<IEnumerable<Order>> GetAllOrdersByEventId(long eventId);
        Task<IEnumerable<Order>> GetAllOrdersOfUser(long userId);
        Task<Order?> GetOrderById(long orderId);
        Task UpdateOrder(Order newOrder);
        Task DeleteOrder(Order order);
        Task AddOrder(Order order);
    }
}
