const path = require('path')
const { LocationInfo } = require(`./location-info`)
const {
  removePastEvents,
  extractDataFromEvents,
  prepareEventData
} = require(`./events`)

const FILE_PATH = path.resolve(__dirname, '../../static', 'location-info.json')
const FIELDS = ['annotations.flag', 'geometry']

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

  const eventsData = extractDataFromEvents(data, schema)
  const events = removePastEvents(eventsData)

  for (const { location } of events) {
    locationSet.add(location)
  }

  const locationData = await locationInfo.getBulk([...locationSet])
  return prepareEventData(events, locationData)
}
