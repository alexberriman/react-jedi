import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { EventListings, type Event } from "./event-listings";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta: Meta<typeof EventListings> = {
  title: "Blocks/EventListings",
  component: EventListings,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive event listings component with multiple display variants, search, filtering, and interactive features for showcasing events and activities.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["cards", "calendar", "featured", "timeline", "grid"],
      description: "Display variant for the event listings",
    },
    showSearch: {
      control: "boolean",
      description: "Show search functionality",
    },
    showFilters: {
      control: "boolean",
      description: "Show category filters",
    },
    showPagination: {
      control: "boolean",
      description: "Enable pagination",
    },
    itemsPerPage: {
      control: "number",
      description: "Number of items per page when pagination is enabled",
    },
    showCountdown: {
      control: "boolean",
      description: "Show countdown timer to event start",
    },
    showCapacity: {
      control: "boolean",
      description: "Show event capacity indicators",
    },
    animated: {
      control: "boolean",
      description: "Enable animations",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EventListings>;

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "React Conference 2024",
    description:
      "The biggest React conference of the year featuring the latest updates, best practices, and networking opportunities with industry leaders.",
    startDate: "2024-06-15T09:00:00Z",
    endDate: "2024-06-17T17:00:00Z",
    location: {
      name: "San Francisco Convention Center",
      address: "747 Howard St, San Francisco, CA",
    },
    speakers: [
      {
        name: "Dan Abramov",
        title: "React Team Lead",
        image: "https://placehold.co/60x60/EEE/31343C?random=1",
      },
      {
        name: "Sophie Alpert",
        title: "Former React Team Manager",
        image: "https://placehold.co/60x60/EEE/31343C?random=2",
      },
    ],
    category: "Conference",
    registrationUrl: "#",
    capacity: 1000,
    registeredCount: 847,
    featured: true,
    tags: ["React", "JavaScript", "Frontend"],
    price: { amount: 299, currency: "USD" },
    image: "https://placehold.co/400x200/EEE/31343C?random=1",
    status: "upcoming",
  },
  {
    id: "2",
    title: "JavaScript Workshop: Advanced Patterns",
    description:
      "Deep dive into advanced JavaScript patterns, performance optimization techniques, and modern development practices.",
    startDate: "2024-05-20T14:00:00Z",
    endDate: "2024-05-20T18:00:00Z",
    location: { name: "Tech Hub Downtown", address: "456 Innovation Blvd, Austin, TX" },
    speakers: [
      {
        name: "Kyle Simpson",
        title: "JavaScript Expert",
        image: "https://placehold.co/60x60/EEE/31343C?random=3",
      },
    ],
    category: "Workshop",
    registrationUrl: "#",
    capacity: 50,
    registeredCount: 23,
    tags: ["JavaScript", "Performance", "Advanced"],
    price: { amount: 89, currency: "USD" },
    image: "https://placehold.co/400x200/EEE/31343C?random=2",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Free Webinar: Getting Started with TypeScript",
    description:
      "Introduction to TypeScript for JavaScript developers. Perfect for beginners looking to add type safety to their projects.",
    startDate: "2024-05-25T19:00:00Z",
    endDate: "2024-05-25T20:30:00Z",
    location: { name: "Online", virtual: true },
    speakers: [
      {
        name: "Anders Hejlsberg",
        title: "TypeScript Creator",
        image: "https://placehold.co/60x60/EEE/31343C?random=4",
      },
    ],
    category: "Webinar",
    registrationUrl: "#",
    capacity: 500,
    registeredCount: 342,
    tags: ["TypeScript", "Beginner", "Free"],
    price: { free: true, amount: 0, currency: "USD" },
    image: "https://placehold.co/400x200/EEE/31343C?random=3",
    status: "upcoming",
  },
  {
    id: "4",
    title: "UX Design Meetup",
    description:
      "Monthly meetup for UX designers to share insights, discuss trends, and network with fellow professionals.",
    startDate: "2024-05-30T18:30:00Z",
    endDate: "2024-05-30T21:00:00Z",
    location: { name: "Design Studio Co-work", address: "123 Creative St, Austin, TX" },
    speakers: [
      {
        name: "Sarah Chen",
        title: "Senior UX Designer",
        image: "https://placehold.co/60x60/EEE/31343C?random=5",
      },
      {
        name: "Mike Rodriguez",
        title: "Design Director",
        image: "https://placehold.co/60x60/EEE/31343C?random=6",
      },
    ],
    category: "Meetup",
    registrationUrl: "#",
    capacity: 30,
    registeredCount: 18,
    tags: ["UX", "Design", "Networking"],
    price: { free: true, amount: 0, currency: "USD" },
    status: "upcoming",
  },
  {
    id: "5",
    title: "DevOps Summit 2024",
    description:
      "Comprehensive summit covering the latest in DevOps practices, cloud technologies, and automation tools.",
    startDate: "2024-07-10T08:00:00Z",
    endDate: "2024-07-12T18:00:00Z",
    location: { name: "Seattle Convention Center", address: "705 Pike St, Seattle, WA" },
    speakers: [
      {
        name: "Kelsey Hightower",
        title: "Kubernetes Expert",
        image: "https://placehold.co/60x60/EEE/31343C?random=7",
      },
      {
        name: "Charity Majors",
        title: "CTO at Honeycomb",
        image: "https://placehold.co/60x60/EEE/31343C?random=8",
      },
    ],
    category: "Conference",
    registrationUrl: "#",
    capacity: 800,
    registeredCount: 623,
    tags: ["DevOps", "Cloud", "Kubernetes"],
    price: { amount: 399, currency: "USD" },
    image: "https://placehold.co/400x200/EEE/31343C?random=4",
    status: "upcoming",
  },
  {
    id: "6",
    title: "AI/ML Workshop: Neural Networks Basics",
    description:
      "Hands-on workshop introducing neural networks and machine learning concepts for software developers.",
    startDate: "2024-06-05T10:00:00Z",
    endDate: "2024-06-05T16:00:00Z",
    location: { name: "University Tech Lab", address: "789 Research Ave, Boston, MA" },
    speakers: [
      {
        name: "Dr. Emily Watson",
        title: "AI Research Scientist",
        image: "https://placehold.co/60x60/EEE/31343C?random=9",
      },
    ],
    category: "Workshop",
    registrationUrl: "#",
    capacity: 25,
    registeredCount: 22,
    tags: ["AI", "Machine Learning", "Neural Networks"],
    price: { amount: 149, currency: "USD" },
    image: "https://placehold.co/400x200/EEE/31343C?random=5",
    status: "upcoming",
  },
  {
    id: "7",
    title: "Startup Pitch Night",
    description:
      "Monthly event where early-stage startups pitch their ideas to investors and fellow entrepreneurs.",
    startDate: "2024-06-08T19:00:00Z",
    endDate: "2024-06-08T22:00:00Z",
    location: { name: "Innovation Hub", address: "321 Startup Blvd, Denver, CO" },
    category: "Networking",
    registrationUrl: "#",
    capacity: 100,
    registeredCount: 67,
    tags: ["Startup", "Pitch", "Networking", "Investment"],
    price: { amount: 25, currency: "USD" },
    status: "upcoming",
  },
  {
    id: "8",
    title: "Cybersecurity Webinar: Zero Trust Architecture",
    description:
      "Expert discussion on implementing zero trust security models in modern enterprise environments.",
    startDate: "2024-06-12T15:00:00Z",
    endDate: "2024-06-12T16:30:00Z",
    location: { name: "Online", virtual: true },
    speakers: [
      {
        name: "Alex Thompson",
        title: "Security Architect",
        image: "https://placehold.co/60x60/EEE/31343C?random=10",
      },
    ],
    category: "Webinar",
    registrationUrl: "#",
    capacity: 300,
    registeredCount: 156,
    tags: ["Cybersecurity", "Zero Trust", "Enterprise"],
    price: { free: true, amount: 0, currency: "USD" },
    image: "https://placehold.co/400x200/EEE/31343C?random=6",
    status: "upcoming",
  },
];

