import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../../ui/card'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { Input } from '../../ui/input'
import { Select } from '../../ui/select'
import { cn } from '../../../lib/utils'

export interface EventSpeaker {
  name: string
  title?: string
  image?: string
  bio?: string
}

export interface EventLocation {
  name: string
  address?: string
  virtual?: boolean
  mapUrl?: string
}

export interface Event {
  id: string
  title: string
  description: string
  startDate: string
  endDate?: string
  location: EventLocation
  speakers?: EventSpeaker[]
  category: string
  registrationUrl?: string
  capacity?: number
  registeredCount?: number
  featured?: boolean
  tags?: string[]
  price?: {
    amount: number
    currency: string
    free?: boolean
  }
  image?: string
  status?: 'upcoming' | 'ongoing' | 'past' | 'cancelled'
}

export interface EventListingsProperties {
  events?: Event[]
  variant?: 'cards' | 'calendar' | 'featured' | 'timeline' | 'grid'
  showSearch?: boolean
  showFilters?: boolean
  showPagination?: boolean
  itemsPerPage?: number
  showCountdown?: boolean
  showCapacity?: boolean
  animated?: boolean
  className?: string
  onEventClick?: (event: Event) => void
  onRegister?: (event: Event) => void
}

const defaultEvents: Event[] = [
  {
    id: '1',
    title: 'React Conference 2024',
    description: 'The biggest React conference of the year featuring the latest updates and best practices.',
    startDate: '2024-06-15T09:00:00Z',
    endDate: '2024-06-17T17:00:00Z',
    location: { name: 'San Francisco Convention Center', address: '747 Howard St, San Francisco, CA' },
    speakers: [
      { name: 'Dan Abramov', title: 'React Team Lead', image: '/api/placeholder/60/60' },
      { name: 'Sophie Alpert', title: 'Former React Team Manager', image: '/api/placeholder/60/60' }
    ],
    category: 'Conference',
    registrationUrl: '#',
    capacity: 1000,
    registeredCount: 847,
    featured: true,
    tags: ['React', 'JavaScript', 'Frontend'],
    price: { amount: 299, currency: 'USD' },
    image: '/api/placeholder/400/200',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'JavaScript Workshop: Advanced Patterns',
    description: 'Deep dive into advanced JavaScript patterns and performance optimization techniques.',
    startDate: '2024-05-20T14:00:00Z',
    endDate: '2024-05-20T18:00:00Z',
    location: { name: 'Tech Hub Downtown', virtual: false },
    speakers: [{ name: 'Kyle Simpson', title: 'JavaScript Expert', image: '/api/placeholder/60/60' }],
    category: 'Workshop',
    registrationUrl: '#',
    capacity: 50,
    registeredCount: 23,
    tags: ['JavaScript', 'Performance'],
    price: { amount: 89, currency: 'USD' },
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Free Webinar: Getting Started with TypeScript',
    description: 'Introduction to TypeScript for JavaScript developers. Perfect for beginners.',
    startDate: '2024-05-25T19:00:00Z',
    endDate: '2024-05-25T20:30:00Z',
    location: { name: 'Online', virtual: true },
    speakers: [{ name: 'Anders Hejlsberg', title: 'TypeScript Creator', image: '/api/placeholder/60/60' }],
    category: 'Webinar',
    registrationUrl: '#',
    capacity: 500,
    registeredCount: 342,
    tags: ['TypeScript', 'Beginner'],
    price: { free: true, amount: 0, currency: 'USD' },
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'UX Design Meetup',
    description: 'Monthly meetup for UX designers to share insights and network.',
    startDate: '2024-05-30T18:30:00Z',
    endDate: '2024-05-30T21:00:00Z',
    location: { name: 'Design Studio Co-work', address: '123 Creative St, Austin, TX' },
    category: 'Meetup',
    registrationUrl: '#',
    capacity: 30,
    registeredCount: 18,
    tags: ['UX', 'Design', 'Networking'],
    price: { free: true, amount: 0, currency: 'USD' },
    status: 'upcoming'
  }
]

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

