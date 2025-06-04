import { type JSX, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../../lib/utils'
import { Card } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  Navigation,
  Globe,
  CheckCircle
} from 'lucide-react'
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
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

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
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        {allowLocationSearch && (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
            />
          </div>
        )}

        {allowLocationFilter && (
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </motion.div>
    )
  }

  const renderLocationHeader = (location: Location, status: ReturnType<typeof getLocationStatus>): JSX.Element => (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={cn(
            'font-bold text-2xl mb-2 text-slate-900 dark:text-white',
            compactView && 'text-xl'
          )}>
            {location.name}
          </h3>
          {location.description && !compactView && (
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {location.description}
            </p>
          )}
        </div>

        {showCurrentStatus && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Badge 
              variant={status.isOpen ? 'default' : 'secondary'}
              className={cn(
                'ml-4 px-4 py-2 text-sm font-medium',
                status.isOpen 
                  ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' 
                  : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
              )}
            >
              <Clock className="w-4 h-4 mr-2 inline" />
              {status.isOpen ? 'Open Now' : 'Closed'}
            </Badge>
          </motion.div>
        )}
      </div>
      
      {/* Status Message with icon */}
      {showCurrentStatus && (
        <div className="flex items-center gap-2 text-sm">
          <div className={cn(
            "w-2 h-2 rounded-full",
            status.isOpen ? "bg-green-500" : "bg-red-500"
          )} />
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            {status.message}
          </p>
        </div>
      )}
    </div>
  )

  const renderSpecialSchedule = (todaySpecial: ReturnType<typeof getTodaysSpecialSchedule>): JSX.Element | null => {
    if (!showSpecialSchedules || !todaySpecial) return null

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded-lg">
            <Calendar className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <span className="font-semibold text-yellow-800 dark:text-yellow-300">
              {todaySpecial.name}
            </span>
            {todaySpecial.message && (
              <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                {todaySpecial.message}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  const renderBusinessHours = (location: Location, groupedHours: string[]): JSX.Element => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase().slice(0, 3)
    
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h4 className="font-semibold text-lg text-slate-900 dark:text-white">
            Business Hours
          </h4>
        </div>
        
        {variant === 'minimal-hours' ? (
          <div className="space-y-2 pl-12">
            {groupedHours.map((hourGroup, index) => (
              <motion.p 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-slate-600 dark:text-slate-400"
              >
                {hourGroup}
              </motion.p>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 pl-12">
            {location.businessHours.map((hours, index) => {
              const isToday = hours.day.toLowerCase().startsWith(today)
              return (
                <motion.div 
                  key={hours.day}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex justify-between items-center py-2 px-3 rounded-lg transition-colors",
                    isToday && "bg-blue-50 dark:bg-blue-900/20 font-medium"
                  )}
                >
                  <span className={cn(
                    "capitalize",
                    isToday ? "text-blue-700 dark:text-blue-300" : "text-slate-700 dark:text-slate-300"
                  )}>
                    {hours.day}
                  </span>
                  <span className={cn(
                    isToday ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
                  )}>
                    {hours.closed ? (
                      <span className="text-red-500 dark:text-red-400">Closed</span>
                    ) : (
                      `${formatTime(hours.openTime)} - ${formatTime(hours.closeTime)}`
                    )}
                  </span>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const renderContactInfo = (location: Location): JSX.Element | null => {
    if (!showContactInfo) return null

    const contactItems = [
      {
        icon: MapPin,
        label: 'Address',
        value: `${location.contact.address.street}, ${location.contact.address.city}, ${location.contact.address.state} ${location.contact.address.zipCode}`,
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/40'
      },
      ...(location.contact.phone ? [{
        icon: Phone,
        label: 'Phone',
        value: location.contact.phone,
        href: `tel:${location.contact.phone}`,
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-100 dark:bg-green-900/40'
      }] : []),
      ...(location.contact.email ? [{
        icon: Mail,
        label: 'Email',
        value: location.contact.email,
        href: `mailto:${location.contact.email}`,
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/40'
      }] : []),
      ...(location.contact.website ? [{
        icon: Globe,
        label: 'Website',
        value: 'Visit Website',
        href: location.contact.website,
        external: true,
        color: 'text-indigo-600 dark:text-indigo-400',
        bgColor: 'bg-indigo-100 dark:bg-indigo-900/40'
      }] : [])
    ]

    return (
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
            <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h4 className="font-semibold text-lg text-slate-900 dark:text-white">
            Contact Information
          </h4>
        </div>
        
        <div className="space-y-3 pl-12">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3"
            >
              <div className={cn("p-1.5 rounded-lg", item.bgColor)}>
                <item.icon className={cn("w-4 h-4", item.color)} />
              </div>
              <div className="flex-1">
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "hover:underline transition-colors",
                      item.color,
                      "flex items-center gap-1"
                    )}
                  >
                    {item.value}
                    {item.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                ) : (
                  <span className="text-slate-600 dark:text-slate-400">
                    {item.value}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  const renderServices = (services: string[]): JSX.Element | null => {
    if (!showServices || !services || services.length === 0) return null

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="font-semibold text-lg text-slate-900 dark:text-white">
            Services Available
          </h4>
        </div>
        <div className="flex flex-wrap gap-2 pl-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Badge 
                variant="outline" 
                className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              >
                {service}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  const renderActionButtons = (location: Location): JSX.Element => {
    const actions = [
      ...(showMap && location.map?.showDirectionsLink ? [{
        icon: Navigation,
        label: 'Get Directions',
        href: `https://www.google.com/maps/dir/?api=1&destination=${location.map.latitude},${location.map.longitude}`,
        variant: 'outline' as const,
        color: 'hover:text-purple-600 dark:hover:text-purple-400'
      }] : []),
      ...(showAppointmentBooking && location.appointmentBookingUrl ? [{
        icon: Calendar,
        label: 'Book Appointment',
        href: location.appointmentBookingUrl,
        variant: 'default' as const,
        color: ''
      }] : []),
      ...(location.contact.website ? [{
        icon: Globe,
        label: 'Website',
        href: location.contact.website,
        variant: 'outline' as const,
        color: 'hover:text-blue-600 dark:hover:text-blue-400'
      }] : [])
    ]

    if (actions.length === 0) return <></>

    return (
      <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={action.variant}
              size="sm"
              asChild
              className={cn(
                "group",
                action.variant === 'default' 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                  : action.color
              )}
            >
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <action.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                {action.label}
              </a>
            </Button>
          </motion.div>
        ))}
      </div>
    )
  }

  const renderLocationCard = (location: Location, index: number): JSX.Element => {
    const status = getLocationStatus(location)
    const todaySpecial = getTodaysSpecialSchedule(location.specialSchedules, location.timezone)
    const groupedHours = groupBusinessHours(location.businessHours)
    const isExpanded = expandedCard === location.id

    return (
      <motion.div
        key={location.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        layout
      >
        <Card
          className={cn(
            'overflow-hidden transition-all duration-300 hover:shadow-xl',
            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700',
            isExpanded && 'ring-2 ring-blue-500 dark:ring-blue-400'
          )}
        >
          {/* Gradient accent top bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
          
          <div className={cn('p-6', compactView && 'p-4')}>
            {renderLocationHeader(location, status)}
            {renderSpecialSchedule(todaySpecial)}
            
            <AnimatePresence>
              {(variant === 'single-location' || isExpanded) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderBusinessHours(location, groupedHours)}
                  {renderContactInfo(location)}
                  {renderServices(location.services || [])}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Map Integration */}
            {showMap && location.map?.enabled && location.map.latitude && location.map.longitude && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 rounded-xl overflow-hidden shadow-md"
              >
                <div className="aspect-video bg-slate-100 dark:bg-slate-800">
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
              </motion.div>
            )}

            {variant !== 'single-location' && !isExpanded && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedCard(isExpanded ? null : location.id)}
                className="w-full mt-4 group"
              >
                View Details
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}

            {(variant === 'single-location' || isExpanded) && renderActionButtons(location)}
          </div>
        </Card>
      </motion.div>
    )
  }

  const getGridClasses = (): string => {
    if (variant === 'single-location' || filteredLocations.length === 1) {
      return 'max-w-3xl mx-auto'
    }

    if (variant === 'multiple-locations' || variant === 'detailed-info-cards') {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    }

    if (variant === 'map-integration') {
      return 'grid grid-cols-1 lg:grid-cols-2 gap-6'
    }

    return 'space-y-6'
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Our Locations
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Find a location near you and visit us today
        </p>
      </div>

      {/* Search and Filter */}
      {renderSearchAndFilter()}

      {/* No Results */}
      {filteredLocations.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-slate-400" />
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            No locations found matching your criteria.
          </p>
        </motion.div>
      )}

      {/* Locations Grid */}
      {filteredLocations.length > 0 && (
        <div className={getGridClasses()}>
          {filteredLocations.map((location, index) => renderLocationCard(location, index))}
        </div>
      )}
    </div>
  )
}

export { LocationHours }

export {type LocationHoursProperties} from './types'