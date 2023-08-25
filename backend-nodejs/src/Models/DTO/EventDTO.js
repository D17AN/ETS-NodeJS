class EventDTO {
    eventId;
    venue;
    eventType;
    eventDescription;
    eventName;
    eventImageUrl;
    startDate;
    endDate;
    ticketCategories;
    constructor(_eventId, _venueDTO,
                _eventTypeDTO, _eventDescription,
                _eventName, _eventImageUrl,
                _startDate, _endDate,
                _ticketCategoriesDTOList) {
        this.eventId = _eventId;
        this.venue = _venueDTO;
        this.eventType = _eventTypeDTO;
        this.eventDescription = _eventDescription;
        this.eventName = _eventName;
        this.eventImageUrl = _eventImageUrl;
        this.startDate = _startDate;
        this.endDate = _endDate;
        this.ticketCategories = _ticketCategoriesDTOList;
    }
}

module.exports = EventDTO;
