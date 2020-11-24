const hash = require('object-hash')
const startOfToday = require('date-fns/startOfToday')
const isAfter = require('date-fns/isAfter')
const isWithinInterval = require('date-fns/isWithinInterval')
const isEqual = require('date-fns/isEqual')
const subDays = require('date-fns/subDays')

/**
 * @typedef {Object} Event
 * @property {string} location
 */

/**
 * Returns a formatted end date
 * @property {Date} startDate
 * @property {Date} endDate
 * @returns {Date | null} endDate
 */
function formatEndDate(startDate, endDate) {
  if (isEqual(startDate, endDate)) {
    return null
  }

  const hours = endDate.getHours() + endDate.getTimezoneOffset() / 60
  if (hours !== 0) {
    return endDate
  }

  const date = subDays(endDate, 1)
  if (isEqual(startDate, date)) {
    return null
  }

  return date
}

/**
 * Adds locationData to event and formats dates
 * @property {'frontend' | 'kotlin'} category
 * @property {Event[]} events
 * @property {Array<Object>} locationData
 * @returns {Event[]} events
 */
exports.prepareEventData = function(category, events, locationData) {
  return events.map((event) => {
    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)

    return {
      ...event,
      id: hash(event),
      category,
      startDate,
      endDate: formatEndDate(startDate, endDate),
      locationData: locationData[event.location]
    }
  })
}

/**
 * Extract data from an event by schema
 * @property {Event[]} events
 * @property {Object} [schema]
 * @returns {Event[]} events
 */
exports.extractDataFromEvents = function(events, schema = {}) {
  const INITIAL_SCHEMA = ['url', 'location', 'title', 'startDate', 'endDate']

  return events.map((event) =>
    INITIAL_SCHEMA.reduce((acc, schemaField) => {
      const field = schema[schemaField] || schemaField

      return {
        ...acc,
        [schemaField]: event[field]
      }
    }, {})
  )
}

/**
 * Removes past events
 * @property {Event[]} events
 * @returns {Event[]} events
 */
exports.removePastEvents = function(events) {
  const today = startOfToday()

  return events
    .filter(({ startDate, endDate }) => {
      const start = new Date(startDate)
      const end = new Date(endDate || startDate)

      return isWithinInterval(today, { start, end }) || isAfter(start, today)
    })
    .sort((a, b) => new Date(a.start) - new Date(b.start))
}
