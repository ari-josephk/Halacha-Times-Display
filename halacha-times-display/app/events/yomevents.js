// yomevents.js
import { HebrewCalendar, HDate } from '@hebcal/core';

// Add language parameter
async function getYomEvents(clientLocation, language = 'en') { // Default to English
  // Get Hebrew dates for yesterday, today, and the next 5 days
  const hebDates = [...Array(7).keys()].map(i => new HDate(new Date()).add(i - 1, 'd'));

  const options = {
    // Use the start date's Hebrew year
    year: hebDates[0].getFullYear(),
    isHebrewYear: true,
    // Set the date range explicitly to cover the 7 days
    start: hebDates[0],
    end: hebDates[6],
    candlelighting: true,
    location: clientLocation,
    sedrot: true,
    omer: true,
    molad: true,
    yomKippurKatan: true,
    // Optional: Add Hebrew dates themselves if needed
    // addHebrewDatesForEvents: true,
  };

  // Get all events within the specified date range
  const allEventsInRange = HebrewCalendar.calendar(options);

  // Create a map to store events grouped by HDate
  const eventsMap = new Map();
  hebDates.forEach(d => eventsMap.set(d.toString(), [])); // Initialize with empty arrays, using string keys

  // Populate the map with event objects containing descriptions and IDs
  allEventsInRange.forEach(e => {
    const dateStr = e.date.toString();
    if (eventsMap.has(dateStr)) {
      const emoji = e.getEmoji() || '';
      const descEn = e.render(); // English description
      const descHe = e.render('he'); // Hebrew description

      // Generate a stable ID
      const id = `${dateStr}-${descEn.replace(/\s+/g, '-')}`; // Combine date and English description

      let description;
      switch (language) {
        case 'he':
          description = `${emoji} ${descHe}`.trim();
          break;
        case 'both':
          // Return an object with separate language strings
          description = {
            en: `${emoji} ${descEn}`.trim(),
            he: `${emoji} ${descHe}`.trim()
          };
          break;
        case 'en':
        default:
          description = `${emoji} ${descEn}`.trim();
          break;
      }

      // Push an object instead of just the string
      eventsMap.get(dateStr).push({
        id: id, // Unique and stable ID
        description: description, // Can be string or {en, he}
        // Optionally include raw descriptions if needed later
        // rawEn: descEn,
        // rawHe: descHe,
      });
    }
  });

  // Convert HDate keys back to HDate objects if needed, or keep as strings
  // Keeping as strings might be easier for JSON serialization
  const result = {};
  eventsMap.forEach((value, key) => {
    result[key] = value;
  });

  return result;
  // Or if you need HDate objects as keys (not directly JSON serializable):
  // return Object.fromEntries(eventsMap);
}

export default getYomEvents;
