const TicketCategoryDTO = require('../../Models/DTO/TicketCategoryDTO');

function mapToTicketCategoryDTO(ticketCategory){
    return new TicketCategoryDTO(
        Number(ticketCategory.ticketCategoryID),
        ticketCategory.ticketType,
        ticketCategory.price
    );
}

module.exports = mapToTicketCategoryDTO;

