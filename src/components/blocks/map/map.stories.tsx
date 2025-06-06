import type { Meta, StoryObj } from "@storybook/react-vite";
import { Map } from "./map";

const meta = {
  title: "Blocks/Map",
  component: Map,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An interactive map block for displaying locations using Leaflet. Features clean, flat map styles and supports multiple variants including embedded maps, fullscreen views, and multi-location displays.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["embedded", "fullscreen", "with-sidebar", "minimal", "multi-location"],
      description: "The visual variant of the map",
    },
    height: {
      control: "text",
      description: "Height of the map container",
    },
    zoom: {
      control: { type: "number", min: 1, max: 20 },
      description: "Zoom level of the map",
    },
    showSearch: {
      control: "boolean",
      description: "Show search functionality",
    },
    showZoomControls: {
      control: "boolean",
      description: "Show zoom controls",
    },
    showMapTypeControls: {
      control: "boolean",
      description: "Show map style toggle",
    },
    showFullscreenButton: {
      control: "boolean",
      description: "Show fullscreen button",
    },
    enableScrollZoom: {
      control: "boolean",
      description: "Enable mouse wheel zoom (disabled by default for better UX)",
      defaultValue: false,
    },
    mapStyle: {
      control: "select",
      options: ["flat", "streets", "outdoors", "satellite"],
      description: "Map display style",
    },
  },
} satisfies Meta<typeof Map>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleMarkers = [
  {
    id: "1",
    position: { lat: 40.7128, lng: -74.006 },
    title: "Main Office",
    description: "Our headquarters in New York",
    icon: "business" as const,
    infoWindow: {
      title: "NYC Headquarters",
      content: "Visit us at our main office location",
      actions: [
        { label: "Get Directions", href: "#" },
        { label: "Call Us", href: "tel:+1234567890" },
      ],
    },
  },
];

const sampleLocations = [
  {
    name: "New York Office",
    address: "123 Broadway, New York, NY 10006",
    phone: "(212) 555-0100",
    email: "ny@example.com",
    hours: "Mon-Fri: 9AM-6PM",
    position: { lat: 40.7128, lng: -74.006 },
    category: "Headquarters",
  },
  {
    name: "Brooklyn Branch",
    address: "456 Atlantic Ave, Brooklyn, NY 11201",
    phone: "(718) 555-0200",
    email: "brooklyn@example.com",
    hours: "Mon-Fri: 9AM-5PM",
    position: { lat: 40.6782, lng: -73.9442 },
    category: "Branch Office",
  },
  {
    name: "Queens Location",
    address: "789 Queens Blvd, Queens, NY 11373",
    phone: "(718) 555-0300",
    email: "queens@example.com",
    hours: "Mon-Sat: 10AM-7PM",
    position: { lat: 40.7282, lng: -73.8803 },
    category: "Satellite Office",
  },
];

const contactInfo = {
  address: "123 Broadway, New York, NY 10006",
  phone: "(212) 555-0100",
  email: "contact@example.com",
  hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
};

export const Default: Story = {
  args: {
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 14,
    height: 400,
    markers: sampleMarkers,
    mapStyle: "flat",
    enableScrollZoom: false, // Disabled by default for better UX
  },
};

export const FlatStyle: Story = {
  args: {
    variant: "embedded",
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 14,
    height: 450,
    markers: sampleMarkers,
    mapStyle: "flat",
    showSearch: true,
    showZoomControls: true,
    showFullscreenButton: true,
    enableScrollZoom: false,
  },
};

export const StreetStyle: Story = {
  args: {
    variant: "embedded",
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 14,
    height: 450,
    markers: sampleMarkers,
    mapStyle: "streets",
    showSearch: true,
    showZoomControls: true,
    showMapTypeControls: true,
    enableScrollZoom: false,
  },
};

export const SatelliteStyle: Story = {
  args: {
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 16,
    height: 450,
    mapStyle: "satellite",
    markers: sampleMarkers,
    showMapTypeControls: true,
    enableScrollZoom: false,
  },
};

