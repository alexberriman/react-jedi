import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { PhotoGallery } from "./photo-gallery";
import type { PhotoItem } from "./photo-gallery";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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
export const Grid: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that photos render
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);

    // Test first photo renders
    expect(images[0]).toHaveAttribute('alt', 'Mountain landscape');
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
    photos: samplePhotos,
    variant: "grid",
    columns: 3,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    aspectRatio: "landscape",
    gap: "md",
  }
});

// Masonry layout
export const Masonry: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
  args: {
    photos: samplePhotos,
    variant: "masonry",
    columns: 3,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    gap: "md",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that photos render in masonry layout
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);

    // Test first photo renders with correct alt
    expect(images[0]).toHaveAttribute('alt', 'Mountain landscape');
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
    photos: samplePhotos,
    variant: "masonry",
    columns: 3,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    gap: "md",
  }
});

// Instagram-style square grid
export const Instagram: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
  args: {
    photos: samplePhotos,
    variant: "instagram",
    columns: 3,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    gap: "sm",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that photos render in instagram style
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Instagram variant should have square aspect ratio
    expect(images[0]).toHaveAttribute('alt', 'Mountain landscape');
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
    photos: samplePhotos,
    variant: "instagram",
    columns: 3,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    gap: "sm",
  }
});

// Carousel layout
export const Carousel: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
  args: {
    photos: samplePhotos.slice(0, 6),
    variant: "carousel",
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    autoplay: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test carousel has navigation buttons
    const prevButton = canvas.getByRole('button', { name: /Previous image/i });
    const nextButton = canvas.getByRole('button', { name: /Next image/i });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Test dots indicator
    const dots = canvas.getAllByRole('button', { name: /Go to image/i });
    expect(dots).toHaveLength(6); // Should have 6 dots for 6 images
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
    photos: samplePhotos.slice(0, 6),
    variant: "carousel",
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    autoplay: false,
  }
});

// Carousel with autoplay
export const CarouselAutoplay: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
  args: {
    photos: samplePhotos.slice(0, 6),
    variant: "carousel",
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    autoplay: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test carousel navigation exists
    const prevButton = canvas.getByRole('button', { name: /Previous image/i });
    const nextButton = canvas.getByRole('button', { name: /Next image/i });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Test dots indicator for autoplay
    const dots = canvas.getAllByRole('button', { name: /Go to image/i });
    expect(dots).toHaveLength(6);
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
    photos: samplePhotos.slice(0, 6),
    variant: "carousel",
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    autoplay: true,
  }
});

// With filtering and search
export const WithFiltering: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test search input renders
    const searchInput = canvas.getByPlaceholderText('Search photos...');
    expect(searchInput).toBeInTheDocument();

    // Test filter buttons render
    const allButton = canvas.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    // Test category filters
    const natureButton = canvas.getByRole('button', { name: 'Nature' });
    const seascapeButton = canvas.getByRole('button', { name: 'Seascape' });
    expect(natureButton).toBeInTheDocument();
    expect(seascapeButton).toBeInTheDocument();

    // Test photos render
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
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
  }
});

// With download and sharing
export const WithActions: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test photos render
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Test first photo has correct alt text
    expect(images[0]).toHaveAttribute('alt', 'Mountain landscape');
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
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
  }
});

// Compact 4-column grid
export const Compact: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test photos render in compact grid
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Verify square aspect ratio images load
    expect(images[0]).toHaveAttribute('alt', 'Mountain landscape');
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
    photos: samplePhotos,
    variant: "grid",
    columns: 4,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    aspectRatio: "square",
    gap: "sm",
  }
});

// Large 2-column with descriptions
export const LargeFormat: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test photos render in large format
    const images = canvas.getAllByRole('img');
    expect(images).toHaveLength(6);
    
    // Test descriptions are visible
    const description = canvas.getByText('Beautiful mountain landscape with snow-capped peaks');
    expect(description).toBeInTheDocument();
    
    // Test titles are visible
    const title = canvas.getByText('Majestic Mountains');
    expect(title).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
    photos: samplePhotos.slice(0, 6),
    variant: "grid",
    columns: 2,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    aspectRatio: "landscape",
    gap: "lg",
  }
});

// Portfolio style masonry
export const Portfolio: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test masonry layout with filters
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Test filter buttons are present
    const allButton = canvas.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    
    // Test category badges render
    const natureBadge = canvas.getAllByText('Nature')[0];
    expect(natureBadge).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
    photos: samplePhotos,
    variant: "masonry",
    columns: 4,
    enableLightbox: true,
    enableZoom: true,
    enableFiltering: true,
    animated: true,
    gap: "sm",
  }
});

// Lightbox focused
export const LightboxFocused: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test photos render with lightbox variant
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    
    // All images should be clickable for lightbox
    const clickableElements = canvas.getAllByRole('button', { name: /View .* in full size/i });
    expect(clickableElements.length).toBeGreaterThan(0);
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
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
  }
});

// Mobile optimized
export const MobileOptimized: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test mobile optimized grid
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Verify images are rendered
    expect(images[0]).toHaveAttribute('alt', 'Mountain landscape');
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
    photos: samplePhotos,
    variant: "grid",
    columns: 2,
    enableLightbox: true,
    enableZoom: true,
    animated: true,
    aspectRatio: "square",
    gap: "sm",
  }
});

// All features enabled
export const FullFeatured: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all features are present
    // Search input
    const searchInput = canvas.getByPlaceholderText('Search photos...');
    expect(searchInput).toBeInTheDocument();
    
    // Filter buttons
    const allButton = canvas.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    
    // Photos render
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Categories exist
    const natureButton = canvas.getByRole('button', { name: 'Nature' });
    expect(natureButton).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
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
  }
});

// Minimal version
export const Minimal: Story = enhanceStoryForDualMode<typeof PhotoGallery>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test minimal version - just photos, no extras
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Verify no search input
    const searchInput = canvas.queryByPlaceholderText('Search photos...');
    expect(searchInput).not.toBeInTheDocument();
    
    // Verify no filter buttons except possibly the ones from image metadata
    const allButton = canvas.queryByRole('button', { name: 'All' });
    expect(allButton).not.toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "PhotoGallery",
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
  }
});
