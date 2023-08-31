const venueRepository = require('../../Repository/VenueRepository');
const mapper = require('../../Mappers');

async function getAllVenues(){
    const venues = await venueRepository.getAllVenues();
    return venues.map((venue) => {
        return mapper.mapToVenueDTO(venue);
    });
}

module.exports = getAllVenues;

