class EventDTO {

    constructor(
        eventId,
        venueDTO,
        eventTypeDTO,
        eventDescription,
        eventName,
        eventImageUrl,
        startDate,
        endDate,
        ticketCategoriesDTOList
    ) {
        this.eventId = eventId;
        this.venue = venueDTO;
        this.eventType = eventTypeDTO;
        this.eventDescription = eventDescription;
        this.eventName = eventName;
        this.eventImageUrl = eventImageUrl;
        this.startDate = startDate;
        this.endDate = endDate;
        this.ticketCategories = ticketCategoriesDTOList;
    }

}

module.exports = EventDTO;

