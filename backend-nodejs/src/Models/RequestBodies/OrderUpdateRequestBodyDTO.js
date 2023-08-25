class OrderUpdateRequestBodyDTO {
    ticketCategoryId;
    numberOfTickets;

    constructor(ticketCategoryId, numberOfTickets){
        this.ticketCategoryId = ticketCategoryId;
        this.numberOfTickets = numberOfTickets;
    }
}

module.exports = OrderUpdateRequestBodyDTO;
