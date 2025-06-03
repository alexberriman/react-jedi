import * as React from "react";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseLayout } from "../../../../components/layouts/showcase-layout";
import { CodeBlock } from "../../../../components/ui/code-block";
import { Tabs } from "../../../../components/ui/tabs";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";
import { Sparkles, Gift, Star, Zap, Heart, Mail } from "lucide-react";

// Example specifications
const inlineForm: ComponentSpec = {
  type: "NewsletterSignup",
  props: {
    variant: "inline",
    title: "Subscribe to our newsletter",
    description: "Get the latest updates and exclusive content delivered to your inbox.",
    emailPlaceholder: "Enter your email address",
    submitButtonText: "Subscribe",
    showGdprCheckbox: true,
  },
};

const inlineWithBenefits: ComponentSpec = {
  type: "NewsletterSignup",
  props: {
    variant: "inline",
    title: "Join our community",
    description: "Stay informed with our weekly newsletter.",
    benefits: [
      { text: "Weekly industry insights and trends" },
      { text: "Exclusive subscriber-only content" },
      { text: "Early access to new features" },
      { text: "No spam, unsubscribe anytime" },
    ],
    showNameField: true,
    namePlaceholder: "Your name",
    backgroundPattern: "dots",
  },
};

const withIncentive: ComponentSpec = {
  type: "NewsletterSignup",
  props: {
    variant: "with-incentive",
    title: "Get our free guide + newsletter",
    description: "Join 10,000+ subscribers getting actionable insights every week.",
    incentive: {
      title: "Free: The Ultimate Guide to Modern Web Development",
      description: "A comprehensive 50-page guide covering the latest trends and best practices.",
    },
    benefits: [
      { text: "Weekly tutorials and tips" },
      { text: "Exclusive discounts on courses" },
      { text: "Free downloadable resources" },
    ],
    backgroundPattern: "gradient",
  },
};

const modalExample: ComponentSpec = {
  type: "NewsletterSignup",
  props: {
    variant: "modal",
    title: "Don't miss out!",
    description: "Subscribe to our newsletter for exclusive updates and offers.",
    benefits: [
      { text: "Be the first to know about new products" },
      { text: "Exclusive subscriber-only discounts" },
      { text: "Weekly tips and tutorials" },
    ],
  },
};

const slideInExample: ComponentSpec = {
  type: "NewsletterSignup",
  props: {
    variant: "slide-in",
    position: "bottom-right",
    title: "Get updates",
    description: "Subscribe for the latest news.",
    delay: 2000,
    showGdprCheckbox: false,
  },
};

const footerBarExample: ComponentSpec = {
  type: "NewsletterSignup",
  props: {
    variant: "footer-bar",
    title: "Subscribe to our newsletter",
    description: "Get updates delivered to your inbox",
    showGdprCheckbox: false,
  },
};

const minimalForm: ComponentSpec = {
  type: "NewsletterSignup",
  props: {
    variant: "inline",
    title: "Stay updated",
    showGdprCheckbox: false,
    className: "max-w-sm",
  },
};

const darkModeExample: ComponentSpec = {
  type: "NewsletterSignup",
  props: {
    variant: "inline",
    title: "Dark mode newsletter",
    description: "Looks great in dark mode too!",
    benefits: [
      { text: "Dark mode optimized content" },
      { text: "Eye-friendly reading experience" },
    ],
  },
};

const fullFeatured: ComponentSpec = {
  type: "NewsletterSignup",
  props: {
    variant: "with-incentive",
    title: "The Developer's Newsletter",
    description: "Join 50,000+ developers getting better at their craft.",
    incentive: {
      title: "Free Course: Mastering TypeScript",
      description: "A $99 value, yours free when you subscribe today.",
    },
    benefits: [
      { text: "Weekly coding tutorials" },
      { text: "Industry news & trends" },
      { text: "Exclusive member resources" },
      { text: "Job opportunities" },
    ],
    showNameField: true,
    namePlaceholder: "Your first name",
    emailPlaceholder: "developer@example.com",
    submitButtonText: "Get Free Course + Newsletter",
    backgroundPattern: "gradient",
    className: "max-w-2xl",
    successTitle: "Welcome to the community! 🎉",
    successMessage: "Check your email for your free TypeScript course and confirm your subscription.",
  },
};

