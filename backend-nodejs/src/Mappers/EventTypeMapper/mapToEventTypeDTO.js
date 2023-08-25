const EventType = require( '../../Models/DTO/EventTypeDTO');

function mapToEventTypeDTO(eventType){
    return new EventType(
        Number(eventType.eventTypeID),
        eventType.eventTypeName
    );
}

module.exports = mapToEventTypeDTO;

