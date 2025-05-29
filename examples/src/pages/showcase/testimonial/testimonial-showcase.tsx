import { render } from 'react-jedi';
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

function CollapsibleCode({ title, code }: { title: string; code: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-sm font-medium text-gray-700"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <pre className="p-4 bg-gray-900 text-gray-100 overflow-x-auto">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

export function TestimonialShowcase() {
  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'basic-usage', title: 'Basic Usage' },
    { id: 'variants', title: 'Variants' },
    { id: 'with-rating', title: 'With Rating' },
    { id: 'highlighted', title: 'Highlighted' },
    { id: 'grid-layout', title: 'Grid Layout' },
    { id: 'real-world', title: 'Real World Examples' },
    { id: 'props', title: 'Props Reference' },
  ];

  return (
    <div className="flex gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0">
        <nav className="sticky top-4">
          <h3 className="font-semibold mb-4 text-gray-900">On this page</h3>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-gray-600 hover:text-gray-900 block py-1"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Testimonial Component</h1>
        <p className="text-lg text-gray-600 mb-8">
          Display customer testimonials, reviews, and social proof with various styles and layouts.
        </p>

        {/* Overview Section */}
        <section id="overview" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-600 mb-4">
            The Testimonial component provides a flexible way to showcase customer feedback, reviews, and testimonials. 
            It supports multiple variants, ratings, author information, and can be easily integrated into any layout.
          </p>
        </section>

        {/* Basic Usage */}
        <section id="basic-usage" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
          <p className="text-gray-600 mb-4">
            Here's a simple testimonial with minimal configuration:
          </p>
          <div className="mb-4">
            {render({
              component: 'Testimonial',
              props: {
                content: "React Jedi has transformed how we build our UI. The server-driven approach gives us incredible flexibility.",
                author: {
                  name: "Sarah Chen",
                  role: "Frontend Lead",
                  company: "TechCorp"
                }
              }
            })}
          </div>
          <CollapsibleCode
            title="View JSON Specification"
            code={JSON.stringify({
              component: 'Testimonial',
              props: {
                content: "React Jedi has transformed how we build our UI. The server-driven approach gives us incredible flexibility.",
                author: {
                  name: "Sarah Chen",
                  role: "Frontend Lead",
                  company: "TechCorp"
                }
              }
            }, null, 2)}
          />
        </section>

        {/* Variants */}
        <section id="variants" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Variants</h2>
          <p className="text-gray-600 mb-6">
            The Testimonial component comes with four distinct variants to suit different design needs:
          </p>

          <div className="space-y-8">
            {/* Card Variant */}
            <div>
              <h3 className="text-lg font-medium mb-3">Card Variant</h3>
              <div className="mb-4">
                {render({
                  component: 'Testimonial',
                  props: {
                    variant: 'card',
                    content: "The card variant provides a clean, contained look perfect for grid layouts.",
                    author: {
                      name: "Alex Rivera",
                      role: "Product Designer",
                      company: "DesignHub",
                      avatar: "https://i.pravatar.cc/150?img=1"
                    },
                    rating: 5
                  }
                })}
              </div>
              <CollapsibleCode
                title="View JSON Specification"
                code={JSON.stringify({
                  component: 'Testimonial',
                  props: {
                    variant: 'card',
                    content: "The card variant provides a clean, contained look perfect for grid layouts.",
                    author: {
                      name: "Alex Rivera",
                      role: "Product Designer",
                      company: "DesignHub",
                      avatar: "https://i.pravatar.cc/150?img=1"
                    },
                    rating: 5
                  }
                }, null, 2)}
              />
            </div>

            {/* Minimal Variant */}
            <div>
              <h3 className="text-lg font-medium mb-3">Minimal Variant</h3>
              <div className="mb-4">
                {render({
                  component: 'Testimonial',
                  props: {
                    variant: 'minimal',
                    content: "Clean and simple. The minimal variant focuses on the content without distractions.",
                    author: {
                      name: "Jordan Park",
                      role: "CEO",
                      company: "StartupCo"
                    }
                  }
                })}
              </div>
              <CollapsibleCode
                title="View JSON Specification"
                code={JSON.stringify({
                  component: 'Testimonial',
                  props: {
                    variant: 'minimal',
                    content: "Clean and simple. The minimal variant focuses on the content without distractions.",
                    author: {
                      name: "Jordan Park",
                      role: "CEO",
                      company: "StartupCo"
                    }
                  }
                }, null, 2)}
              />
            </div>

            {/* Large Variant */}
            <div>
              <h3 className="text-lg font-medium mb-3">Large Variant</h3>
              <div className="mb-4">
                {render({
                  component: 'Testimonial',
                  props: {
                    variant: 'large',
                    content: "When you need to make an impact, the large variant commands attention with bigger typography and prominent author details.",
                    author: {
                      name: "Morgan Lee",
                      role: "Director of Engineering",
                      company: "Enterprise Corp",
                      avatar: "https://i.pravatar.cc/150?img=2"
                    },
                    rating: 5,
                    date: "2024-01-15"
                  }
                })}
              </div>
              <CollapsibleCode
                title="View JSON Specification"
                code={JSON.stringify({
                  component: 'Testimonial',
                  props: {
                    variant: 'large',
                    content: "When you need to make an impact, the large variant commands attention with bigger typography and prominent author details.",
                    author: {
                      name: "Morgan Lee",
                      role: "Director of Engineering",
                      company: "Enterprise Corp",
                      avatar: "https://i.pravatar.cc/150?img=2"
                    },
                    rating: 5,
                    date: "2024-01-15"
                  }
                }, null, 2)}
              />
            </div>

            {/* Quote Variant */}
            <div>
              <h3 className="text-lg font-medium mb-3">Quote Variant</h3>
              <div className="mb-4">
                {render({
                  component: 'Testimonial',
                  props: {
                    variant: 'quote',
                    content: "Perfect for highlighting key testimonials with a distinctive quote style that draws the eye.",
                    author: {
                      name: "Casey Kim",
                      role: "Creative Director",
                      company: "Design Agency"
                    }
                  }
                })}
              </div>
              <CollapsibleCode
                title="View JSON Specification"
                code={JSON.stringify({
                  component: 'Testimonial',
                  props: {
                    variant: 'quote',
                    content: "Perfect for highlighting key testimonials with a distinctive quote style that draws the eye.",
                    author: {
                      name: "Casey Kim",
                      role: "Creative Director",
                      company: "Design Agency"
                    }
                  }
                }, null, 2)}
              />
            </div>
          </div>
        </section>

        {/* With Rating */}
        <section id="with-rating" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">With Rating</h2>
          <p className="text-gray-600 mb-6">
            Add star ratings to testimonials for additional credibility:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {render({
              component: 'Testimonial',
              props: {
                variant: 'card',
                content: "Outstanding service! Exceeded all expectations.",
                author: {
                  name: "Riley Thompson",
                  role: "Customer"
                },
                rating: 5
              }
            })}
            {render({
              component: 'Testimonial',
              props: {
                variant: 'card',
                content: "Great product with room for minor improvements.",
                author: {
                  name: "Sam Wilson",
                  role: "Verified Buyer"
                },
                rating: 4
              }
            })}
          </div>
          <CollapsibleCode
            title="View JSON Specification"
            code={JSON.stringify([
              {
                component: 'Testimonial',
                props: {
                  variant: 'card',
                  content: "Outstanding service! Exceeded all expectations.",
                  author: {
                    name: "Riley Thompson",
                    role: "Customer"
                  },
                  rating: 5
                }
              },
              {
                component: 'Testimonial',
                props: {
                  variant: 'card',
                  content: "Great product with room for minor improvements.",
                  author: {
                    name: "Sam Wilson",
                    role: "Verified Buyer"
                  },
                  rating: 4
                }
              }
            ], null, 2)}
          />
        </section>

        {/* Highlighted */}
        <section id="highlighted" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Highlighted Testimonials</h2>
          <p className="text-gray-600 mb-6">
            Draw attention to special testimonials with the highlight prop:
          </p>

          <div className="mb-4">
            {render({
              component: 'Testimonial',
              props: {
                variant: 'large',
                content: "This is a game-changer! React Jedi has revolutionized our development workflow.",
                author: {
                  name: "Taylor Martinez",
                  role: "CTO",
                  company: "Innovation Labs",
                  avatar: "https://i.pravatar.cc/150?img=3"
                },
                rating: 5,
                highlight: true
              }
            })}
          </div>
          <CollapsibleCode
            title="View JSON Specification"
            code={JSON.stringify({
              component: 'Testimonial',
              props: {
                variant: 'large',
                content: "This is a game-changer! React Jedi has revolutionized our development workflow.",
                author: {
                  name: "Taylor Martinez",
                  role: "CTO",
                  company: "Innovation Labs",
                  avatar: "https://i.pravatar.cc/150?img=3"
                },
                rating: 5,
                highlight: true
              }
            }, null, 2)}
          />
        </section>

        {/* Grid Layout */}
        <section id="grid-layout" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Grid Layout</h2>
          <p className="text-gray-600 mb-6">
            Combine multiple testimonials in a grid for social proof sections:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {render({
              component: 'Testimonial',
              props: {
                variant: 'card',
                content: "Incredible flexibility and performance.",
                author: {
                  name: "Chris Anderson",
                  role: "Developer",
                  avatar: "https://i.pravatar.cc/150?img=4"
                },
                rating: 5
              }
            })}
            {render({
              component: 'Testimonial',
              props: {
                variant: 'card',
                content: "The best UI library we've ever used.",
                author: {
                  name: "Pat Murphy",
                  role: "Team Lead",
                  avatar: "https://i.pravatar.cc/150?img=5"
                },
                rating: 5
              }
            })}
            {render({
              component: 'Testimonial',
              props: {
                variant: 'card',
                content: "Saves us hours of development time.",
                author: {
                  name: "Drew Taylor",
                  role: "Freelancer",
                  avatar: "https://i.pravatar.cc/150?img=6"
                },
                rating: 5
              }
            })}
          </div>
          <CollapsibleCode
            title="View JSON Specification"
            code={JSON.stringify({
              component: 'Grid',
              props: { columns: 3, gap: 6 },
              children: [
                {
                  component: 'Testimonial',
                  props: {
                    variant: 'card',
                    content: "Incredible flexibility and performance.",
                    author: {
                      name: "Chris Anderson",
                      role: "Developer",
                      avatar: "https://i.pravatar.cc/150?img=4"
                    },
                    rating: 5
                  }
                },
                {
                  component: 'Testimonial',
                  props: {
                    variant: 'card',
                    content: "The best UI library we've ever used.",
                    author: {
                      name: "Pat Murphy",
                      role: "Team Lead",
                      avatar: "https://i.pravatar.cc/150?img=5"
                    },
                    rating: 5
                  }
                },
                {
                  component: 'Testimonial',
                  props: {
                    variant: 'card',
                    content: "Saves us hours of development time.",
                    author: {
                      name: "Drew Taylor",
                      role: "Freelancer",
                      avatar: "https://i.pravatar.cc/150?img=6"
                    },
                    rating: 5
                  }
                }
              ]
            }, null, 2)}
          />
        </section>

        {/* Real World Examples */}
        <section id="real-world" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Real World Examples</h2>
          <p className="text-gray-600 mb-6">
            Here are some practical use cases for testimonials:
          </p>

          <div className="space-y-8">
            {/* Customer Review */}
            <div>
              <h3 className="text-lg font-medium mb-3">Customer Review</h3>
              <div className="mb-4">
                {render({
                  component: 'Testimonial',
                  props: {
                    variant: 'card',
                    content: "The product quality is amazing and shipping was super fast. Will definitely order again!",
                    author: {
                      name: "Jamie Chen",
                      role: "Verified Buyer",
                      avatar: "https://i.pravatar.cc/150?img=7"
                    },
                    rating: 5,
                    date: "2024-01-20"
                  }
                })}
              </div>
            </div>

            {/* Case Study Quote */}
            <div>
              <h3 className="text-lg font-medium mb-3">Case Study Quote</h3>
              <div className="mb-4">
                {render({
                  component: 'Testimonial',
                  props: {
                    variant: 'large',
                    content: "Implementing React Jedi reduced our development time by 40% and improved our team's productivity significantly. The server-driven approach allowed us to iterate faster and deliver features our users love.",
                    author: {
                      name: "Dr. Alex Kumar",
                      role: "VP of Engineering",
                      company: "TechGiant Inc.",
                      avatar: "https://i.pravatar.cc/150?img=8"
                    },
                    highlight: true
                  }
                })}
              </div>
            </div>

            {/* Press Quote */}
            <div>
              <h3 className="text-lg font-medium mb-3">Press Quote</h3>
              <div className="mb-4">
                {render({
                  component: 'Testimonial',
                  props: {
                    variant: 'quote',
                    content: "React Jedi represents a paradigm shift in how we think about building user interfaces.",
                    author: {
                      name: "Tech Weekly",
                      role: "Leading Technology Publication"
                    }
                  }
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Props Reference */}
        <section id="props" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Props Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Prop</th>
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">Default</th>
                  <th className="text-left py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 pr-4"><code>content</code></td>
                  <td className="py-2 pr-4"><code>string</code></td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">The testimonial text content (required)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4"><code>author</code></td>
                  <td className="py-2 pr-4"><code>object</code></td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Author information object (required)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4"><code>author.name</code></td>
                  <td className="py-2 pr-4"><code>string</code></td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Author's name (required)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4"><code>author.role</code></td>
                  <td className="py-2 pr-4"><code>string</code></td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Author's role or title</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4"><code>author.company</code></td>
                  <td className="py-2 pr-4"><code>string</code></td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Author's company or organization</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4"><code>author.avatar</code></td>
                  <td className="py-2 pr-4"><code>string</code></td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">URL to author's avatar image</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4"><code>variant</code></td>
                  <td className="py-2 pr-4"><code>'card' | 'minimal' | 'large' | 'quote'</code></td>
                  <td className="py-2 pr-4"><code>'card'</code></td>
                  <td className="py-2">Visual style variant</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4"><code>rating</code></td>
                  <td className="py-2 pr-4"><code>number</code></td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Star rating (1-5)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4"><code>date</code></td>
                  <td className="py-2 pr-4"><code>string</code></td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Date of the testimonial</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4"><code>highlight</code></td>
                  <td className="py-2 pr-4"><code>boolean</code></td>
                  <td className="py-2 pr-4"><code>false</code></td>
                  <td className="py-2">Adds visual emphasis to the testimonial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}