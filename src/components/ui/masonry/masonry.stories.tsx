import type { Meta, StoryObj } from "@storybook/react";
import { Masonry } from "./masonry";
import { Card, CardContent } from "../card";
import { Image } from "../image";
import { Text } from "../text";
import { Badge } from "../badge";
import { Heading } from "../heading";
import { within, userEvent, expect, waitFor } from "@storybook/test";

/**
 * Masonry creates a Pinterest-style grid layout with beautiful animations and glassmorphic effects.
 * Perfect for showcasing dynamic content like images, cards, or any content with varying heights.
 */
const meta = {
  title: "Layout Components/Masonry",
  component: Masonry,
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: { type: "number" },
      description: "Number of columns in the grid",
    },
    gap: {
      control: { type: "number" },
      description: "Gap between items (in Tailwind units)",
    },
    glassmorphic: {
      control: { type: "boolean" },
      description: "Apply glassmorphic effects to items",
    },
    autoFit: {
      control: { type: "boolean" },
      description: "Auto-fit columns based on container width",
    },
  },
} satisfies Meta<typeof Masonry>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for the Pinterest-style showcase
const pinterestItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=400",
    title: "Modern Architecture",
    category: "Design",
    likes: 234,
    height: "h-64",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800",
    title: "Portrait Photography",
    category: "Art",
    likes: 567,
    height: "h-96",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600",
    title: "Mountain Vista",
    category: "Nature",
    likes: 892,
    height: "h-80",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&h=500",
    title: "Urban Minimalism",
    category: "Design",
    likes: 432,
    height: "h-72",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=700",
    title: "Abstract Art",
    category: "Art",
    likes: 678,
    height: "h-88",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1515191107209-c28698631303?w=600&h=450",
    title: "Beach Sunset",
    category: "Nature",
    likes: 1203,
    height: "h-64",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1481026469463-66327c86e544?w=600&h=900",
    title: "Fashion Editorial",
    category: "Fashion",
    likes: 345,
    height: "h-112",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600",
    title: "Professional Headshot",
    category: "Portrait",
    likes: 789,
    height: "h-80",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=500",
    title: "Culinary Art",
    category: "Food",
    likes: 521,
    height: "h-72",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?w=600&h=700",
    title: "Tech Innovation",
    category: "Technology",
    likes: 932,
    height: "h-88",
  },
];

/**
 * Default masonry grid showcasing various content types
 */
export const Default: Story = {
  args: {
    columns: 3,
    gap: 4,
  },
  render: (args) => (
    <Masonry {...args}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        let className = "h-56";
        if (i % 3 === 0) {
          className = "h-64";
        } else if (i % 2 === 0) {
          className = "h-48";
        }
        return (
          <Card key={i} className={className}>
            <CardContent className="p-6">
              <Heading level="h4">Card {i}</Heading>
              <Text className="mt-2 text-gray-600">
                This is content for card {i}. Masonry automatically arranges cards of different
                heights for optimal layout.
              </Text>
            </CardContent>
          </Card>
        );
      })}
    </Masonry>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify masonry grid is rendered
    await waitFor(() => {
      const cards = canvas.getAllByText(/Card \d/);
      expect(cards).toHaveLength(9);
    });
    
    // Verify different card heights
    const card3 = await canvas.findByText("Card 3");
    const card3Container = card3.closest('.h-64');
    expect(card3Container).toBeTruthy();
    
    const card2 = await canvas.findByText("Card 2");
    const card2Container = card2.closest('.h-48');
    expect(card2Container).toBeTruthy();
  },
};

/**
 * Pinterest-style image gallery with glassmorphic effects
 */