export const Default: Story = enhanceStoryForDualMode<typeof EventListings>({
  args: {
    events: sampleEvents,
    variant: "cards",
    showSearch: true,
    showFilters: true,
    showCountdown: true,
    showCapacity: true,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify search and filter controls
    expect(canvas.getByPlaceholderText("Search events...")).toBeInTheDocument();
    expect(canvas.getByText("All Categories")).toBeInTheDocument();
    
    // Verify events are rendered
    expect(canvas.getByText("React Conference 2024")).toBeInTheDocument();
    expect(canvas.getByText("JavaScript Workshop: Advanced Patterns")).toBeInTheDocument();
    expect(canvas.getByText("Free Webinar: Getting Started with TypeScript")).toBeInTheDocument();
    
    // Verify event details
    expect(canvas.getByText("The biggest React conference of the year featuring the latest updates, best practices, and networking opportunities with industry leaders.")).toBeInTheDocument();
    
    // Verify speakers
    expect(canvas.getByText("Dan Abramov, Sophie Alpert")).toBeInTheDocument();
    
    // Verify featured badge
    expect(canvas.getByText("Featured")).toBeInTheDocument();
    
    // Verify register buttons
    const registerButtons = canvas.getAllByText("Register");
    expect(registerButtons.length).toBeGreaterThan(0);
  },
});

