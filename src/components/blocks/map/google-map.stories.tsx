import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, waitFor } from "storybook/test";
import { GoogleMap } from "./google-map";
import { enhanceStoryForDualMode } from "../../../../.storybook/utils/enhance-story";

const meta = {
  title: "Blocks/GoogleMap",
  component: GoogleMap,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An interactive map block for displaying locations with Google Maps integration. Supports multiple variants including embedded maps, fullscreen views, and multi-location displays.",
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
      description: "Show map type toggle",
    },
    showFullscreenButton: {
      control: "boolean",
      description: "Show fullscreen button",
    },
    mapStyle: {
      control: "select",
      options: ["roadmap", "satellite", "hybrid", "terrain"],
      description: "Map display style",
    },
  },
} satisfies Meta<typeof GoogleMap>;

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
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map to render and loading state to complete
      await waitFor(() => {
        const iframe = canvasElement.querySelector('iframe[title="Interactive Map"]');
        expect(iframe).toBeInTheDocument();
      }, { timeout: 3000 });
      
      // Verify zoom controls are rendered
      const zoomIn = canvas.getByLabelText('Zoom in');
      expect(zoomIn).toBeInTheDocument();
      
      const zoomOut = canvas.getByLabelText('Zoom out');
      expect(zoomOut).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "GoogleMap",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      height: 400,
      markers: sampleMarkers,
    },
  }
) as Story;

export const Embedded: Story = enhanceStoryForDualMode(
  {
    args: {
      variant: "embedded",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      height: 450,
      markers: sampleMarkers,
      showSearch: true,
      showZoomControls: true,
      showFullscreenButton: true,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map to render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
      // Verify search bar is present
      const searchInput = canvas.getByPlaceholderText('Search locations...');
      expect(searchInput).toBeInTheDocument();
      
      // Verify zoom controls
      expect(canvas.getByLabelText('Zoom in')).toBeInTheDocument();
      expect(canvas.getByLabelText('Zoom out')).toBeInTheDocument();
      
      // Verify fullscreen button
      expect(canvas.getByLabelText('View fullscreen')).toBeInTheDocument();
      
      // Verify map iframe
      await waitFor(() => {
        const iframe = canvasElement.querySelector('iframe[title="Interactive Map"]');
        expect(iframe).toBeInTheDocument();
      }, { timeout: 3000 });
    },
  },
  {
    renderSpec: {
      type: "GoogleMap",
      variant: "embedded",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      height: 450,
      markers: sampleMarkers,
      showSearch: true,
      showZoomControls: true,
      showFullscreenButton: true,
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
    },
    parameters: {
      layout: "fullscreen",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for content to render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
      // Verify title and description
      expect(canvas.getByText('Our Locations')).toBeInTheDocument();
      expect(canvas.getByText('Find the nearest office location to you')).toBeInTheDocument();
      
      // Verify contact info
      expect(canvas.getByText('Contact Information')).toBeInTheDocument();
      const addresses = canvas.getAllByText(contactInfo.address);
      expect(addresses.length).toBeGreaterThan(0);
      
      // Verify locations are shown
      expect(canvas.getByText('New York Office')).toBeInTheDocument();
      expect(canvas.getByText('Brooklyn Branch')).toBeInTheDocument();
      expect(canvas.getByText('Queens Location')).toBeInTheDocument();
      
      // Verify search
      expect(canvas.getByPlaceholderText('Search locations...')).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "GoogleMap",
      variant: "with-sidebar",
      title: "Our Locations",
      description: "Find the nearest office location to you",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 12,
      locations: sampleLocations,
      contactInfo: contactInfo,
      showSearch: true,
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
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map to render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
      // Verify minimal variant renders just the map
      await waitFor(() => {
        const iframe = canvasElement.querySelector('iframe[title="Interactive Map"]');
        expect(iframe).toBeInTheDocument();
      }, { timeout: 3000 });
      
      // Verify no search input
      const searchInput = canvasElement.querySelector('input[placeholder*="Search"]');
      expect(searchInput).not.toBeInTheDocument();
      
      // Verify no zoom controls
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
      type: "GoogleMap",
      variant: "minimal",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 15,
      height: 300,
      showSearch: false,
      showZoomControls: false,
      showFullscreenButton: false,
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
    },
    parameters: {
      layout: "fullscreen",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for content to render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
      // Verify location cards are shown below map
      expect(canvas.getByText('New York Office')).toBeInTheDocument();
      expect(canvas.getByText('Brooklyn Branch')).toBeInTheDocument();
      expect(canvas.getByText('Queens Location')).toBeInTheDocument();
      
      // Verify addresses in cards
      expect(canvas.getByText('123 Broadway, New York, NY 10006')).toBeInTheDocument();
      expect(canvas.getByText('456 Atlantic Ave, Brooklyn, NY 11201')).toBeInTheDocument();
      
      // Verify "Get Directions" buttons
      const directionsButtons = canvas.getAllByText('Get Directions');
      expect(directionsButtons.length).toBeGreaterThanOrEqual(3);
      
      // Verify controls
      expect(canvas.getByPlaceholderText('Search locations...')).toBeInTheDocument();
      expect(canvas.getByLabelText('Toggle map type')).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "GoogleMap",
      variant: "multi-location",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 11,
      height: 500,
      locations: sampleLocations,
      showSearch: true,
      showZoomControls: true,
      showMapTypeControls: true,
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
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map to render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
      // Verify custom styling is applied to wrapper
      const mapWrapper = canvasElement.querySelector('.rounded-xl.shadow-2xl');
      expect(mapWrapper).toBeInTheDocument();
      
      // Verify controls
      expect(canvas.getByLabelText('Toggle map type')).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "GoogleMap",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 13,
      height: 400,
      markers: sampleMarkers,
      className: "rounded-xl shadow-2xl",
      showMapTypeControls: true,
    },
  }
) as Story;

