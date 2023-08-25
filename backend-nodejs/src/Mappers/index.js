const mapToLocationDTO = require('./LocationMappers/mapToLocationDTO');
const mapToVenueDTO = require('./VenueMapper/mapToVenueDTO');
const mapToOrderDTO = require('./OrderMapper/mapToOrderDTO');
const mapToEventTypeDTO = require('./EventTypeMapper/mapToEventTypeDTO');
const mapToEventDTO = require('./EventMapper/mapToEventDTO');
const mapToEventWrapperDTO = require('./EventMapper/mapToEventWrapperDTO');

module.exports = {
    mapToLocationDTO,
    mapToVenueDTO,
    mapToOrderDTO,
    mapToEventTypeDTO,
    mapToEventDTO,
    mapToEventWrapperDTO,
}