export const FeaturedEvent: Story = enhanceStoryForDualMode<typeof EventListings>({
  args: {
    events: sampleEvents,
    variant: "featured",
    showSearch: true,
    showFilters: true,
    showCountdown: true,
    showCapacity: true,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Features a prominent hero-style display for the featured event, with remaining events in a grid below.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify featured event card
    expect(canvas.getByText("Featured Event")).toBeInTheDocument();
    expect(canvas.getByText("React Conference 2024")).toBeInTheDocument();
    
    // Verify featured event details
    expect(canvas.getByText("$299")).toBeInTheDocument();
    expect(canvas.getByText("Register Now")).toBeInTheDocument();
    
    // Verify countdown section if visible
    const countdownText = canvas.queryByText("Event starts in:");
    if (countdownText) {
      expect(countdownText).toBeInTheDocument();
    }
    
    // Verify other events are shown
    expect(canvas.getByText("JavaScript Workshop: Advanced Patterns")).toBeInTheDocument();
    expect(canvas.getByText("Free Webinar: Getting Started with TypeScript")).toBeInTheDocument();
  },
});

export const TimelineView: Story = enhanceStoryForDualMode<typeof EventListings>({
  args: {
    events: sampleEvents.slice(0, 5),
    variant: "timeline",
    showSearch: false,
    showFilters: false,
    showCountdown: true,
    showCapacity: false,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Timeline layout showing events in chronological order with alternating card positions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify events are displayed in timeline format
    expect(canvas.getByText("React Conference 2024")).toBeInTheDocument();
    expect(canvas.getByText("JavaScript Workshop: Advanced Patterns")).toBeInTheDocument();
    expect(canvas.getByText("Free Webinar: Getting Started with TypeScript")).toBeInTheDocument();
    expect(canvas.getByText("UX Design Meetup")).toBeInTheDocument();
    expect(canvas.getByText("DevOps Summit 2024")).toBeInTheDocument();
    
    // Verify locations are shown
    expect(canvas.getByText("San Francisco Convention Center")).toBeInTheDocument();
    expect(canvas.getByText("Tech Hub Downtown")).toBeInTheDocument();
    expect(canvas.getByText("Online")).toBeInTheDocument();
  },
});

