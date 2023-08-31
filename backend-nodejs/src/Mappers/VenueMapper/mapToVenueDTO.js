const VenueDTO = require('../../Models/DTO/VenueDTO');
const mapToLocationDTO = require('../LocationMappers/mapToLocationDTO');

function mapToVenueDTO(venue){
    return new VenueDTO(
        Number(venue.venueID),
        mapToLocationDTO(venue.Location),
        venue.type, venue.capacity
    );
}

module.exports = mapToVenueDTO;

