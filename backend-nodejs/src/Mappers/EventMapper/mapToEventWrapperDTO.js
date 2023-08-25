const mapToEventDTO = require( './mapToEventDTO');
const EventWrapperDTO = require('../../Models/DTO/EventDTOWrapper');

function mapToEventWrapperDTO(eventsList, page, numberOfPages){
    return new EventWrapperDTO(
        eventsList.map((event) => {
            return mapToEventDTO(event);
        }),
        page,
        numberOfPages
    );
}

module.exports = mapToEventWrapperDTO;

