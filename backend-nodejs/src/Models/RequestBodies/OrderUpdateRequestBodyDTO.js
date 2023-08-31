class OrderUpdateRequestBodyDTO {

    constructor(ticketCategoryId, numberOfTickets){
        this.ticketCategoryId = ticketCategoryId;
        this.numberOfTickets = numberOfTickets;
    }

}

module.exports = OrderUpdateRequestBodyDTO;
