import type { Meta, StoryObj } from '@storybook/react'
import { LocationHours } from './location-hours'
import type { Location } from './types'

// Sample location data
const sampleLocations: Location[] = [
  {
    id: 'downtown',
    name: 'Downtown Office',
    description: 'Our main office in the heart of the city',
    businessHours: [
      { day: 'monday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'tuesday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'wednesday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'thursday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'friday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'saturday', openTime: '10:00', closeTime: '14:00', closed: false },
      { day: 'sunday', openTime: '00:00', closeTime: '00:00', closed: true }
    ],
    specialSchedules: [
      {
        date: '2024-12-25',
        name: 'Christmas Day',
        closed: true,
        message: 'Closed for Christmas. Happy Holidays!'
      },
      {
        date: '2024-11-29',
        name: 'Black Friday',
        hours: { openTime: '08:00', closeTime: '20:00' },
        closed: false,
        message: 'Extended hours for Black Friday!'
      }
    ],
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'downtown@company.com',
      website: 'https://company.com',
      address: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    },
    timezone: 'America/New_York',
    map: {
      enabled: true,
      latitude: 40.7128,
      longitude: -74.006,
      zoom: 15,
      showDirectionsLink: true
    },
    services: ['Consulting', 'Support', 'Training'],
    appointmentBookingUrl: 'https://company.com/book-appointment'
  },
  {
    id: 'westside',
    name: 'Westside Branch',
    description: 'Convenient location on the west side',
    businessHours: [
      { day: 'monday', openTime: '08:00', closeTime: '18:00', closed: false },
      { day: 'tuesday', openTime: '08:00', closeTime: '18:00', closed: false },
      { day: 'wednesday', openTime: '08:00', closeTime: '18:00', closed: false },
      { day: 'thursday', openTime: '08:00', closeTime: '18:00', closed: false },
      { day: 'friday', openTime: '08:00', closeTime: '18:00', closed: false },
      { day: 'saturday', openTime: '09:00', closeTime: '16:00', closed: false },
      { day: 'sunday', openTime: '12:00', closeTime: '17:00', closed: false }
    ],
    contact: {
      phone: '+1 (555) 987-6543',
      email: 'westside@company.com',
      address: {
        street: '456 West Avenue',
        city: 'New York',
        state: 'NY',
        zipCode: '10025',
        country: 'USA'
      }
    },
    timezone: 'America/New_York',
    map: {
      enabled: true,
      latitude: 40.7829,
      longitude: -73.9654,
      zoom: 15,
      showDirectionsLink: true
    },
    services: ['Sales', 'Customer Service'],
    appointmentBookingUrl: 'https://company.com/book-westside'
  },
  {
    id: 'brooklyn',
    name: 'Brooklyn Location',
    businessHours: [
      { day: 'monday', openTime: '10:00', closeTime: '19:00', closed: false },
      { day: 'tuesday', openTime: '10:00', closeTime: '19:00', closed: false },
      { day: 'wednesday', openTime: '10:00', closeTime: '19:00', closed: false },
      { day: 'thursday', openTime: '10:00', closeTime: '19:00', closed: false },
      { day: 'friday', openTime: '10:00', closeTime: '19:00', closed: false },
      { day: 'saturday', openTime: '11:00', closeTime: '18:00', closed: false },
      { day: 'sunday', openTime: '00:00', closeTime: '00:00', closed: true }
    ],
    contact: {
      phone: '+1 (555) 456-7890',
      address: {
        street: '789 Brooklyn Street',
        city: 'Brooklyn',
        state: 'NY',
        zipCode: '11201',
        country: 'USA'
      }
    },
    timezone: 'America/New_York',
    services: ['Retail', 'Repairs']
  },
  {
    id: 'chicago',
    name: 'Chicago Office',
    businessHours: [
      { day: 'monday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'tuesday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'wednesday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'thursday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'friday', openTime: '09:00', closeTime: '17:00', closed: false },
      { day: 'saturday', openTime: '00:00', closeTime: '00:00', closed: true },
      { day: 'sunday', openTime: '00:00', closeTime: '00:00', closed: true }
    ],
    contact: {
      phone: '+1 (312) 555-0123',
      email: 'chicago@company.com',
      address: {
        street: '321 Michigan Avenue',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      }
    },
    timezone: 'America/Chicago',
    services: ['Corporate Services', 'Legal']
  }
]

