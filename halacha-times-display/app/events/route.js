import getYomEvents from "./yomevents";
import { Location } from "@hebcal/core";
const { find } = require('geo-tz')

export const GET = async (req) => {
	const cityOverride = req.nextUrl.searchParams.get('city');
	const latitude = req.nextUrl.searchParams.get('lat');
	const longitude = req.nextUrl.searchParams.get('lon');
	// Read the language parameter (default to 'en' if not provided)
	const language = req.nextUrl.searchParams.get('lang') || 'en';

	let clientLocation;
	if (cityOverride) {
		try {
			clientLocation = Location.lookup(cityOverride);
		} catch (e) {
			console.warn(`Failed to lookup city: ${cityOverride}`, e);
			// Handle lookup failure - perhaps default or return error
			return new Response(JSON.stringify({ error: `Failed to find location for city: ${cityOverride}` }), { status: 400 });
		}
	}

	if (!clientLocation && latitude && longitude) {
		try {
			// Use geo-tz only if lat/lon are provided
			const timezone = find(latitude, longitude)[0];
			const country = timezone.split('/')[0];
			clientLocation = new Location(latitude, longitude, country === 'Israel', timezone);
		} catch (e) {
			console.warn('Failed to get location from coords - search parameters ' + req.nextUrl.searchParams, e);
			// Handle coordinate lookup failure
			return new Response(JSON.stringify({ error: 'Failed to determine timezone from coordinates.' }), { status: 400 });
		}
	}

	// Handle case where no valid location could be determined
	if (!clientLocation) {
		console.warn('No valid location provided (city, lat/lon).');
		return new Response(JSON.stringify({ error: 'Missing location information. Provide city or lat/lon parameters.' }), { status: 400 });
	}

	// Pass the language to getYomEvents
	try {
		const events = await getYomEvents(clientLocation, language);
		return Response.json(events);
	} catch (error) {
		console.error('Error fetching Yom Events:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch calendar events.' }), { status: 500 });
	}
};