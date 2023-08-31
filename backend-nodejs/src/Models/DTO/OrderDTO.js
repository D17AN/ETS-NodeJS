class OrderDTO{

    constructor(
        orderId,
        eventId,
        orderedAt,
        ticketCategoryId,
        numberOfTickets,
        totalPrice
    ) {
        this.orderId = orderId;
        this.eventId = eventId;
        this.orderedAt = orderedAt;
        this.ticketCategoryId = ticketCategoryId;
        this.numberOfTickets = numberOfTickets;
        this.totalPrice = totalPrice;
    }

}

module.exports = OrderDTO;

