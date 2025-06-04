import { useState } from "react";
import { Link } from "react-router-dom";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";

export function EventListingsShowcase() {
  usePageMetadata({
    title: "Event Listings Block - React Jedi",
    description: "Comprehensive event listings component with multiple display variants, search, filtering, and interactive features for showcasing events and activities.",
  });

  const [activeExample, setActiveExample] = useState("default");

  // Sample event data
  const sampleEvents = [
    {
      id: "1",
      title: "React Conference 2024",
      description: "The biggest React conference of the year featuring the latest updates, best practices, and networking opportunities with industry leaders.",
      startDate: "2024-06-15T09:00:00Z",
      endDate: "2024-06-17T17:00:00Z",
      location: { name: "San Francisco Convention Center", address: "747 Howard St, San Francisco, CA" },
      speakers: [
        { name: "Dan Abramov", title: "React Team Lead", image: "/api/placeholder/60/60" },
        { name: "Sophie Alpert", title: "Former React Team Manager", image: "/api/placeholder/60/60" }
      ],
      category: "Conference",
      registrationUrl: "#",
      capacity: 1000,
      registeredCount: 847,
      featured: true,
      tags: ["React", "JavaScript", "Frontend"],
      price: { amount: 299, currency: "USD" },
      image: "/api/placeholder/400/200",
      status: "upcoming"
    },
    {
      id: "2",
      title: "JavaScript Workshop: Advanced Patterns",
      description: "Deep dive into advanced JavaScript patterns, performance optimization techniques, and modern development practices.",
      startDate: "2024-05-20T14:00:00Z",
      endDate: "2024-05-20T18:00:00Z",
      location: { name: "Tech Hub Downtown", address: "456 Innovation Blvd, Austin, TX" },
      speakers: [{ name: "Kyle Simpson", title: "JavaScript Expert", image: "/api/placeholder/60/60" }],
      category: "Workshop",
      registrationUrl: "#",
      capacity: 50,
      registeredCount: 23,
      tags: ["JavaScript", "Performance", "Advanced"],
      price: { amount: 89, currency: "USD" },
      image: "/api/placeholder/400/200",
      status: "upcoming"
    },
    {
      id: "3",
      title: "Free Webinar: Getting Started with TypeScript",
      description: "Introduction to TypeScript for JavaScript developers. Perfect for beginners looking to add type safety to their projects.",
      startDate: "2024-05-25T19:00:00Z",
      endDate: "2024-05-25T20:30:00Z",
      location: { name: "Online", virtual: true },
      speakers: [{ name: "Anders Hejlsberg", title: "TypeScript Creator", image: "/api/placeholder/60/60" }],
      category: "Webinar",
      registrationUrl: "#",
      capacity: 500,
      registeredCount: 342,
      tags: ["TypeScript", "Beginner", "Free"],
      price: { free: true, amount: 0, currency: "USD" },
      image: "/api/placeholder/400/200",
      status: "upcoming"
    },
    {
      id: "4",
      title: "UX Design Meetup",
      description: "Monthly meetup for UX designers to share insights, discuss trends, and network with fellow professionals.",
      startDate: "2024-05-30T18:30:00Z",
      endDate: "2024-05-30T21:00:00Z",
      location: { name: "Design Studio Co-work", address: "123 Creative St, Austin, TX" },
      speakers: [
        { name: "Sarah Chen", title: "Senior UX Designer", image: "/api/placeholder/60/60" },
        { name: "Mike Rodriguez", title: "Design Director", image: "/api/placeholder/60/60" }
      ],
      category: "Meetup",
      registrationUrl: "#",
      capacity: 30,
      registeredCount: 18,
      tags: ["UX", "Design", "Networking"],
      price: { free: true, amount: 0, currency: "USD" },
      status: "upcoming"
    },
    {
      id: "5",
      title: "DevOps Summit 2024",
      description: "Comprehensive summit covering the latest in DevOps practices, cloud technologies, and automation tools.",
      startDate: "2024-07-10T08:00:00Z",
      endDate: "2024-07-12T18:00:00Z",
      location: { name: "Seattle Convention Center", address: "705 Pike St, Seattle, WA" },
      speakers: [
        { name: "Kelsey Hightower", title: "Kubernetes Expert", image: "/api/placeholder/60/60" },
        { name: "Charity Majors", title: "CTO at Honeycomb", image: "/api/placeholder/60/60" }
      ],
      category: "Conference",
      registrationUrl: "#",
      capacity: 800,
      registeredCount: 623,
      tags: ["DevOps", "Cloud", "Kubernetes"],
      price: { amount: 399, currency: "USD" },
      image: "/api/placeholder/400/200",
      status: "upcoming"
    },
    {
      id: "6",
      title: "AI/ML Workshop: Neural Networks Basics",
      description: "Hands-on workshop introducing neural networks and machine learning concepts for software developers.",
      startDate: "2024-06-05T10:00:00Z",
      endDate: "2024-06-05T16:00:00Z",
      location: { name: "University Tech Lab", address: "789 Research Ave, Boston, MA" },
      speakers: [{ name: "Dr. Emily Watson", title: "AI Research Scientist", image: "/api/placeholder/60/60" }],
      category: "Workshop",
      registrationUrl: "#",
      capacity: 25,
      registeredCount: 22,
      tags: ["AI", "Machine Learning", "Neural Networks"],
      price: { amount: 149, currency: "USD" },
      image: "/api/placeholder/400/200",
      status: "upcoming"
    }
  ];

  // Example configurations
  const examples = {
    default: {
      type: "EventListings",
      props: {
        events: sampleEvents.slice(0, 6),
        variant: "cards",
        showSearch: true,
        showFilters: true,
        showCountdown: true,
        showCapacity: true,
        animated: true
      }
    } as ComponentSpec,
    
    featured: {
      type: "EventListings", 
      props: {
        events: sampleEvents,
        variant: "featured",
        showSearch: true,
        showFilters: true,
        showCountdown: true,
        showCapacity: true,
        animated: true
      }
    } as ComponentSpec,
    
    timeline: {
      type: "EventListings",
      props: {
        events: sampleEvents.slice(0, 4),
        variant: "timeline",
        showSearch: false,
        showFilters: false,
        showCountdown: true,
        showCapacity: false,
        animated: true
      }
    } as ComponentSpec,
    
    grid: {
      type: "EventListings",
      props: {
        events: sampleEvents,
        variant: "grid",
        showSearch: true,
        showFilters: false,
        showCountdown: false,
        showCapacity: true,
        animated: true
      }
    } as ComponentSpec,
    
    withPagination: {
      type: "EventListings",
      props: {
        events: sampleEvents,
        variant: "cards",
        showPagination: true,
        itemsPerPage: 3,
        showSearch: true,
        showFilters: true,
        showCountdown: true,
        showCapacity: true,
        animated: true
      }
    } as ComponentSpec,
    
    minimal: {
      type: "EventListings",
      props: {
        events: sampleEvents.slice(0, 4),
        variant: "cards",
        showSearch: false,
        showFilters: false,
        showCountdown: false,
        showCapacity: false,
        animated: false
      }
    } as ComponentSpec
  };

  const exampleTabs = [
    { id: "default", label: "Default", description: "Standard card layout with all features" },
    { id: "featured", label: "Featured Event", description: "Highlights a featured event prominently" },
    { id: "timeline", label: "Timeline", description: "Chronological timeline layout" },
    { id: "grid", label: "Category Grid", description: "Events grouped by category" },
    { id: "withPagination", label: "With Pagination", description: "Paginated event listings" },
    { id: "minimal", label: "Minimal", description: "Clean layout without extra features" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            to="/showcase/blocks"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            ← Back to Blocks
          </Link>
          <Badge variant="secondary">Interactive Block</Badge>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Event Listings Block
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
          Comprehensive event listings component with multiple display variants including calendar view, 
          timeline format, featured events, search functionality, category filtering, and registration features 
          for conferences, webinars, workshops, and meetups.
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge>Card Layout</Badge>
          <Badge>Featured Events</Badge>
          <Badge>Timeline View</Badge>
          <Badge>Search & Filter</Badge>
          <Badge>Countdown Timers</Badge>
          <Badge>Capacity Indicators</Badge>
          <Badge>Registration Links</Badge>
          <Badge>Mobile Optimized</Badge>
          <Badge>Accessible</Badge>
        </div>
      </div>

      <Tabs value={activeExample} onValueChange={setActiveExample} className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Variants & Examples</h2>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            {exampleTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-xs lg:text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {exampleTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <ShowcaseWrapper
              title={tab.label}
              description={tab.description}
              code={JSON.stringify(examples[tab.id as keyof typeof examples], null, 2)}
            >
              {render(examples[tab.id as keyof typeof examples])}
            </ShowcaseWrapper>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Features & Capabilities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Multiple Layouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Choose from card grid, featured event, timeline, and category grid layouts to match your design needs.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Powerful search across event titles, descriptions, and locations with category filtering for easy discovery.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">⏰</span>
                Countdown Timers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Real-time countdown displays showing time remaining until event start with dynamic updates.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Capacity Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visual capacity indicators with progress bars and registration counts to show event popularity.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎤</span>
                Speaker Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Display speaker profiles with names, titles, bios, and photos for events and workshops.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                Virtual & Physical
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Support for both virtual and physical events with appropriate location displays and indicators.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Pricing Display
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Show event pricing with support for free events, paid tickets, and custom pricing information.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                Mobile Responsive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fully responsive design optimized for all screen sizes with touch-friendly interactions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Smooth Animations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Beautiful entrance animations, hover effects, and smooth transitions for enhanced user experience.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                Registration Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Direct registration buttons and links for seamless event signup and booking flow.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📄</span>
                Pagination Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built-in pagination for large event lists with configurable items per page.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">♿</span>
                Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Full keyboard navigation, ARIA labels, screen reader support, and semantic HTML structure.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold mb-2">💡 Pro Tip</h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Use the featured event variant to highlight your most important upcoming event, enable search and filtering 
          for better user experience with large event lists, and consider showing countdown timers to create urgency 
          for event registration.
        </p>
      </div>
    </div>
  );
}