const eventRepository = require('../../Repository/EventRepository');
const getNumberOfPurchasedTicketsForEvent = require('./getNumberOfPurchasedTicketsForEvent');

async function getNumberOfAvailableTicketsByEventId(eventId){
    const event = (await eventRepository.getEventById(eventId));

    if (!event) {
        throw new Error(`Event with id '${eventId}'not found.`);
    }

    const totalNumberOfTickets = event.Venue.capacity;
    const numberOfPurchasedTickets = await getNumberOfPurchasedTicketsForEvent(eventId);

    return totalNumberOfTickets - numberOfPurchasedTickets;
}

module.exports = getNumberOfAvailableTicketsByEventId;

