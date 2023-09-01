using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Models.RequestBodies;

namespace EventTicketSystem.Services.OrdersService
{
    public interface IOrderService
    {
        public Task<IEnumerable<OrderDTO>> GetAllOrdersOfUser(long userId);

        Task<OrderDTO> AddOrder(long userId, OrderAddRequestBodyDTO orderRequestBody);

        Task<OrderDTO> UpdateOrder(long userId, long orderId, OrderUpdateRequestBodyDTO orderRequestBody);

        Task<OrderDTO> DeleteOrder(long userId, long orderId);

        Task<int> GetNumberOfAvailableTicketsByEventId(long eventId);
    }
}
