const mapper = require('../../Mappers');
const eventRepository = require('../../Repository/EventRepository');

async function getAllEvents(){
    const events = await eventRepository.getAllEvents();
    return events.map((event) => {
        return mapper.mapToEventDTO(event);
    });
}

module.exports = getAllEvents;

