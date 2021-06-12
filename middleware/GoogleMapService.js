const {Client} = require("@googlemaps/google-maps-services-js");
const config = require('../config.json');
const googleMapClient = new Client({});

async function getGeocodeInformations(addressString) {
	 return await googleMapClient.geocode({
		params: {
			address: addressString,
			key: config.GOOGLE_MAP_API_KEY
		}
	});
}

module.exports = {
	getGeocodeInformations,
};