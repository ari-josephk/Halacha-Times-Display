import getYomEvents from "./yomevents";
import { Location } from "@hebcal/core";
const { find } = require('geo-tz')

export const GET = async (req) => {
	const cityOverride = req.nextUrl.searchParams.get('city');

	let clientLocation;
	if (cityOverride) clientLocation = Location.lookup(cityOverride);
	
	if (!clientLocation) {
		try {
			const latitude = req.nextUrl.searchParams.get('lat');
			const longitude = req.nextUrl.searchParams.get('lon');
			const timezone = find(latitude, longitude)[0];
			const country = timezone.split('/')[0];

			clientLocation = new Location(latitude, longitude, country === 'Israel', timezone);
		} catch (e) {
			console.log(e);
			Response.error('Invalid location');
		}
	}

	return Response.json(await getYomEvents(clientLocation));
};