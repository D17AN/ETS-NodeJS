class EventTypeDTO {
    eventTypeId;
    eventTypeName;
    constructor(eventTypeId, eventTypeName) {
        this.eventTypeId  = eventTypeId;
        this.eventTypeName = eventTypeName;
    }
}

module.exports = EventTypeDTO;