function getTimeUntilEvent(dateString: string): string {
  const now = new Date()
  const eventDate = new Date(dateString)
  const diffMs = eventDate.getTime() - now.getTime()
  
  if (diffMs <= 0) return 'Event started'
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} left`
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} left`
  
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} left`
}

function getCapacityColor(capacityPercentage: number): string {
  if (capacityPercentage > 80) return "bg-red-500"
  if (capacityPercentage > 60) return "bg-yellow-500"
  return "bg-green-500"
}

function EventCard({ event, showCountdown, showCapacity, animated, onEventClick, onRegister }: {
  readonly event: Event
  readonly showCountdown?: boolean
  readonly showCapacity?: boolean
  readonly animated?: boolean
  readonly onEventClick?: (event: Event) => void
  readonly onRegister?: (event: Event) => void
}) {
  const CardComponent = animated ? motion.div : 'div'
  const cardProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
    whileHover: { y: -4, transition: { duration: 0.2 } }
  } : {}

  const capacityPercentage = event.capacity && event.registeredCount 
    ? (event.registeredCount / event.capacity) * 100 
    : 0

  return (
    <CardComponent {...cardProps} className="h-full">
      <Card className="h-full flex flex-col overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onEventClick?.(event)}>
        {event.image && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {event.featured && (
              <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                Featured
              </Badge>
            )}
            {showCountdown && (
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {getTimeUntilEvent(event.startDate)}
              </div>
            )}
          </div>
        )}
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <Badge variant="secondary" className="mb-2">
              {event.category}
            </Badge>
            {event.status === 'upcoming' && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                Upcoming
              </Badge>
            )}
          </div>

          <h3 className="text-xl font-semibold mb-2 line-clamp-2">{event.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2 flex-1">{event.description}</p>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">📅</span>
              <span>{formatDate(event.startDate)} at {formatTime(event.startDate)}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">{event.location.virtual ? '💻' : '📍'}</span>
              <span>{event.location.name}</span>
            </div>

            {event.speakers && event.speakers.length > 0 && (
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">👥</span>
                <span>{event.speakers.map(s => s.name).join(', ')}</span>
              </div>
            )}
          </div>

          {showCapacity && event.capacity && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Registered</span>
                <span>{event.registeredCount || 0} / {event.capacity}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={cn(
                    "h-2 rounded-full transition-all",
                    getCapacityColor(capacityPercentage)
                  )}
                  style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto">
            <div className="text-lg font-semibold">
              {event.price?.free ? 'Free' : `$${event.price?.amount || 0}`}
            </div>
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                onRegister?.(event)
              }}
              className="ml-4"
            >
              Register
            </Button>
          </div>
        </div>
      </Card>
    </CardComponent>
  )
}

function FeaturedEventCard({ event, showCountdown, animated, onEventClick, onRegister }: {
  readonly event: Event
  readonly showCountdown?: boolean
  readonly animated?: boolean
  readonly onEventClick?: (event: Event) => void
  readonly onRegister?: (event: Event) => void
}) {
  const CardComponent = animated ? motion.div : 'div'
  const cardProps = animated ? {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  } : {}

  return (
    <CardComponent {...cardProps}>
      <Card className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white cursor-pointer hover:shadow-2xl transition-all duration-300"
            onClick={() => onEventClick?.(event)}>
        <div className="p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <Badge className="mb-4 bg-white/20 text-white border-0">
                Featured Event
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{event.title}</h1>
              <p className="text-lg mb-6 text-white/90">{event.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <span className="mr-2">📅</span>
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">⏰</span>
                  <span>{formatTime(event.startDate)}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{event.location.virtual ? '💻' : '📍'}</span>
                  <span>{event.location.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">💰</span>
                  <span>{event.price?.free ? 'Free' : `$${event.price?.amount || 0}`}</span>
                </div>
              </div>

              {showCountdown && (
                <div className="mb-6 p-4 bg-white/10 rounded-lg">
                  <div className="text-sm text-white/80 mb-1">Event starts in:</div>
                  <div className="text-2xl font-bold">{getTimeUntilEvent(event.startDate)}</div>
                </div>
              )}

              <Button 
                size="lg"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation()
                  onRegister?.(event)
                }}
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                Register Now
              </Button>
            </div>
            
            {event.image && (
              <div className="lg:w-1/3">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    </CardComponent>
  )
}

export function EventListings({
  events = defaultEvents,
  variant = 'cards',
  showSearch = true,
  showFilters = true,
  showPagination = false,
  itemsPerPage = 9,
  showCountdown = true,
  showCapacity = true,
  animated = true,
  className,
  onEventClick,
  onRegister,
  ...properties
}: Readonly<EventListingsProperties>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = useMemo(() => {
    const cats = [...new Set(events.map(event => event.category))]
    return ['all', ...cats]
  }, [events])

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [events, searchTerm, selectedCategory])

  const paginatedEvents = useMemo(() => {
    if (!showPagination) return filteredEvents
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredEvents, currentPage, itemsPerPage, showPagination])

  const featuredEvent = events.find(event => event.featured)

  const renderEvents = () => {
    switch (variant) {
      case 'featured': {
        return (
          <div className="space-y-8">
            {featuredEvent && (
              <FeaturedEventCard 
                event={featuredEvent}
                showCountdown={showCountdown}
                animated={animated}
                onEventClick={onEventClick}
                onRegister={onRegister}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedEvents.filter(e => !e.featured).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  showCountdown={showCountdown}
                  showCapacity={showCapacity}
                  animated={animated}
                  onEventClick={onEventClick}
                  onRegister={onRegister}
                />
              ))}
            </div>
          </div>
        )
      }

      case 'timeline': {
        return (
          <div className="space-y-6">
            {paginatedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={animated ? { opacity: 0, x: index % 2 === 0 ? -50 : 50 } : undefined}
                animate={animated ? { opacity: 1, x: 0 } : undefined}
                transition={animated ? { duration: 0.5, delay: index * 0.1 } : undefined}
                className={cn(
                  "flex items-center gap-6",
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                )}
              >
                <div className="flex-1">
                  <EventCard
                    event={event}
                    showCountdown={showCountdown}
                    showCapacity={showCapacity}
                    animated={false}
                    onEventClick={onEventClick}
                    onRegister={onRegister}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  {index < paginatedEvents.length - 1 && (
                    <div className="w-px h-20 bg-gray-300 mt-2"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )
      }

      case 'grid': {
        const eventsByCategory: Record<string, Event[]> = {}
        for (const category of categories.slice(1)) {
          eventsByCategory[category] = paginatedEvents.filter(event => event.category === category)
        }

        return (
          <div className="space-y-8">
            {Object.entries(eventsByCategory).map(([category, categoryEvents]) => (
              categoryEvents.length > 0 && (
                <div key={category}>
                  <h3 className="text-2xl font-bold mb-4">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        showCountdown={showCountdown}
                        showCapacity={showCapacity}
                        animated={animated}
                        onEventClick={onEventClick}
                        onRegister={onRegister}
                      />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )
      }

      default: { // cards
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {paginatedEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  showCountdown={showCountdown}
                  showCapacity={showCapacity}
                  animated={animated}
                  onEventClick={onEventClick}
                  onRegister={onRegister}
                />
              ))}
            </AnimatePresence>
          </div>
        )
      }
    }
  }

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)

  return (
    <div className={cn('space-y-6', className)} {...properties}>
      {(showSearch || showFilters) && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {showSearch && (
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          
          {showFilters && (
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <option value="all">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Select>
            </div>
          )}
        </div>
      )}

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
        </div>
      ) : (
        renderEvents()
      )}

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="px-4 py-2 text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}