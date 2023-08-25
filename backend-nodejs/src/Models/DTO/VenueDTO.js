class VenueDTO {
    venueId;
    location;
    type;
    capacity;
    constructor(venueId, locationDTO, type, capacity){
        this.venueId = venueId;
        this.location = locationDTO;
        this.type = type;
        this.capacity = capacity;
    }
}

module.exports = VenueDTO;
