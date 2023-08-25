const OrderDTO = require( '../../Models/DTO/OrderDTO');

function mapToOrderDTO(order){
    return new OrderDTO(
        Number(order.orderID),
        Number(order.TicketCategory.eventID),
        order.orderedAt,
        Number(order.ticketCategoryID),
        order.numberOfTickets, order.totalPrice
    );
}

module.exports = mapToOrderDTO;

