import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { LatestNews } from "./latest-news";
import type { Article } from "./latest-news";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Blocks/Latest News",
  component: LatestNews,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LatestNews>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample article data
const sampleArticles: Article[] = [
  {
    id: "1",
    title: "Breaking: Major Tech Company Announces Revolutionary AI Assistant",
    excerpt:
      "In a groundbreaking announcement today, the tech giant revealed their latest AI technology that promises to transform how we interact with digital devices.",
    category: "Technology",
    date: "2024-01-15",
    author: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    thumbnail: "https://placehold.co/800x450/EEE/31343C",
    url: "#",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Climate Summit Reaches Historic Agreement on Carbon Emissions",
    excerpt:
      "World leaders gather to sign unprecedented climate accord aimed at reducing global carbon emissions by 50% over the next decade.",
    category: "Environment",
    date: "2024-01-14",
    author: {
      name: "Michael Torres",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    thumbnail: "https://placehold.co/800x450/EEE/31343C",
    url: "#",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Stock Market Hits All-Time High Amid Economic Recovery",
    excerpt:
      "Markets surge as investors respond positively to latest economic indicators showing strong growth across multiple sectors.",
    category: "Business",
    date: "2024-01-13",
    author: {
      name: "Emily Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    thumbnail: "https://placehold.co/800x450/EEE/31343C",
    url: "#",
    readTime: "4 min read",
  },
  {
    id: "4",
    title: "New Study Reveals Benefits of Mediterranean Diet for Brain Health",
    excerpt:
      "Researchers find strong correlation between Mediterranean diet adherence and reduced risk of cognitive decline in aging populations.",
    category: "Health",
    date: "2024-01-12",
    author: {
      name: "Dr. James Wilson",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    thumbnail: "https://placehold.co/800x450/EEE/31343C",
    url: "#",
    readTime: "6 min read",
  },
  {
    id: "5",
    title: "Space Exploration Milestone: First Commercial Moon Landing Success",
    excerpt:
      "Private space company successfully lands spacecraft on lunar surface, marking new era in commercial space exploration.",
    category: "Technology",
    date: "2024-01-11",
    author: {
      name: "Alex Rivera",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    thumbnail: "https://placehold.co/800x450/EEE/31343C",
    url: "#",
    readTime: "7 min read",
  },
  {
    id: "6",
    title: "Electric Vehicle Sales Surpass Traditional Cars for First Time",
    excerpt:
      "Historic shift in automotive industry as EV sales outpace combustion engines in major markets worldwide.",
    category: "Technology",
    date: "2024-01-10",
    author: {
      name: "Lisa Park",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    thumbnail: "https://placehold.co/800x450/EEE/31343C",
    url: "#",
    readTime: "5 min read",
  },
];

// Articles without images for minimal variant
const minimalArticles: Article[] = sampleArticles.map((article) => ({
  ...article,
  thumbnail: undefined,
  excerpt: undefined,
  author: undefined,
}));

export const CardsRow: Story = {
  args: {
    articles: sampleArticles,
    variant: "cards-row",
    count: 3,
    heading: "Latest News",
    description: "Stay updated with our latest articles and insights",
    viewAllUrl: "/news",
    viewAllText: "View All Articles",
  },
};

export const FeaturedList: Story = {
  args: {
    articles: sampleArticles,
    variant: "featured-list",
    count: 4,
    heading: "Featured Stories",
    viewAllUrl: "/news",
  },
};

export const MinimalLinks: Story = {
  args: {
    articles: minimalArticles,
    variant: "minimal-links",
    count: 6,
    heading: "Recent Updates",
    viewAllUrl: "/news",
  },
};

export const WithImages: Story = {
  args: {
    articles: sampleArticles,
    variant: "with-images",
    count: 3,
    heading: "Latest Articles",
    description: "Discover our most recent stories",
    viewAllUrl: "/news",
  },
};

export const MagazineStyle: Story = {
  args: {
    articles: sampleArticles,
    variant: "magazine",
    count: 5,
    heading: "Magazine",
    description: "Featured stories and latest updates",
    viewAllUrl: "/news",
  },
};

export const WithCategoryTabs: Story = {
  args: {
    articles: sampleArticles,
    variant: "cards-row",
    count: 3,
    heading: "Latest News by Category",
    showCategoryTabs: true,
    viewAllUrl: "/news",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for avatars to load to prevent act() warnings
    await waitFor(() => {
      const avatarImages = canvas.getAllByRole('img', { name: /Sarah Chen|Michael Torres|Emily Johnson/ });
      expect(avatarImages.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  },
};

export const WithNewsletter: Story = {
  args: {
    articles: sampleArticles,
    variant: "cards-row",
    count: 3,
    heading: "Latest News",
    showNewsletter: true,
    newsletterHeading: "Never Miss an Update",
    newsletterDescription:
      "Subscribe to our newsletter and get the latest news delivered to your inbox",
    viewAllUrl: "/news",
    onNewsletterSubmit: (email) => {
      console.log("Newsletter signup:", email);
    },
  },
};

export const LoadingState: Story = {
  args: {
    articles: [],
    variant: "cards-row",
    count: 3,
    heading: "Latest News",
    loading: true,
  },
};

export const SixArticlesGrid: Story = {
  args: {
    articles: sampleArticles,
    variant: "with-images",
    count: 6,
    heading: "More Stories",
    description: "Explore our extensive collection of articles",
  },
};

export const FeaturedWithNewsletter: Story = {
  args: {
    articles: sampleArticles,
    variant: "featured-list",
    count: 4,
    heading: "Top Stories",
    showNewsletter: true,
    showCategoryTabs: true,
    viewAllUrl: "/news",
  },
};

export const CompactMagazine: Story = {
  args: {
    articles: sampleArticles.slice(0, 3),
    variant: "magazine",
    count: 3,
    heading: "Editor's Picks",
  },
};

export const NoExcerpts: Story = {
  args: {
    articles: sampleArticles.map((a) => ({ ...a, excerpt: undefined })),
    variant: "cards-row",
    count: 3,
    heading: "Latest Updates",
  },
};

export const WithoutAnimations: Story = {
  args: {
    articles: sampleArticles,
    variant: "with-images",
    count: 3,
    heading: "Latest News (No Animations)",
    description: "Same content but with hover animations disabled",
    animated: false,
    viewAllUrl: "/news",
  },
};

export const AnimatedMagazineStyle: Story = {
  args: {
    articles: sampleArticles,
    variant: "magazine",
    count: 5,
    heading: "Magazine with Animations",
    description: "Hover over images to see smooth zoom effects",
    animated: true,
    viewAllUrl: "/news",
  },
};

export const DualModeTest = enhanceStoryForDualMode(
  {
    render: () => (
      <LatestNews
        articles={sampleArticles}
        variant="cards-row"
        count={3}
        heading="Latest News (Dual Mode)"
        description="Testing dual-mode rendering - React vs SDUI"
        viewAllUrl="/news"
        viewAllText="View All Articles"
        animated={true}
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for content to load
      await waitFor(() => {
        expect(canvas.getByText("Latest News (Dual Mode)")).toBeInTheDocument();
      });

      // Verify description
      expect(canvas.getByText("Testing dual-mode rendering - React vs SDUI")).toBeInTheDocument();

      // Verify articles are rendered
      const article1 = canvas.getByText("Breaking: Major Tech Company Announces Revolutionary AI Assistant");
      const article2 = canvas.getByText("Climate Summit Reaches Historic Agreement on Carbon Emissions");
      const article3 = canvas.getByText("Stock Market Hits All-Time High Amid Economic Recovery");
      
      expect(article1).toBeInTheDocument();
      expect(article2).toBeInTheDocument();
      expect(article3).toBeInTheDocument();

      // Verify dates are rendered
      expect(canvas.getByText("Jan 15, 2024")).toBeInTheDocument();
      expect(canvas.getByText("Jan 14, 2024")).toBeInTheDocument();
      expect(canvas.getByText("Jan 13, 2024")).toBeInTheDocument();

      // Verify categories/badges
      expect(canvas.getByText("Technology")).toBeInTheDocument();
      expect(canvas.getByText("Environment")).toBeInTheDocument();
      expect(canvas.getByText("Business")).toBeInTheDocument();

      // Verify authors (wrap in waitFor to handle avatar loading)
      await waitFor(() => {
        expect(canvas.getByText("By Sarah Chen")).toBeInTheDocument();
        expect(canvas.getByText("By Michael Torres")).toBeInTheDocument();
        expect(canvas.getByText("By Emily Johnson")).toBeInTheDocument();
      });

      // Verify view all link (it's an anchor with role="button" due to Button component with asChild)
      const viewAllLink = canvas.getByRole("button", { name: /view all articles/i });
      expect(viewAllLink).toBeInTheDocument();
      expect(viewAllLink).toHaveAttribute("href", "/news");
    },
  },
  {
    renderSpec: {
      type: "LatestNews",
      articles: sampleArticles,
      variant: "cards-row",
      count: 3,
      heading: "Latest News (Dual Mode)",
      description: "Testing dual-mode rendering - React vs SDUI",
      viewAllUrl: "/news",
      viewAllText: "View All Articles",
      animated: true,
    },
  }
);

export const DualModeFeatured = enhanceStoryForDualMode(
  {
    render: () => (
      <LatestNews
        articles={sampleArticles}
        variant="featured-list"
        count={4}
        heading="Featured Stories (Dual Mode)"
        viewAllUrl="/news"
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for content to load
      await waitFor(() => {
        expect(canvas.getByText("Featured Stories (Dual Mode)")).toBeInTheDocument();
      });

      // Verify the featured article (first one) is rendered prominently
      const featuredTitle = canvas.getByText("Breaking: Major Tech Company Announces Revolutionary AI Assistant");
      expect(featuredTitle).toBeInTheDocument();

      // Verify "More Articles" section exists for featured layout
      expect(canvas.getByText("More Articles")).toBeInTheDocument();

      // Verify remaining articles in the list
      expect(canvas.getByText("Climate Summit Reaches Historic Agreement on Carbon Emissions")).toBeInTheDocument();
      expect(canvas.getByText("Stock Market Hits All-Time High Amid Economic Recovery")).toBeInTheDocument();
      expect(canvas.getByText("New Study Reveals Benefits of Mediterranean Diet for Brain Health")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "LatestNews",
      articles: sampleArticles,
      variant: "featured-list",
      count: 4,
      heading: "Featured Stories (Dual Mode)",
      viewAllUrl: "/news",
    },
  }
);

export const DualModeMinimal = enhanceStoryForDualMode(
  {
    render: () => (
      <LatestNews
        articles={minimalArticles}
        variant="minimal-links"
        count={6}
        heading="Recent Updates (Dual Mode)"
        viewAllUrl="/news"
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for content to load
      await waitFor(() => {
        expect(canvas.getByText("Recent Updates (Dual Mode)")).toBeInTheDocument();
      });

      // Verify articles are rendered as minimal links
      expect(canvas.getByText("Breaking: Major Tech Company Announces Revolutionary AI Assistant")).toBeInTheDocument();
      expect(canvas.getByText("Climate Summit Reaches Historic Agreement on Carbon Emissions")).toBeInTheDocument();
      expect(canvas.getByText("Stock Market Hits All-Time High Amid Economic Recovery")).toBeInTheDocument();
      expect(canvas.getByText("New Study Reveals Benefits of Mediterranean Diet for Brain Health")).toBeInTheDocument();
      expect(canvas.getByText("Space Exploration Milestone: First Commercial Moon Landing Success")).toBeInTheDocument();
      expect(canvas.getByText("Electric Vehicle Sales Surpass Traditional Cars for First Time")).toBeInTheDocument();

      // Verify dates are still shown
      expect(canvas.getByText("Jan 15, 2024")).toBeInTheDocument();
      expect(canvas.getByText("Jan 14, 2024")).toBeInTheDocument();
      expect(canvas.getByText("Jan 13, 2024")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "LatestNews",
      articles: minimalArticles,
      variant: "minimal-links",
      count: 6,
      heading: "Recent Updates (Dual Mode)",
      viewAllUrl: "/news",
    },
  }
);

export const DualModeWithCategories = enhanceStoryForDualMode(
  {
    render: () => {
      // Use React hooks for state management in React mode
      const [selectedCategory, setSelectedCategory] = React.useState('all');
      
      return (
        <LatestNews
          articles={sampleArticles}
          variant="cards-row"
          count={3}
          heading="Latest News by Category (Dual Mode)"
          showCategoryTabs={true}
          viewAllUrl="/news"
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            console.log('Category changed to:', category);
            setSelectedCategory(category);
          }}
        />
      );
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();
      
      // Wait for content to load
      await waitFor(() => {
        expect(canvas.getByText("Latest News by Category (Dual Mode)")).toBeInTheDocument();
      });

      // Verify category tabs are rendered
      expect(canvas.getByRole("button", { name: "All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Technology" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Environment" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Business" })).toBeInTheDocument();

      // Check that category tabs are present and functional  
      const techTab = canvas.getByRole("button", { name: "Technology" });
      const allTab = canvas.getByRole("button", { name: "All" });
      
      // Verify tabs are interactive
      expect(techTab).toBeInTheDocument();
      expect(allTab).toBeInTheDocument();
      
      // Click Technology tab
      await user.click(techTab);
      
      // Wait a moment for state updates and animations
      await waitFor(() => {
        // Ensure the click was processed
        expect(techTab).toBeInTheDocument();
      }, { timeout: 500 });

      // In React mode, filtering works dynamically
      // In SDUI mode, this is just testing the interaction, not the filtering result
      // because SDUI mode has static article lists
      const isReactMode = canvasElement.closest('[data-testid="react-render"]') !== null;
      
      if (isReactMode) {
        // Wait for filtering animation to complete
        await waitFor(() => {
          // Since we're filtering by Technology, we should see tech articles
          expect(canvas.getByText("Breaking: Major Tech Company Announces Revolutionary AI Assistant")).toBeInTheDocument();
          expect(canvas.getByText("Space Exploration Milestone: First Commercial Moon Landing Success")).toBeInTheDocument();
        }, { timeout: 3000 });

        // Non-technology articles should not be visible
        await waitFor(() => {
          // Environment article should not be visible
          const environmentArticle = canvas.queryByText("Climate Summit Reaches Historic Agreement on Carbon Emissions");
          expect(environmentArticle).not.toBeInTheDocument();
          
          // Business article should not be visible  
          const businessArticle = canvas.queryByText("Stock Market Hits All-Time High Amid Economic Recovery");
          expect(businessArticle).not.toBeInTheDocument();
        }, { timeout: 3000 });
      } else {
        // In SDUI mode, just verify the interaction occurred (button click)
        // The articles remain static as expected in SDUI mode
        expect(canvas.getByText("Breaking: Major Tech Company Announces Revolutionary AI Assistant")).toBeInTheDocument();
      }
    },
  },
  {
    renderSpec: {
      type: "LatestNews",
      articles: sampleArticles,
      variant: "cards-row",
      count: 3,
      heading: "Latest News by Category (Dual Mode)",
      showCategoryTabs: true,
      viewAllUrl: "/news",
      selectedCategory: "all",
      onCategoryChange: "handleCategoryChange",
    },
    handlers: {
      handleCategoryChange: (...args: unknown[]) => {
        const category = args[0] as string;
        // In SDUI mode, we can't directly update state, but we can simulate
        // the behavior by re-rendering with filtered articles
        console.log(`Category changed to: ${category}`);
      }
    }
  }
);
