import getYomEvents from "./yomevents";
import { Location } from "@hebcal/core";

export const GET = async (req) => {
	const forwarded = req.headers["x-forwarded-for"]
  const clientIP = forwarded ? forwarded.split(/, /)[0] : '127.0.0.1'
	const cityOverride = req.nextUrl.searchParams.get('city');

	const clientLocation = Location.lookup(cityOverride || 'NONE') || await getClientLocationFromIP(clientIP);
	return getYomEvents(clientLocation);
};

async function getClientLocationFromIP(ip) {
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  const data = await response.json();
  return new Location(data.latitude, data.longitude, data.country === 'IL', data.timezone, data.city);
};