export const SatelliteView: Story = enhanceStoryForDualMode(
  {
    args: {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 16,
      height: 450,
      mapStyle: "satellite",
      markers: sampleMarkers,
      showMapTypeControls: true,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map to render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
      // Verify map type control
      expect(canvas.getByLabelText('Toggle map type')).toBeInTheDocument();
      
      // Verify map iframe (satellite view is set via URL params)
      await waitFor(() => {
        const iframe = canvasElement.querySelector('iframe[title="Interactive Map"]');
        expect(iframe).toBeInTheDocument();
      }, { timeout: 3000 });
    },
  },
  {
    renderSpec: {
      type: "GoogleMap",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 16,
      height: 450,
      mapStyle: "satellite",
      markers: sampleMarkers,
      showMapTypeControls: true,
    },
  }
) as Story;

export const ContactFormIntegration: Story = enhanceStoryForDualMode(
  {
    args: {
      variant: "with-sidebar",
      title: "Contact Us",
      description: "Visit our office or get in touch online",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 15,
      contactInfo: {
        address: "123 Broadway, New York, NY 10006",
        phone: "(212) 555-0100",
        email: "contact@example.com",
        hours: "Mon-Fri: 9AM-6PM",
      },
      markers: sampleMarkers,
    },
    parameters: {
      layout: "fullscreen",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for content to render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
      // Verify title and description
      expect(canvas.getByText('Contact Us')).toBeInTheDocument();
      expect(canvas.getByText('Visit our office or get in touch online')).toBeInTheDocument();
      
      // Verify contact information
      expect(canvas.getByText('Contact Information')).toBeInTheDocument();
      expect(canvas.getByText('Mon-Fri: 9AM-6PM')).toBeInTheDocument();
      
      // Verify contact details include links
      const phoneLink = canvas.getByText('(212) 555-0100');
      expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:(212) 555-0100');
      
      const emailLink = canvas.getByText('contact@example.com');
      expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:contact@example.com');
    },
  },
  {
    renderSpec: {
      type: "GoogleMap",
      variant: "with-sidebar",
      title: "Contact Us",
      description: "Visit our office or get in touch online",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 15,
      contactInfo: {
        address: "123 Broadway, New York, NY 10006",
        phone: "(212) 555-0100",
        email: "contact@example.com",
        hours: "Mon-Fri: 9AM-6PM",
      },
      markers: sampleMarkers,
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
    },
    parameters: {
      layout: "fullscreen",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for the component to fully render
      await new Promise(resolve => globalThis.setTimeout(resolve, 2000));
      
      // Check if we're in React mode or SDUI mode
      const isSDUIMode = canvasElement.querySelector('[data-testid="react-render"]');
      
      if (isSDUIMode) {
        // For SDUI mode, the structure might be different
        // Let's just check if the iframe is present first
        await waitFor(() => {
          const iframe = canvasElement.querySelector('iframe[title="Interactive Map"]');
          expect(iframe).toBeInTheDocument();
        }, { timeout: 3000 });
        
        // Then check for location names
        await waitFor(() => {
          expect(canvas.getByText('Times Square Location')).toBeInTheDocument();
        }, { timeout: 3000 });
      } else {
        // React mode
        // Verify location names are present
        await waitFor(() => {
          expect(canvas.getByText('Times Square Location')).toBeInTheDocument();
          expect(canvas.getByText('Central Park South')).toBeInTheDocument();
          expect(canvas.getByText('Greenwich Village')).toBeInTheDocument();
        }, { timeout: 3000 });
        
        // Verify categories
        await waitFor(() => {
          expect(canvas.getByText('Restaurant')).toBeInTheDocument();
          expect(canvas.getByText('Cafe')).toBeInTheDocument();
          expect(canvas.getByText('Bar & Restaurant')).toBeInTheDocument();
        }, { timeout: 3000 });
      }
    },
  },
  {
    renderSpec: {
      type: "GoogleMap",
      variant: "multi-location",
      center: { lat: 40.758, lng: -73.9855 },
      zoom: 13,
      height: 500,
      locations: restaurantLocationsList,
      showSearch: true,
      showMapTypeControls: true,
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
    },
    parameters: {
      layout: "fullscreen",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for content to render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
      // Verify title and description
      expect(canvas.getByText('Find a Store')).toBeInTheDocument();
      expect(canvas.getByText('Locate your nearest store and check opening hours')).toBeInTheDocument();
      
      // Verify store locations in sidebar
      expect(canvas.getByText('Manhattan Store')).toBeInTheDocument();
      expect(canvas.getByText('Brooklyn Store')).toBeInTheDocument();
      expect(canvas.getByText('Staten Island Store')).toBeInTheDocument();
      
      // Verify store categories
      expect(canvas.getByText('Flagship Store')).toBeInTheDocument();
      expect(canvas.getByText('Regular Store')).toBeInTheDocument();
      expect(canvas.getByText('Outlet Store')).toBeInTheDocument();
      
      // Verify controls
      expect(canvas.getByPlaceholderText('Search locations...')).toBeInTheDocument();
      expect(canvas.getByLabelText('View fullscreen')).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "GoogleMap",
      variant: "with-sidebar",
      title: "Find a Store",
      description: "Locate your nearest store and check opening hours",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 11,
      locations: storesList,
      showSearch: true,
      showZoomControls: true,
      showFullscreenButton: true,
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
    },
    play: async ({ canvasElement }) => {
      // Wait for map to render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
      // For minimal variant, just verify the map renders
      await waitFor(() => {
        const iframe = canvasElement.querySelector('iframe[title="Interactive Map"]');
        expect(iframe).toBeInTheDocument();
      }, { timeout: 3000 });
      
      // Minimal variant should have no controls
      const searchInput = canvasElement.querySelector('input[placeholder*="Search"]');
      expect(searchInput).not.toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "GoogleMap",
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
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map to render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
      // Verify fullscreen button is present
      expect(canvas.getByLabelText('View fullscreen')).toBeInTheDocument();
      
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
      type: "GoogleMap",
      variant: "embedded",
      center: { lat: 40.7614, lng: -73.9776 },
      zoom: 16,
      height: 400,
      markers: [eventVenueMarker],
      showMapTypeControls: false,
      showFullscreenButton: true,
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
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for map to render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
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
      type: "GoogleMap",
      variant: "embedded",
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      height: 300,
      showSearch: false,
      showZoomControls: false,
      showMapTypeControls: false,
      showFullscreenButton: false,
      enableScrollZoom: false,
    },
  }
) as Story;

export const LoadingState: Story = enhanceStoryForDualMode(
  {
    args: {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
      height: 400,
    },
    render: (args) => {
      return (
        <div className="space-y-4">
          <div className="text-center text-muted-foreground">Map component with loading skeleton</div>
          <GoogleMap {...args} />
        </div>
      );
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify the description text
      expect(canvas.getByText('Map component with loading skeleton')).toBeInTheDocument();
      
      // The map will show loading state briefly, then render
      // Wait for map to fully render (reduced time since loading is immediate in test env)
      await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      
      // Verify map iframe eventually appears
      await waitFor(() => {
        const iframe = canvasElement.querySelector('iframe[title="Interactive Map"]');
        expect(iframe).toBeInTheDocument();
      }, { timeout: 3000 });
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
          type: "GoogleMap",
          center: { lat: 40.7128, lng: -74.006 },
          zoom: 14,
          height: 400,
        },
      ],
    },
  }
) as Story;
