import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, waitFor } from "storybook/test";
import { LocationHours } from "./location-hours";
import type { Location } from "./types";
import { enhanceStoryForDualMode } from "../../../../.storybook/utils/enhance-story";

// Sample location data
const sampleLocations: Location[] = [
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
      { day: "sunday", openTime: "00:00", closeTime: "00:00", closed: true },
    ],
    specialSchedules: [
      {
        date: "2024-12-25",
        name: "Christmas Day",
        closed: true,
        message: "Closed for Christmas. Happy Holidays!",
      },
      {
        date: "2024-11-29",
        name: "Black Friday",
        hours: { openTime: "08:00", closeTime: "20:00" },
        closed: false,
        message: "Extended hours for Black Friday!",
      },
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
        country: "USA",
      },
    },
    timezone: "America/New_York",
    map: {
      enabled: true,
      latitude: 40.7128,
      longitude: -74.006,
      zoom: 15,
      showDirectionsLink: true,
    },
    services: ["Consulting", "Support", "Training"],
    appointmentBookingUrl: "https://company.com/book-appointment",
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
      { day: "sunday", openTime: "12:00", closeTime: "17:00", closed: false },
    ],
    contact: {
      phone: "+1 (555) 987-6543",
      email: "westside@company.com",
      address: {
        street: "456 West Avenue",
        city: "New York",
        state: "NY",
        zipCode: "10025",
        country: "USA",
      },
    },
    timezone: "America/New_York",
    map: {
      enabled: true,
      latitude: 40.7829,
      longitude: -73.9654,
      zoom: 15,
      showDirectionsLink: true,
    },
    services: ["Sales", "Customer Service"],
    appointmentBookingUrl: "https://company.com/book-westside",
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
      { day: "sunday", openTime: "00:00", closeTime: "00:00", closed: true },
    ],
    contact: {
      phone: "+1 (555) 456-7890",
      address: {
        street: "789 Brooklyn Street",
        city: "Brooklyn",
        state: "NY",
        zipCode: "11201",
        country: "USA",
      },
    },
    timezone: "America/New_York",
    services: ["Retail", "Repairs"],
  },
  {
    id: "chicago",
    name: "Chicago Office",
    businessHours: [
      { day: "monday", openTime: "09:00", closeTime: "17:00", closed: false },
      { day: "tuesday", openTime: "09:00", closeTime: "17:00", closed: false },
      { day: "wednesday", openTime: "09:00", closeTime: "17:00", closed: false },
      { day: "thursday", openTime: "09:00", closeTime: "17:00", closed: false },
      { day: "friday", openTime: "09:00", closeTime: "17:00", closed: false },
      { day: "saturday", openTime: "00:00", closeTime: "00:00", closed: true },
      { day: "sunday", openTime: "00:00", closeTime: "00:00", closed: true },
    ],
    contact: {
      phone: "+1 (312) 555-0123",
      email: "chicago@company.com",
      address: {
        street: "321 Michigan Avenue",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "USA",
      },
    },
    timezone: "America/Chicago",
    services: ["Corporate Services", "Legal"],
  },
];

