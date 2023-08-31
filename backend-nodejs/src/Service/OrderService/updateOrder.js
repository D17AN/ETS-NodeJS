const mapper = require('../../Mappers');
const orderRepository = require('../../Repository/OrderRepository');
const userRepository = require('../../Repository/UserRepository');
const ticketCategoryRepository = require('../../Repository/TicketCategoryRepository');

async function updateOrder(userId, orderId, orderUpdateRequestBody){
    const user = await userRepository.getUserById(userId);
    const order = await orderRepository.getOrderById(orderId);

    if (!user) {
        throw new Error(`User with '${userId}' not found!`);
    }

    if (!order) {
        throw new Error(`Order with '${orderId}' not found!`);
    }

    if (order.userID !== user.userID) {
        throw new Error(`Order with '${orderId}' not found!`);
    }

    if (!orderUpdateRequestBody.ticketCategoryId) {
        orderUpdateRequestBody.ticketCategoryId = order.ticketCategoryID;
    }

    if (!orderUpdateRequestBody.numberOfTickets) {
        orderUpdateRequestBody.numberOfTickets = order.numberOfTickets;
    }
    else if(orderUpdateRequestBody.numberOfTickets <= 0) {
        throw new Error(`The number of tickets must be positive!`);
    }

    const ticketCategory = await ticketCategoryRepository.getTicketCategoryById(orderUpdateRequestBody.ticketCategoryId);

    if (!ticketCategory) {
        throw new Error(`Ticket with id '${orderUpdateRequestBody.ticketCategoryId}' not found!`);
    }

    if (ticketCategory.eventID !== order.TicketCategory.eventID) {
        throw new Error(`Ticket must be from the same event!`);
    }

    order.ticketCategoryID = orderUpdateRequestBody.ticketCategoryId;
    order.numberOfTickets = orderUpdateRequestBody.numberOfTickets;
    order.totalPrice = order.numberOfTickets * ticketCategory.price;

    const newOrder = await orderRepository.updateOrder(order);

    return mapper.mapToOrderDTO(newOrder);
}

module.exports = updateOrder;

