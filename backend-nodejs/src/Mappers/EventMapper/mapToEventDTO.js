const EventDTO = require('../../Models/DTO/EventDTO');
const mapToVenueDTO = require( '../VenueMapper/mapToVenueDTO');
const mapToEventTypeDTO = require('../EventTypeMapper/mapToEventTypeDTO');
const mapToTicketCategoryDTO = require('../../Mappers/TicketCategoryMapper/mapToTicketCategoryDTO');

function mapToEventDTO(event){
    return new EventDTO(
        Number(event.eventID),
        mapToVenueDTO(event.Venue),
        mapToEventTypeDTO(event.EventType),
        event.eventDescription,
        event.eventName,
        event.eventImageURL,
        event.startDate,
        event.endDate,
        event.TicketCategory.map((ticketCategory) => {
            return mapToTicketCategoryDTO(ticketCategory);
        })
    );
}

module.exports = mapToEventDTO;

