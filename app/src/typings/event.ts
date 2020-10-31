export interface LocationGeometry {
  lat: number
  lng: number
}

export interface LocationData {
  flag: Nulled<string>
  geometry: Nulled<LocationGeometry>
}

export interface FrontendEvent {
  uid: string
  description: string // url
  location: string
  summary: string
  start: string
  end: string
  allDay?: boolean
}

export interface KotlinEvent {
  lang: 'en'
  url: string
  location: string
  speaker: string
  title: string
  description: string
  subject: string
  startDate: string
  endDate: string
}

export interface EventType {
  url: string
  title: string
  location: string
  locationData: LocationData
  startDate: Date
  endDate: Date
}
