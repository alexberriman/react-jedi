import type { Meta, StoryObj } from "@storybook/react-vite";
import { Masonry } from "./masonry";
import { Card, CardContent } from "../card";
import { Image } from "../image";
import { Text } from "../text";
import { Badge } from "../badge";
import { Heading } from "../heading";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { motion } from "framer-motion";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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
    image: "https://placehold.co/600x400/EEE/31343C",
    title: "Modern Architecture",
    category: "Design",
    likes: 234,
    height: "h-64",
  },
  {
    id: 2,
    image: "https://placehold.co/600x800/EEE/31343C",
    title: "Portrait Photography",
    category: "Art",
    likes: 567,
    height: "h-96",
  },
  {
    id: 3,
    image: "https://placehold.co/600x600/EEE/31343C",
    title: "Mountain Vista",
    category: "Nature",
    likes: 892,
    height: "h-80",
  },
  {
    id: 4,
    image: "https://placehold.co/600x500/EEE/31343C",
    title: "Urban Minimalism",
    category: "Design",
    likes: 432,
    height: "h-72",
  },
  {
    id: 5,
    image: "https://placehold.co/600x700/EEE/31343C",
    title: "Abstract Art",
    category: "Art",
    likes: 678,
    height: "h-88",
  },
  {
    id: 6,
    image: "https://placehold.co/600x450/EEE/31343C",
    title: "Beach Sunset",
    category: "Nature",
    likes: 1203,
    height: "h-64",
  },
  {
    id: 7,
    image: "https://placehold.co/600x900/EEE/31343C",
    title: "Fashion Editorial",
    category: "Fashion",
    likes: 345,
    height: "h-112",
  },
  {
    id: 8,
    image: "https://placehold.co/600x600/EEE/31343C",
    title: "Professional Headshot",
    category: "Portrait",
    likes: 789,
    height: "h-80",
  },
  {
    id: 9,
    image: "https://placehold.co/600x500/EEE/31343C",
    title: "Culinary Art",
    category: "Food",
    likes: 521,
    height: "h-72",
  },
  {
    id: 10,
    image: "https://placehold.co/600x700/EEE/31343C",
    title: "Tech Innovation",
    category: "Technology",
    likes: 932,
    height: "h-88",
  },
];

/**
 * Default masonry grid showcasing various content types
 */
export const Default: Story = enhanceStoryForDualMode<typeof Masonry>(
  {
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
      const card3Container = card3.closest(".h-64");
      expect(card3Container).toBeTruthy();

      const card2 = await canvas.findByText("Card 2");
      const card2Container = card2.closest(".h-48");
      expect(card2Container).toBeTruthy();
    },
  },
  {
    renderSpec: {
      type: "Masonry",
      columns: 3,
      gap: 4,
      children: [
        {
          type: "Card",
          className: "h-56",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h4",
                children: "Card 1"
              },
              {
                type: "Text",
                className: "mt-2 text-gray-600",
                children: "This is content for card 1. Masonry automatically arranges cards of different heights for optimal layout."
              }
            ]
          }
        },
        {
          type: "Card",
          className: "h-48",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h4",
                children: "Card 2"
              },
              {
                type: "Text",
                className: "mt-2 text-gray-600",
                children: "This is content for card 2. Masonry automatically arranges cards of different heights for optimal layout."
              }
            ]
          }
        },
        {
          type: "Card",
          className: "h-64",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h4",
                children: "Card 3"
              },
              {
                type: "Text",
                className: "mt-2 text-gray-600",
                children: "This is content for card 3. Masonry automatically arranges cards of different heights for optimal layout."
              }
            ]
          }
        },
        {
          type: "Card",
          className: "h-48",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h4",
                children: "Card 4"
              },
              {
                type: "Text",
                className: "mt-2 text-gray-600",
                children: "This is content for card 4. Masonry automatically arranges cards of different heights for optimal layout."
              }
            ]
          }
        },
        {
          type: "Card",
          className: "h-56",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h4",
                children: "Card 5"
              },
              {
                type: "Text",
                className: "mt-2 text-gray-600",
                children: "This is content for card 5. Masonry automatically arranges cards of different heights for optimal layout."
              }
            ]
          }
        },
        {
          type: "Card",
          className: "h-64",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h4",
                children: "Card 6"
              },
              {
                type: "Text",
                className: "mt-2 text-gray-600",
                children: "This is content for card 6. Masonry automatically arranges cards of different heights for optimal layout."
              }
            ]
          }
        },
        {
          type: "Card",
          className: "h-56",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h4",
                children: "Card 7"
              },
              {
                type: "Text",
                className: "mt-2 text-gray-600",
                children: "This is content for card 7. Masonry automatically arranges cards of different heights for optimal layout."
              }
            ]
          }
        },
        {
          type: "Card",
          className: "h-48",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h4",
                children: "Card 8"
              },
              {
                type: "Text",
                className: "mt-2 text-gray-600",
                children: "This is content for card 8. Masonry automatically arranges cards of different heights for optimal layout."
              }
            ]
          }
        },
        {
          type: "Card",
          className: "h-64",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h4",
                children: "Card 9"
              },
              {
                type: "Text",
                className: "mt-2 text-gray-600",
                children: "This is content for card 9. Masonry automatically arranges cards of different heights for optimal layout."
              }
            ]
          }
        }
      ]
    }
  }
);

