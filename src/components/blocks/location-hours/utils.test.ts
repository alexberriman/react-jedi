import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getCurrentDay,
  timeToMinutes,
  minutesToTime,
  formatTime,
  getCurrentDateInTimezone,
  getCurrentTimeInTimezone,
  isToday,
  getTodaysSpecialSchedule,
  getRegularHours,
  isLocationOpen,
  getLocationStatus,
  formatBusinessHours,
  groupBusinessHours
} from './utils'
import type { BusinessHours, SpecialSchedule, Location } from './types'

describe('LocationHours Utils', () => {
  // Mock Date for consistent testing
  const mockDate = new Date('2024-01-15T14:30:00Z') // Tuesday 2:30 PM UTC
  
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('getCurrentDay', () => {
    it('should return correct day of week', () => {
      // January 15, 2024 is a Tuesday
      expect(getCurrentDay()).toBe('tuesday')
    })
  })

  describe('timeToMinutes', () => {
    it('should convert time string to minutes correctly', () => {
      expect(timeToMinutes('00:00')).toBe(0)
      expect(timeToMinutes('01:00')).toBe(60)
      expect(timeToMinutes('12:30')).toBe(750)
      expect(timeToMinutes('23:59')).toBe(1439)
    })
  })

  describe('minutesToTime', () => {
    it('should convert minutes to time string correctly', () => {
      expect(minutesToTime(0)).toBe('00:00')
      expect(minutesToTime(60)).toBe('01:00')
      expect(minutesToTime(750)).toBe('12:30')
      expect(minutesToTime(1439)).toBe('23:59')
    })
  })

  describe('formatTime', () => {
    it('should format time in 12-hour format by default', () => {
      expect(formatTime('00:00')).toBe('12:00 AM')
      expect(formatTime('09:30')).toBe('9:30 AM')
      expect(formatTime('12:00')).toBe('12:00 PM')
      expect(formatTime('15:45')).toBe('3:45 PM')
      expect(formatTime('23:59')).toBe('11:59 PM')
    })

    it('should format time in 24-hour format when requested', () => {
      expect(formatTime('00:00', true)).toBe('00:00')
      expect(formatTime('09:30', true)).toBe('09:30')
      expect(formatTime('15:45', true)).toBe('15:45')
      expect(formatTime('23:59', true)).toBe('23:59')
    })
  })

  describe('getCurrentDateInTimezone', () => {
    it('should return date in specified timezone', () => {
      const nyDate = getCurrentDateInTimezone('America/New_York')
      const laDate = getCurrentDateInTimezone('America/Los_Angeles')
      
      // Both should be Date objects
      expect(nyDate).toBeInstanceOf(Date)
      expect(laDate).toBeInstanceOf(Date)
      
      // LA should be 3 hours behind NY
      expect(nyDate.getHours() - laDate.getHours()).toBeCloseTo(3, 0)
    })
  })

  describe('getCurrentTimeInTimezone', () => {
    it('should return time in minutes for timezone', () => {
      const nyTime = getCurrentTimeInTimezone('America/New_York')
      const laTime = getCurrentTimeInTimezone('America/Los_Angeles')
      
      expect(typeof nyTime).toBe('number')
      expect(typeof laTime).toBe('number')
      expect(nyTime).toBeGreaterThanOrEqual(0)
      expect(nyTime).toBeLessThan(1440) // Less than 24 hours in minutes
    })
  })

  describe('isToday', () => {
    it('should correctly identify if date is today in timezone', () => {
      const today = '2024-01-15'
      const yesterday = '2024-01-14'
      const tomorrow = '2024-01-16'
      
      expect(isToday(today, 'America/New_York')).toBe(true)
      expect(isToday(yesterday, 'America/New_York')).toBe(false)
      expect(isToday(tomorrow, 'America/New_York')).toBe(false)
    })
  })

  describe('getTodaysSpecialSchedule', () => {
    const specialSchedules: SpecialSchedule[] = [
      {
        date: '2024-01-15',
        name: 'Martin Luther King Jr. Day',
        closed: true
      },
      {
        date: '2024-01-16',
        name: 'Special Event',
        hours: { openTime: '10:00', closeTime: '18:00' },
        closed: false
      }
    ]

    it('should return special schedule for today', () => {
      const todaySpecial = getTodaysSpecialSchedule(specialSchedules, 'America/New_York')
      expect(todaySpecial?.name).toBe('Martin Luther King Jr. Day')
      expect(todaySpecial?.closed).toBe(true)
    })

    it('should return undefined if no special schedule today', () => {
      const noSpecialSchedules: SpecialSchedule[] = []
      const todaySpecial = getTodaysSpecialSchedule(noSpecialSchedules, 'America/New_York')
      expect(todaySpecial).toBeUndefined()
    })
  })

  describe('getRegularHours', () => {
    const businessHours: BusinessHours[] = [
      { day: 'monday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'tuesday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'sunday', openTime: '00:00', closeTime: '00:00', closed: true }
    ]

    it('should return hours for specified day', () => {
      const mondayHours = getRegularHours(businessHours, 'monday')
      expect(mondayHours?.openTime).toBe('09:00')
      expect(mondayHours?.closeTime).toBe('17:00')
      expect(mondayHours?.closed).toBe(false)
    })

    it('should return undefined for day not in schedule', () => {
      const saturdayHours = getRegularHours(businessHours, 'saturday')
      expect(saturdayHours).toBeUndefined()
    })
  })

  describe('isLocationOpen', () => {
    const regularHours: BusinessHours = {
      day: 'monday',
      openTime: '09:00',
      closeTime: '17:00',
      closed: false
    }

    it('should return true when location is open during regular hours', () => {
      const currentTime = timeToMinutes('12:00') // Noon
      expect(isLocationOpen(currentTime, regularHours)).toBe(true)
    })

    it('should return false when location is closed during regular hours', () => {
      const currentTime = timeToMinutes('18:00') // 6 PM
      expect(isLocationOpen(currentTime, regularHours)).toBe(false)
    })

    it('should handle special schedule override', () => {
      const currentTime = timeToMinutes('12:00')
      const specialSchedule: SpecialSchedule = {
        date: '2024-01-15',
        name: 'Holiday',
        closed: true
      }
      
      expect(isLocationOpen(currentTime, regularHours, specialSchedule)).toBe(false)
    })

    it('should handle overnight hours', () => {
      const overnightHours: BusinessHours = {
        day: 'friday',
        openTime: '22:00',
        closeTime: '02:00',
        closed: false
      }
      
      // Should be open at 11 PM
      expect(isLocationOpen(timeToMinutes('23:00'), overnightHours)).toBe(true)
      // Should be open at 1 AM
      expect(isLocationOpen(timeToMinutes('01:00'), overnightHours)).toBe(true)
      // Should be closed at 3 AM
      expect(isLocationOpen(timeToMinutes('03:00'), overnightHours)).toBe(false)
    })

    it('should return false when hours are marked as closed', () => {
      const closedHours: BusinessHours = {
        day: 'sunday',
        openTime: '00:00',
        closeTime: '00:00',
        closed: true
      }
      
      expect(isLocationOpen(timeToMinutes('12:00'), closedHours)).toBe(false)
    })
  })

  describe('getLocationStatus', () => {
    const sampleLocation: Location = {
      id: 'test',
      name: 'Test Location',
      businessHours: [
        { day: 'monday', openTime: '09:00', closeTime: '17:00', closed: false },
        { day: 'tuesday', openTime: '09:00', closeTime: '17:00', closed: false },
        { day: 'wednesday', openTime: '09:00', closeTime: '17:00', closed: false },
        { day: 'thursday', openTime: '09:00', closeTime: '17:00', closed: false },
        { day: 'friday', openTime: '09:00', closeTime: '17:00', closed: false },
        { day: 'saturday', openTime: '10:00', closeTime: '14:00', closed: false },
        { day: 'sunday', openTime: '00:00', closeTime: '00:00', closed: true }
      ],
      contact: {
        address: {
          street: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345',
          country: 'USA'
        }
      },
      timezone: 'America/New_York'
    }

    it('should return correct status when open', () => {
      // Mock time to be 12:00 PM on Monday (within business hours)
      vi.setSystemTime(new Date('2024-01-15T17:00:00Z')) // 12 PM EST
      
      const status = getLocationStatus(sampleLocation)
      expect(status.isOpen).toBe(true)
      expect(status.message).toContain('Open')
    })

    it('should return correct status when closed', () => {
      // Mock time to be 8:00 PM on Monday (after business hours)
      vi.setSystemTime(new Date('2024-01-16T01:00:00Z')) // 8 PM EST Monday
      
      const status = getLocationStatus(sampleLocation)
      expect(status.isOpen).toBe(false)
      expect(status.message).toContain('Closed')
    })

    it('should handle special schedules', () => {
      const locationWithSpecial: Location = {
        ...sampleLocation,
        specialSchedules: [
          {
            date: '2024-01-15',
            name: 'Holiday',
            closed: true,
            message: 'Closed for holiday'
          }
        ]
      }
      
      const status = getLocationStatus(locationWithSpecial)
      expect(status.isOpen).toBe(false)
      expect(status.message).toBe('Closed for holiday')
    })
  })

  describe('formatBusinessHours', () => {
    it('should format open hours correctly', () => {
      const hours: BusinessHours = {
        day: 'monday',
        openTime: '09:00',
        closeTime: '17:00',
        closed: false
      }
      
      expect(formatBusinessHours(hours)).toBe('9:00 AM - 5:00 PM')
      expect(formatBusinessHours(hours, true)).toBe('09:00 - 17:00')
    })

    it('should format closed hours correctly', () => {
      const hours: BusinessHours = {
        day: 'sunday',
        openTime: '00:00',
        closeTime: '00:00',
        closed: true
      }
      
      expect(formatBusinessHours(hours)).toBe('Closed')
    })
  })

  describe('groupBusinessHours', () => {
    const businessHours: BusinessHours[] = [
      { day: 'monday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'tuesday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'wednesday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'thursday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'friday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'saturday', openTime: '10:00', closeTime: '14:00', closed: false },
      { day: 'sunday', openTime: '00:00', closeTime: '00:00', closed: true }
    ]

    it('should group consecutive days with same hours', () => {
      const grouped = groupBusinessHours(businessHours)
      
      expect(grouped).toContain('Mon-Fri: 9:00 AM - 5:00 PM')
      expect(grouped).toContain('Sat: 10:00 AM - 2:00 PM')
      expect(grouped).toContain('Sun: Closed')
    })

    it('should handle 24-hour format', () => {
      const grouped = groupBusinessHours(businessHours, true)
      
      expect(grouped).toContain('Mon-Fri: 09:00 - 17:00')
      expect(grouped).toContain('Sat: 10:00 - 14:00')
      expect(grouped).toContain('Sun: Closed')
    })

    it('should handle non-consecutive days', () => {
      const sparseHours: BusinessHours[] = [
        { day: 'monday', openTime: '09:00', closeTime: '17:00', closed: false },
        { day: 'wednesday', openTime: '09:00', closeTime: '17:00', closed: false },
        { day: 'friday', openTime: '09:00', closeTime: '17:00', closed: false }
      ]
      
      const grouped = groupBusinessHours(sparseHours)
      expect(grouped).toContain('Mon, Wed, Fri: 9:00 AM - 5:00 PM')
    })

    it('should handle single days', () => {
      const singleDay: BusinessHours[] = [
        { day: 'saturday', openTime: '10:00', closeTime: '14:00', closed: false }
      ]
      
      const grouped = groupBusinessHours(singleDay)
      expect(grouped).toContain('Sat: 10:00 AM - 2:00 PM')
    })
  })
})