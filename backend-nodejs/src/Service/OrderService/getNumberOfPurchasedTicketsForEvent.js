const orderRepository = require('../../Repository/OrderRepository');

async function getNumberOfPurchasedTicketsForEvent(eventId){
    return (await orderRepository.getAllOrdersByEventId(eventId))
        .reduce((accumulator, order) => {
            return accumulator + order.numberOfTickets;
        }, 0);
}

module.exports = getNumberOfPurchasedTicketsForEvent;