export const CategoryGrid: Story = enhanceStoryForDualMode<typeof EventListings>({
  args: {
    events: sampleEvents,
    variant: "grid",
    showSearch: true,
    showFilters: false,
    showCountdown: false,
    showCapacity: true,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Groups events by category with dedicated sections for each type of event.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify category headers
    expect(canvas.getByRole("heading", { name: "Conference" })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { name: "Workshop" })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { name: "Webinar" })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { name: "Meetup" })).toBeInTheDocument();
    
    // Verify events are grouped properly
    expect(canvas.getByText("React Conference 2024")).toBeInTheDocument();
    expect(canvas.getByText("JavaScript Workshop: Advanced Patterns")).toBeInTheDocument();
    expect(canvas.getByText("Free Webinar: Getting Started with TypeScript")).toBeInTheDocument();
    
    // Verify capacity indicators
    const capacityTexts = canvas.queryAllByText(/Registered/);
    expect(capacityTexts.length).toBeGreaterThan(0);
  },
});

export const WithPagination: Story = enhanceStoryForDualMode<typeof EventListings>({
  args: {
    events: sampleEvents,
    variant: "cards",
    showPagination: true,
    itemsPerPage: 4,
    showSearch: true,
    showFilters: true,
    showCountdown: true,
    showCapacity: true,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Enables pagination to break large event lists into manageable pages.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify pagination controls
    expect(canvas.getByText("Previous")).toBeInTheDocument();
    expect(canvas.getByText("Next")).toBeInTheDocument();
    expect(canvas.getByText(/Page 1 of/)).toBeInTheDocument();
    
    // Verify only 4 events are shown on first page
    const registerButtons = canvas.getAllByText("Register");
    expect(registerButtons.length).toBe(4);
  },
});

export const MinimalCards: Story = enhanceStoryForDualMode<typeof EventListings>({
  args: {
    events: sampleEvents,
    variant: "cards",
    showSearch: false,
    showFilters: false,
    showCountdown: false,
    showCapacity: false,
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Clean, minimal card layout without extra features for simple event displays.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify events are rendered without extra features
    expect(canvas.getByText("React Conference 2024")).toBeInTheDocument();
    expect(canvas.getByText("JavaScript Workshop: Advanced Patterns")).toBeInTheDocument();
    
    // Verify no search or filters
    expect(canvas.queryByPlaceholderText("Search events...")).not.toBeInTheDocument();
    expect(canvas.queryByText("All Categories")).not.toBeInTheDocument();
    
    // Verify prices are shown
    expect(canvas.getByText("$299")).toBeInTheDocument();
    expect(canvas.getByText("$89")).toBeInTheDocument();
    expect(canvas.getAllByText("Free").length).toBeGreaterThan(0);
  },
});

export const WebinarsOnly: Story = enhanceStoryForDualMode<typeof EventListings>({
  args: {
    events: sampleEvents.filter((event) => event.category === "Webinar"),
    variant: "cards",
    showSearch: true,
    showFilters: false,
    showCountdown: true,
    showCapacity: true,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Filtered view showing only webinar events, useful for specialized event pages.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify only webinar events are shown
    expect(canvas.getByText("Free Webinar: Getting Started with TypeScript")).toBeInTheDocument();
    expect(canvas.getByText("Cybersecurity Webinar: Zero Trust Architecture")).toBeInTheDocument();
    
    // Verify category badges
    const webinarBadges = canvas.getAllByText("Webinar");
    expect(webinarBadges.length).toBe(2);
    
    // Verify all are marked as online
    const onlineIndicators = canvas.getAllByText("Online");
    expect(onlineIndicators.length).toBe(2);
  },
});

