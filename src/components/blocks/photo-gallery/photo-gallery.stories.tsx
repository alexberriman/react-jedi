import type { Meta, StoryObj } from "@storybook/react-vite";
import { PhotoGallery } from "./photo-gallery";
import type { PhotoItem } from "./photo-gallery";

const meta: Meta<typeof PhotoGallery> = {
  title: "Blocks/PhotoGallery",
  component: PhotoGallery,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A stunning photo gallery block with multiple layout variants, lazy loading, lightbox modal, category filtering, and modern animations.",
      },
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["masonry", "grid", "carousel", "lightbox", "instagram"],
      description: "Layout variant for the photo gallery",
    },
    columns: {
      control: "select",
      options: [2, 3, 4, 5, 6],
      description: "Number of columns for grid layouts",
    },
    aspectRatio: {
      control: "select",
      options: ["square", "landscape", "portrait", "auto"],
      description: "Aspect ratio for photos",
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Gap size between photos",
    },
    enableLightbox: {
      control: "boolean",
      description: "Enable fullscreen lightbox modal",
    },
    enableFiltering: {
      control: "boolean",
      description: "Enable category filtering",
    },
    enableSearch: {
      control: "boolean",
      description: "Enable search functionality",
    },
    enableZoom: {
      control: "boolean",
      description: "Enable zoom hover effects",
    },
    enableDownload: {
      control: "boolean",
      description: "Enable download functionality",
    },
    enableSharing: {
      control: "boolean",
      description: "Enable social sharing",
    },
    animated: {
      control: "boolean",
      description: "Enable entry animations",
    },
    autoplay: {
      control: "boolean",
      description: "Enable autoplay for carousel variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PhotoGallery>;

// Sample photo data
const samplePhotos: PhotoItem[] = [
  {
    id: "1",
    src: "https://placehold.co/800x600/EEE/31343C",
    alt: "Mountain landscape",
    title: "Majestic Mountains",
    description: "Beautiful mountain landscape with snow-capped peaks",
    category: "Nature",
    tags: ["mountains", "landscape", "snow"],
    downloadUrl:
      "https://placehold.co/1920x1440/EEE/31343C",
  },
  {
    id: "2",
    src: "https://placehold.co/800x1200/EEE/31343C",
    alt: "Forest path",
    title: "Enchanted Forest",
    description: "A mysterious path through an ancient forest",
    category: "Nature",
    tags: ["forest", "trees", "path"],
    downloadUrl:
      "https://placehold.co/1920x2880/EEE/31343C",
  },
  {
    id: "3",
    src: "https://placehold.co/800x800/EEE/31343C",
    alt: "Ocean sunset",
    title: "Golden Hour",
    description: "Spectacular sunset over the ocean waves",
    category: "Seascape",
    tags: ["ocean", "sunset", "waves"],
    downloadUrl:
      "https://placehold.co/1920x1920/EEE/31343C",
  },
  {
    id: "4",
    src: "https://placehold.co/800x600/EEE/31343C",
    alt: "Desert landscape",
    title: "Desert Dunes",
    description: "Rolling sand dunes in the desert",
    category: "Desert",
    tags: ["desert", "sand", "dunes"],
    downloadUrl:
      "https://placehold.co/1920x1440/EEE/31343C",
  },
  {
    id: "5",
    src: "https://placehold.co/800x1000/EEE/31343C",
    alt: "Urban architecture",
    title: "City Skyline",
    description: "Modern skyscrapers reaching toward the sky",
    category: "Architecture",
    tags: ["city", "skyscrapers", "urban"],
    downloadUrl:
      "https://placehold.co/1920x2400/EEE/31343C",
  },
  {
    id: "6",
    src: "https://placehold.co/800x600/EEE/31343C",
    alt: "Tropical beach",
    title: "Paradise Beach",
    description: "Crystal clear waters and white sand beach",
    category: "Seascape",
    tags: ["beach", "tropical", "paradise"],
    downloadUrl:
      "https://placehold.co/1920x1440/EEE/31343C",
  },
  {
    id: "7",
    src: "https://placehold.co/800x800/EEE/31343C",
    alt: "Autumn leaves",
    title: "Autumn Colors",
    description: "Vibrant fall foliage in golden sunlight",
    category: "Nature",
    tags: ["autumn", "leaves", "colors"],
    downloadUrl:
      "https://placehold.co/1920x1920/EEE/31343C",
  },
  {
    id: "8",
    src: "https://placehold.co/800x1200/EEE/31343C",
    alt: "Waterfall",
    title: "Hidden Waterfall",
    description: "A secret waterfall deep in the jungle",
    category: "Nature",
    tags: ["waterfall", "jungle", "water"],
    downloadUrl:
      "https://placehold.co/1920x2880/EEE/31343C",
  },
  {
    id: "9",
    src: "https://placehold.co/800x600/EEE/31343C",
    alt: "Modern building",
    title: "Geometric Design",
    description: "Abstract architectural patterns and lines",
    category: "Architecture",
    tags: ["modern", "geometric", "abstract"],
    downloadUrl:
      "https://placehold.co/1920x1440/EEE/31343C",
  },
  {
    id: "10",
    src: "https://placehold.co/800x800/EEE/31343C",
    alt: "Starry night",
    title: "Milky Way",
    description: "The galaxy stretching across the night sky",
    category: "Space",
    tags: ["stars", "galaxy", "night"],
    downloadUrl:
      "https://placehold.co/1920x1920/EEE/31343C",
  },
  {
    id: "11",
    src: "https://placehold.co/800x500/EEE/31343C",
    alt: "Valley view",
    title: "Valley Vista",
    description: "Panoramic view of a mountain valley",
    category: "Nature",
    tags: ["valley", "panoramic", "vista"],
    downloadUrl:
      "https://placehold.co/1920x1200/EEE/31343C",
  },
  {
    id: "12",
    src: "https://placehold.co/800x600/EEE/31343C",
    alt: "Frozen lake",
    title: "Frozen Beauty",
    description: "A perfectly frozen lake reflecting the sky",
    category: "Nature",
    tags: ["frozen", "lake", "winter"],
    downloadUrl:
      "https://placehold.co/1920x1440/EEE/31343C",
  },
];

// Basic grid layout
export const Grid: Story = {
  args: {
    photos: samplePhotos,
    variant: "grid",
    columns: 3,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    aspectRatio: "landscape",
    gap: "md",
  },
};

// Masonry layout
export const Masonry: Story = {
  args: {
    photos: samplePhotos,
    variant: "masonry",
    columns: 3,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    gap: "md",
  },
};

// Instagram-style square grid
export const Instagram: Story = {
  args: {
    photos: samplePhotos,
    variant: "instagram",
    columns: 3,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    gap: "sm",
  },
};

// Carousel layout
export const Carousel: Story = {
  args: {
    photos: samplePhotos.slice(0, 6),
    variant: "carousel",
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    autoplay: false,
  },
};

// Carousel with autoplay
export const CarouselAutoplay: Story = {
  args: {
    photos: samplePhotos.slice(0, 6),
    variant: "carousel",
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    autoplay: true,
  },
};

// With filtering and search
export const WithFiltering: Story = {
  args: {
    photos: samplePhotos,
    variant: "grid",
    columns: 3,
    enableLightbox: true,
    enableFiltering: true,
    enableSearch: true,
    enableZoom: true,
    animated: true,
    aspectRatio: "landscape",
    gap: "md",
  },
};

// With download and sharing
export const WithActions: Story = {
  args: {
    photos: samplePhotos,
    variant: "grid",
    columns: 3,
    enableLightbox: true,
    enableZoom: true,
    enableDownload: true,
    enableSharing: true,
    animated: true,
    aspectRatio: "square",
    gap: "md",
  },
};

// Compact 4-column grid
export const Compact: Story = {
  args: {
    photos: samplePhotos,
    variant: "grid",
    columns: 4,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    aspectRatio: "square",
    gap: "sm",
  },
};

// Large 2-column with descriptions
export const LargeFormat: Story = {
  args: {
    photos: samplePhotos.slice(0, 6),
    variant: "grid",
    columns: 2,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    aspectRatio: "landscape",
    gap: "lg",
  },
};

// Portfolio style masonry
export const Portfolio: Story = {
  args: {
    photos: samplePhotos,
    variant: "masonry",
    columns: 4,
    enableLightbox: true,
    enableZoom: true,
    enableFiltering: true,
    animated: true,
    gap: "sm",
  },
};

// Lightbox focused
export const LightboxFocused: Story = {
  args: {
    photos: samplePhotos,
    variant: "lightbox",
    columns: 4,
    enableLightbox: true,
    enableZoom: true,
    enableDownload: true,
    enableSharing: true,
    animated: true,
    aspectRatio: "square",
    gap: "sm",
  },
};

// Mobile optimized
export const MobileOptimized: Story = {
  args: {
    photos: samplePhotos,
    variant: "grid",
    columns: 2,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    aspectRatio: "square",
    gap: "sm",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// All features enabled
export const FullFeatured: Story = {
  args: {
    photos: samplePhotos,
    variant: "grid",
    columns: 3,
    enableLightbox: true,
    enableFiltering: true,
    enableSearch: true,
    enableZoom: true,
    enableDownload: true,
    enableSharing: true,
    animated: true,
    aspectRatio: "landscape",
    gap: "md",
  },
};

// Minimal version
export const Minimal: Story = {
  args: {
    photos: samplePhotos,
    variant: "grid",
    columns: 3,
    enableLightbox: false,
    enableFiltering: false,
    enableSearch: false,
    enableZoom: false,
    enableDownload: false,
    enableSharing: false,
    animated: false,
    aspectRatio: "square",
    gap: "md",
  },
};
