class LocationDTO {
    countryName;
    cityName;
    address;
    constructor(countryName, cityName, address){
        this.countryName = countryName;
        this.cityName = cityName;
        this.address = address;
    }
}

module.exports = LocationDTO;
