import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseLayout } from "../../../../components/layouts/showcase-layout";
import { CodeBlock } from "../../../../components/ui/code-block";
import { Tabs } from "../../../../components/ui/tabs";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";

// Example specifications
const embeddedMap: ComponentSpec = {
  type: "Map",
  props: {
    variant: "embedded",
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 14,
    height: 450,
    showSearch: true,
    showZoomControls: true,
    showFullscreenButton: true,
    markers: [
      {
        id: "1",
        position: { lat: 40.7128, lng: -74.0060 },
        title: "New York Office",
        description: "Our main headquarters",
        icon: "business",
        infoWindow: {
          title: "NYC Headquarters",
          content: "123 Broadway, New York, NY 10006",
          actions: [
            { label: "Get Directions", href: "#" },
            { label: "Call Us", href: "tel:+12125550100" },
          ],
        },
      },
    ],
  },
};

const withSidebarMap: ComponentSpec = {
  type: "Map",
  props: {
    variant: "with-sidebar",
    title: "Our Locations",
    description: "Find the nearest office location to you",
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 12,
    showSearch: true,
    locations: [
      {
        name: "Manhattan Office",
        address: "123 Broadway, New York, NY 10006",
        phone: "(212) 555-0100",
        email: "manhattan@example.com",
        hours: "Mon-Fri: 9AM-6PM",
        position: { lat: 40.7128, lng: -74.0060 },
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
    ],
    contactInfo: {
      address: "123 Broadway, New York, NY 10006",
      phone: "(212) 555-0100",
      email: "contact@example.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
    },
  },
};

const minimalMap: ComponentSpec = {
  type: "Map",
  props: {
    variant: "minimal",
    center: { lat: 40.7488, lng: -73.9680 }, // Empire State Building
    zoom: 17,
    height: 350,
    showSearch: false,
    showZoomControls: false,
    showFullscreenButton: false,
    markers: [
      {
        id: "empire-state",
        position: { lat: 40.7488, lng: -73.9680 },
        title: "Empire State Building",
        icon: "business",
      },
    ],
  },
};

const multiLocationMap: ComponentSpec = {
  type: "Map",
  props: {
    variant: "multi-location",
    center: { lat: 40.7580, lng: -73.9855 },
    zoom: 13,
    height: 500,
    showSearch: true,
    showZoomControls: true,
    showMapTypeControls: true,
    locations: [
      {
        name: "Times Square Store",
        address: "1500 Broadway, New York, NY 10036",
        phone: "(212) 555-1111",
        hours: "Daily: 10AM-10PM",
        position: { lat: 40.7580, lng: -73.9855 },
        category: "Flagship Store",
        description: "Our largest store with full product range",
      },
      {
        name: "Central Park Location",
        address: "59th St & 5th Ave, New York, NY 10019",
        phone: "(212) 555-2222",
        hours: "Daily: 9AM-9PM",
        position: { lat: 40.7644, lng: -73.9732 },
        category: "Boutique",
        description: "Premium location with exclusive items",
      },
      {
        name: "Greenwich Village Shop",
        address: "100 Washington Square, New York, NY 10012",
        phone: "(212) 555-3333",
        hours: "Mon-Sat: 11AM-8PM, Sun: 12PM-6PM",
        position: { lat: 40.7308, lng: -73.9973 },
        category: "Outlet Store",
        description: "Great deals on previous seasons",
      },
      {
        name: "Upper East Side",
        address: "1000 Madison Ave, New York, NY 10075",
        phone: "(212) 555-4444",
        hours: "Mon-Sat: 10AM-7PM",
        position: { lat: 40.7736, lng: -73.9566 },
        category: "Boutique",
        description: "Personalized shopping experience",
      },
    ],
  },
};

const restaurantMap: ComponentSpec = {
  type: "Map",
  props: {
    variant: "embedded",
    center: { lat: 40.7614, lng: -73.9776 },
    zoom: 16,
    height: 400,
    mapStyle: "roadmap",
    showMapTypeControls: true,
    markers: [
      {
        id: "restaurant",
        position: { lat: 40.7614, lng: -73.9776 },
        title: "The Gourmet Kitchen",
        description: "Fine dining experience",
        icon: "restaurant",
        infoWindow: {
          title: "The Gourmet Kitchen",
          content: "Award-winning cuisine in the heart of Manhattan",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
          actions: [
            { label: "Reserve Table", href: "#" },
            { label: "View Menu", href: "#" },
            { label: "Get Directions", href: "#" },
          ],
        },
      },
    ],
    contactInfo: {
      address: "789 5th Avenue, New York, NY 10022",
      phone: "(212) 555-DINE",
      email: "reservations@gourmetkitchen.com",
      hours: "Lunch: 11:30 AM - 2:30 PM\nDinner: 5:30 PM - 11:00 PM",
    },
  },
};

const eventVenueMap: ComponentSpec = {
  type: "Map",
  props: {
    variant: "with-sidebar",
    title: "Conference Venue",
    description: "Join us at the React Summit 2024",
    center: { lat: 40.7505, lng: -73.9934 },
    zoom: 15,
    height: 450,
    markers: [
      {
        id: "venue",
        position: { lat: 40.7505, lng: -73.9934 },
        title: "Madison Square Garden",
        icon: "default",
        infoWindow: {
          title: "React Summit 2024",
          content: "March 15-17, 2024",
          actions: [
            { label: "Get Tickets", href: "#" },
            { label: "View Schedule", href: "#" },
          ],
        },
      },
    ],
    contactInfo: {
      address: "4 Pennsylvania Plaza, New York, NY 10001",
      phone: "(212) 555-EVENT",
      email: "info@reactsummit.com",
      hours: "Event Hours: 9:00 AM - 6:00 PM",
    },
  },
};

export function MapShowcase() {
  usePageMetadata({
    title: "Map - Interactive Location Display | React Jedi",
    description: "Display interactive maps with custom markers, multiple locations, and various layout options using Google Maps integration.",
  });

  return (
    <ShowcaseLayout
      title="Map"
      description="An interactive map block for displaying locations with Google Maps integration. Supports multiple variants including embedded maps, fullscreen views, and multi-location displays."
      category="blocks"
    >
      <section className="space-y-12">
        {/* Basic Example */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Basic Embedded Map</h2>
            <p className="text-muted-foreground">
              A simple embedded map with a single marker and standard controls.
            </p>
          </div>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <div className="bg-background rounded-lg border p-6">
                {render(embeddedMap)}
              </div>
            </TabsContent>
            <TabsContent value="code" className="mt-4">
              <CodeBlock code={JSON.stringify(embeddedMap, null, 2)} language="json" />
            </TabsContent>
          </Tabs>
        </div>

        {/* With Sidebar */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Map with Sidebar</h2>
            <p className="text-muted-foreground">
              Display multiple locations with a sidebar containing contact information and location details.
            </p>
          </div>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <div className="bg-background rounded-lg border overflow-hidden">
                {render(withSidebarMap)}
              </div>
            </TabsContent>
            <TabsContent value="code" className="mt-4">
              <CodeBlock code={JSON.stringify(withSidebarMap, null, 2)} language="json" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Multi-Location */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Multi-Location Map</h2>
            <p className="text-muted-foreground">
              Perfect for store locators, showing multiple locations with detailed information cards.
            </p>
          </div>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <div className="bg-background rounded-lg border p-6">
                {render(multiLocationMap)}
              </div>
            </TabsContent>
            <TabsContent value="code" className="mt-4">
              <CodeBlock code={JSON.stringify(multiLocationMap, null, 2)} language="json" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Minimal */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Minimal Map</h2>
            <p className="text-muted-foreground">
              A clean, minimal map without controls - ideal for showing a single location.
            </p>
          </div>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <div className="bg-background rounded-lg border p-6">
                {render(minimalMap)}
              </div>
            </TabsContent>
            <TabsContent value="code" className="mt-4">
              <CodeBlock code={JSON.stringify(minimalMap, null, 2)} language="json" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Restaurant Example */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Restaurant Location</h2>
            <p className="text-muted-foreground">
              Perfect for restaurants and businesses, with custom info windows and actions.
            </p>
          </div>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <div className="bg-background rounded-lg border p-6">
                {render(restaurantMap)}
              </div>
            </TabsContent>
            <TabsContent value="code" className="mt-4">
              <CodeBlock code={JSON.stringify(restaurantMap, null, 2)} language="json" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Event Venue */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Event Venue</h2>
            <p className="text-muted-foreground">
              Display event locations with relevant information and call-to-actions.
            </p>
          </div>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <div className="bg-background rounded-lg border overflow-hidden">
                {render(eventVenueMap)}
              </div>
            </TabsContent>
            <TabsContent value="code" className="mt-4">
              <CodeBlock code={JSON.stringify(eventVenueMap, null, 2)} language="json" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Multiple Variants</h3>
              <p className="text-sm text-muted-foreground">
                Choose from embedded, fullscreen, with-sidebar, minimal, or multi-location layouts.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Custom Markers</h3>
              <p className="text-sm text-muted-foreground">
                Add custom markers with icons, info windows, and interactive actions.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Location Management</h3>
              <p className="text-sm text-muted-foreground">
                Display multiple locations with contact details, hours, and categories.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Map Controls</h3>
              <p className="text-sm text-muted-foreground">
                Configurable zoom, search, fullscreen, and map type controls.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Responsive Design</h3>
              <p className="text-sm text-muted-foreground">
                Fully responsive with mobile-optimized layouts and touch support.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Keyboard navigation, ARIA labels, and screen reader support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ShowcaseLayout>
  );
}

// Fix missing imports
const TabsList = Tabs.List;
const TabsTrigger = Tabs.Trigger;
const TabsContent = Tabs.Content;