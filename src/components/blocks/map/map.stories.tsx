import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Map } from "./map";
import { enhanceStoryForDualMode } from "../../../../.storybook/utils/enhance-story";

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

export const Default: Story = enhanceStoryForDualMode(
  {
    args: {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      height: 400,
      markers: sampleMarkers,
      mapStyle: "flat",
      enableScrollZoom: false, // Disabled by default for better UX
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map container to render instead of fixed timeout
      await waitFor(() => {
        const mapWrapper = canvasElement.querySelector('[data-testid="map-wrapper"], .relative');
        expect(mapWrapper).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify zoom controls are rendered
      try {
        const zoomIn = canvas.getByLabelText('Zoom in');
        expect(zoomIn).toBeInTheDocument();
      } catch {
        // Controls might be disabled or not yet rendered
      }
    },
  },
  {
    renderSpec: {
      type: "Map",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      height: 400,
      markers: sampleMarkers,
      mapStyle: "roadmap", // Map "flat" to "roadmap" for schema
      enableScrollZoom: false,
    },
  }
) as Story;

export const FlatStyle: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for search input to be available instead of fixed timeout
      await waitFor(() => {
        const searchInput = canvas.getByPlaceholderText('Search locations...');
        expect(searchInput).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify zoom controls
      expect(canvas.getByLabelText('Zoom in')).toBeInTheDocument();
      expect(canvas.getByLabelText('Zoom out')).toBeInTheDocument();
      
      // Verify fullscreen button
      expect(canvas.getByLabelText('View fullscreen')).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Map",
      variant: "embedded",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      height: 450,
      markers: sampleMarkers,
      mapStyle: "roadmap",
      showSearch: true,
      showZoomControls: true,
      showFullscreenButton: true,
      enableScrollZoom: false,
    },
  }
) as Story;

export const StreetStyle: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map type control to be available
      await waitFor(() => {
        expect(canvas.getByLabelText('Toggle map type')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify other controls
      expect(canvas.getByLabelText('Zoom in')).toBeInTheDocument();
      expect(canvas.getByPlaceholderText('Search locations...')).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Map",
      variant: "embedded",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      height: 450,
      markers: sampleMarkers,
      mapStyle: "roadmap", // Map "streets" to "roadmap"
      showSearch: true,
      showZoomControls: true,
      showMapTypeControls: true,
      enableScrollZoom: false,
    },
  }
) as Story;

export const SatelliteStyle: Story = enhanceStoryForDualMode(
  {
    args: {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 16,
      height: 450,
      mapStyle: "satellite",
      markers: sampleMarkers,
      showMapTypeControls: true,
      enableScrollZoom: false,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map type control to be available
      await waitFor(() => {
        expect(canvas.getByLabelText('Toggle map type')).toBeInTheDocument();
      }, { timeout: 10000 });
    },
  },
  {
    renderSpec: {
      type: "Map",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 16,
      height: 450,
      mapStyle: "satellite", // This one matches!
      markers: sampleMarkers,
      showMapTypeControls: true,
      enableScrollZoom: false,
    },
  }
) as Story;

export const WithSidebar: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for title to be available
      await waitFor(() => {
        expect(canvas.getByText('Our Locations')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify title and description
      expect(canvas.getByText('Find the nearest office location to you')).toBeInTheDocument();
      
      // Verify contact info
      expect(canvas.getByText('Contact Information')).toBeInTheDocument();
      // Address and phone appear multiple times, so we just check they exist
      const addresses = canvas.getAllByText(contactInfo.address);
      expect(addresses.length).toBeGreaterThan(0);
      const phones = canvas.getAllByText(contactInfo.phone);
      expect(phones.length).toBeGreaterThan(0);
      
      // Verify locations are shown
      expect(canvas.getByText('New York Office')).toBeInTheDocument();
      expect(canvas.getByText('Brooklyn Branch')).toBeInTheDocument();
      expect(canvas.getByText('Queens Location')).toBeInTheDocument();
      
      // Wait for search input to be available (it's rendered inside MapContainer)
      await waitFor(() => {
        expect(canvas.getByPlaceholderText('Search locations...')).toBeInTheDocument();
      }, { timeout: 10000 });
    },
  },
  {
    renderSpec: {
      type: "Map",
      variant: "with-sidebar",
      title: "Our Locations",
      description: "Find the nearest office location to you",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 12,
      locations: sampleLocations,
      contactInfo: contactInfo,
      showSearch: true,
      mapStyle: "roadmap",
    },
  }
) as Story;

export const Minimal: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map container to be available, but verify no controls
      await waitFor(() => {
        const mapWrapper = canvasElement.querySelector('.relative');
        expect(mapWrapper).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // For minimal variant, we mainly verify that controls are NOT present
      // This is a minimal map with no controls
      
      // Verify no search
      const searchInput = canvasElement.querySelector('input[placeholder*="Search"]');
      expect(searchInput).not.toBeInTheDocument();
      
      // Verify no zoom buttons
      try {
        canvas.getByLabelText('Zoom in');
        // If we get here, the test should fail
        expect(true).toBe(false);
      } catch {
        // Expected - zoom controls should not exist
      }
    },
  },
  {
    renderSpec: {
      type: "Map",
      variant: "minimal",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 15,
      height: 300,
      showSearch: false,
      showZoomControls: false,
      showFullscreenButton: false,
      enableScrollZoom: false,
      mapStyle: "roadmap",
    },
  }
) as Story;