const meta: Meta<typeof LocationHours> = {
  title: "Blocks/LocationHours",
  component: LocationHours,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible location hours component for displaying business operating information with multiple variants and features.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "single-location",
        "multiple-locations",
        "minimal-hours",
        "detailed-info-cards",
        "map-integration",
      ],
      description: "Layout variant for displaying locations",
    },
    showCurrentStatus: {
      control: "boolean",
      description: "Show current open/closed status",
    },
    showSpecialSchedules: {
      control: "boolean",
      description: "Show special schedules and holiday hours",
    },
    showContactInfo: {
      control: "boolean",
      description: "Show contact information",
    },
    showServices: {
      control: "boolean",
      description: "Show available services",
    },
    showAppointmentBooking: {
      control: "boolean",
      description: "Show appointment booking links",
    },
    allowLocationSearch: {
      control: "boolean",
      description: "Allow searching locations",
    },
    allowLocationFilter: {
      control: "boolean",
      description: "Allow filtering locations",
    },
    showMap: {
      control: "boolean",
      description: "Show embedded maps",
    },
    compactView: {
      control: "boolean",
      description: "Use compact layout",
    },
    darkMode: {
      control: "boolean",
      description: "Use dark theme",
    },
  },
  tags: ["autodocs", "test"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default single location view
export const SingleLocation: Story = enhanceStoryForDualMode<typeof LocationHours>({
  args: {
    variant: "single-location",
    locations: [sampleLocations[0]],
    showCurrentStatus: true,
    showSpecialSchedules: true,
    showContactInfo: true,
    showServices: true,
    showAppointmentBooking: true,
    showMap: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify location name renders
    expect(canvas.getByText("Downtown Office")).toBeInTheDocument();
    
    // Verify location description renders
    expect(canvas.getByText("Our main office in the heart of the city")).toBeInTheDocument();
    
    // Verify current status badge is present
    const statusBadge = canvasElement.querySelector('[data-slot="badge"]');
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveTextContent(/Open Now|Closed/);
    
    // Wait for business hours section to appear (animated content)
    await waitFor(() => {
      expect(canvas.getByText("Business Hours")).toBeInTheDocument();
    });
    
    // Verify specific business hours are rendered (check for day and hours)
    expect(canvas.getByText(/monday/i)).toBeInTheDocument();
    const businessHours = canvas.getAllByText("9:00 AM - 5:00 PM");
    expect(businessHours.length).toBeGreaterThan(0);
    
    // Verify contact information section
    expect(canvas.getByText("Contact Information")).toBeInTheDocument();
    
    // Verify address is rendered
    expect(canvas.getByText(/123 Main Street/)).toBeInTheDocument();
    expect(canvas.getByText(/New York, NY 10001/)).toBeInTheDocument();
    
    // Verify phone number is rendered
    expect(canvas.getByText("+1 (555) 123-4567")).toBeInTheDocument();
    
    // Verify email is rendered
    expect(canvas.getByText("downtown@company.com")).toBeInTheDocument();
    
    // Verify services section is present
    expect(canvas.getByText("Services Available")).toBeInTheDocument();
    expect(canvas.getByText("Consulting")).toBeInTheDocument();
    expect(canvas.getByText("Support")).toBeInTheDocument();
    expect(canvas.getByText("Training")).toBeInTheDocument();
    
    // Verify action buttons are present
    expect(canvas.getByText("Get Directions")).toBeInTheDocument();
    expect(canvas.getByText("Book Appointment")).toBeInTheDocument();
  },
});

// Multiple locations grid
export const MultipleLocations: Story = enhanceStoryForDualMode<typeof LocationHours>({
  args: {
    variant: "multiple-locations",
    locations: sampleLocations,
    showCurrentStatus: true,
    showContactInfo: true,
    showServices: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify multiple location names render
    expect(canvas.getByText("Downtown Office")).toBeInTheDocument();
    expect(canvas.getByText("Westside Branch")).toBeInTheDocument();
    expect(canvas.getByText("Brooklyn Location")).toBeInTheDocument();
    expect(canvas.getByText("Chicago Office")).toBeInTheDocument();
    
    // Verify section header
    expect(canvas.getByText("Our Locations")).toBeInTheDocument();
    expect(canvas.getByText("Find a location near you and visit us today")).toBeInTheDocument();
    
    // Verify status badges for multiple locations
    const statusBadges = canvas.getAllByText(/Open Now|Closed/);
    expect(statusBadges.length).toBeGreaterThan(0);
    
    // Contact information and services are not visible in collapsed multi-location view
    // They would only be visible after clicking "View Details" buttons
    
    // Verify "View Details" buttons are present for multi-location view
    const viewDetailsButtons = canvas.getAllByText("View Details");
    expect(viewDetailsButtons.length).toBe(4); // One for each location
  },
});

// Minimal hours display
export const MinimalHours: Story = {
  args: {
    variant: "minimal-hours",
    locations: sampleLocations.slice(0, 2),
    showCurrentStatus: true,
    showContactInfo: false,
    showServices: false,
    compactView: true,
  },
};

// Detailed info cards
export const DetailedInfoCards: Story = {
  args: {
    variant: "detailed-info-cards",
    locations: sampleLocations,
    showCurrentStatus: true,
    showSpecialSchedules: true,
    showContactInfo: true,
    showServices: true,
    showAppointmentBooking: true,
  },
};

// Map integration
export const MapIntegration: Story = {
  args: {
    variant: "map-integration",
    locations: sampleLocations.slice(0, 2),
    showCurrentStatus: true,
    showContactInfo: true,
    showMap: true,
  },
};

// With search and filter
export const WithSearchAndFilter: Story = enhanceStoryForDualMode<typeof LocationHours>({
  args: {
    variant: "multiple-locations",
    locations: sampleLocations,
    showCurrentStatus: true,
    showContactInfo: true,
    showServices: true,
    allowLocationSearch: true,
    allowLocationFilter: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify search functionality is present
    expect(canvas.getByPlaceholderText("Search locations...")).toBeInTheDocument();
    
    // Verify filter dropdown is present
    const filterDropdown = canvas.getByDisplayValue("All Locations");
    expect(filterDropdown).toBeInTheDocument();
    
    // Verify location names render
    expect(canvas.getByText("Downtown Office")).toBeInTheDocument();
    expect(canvas.getByText("Westside Branch")).toBeInTheDocument();
    expect(canvas.getByText("Brooklyn Location")).toBeInTheDocument();
    expect(canvas.getByText("Chicago Office")).toBeInTheDocument();
    
    // Contact information and services are not visible in collapsed view
    // They would only be visible after expanding individual cards
    
    // Verify current status displays
    const statusBadges = canvas.getAllByText(/Open Now|Closed/);
    expect(statusBadges.length).toBeGreaterThan(0);
  },
});

// Compact view
export const CompactView: Story = {
  args: {
    variant: "multiple-locations",
    locations: sampleLocations,
    showCurrentStatus: true,
    showContactInfo: true,
    compactView: true,
  },
};

// Dark mode
export const DarkMode: Story = {
  args: {
    variant: "detailed-info-cards",
    locations: sampleLocations.slice(0, 2),
    showCurrentStatus: true,
    showSpecialSchedules: true,
    showContactInfo: true,
    showServices: true,
    darkMode: true,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// Restaurant hours example
export const RestaurantHours: Story = enhanceStoryForDualMode<typeof LocationHours>({
  args: {
    variant: "single-location",
    locations: [
      {
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
          { day: "sunday", openTime: "16:00", closeTime: "21:00", closed: false },
        ],
        specialSchedules: [
          {
            date: "2024-02-14",
            name: "Valentine's Day",
            hours: { openTime: "16:00", closeTime: "00:00" },
            closed: false,
            message: "Special Valentine's Day menu available! Reservations recommended.",
          },
        ],
        contact: {
          phone: "+1 (555) DINE-OUT",
          email: "reservations@bellavista.com",
          website: "https://bellavista.com",
          address: {
            street: "100 Sunset Boulevard",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90028",
            country: "USA",
          },
        },
        timezone: "America/Los_Angeles",
        services: ["Fine Dining", "Private Events", "Catering"],
        appointmentBookingUrl: "https://bellavista.com/reservations",
      },
    ],
    showCurrentStatus: true,
    showSpecialSchedules: true,
    showContactInfo: true,
    showServices: true,
    showAppointmentBooking: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify restaurant name and description
    expect(canvas.getByText("Bella Vista Restaurant")).toBeInTheDocument();
    expect(canvas.getByText("Fine dining with a view")).toBeInTheDocument();
    
    // Wait for business hours section to appear (animated content)
    await waitFor(() => {
      expect(canvas.getByText("Business Hours")).toBeInTheDocument();
    });
    
    // Verify specific restaurant hours (closed Monday, open Tuesday-Sunday)
    expect(canvas.getByText(/monday/i)).toBeInTheDocument();
    // Check that there are "Closed" texts (status badge and/or Monday hours)
    const closedTexts = canvas.getAllByText("Closed");
    expect(closedTexts.length).toBeGreaterThan(0); // At least one "Closed" text should exist
    expect(canvas.getByText(/tuesday/i)).toBeInTheDocument();
    const tuesdayHours = canvas.getAllByText("5:00 PM - 10:00 PM");
    expect(tuesdayHours.length).toBeGreaterThan(0);
    
    // Verify contact information
    expect(canvas.getByText("Contact Information")).toBeInTheDocument();
    expect(canvas.getByText("+1 (555) DINE-OUT")).toBeInTheDocument();
    expect(canvas.getByText("reservations@bellavista.com")).toBeInTheDocument();
    expect(canvas.getByText(/100 Sunset Boulevard/)).toBeInTheDocument();
    expect(canvas.getByText(/Los Angeles, CA 90028/)).toBeInTheDocument();
    
    // Verify services
    expect(canvas.getByText("Services Available")).toBeInTheDocument();
    expect(canvas.getByText("Fine Dining")).toBeInTheDocument();
    expect(canvas.getByText("Private Events")).toBeInTheDocument();
    expect(canvas.getByText("Catering")).toBeInTheDocument();
    
    // Verify booking button
    expect(canvas.getByText("Book Appointment")).toBeInTheDocument();
    
    // Verify current status badge
    const statusBadge = canvasElement.querySelector('[data-slot="badge"]');
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveTextContent(/Open Now|Closed/);
  },
});

// Medical office hours
export const MedicalOffice: Story = enhanceStoryForDualMode<typeof LocationHours>({
  args: {
    variant: "single-location",
    locations: [
      {
        id: "medical",
        name: "City Medical Center",
        description: "Comprehensive healthcare services",
        businessHours: [
          { day: "monday", openTime: "08:00", closeTime: "18:00", closed: false },
          { day: "tuesday", openTime: "08:00", closeTime: "18:00", closed: false },
          { day: "wednesday", openTime: "08:00", closeTime: "20:00", closed: false },
          { day: "thursday", openTime: "08:00", closeTime: "18:00", closed: false },
          { day: "friday", openTime: "08:00", closeTime: "17:00", closed: false },
          { day: "saturday", openTime: "09:00", closeTime: "13:00", closed: false },
          { day: "sunday", openTime: "00:00", closeTime: "00:00", closed: true },
        ],
        contact: {
          phone: "+1 (555) MEDICAL",
          email: "appointments@citymedical.com",
          address: {
            street: "500 Health Drive",
            city: "Seattle",
            state: "WA",
            zipCode: "98101",
            country: "USA",
          },
        },
        timezone: "America/Los_Angeles",
        services: ["General Practice", "Pediatrics", "Cardiology", "Urgent Care"],
        appointmentBookingUrl: "https://citymedical.com/book-appointment",
      },
    ],
    showCurrentStatus: true,
    showContactInfo: true,
    showServices: true,
    showAppointmentBooking: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify medical center name and description
    expect(canvas.getByText("City Medical Center")).toBeInTheDocument();
    expect(canvas.getByText("Comprehensive healthcare services")).toBeInTheDocument();
    
    // Wait for business hours section to appear (animated content)
    await waitFor(() => {
      expect(canvas.getByText("Business Hours")).toBeInTheDocument();
    });
    
    // Verify specific medical office hours
    expect(canvas.getByText(/monday/i)).toBeInTheDocument();
    const mondayHours = canvas.getAllByText("8:00 AM - 6:00 PM");
    expect(mondayHours.length).toBeGreaterThan(0);
    expect(canvas.getByText(/wednesday/i)).toBeInTheDocument();
    expect(canvas.getByText("8:00 AM - 8:00 PM")).toBeInTheDocument(); // Extended hours
    expect(canvas.getByText(/saturday/i)).toBeInTheDocument();
    expect(canvas.getByText("9:00 AM - 1:00 PM")).toBeInTheDocument(); // Limited Saturday hours
    expect(canvas.getByText(/sunday/i)).toBeInTheDocument();
    // Check that there are "Closed" texts (may vary based on current time)
    const closedTexts = canvas.getAllByText("Closed");
    expect(closedTexts.length).toBeGreaterThan(0); // At least one "Closed" text should exist
    
    // Verify contact information
    expect(canvas.getByText("Contact Information")).toBeInTheDocument();
    expect(canvas.getByText("+1 (555) MEDICAL")).toBeInTheDocument();
    expect(canvas.getByText("appointments@citymedical.com")).toBeInTheDocument();
    expect(canvas.getByText(/500 Health Drive/)).toBeInTheDocument();
    expect(canvas.getByText(/Seattle, WA 98101/)).toBeInTheDocument();
    
    // Verify medical services
    expect(canvas.getByText("Services Available")).toBeInTheDocument();
    expect(canvas.getByText("General Practice")).toBeInTheDocument();
    expect(canvas.getByText("Pediatrics")).toBeInTheDocument();
    expect(canvas.getByText("Cardiology")).toBeInTheDocument();
    expect(canvas.getByText("Urgent Care")).toBeInTheDocument();
    
    // Verify appointment booking
    expect(canvas.getByText("Book Appointment")).toBeInTheDocument();
    
    // Verify current status badge
    const statusBadge = canvasElement.querySelector('[data-slot="badge"]');
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveTextContent(/Open Now|Closed/);
  },
});

// Retail store with different timezones
export const RetailChain: Story = {
  args: {
    variant: "multiple-locations",
    locations: [
      {
        id: "ny-store",
        name: "New York Flagship",
        businessHours: [
          { day: "monday", openTime: "10:00", closeTime: "21:00", closed: false },
          { day: "tuesday", openTime: "10:00", closeTime: "21:00", closed: false },
          { day: "wednesday", openTime: "10:00", closeTime: "21:00", closed: false },
          { day: "thursday", openTime: "10:00", closeTime: "21:00", closed: false },
          { day: "friday", openTime: "10:00", closeTime: "22:00", closed: false },
          { day: "saturday", openTime: "09:00", closeTime: "22:00", closed: false },
          { day: "sunday", openTime: "11:00", closeTime: "20:00", closed: false },
        ],
        contact: {
          phone: "+1 (212) 555-SHOP",
          address: {
            street: "100 Fifth Avenue",
            city: "New York",
            state: "NY",
            zipCode: "10011",
            country: "USA",
          },
        },
        timezone: "America/New_York",
        services: ["Fashion", "Accessories", "Personal Shopping"],
      },
      {
        id: "la-store",
        name: "Los Angeles Store",
        businessHours: [
          { day: "monday", openTime: "10:00", closeTime: "20:00", closed: false },
          { day: "tuesday", openTime: "10:00", closeTime: "20:00", closed: false },
          { day: "wednesday", openTime: "10:00", closeTime: "20:00", closed: false },
          { day: "thursday", openTime: "10:00", closeTime: "20:00", closed: false },
          { day: "friday", openTime: "10:00", closeTime: "21:00", closed: false },
          { day: "saturday", openTime: "09:00", closeTime: "21:00", closed: false },
          { day: "sunday", openTime: "11:00", closeTime: "19:00", closed: false },
        ],
        contact: {
          phone: "+1 (323) 555-SHOP",
          address: {
            street: "200 Rodeo Drive",
            city: "Beverly Hills",
            state: "CA",
            zipCode: "90210",
            country: "USA",
          },
        },
        timezone: "America/Los_Angeles",
        services: ["Fashion", "Accessories", "VIP Services"],
      },
    ],
    showCurrentStatus: true,
    showContactInfo: true,
    showServices: true,
    allowLocationFilter: true,
  },
};
