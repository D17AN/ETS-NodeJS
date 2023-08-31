const LocationDTO = require('../../Models/DTO/LocationDTO');

function mapToLocationDTO(location){
    return new LocationDTO(
        location.countryName,
        location.cityName,
        location.address
    );
}

module.exports = mapToLocationDTO;