// Code examples for each variant
const inlineCode = `{
  type: "NewsletterSignup",
  props: {
    variant: "inline",
    title: "Subscribe to our newsletter",
    description: "Get the latest updates delivered to your inbox.",
    emailPlaceholder: "Enter your email address",
    submitButtonText: "Subscribe",
    showGdprCheckbox: true
  }
}`;

const withIncentiveCode = `{
  type: "NewsletterSignup",
  props: {
    variant: "with-incentive",
    title: "Get our free guide + newsletter",
    description: "Join 10,000+ subscribers.",
    incentive: {
      title: "Free: The Ultimate Guide",
      description: "A comprehensive 50-page guide."
    },
    benefits: [
      { text: "Weekly tutorials" },
      { text: "Exclusive discounts" }
    ],
    backgroundPattern: "gradient"
  }
}`;

const modalCode = `{
  type: "NewsletterSignup",
  props: {
    variant: "modal",
    title: "Don't miss out!",
    description: "Subscribe for exclusive updates.",
    benefits: [
      { text: "New product alerts" },
      { text: "Subscriber discounts" }
    ]
  }
}`;

const slideInCode = `{
  type: "NewsletterSignup",
  props: {
    variant: "slide-in",
    position: "bottom-right",
    title: "Get updates",
    description: "Subscribe for the latest news.",
    delay: 2000,
    showGdprCheckbox: false
  }
}`;

const footerBarCode = `{
  type: "NewsletterSignup",
  props: {
    variant: "footer-bar",
    title: "Subscribe to our newsletter",
    description: "Get updates delivered to your inbox",
    showGdprCheckbox: false
  }
}`;

interface ExampleSectionProps {
  readonly title: string;
  readonly description: string;
  readonly spec: ComponentSpec;
  readonly code: string;
  readonly variant?: "default" | "dark" | "full-width";
  readonly children?: React.ReactNode;
}

function ExampleSection({ title, description, spec, code, variant = "default", children }: ExampleSectionProps) {
  const [activeTab, setActiveTab] = React.useState("preview");

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <Button
              variant={activeTab === "preview" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </Button>
            <Button
              variant={activeTab === "code" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("code")}
            >
              Code
            </Button>
          </div>

          {activeTab === "preview" && (
            <div className={cn(
              "border rounded-lg overflow-hidden",
              variant === "dark" && "dark bg-gray-900",
              variant === "full-width" && "min-h-[400px]"
            )}>
              <div className={cn(
                "p-8",
                variant === "dark" && "bg-gray-900",
                variant === "full-width" && "p-0"
              )}>
                {children || render(spec)}
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <CodeBlock code={code} language="json" />
          )}
        </div>
      </Tabs>
    </div>
  );
}