/**
 * Pinterest-style image gallery with glassmorphic effects
 */
export const PinterestGallery: Story = enhanceStoryForDualMode<typeof Masonry>(
  {
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
            <motion.div
              key={item.id}
              className="rounded-xl overflow-hidden"
              whileHover="hover"
              initial="initial"
              animate="initial"
            >
              <motion.div className="relative group">
                <motion.div
                  className={`w-full ${item.height} overflow-hidden`}
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.1 },
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <Image src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  variants={{
                    initial: { y: "100%", opacity: 0 },
                    hover: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                >
                  <Badge className="mb-2" variant="secondary">
                    {item.category}
                  </Badge>
                  <Heading level="h6" className="text-white mb-1">
                    {item.title}
                  </Heading>
                  <Text className="text-white/80">❤️ {item.likes}</Text>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </Masonry>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Verify Pinterest items are rendered
      await waitFor(() => {
        // In React mode, all items should be rendered
        // In SDUI mode, we check if at least the first 3 are rendered
        const itemsToCheck = pinterestItems.length > 3 ? pinterestItems.slice(0, 3) : pinterestItems;
        for (const item of itemsToCheck) {
          expect(canvas.getByAltText(item.title)).toBeInTheDocument();
        }
      });

      // Test hover interaction on first item
      const firstImage = await canvas.findByAltText(pinterestItems[0].title);
      const firstItem = firstImage.closest(".group");

      if (firstItem) {
        await user.hover(firstItem);

        // Verify hover reveals the overlay content - look within the hovered item
        await waitFor(() => {
          const categoryBadges = within(firstItem as HTMLElement).getAllByText(
            pinterestItems[0].category
          );
          expect(categoryBadges.length).toBeGreaterThan(0);
        });
      }
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-8 rounded-lg",
      children: {
        type: "Masonry",
        columns: { base: 2, md: 3, lg: 4, xl: 5 },
        gap: 6,
        glassmorphic: true,
        animation: {
          duration: 0.5,
          stagger: 0.08,
        },
        children: [
          {
            type: "Box",
            className: "rounded-xl overflow-hidden relative group",
            children: [
              {
                type: "Box",
                className: "w-full h-64 overflow-hidden",
                children: {
                  type: "Image",
                  src: "https://placehold.co/600x400/EEE/31343C",
                  alt: "Modern Architecture",
                  className: "w-full h-full object-cover",
                },
              },
              {
                type: "Box",
                className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              },
              {
                type: "Box",
                className: "absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400",
                children: [
                  {
                    type: "Badge",
                    className: "mb-2",
                    variant: "secondary",
                    children: "Design",
                  },
                  {
                    type: "Heading",
                    level: "h6",
                    className: "text-white mb-1",
                    children: "Modern Architecture",
                  },
                  {
                    type: "Text",
                    className: "text-white/80",
                    children: "❤️ 234",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "rounded-xl overflow-hidden relative group",
            children: [
              {
                type: "Box",
                className: "w-full h-96 overflow-hidden",
                children: {
                  type: "Image",
                  src: "https://placehold.co/600x800/EEE/31343C",
                  alt: "Portrait Photography",
                  className: "w-full h-full object-cover",
                },
              },
              {
                type: "Box",
                className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              },
              {
                type: "Box",
                className: "absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400",
                children: [
                  {
                    type: "Badge",
                    className: "mb-2",
                    variant: "secondary",
                    children: "Art",
                  },
                  {
                    type: "Heading",
                    level: "h6",
                    className: "text-white mb-1",
                    children: "Portrait Photography",
                  },
                  {
                    type: "Text",
                    className: "text-white/80",
                    children: "❤️ 567",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "rounded-xl overflow-hidden relative group",
            children: [
              {
                type: "Box",
                className: "w-full h-80 overflow-hidden",
                children: {
                  type: "Image",
                  src: "https://placehold.co/600x600/EEE/31343C",
                  alt: "Mountain Vista",
                  className: "w-full h-full object-cover",
                },
              },
              {
                type: "Box",
                className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              },
              {
                type: "Box",
                className: "absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400",
                children: [
                  {
                    type: "Badge",
                    className: "mb-2",
                    variant: "secondary",
                    children: "Nature",
                  },
                  {
                    type: "Heading",
                    level: "h6",
                    className: "text-white mb-1",
                    children: "Mountain Vista",
                  },
                  {
                    type: "Text",
                    className: "text-white/80",
                    children: "❤️ 892",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "rounded-xl overflow-hidden relative group",
            children: [
              {
                type: "Box",
                className: "w-full h-72 overflow-hidden",
                children: {
                  type: "Image",
                  src: "https://placehold.co/600x500/EEE/31343C",
                  alt: "Urban Minimalism",
                  className: "w-full h-full object-cover",
                },
              },
              {
                type: "Box",
                className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              },
              {
                type: "Box",
                className: "absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400",
                children: [
                  {
                    type: "Badge",
                    className: "mb-2",
                    variant: "secondary",
                    children: "Design",
                  },
                  {
                    type: "Heading",
                    level: "h6",
                    className: "text-white mb-1",
                    children: "Urban Minimalism",
                  },
                  {
                    type: "Text",
                    className: "text-white/80",
                    children: "❤️ 432",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "rounded-xl overflow-hidden relative group",
            children: [
              {
                type: "Box",
                className: "w-full h-88 overflow-hidden",
                children: {
                  type: "Image",
                  src: "https://placehold.co/600x700/EEE/31343C",
                  alt: "Abstract Art",
                  className: "w-full h-full object-cover",
                },
              },
              {
                type: "Box",
                className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              },
              {
                type: "Box",
                className: "absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400",
                children: [
                  {
                    type: "Badge",
                    className: "mb-2",
                    variant: "secondary",
                    children: "Art",
                  },
                  {
                    type: "Heading",
                    level: "h6",
                    className: "text-white mb-1",
                    children: "Abstract Art",
                  },
                  {
                    type: "Text",
                    className: "text-white/80",
                    children: "❤️ 678",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "rounded-xl overflow-hidden relative group",
            children: [
              {
                type: "Box",
                className: "w-full h-64 overflow-hidden",
                children: {
                  type: "Image",
                  src: "https://placehold.co/600x450/EEE/31343C",
                  alt: "Beach Sunset",
                  className: "w-full h-full object-cover",
                },
              },
              {
                type: "Box",
                className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              },
              {
                type: "Box",
                className: "absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400",
                children: [
                  {
                    type: "Badge",
                    className: "mb-2",
                    variant: "secondary",
                    children: "Nature",
                  },
                  {
                    type: "Heading",
                    level: "h6",
                    className: "text-white mb-1",
                    children: "Beach Sunset",
                  },
                  {
                    type: "Text",
                    className: "text-white/80",
                    children: "❤️ 1203",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "rounded-xl overflow-hidden relative group",
            children: [
              {
                type: "Box",
                className: "w-full h-112 overflow-hidden",
                children: {
                  type: "Image",
                  src: "https://placehold.co/600x900/EEE/31343C",
                  alt: "Fashion Editorial",
                  className: "w-full h-full object-cover",
                },
              },
              {
                type: "Box",
                className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              },
              {
                type: "Box",
                className: "absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400",
                children: [
                  {
                    type: "Badge",
                    className: "mb-2",
                    variant: "secondary",
                    children: "Fashion",
                  },
                  {
                    type: "Heading",
                    level: "h6",
                    className: "text-white mb-1",
                    children: "Fashion Editorial",
                  },
                  {
                    type: "Text",
                    className: "text-white/80",
                    children: "❤️ 345",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "rounded-xl overflow-hidden relative group",
            children: [
              {
                type: "Box",
                className: "w-full h-80 overflow-hidden",
                children: {
                  type: "Image",
                  src: "https://placehold.co/600x600/EEE/31343C",
                  alt: "Professional Headshot",
                  className: "w-full h-full object-cover",
                },
              },
              {
                type: "Box",
                className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              },
              {
                type: "Box",
                className: "absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400",
                children: [
                  {
                    type: "Badge",
                    className: "mb-2",
                    variant: "secondary",
                    children: "Portrait",
                  },
                  {
                    type: "Heading",
                    level: "h6",
                    className: "text-white mb-1",
                    children: "Professional Headshot",
                  },
                  {
                    type: "Text",
                    className: "text-white/80",
                    children: "❤️ 789",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "rounded-xl overflow-hidden relative group",
            children: [
              {
                type: "Box",
                className: "w-full h-72 overflow-hidden",
                children: {
                  type: "Image",
                  src: "https://placehold.co/600x500/EEE/31343C",
                  alt: "Culinary Art",
                  className: "w-full h-full object-cover",
                },
              },
              {
                type: "Box",
                className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              },
              {
                type: "Box",
                className: "absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400",
                children: [
                  {
                    type: "Badge",
                    className: "mb-2",
                    variant: "secondary",
                    children: "Food",
                  },
                  {
                    type: "Heading",
                    level: "h6",
                    className: "text-white mb-1",
                    children: "Culinary Art",
                  },
                  {
                    type: "Text",
                    className: "text-white/80",
                    children: "❤️ 521",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "rounded-xl overflow-hidden relative group",
            children: [
              {
                type: "Box",
                className: "w-full h-88 overflow-hidden",
                children: {
                  type: "Image",
                  src: "https://placehold.co/600x700/EEE/31343C",
                  alt: "Tech Innovation",
                  className: "w-full h-full object-cover",
                },
              },
              {
                type: "Box",
                className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              },
              {
                type: "Box",
                className: "absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400",
                children: [
                  {
                    type: "Badge",
                    className: "mb-2",
                    variant: "secondary",
                    children: "Technology",
                  },
                  {
                    type: "Heading",
                    level: "h6",
                    className: "text-white mb-1",
                    children: "Tech Innovation",
                  },
                  {
                    type: "Text",
                    className: "text-white/80",
                    children: "❤️ 932",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  }
);

/**
 * Responsive masonry grid with different column counts
 */
export const ResponsiveColumns: Story = enhanceStoryForDualMode<typeof Masonry>(
  {
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
  },
  {
    renderSpec: {
      type: "Masonry",
      columns: {
        base: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
        "2xl": 6,
      },
      gap: 4,
      children: Array.from({ length: 18 }, (_, i) => ({
        type: "Card",
        className: "h-40",
        children: {
          type: "CardContent",
          className: "flex items-center justify-center h-full",
          children: {
            type: "Text",
            className: "text-2xl font-bold text-gray-400",
            children: `${i + 1}`,
          },
        },
      })),
    },
  }
);

/**
 * Auto-fit columns based on minimum width
 */
export const AutoFitColumns: Story = enhanceStoryForDualMode<typeof Masonry>(
  {
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
  },
  {
    renderSpec: {
      type: "Masonry",
      autoFit: true,
      minColWidth: "280px",
      gap: 6,
      children: [
        {
          type: "Card",
          className: "overflow-hidden",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Flex",
                justify: "between",
                align: "start",
                className: "mb-4",
                children: [
                  {
                    type: "Heading",
                    level: "h5",
                    children: "Project Alpha",
                  },
                  {
                    type: "Badge",
                    variant: "secondary",
                    children: "Active",
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  {
                    type: "Flex",
                    justify: "between",
                    className: "text-sm",
                    children: [
                      {
                        type: "Text",
                        children: "Progress",
                      },
                      {
                        type: "Text",
                        children: "75%",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "w-full bg-gray-200 rounded-full h-2",
                    children: {
                      type: "Box",
                      className: "bg-primary h-2 rounded-full transition-all duration-300",
                      style: { width: "75%" },
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          type: "Card",
          className: "overflow-hidden",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Flex",
                justify: "between",
                align: "start",
                className: "mb-4",
                children: [
                  {
                    type: "Heading",
                    level: "h5",
                    children: "Design System",
                  },
                  {
                    type: "Badge",
                    variant: "default",
                    children: "Completed",
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  {
                    type: "Flex",
                    justify: "between",
                    className: "text-sm",
                    children: [
                      {
                        type: "Text",
                        children: "Progress",
                      },
                      {
                        type: "Text",
                        children: "100%",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "w-full bg-gray-200 rounded-full h-2",
                    children: {
                      type: "Box",
                      className: "bg-primary h-2 rounded-full transition-all duration-300",
                      style: { width: "100%" },
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          type: "Card",
          className: "overflow-hidden",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Flex",
                justify: "between",
                align: "start",
                className: "mb-4",
                children: [
                  {
                    type: "Heading",
                    level: "h5",
                    children: "API Integration",
                  },
                  {
                    type: "Badge",
                    variant: "outline",
                    children: "In Progress",
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  {
                    type: "Flex",
                    justify: "between",
                    className: "text-sm",
                    children: [
                      {
                        type: "Text",
                        children: "Progress",
                      },
                      {
                        type: "Text",
                        children: "45%",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "w-full bg-gray-200 rounded-full h-2",
                    children: {
                      type: "Box",
                      className: "bg-primary h-2 rounded-full transition-all duration-300",
                      style: { width: "45%" },
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          type: "Card",
          className: "overflow-hidden",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Flex",
                justify: "between",
                align: "start",
                className: "mb-4",
                children: [
                  {
                    type: "Heading",
                    level: "h5",
                    children: "Mobile App",
                  },
                  {
                    type: "Badge",
                    variant: "outline",
                    children: "Planning",
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  {
                    type: "Flex",
                    justify: "between",
                    className: "text-sm",
                    children: [
                      {
                        type: "Text",
                        children: "Progress",
                      },
                      {
                        type: "Text",
                        children: "10%",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "w-full bg-gray-200 rounded-full h-2",
                    children: {
                      type: "Box",
                      className: "bg-primary h-2 rounded-full transition-all duration-300",
                      style: { width: "10%" },
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          type: "Card",
          className: "overflow-hidden",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Flex",
                justify: "between",
                align: "start",
                className: "mb-4",
                children: [
                  {
                    type: "Heading",
                    level: "h5",
                    children: "Analytics Dashboard",
                  },
                  {
                    type: "Badge",
                    variant: "secondary",
                    children: "Active",
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  {
                    type: "Flex",
                    justify: "between",
                    className: "text-sm",
                    children: [
                      {
                        type: "Text",
                        children: "Progress",
                      },
                      {
                        type: "Text",
                        children: "60%",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "w-full bg-gray-200 rounded-full h-2",
                    children: {
                      type: "Box",
                      className: "bg-primary h-2 rounded-full transition-all duration-300",
                      style: { width: "60%" },
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          type: "Card",
          className: "overflow-hidden",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Flex",
                justify: "between",
                align: "start",
                className: "mb-4",
                children: [
                  {
                    type: "Heading",
                    level: "h5",
                    children: "User Research",
                  },
                  {
                    type: "Badge",
                    variant: "default",
                    children: "Completed",
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  {
                    type: "Flex",
                    justify: "between",
                    className: "text-sm",
                    children: [
                      {
                        type: "Text",
                        children: "Progress",
                      },
                      {
                        type: "Text",
                        children: "100%",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "w-full bg-gray-200 rounded-full h-2",
                    children: {
                      type: "Box",
                      className: "bg-primary h-2 rounded-full transition-all duration-300",
                      style: { width: "100%" },
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  }
);

/**
 * Masonry with custom item wrapper component
 */
export const CustomWrapper: Story = enhanceStoryForDualMode<typeof Masonry>(
  {
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
  },
  {
    renderSpec: {
      type: "Masonry",
      columns: 3,
      gap: 4,
      itemComponent: "article",
      children: [
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h5",
                children: "News Article 1",
              },
              {
                type: "Text",
                className: "mt-2",
                children: "This content is wrapped in an article element for better semantic HTML.",
              },
            ],
          },
        },
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h5",
                children: "Blog Post",
              },
              {
                type: "Text",
                className: "mt-2",
                children: "This content is wrapped in an article element for better semantic HTML.",
              },
            ],
          },
        },
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h5",
                children: "Tutorial",
              },
              {
                type: "Text",
                className: "mt-2",
                children: "This content is wrapped in an article element for better semantic HTML.",
              },
            ],
          },
        },
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h5",
                children: "Case Study",
              },
              {
                type: "Text",
                className: "mt-2",
                children: "This content is wrapped in an article element for better semantic HTML.",
              },
            ],
          },
        },
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h5",
                children: "Review",
              },
              {
                type: "Text",
                className: "mt-2",
                children: "This content is wrapped in an article element for better semantic HTML.",
              },
            ],
          },
        },
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h5",
                children: "Guide",
              },
              {
                type: "Text",
                className: "mt-2",
                children: "This content is wrapped in an article element for better semantic HTML.",
              },
            ],
          },
        },
      ],
    },
  }
);

/**
 * Masonry without animations (static layout)
 */
export const NoAnimation: Story = enhanceStoryForDualMode<typeof Masonry>(
  {
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
  },
  {
    renderSpec: {
      type: "Masonry",
      columns: 3,
      gap: 4,
      animation: {
        duration: 0,
        stagger: 0,
      },
      children: Array.from({ length: 9 }, (_, i) => ({
        type: "Card",
        className: "h-48",
        children: {
          type: "CardContent",
          className: "flex items-center justify-center h-full",
          children: {
            type: "Text",
            children: `Static Item ${i + 1}`,
          },
        },
      })),
    },
  }
);
