using AutoMapper;
using EventTicketSystem.Exceptions;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Models.Entities;
using EventTicketSystem.Models.RequestBodies;
using EventTicketSystem.Repositories.EventRepository;
using EventTicketSystem.Repositories.TicketCategoryRepository;
using EventTicketSystem.Repositories.UserRepository;
using EventTicketSystem.Repository.OrderRepository;

namespace EventTicketSystem.Services.OrdersService
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _ordersRepository;

        private readonly IUserRepository _userRepository;

        private readonly ITicketCategoryRepository _ticketCategoryRepository;

        private readonly IEventRepository _eventRepository;

        private readonly IMapper _mapper;

        public OrderService(
            IOrderRepository ordersRepository, IUserRepository userRepository,
            ITicketCategoryRepository ticketCategoryRepository, IMapper mapper,
            IEventRepository eventRepository
            )
        {
            _ordersRepository = ordersRepository;
            _userRepository = userRepository;
            _ticketCategoryRepository = ticketCategoryRepository;
            _eventRepository = eventRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrderDTO>> GetAllOrdersOfUser(long userId)
        {
            User? user = await _userRepository.GetUserById(userId);

            if (user == null)
            {
                throw new ElementNotFoundException(nameof(user), userId);
            }

            return (await _ordersRepository.GetAllOrdersOfUser(userId))
                .Select(order => _mapper.Map<OrderDTO>(order));
        }


        private async Task<int> GetNumberOfPurchasedTicketsForEvent(long eventId)
        {
            return (await _ordersRepository.GetAllOrdersByEventId(eventId)).Sum(order => order.NumberOfTickets);
        }


        public async Task<int> GetNumberOfAvailableTicketsByEventId(long eventId)
        {
            Event? @event = (await _eventRepository.GetEventById(eventId));
            
            if (@event == null)
            {
                throw new ElementNotFoundException(nameof(@event), eventId);
            }

            int totalNumberOfTickets = @event.Venue.Capacity;
            
            int numberOfPurchasedTickets = (await GetNumberOfPurchasedTicketsForEvent(eventId));
            
            return totalNumberOfTickets - numberOfPurchasedTickets;
        }

        public async Task<OrderDTO> AddOrder(long userId, OrderAddRequestBodyDTO orderRequestBody)
        {
            User? user = await _userRepository.GetUserById(userId);
            Event? @event = await _eventRepository.GetEventById(orderRequestBody.EventId);
            TicketCategory? ticketCategory = await _ticketCategoryRepository
                .GetTicketCategoryById(orderRequestBody.TicketCategoryId);

            if (user == null)
            {
                throw new ElementNotFoundException(nameof(user), userId);
            }

            if (@event == null)
            {
                throw new ElementNotFoundException(nameof(user), orderRequestBody.EventId);
            }

            if (ticketCategory == null)
            {
                throw new ElementNotFoundException(nameof(user), orderRequestBody.TicketCategoryId);
            }

            if (orderRequestBody.NumberOfTickets <= 0)
            {
                throw new ArgumentOutOfRangeException($"The number of tickets must be positive.");
            }

            int numberOfAvailableTickets = await GetNumberOfAvailableTicketsByEventId(@event.EventId);

            if (orderRequestBody.NumberOfTickets > numberOfAvailableTickets)
            {
                throw new ArgumentOutOfRangeException($"Only {numberOfAvailableTickets} tickets left.");
            }

            Order order = _mapper.Map<Order>(orderRequestBody);
            
            order.UserId = userId;
            order.User = user;
            order.TicketCategory = ticketCategory;
            order.TotalPrice = order.NumberOfTickets * order.TicketCategory.Price;
            await _ordersRepository.AddOrder(order);
    
            OrderDTO orderDTO = _mapper.Map<OrderDTO>(order);
            return orderDTO;
        }

        public async Task<OrderDTO> UpdateOrder(long userId, long orderId, OrderUpdateRequestBodyDTO orderRequestBody)
        {
            User? user = await _userRepository.GetUserById(userId);
            Order? order = await _ordersRepository.GetOrderById(orderId);

            if (user == null)
            {
                throw new ElementNotFoundException(nameof(user), userId); 
            }

            if (order == null)
            {
                throw new ElementNotFoundException(nameof(order), orderId);
            }

            if (order.UserId != userId)
            {
                throw new ElementNotFoundException($"Current user has no order with id {orderId}!");
            }

            if (orderRequestBody.TicketCategoryId == null)
            {
                orderRequestBody.TicketCategoryId = order.TicketCategoryId;
            }

            if (orderRequestBody.NumberOfTickets == null)
            {
                orderRequestBody.NumberOfTickets = order.NumberOfTickets;
            }
            else if (orderRequestBody.NumberOfTickets <= 0)
            {
                throw new ArgumentException("The number of tickets must be positive!");
            }

            TicketCategory? ticketCategory = await _ticketCategoryRepository
                .GetTicketCategoryById((long)orderRequestBody.TicketCategoryId);

            if (ticketCategory == null)
            {
                throw new ElementNotFoundException(nameof(ticketCategory), order.TicketCategoryId);
            }

            if (ticketCategory.EventId != order.TicketCategory.EventId)
            {
                throw new ArgumentException("The ticket category must be from the same event!");
            }

            order.TicketCategoryId = (long)orderRequestBody.TicketCategoryId;
            order.TicketCategory = ticketCategory;
            order.NumberOfTickets = (int)orderRequestBody.NumberOfTickets;
            order.TotalPrice = order.NumberOfTickets * order.TicketCategory.Price;

            await _ordersRepository.UpdateOrder(order);

            OrderDTO orderDTO = _mapper.Map<OrderDTO>(order);

            return orderDTO;
        }

        public async Task<OrderDTO> DeleteOrder(long userId, long orderId)
        {
            User? user = await _userRepository.GetUserById(userId);
            Order? order = await _ordersRepository.GetOrderById(orderId);

            if (user == null)
            {
                throw new ElementNotFoundException(nameof(user), userId);
            }

            if (order == null)
            {
                throw new ElementNotFoundException(nameof(order), orderId);
            }

            if (order.UserId != userId)
            {
                throw new ArgumentException($"Order with id {orderId} not found!");
            }

            OrderDTO orderDTO = _mapper.Map<OrderDTO>(order);

            await _ordersRepository.DeleteOrder(order);

            return orderDTO;
        }
    }
}
