import { useState } from "react";
import { Link } from "react-router-dom";
import { render } from "@alexberriman/react-jedi";
import type { CarouselDef } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";

export function CarouselShowcase() {
  usePageMetadata({
    title: "Carousel Block - React Jedi",
    description: "Enhanced carousel component with multiple variants including image gallery, content cards, testimonials, product showcase, and fullscreen modes.",
  });

  const [activeExample, setActiveExample] = useState("gallery");

  // Sample data
  const sampleImages = [
    {
      src: "https://picsum.photos/800/600?random=15",
      alt: "Mountain landscape",
      title: "Mountain Vista",
      description: "A breathtaking view of snow-capped peaks",
    },
    {
      src: "https://picsum.photos/800/600?random=16",
      alt: "Ocean waves",
      title: "Ocean Waves",
      description: "The endless rhythm of the sea",
    },
    {
      src: "https://picsum.photos/800/600?random=17",
      alt: "Forest path",
      title: "Forest Trail",
      description: "A peaceful walk through ancient woods",
    },
  ];

  const sampleContentItems = [
    {
      title: "Modern Design System",
      description: "Build consistent and beautiful user interfaces with our comprehensive design system.",
      image: "https://picsum.photos/400/300?random=18",
      badge: "New",
      cta: { text: "Learn More", href: "#" },
    },
    {
      title: "Performance Optimization",
      description: "Optimize your applications for maximum speed and efficiency with proven techniques.",
      image: "https://picsum.photos/400/300?random=19",
      badge: "Popular",
      cta: { text: "Get Started", href: "#" },
    },
    {
      title: "Developer Experience",
      description: "Enhance productivity with tools and workflows designed for modern development.",
      image: "https://picsum.photos/400/300?random=20",
      cta: { text: "Explore", href: "#" },
    },
  ];

  const sampleTestimonials = [
    {
      content: "This carousel component has transformed how we showcase our portfolio. The Ken Burns effect and smooth transitions create an incredibly engaging experience.",
      author: {
        name: "Sarah Chen",
        role: "Creative Director",
        company: "Design Studio Pro",
        image: "https://picsum.photos/100/100?random=21",
      },
      rating: 5,
    },
    {
      content: "The variety of carousel variants makes it perfect for any project. We use the product showcase for our e-commerce site and the testimonials for our landing page.",
      author: {
        name: "Michael Rodriguez",
        role: "Frontend Developer",
        company: "TechFlow Inc",
        image: "https://picsum.photos/100/100?random=22",
      },
      rating: 5,
    },
  ];

  const sampleProducts = [
    {
      name: "Premium Wireless Headphones",
      price: "$299",
      originalPrice: "$399",
      image: "https://picsum.photos/300/300?random=23",
      description: "High-quality audio with noise cancellation",
      badge: "Sale",
      inStock: true,
    },
    {
      name: "Smart Fitness Watch",
      price: "$199",
      image: "https://picsum.photos/300/300?random=24",
      description: "Track your health and fitness goals",
      badge: "New",
      inStock: true,
    },
    {
      name: "Minimalist Backpack",
      price: "$89",
      image: "https://picsum.photos/300/300?random=25",
      description: "Perfect for daily commuting",
      inStock: false,
    },
  ];

  const examples: Record<string, { title: string; description: string; spec: CarouselDef }> = {
    gallery: {
      title: "Image Gallery",
      description: "Beautiful image carousel with Ken Burns effect, zoom functionality, thumbnails navigation, and autoplay.",
      spec: {
        type: "Carousel",
        variant: "gallery",
        showArrows: true,
        autoplay: {
          enabled: true,
          delay: 5000,
          stopOnMouseEnter: true,
        },
        data: {
          images: sampleImages,
          enableKenBurns: true,
          enableZoom: true,
          showThumbnails: true,
        },
      },
    },
    content: {
      title: "Content Cards",
      description: "Perfect for showcasing features, services, or blog posts with images, badges, and call-to-action buttons.",
      spec: {
        type: "Carousel",
        variant: "content",
        showArrows: true,
        showDots: true,
        data: {
          items: sampleContentItems,
        },
      },
    },
    testimonials: {
      title: "Testimonials",
      description: "Customer testimonials with author photos, ratings, and company information in an elegant card format.",
      spec: {
        type: "Carousel",
        variant: "testimonials",
        showArrows: true,
        showDots: true,
        autoplay: {
          enabled: true,
          delay: 6000,
        },
        data: {
          testimonials: sampleTestimonials,
          testimonialsVariant: "cards",
        },
      },
    },
    products: {
      title: "Product Showcase",
      description: "E-commerce product carousel with pricing, badges, stock status, and hover effects.",
      spec: {
        type: "Carousel",
        variant: "showcase",
        showArrows: true,
        showDots: true,
        data: {
          products: sampleProducts,
        },
      },
    },
    basic: {
      title: "Basic Carousel",
      description: "Simple carousel with custom content and standard navigation controls.",
      spec: {
        type: "Carousel",
        showArrows: true,
        showDots: true,
        items: [
          {
            type: "Card",
            children: {
              type: "CardContent",
              className: "flex aspect-video items-center justify-center p-8",
              children: {
                type: "Text",
                children: "Slide 1",
                className: "text-4xl font-semibold",
              },
            },
          },
          {
            type: "Card",
            children: {
              type: "CardContent",
              className: "flex aspect-video items-center justify-center p-8",
              children: {
                type: "Text",
                children: "Slide 2",
                className: "text-4xl font-semibold",
              },
            },
          },
          {
            type: "Card",
            children: {
              type: "CardContent",
              className: "flex aspect-video items-center justify-center p-8",
              children: {
                type: "Text",
                children: "Slide 3",
                className: "text-4xl font-semibold",
              },
            },
          },
        ],
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link to="/showcase" className="hover:text-foreground">
          Showcase
        </Link>
        <span>/</span>
        <Link to="/showcase/blocks" className="hover:text-foreground">
          Component Blocks
        </Link>
        <span>/</span>
        <span className="text-foreground">Carousel</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">Carousel Block</h1>
          <Badge variant="secondary">Interactive</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Enhanced carousel component with multiple variants including image gallery, content cards, 
          testimonials, product showcase, and fullscreen modes. Features autoplay, touch support, 
          navigation controls, Ken Burns effect, and zoom functionality.
        </p>
      </div>

      {/* Features */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
          <CardDescription>Everything you need for interactive content presentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold">🎨 Multiple Variants</h4>
              <p className="text-sm text-muted-foreground">
                Gallery, content cards, testimonials, product showcase, and fullscreen modes
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">🎬 Ken Burns Effect</h4>
              <p className="text-sm text-muted-foreground">
                Cinematic slow zoom and pan animations for images
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">🔍 Zoom Functionality</h4>
              <p className="text-sm text-muted-foreground">
                Click to zoom images in a beautiful modal overlay
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">⏯️ Smart Autoplay</h4>
              <p className="text-sm text-muted-foreground">
                Auto-advance with pause on hover and user interaction
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">📱 Touch Support</h4>
              <p className="text-sm text-muted-foreground">
                Optimized swipe gestures and mobile interactions
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">🧭 Navigation</h4>
              <p className="text-sm text-muted-foreground">
                Arrows, dots, thumbnails, and keyboard navigation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Examples */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Examples</h2>
          <p className="text-muted-foreground mb-6">
            Explore different carousel variants and their use cases.
          </p>
        </div>

        <Tabs value={activeExample} onValueChange={setActiveExample} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="basic">Basic</TabsTrigger>
          </TabsList>

          {Object.entries(examples).map(([key, example]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                <p className="text-muted-foreground mb-6">{example.description}</p>
              </div>

              <ShowcaseWrapper
                title={example.title}
                spec={example.spec}
                className="min-h-[500px]"
              >
                {render(example.spec)}
              </ShowcaseWrapper>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Usage Guide */}
      <div className="mt-16 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Usage</h2>
          <p className="text-muted-foreground">
            The Carousel block supports multiple variants for different use cases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Variant Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="outline">gallery</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  For image galleries with Ken Burns effect and zoom
                </p>
              </div>
              <div>
                <Badge variant="outline">content</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  For content cards with images, badges, and CTAs
                </p>
              </div>
              <div>
                <Badge variant="outline">testimonials</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  For customer testimonials with ratings and photos
                </p>
              </div>
              <div>
                <Badge variant="outline">showcase</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  For product catalogs with pricing and stock info
                </p>
              </div>
              <div>
                <Badge variant="outline">fullscreen</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  For hero sections and fullscreen experiences
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="outline">autoplay</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  Auto-advance slides with customizable timing
                </p>
              </div>
              <div>
                <Badge variant="outline">navigation</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  Arrows, dots, thumbnails, and keyboard controls
                </p>
              </div>
              <div>
                <Badge variant="outline">orientation</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  Horizontal or vertical scrolling direction
                </p>
              </div>
              <div>
                <Badge variant="outline">loop</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  Infinite loop or stop at first/last slide
                </p>
              </div>
              <div>
                <Badge variant="outline">responsive</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  Mobile-optimized touch interactions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center space-y-4">
        <h3 className="text-xl font-semibold">Ready to use the Carousel Block?</h3>
        <p className="text-muted-foreground">
          Check out our Storybook for more examples and interactive documentation.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/storybook" target="_blank" rel="noopener noreferrer">
              View in Storybook
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/documentation">
              Documentation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}