export const PinterestGallery: Story = {
  args: {
    columns: { base: 2, md: 3, lg: 4, xl: 5 },
    gap: 6,
    glassmorphic: true,
    animation: {
      duration: 0.5,
      stagger: 0.08,
    },
  },
  render: (args) => (
    <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-8 rounded-lg">
      <Masonry {...args}>
        {pinterestItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden transform transition-transform duration-300"
          >
            <div className="relative group">
              <Image
                src={item.image}
                alt={item.title}
                className={`w-full ${item.height} object-cover`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Badge className="mb-2" variant="secondary">
                  {item.category}
                </Badge>
                <Heading level="h6" className="text-white mb-1">
                  {item.title}
                </Heading>
                <Text className="text-white/80">❤️ {item.likes}</Text>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    
    // Verify Pinterest items are rendered
    await waitFor(() => {
      const items = pinterestItems.map(item => canvas.getByAltText(item.title));
      expect(items).toHaveLength(pinterestItems.length);
    });
    
    // Test hover interaction on first item
    const firstImage = await canvas.findByAltText(pinterestItems[0].title);
    const firstItem = firstImage.closest('.group');
    
    if (firstItem) {
      await user.hover(firstItem);
      
      // Verify hover reveals the overlay content - look within the hovered item
      await waitFor(() => {
        const categoryBadges = within(firstItem as HTMLElement).getAllByText(pinterestItems[0].category);
        expect(categoryBadges.length).toBeGreaterThan(0);
      });
    }
  },
};

/**
 * Responsive masonry grid with different column counts
 */
export const ResponsiveColumns: Story = {
  args: {
    columns: {
      base: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      "2xl": 6,
    },
    gap: 4,
  },
  render: (args) => (
    <Masonry {...args}>
      {Array.from({ length: 18 }, (_, i) => (
        <Card key={i} className="h-40">
          <CardContent className="flex items-center justify-center h-full">
            <Text className="text-2xl font-bold text-gray-400">{i + 1}</Text>
          </CardContent>
        </Card>
      ))}
    </Masonry>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all 18 items are rendered
    await waitFor(() => {
      const items = canvas.getAllByText(/^\d+$/);
      expect(items).toHaveLength(18);
    });
  },
};

/**
 * Auto-fit columns based on minimum width
 */
export const AutoFitColumns: Story = {
  args: {
    autoFit: true,
    minColWidth: "280px",
    gap: 6,
  },
  render: (args) => (
    <Masonry {...args}>
      {[
        { title: "Project Alpha", status: "Active", progress: 75 },
        { title: "Design System", status: "Completed", progress: 100 },
        { title: "API Integration", status: "In Progress", progress: 45 },
        { title: "Mobile App", status: "Planning", progress: 10 },
        { title: "Analytics Dashboard", status: "Active", progress: 60 },
        { title: "User Research", status: "Completed", progress: 100 },
      ].map((project, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <Heading level="h5">{project.title}</Heading>
              <Badge
                variant={(() => {
                  if (project.status === "Completed") return "default";
                  if (project.status === "Active") return "secondary";
                  return "outline";
                })()}
              >
                {project.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <Text>Progress</Text>
                <Text>{project.progress}%</Text>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </Masonry>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify project cards are rendered
    const projectAlpha = await canvas.findByText("Project Alpha");
    expect(projectAlpha).toBeInTheDocument();
    
    // Verify status badges
    const activeStatus = canvas.getAllByText("Active");
    expect(activeStatus).toHaveLength(2);
    
    const completedStatus = canvas.getAllByText("Completed");
    expect(completedStatus).toHaveLength(2);
    
    // Verify progress bars are rendered
    // Look for specific percentage values we know are in the data
    const percent75 = canvas.getByText("75%");
    const percent100 = canvas.getAllByText("100%");
    expect(percent75).toBeInTheDocument();
    expect(percent100).toHaveLength(2);
  },
};

/**
 * Masonry with custom item wrapper component
 */
export const CustomWrapper: Story = {
  args: {
    columns: 3,
    gap: 4,
    itemComponent: "article",
  },
  render: (args) => (
    <Masonry {...args}>
      {["News Article 1", "Blog Post", "Tutorial", "Case Study", "Review", "Guide"].map(
        (title, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Heading level="h5">{title}</Heading>
              <Text className="mt-2">
                This content is wrapped in an article element for better semantic HTML.
              </Text>
            </CardContent>
          </Card>
        )
      )}
    </Masonry>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify content items are rendered
    const newsArticle = await canvas.findByText("News Article 1");
    expect(newsArticle).toBeInTheDocument();
    
    const tutorial = await canvas.findByText("Tutorial");
    expect(tutorial).toBeInTheDocument();
    
    // Verify all 6 items are present
    const headings = canvas.getAllByRole("heading", { level: 5 });
    expect(headings).toHaveLength(6);
  },
};

/**
 * Masonry without animations (static layout)
 */
export const NoAnimation: Story = {
  args: {
    columns: 3,
    gap: 4,
    animation: {
      duration: 0,
      stagger: 0,
    },
  },
  render: (args) => (
    <Masonry {...args}>
      {Array.from({ length: 9 }, (_, i) => (
        <Card key={i} className="h-48">
          <CardContent className="flex items-center justify-center h-full">
            <Text>Static Item {i + 1}</Text>
          </CardContent>
        </Card>
      ))}
    </Masonry>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify static items are rendered immediately
    const items = canvas.getAllByText(/Static Item \d+/);
    expect(items).toHaveLength(9);
    
    // Verify first and last items
    expect(canvas.getByText("Static Item 1")).toBeInTheDocument();
    expect(canvas.getByText("Static Item 9")).toBeInTheDocument();
  },
};
