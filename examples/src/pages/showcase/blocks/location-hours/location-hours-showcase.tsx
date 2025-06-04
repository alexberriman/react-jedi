import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { Heading, Text, spacing } from "../../../../components/ui";
import { PageHeader } from "../../../../components/ui/page-header";
import { CodeBlock } from "../../../../components/ui/code-block";

export function LocationHoursShowcasePage() {
  usePageMetadata({
    title: "Location Hours Block",
    description: "Display business hours, contact information, and location details with timezone support and multiple variants.",
  });

  const sampleLocations = [
    {
      id: "downtown",
      name: "Downtown Office",
      description: "Our main office in the heart of the city",
      businessHours: [
        { day: "monday", openTime: "09:00", closeTime: "17:00", closed: false },
        { day: "tuesday", openTime: "09:00", closeTime: "17:00", closed: false },
        { day: "wednesday", openTime: "09:00", closeTime: "17:00", closed: false },
        { day: "thursday", openTime: "09:00", closeTime: "17:00", closed: false },
        { day: "friday", openTime: "09:00", closeTime: "17:00", closed: false },
        { day: "saturday", openTime: "10:00", closeTime: "14:00", closed: false },
        { day: "sunday", openTime: "00:00", closeTime: "00:00", closed: true }
      ],
      specialSchedules: [
        {
          date: "2024-12-25",
          name: "Christmas Day",
          closed: true,
          message: "Closed for Christmas. Happy Holidays!"
        },
        {
          date: "2024-11-29",
          name: "Black Friday",
          hours: { openTime: "08:00", closeTime: "20:00" },
          closed: false,
          message: "Extended hours for Black Friday shopping!"
        }
      ],
      contact: {
        phone: "+1 (555) 123-4567",
        email: "downtown@company.com",
        website: "https://company.com",
        address: {
          street: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA"
        }
      },
      timezone: "America/New_York",
      map: {
        enabled: true,
        latitude: 40.7128,
        longitude: -74.006,
        zoom: 15,
        showDirectionsLink: true
      },
      services: ["Consulting", "Support", "Training"],
      appointmentBookingUrl: "https://company.com/book-appointment"
    },
    {
      id: "westside",
      name: "Westside Branch",
      description: "Convenient location on the west side",
      businessHours: [
        { day: "monday", openTime: "08:00", closeTime: "18:00", closed: false },
        { day: "tuesday", openTime: "08:00", closeTime: "18:00", closed: false },
        { day: "wednesday", openTime: "08:00", closeTime: "18:00", closed: false },
        { day: "thursday", openTime: "08:00", closeTime: "18:00", closed: false },
        { day: "friday", openTime: "08:00", closeTime: "18:00", closed: false },
        { day: "saturday", openTime: "09:00", closeTime: "16:00", closed: false },
        { day: "sunday", openTime: "12:00", closeTime: "17:00", closed: false }
      ],
      contact: {
        phone: "+1 (555) 987-6543",
        email: "westside@company.com",
        address: {
          street: "456 West Avenue",
          city: "New York",
          state: "NY",
          zipCode: "10025",
          country: "USA"
        }
      },
      timezone: "America/New_York",
      services: ["Sales", "Customer Service"]
    },
    {
      id: "brooklyn",
      name: "Brooklyn Location",
      businessHours: [
        { day: "monday", openTime: "10:00", closeTime: "19:00", closed: false },
        { day: "tuesday", openTime: "10:00", closeTime: "19:00", closed: false },
        { day: "wednesday", openTime: "10:00", closeTime: "19:00", closed: false },
        { day: "thursday", openTime: "10:00", closeTime: "19:00", closed: false },
        { day: "friday", openTime: "10:00", closeTime: "19:00", closed: false },
        { day: "saturday", openTime: "11:00", closeTime: "18:00", closed: false },
        { day: "sunday", openTime: "00:00", closeTime: "00:00", closed: true }
      ],
      contact: {
        phone: "+1 (555) 456-7890",
        address: {
          street: "789 Brooklyn Street",
          city: "Brooklyn",
          state: "NY",
          zipCode: "11201",
          country: "USA"
        }
      },
      timezone: "America/New_York",
      services: ["Retail", "Repairs"]
    }
  ];

  const singleLocationSpec: ComponentSpec = {
    type: "LocationHours",
    props: {
      variant: "single-location",
      locations: [sampleLocations[0]],
      showCurrentStatus: true,
      showSpecialSchedules: true,
      showContactInfo: true,
      showServices: true,
      showAppointmentBooking: true,
    },
  };

  const multipleLocationsSpec: ComponentSpec = {
    type: "LocationHours",
    props: {
      variant: "multiple-locations",
      locations: sampleLocations,
      showCurrentStatus: true,
      showContactInfo: true,
      showServices: true,
      allowLocationSearch: true,
      allowLocationFilter: true,
    },
  };

  const minimalHoursSpec: ComponentSpec = {
    type: "LocationHours",
    props: {
      variant: "minimal-hours",
      locations: sampleLocations.slice(0, 2),
      showCurrentStatus: true,
      showContactInfo: false,
      showServices: false,
      compactView: true,
    },
  };

  const detailedInfoCardsSpec: ComponentSpec = {
    type: "LocationHours",
    props: {
      variant: "detailed-info-cards",
      locations: sampleLocations,
      showCurrentStatus: true,
      showSpecialSchedules: true,
      showContactInfo: true,
      showServices: true,
      showAppointmentBooking: true,
    },
  };

  const mapIntegrationSpec: ComponentSpec = {
    type: "LocationHours",
    props: {
      variant: "map-integration",
      locations: sampleLocations.slice(0, 2),
      showCurrentStatus: true,
      showContactInfo: true,
      showMap: true,
    },
  };

  const darkModeSpec: ComponentSpec = {
    type: "LocationHours",
    props: {
      variant: "detailed-info-cards",
      locations: sampleLocations.slice(0, 2),
      showCurrentStatus: true,
      showSpecialSchedules: true,
      showContactInfo: true,
      showServices: true,
      darkMode: true,
    },
  };

  const restaurantHoursSpec: ComponentSpec = {
    type: "LocationHours",
    props: {
      variant: "single-location",
      locations: [{
        id: "restaurant",
        name: "Bella Vista Restaurant",
        description: "Fine dining with a view",
        businessHours: [
          { day: "monday", openTime: "00:00", closeTime: "00:00", closed: true },
          { day: "tuesday", openTime: "17:00", closeTime: "22:00", closed: false },
          { day: "wednesday", openTime: "17:00", closeTime: "22:00", closed: false },
          { day: "thursday", openTime: "17:00", closeTime: "22:00", closed: false },
          { day: "friday", openTime: "17:00", closeTime: "23:00", closed: false },
          { day: "saturday", openTime: "16:00", closeTime: "23:00", closed: false },
          { day: "sunday", openTime: "16:00", closeTime: "21:00", closed: false }
        ],
        specialSchedules: [{
          date: "2024-02-14",
          name: "Valentine's Day",
          hours: { openTime: "16:00", closeTime: "00:00" },
          closed: false,
          message: "Special Valentine's Day menu available! Reservations recommended."
        }],
        contact: {
          phone: "+1 (555) DINE-OUT",
          email: "reservations@bellavista.com",
          website: "https://bellavista.com",
          address: {
            street: "100 Sunset Boulevard",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90028",
            country: "USA"
          }
        },
        timezone: "America/Los_Angeles",
        services: ["Fine Dining", "Private Events", "Catering"],
        appointmentBookingUrl: "https://bellavista.com/reservations"
      }],
      showCurrentStatus: true,
      showSpecialSchedules: true,
      showContactInfo: true,
      showServices: true,
      showAppointmentBooking: true,
    },
  };

  return (
    <div className="flex flex-col">
      <PageHeader 
        title="Location Hours Block"
        description="Display business operating information with multiple variants, timezone support, status indicators, and modern responsive design."
      />

      <div className="container mx-auto px-4 py-8">
        <div className={`${spacing.default}`}>
          {/* Single Location */}
          <section className="mb-16">
            <Heading as="h2" size="section" className={spacing.xs}>
              Single Location
            </Heading>
            <Text variant="muted" className={spacing.small}>
              Display a single location with full details including hours, contact info, and services.
            </Text>
            
            <div className="mb-8">
              {render(singleLocationSpec)}
            </div>

            <CodeBlock language="json">
              {JSON.stringify(singleLocationSpec, null, 2)}
            </CodeBlock>
          </section>

          {/* Multiple Locations */}
          <section className="mb-16">
            <Heading as="h2" size="section" className={spacing.xs}>
              Multiple Locations
            </Heading>
            <Text variant="muted" className={spacing.small}>
              Display multiple locations in a grid layout with search and filter capabilities.
            </Text>
            
            <div className="mb-8">
              {render(multipleLocationsSpec)}
            </div>

            <CodeBlock language="json">
              {JSON.stringify(multipleLocationsSpec, null, 2)}
            </CodeBlock>
          </section>

          {/* Minimal Hours */}
          <section className="mb-16">
            <Heading as="h2" size="section" className={spacing.xs}>
              Minimal Hours
            </Heading>
            <Text variant="muted" className={spacing.small}>
              Compact display showing just essential hours information in grouped format.
            </Text>
            
            <div className="mb-8">
              {render(minimalHoursSpec)}
            </div>

            <CodeBlock language="json">
              {JSON.stringify(minimalHoursSpec, null, 2)}
            </CodeBlock>
          </section>

          {/* Detailed Info Cards */}
          <section className="mb-16">
            <Heading as="h2" size="section" className={spacing.xs}>
              Detailed Info Cards
            </Heading>
            <Text variant="muted" className={spacing.small}>
              Rich cards with complete business information, services, and action buttons.
            </Text>
            
            <div className="mb-8">
              {render(detailedInfoCardsSpec)}
            </div>

            <CodeBlock language="json">
              {JSON.stringify(detailedInfoCardsSpec, null, 2)}
            </CodeBlock>
          </section>

          {/* Map Integration */}
          <section className="mb-16">
            <Heading as="h2" size="section" className={spacing.xs}>
              Map Integration
            </Heading>
            <Text variant="muted" className={spacing.small}>
              Location cards with embedded maps and directions links.
            </Text>
            
            <div className="mb-8">
              {render(mapIntegrationSpec)}
            </div>

            <CodeBlock language="json">
              {JSON.stringify(mapIntegrationSpec, null, 2)}
            </CodeBlock>
          </section>

          {/* Dark Mode */}
          <section className="mb-16">
            <Heading as="h2" size="section" className={spacing.xs}>
              Dark Mode
            </Heading>
            <Text variant="muted" className={spacing.small}>
              Dark theme variant for better visibility in dark environments.
            </Text>
            
            <div className="mb-8 bg-gray-900 p-6 rounded-lg">
              {render(darkModeSpec)}
            </div>

            <CodeBlock language="json">
              {JSON.stringify(darkModeSpec, null, 2)}
            </CodeBlock>
          </section>

          {/* Restaurant Example */}
          <section className="mb-16">
            <Heading as="h2" size="section" className={spacing.xs}>
              Restaurant Hours Example
            </Heading>
            <Text variant="muted" className={spacing.small}>
              Restaurant-specific example with dinner hours and special event scheduling.
            </Text>
            
            <div className="mb-8">
              {render(restaurantHoursSpec)}
            </div>

            <CodeBlock language="json">
              {JSON.stringify(restaurantHoursSpec, null, 2)}
            </CodeBlock>
          </section>

          {/* Features Overview */}
          <section className="mb-16">
            <Heading as="h2" size="section" className={spacing.xs}>
              Key Features
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Heading as="h3" size="card" className="mb-2">
                  🕐 Real-time Status
                </Heading>
                <Text size="small" variant="muted">
                  Automatic open/closed status based on current time and timezone
                </Text>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Heading as="h3" size="card" className="mb-2">
                  🌍 Timezone Support
                </Heading>
                <Text size="small" variant="muted">
                  Full timezone support for locations around the world
                </Text>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Heading as="h3" size="card" className="mb-2">
                  📅 Special Schedules
                </Heading>
                <Text size="small" variant="muted">
                  Holiday hours, special events, and custom messages
                </Text>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Heading as="h3" size="card" className="mb-2">
                  🔍 Search & Filter
                </Heading>
                <Text size="small" variant="muted">
                  Location search and filtering by city, state, or services
                </Text>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Heading as="h3" size="card" className="mb-2">
                  🗺️ Map Integration
                </Heading>
                <Text size="small" variant="muted">
                  Embedded maps with directions and interactive features
                </Text>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Heading as="h3" size="card" className="mb-2">
                  📱 Mobile Responsive
                </Heading>
                <Text size="small" variant="muted">
                  Optimized layouts for all screen sizes and devices
                </Text>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}