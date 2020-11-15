const axios = require('axios')
const { getEventsWithLocationsData } = require('../event-locations')

const FRONTEND_EVENTS_URL = 'https://web-standards.ru/calendar.json'

exports.getFrontendEvents = async function () {
  try {
    const { data } = await axios.get(FRONTEND_EVENTS_URL, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return getEventsWithLocationsData('frontend', data, {
      url: 'description',
      title: 'summary',
      startDate: 'start',
      endDate: 'end'
    })
  } catch (err) {
    console.log('Frontend events error: ', err)

    return []
  }
}
