import {HebrewCalendar, HDate, Location, Event} from '@hebcal/core'

var hebDates = [...Array(5).keys()].map(i => new HDate(new Date()).add(i, 'd'))

const options  = {
  year: hebDates[0].getFullYear(),
  isHebrewYear: true,
  candlelighting: true,
  location: Location.lookup('San Francisco'),
  sedrot: true,
  omer: true,
};

console.log(HebrewCalendar.calendar(options).filter(e => hebDates.some(d => d.isSameDate(e.date))))

export default HebrewCalendar.calendar(options).filter(e => hebDates.some(d => d.isSameDate(e.date)))