export interface BusinessHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  openTime: string // format: "09:00"
  closeTime: string // format: "17:00"
  closed: boolean
}

export interface SpecialSchedule {
  date: string // format: "2024-12-25"
  name: string // e.g., "Christmas Day", "Black Friday"
  hours?: {
    openTime: string
    closeTime: string
  }
  closed: boolean
  message?: string
}

export interface ContactInformation {
  phone?: string
  email?: string
  website?: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export interface MapConfiguration {
  enabled: boolean
  latitude?: number
  longitude?: number
  zoom?: number
  showDirectionsLink?: boolean
}

export interface Location {
  id: string
  name: string
  businessHours: BusinessHours[]
  specialSchedules?: SpecialSchedule[]
  contact: ContactInformation
  timezone: string // e.g., "America/New_York"
  map?: MapConfiguration
  description?: string
  image?: string
  services?: string[]
  appointmentBookingUrl?: string
}

export interface LocationStatus {
  isOpen: boolean
  nextStatusChange?: {
    isOpening: boolean
    time: string
    day?: string
  }
  message: string
}

export type LocationHoursVariant = 
  | 'single-location'
  | 'multiple-locations' 
  | 'minimal-hours'
  | 'detailed-info-cards'
  | 'map-integration'

export interface LocationHoursProperties {
  variant?: LocationHoursVariant
  locations: Location[]
  showCurrentStatus?: boolean
  showSpecialSchedules?: boolean
  showContactInfo?: boolean
  showServices?: boolean
  showAppointmentBooking?: boolean
  allowLocationSearch?: boolean
  allowLocationFilter?: boolean
  className?: string
  maxLocationsToShow?: number
  defaultTimezone?: string
  // Layout options
  showMap?: boolean
  compactView?: boolean
  darkMode?: boolean
  // Customization
  statusMessages?: {
    open?: string
    closed?: string
    closingSoon?: string
    openingSoon?: string
  }
}

export interface TimeRange {
  start: string
  end: string
}

export interface ParsedHours {
  day: string
  timeRange: TimeRange | null
  closed: boolean
  special?: SpecialSchedule
}