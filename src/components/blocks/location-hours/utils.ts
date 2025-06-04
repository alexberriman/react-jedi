import type { BusinessHours, Location, LocationStatus, SpecialSchedule } from './types'

/**
 * Gets the current day of the week in lowercase
 */
export function getCurrentDay(): BusinessHours['day'] {
  const days: BusinessHours['day'][] = [
    'sunday', 'monday', 'tuesday', 'wednesday', 
    'thursday', 'friday', 'saturday'
  ]
  return days[new Date().getDay()]
}

/**
 * Converts time string to minutes since midnight
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

/**
 * Converts minutes since midnight to time string
 */
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

/**
 * Formats time for display (e.g., "09:00" -> "9:00 AM")
 */
export function formatTime(time: string, use24Hour = false): string {
  if (use24Hour) return time
  
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  let displayHours: number
  
  if (hours === 0) {
    displayHours = 12
  } else if (hours > 12) {
    displayHours = hours - 12
  } else {
    displayHours = hours
  }
  
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Gets the current date in the location's timezone
 */
export function getCurrentDateInTimezone(timezone: string): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: timezone }))
}

/**
 * Gets current time in minutes since midnight for a specific timezone
 */
export function getCurrentTimeInTimezone(timezone: string): number {
  const now = getCurrentDateInTimezone(timezone)
  return now.getHours() * 60 + now.getMinutes()
}

/**
 * Checks if a date matches today in the given timezone
 */
export function isToday(date: string, timezone: string): boolean {
  const today = getCurrentDateInTimezone(timezone)
  const checkDate = new Date(date)
  
  return (
    today.getFullYear() === checkDate.getFullYear() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getDate() === checkDate.getDate()
  )
}

/**
 * Gets special schedule for today if any
 */
export function getTodaysSpecialSchedule(
  specialSchedules: SpecialSchedule[] = [],
  timezone: string
): SpecialSchedule | undefined {
  return specialSchedules.find(schedule => isToday(schedule.date, timezone))
}

/**
 * Gets regular business hours for a specific day
 */
export function getRegularHours(
  businessHours: BusinessHours[],
  day: BusinessHours['day']
): BusinessHours | undefined {
  return businessHours.find(hours => hours.day === day)
}

/**
 * Determines if location is currently open
 */
export function isLocationOpen(
  currentTime: number,
  regularHours: BusinessHours | undefined,
  specialSchedule?: SpecialSchedule
): boolean {
  // Check special schedule first
  if (specialSchedule) {
    if (specialSchedule.closed) return false
    if (specialSchedule.hours) {
      const openTime = timeToMinutes(specialSchedule.hours.openTime)
      const closeTime = timeToMinutes(specialSchedule.hours.closeTime)
      return currentTime >= openTime && currentTime < closeTime
    }
  }

  // Check regular hours
  if (!regularHours || regularHours.closed) return false
  
  const openTime = timeToMinutes(regularHours.openTime)
  const closeTime = timeToMinutes(regularHours.closeTime)
  
  // Handle overnight hours (e.g., 22:00 to 02:00)
  if (closeTime < openTime) {
    return currentTime >= openTime || currentTime < closeTime
  }
  
  return currentTime >= openTime && currentTime < closeTime
}

/**
 * Gets the next status change (opening or closing time)
 */
export function getNextStatusChange(
  currentTime: number,
  currentDay: BusinessHours['day'],
  businessHours: BusinessHours[],
  specialSchedules: SpecialSchedule[] = [],
  timezone: string
): LocationStatus['nextStatusChange'] | undefined {
  const todaySpecial = getTodaysSpecialSchedule(specialSchedules, timezone)
  const regularHours = getRegularHours(businessHours, currentDay)

  // Check special schedule first
  const specialResult = handleSpecialSchedule(currentTime, todaySpecial)
  if (specialResult) return specialResult

  // Check regular hours
  const regularResult = handleRegularHours(currentTime, regularHours)
  if (regularResult) return regularResult

  // Find next opening day
  return findNextOpeningDay(businessHours, specialSchedules, timezone)
}

function handleSpecialSchedule(
  currentTime: number,
  todaySpecial: SpecialSchedule | undefined
): LocationStatus['nextStatusChange'] | undefined {
  if (!todaySpecial) return undefined

  if (todaySpecial.closed) {
    return undefined // Will fall through to findNextOpeningDay
  }

  if (todaySpecial.hours) {
    const openTime = timeToMinutes(todaySpecial.hours.openTime)
    const closeTime = timeToMinutes(todaySpecial.hours.closeTime)
    
    if (currentTime < openTime) {
      return {
        isOpening: true,
        time: formatTime(todaySpecial.hours.openTime)
      }
    }
    if (currentTime < closeTime) {
      return {
        isOpening: false,
        time: formatTime(todaySpecial.hours.closeTime)
      }
    }
  }

  return undefined
}

function handleRegularHours(
  currentTime: number,
  regularHours: BusinessHours | undefined
): LocationStatus['nextStatusChange'] | undefined {
  if (!regularHours || regularHours.closed) return undefined

  const openTime = timeToMinutes(regularHours.openTime)
  const closeTime = timeToMinutes(regularHours.closeTime)
  
  if (currentTime < openTime) {
    return {
      isOpening: true,
      time: formatTime(regularHours.openTime)
    }
  }
  if (currentTime < closeTime) {
    return {
      isOpening: false,
      time: formatTime(regularHours.closeTime)
    }
  }

  return undefined
}

/**
 * Finds the next opening day and time
 */
