const express = require('express')
const app = express()
const port = 3000
const {HebrewCalendar, HDate, Location, Event} = require('@hebcal/core')

var hebDates = [...Array(3).keys()].map(i => new HDate(new Date()).add(i, 'd'))
console.log(hebDates)

const options  = {
  year: hebDates[0].getFullYear(),
  isHebrewYear: true,
  candlelighting: true,
  location: Location.lookup('San Francisco'),
  sedrot: true,
  omer: true,
};

const events = HebrewCalendar.calendar(options).filter(e => hebDates.some(d => d.isSameDate(e.date)))
console.log(events)

app.get('/', (req, res) => {
  res.send(events)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})