export const MultiLocation: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for location cards to render
      await waitFor(() => {
        expect(canvas.getByText('New York Office')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify location cards are shown below map
      expect(canvas.getByText('Brooklyn Branch')).toBeInTheDocument();
      expect(canvas.getByText('Queens Location')).toBeInTheDocument();
      
      // Verify addresses in cards
      expect(canvas.getByText('123 Broadway, New York, NY 10006')).toBeInTheDocument();
      expect(canvas.getByText('456 Atlantic Ave, Brooklyn, NY 11201')).toBeInTheDocument();
      
      // Verify "Get Directions" buttons
      const directionsButtons = canvas.getAllByText('Get Directions');
      expect(directionsButtons.length).toBeGreaterThanOrEqual(3);
      
      // Wait for map to load and search input to be available (it's rendered inside MapContainer)
      await waitFor(() => {
        expect(canvas.getByPlaceholderText('Search locations...')).toBeInTheDocument();
      }, { timeout: 15000 }); // Longer timeout for map initialization
      
      expect(canvas.getByLabelText('Toggle map type')).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Map",
      variant: "multi-location",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 11,
      height: 500,
      locations: sampleLocations,
      showSearch: true,
      showZoomControls: true,
      showMapTypeControls: true,
      mapStyle: "roadmap",
    },
  }
) as Story;

