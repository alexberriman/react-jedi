import { Link } from "react-router-dom";
import { useState } from "react";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "@/lib/meta";
import { ShowcaseWrapper } from "@/components/ui/showcase-wrapper";
import { PageHeader } from "@/components/ui/page-header";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TestimonialShowcasePage() {
  usePageMetadata({
    title: "Testimonial Block",
    description: "Advanced testimonial component with multiple layouts, carousel, video support, and social proof features",
  });

  const [activeExample, setActiveExample] = useState("single");

  const examples: Record<string, { spec: ComponentSpec; title: string; description: string }> = {
    single: {
      title: "Single Testimonial",
      description: "Display a single testimonial with various layout options",
      spec: {
        type: "Testimonial",
        props: {
          variant: "single",
          layout: "large",
          testimonials: {
            id: "1",
            author: {
              name: "Sarah Chen",
              role: "Product Designer",
              company: "Tech Corp",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
              companyLogo: "https://logo.clearbit.com/google.com"
            },
            content: "This library has completely transformed how we build UI components. The Server-Driven UI approach allows us to iterate faster and deliver beautiful experiences to our users. The component quality is outstanding and the developer experience is unmatched.",
            rating: 5,
            date: "November 2024",
            featured: true,
            source: {
              platform: "Twitter",
              url: "https://twitter.com/example"
            }
          }
        }
      }
    },
    grid: {
      title: "Grid Layout",
      description: "Multiple testimonials in a responsive grid with ratings and company logos",
      spec: {
        type: "Testimonial",
        props: {
          variant: "grid",
          layout: "card",
          columns: 3,
          testimonials: [
            {
              id: "1",
              author: {
                name: "Sarah Chen",
                role: "Product Designer",
                company: "Tech Corp",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
                companyLogo: "https://logo.clearbit.com/google.com"
              },
              content: "This library has transformed how we build UI components. The Server-Driven UI approach allows us to iterate faster.",
              rating: 5,
              date: "November 2024"
            },
            {
              id: "2",
              author: {
                name: "James Wilson",
                role: "Frontend Engineer",
                company: "WebDev Inc",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
                companyLogo: "https://logo.clearbit.com/microsoft.com"
              },
              content: "Best UI library I've worked with. The attention to detail is remarkable and the performance is outstanding.",
              rating: 5,
              featured: true,
              date: "December 2024"
            },
            {
              id: "3",
              author: {
                name: "Emma Thompson",
                role: "UX Designer",
                company: "Creative Agency",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
                companyLogo: "https://logo.clearbit.com/apple.com"
              },
              content: "Beautiful components that are a joy to work with. The theming system is incredibly powerful.",
              rating: 5,
              date: "October 2024"
            }
          ]
        }
      }
    },
    carousel: {
      title: "Carousel",
      description: "Testimonials in a sliding carousel with navigation controls",
      spec: {
        type: "Testimonial",
        props: {
          variant: "carousel",
          layout: "card",
          columns: 2,
          showNavigation: true,
          autoplay: true,
          autoplayInterval: 5000,
          testimonials: [
            {
              id: "1",
              author: {
                name: "Maria Rodriguez",
                role: "Lead Developer",
                company: "Design Studio",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
                companyLogo: "https://logo.clearbit.com/spotify.com"
              },
              content: "The component architecture is brilliant. Easy to customize and extend for our specific needs.",
              rating: 5,
              date: "September 2024"
            },
            {
              id: "2",
              author: {
                name: "Michael Rodriguez",
                role: "CTO",
                company: "StartupCo",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
                companyLogo: "https://logo.clearbit.com/netflix.com"
              },
              content: "Game-changing library! The documentation is excellent and the community support is top-notch.",
              rating: 5,
              featured: true,
              date: "August 2024"
            },
            {
              id: "3",
              author: {
                name: "Lisa Park",
                role: "Developer",
                company: "Innovation Labs",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
              },
              content: "Incredible performance improvements in our development workflow. The components are beautifully designed.",
              rating: 4,
              date: "July 2024"
            },
            {
              id: "4",
              author: {
                name: "David Kim",
                role: "Tech Lead",
                company: "Digital Solutions",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
                companyLogo: "https://logo.clearbit.com/github.com"
              },
              content: "The best UI library for React. Clean APIs, excellent TypeScript support, and great performance.",
              rating: 5,
              date: "June 2024"
            }
          ]
        }
      }
    },
    quotes: {
      title: "Quote Style",
      description: "Testimonials styled as elegant quotes with border accents",
      spec: {
        type: "Testimonial",
        props: {
          variant: "grid",
          layout: "quote",
          columns: 2,
          testimonials: [
            {
              id: "1",
              author: {
                name: "Alex Johnson",
                role: "Engineering Manager",
                company: "TechFlow",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
                companyLogo: "https://logo.clearbit.com/tesla.com"
              },
              content: "Working with React Jedi has been an absolute game-changer for our development team. The Server-Driven UI approach has revolutionized how we think about building interfaces.",
              rating: 5,
              featured: true,
              source: {
                platform: "LinkedIn",
                url: "https://linkedin.com/in/example"
              }
            },
            {
              id: "2",
              author: {
                name: "Jennifer Lee",
                role: "Product Manager",
                company: "InnovateCorp",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              },
              content: "The component library is incredibly comprehensive, covering every use case we've encountered. Highly recommended for any serious React project.",
              rating: 5,
              source: {
                platform: "ProductHunt"
              }
            }
          ]
        }
      }
    },
    video: {
      title: "Video Testimonials",
      description: "Showcase video testimonials alongside text testimonials",
      spec: {
        type: "Testimonial",
        props: {
          variant: "video",
          layout: "card",
          columns: 2,
          testimonials: [
            {
              id: "1",
              author: {
                name: "Chris Anderson",
                role: "Founder",
                company: "BuildFast",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
              },
              content: "See how React Jedi transformed our development process and helped us ship features 3x faster.",
              rating: 5,
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              date: "November 2024"
            },
            {
              id: "2",
              author: {
                name: "Rachel Kim",
                role: "VP Engineering",
                company: "ScaleUp",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
              },
              content: "A complete solution for modern React development. The performance optimizations are incredible.",
              rating: 5,
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              date: "October 2024"
            },
            {
              id: "3",
              author: {
                name: "Tom Wilson",
                role: "Senior Developer",
                company: "CodeCraft",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
              },
              content: "The accessibility features built into every component saved us months of development time.",
              rating: 5,
              date: "September 2024"
            }
          ]
        }
      }
    },
    masonry: {
      title: "Masonry Layout",
      description: "Pinterest-style masonry layout for varied content lengths",
      spec: {
        type: "Testimonial",
        props: {
          variant: "masonry",
          layout: "card",
          testimonials: [
            {
              id: "1",
              author: {
                name: "Nina Patel",
                role: "Designer",
                company: "CreativeStudio",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
              },
              content: "Amazing!",
              rating: 5
            },
            {
              id: "2",
              author: {
                name: "Robert Chen",
                role: "Full Stack Developer",
                company: "WebSolutions",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
              },
              content: "Working with React Jedi has been an absolute pleasure. The Server-Driven UI approach revolutionizes how we think about building interfaces. The component library is comprehensive, the theming system is powerful yet intuitive, and the overall developer experience is unmatched. We've been able to deliver stunning, performant applications in record time. This is truly the future of web development.",
              rating: 5,
              featured: true
            },
            {
              id: "3",
              author: {
                name: "Amy Foster",
                role: "Product Designer",
                company: "DesignLab",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              },
              content: "The component quality is outstanding. Beautiful designs and excellent performance. Highly recommended for modern React projects!",
              rating: 5
            },
            {
              id: "4",
              author: {
                name: "John Smith",
                role: "CTO",
                company: "TechVenture",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
              },
              content: "Game changer for our team.",
              rating: 4
            }
          ]
        }
      }
    },
    minimal: {
      title: "Minimal Style",
      description: "Clean, minimal testimonial style for subtle integration",
      spec: {
        type: "Testimonial",
        props: {
          variant: "grid",
          layout: "minimal",
          columns: 1,
          testimonials: [
            {
              id: "1",
              author: {
                name: "Steve Jobs",
                role: "Visionary",
                company: "Apple Inc.",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
                companyLogo: "https://logo.clearbit.com/apple.com"
              },
              content: "Design is not just what it looks like and feels like. Design is how it works. This library understands that principle perfectly.",
              date: "Timeless"
            }
          ]
        }
      }
    }
  };

  return (
    <div className="flex flex-col">
      <PageHeader 
        title="Testimonial Block"
        description="Advanced testimonial component with multiple layouts, carousel functionality, video support, ratings, and social proof elements. Perfect for building trust and showcasing customer feedback."
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/showcase/blocks"
            className="group relative px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <span className="relative z-10">Browse All Blocks</span>
          </Link>
          <Link
            to="/documentation"
            className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
          >
            Documentation
          </Link>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeExample} onValueChange={setActiveExample} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="single">Single</TabsTrigger>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="carousel">Carousel</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="masonry">Masonry</TabsTrigger>
            <TabsTrigger value="minimal">Minimal</TabsTrigger>
          </TabsList>

          {Object.entries(examples).map(([key, example]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">{example.title}</h2>
                <p className="text-muted-foreground mb-6">{example.description}</p>
              </div>

              <ShowcaseWrapper>
                {render(example.spec)}
              </ShowcaseWrapper>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Configuration</h3>
                <CodeBlock language="json">
                  {JSON.stringify(example.spec, null, 2)}
                </CodeBlock>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Features Section */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Testimonial Block Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">🎨 Multiple Layouts</h3>
              <p className="text-sm text-muted-foreground">
                Choose from card, quote, large, minimal, and compact layouts to match your design
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">🎠 Carousel Support</h3>
              <p className="text-sm text-muted-foreground">
                Display testimonials in a carousel with autoplay and navigation controls
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">🎥 Video Testimonials</h3>
              <p className="text-sm text-muted-foreground">
                Embed video testimonials with play overlays and thumbnails
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">⭐ Star Ratings</h3>
              <p className="text-sm text-muted-foreground">
                Display customer ratings with customizable star components
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">🏢 Company Logos</h3>
              <p className="text-sm text-muted-foreground">
                Show company logos for additional credibility and social proof
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">🔗 Social Proof</h3>
              <p className="text-sm text-muted-foreground">
                Link to original sources with platform attribution for authenticity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}