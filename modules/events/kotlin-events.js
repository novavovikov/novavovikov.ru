const axios = require('axios')
const { parseStringPromise } = require('xml2js')
const { getEventsWithLocationsData } = require(`../event-locations`)

const KOTLIN_EVENTS_URL =
  'https://raw.githubusercontent.com/JetBrains/kotlin-web-site/master/data/events.xml'

exports.getKotlinEvents = async function () {
  try {
    const { data } = await axios.get(KOTLIN_EVENTS_URL, {
      headers: {
        'Content-Type': 'text/xml'
      }
    })

    const { events } = await parseStringPromise(data, {
      mergeAttrs: true,
      trim: true,
      explicitArray: false
    })

    return getEventsWithLocationsData(events.event)
  } catch (err) {
    console.log('Kotlin events error: ', err)

    return []
  }
}