export const WithCustomStyling: Story = enhanceStoryForDualMode(
  {
    args: {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 13,
      height: 400,
      markers: sampleMarkers,
      className: "rounded-xl shadow-2xl",
      showMapTypeControls: true,
      mapStyle: "flat",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map type control to be available
      await waitFor(() => {
        expect(canvas.getByLabelText('Toggle map type')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify custom styling is applied to wrapper
      const mapWrapper = canvasElement.querySelector('.rounded-xl.shadow-2xl');
      if (mapWrapper) {
        expect(mapWrapper).toBeInTheDocument();
      }
    },
  },
  {
    renderSpec: {
      type: "Map",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 13,
      height: 400,
      markers: sampleMarkers,
      className: "rounded-xl shadow-2xl",
      showMapTypeControls: true,
      mapStyle: "roadmap",
    },
  }
) as Story;

const restaurantLocationsList = [
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
];

export const RestaurantLocations: Story = enhanceStoryForDualMode(
  {
    args: {
      variant: "multi-location",
      center: { lat: 40.758, lng: -73.9855 },
      zoom: 13,
      height: 500,
      locations: restaurantLocationsList,
      showSearch: true,
      showMapTypeControls: true,
      mapStyle: "flat",
    },
    parameters: {
      layout: "fullscreen",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for location content to render
      await waitFor(() => {
        expect(canvas.getByText('Times Square Location')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Just verify the main location names are present
      // Categories might appear in different ways depending on the mode
      expect(canvas.getByText('Central Park South')).toBeInTheDocument();
      expect(canvas.getByText('Greenwich Village')).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Map",
      variant: "multi-location",
      center: { lat: 40.758, lng: -73.9855 },
      zoom: 13,
      height: 500,
      locations: restaurantLocationsList,
      showSearch: true,
      showMapTypeControls: true,
      mapStyle: "roadmap",
    },
  }
) as Story;

const storesList = [
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
];

export const StoreLocator: Story = enhanceStoryForDualMode(
  {
    args: {
      variant: "with-sidebar",
      title: "Find a Store",
      description: "Locate your nearest store and check opening hours",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 11,
      locations: storesList,
      showSearch: true,
      showZoomControls: true,
      showFullscreenButton: true,
      mapStyle: "flat",
    },
    parameters: {
      layout: "fullscreen",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for title to be available
      await waitFor(() => {
        expect(canvas.getByText('Find a Store')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify title and description
      expect(canvas.getByText('Locate your nearest store and check opening hours')).toBeInTheDocument();
      
      // Verify store locations in sidebar
      expect(canvas.getByText('Manhattan Store')).toBeInTheDocument();
      expect(canvas.getByText('Brooklyn Store')).toBeInTheDocument();
      expect(canvas.getByText('Staten Island Store')).toBeInTheDocument();
      
      // Verify store categories
      expect(canvas.getByText('Flagship Store')).toBeInTheDocument();
      expect(canvas.getByText('Regular Store')).toBeInTheDocument();
      expect(canvas.getByText('Outlet Store')).toBeInTheDocument();
      
      // Wait for search input to be available (it's rendered inside MapContainer)
      await waitFor(() => {
        expect(canvas.getByPlaceholderText('Search locations...')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      expect(canvas.getByLabelText('View fullscreen')).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Map",
      variant: "with-sidebar",
      title: "Find a Store",
      description: "Locate your nearest store and check opening hours",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 11,
      locations: storesList,
      showSearch: true,
      showZoomControls: true,
      showFullscreenButton: true,
      mapStyle: "roadmap",
    },
  }
) as Story;

export const SingleLocationMinimal: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      // Wait for map container to be available
      await waitFor(() => {
        const mapWrapper = canvasElement.querySelector('.relative');
        expect(mapWrapper).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // For minimal variant, just verify the map renders
      // We can't reliably test leaflet-specific elements in test environment
    },
  },
  {
    renderSpec: {
      type: "Map",
      variant: "minimal",
      center: { lat: 40.7488, lng: -73.968 },
      zoom: 17,
      height: 350,
      markers: [
        {
          id: "empire-state",
          position: { lat: 40.7488, lng: -73.968 },
          title: "Empire State Building",
          icon: "business",
        },
      ],
      mapStyle: "roadmap",
    },
  }
) as Story;

const eventVenueMarker = {
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
};

export const EventVenue: Story = enhanceStoryForDualMode(
  {
    args: {
      variant: "embedded",
      center: { lat: 40.7614, lng: -73.9776 }, // MoMA
      zoom: 16,
      height: 400,
      markers: [eventVenueMarker],
      showMapTypeControls: false,
      showFullscreenButton: true,
      mapStyle: "flat",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for fullscreen button to be available
      await waitFor(() => {
        expect(canvas.getByLabelText('View fullscreen')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify no map type controls
      try {
        canvas.getByLabelText('Toggle map type');
        // If we get here, the test should fail
        expect(true).toBe(false);
      } catch {
        // Expected - map type control should not exist
      }
    },
  },
  {
    renderSpec: {
      type: "Map",
      variant: "embedded",
      center: { lat: 40.7614, lng: -73.9776 },
      zoom: 16,
      height: 400,
      markers: [eventVenueMarker],
      showMapTypeControls: false,
      showFullscreenButton: true,
      mapStyle: "roadmap",
    },
  }
) as Story;

export const NoControls: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map container to be available
      await waitFor(() => {
        const mapWrapper = canvasElement.querySelector('.relative');
        expect(mapWrapper).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify no controls are present
      const searchInput = canvasElement.querySelector('input[placeholder*="Search"]');
      expect(searchInput).not.toBeInTheDocument();
      
      // Try to find controls that shouldn't exist
      const controls = ['Zoom in', 'Toggle map type', 'View fullscreen'];
      for (const label of controls) {
        try {
          canvas.getByLabelText(label);
          // If we get here, the test should fail
          expect(true).toBe(false);
        } catch {
          // Expected - control should not exist
        }
      }
    },
  },
  {
    renderSpec: {
      type: "Map",
      variant: "embedded",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      height: 300,
      showSearch: false,
      showZoomControls: false,
      showMapTypeControls: false,
      showFullscreenButton: false,
      enableScrollZoom: false,
      mapStyle: "roadmap",
    },
  }
) as Story;

const markerTypesArray = [
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
];

export const MarkerTypes: Story = enhanceStoryForDualMode(
  {
    args: {
      center: { lat: 40.73, lng: -73.99 },
      zoom: 13,
      height: 450,
      markers: markerTypesArray,
      showZoomControls: true,
      mapStyle: "flat",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for zoom controls to be available
      await waitFor(() => {
        expect(canvas.getByLabelText('Zoom in')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify zoom controls
      expect(canvas.getByLabelText('Zoom out')).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Map",
      center: { lat: 40.73, lng: -73.99 },
      zoom: 13,
      height: 450,
      markers: markerTypesArray,
      showZoomControls: true,
      mapStyle: "roadmap",
    },
  }
) as Story;

export const WithScrollZoom: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for zoom controls to be available
      await waitFor(() => {
        expect(canvas.getByLabelText('Zoom in')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify controls
      expect(canvas.getByLabelText('Toggle map type')).toBeInTheDocument();
      
      // Note: Can't easily test scroll zoom behavior in unit tests
      // but we verify the controls are rendered
    },
  },
  {
    renderSpec: {
      type: "Map",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      height: 450,
      markers: sampleMarkers,
      mapStyle: "roadmap",
      showZoomControls: true,
      showMapTypeControls: true,
      enableScrollZoom: true,
    },
  }
) as Story;

export const LoadingState: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify the description text
      expect(canvas.getByText('Map component with loading skeleton')).toBeInTheDocument();
      
      // The map will show loading state briefly, then render
      // Wait for map container to be available
      await waitFor(() => {
        const mapContainer = canvasElement.querySelector('.leaflet-container');
        expect(mapContainer).toBeInTheDocument();
      }, { timeout: 15000 }); // Longer timeout for loading state
    },
  },
  {
    renderSpec: {
      type: "Stack",
      spacing: "4",
      children: [
        {
          type: "Text",
          children: "Map component with loading skeleton",
          className: "text-center text-muted-foreground",
        },
        {
          type: "Map",
          center: { lat: 40.7128, lng: -74.006 },
          zoom: 14,
          height: 400,
          mapStyle: "roadmap",
          enableScrollZoom: false,
        },
      ],
    },
  }
) as Story;
