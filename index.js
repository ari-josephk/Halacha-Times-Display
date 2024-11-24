const express = require('express')
const app = express()
const port = 3000
const {HebrewCalendar, HDate, Location, Event} = require('@hebcal/core')

var hebDate = new HDate(new Date())

app.get('/', (req, res) => {
  res.send(hebDate)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})