export const ConferenceFocus: Story = enhanceStoryForDualMode<typeof EventListings>({
  args: {
    events: sampleEvents.filter((event) => event.category === "Conference"),
    variant: "featured",
    showSearch: false,
    showFilters: false,
    showCountdown: true,
    showCapacity: true,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Conference-focused layout highlighting major conference events.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify conference events
    expect(canvas.getByText("React Conference 2024")).toBeInTheDocument();
    expect(canvas.getByText("DevOps Summit 2024")).toBeInTheDocument();
    
    // Verify featured event display
    expect(canvas.getByText("Featured Event")).toBeInTheDocument();
    
    // Verify locations
    expect(canvas.getByText("San Francisco Convention Center")).toBeInTheDocument();
    expect(canvas.getByText("Seattle Convention Center")).toBeInTheDocument();
  },
});

export const WithCustomEvents: Story = enhanceStoryForDualMode<typeof EventListings>({
  args: {
    events: [
      {
        id: "custom-1",
        title: "Product Launch Event",
        description: "Join us for the official launch of our revolutionary new product.",
        startDate: "2024-08-15T18:00:00Z",
        location: { name: "Tech Theater", address: "456 Innovation Dr, San Jose, CA" },
        category: "Launch",
        featured: true,
        price: { free: true, amount: 0, currency: "USD" },
        capacity: 200,
        registeredCount: 45,
        status: "upcoming",
        speakers: [{ name: "CEO Jane Smith", title: "Chief Executive Officer" }],
      },
      {
        id: "custom-2",
        title: "Team Building Workshop",
        description:
          "Interactive workshop focused on improving team collaboration and communication.",
        startDate: "2024-07-20T14:00:00Z",
        location: { name: "Corporate Retreat Center", virtual: false },
        category: "Team Building",
        price: { amount: 75, currency: "USD" },
        capacity: 40,
        registeredCount: 28,
        status: "upcoming",
      },
    ],
    variant: "cards",
    showSearch: true,
    showFilters: true,
    showCountdown: true,
    showCapacity: true,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example with custom event data for specialized use cases like product launches and team events.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify custom events
    expect(canvas.getByText("Product Launch Event")).toBeInTheDocument();
    expect(canvas.getByText("Team Building Workshop")).toBeInTheDocument();
    
    // Verify custom categories
    expect(canvas.getByText("Launch")).toBeInTheDocument();
    expect(canvas.getByText("Team Building")).toBeInTheDocument();
    
    // Verify featured badge on launch event
    expect(canvas.getByText("Featured")).toBeInTheDocument();
    
    // Verify capacity display
    expect(canvas.getByText("45 / 200")).toBeInTheDocument();
    expect(canvas.getByText("28 / 40")).toBeInTheDocument();
  },
});

export const InteractiveExample: Story = enhanceStoryForDualMode<typeof EventListings>({
  args: {
    events: sampleEvents,
    variant: "cards",
    showSearch: true,
    showFilters: true,
    showCountdown: true,
    showCapacity: true,
    animated: true,
    onEventClick: (event) => {
      console.log("Event clicked:", event.title);
      alert(`Viewing details for: ${event.title}`);
    },
    onRegister: (event) => {
      console.log("Register clicked:", event.title);
      alert(`Registering for: ${event.title}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example with click handlers for event details and registration actions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify events are interactive
    expect(canvas.getByText("React Conference 2024")).toBeInTheDocument();
    
    // Verify register buttons exist
    const registerButtons = canvas.getAllByText("Register");
    expect(registerButtons.length).toBeGreaterThan(0);
  },
});

export const EmptyState: Story = enhanceStoryForDualMode<typeof EventListings>({
  args: {
    events: [],
    variant: "cards",
    showSearch: true,
    showFilters: true,
    showCountdown: true,
    showCapacity: true,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state when no events are available or match search criteria.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify empty state message
    expect(canvas.getByText("No events found matching your criteria.")).toBeInTheDocument();
    
    // Verify search and filter controls still render
    expect(canvas.getByPlaceholderText("Search events...")).toBeInTheDocument();
    expect(canvas.getByText("All Categories")).toBeInTheDocument();
  },
});
