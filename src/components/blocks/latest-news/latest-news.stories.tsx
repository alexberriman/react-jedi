import type { Meta, StoryObj } from "@storybook/react-vite";
import { LatestNews } from "./latest-news";
import type { Article } from "./latest-news";

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
