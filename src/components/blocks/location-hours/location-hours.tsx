import { type JSX, useState, useMemo } from 'react'
import { cn } from '../../../lib/utils'
import { Card } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { FiClock, FiPhone, FiMail, FiMapPin, FiSearch, FiCalendar, FiExternalLink } from 'react-icons/fi'
import type { LocationHoursProperties, Location } from './types'
import { getLocationStatus, groupBusinessHours, formatTime, getTodaysSpecialSchedule } from './utils'

function LocationHours({
  variant = 'single-location',
  locations,
  showCurrentStatus = true,
  showSpecialSchedules = true,
  showContactInfo = true,
  showServices = false,
  showAppointmentBooking = false,
  allowLocationSearch = false,
  allowLocationFilter = false,
  className,
  maxLocationsToShow,
  defaultTimezone = 'America/New_York',
  showMap = false,
  compactView = false,
  darkMode = false,
  statusMessages = {}
}: Readonly<LocationHoursProperties>): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  // Filter and search locations
  const filteredLocations = useMemo(() => {
    let filtered = locations

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.contact.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.contact.address.state.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply location filter (could be by city, state, etc.)
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(location =>
        location.contact.address.city === selectedFilter ||
        location.contact.address.state === selectedFilter
      )
    }

    // Limit results if specified
    if (maxLocationsToShow) {
      filtered = filtered.slice(0, maxLocationsToShow)
    }

    return filtered
  }, [locations, searchTerm, selectedFilter, maxLocationsToShow])

  // Get unique cities/states for filter dropdown
  const filterOptions = useMemo(() => {
    const cities = [...new Set(locations.map(l => l.contact.address.city))]
    const states = [...new Set(locations.map(l => l.contact.address.state))]
    return [
      { value: 'all', label: 'All Locations' },
      ...cities.map(city => ({ value: city, label: city })),
      ...states.map(state => ({ value: state, label: state }))
    ]
  }, [locations])

  const renderSearchAndFilter = (): JSX.Element | null => {
    if (!allowLocationSearch && !allowLocationFilter) return null

    return (
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {allowLocationSearch && (
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {allowLocationFilter && (
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
    )
  }

  const renderLocationHeader = (location: Location, status: ReturnType<typeof getLocationStatus>): JSX.Element => (
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className={cn(
          'font-semibold text-lg',
          compactView && 'text-base',
          darkMode && 'text-white'
        )}>
          {location.name}
        </h3>
        {location.description && !compactView && (
          <p className={cn('text-sm text-muted-foreground mt-1', darkMode && 'text-gray-300')}>
            {location.description}
          </p>
        )}
      </div>

      {showCurrentStatus && (
        <Badge 
          variant={status.isOpen ? 'default' : 'secondary'}
          className={cn(
            'ml-4',
            status.isOpen ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200',
            darkMode && status.isOpen && 'bg-green-900 text-green-200 border-green-700',
            darkMode && !status.isOpen && 'bg-red-900 text-red-200 border-red-700'
          )}
        >
          <FiClock className="w-3 h-3 mr-1" />
          {status.isOpen ? 'Open' : 'Closed'}
        </Badge>
      )}
    </div>
  )

  const renderSpecialSchedule = (todaySpecial: ReturnType<typeof getTodaysSpecialSchedule>): JSX.Element | null => {
    if (!showSpecialSchedules || !todaySpecial) return null

    return (
      <div className={cn(
        'mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200',
        darkMode && 'bg-yellow-900/20 border-yellow-700'
      )}>
        <div className="flex items-center gap-2">
          <FiCalendar className="w-4 h-4 text-yellow-600" />
          <span className={cn('text-sm font-medium text-yellow-800', darkMode && 'text-yellow-200')}>
            {todaySpecial.name}
          </span>
        </div>
        {todaySpecial.message && (
          <p className={cn('text-sm text-yellow-700 mt-1', darkMode && 'text-yellow-300')}>
            {todaySpecial.message}
          </p>
        )}
      </div>
    )
  }

  const renderBusinessHours = (location: Location, groupedHours: string[]): JSX.Element => (
    <div className="mb-4">
      <h4 className={cn('font-medium text-sm mb-2', darkMode && 'text-gray-200')}>
        Hours
      </h4>
      {variant === 'minimal-hours' ? (
        <div className="space-y-1">
          {groupedHours.map((hourGroup, index) => (
            <p key={index} className={cn('text-sm', darkMode && 'text-gray-300')}>
              {hourGroup}
            </p>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-1">
          {location.businessHours.map((hours) => (
            <div key={hours.day} className="flex justify-between text-sm">
              <span className={cn('capitalize font-medium', darkMode && 'text-gray-200')}>
                {hours.day.slice(0, 3)}
              </span>
              <span className={cn(darkMode && 'text-gray-300')}>
                {hours.closed ? 'Closed' : `${formatTime(hours.openTime)} - ${formatTime(hours.closeTime)}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderContactInfo = (location: Location): JSX.Element | null => {
    if (!showContactInfo) return null

    return (
      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <FiMapPin className="w-4 h-4 text-muted-foreground" />
          <span className={cn(darkMode && 'text-gray-300')}>
            {location.contact.address.street}, {location.contact.address.city}, {location.contact.address.state} {location.contact.address.zipCode}
          </span>
        </div>

        {location.contact.phone && (
          <div className="flex items-center gap-2 text-sm">
            <FiPhone className="w-4 h-4 text-muted-foreground" />
            <a
              href={`tel:${location.contact.phone}`}
              className={cn('hover:underline', darkMode && 'text-blue-400')}
            >
              {location.contact.phone}
            </a>
          </div>
        )}

        {location.contact.email && (
          <div className="flex items-center gap-2 text-sm">
            <FiMail className="w-4 h-4 text-muted-foreground" />
            <a
              href={`mailto:${location.contact.email}`}
              className={cn('hover:underline', darkMode && 'text-blue-400')}
            >
              {location.contact.email}
            </a>
          </div>
        )}
      </div>
    )
  }

  const renderActionButtons = (location: Location): JSX.Element => (
    <div className="flex flex-wrap gap-2">
      {showMap && location.map?.showDirectionsLink && (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1 sm:flex-none"
        >
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${location.map.latitude},${location.map.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiMapPin className="w-4 h-4 mr-2" />
            Directions
          </a>
        </Button>
      )}

      {showAppointmentBooking && location.appointmentBookingUrl && (
        <Button
          size="sm"
          asChild
          className="flex-1 sm:flex-none"
        >
          <a
            href={location.appointmentBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiCalendar className="w-4 h-4 mr-2" />
            Book Appointment
          </a>
        </Button>
      )}

      {location.contact.website && (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1 sm:flex-none"
        >
          <a
            href={location.contact.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiExternalLink className="w-4 h-4 mr-2" />
            Website
          </a>
        </Button>
      )}
    </div>
  )

  const renderLocationCard = (location: Location): JSX.Element => {
    const status = getLocationStatus(location)
    const todaySpecial = getTodaysSpecialSchedule(location.specialSchedules, location.timezone)
    const groupedHours = groupBusinessHours(location.businessHours)

    return (
      <Card
        key={location.id}
        className={cn(
          'p-6 transition-all duration-200 hover:shadow-lg',
          compactView && 'p-4',
          darkMode && 'bg-gray-800 border-gray-700'
        )}
      >
        {renderLocationHeader(location, status)}

        {/* Status Message */}
        {showCurrentStatus && (
          <p className={cn('text-sm font-medium mb-4', darkMode && 'text-gray-200')}>
            {status.message}
          </p>
        )}

        {renderSpecialSchedule(todaySpecial)}
        {renderBusinessHours(location, groupedHours)}
        {renderContactInfo(location)}

        {/* Services */}
        {showServices && location.services && location.services.length > 0 && (
          <div className="mb-4">
            <h4 className={cn('font-medium text-sm mb-2', darkMode && 'text-gray-200')}>
              Services
            </h4>
            <div className="flex flex-wrap gap-1">
              {location.services.map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Map Integration */}
        {showMap && location.map?.enabled && location.map.latitude && location.map.longitude && (
          <div className="mb-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.map.latitude},${location.map.longitude}&zoom=${location.map.zoom || 15}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map for ${location.name}`}
              />
            </div>
          </div>
        )}

        {renderActionButtons(location)}
      </Card>
    )
  }

  const getGridClasses = (): string => {
    if (variant === 'single-location' || filteredLocations.length === 1) {
      return 'max-w-2xl mx-auto'
    }

    if (variant === 'multiple-locations' || variant === 'detailed-info-cards') {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    }

    if (variant === 'map-integration') {
      return 'grid grid-cols-1 lg:grid-cols-2 gap-6'
    }

    return 'space-y-4'
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Search and Filter */}
      {renderSearchAndFilter()}

      {/* No Results */}
      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <p className={cn('text-muted-foreground', darkMode && 'text-gray-400')}>
            No locations found matching your criteria.
          </p>
        </div>
      )}

      {/* Locations Grid */}
      {filteredLocations.length > 0 && (
        <div className={getGridClasses()}>
          {filteredLocations.map((location) => renderLocationCard(location))}
        </div>
      )}
    </div>
  )
}

export { LocationHours }

export {type LocationHoursProperties} from './types'