const meta: Meta<typeof LocationHours> = {
  title: 'Blocks/LocationHours',
  component: LocationHours,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible location hours component for displaying business operating information with multiple variants and features.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['single-location', 'multiple-locations', 'minimal-hours', 'detailed-info-cards', 'map-integration'],
      description: 'Layout variant for displaying locations'
    },
    showCurrentStatus: {
      control: 'boolean',
      description: 'Show current open/closed status'
    },
    showSpecialSchedules: {
      control: 'boolean',
      description: 'Show special schedules and holiday hours'
    },
    showContactInfo: {
      control: 'boolean',
      description: 'Show contact information'
    },
    showServices: {
      control: 'boolean',
      description: 'Show available services'
    },
    showAppointmentBooking: {
      control: 'boolean',
      description: 'Show appointment booking links'
    },
    allowLocationSearch: {
      control: 'boolean',
      description: 'Allow searching locations'
    },
    allowLocationFilter: {
      control: 'boolean',
      description: 'Allow filtering locations'
    },
    showMap: {
      control: 'boolean',
      description: 'Show embedded maps'
    },
    compactView: {
      control: 'boolean',
      description: 'Use compact layout'
    },
    darkMode: {
      control: 'boolean',
      description: 'Use dark theme'
    }
  },
  tags: ['autodocs', 'test']
}

export default meta
type Story = StoryObj<typeof LocationHours>

// Default single location view
export const SingleLocation: Story = {
  args: {
    variant: 'single-location',
    locations: [sampleLocations[0]],
    showCurrentStatus: true,
    showSpecialSchedules: true,
    showContactInfo: true,
    showServices: true,
    showAppointmentBooking: true
  }
}

// Multiple locations grid
export const MultipleLocations: Story = {
  args: {
    variant: 'multiple-locations',
    locations: sampleLocations,
    showCurrentStatus: true,
    showContactInfo: true,
    showServices: true
  }
}

// Minimal hours display
export const MinimalHours: Story = {
  args: {
    variant: 'minimal-hours',
    locations: sampleLocations.slice(0, 2),
    showCurrentStatus: true,
    showContactInfo: false,
    showServices: false,
    compactView: true
  }
}

// Detailed info cards
export const DetailedInfoCards: Story = {
  args: {
    variant: 'detailed-info-cards',
    locations: sampleLocations,
    showCurrentStatus: true,
    showSpecialSchedules: true,
    showContactInfo: true,
    showServices: true,
    showAppointmentBooking: true
  }
}

// Map integration
export const MapIntegration: Story = {
  args: {
    variant: 'map-integration',
    locations: sampleLocations.slice(0, 2),
    showCurrentStatus: true,
    showContactInfo: true,
    showMap: true
  }
}

// With search and filter
export const WithSearchAndFilter: Story = {
  args: {
    variant: 'multiple-locations',
    locations: sampleLocations,
    showCurrentStatus: true,
    showContactInfo: true,
    showServices: true,
    allowLocationSearch: true,
    allowLocationFilter: true
  }
}

// Compact view
export const CompactView: Story = {
  args: {
    variant: 'multiple-locations',
    locations: sampleLocations,
    showCurrentStatus: true,
    showContactInfo: true,
    compactView: true
  }
}

