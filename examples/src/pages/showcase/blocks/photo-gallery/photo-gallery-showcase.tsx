import { useState } from "react";
import { Link } from "react-router-dom";
import { PhotoGallery } from "@alexberriman/react-jedi";
import type { PhotoItem } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";

export function PhotoGalleryShowcase() {
  usePageMetadata({
    title: "Photo Gallery Block - React Jedi",
    description: "Stunning photo gallery component with multiple layout variants, lazy loading, lightbox modal, category filtering, and modern animations.",
  });

  const [activeExample, setActiveExample] = useState("grid");

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

  const examples = {
    grid: {
      title: "Perfect Grid Layout",
      description: "Clean, organized grid with consistent aspect ratios",
      component: (
        <PhotoGallery
          photos={samplePhotos}
          variant="grid"
          columns={3}
          enableLightbox={true}
          enableZoom={true}
          animated={true}
          aspectRatio="landscape"
          gap="md"
        />
      ),
    },
    masonry: {
      title: "Masonry Layout",
      description: "Pinterest-style masonry layout with varying heights",
      component: (
        <PhotoGallery
          photos={samplePhotos}
          variant="masonry"
          columns={3}
          enableLightbox={true}
          enableZoom={true}
          animated={true}
          gap="md"
        />
      ),
    },
    instagram: {
      title: "Instagram Style",
      description: "Square grid layout perfect for social media",
      component: (
        <PhotoGallery
          photos={samplePhotos}
          variant="instagram"
          columns={3}
          enableLightbox={true}
          enableZoom={true}
          animated={true}
          gap="sm"
        />
      ),
    },
    carousel: {
      title: "Carousel Slider",
      description: "Interactive carousel with navigation controls",
      component: (
        <PhotoGallery
          photos={samplePhotos.slice(0, 6)}
          variant="carousel"
          enableLightbox={true}
          enableZoom={true}
          animated={true}
          autoplay={false}
        />
      ),
    },
    filtered: {
      title: "With Filtering & Search",
      description: "Advanced gallery with category filters and search",
      component: (
        <PhotoGallery
          photos={samplePhotos}
          variant="grid"
          columns={3}
          enableLightbox={true}
          enableFiltering={true}
          enableSearch={true}
          enableZoom={true}
          animated={true}
          aspectRatio="landscape"
          gap="md"
        />
      ),
    },
    actions: {
      title: "With Download & Share",
      description: "Gallery with download and social sharing features",
      component: (
        <PhotoGallery
          photos={samplePhotos.slice(0, 9)}
          variant="grid"
          columns={3}
          enableLightbox={true}
          enableZoom={true}
          enableDownload={true}
          enableSharing={true}
          animated={true}
          aspectRatio="square"
          gap="md"
          onDownload={(photo) => console.log('Download:', photo.title)}
          onShare={(photo) => console.log('Share:', photo.title)}
        />
      ),
    },
  };

  return (
    <ShowcaseWrapper
      title="Photo Gallery Block"
      description="Create stunning photo galleries with multiple layout variants, interactive features, and modern animations."
      breadcrumb={[
        { label: "Showcase", href: "/showcase" },
        { label: "Blocks", href: "/showcase/blocks" },
        { label: "Photo Gallery" },
      ]}
    >
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline">Interactive</Badge>
          <Badge variant="outline">Responsive</Badge>
          <Badge variant="outline">Animated</Badge>
          <Badge variant="outline">Accessible</Badge>
          <Badge variant="outline">Touch Gestures</Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Multiple layout variants (grid, masonry, carousel, Instagram)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Fullscreen lightbox modal with keyboard navigation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Category filtering and search functionality
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Lazy loading with intersection observer
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Touch gestures and mobile optimized
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Download and social sharing support
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6">
            <h3 className="font-semibold mb-3">Perfect for</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="font-medium">Portfolio Sites</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">Showcase your work</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="font-medium">E-commerce</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">Product galleries</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="font-medium">Photography</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">Image collections</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="font-medium">Travel Blogs</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">Photo journals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <Tabs value={activeExample} onValueChange={setActiveExample} className="space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full sm:w-auto">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="masonry">Masonry</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
            <TabsTrigger value="carousel">Carousel</TabsTrigger>
            <TabsTrigger value="filtered">Filtered</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Link to="/storybook/?path=/story/blocks-photogallery--grid">
              <Button variant="outline" size="sm">
                View in Storybook
              </Button>
            </Link>
            <Link to="/showcase/blocks">
              <Button variant="outline" size="sm">
                All Blocks
              </Button>
            </Link>
          </div>
        </div>

        {Object.entries(examples).map(([key, example]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {example.component}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Configuration Options */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Configuration Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Layout Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><code>grid</code> - Perfect grid layout</div>
              <div><code>masonry</code> - Pinterest-style masonry</div>
              <div><code>instagram</code> - Square social media grid</div>
              <div><code>carousel</code> - Horizontal slider</div>
              <div><code>lightbox</code> - Grid optimized for lightbox</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interactive Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><code>enableLightbox</code> - Fullscreen modal</div>
              <div><code>enableFiltering</code> - Category filters</div>
              <div><code>enableSearch</code> - Text search</div>
              <div><code>enableZoom</code> - Hover zoom effects</div>
              <div><code>enableDownload</code> - Download functionality</div>
              <div><code>enableSharing</code> - Social sharing</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><code>columns</code> - 2, 3, 4, 5, or 6 columns</div>
              <div><code>aspectRatio</code> - square, landscape, portrait, auto</div>
              <div><code>gap</code> - sm, md, lg spacing</div>
              <div><code>animated</code> - Entry animations</div>
              <div><code>autoplay</code> - Carousel autoplay</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Usage Examples</h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Grid Gallery</CardTitle>
              <CardDescription>Simple photo grid with lightbox</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
{`<PhotoGallery
  photos={photos}
  variant="grid"
  columns={3}
  enableLightbox={true}
  enableZoom={true}
/>`}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Advanced Gallery with Filtering</CardTitle>
              <CardDescription>Full-featured gallery with search and categories</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
{`<PhotoGallery
  photos={photos}
  variant="masonry"
  enableLightbox={true}
  enableFiltering={true}
  enableSearch={true}
  enableDownload={true}
  enableSharing={true}
  animated={true}
  onDownload={(photo) => handleDownload(photo)}
  onShare={(photo) => handleShare(photo)}
/>`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </ShowcaseWrapper>
  );
}