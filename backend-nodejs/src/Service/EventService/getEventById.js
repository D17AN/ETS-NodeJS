const mapper = require('../../Mappers');
const eventRepository = require('../../Repository/EventRepository');

async function getEventById(eventId){
    const event = await eventRepository.getEventById(eventId);
    return mapper.mapToEventDTO(event);
}

module.exports = getEventById;
