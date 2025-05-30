import React, { useState } from 'react';
import { render } from '@banja/react-jedi';
import { ChevronRight, ChevronDown, Package, Palette, Sparkles, Type, Layers, MousePointer, Square, SquareStack } from 'lucide-react';

const sectionIds = {
  overview: 'overview',
  variants: 'variants',
  sizes: 'sizes',
  styles: 'style-variants',
  animations: 'animations',
  shadows: 'shadows',
  rounded: 'rounded-corners',
  citeAuthor: 'cite-and-author',
  combinations: 'combinations',
  realWorld: 'real-world-examples',
  props: 'props',
};

export function BlockQuoteShowcasePage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderExample = (title: string, json: any, description?: string) => {
    const sectionKey = title.toLowerCase().replaceAll(/\s+/g, '-');
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && <p className="text-muted-foreground mb-4">{description}</p>}
        <div className="bg-background border rounded-lg p-6 mb-4">
          {render(json)}
        </div>
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection(sectionKey)}
            className="w-full px-4 py-2 bg-muted/50 hover:bg-muted text-left flex items-center justify-between transition-colors"
          >
            <span className="text-sm font-medium">View JSON Specification</span>
            {expandedSections[sectionKey] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {expandedSections[sectionKey] && (
            <pre className="p-4 bg-muted/30 overflow-x-auto text-xs">
              {JSON.stringify(json, null, 2)}
            </pre>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0">
        <div className="sticky top-24">
          <nav className="space-y-1">
            <a href={`#${sectionIds.overview}`} className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
              Overview
            </a>
            <a href={`#${sectionIds.variants}`} className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
              Variants
            </a>
            <a href={`#${sectionIds.sizes}`} className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
              Sizes
            </a>
            <a href={`#${sectionIds.styles}`} className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
              Style Variants
            </a>
            <a href={`#${sectionIds.animations}`} className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
              Animations
            </a>
            <a href={`#${sectionIds.shadows}`} className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
              Shadows
            </a>
            <a href={`#${sectionIds.rounded}`} className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
              Rounded Corners
            </a>
            <a href={`#${sectionIds.citeAuthor}`} className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
              Citation & Author
            </a>
            <a href={`#${sectionIds.combinations}`} className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
              Combinations
            </a>
            <a href={`#${sectionIds.realWorld}`} className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
              Real World Examples
            </a>
            <a href={`#${sectionIds.props}`} className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
              Props Reference
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">BlockQuote Component</h1>
          <p className="text-xl text-muted-foreground">
            Display quotations with style using our flexible BlockQuote component.
          </p>
        </div>

        {/* Overview Section */}
        <section id={sectionIds.overview} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Package className="w-6 h-6" />
            Overview
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              The BlockQuote component provides a beautifully styled way to display quotations in your application. 
              It supports multiple variants, sizes, and style options to match your design needs.
            </p>
            <div className="not-prose mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Key Features</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 6 color variants</li>
                    <li>• 4 size options</li>
                    <li>• 6 unique style variants</li>
                    <li>• Built-in animations</li>
                    <li>• Citation and author support</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Common Use Cases</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Testimonials</li>
                    <li>• Article quotes</li>
                    <li>• Featured statements</li>
                    <li>• Customer reviews</li>
                    <li>• Inspirational quotes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {renderExample("Basic BlockQuote", {
            type: "BlockQuote",
            properties: {
              children: "The only way to do great work is to love what you do."
            }
          }, "A simple blockquote with default styling")}
        </section>

        {/* Variants Section */}
        <section id={sectionIds.variants} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Palette className="w-6 h-6" />
            Variants
          </h2>
          <p className="text-muted-foreground mb-8">
            Choose from 6 different color variants to match your design system.
          </p>

          {renderExample("Default Variant", {
            type: "BlockQuote",
            properties: {
              variant: "default",
              children: "Innovation distinguishes between a leader and a follower."
            }
          })}

          {renderExample("Primary Variant", {
            type: "BlockQuote",
            properties: {
              variant: "primary",
              children: "The future belongs to those who believe in the beauty of their dreams."
            }
          })}

          {renderExample("Secondary Variant", {
            type: "BlockQuote",
            properties: {
              variant: "secondary",
              children: "Success is not final, failure is not fatal: it is the courage to continue that counts."
            }
          })}

          {renderExample("Accent Variant", {
            type: "BlockQuote",
            properties: {
              variant: "accent",
              children: "The best time to plant a tree was 20 years ago. The second best time is now."
            }
          })}

          {renderExample("Muted Variant", {
            type: "BlockQuote",
            properties: {
              variant: "muted",
              children: "Life is 10% what happens to you and 90% how you react to it."
            }
          })}

          {renderExample("Destructive Variant", {
            type: "BlockQuote",
            properties: {
              variant: "destructive",
              children: "The greatest glory in living lies not in never falling, but in rising every time we fall."
            }
          })}
        </section>

        {/* Sizes Section */}
        <section id={sectionIds.sizes} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Type className="w-6 h-6" />
            Sizes
          </h2>
          <p className="text-muted-foreground mb-8">
            Adjust the text size and padding with 4 different size options.
          </p>

          {renderExample("Small Size", {
            type: "BlockQuote",
            properties: {
              size: "sm",
              children: "Small but mighty quotes for subtle emphasis."
            }
          })}

          {renderExample("Base Size", {
            type: "BlockQuote",
            properties: {
              size: "base",
              children: "The standard size that works well in most contexts."
            }
          })}

          {renderExample("Large Size", {
            type: "BlockQuote",
            properties: {
              size: "lg",
              children: "Larger quotes that demand more attention on the page."
            }
          })}

          {renderExample("Extra Large Size", {
            type: "BlockQuote",
            properties: {
              size: "xl",
              children: "Extra large quotes perfect for hero sections and featured content."
            }
          })}
        </section>

        {/* Style Variants Section */}
        <section id={sectionIds.styles} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6" />
            Style Variants
          </h2>
          <p className="text-muted-foreground mb-8">
            Choose from 6 unique visual styles to match your design aesthetic.
          </p>

          {renderExample("Classic Style", {
            type: "BlockQuote",
            properties: {
              styleVariant: "classic",
              children: "A timeless design with traditional quote marks and elegant typography."
            }
          })}

          {renderExample("Modern Style", {
            type: "BlockQuote",
            properties: {
              styleVariant: "modern",
              children: "Clean lines and minimalist design for contemporary interfaces."
            }
          })}

          {renderExample("Elegant Style", {
            type: "BlockQuote",
            properties: {
              styleVariant: "elegant",
              children: "Sophisticated styling with subtle gradients and refined details."
            }
          })}

          {renderExample("Minimal Style", {
            type: "BlockQuote",
            properties: {
              styleVariant: "minimal",
              children: "Less is more. Perfect for clean, distraction-free designs."
            }
          })}

          {renderExample("Decorative Style", {
            type: "BlockQuote",
            properties: {
              styleVariant: "decorative",
              children: "Eye-catching design with decorative elements and visual flair."
            }
          })}

          {renderExample("Glossy Style", {
            type: "BlockQuote",
            properties: {
              styleVariant: "glossy",
              children: "Modern glossy effect with glass-like appearance and subtle reflections."
            }
          })}
        </section>

        {/* Animations Section */}
        <section id={sectionIds.animations} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <MousePointer className="w-6 h-6" />
            Animations
          </h2>
          <p className="text-muted-foreground mb-8">
            Add life to your quotes with built-in animation options.
          </p>

          {renderExample("Fade In Animation", {
            type: "BlockQuote",
            properties: {
              animated: "fadeIn",
              children: "This quote fades in smoothly when it appears."
            }
          })}

          {renderExample("Slide In Animation", {
            type: "BlockQuote",
            properties: {
              animated: "slideIn",
              children: "This quote slides in from the side with style."
            }
          })}

          {renderExample("Pulse Animation", {
            type: "BlockQuote",
            properties: {
              animated: "pulse",
              children: "This quote has a subtle pulsing effect."
            }
          })}

          {renderExample("Shimmer Animation", {
            type: "BlockQuote",
            properties: {
              animated: "shimmer",
              styleVariant: "glossy",
              children: "This quote has a shimmering effect that catches the eye."
            }
          })}
        </section>

        {/* Shadows Section */}
        <section id={sectionIds.shadows} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Square className="w-6 h-6" />
            Shadows
          </h2>
          <p className="text-muted-foreground mb-8">
            Add depth to your quotes with shadow options.
          </p>

          {renderExample("Small Shadow", {
            type: "BlockQuote",
            properties: {
              shadow: "sm",
              children: "A subtle shadow for minimal depth."
            }
          })}

          {renderExample("Medium Shadow", {
            type: "BlockQuote",
            properties: {
              shadow: "md",
              children: "A moderate shadow that provides good separation."
            }
          })}

          {renderExample("Large Shadow", {
            type: "BlockQuote",
            properties: {
              shadow: "lg",
              children: "A prominent shadow that makes the quote stand out."
            }
          })}
        </section>

        {/* Rounded Corners Section */}
        <section id={sectionIds.rounded} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <SquareStack className="w-6 h-6" />
            Rounded Corners
          </h2>
          <p className="text-muted-foreground mb-8">
            Customize the border radius to match your design system.
          </p>

          {renderExample("Small Rounded", {
            type: "BlockQuote",
            properties: {
              rounded: "sm",
              children: "Subtle rounding for a soft appearance."
            }
          })}

          {renderExample("Medium Rounded", {
            type: "BlockQuote",
            properties: {
              rounded: "md",
              children: "Standard rounding that works well in most designs."
            }
          })}

          {renderExample("Large Rounded", {
            type: "BlockQuote",
            properties: {
              rounded: "lg",
              children: "More pronounced rounding for a friendlier look."
            }
          })}

          {renderExample("Fully Rounded", {
            type: "BlockQuote",
            properties: {
              rounded: "full",
              children: "Maximum rounding for a pill-like appearance."
            }
          })}
        </section>

        {/* Citation & Author Section */}
        <section id={sectionIds.citeAuthor} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Citation & Author
          </h2>
          <p className="text-muted-foreground mb-8">
            Add attribution to your quotes with cite and author properties.
          </p>

          {renderExample("With Author", {
            type: "BlockQuote",
            properties: {
              children: "Stay hungry, stay foolish.",
              author: "Steve Jobs"
            }
          })}

          {renderExample("With Citation", {
            type: "BlockQuote",
            properties: {
              children: "I have a dream that one day this nation will rise up and live out the true meaning of its creed.",
              cite: "I Have a Dream Speech, 1963"
            }
          })}

          {renderExample("With Author and Citation", {
            type: "BlockQuote",
            properties: {
              children: "The only thing we have to fear is fear itself.",
              author: "Franklin D. Roosevelt",
              cite: "First Inaugural Address, 1933"
            }
          })}
        </section>

        {/* Combinations Section */}
        <section id={sectionIds.combinations} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Creative Combinations</h2>
          <p className="text-muted-foreground mb-8">
            Combine different properties to create unique quote styles.
          </p>

          {renderExample("Featured Quote", {
            type: "BlockQuote",
            properties: {
              variant: "primary",
              size: "lg",
              styleVariant: "elegant",
              shadow: "lg",
              rounded: "lg",
              animated: "fadeIn",
              children: "Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution.",
              author: "Aristotle"
            }
          })}

          {renderExample("Testimonial Style", {
            type: "BlockQuote",
            properties: {
              variant: "secondary",
              styleVariant: "modern",
              shadow: "md",
              rounded: "md",
              children: "This product has completely transformed how we handle our workflow. The efficiency gains have been remarkable.",
              author: "Sarah Chen",
              cite: "CEO, TechCorp"
            }
          })}

          {renderExample("Inspirational Quote", {
            type: "BlockQuote",
            properties: {
              variant: "accent",
              size: "xl",
              styleVariant: "decorative",
              animated: "slideIn",
              children: "The future belongs to those who believe in the beauty of their dreams.",
              author: "Eleanor Roosevelt"
            }
          })}
        </section>

        {/* Real World Examples Section */}
        <section id={sectionIds.realWorld} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Real World Examples</h2>
          <p className="text-muted-foreground mb-8">
            See how BlockQuote components can be used in actual applications.
          </p>

          {renderExample("Customer Testimonial Section", {
            type: "Container",
            properties: {
              className: "py-12",
              children: [
                {
                  type: "Heading",
                  properties: {
                    level: 2,
                    className: "text-center mb-8",
                    children: "What Our Customers Say"
                  }
                },
                {
                  type: "Grid",
                  properties: {
                    columns: { base: 1, md: 2 },
                    gap: 6,
                    children: [
                      {
                        type: "BlockQuote",
                        properties: {
                          variant: "primary",
                          styleVariant: "modern",
                          shadow: "md",
                          rounded: "lg",
                          children: "The best investment we've made this year. ROI was visible within weeks.",
                          author: "Michael Torres",
                          cite: "VP of Operations, FinanceFlow"
                        }
                      },
                      {
                        type: "BlockQuote",
                        properties: {
                          variant: "primary",
                          styleVariant: "modern",
                          shadow: "md",
                          rounded: "lg",
                          children: "Incredible support team and a product that actually delivers on its promises.",
                          author: "Lisa Wang",
                          cite: "Director of IT, HealthTech Solutions"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          })}

          {renderExample("Article Pull Quote", {
            type: "Container",
            properties: {
              className: "max-w-2xl",
              children: [
                {
                  type: "Text",
                  properties: {
                    className: "mb-6",
                    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  }
                },
                {
                  type: "BlockQuote",
                  properties: {
                    variant: "accent",
                    size: "lg",
                    styleVariant: "elegant",
                    shadow: "sm",
                    animated: "fadeIn",
                    className: "my-8",
                    children: "Design is not just what it looks like and feels like. Design is how it works.",
                    author: "Steve Jobs"
                  }
                },
                {
                  type: "Text",
                  properties: {
                    children: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  }
                }
              ]
            }
          })}
        </section>

        {/* Props Reference Section */}
        <section id={sectionIds.props} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Props Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Prop</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Default</th>
                  <th className="text-left p-4">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">variant</td>
                  <td className="p-4 font-mono text-sm">"default" | "primary" | "secondary" | "accent" | "muted" | "destructive"</td>
                  <td className="p-4 font-mono text-sm">"default"</td>
                  <td className="p-4 text-sm text-muted-foreground">Color variant of the blockquote</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">size</td>
                  <td className="p-4 font-mono text-sm">"sm" | "base" | "lg" | "xl"</td>
                  <td className="p-4 font-mono text-sm">"base"</td>
                  <td className="p-4 text-sm text-muted-foreground">Size of the text and padding</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">styleVariant</td>
                  <td className="p-4 font-mono text-sm">"classic" | "modern" | "elegant" | "minimal" | "decorative" | "glossy"</td>
                  <td className="p-4 font-mono text-sm">"classic"</td>
                  <td className="p-4 text-sm text-muted-foreground">Visual style of the blockquote</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">animated</td>
                  <td className="p-4 font-mono text-sm">"none" | "fadeIn" | "slideIn" | "pulse" | "shimmer"</td>
                  <td className="p-4 font-mono text-sm">"none"</td>
                  <td className="p-4 text-sm text-muted-foreground">Animation effect</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">shadow</td>
                  <td className="p-4 font-mono text-sm">"none" | "sm" | "md" | "lg"</td>
                  <td className="p-4 font-mono text-sm">"none"</td>
                  <td className="p-4 text-sm text-muted-foreground">Shadow depth</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">rounded</td>
                  <td className="p-4 font-mono text-sm">"none" | "sm" | "md" | "lg" | "full"</td>
                  <td className="p-4 font-mono text-sm">"none"</td>
                  <td className="p-4 text-sm text-muted-foreground">Border radius</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">cite</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 font-mono text-sm">undefined</td>
                  <td className="p-4 text-sm text-muted-foreground">Citation source</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">author</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 font-mono text-sm">undefined</td>
                  <td className="p-4 text-sm text-muted-foreground">Quote author</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 font-mono text-sm">ReactNode</td>
                  <td className="p-4 font-mono text-sm">required</td>
                  <td className="p-4 text-sm text-muted-foreground">The quote content</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 font-mono text-sm">undefined</td>
                  <td className="p-4 text-sm text-muted-foreground">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-16 border-t">
          <a
            href="/showcase/badge"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>Badge</span>
          </a>
          <a
            href="/showcase"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Showcase
          </a>
          <a
            href="/showcase/box"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Box</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </main>
    </div>
  );
}