// Dark mode
export const DarkMode: Story = {
  args: {
    variant: 'detailed-info-cards',
    locations: sampleLocations.slice(0, 2),
    showCurrentStatus: true,
    showSpecialSchedules: true,
    showContactInfo: true,
    showServices: true,
    darkMode: true
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

// Restaurant hours example
export const RestaurantHours: Story = {
  args: {
    variant: 'single-location',
    locations: [{
      id: 'restaurant',
      name: 'Bella Vista Restaurant',
      description: 'Fine dining with a view',
      businessHours: [
        { day: 'monday', openTime: '00:00', closeTime: '00:00', closed: true },
        { day: 'tuesday', openTime: '17:00', closeTime: '22:00', closed: false },
        { day: 'wednesday', openTime: '17:00', closeTime: '22:00', closed: false },
        { day: 'thursday', openTime: '17:00', closeTime: '22:00', closed: false },
        { day: 'friday', openTime: '17:00', closeTime: '23:00', closed: false },
        { day: 'saturday', openTime: '16:00', closeTime: '23:00', closed: false },
        { day: 'sunday', openTime: '16:00', closeTime: '21:00', closed: false }
      ],
      specialSchedules: [{
        date: '2024-02-14',
        name: 'Valentine\'s Day',
        hours: { openTime: '16:00', closeTime: '00:00' },
        closed: false,
        message: 'Special Valentine\'s Day menu available! Reservations recommended.'
      }],
      contact: {
        phone: '+1 (555) DINE-OUT',
        email: 'reservations@bellavista.com',
        website: 'https://bellavista.com',
        address: {
          street: '100 Sunset Boulevard',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90028',
          country: 'USA'
        }
      },
      timezone: 'America/Los_Angeles',
      services: ['Fine Dining', 'Private Events', 'Catering'],
      appointmentBookingUrl: 'https://bellavista.com/reservations'
    }],
    showCurrentStatus: true,
    showSpecialSchedules: true,
    showContactInfo: true,
    showServices: true,
    showAppointmentBooking: true
  }
}

// Medical office hours
export const MedicalOffice: Story = {
  args: {
    variant: 'detailed-info-cards',
    locations: [{
      id: 'medical',
      name: 'City Medical Center',
      description: 'Comprehensive healthcare services',
      businessHours: [
        { day: 'monday', openTime: '08:00', closeTime: '18:00', closed: false },
        { day: 'tuesday', openTime: '08:00', closeTime: '18:00', closed: false },
        { day: 'wednesday', openTime: '08:00', closeTime: '20:00', closed: false },
        { day: 'thursday', openTime: '08:00', closeTime: '18:00', closed: false },
        { day: 'friday', openTime: '08:00', closeTime: '17:00', closed: false },
        { day: 'saturday', openTime: '09:00', closeTime: '13:00', closed: false },
        { day: 'sunday', openTime: '00:00', closeTime: '00:00', closed: true }
      ],
      contact: {
        phone: '+1 (555) MEDICAL',
        email: 'appointments@citymedical.com',
        address: {
          street: '500 Health Drive',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        }
      },
      timezone: 'America/Los_Angeles',
      services: ['General Practice', 'Pediatrics', 'Cardiology', 'Urgent Care'],
      appointmentBookingUrl: 'https://citymedical.com/book-appointment'
    }],
    showCurrentStatus: true,
    showContactInfo: true,
    showServices: true,
    showAppointmentBooking: true
  }
}

// Retail store with different timezones
export const RetailChain: Story = {
  args: {
    variant: 'multiple-locations',
    locations: [
      {
        id: 'ny-store',
        name: 'New York Flagship',
        businessHours: [
          { day: 'monday', openTime: '10:00', closeTime: '21:00', closed: false },
          { day: 'tuesday', openTime: '10:00', closeTime: '21:00', closed: false },
          { day: 'wednesday', openTime: '10:00', closeTime: '21:00', closed: false },
          { day: 'thursday', openTime: '10:00', closeTime: '21:00', closed: false },
          { day: 'friday', openTime: '10:00', closeTime: '22:00', closed: false },
          { day: 'saturday', openTime: '09:00', closeTime: '22:00', closed: false },
          { day: 'sunday', openTime: '11:00', closeTime: '20:00', closed: false }
        ],
        contact: {
          phone: '+1 (212) 555-SHOP',
          address: {
            street: '100 Fifth Avenue',
            city: 'New York',
            state: 'NY',
            zipCode: '10011',
            country: 'USA'
          }
        },
        timezone: 'America/New_York',
        services: ['Fashion', 'Accessories', 'Personal Shopping']
      },
      {
        id: 'la-store',
        name: 'Los Angeles Store',
        businessHours: [
          { day: 'monday', openTime: '10:00', closeTime: '20:00', closed: false },
          { day: 'tuesday', openTime: '10:00', closeTime: '20:00', closed: false },
          { day: 'wednesday', openTime: '10:00', closeTime: '20:00', closed: false },
          { day: 'thursday', openTime: '10:00', closeTime: '20:00', closed: false },
          { day: 'friday', openTime: '10:00', closeTime: '21:00', closed: false },
          { day: 'saturday', openTime: '09:00', closeTime: '21:00', closed: false },
          { day: 'sunday', openTime: '11:00', closeTime: '19:00', closed: false }
        ],
        contact: {
          phone: '+1 (323) 555-SHOP',
          address: {
            street: '200 Rodeo Drive',
            city: 'Beverly Hills',
            state: 'CA',
            zipCode: '90210',
            country: 'USA'
          }
        },
        timezone: 'America/Los_Angeles',
        services: ['Fashion', 'Accessories', 'VIP Services']
      }
    ],
    showCurrentStatus: true,
    showContactInfo: true,
    showServices: true,
    allowLocationFilter: true
  }
}