function findNextOpeningDay(
  businessHours: BusinessHours[],
  specialSchedules: SpecialSchedule[] = [],
  timezone: string
): LocationStatus['nextStatusChange'] | undefined {
  const days: BusinessHours['day'][] = [
    'sunday', 'monday', 'tuesday', 'wednesday',
    'thursday', 'friday', 'saturday'
  ]
  
  const currentDate = getCurrentDateInTimezone(timezone)
  const currentDayIndex = currentDate.getDay()
  
  // Check next 7 days
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (currentDayIndex + i) % 7
    const nextDay = days[nextDayIndex]
    
    // Check for special schedules first
    const nextDate = new Date(currentDate)
    nextDate.setDate(currentDate.getDate() + i)
    const nextDateString = nextDate.toISOString().split('T')[0]
    
    const special = specialSchedules.find(s => s.date === nextDateString)
    if (special) {
      if (!special.closed && special.hours) {
        return {
          isOpening: true,
          time: formatTime(special.hours.openTime),
          day: getDayName(nextDay)
        }
      }
      continue
    }
    
    // Check regular hours
    const regularHours = getRegularHours(businessHours, nextDay)
    if (regularHours && !regularHours.closed) {
      return {
        isOpening: true,
        time: formatTime(regularHours.openTime),
        day: getDayName(nextDay)
      }
    }
  }
  
  return undefined
}

/**
 * Gets formatted day name
 */
function getDayName(day: BusinessHours['day']): string {
  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday', 
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  }
  return dayNames[day]
}

/**
 * Gets complete status for a location
 */
export function getLocationStatus(location: Location): LocationStatus {
  const currentTime = getCurrentTimeInTimezone(location.timezone)
  const currentDay = getCurrentDay()
  const todaySpecial = getTodaysSpecialSchedule(location.specialSchedules, location.timezone)
  const regularHours = getRegularHours(location.businessHours, currentDay)
  
  const isOpen = isLocationOpen(currentTime, regularHours, todaySpecial)
  const nextChange = getNextStatusChange(
    currentTime,
    currentDay,
    location.businessHours,
    location.specialSchedules,
    location.timezone
  )

  // Generate status message
  let message = ''
  if (todaySpecial?.message) {
    message = todaySpecial.message
  } else if (isOpen) {
    if (nextChange && !nextChange.isOpening) {
      const closeTime = nextChange.time
      message = `Open • Closes at ${closeTime}`
    } else {
      message = 'Open'
    }
  } else {
    if (nextChange?.isOpening) {
      message = nextChange.day ? `Closed • Opens ${nextChange.day} at ${nextChange.time}` : `Closed • Opens at ${nextChange.time}`;
    } else {
      message = 'Closed'
    }
  }

  return {
    isOpen,
    nextStatusChange: nextChange,
    message
  }
}

/**
 * Formats business hours for display
 */
export function formatBusinessHours(hours: BusinessHours, use24Hour = false): string {
  if (hours.closed) return 'Closed'
  return `${formatTime(hours.openTime, use24Hour)} - ${formatTime(hours.closeTime, use24Hour)}`
}

/**
 * Groups business hours by time ranges (e.g., "Mon-Fri: 9:00 AM - 5:00 PM")
 */
export function groupBusinessHours(businessHours: BusinessHours[], use24Hour = false): string[] {
  const grouped: { [key: string]: BusinessHours['day'][] } = {}
  
  for (const hours of businessHours) {
    const key = hours.closed ? 'Closed' : `${hours.openTime}-${hours.closeTime}`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(hours.day)
  }
  
  return Object.entries(grouped).map(([timeRange, days]) => {
    const dayRanges = formatDayRanges(days)
    
    if (timeRange === 'Closed') {
      return `${dayRanges}: Closed`
    }
    
    const [openTime, closeTime] = timeRange.split('-')
    const formattedRange = `${formatTime(openTime, use24Hour)} - ${formatTime(closeTime, use24Hour)}`
    return `${dayRanges}: ${formattedRange}`
  })
}

/**
 * Formats day ranges (e.g., ["monday", "tuesday", "wednesday"] -> "Mon-Wed")
 */
function formatDayRanges(days: BusinessHours['day'][]): string {
  const dayOrder: BusinessHours['day'][] = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ]
  
  const dayAbbrevs = {
    monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed',
    thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun'
  }
  
  const sortedDays = [...days].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))
  
  if (sortedDays.length === 1) {
    return dayAbbrevs[sortedDays[0]]
  }
  
  // Check for consecutive days
  const groups: BusinessHours['day'][][] = []
  let currentGroup: BusinessHours['day'][] = [sortedDays[0]]
  
  for (let i = 1; i < sortedDays.length; i++) {
    const prevIndex = dayOrder.indexOf(sortedDays[i - 1])
    const currentIndex = dayOrder.indexOf(sortedDays[i])
    
    if (currentIndex === prevIndex + 1) {
      currentGroup.push(sortedDays[i])
    } else {
      groups.push(currentGroup)
      currentGroup = [sortedDays[i]]
    }
  }
  groups.push(currentGroup)
  
  return groups.map(group => {
    if (group.length === 1) {
      return dayAbbrevs[group[0]]
    } else if (group.length === 2) {
      return `${dayAbbrevs[group[0]]}, ${dayAbbrevs[group[1]]}`
    } else {
      return `${dayAbbrevs[group[0]]}-${dayAbbrevs[group[group.length - 1]]}`
    }
  }).join(', ')
}