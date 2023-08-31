const mapper = require('../../Mappers');
const orderRepository = require('../../Repository/OrderRepository');
const userRepository = require('../../Repository/UserRepository');
const eventRepository = require('../../Repository/EventRepository');
const ticketCategoryRepository = require('../../Repository/TicketCategoryRepository');
const getNumberOfAvailableTicketsByEventId = require('./getNumberOfAvailableTicketsByEventId');

async function addOrder(userId, orderAddRequestBody){
    const user = await userRepository.getUserById(userId);
    const event = await eventRepository.getEventById(orderAddRequestBody.eventId);
    const ticketCategory = await ticketCategoryRepository.getTicketCategoryById(orderAddRequestBody.ticketCategoryId);

    if (!user) {
        throw new Error(`User with id '${userId}' not found.`);
    }

    if (!event) {
        throw new Error(`Event with id '${orderAddRequestBody.eventId}' not found.`);
    }

    if(!ticketCategory) {
        throw new Error(`Ticket with id '${orderAddRequestBody.orderId} not found.`);
    }

    if (orderAddRequestBody.numberOfTickets <= 0) {
        throw new Error(`The number of tickets must be positive.`);
    }

    const numberOfAvailableTickets = await getNumberOfAvailableTicketsByEventId(event.eventID);

    if (orderAddRequestBody.numberOfTickets > numberOfAvailableTickets) {
        throw new Error(`Only ${numberOfAvailableTickets} tickets left.`);
    }

    const orderedAt = new Date();
    const formattedOrderedAt = orderedAt.toISOString();

    const order = {
        userID: user.userID,
        ticketCategoryID: ticketCategory.ticketCategoryID,
        orderedAt: formattedOrderedAt,
        numberOfTickets: orderAddRequestBody.numberOfTickets,
        totalPrice: orderAddRequestBody.numberOfTickets * ticketCategory.price,
    }

    const newOrder = await orderRepository.addOrder(order);

    return mapper.mapToOrderDTO(newOrder);
}

module.exports = addOrder;


