const mapper = require('../../Mappers');
const eventRepository = require('../../Repository/EventRepository');

async function getAllEventsPaginated(searchKey, venuesIdList, eventTypesList, page, pageSize) {

    const numberOfEvents = await eventRepository.getAllEventsCount(searchKey, venuesIdList, eventTypesList);
    const numberOfPages = Math.floor((numberOfEvents + pageSize - 1) / pageSize);

    const events = await eventRepository.getAllEventsPaginated(searchKey, venuesIdList, eventTypesList, page, pageSize);
    
    return mapper.mapToEventWrapperDTO(events, page, numberOfPages);
}

module.exports = getAllEventsPaginated;

