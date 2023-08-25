class OrderAddRequestBodyDTO{
    ticketCategoryId;
    eventId;
    numberOfTickets;

    constructor(ticketCategoryId, eventId, numberOfTickets){
        this.ticketCategoryId = ticketCategoryId;
        this.eventId = eventId;
        this.numberOfTickets = numberOfTickets;
    }
}

module.exports = OrderAddRequestBodyDTO;
