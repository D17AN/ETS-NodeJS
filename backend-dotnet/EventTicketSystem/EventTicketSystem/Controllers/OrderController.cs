using EventTicketSystem.Middlewares.ExceptionHandlingMiddleware;
using EventTicketSystem.Models.DTOs;
using EventTicketSystem.Models.RequestBodies;
using EventTicketSystem.Services.OrdersService;
using Microsoft.AspNetCore.Mvc;

namespace EventTicketSystem.Controllers
{
    [Route("api")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public OrderController(IOrderService orderService, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _orderService = orderService;
            _logger = logger;
        }

        [HttpGet("{userId}/orders")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetAllOrdersOfUser(long userId)
        {
            IEnumerable<OrderDTO> ordersDTOsList = await _orderService.GetAllOrdersOfUser(userId);
            return Ok(ordersDTOsList);       
        }

        [HttpPost("{userId}/orders")]
        public async Task<ActionResult<OrderDTO>> AddOrder(long userId, [FromBody] OrderAddRequestBodyDTO orderRequestBody)
        { 
            OrderDTO orderDTO = await _orderService.AddOrder(userId, orderRequestBody);
            return Ok(orderDTO); 
        }

        [HttpPatch("{userId}/orders/{orderId}")]
        public async Task<ActionResult<OrderDTO>> UpdateOrder(long userId, long orderId, 
            [FromBody] OrderUpdateRequestBodyDTO orderRequestBody) 
        {
            OrderDTO orderDTO = await _orderService.UpdateOrder(userId, orderId, orderRequestBody);
            return Ok(orderDTO);
        }

        [HttpDelete("{userId}/orders/{orderId}")]
        public async Task<ActionResult<OrderDTO>> DeleteOrder(long userId, long orderId)
        {
            OrderDTO orderDTO = await _orderService.DeleteOrder(userId, orderId);
            return Ok(orderDTO);
        }
    }
}
