const path = require('path')
const isAfter = require('date-fns/isAfter')
const isToday = require('date-fns/isToday')
const startOfToday = require('date-fns/startOfToday')
const { LocationInfo } = require(`./location-info`)

const FILE_PATH = path.resolve(__dirname, '../../static', 'location-info.json')
const FIELDS = ['annotations.flag', 'geometry']
const INITIAL_SCHEMA = ['url', 'location', 'title', 'startDate', 'endDate']

/**
 * @typedef {Object} Geometry
 * @property {number} lat
 * @property {number} lng
 */

/**
 * @typedef {Object} LocationData
 * @property {string} flag
 * @property {Geometry} geometry
 */

/**
 * @typedef {Object} Event
 * @property {string} location
 */

/**
 * @typedef {Object} EventWithLocationData
 * @property {string} location
 * @property {LocationData} locationData
 */

/**
 * @property {Event[]} events
 * @property {Object} [schema]
 * @returns {Promise<Event[]>}
 */
exports.getEventsWithLocationsData = async (data, schema = {}) => {
  const locationInfo = new LocationInfo(FILE_PATH, FIELDS)
  const locationSet = new Set()

  const eventsData = data.map((event) =>
    INITIAL_SCHEMA.reduce((acc, schemaField) => {
      const field = schema[schemaField] || schemaField

      return {
        ...acc,
        [schemaField]: event[field]
      }
    }, {})
  )

  const events = eventsData
    .filter(({ startDate }) => {
      const date = new Date(startDate)
      return isToday(date) || isAfter(date, startOfToday())
    })
    .sort((a, b) => new Date(a.start) - new Date(b.start))

  for (const { location } of events) {
    locationSet.add(location)
  }

  const locationData = await locationInfo.getBulk([...locationSet])
  return events.map((event) => ({
    ...event,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
    locationData: locationData[event.location]
  }))
}
