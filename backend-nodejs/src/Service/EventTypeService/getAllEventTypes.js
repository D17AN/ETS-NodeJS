const eventTypesRepository = require('../../Repository/EventTypeRepository');
const mapper = require('../../Mappers');

async function getAllEventTypes(){
    return (await eventTypesRepository.getAllEventTypes())
        .map((eventType) => {
            return mapper.mapToEventTypeDTO(eventType);
        });
}

module.exports = getAllEventTypes;

