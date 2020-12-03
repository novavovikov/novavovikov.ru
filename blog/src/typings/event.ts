export interface LocationGeometry {
  lat: number
  lng: number
}

export interface LocationTimezone {
  name: string
  now_in_dst: number
  offset_sec: number
  offset_string: string
  short_name: string
}

export interface LocationData {
  flag: Nulled<string>
  geometry: Nulled<LocationGeometry>
  timezone: Nulled<LocationTimezone>
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
  id: string
  category: 'frontend' | 'kotlin'
  url: string
  title: string
  location: string
  locationData: LocationData
  startDate: string
  endDate: string | null
}