export function NewsletterSignupShowcasePage() {
  usePageMetadata({
    title: "Newsletter Signup Block",
    description: "Flexible email capture components with multiple display modes and GDPR compliance",
  });

  const [showModal, setShowModal] = React.useState(false);
  const [showSlideIn, setShowSlideIn] = React.useState(false);
  const [showFooterBar, setShowFooterBar] = React.useState(false);

  return (
    <ShowcaseLayout
      title="Newsletter Signup"
      description="Capture email addresses with style using our flexible newsletter signup components. Features multiple variants, GDPR compliance, and beautiful animations."
    >
      <div className="space-y-12">
        {/* Overview Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground mb-6">
            The Newsletter Signup block provides multiple ways to capture email addresses from your visitors. 
            With support for inline forms, modals, slide-ins, and more, you can choose the perfect approach 
            for your use case while maintaining a consistent, professional appearance.
          </p>
        </section>

        {/* Inline Variants */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Inline Variants</h2>
            <p className="text-muted-foreground mb-6">
              Perfect for embedding within your content or as standalone sections.
            </p>
          </div>

          <ExampleSection
            title="Basic Inline Form"
            description="A simple, clean newsletter signup form that fits seamlessly into your content."
            spec={inlineForm}
            code={inlineCode}
          />

          <ExampleSection
            title="With Benefits"
            description="Highlight the value proposition with a list of subscriber benefits."
            spec={inlineWithBenefits}
            code={`{
  type: "NewsletterSignup",
  props: {
    variant: "inline",
    title: "Join our community",
    benefits: [
      { text: "Weekly insights" },
      { text: "Exclusive content" },
      { text: "Early access" },
      { text: "No spam" }
    ],
    showNameField: true,
    backgroundPattern: "dots"
  }
}`}
          />

          <ExampleSection
            title="Minimal"
            description="A compact version for tight spaces or subtle CTAs."
            spec={minimalForm}
            code={`{
  type: "NewsletterSignup",
  props: {
    variant: "inline",
    title: "Stay updated",
    showGdprCheckbox: false,
    className: "max-w-sm"
  }
}`}
          />
        </section>

        {/* With Incentive */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">With Incentive</h2>
            <p className="text-muted-foreground mb-6">
              Boost conversions by offering something valuable to subscribers.
            </p>
          </div>

          <ExampleSection
            title="Free Guide Offer"
            description="Combine newsletter signup with a valuable lead magnet."
            spec={withIncentive}
            code={withIncentiveCode}
          />

          <ExampleSection
            title="Full Featured"
            description="A comprehensive example with all the bells and whistles."
            spec={fullFeatured}
            code={`{
  type: "NewsletterSignup",
  props: {
    variant: "with-incentive",
    title: "The Developer's Newsletter",
    description: "Join 50,000+ developers.",
    incentive: {
      title: "Free Course: Mastering TypeScript",
      description: "A $99 value, yours free."
    },
    benefits: [...],
    showNameField: true,
    submitButtonText: "Get Free Course",
    backgroundPattern: "gradient"
  }
}`}
          />
        </section>

        {/* Interactive Variants */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Interactive Variants</h2>
            <p className="text-muted-foreground mb-6">
              Capture attention with modals, slide-ins, and footer bars.
            </p>
          </div>

          {/* Modal */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Modal Popup</h3>
              <p className="text-sm text-muted-foreground">
                Perfect for exit intent or timed popups. Can be triggered on user action or automatically.
              </p>
            </div>
            <div className="space-y-4">
              <Button onClick={() => setShowModal(true)}>
                Open Modal Example
              </Button>
              {showModal && (
                <div>
                  {render({
                    ...modalExample,
                    props: {
                      ...modalExample.props,
                      onClose: () => setShowModal(false),
                    },
                  })}
                </div>
              )}
              <CodeBlock code={modalCode} language="json" />
            </div>
          </div>

          {/* Slide-in */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Slide-in</h3>
              <p className="text-sm text-muted-foreground">
                Non-intrusive notification that slides in from the corner after a delay.
              </p>
            </div>
            <div className="space-y-4">
              <Button onClick={() => setShowSlideIn(true)}>
                Show Slide-in Example
              </Button>
              {showSlideIn && (
                <div className="relative h-[200px]">
                  {render({
                    type: "NewsletterSignup",
                    props: {
                      variant: "slide-in",
                      position: "bottom-right",
                      title: "Get updates",
                      description: "Subscribe for the latest news.",
                      delay: 0, // Show immediately for demo
                      showGdprCheckbox: false,
                      onClose: () => setShowSlideIn(false),
                    },
                  })}
                </div>
              )}
              <CodeBlock code={slideInCode} language="json" />
            </div>
          </div>

          {/* Footer Bar */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Footer Bar</h3>
              <p className="text-sm text-muted-foreground">
                A persistent bar at the bottom of the page for maximum visibility.
              </p>
            </div>
            <div className="space-y-4">
              <Button onClick={() => setShowFooterBar(true)}>
                Show Footer Bar Example
              </Button>
              {showFooterBar && (
                <div className="relative h-[100px]">
                  {render({
                    type: "NewsletterSignup",
                    props: {
                      variant: "footer-bar",
                      title: "Subscribe to our newsletter",
                      description: "Get updates delivered to your inbox",
                      showGdprCheckbox: false,
                      onClose: () => setShowFooterBar(false),
                    },
                  })}
                </div>
              )}
              <CodeBlock code={footerBarCode} language="json" />
            </div>
          </div>
        </section>

        {/* Background Patterns */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Background Patterns</h2>
            <p className="text-muted-foreground mb-6">
              Add visual interest with subtle background patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["dots", "grid", "waves", "gradient"].map((pattern) => (
              <div key={pattern} className="space-y-2">
                <h3 className="text-sm font-semibold capitalize">{pattern} Pattern</h3>
                <div className="border rounded-lg overflow-hidden">
                  {render({
                    type: "NewsletterSignup",
                    props: {
                      variant: "inline",
                      title: `${pattern.charAt(0).toUpperCase() + pattern.slice(1)} background`,
                      backgroundPattern: pattern,
                      showGdprCheckbox: false,
                    },
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dark Mode */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Dark Mode Support</h2>
            <p className="text-muted-foreground mb-6">
              All variants work beautifully in dark mode.
            </p>
          </div>

          <ExampleSection
            title="Dark Mode Example"
            description="The component automatically adapts to your theme."
            spec={darkModeExample}
            code={`{
  type: "NewsletterSignup",
  props: {
    variant: "inline",
    title: "Dark mode newsletter",
    description: "Looks great in dark mode!",
    benefits: [
      { text: "Dark mode optimized" },
      { text: "Eye-friendly" }
    ]
  }
}`}
            variant="dark"
          />
        </section>

        {/* Configuration Options */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Configuration Options</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Property</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Default</th>
                  <th className="text-left p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-mono text-xs">variant</td>
                  <td className="p-2 text-muted-foreground">string</td>
                  <td className="p-2 text-muted-foreground">"inline"</td>
                  <td className="p-2 text-muted-foreground">Display variant: inline, modal, slide-in, footer-bar, with-incentive</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono text-xs">title</td>
                  <td className="p-2 text-muted-foreground">string</td>
                  <td className="p-2 text-muted-foreground">"Stay updated"</td>
                  <td className="p-2 text-muted-foreground">Main heading text</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono text-xs">description</td>
                  <td className="p-2 text-muted-foreground">string</td>
                  <td className="p-2 text-muted-foreground">-</td>
                  <td className="p-2 text-muted-foreground">Descriptive text below the title</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono text-xs">benefits</td>
                  <td className="p-2 text-muted-foreground">array</td>
                  <td className="p-2 text-muted-foreground">-</td>
                  <td className="p-2 text-muted-foreground">List of subscriber benefits</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono text-xs">incentive</td>
                  <td className="p-2 text-muted-foreground">object</td>
                  <td className="p-2 text-muted-foreground">-</td>
                  <td className="p-2 text-muted-foreground">Special offer details (title, description, icon)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono text-xs">showNameField</td>
                  <td className="p-2 text-muted-foreground">boolean</td>
                  <td className="p-2 text-muted-foreground">false</td>
                  <td className="p-2 text-muted-foreground">Show name input field</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono text-xs">showGdprCheckbox</td>
                  <td className="p-2 text-muted-foreground">boolean</td>
                  <td className="p-2 text-muted-foreground">true</td>
                  <td className="p-2 text-muted-foreground">Show GDPR consent checkbox</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono text-xs">backgroundPattern</td>
                  <td className="p-2 text-muted-foreground">string</td>
                  <td className="p-2 text-muted-foreground">"none"</td>
                  <td className="p-2 text-muted-foreground">Background pattern: dots, grid, waves, gradient, none</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono text-xs">position</td>
                  <td className="p-2 text-muted-foreground">string</td>
                  <td className="p-2 text-muted-foreground">"bottom-right"</td>
                  <td className="p-2 text-muted-foreground">Position for slide-in variant</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono text-xs">delay</td>
                  <td className="p-2 text-muted-foreground">number</td>
                  <td className="p-2 text-muted-foreground">5000</td>
                  <td className="p-2 text-muted-foreground">Delay in ms before showing slide-in</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono text-xs">showOnExitIntent</td>
                  <td className="p-2 text-muted-foreground">boolean</td>
                  <td className="p-2 text-muted-foreground">false</td>
                  <td className="p-2 text-muted-foreground">Show modal when user shows exit intent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Keep your value proposition clear and compelling</li>
            <li>Use benefits lists to highlight what subscribers will receive</li>
            <li>Consider offering an incentive to boost conversion rates</li>
            <li>Always include GDPR compliance for European visitors</li>
            <li>Test different variants to see what works best for your audience</li>
            <li>Use exit intent or timed delays thoughtfully to avoid annoying users</li>
            <li>Make unsubscribing easy to build trust</li>
            <li>Personalize success messages to set expectations</li>
          </ul>
        </section>
      </div>
    </ShowcaseLayout>
  );
}