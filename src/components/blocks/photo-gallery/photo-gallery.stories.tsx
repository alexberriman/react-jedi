import type { Meta, StoryObj } from "@storybook/react";
import { PhotoGallery } from "./photo-gallery";
import type { PhotoItem } from "./photo-gallery";

const meta: Meta<typeof PhotoGallery> = {
  title: "Blocks/PhotoGallery",
  component: PhotoGallery,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A stunning photo gallery block with multiple layout variants, lazy loading, lightbox modal, category filtering, and modern animations.",
      },
    },
  },
  tags: ["test"],
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
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Mountain landscape",
    title: "Majestic Mountains",
    description: "Beautiful mountain landscape with snow-capped peaks",
    category: "Nature",
    tags: ["mountains", "landscape", "snow"],
    downloadUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1440&fit=crop&dl=1",
  },
  {
    id: "2", 
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1200&fit=crop",
    alt: "Forest path",
    title: "Enchanted Forest",
    description: "A mysterious path through an ancient forest",
    category: "Nature",
    tags: ["forest", "trees", "path"],
    downloadUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=2880&fit=crop&dl=1",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=800&fit=crop", 
    alt: "Ocean sunset",
    title: "Golden Hour",
    description: "Spectacular sunset over the ocean waves",
    category: "Seascape",
    tags: ["ocean", "sunset", "waves"],
    downloadUrl: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&h=1920&fit=crop&dl=1",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    alt: "Desert landscape",
    title: "Desert Dunes", 
    description: "Rolling sand dunes in the desert",
    category: "Desert",
    tags: ["desert", "sand", "dunes"],
    downloadUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1440&fit=crop&dl=1",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=1000&fit=crop",
    alt: "Urban architecture",
    title: "City Skyline",
    description: "Modern skyscrapers reaching toward the sky",
    category: "Architecture",
    tags: ["city", "skyscrapers", "urban"],
    downloadUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1920&h=2400&fit=crop&dl=1",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=800&h=600&fit=crop",
    alt: "Tropical beach",
    title: "Paradise Beach",
    description: "Crystal clear waters and white sand beach",
    category: "Seascape", 
    tags: ["beach", "tropical", "paradise"],
    downloadUrl: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=1920&h=1440&fit=crop&dl=1",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=800&h=800&fit=crop",
    alt: "Autumn leaves",
    title: "Autumn Colors",
    description: "Vibrant fall foliage in golden sunlight",
    category: "Nature",
    tags: ["autumn", "leaves", "colors"],
    downloadUrl: "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=1920&h=1920&fit=crop&dl=1",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=1200&fit=crop",
    alt: "Waterfall",
    title: "Hidden Waterfall",
    description: "A secret waterfall deep in the jungle",
    category: "Nature",
    tags: ["waterfall", "jungle", "water"],
    downloadUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=2880&fit=crop&dl=1",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    alt: "Modern building",
    title: "Geometric Design",
    description: "Abstract architectural patterns and lines",
    category: "Architecture",
    tags: ["modern", "geometric", "abstract"],
    downloadUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1440&fit=crop&dl=1",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=800&fit=crop",
    alt: "Starry night",
    title: "Milky Way",
    description: "The galaxy stretching across the night sky",
    category: "Space",
    tags: ["stars", "galaxy", "night"],
    downloadUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1920&fit=crop&dl=1",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    alt: "Valley view",
    title: "Valley Vista",
    description: "Panoramic view of a mountain valley",
    category: "Nature",
    tags: ["valley", "panoramic", "vista"],
    downloadUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1200&fit=crop&dl=1",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop",
    alt: "Frozen lake",
    title: "Frozen Beauty",
    description: "A perfectly frozen lake reflecting the sky",
    category: "Nature",
    tags: ["frozen", "lake", "winter"],
    downloadUrl: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1920&h=1440&fit=crop&dl=1",
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