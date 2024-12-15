import { HebrewCalendar, HDate, Location, Event } from '@hebcal/core'
import fetch from 'node-fetch';

async function getYomEvents() {
  const clientLocation = await getClientLocationFromIP();
  var hebDates = [...Array(5).keys()].map(i => new HDate(new Date()).add(i - 1, 'd'))

  const options = {
    year: hebDates[0].getFullYear(),
    isHebrewYear: true,
    candlelighting: true,
    location: clientLocation,
    sedrot: true,
    omer: true,
  };

  return HebrewCalendar.calendar(options).filter(e => hebDates.some(d => d.isSameDate(e.date)))
}

async function getClientLocationFromIP() {
  const response = await fetch('https://ipapi.co/json/');
  const data = await response.json();
  return new Location(data.latitude, data.longitude, data.country === 'IL', data.timezone);
}

export default getYomEvents;