export const WithSidebar: Story = {
  args: {
    variant: "with-sidebar",
    title: "Our Locations",
    description: "Find the nearest office location to you",
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 12,
    locations: sampleLocations,
    contactInfo: contactInfo,
    showSearch: true,
    mapStyle: "flat",
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const Minimal: Story = {
  args: {
    variant: "minimal",
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 15,
    height: 300,
    showSearch: false,
    showZoomControls: false,
    showFullscreenButton: false,
    enableScrollZoom: false,
    mapStyle: "flat",
  },
};

export const MultiLocation: Story = {
  args: {
    variant: "multi-location",
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 11,
    height: 500,
    locations: sampleLocations,
    showSearch: true,
    showZoomControls: true,
    showMapTypeControls: true,
    mapStyle: "flat",
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const WithCustomStyling: Story = {
  args: {
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 13,
    height: 400,
    markers: sampleMarkers,
    className: "rounded-xl shadow-2xl",
    showMapTypeControls: true,
    mapStyle: "flat",
  },
};

export const RestaurantLocations: Story = {
  args: {
    variant: "multi-location",
    center: { lat: 40.758, lng: -73.9855 },
    zoom: 13,
    height: 500,
    locations: [
      {
        name: "Times Square Location",
        address: "1500 Broadway, New York, NY 10036",
        phone: "(212) 555-0111",
        hours: "Daily: 11AM-11PM",
        position: { lat: 40.758, lng: -73.9855 },
        category: "Restaurant",
        description: "Our flagship location in the heart of Times Square",
      },
      {
        name: "Central Park South",
        address: "59th St & 5th Ave, New York, NY 10019",
        phone: "(212) 555-0222",
        hours: "Daily: 10AM-10PM",
        position: { lat: 40.7644, lng: -73.9732 },
        category: "Cafe",
        description: "Scenic views overlooking Central Park",
      },
      {
        name: "Greenwich Village",
        address: "100 Washington Square, New York, NY 10012",
        phone: "(212) 555-0333",
        hours: "Daily: 8AM-12AM",
        position: { lat: 40.7308, lng: -73.9973 },
        category: "Bar & Restaurant",
        description: "Cozy spot in the heart of the Village",
      },
    ],
    showSearch: true,
    showMapTypeControls: true,
    mapStyle: "flat",
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const StoreLocator: Story = {
  args: {
    variant: "with-sidebar",
    title: "Find a Store",
    description: "Locate your nearest store and check opening hours",
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 11,
    locations: [
      {
        name: "Manhattan Store",
        address: "5th Avenue & 42nd Street, New York, NY",
        phone: "(212) 555-1000",
        hours: "Mon-Sat: 10AM-9PM, Sun: 11AM-7PM",
        position: { lat: 40.7549, lng: -73.984 },
        category: "Flagship Store",
      },
      {
        name: "Brooklyn Store",
        address: "345 Court Street, Brooklyn, NY",
        phone: "(718) 555-2000",
        hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
        position: { lat: 40.6782, lng: -73.9442 },
        category: "Regular Store",
      },
      {
        name: "Staten Island Store",
        address: "2655 Richmond Avenue, Staten Island, NY",
        phone: "(718) 555-3000",
        hours: "Mon-Sat: 9AM-9PM, Sun: 10AM-7PM",
        position: { lat: 40.5795, lng: -74.1502 },
        category: "Outlet Store",
      },
    ],
    showSearch: true,
    showZoomControls: true,
    showFullscreenButton: true,
    mapStyle: "flat",
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const SingleLocationMinimal: Story = {
  args: {
    variant: "minimal",
    center: { lat: 40.7488, lng: -73.968 }, // Empire State Building
    zoom: 17,
    height: 350,
    markers: [
      {
        id: "empire-state",
        position: { lat: 40.7488, lng: -73.968 },
        title: "Empire State Building",
        icon: "business" as const,
      },
    ],
    mapStyle: "flat",
  },
};

export const EventVenue: Story = {
  args: {
    variant: "embedded",
    center: { lat: 40.7614, lng: -73.9776 }, // MoMA
    zoom: 16,
    height: 400,
    markers: [
      {
        id: "venue",
        position: { lat: 40.7614, lng: -73.9776 },
        title: "Event Venue",
        description: "Museum of Modern Art",
        icon: "default" as const,
        infoWindow: {
          title: "Annual Gala 2024",
          content: "Join us for an evening of art and celebration",
          image: "https://placehold.co/400x300/EEE/31343C",
          actions: [
            { label: "Get Tickets", href: "#" },
            { label: "Event Details", href: "#" },
          ],
        },
      },
    ],
    showMapTypeControls: false,
    showFullscreenButton: true,
    mapStyle: "flat",
  },
};

export const NoControls: Story = {
  args: {
    variant: "embedded",
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 14,
    height: 300,
    showSearch: false,
    showZoomControls: false,
    showMapTypeControls: false,
    showFullscreenButton: false,
    enableScrollZoom: false,
    mapStyle: "flat",
  },
};

export const MarkerTypes: Story = {
  args: {
    center: { lat: 40.73, lng: -73.99 },
    zoom: 13,
    height: 450,
    markers: [
      {
        id: "1",
        position: { lat: 40.735, lng: -73.995 },
        title: "Business Office",
        icon: "business" as const,
      },
      {
        id: "2",
        position: { lat: 40.728, lng: -73.99 },
        title: "Restaurant",
        icon: "restaurant" as const,
      },
      {
        id: "3",
        position: { lat: 40.725, lng: -73.985 },
        title: "Hotel",
        icon: "hotel" as const,
      },
      {
        id: "4",
        position: { lat: 40.732, lng: -73.985 },
        title: "Shopping Center",
        icon: "shopping" as const,
      },
    ],
    showZoomControls: true,
    mapStyle: "flat",
  },
};

export const WithScrollZoom: Story = {
  args: {
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 14,
    height: 450,
    markers: sampleMarkers,
    mapStyle: "flat",
    showZoomControls: true,
    showMapTypeControls: true,
    enableScrollZoom: true, // Scroll zoom enabled for this story
  },
  parameters: {
    docs: {
      description: {
        story: "Map with scroll zoom enabled. Use mouse wheel to zoom in/out.",
      },
    },
  },
};

export const LoadingState: Story = {
  args: {
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 14,
    height: 400,
    mapStyle: "flat",
    enableScrollZoom: false,
  },
  render: (args) => {
    return (
      <div className="space-y-4">
        <div className="text-center text-muted-foreground">Map component with loading skeleton</div>
        <Map {...args} />
      </div>
    );
  },
};
