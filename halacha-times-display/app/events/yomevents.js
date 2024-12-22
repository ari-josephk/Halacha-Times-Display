import { HebrewCalendar, HDate} from '@hebcal/core'

async function getYomEvents(clientLocation) {
  const hebDates = [...Array(7).keys()].map(i => new HDate(new Date()).add(i - 1, 'd'))

  const options = {
    year: hebDates[0].getFullYear(),
    isHebrewYear: true,
    candlelighting: true,
    location: clientLocation,
    sedrot: true,
    omer: true,
    molad: true,
    yomKippurKatan: true,
  };

  const events = HebrewCalendar.calendar(options).filter(e => hebDates.some(d => d.isSameDate(e.date)));

  return new Map(hebDates.map(d => [d, events.filter(e => d.isSameDate(e.date))]));
}

export default getYomEvents;
