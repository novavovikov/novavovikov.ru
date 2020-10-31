const fs = require('fs')
const axios = require('axios')
const get = require('lodash.get')

/** Get location data from external resource and save to file.  */
exports.LocationInfo = class {
  _pathToFile
  _fields

  /**
   * @param {String} pathToFile - path to the file to save data
   * @param {Array<String>} [fields] - fields to be extracted
   */
  constructor(pathToFile = 'location-info.json', fields) {
    this._pathToFile = pathToFile
    this._fields = fields
  }

  _getFileData() {
    const hasFile = fs.existsSync(this._pathToFile)

    if (hasFile) {
      return JSON.parse(fs.readFileSync(this._pathToFile, 'utf-8'))
    }

    return {}
  }

  _writeDataToFile(data) {
    try {
      fs.writeFileSync(this._pathToFile, JSON.stringify(data))
    } catch (err) {
      console.warn(err)
    }
  }

  _getConfidentLocationData(results = []) {
    return results.reduce((res, data) => {
      if (!res.confidence || data.confidence > res.confidence) {
        return data
      }

      return res
    }, {})
  }

  _extractDataByFields(data) {
    if (this._fields && data) {
      return this._fields.reduce((acc, fieldPath) => {
        const field = fieldPath.split('.').slice(-1)[0]

        return {
          ...acc,
          [field]: get(data, fieldPath, null)
        }
      }, {})
    }

    return data
  }

  async _requestLocationData(location) {
    if (!location) {
      return []
    }

    try {
      const { data } = await axios.get(
        // TODO Remove token from code
        `https://api.opencagedata.com/geocode/v1/json?key=cee7d85bb4494cb99632277ae6f4434b`,
        {
          params: {
            q: location
          }
        }
      )

      return data.results
    } catch (e) {
      return []
    }
  }

  async _getLocationData(location) {
    const locationData = await this._requestLocationData(location)
    return this._getConfidentLocationData(locationData)
  }

  async get(location) {
    const fileData = this._getFileData()
    const locationInfo = this._extractDataByFields(fileData[location])

    if (locationInfo) {
      return locationInfo
    }

    const locationData = await this._getLocationData(location)
    this._writeDataToFile({ ...fileData, [location]: locationData })

    return this._extractDataByFields(locationData)
  }

  /**
   * @param {String[]} locations
   * @returns {Promise<Object>}
   */
  async getBulk(locations) {
    const fileData = this._getFileData()
    const fullLocationData = {}
    const truncatedLocationData = {}

    for (const location of locations) {
      const locationData = fileData[location]

      fullLocationData[location] =
        locationData ?? (await this._getLocationData(location))

      truncatedLocationData[location] = this._extractDataByFields(
        fullLocationData[location]
      )
    }

    this._writeDataToFile({ ...fileData, ...fullLocationData })
    return truncatedLocationData
  }
}
