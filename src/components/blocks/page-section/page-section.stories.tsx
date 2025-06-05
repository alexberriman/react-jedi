import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageSection } from "./page-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Check,
  Star,
  Users,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Heart,
  Target,
  Rocket,
  Globe,
} from "lucide-react";

const meta: Meta<typeof PageSection> = {
  title: "Blocks/PageSection",
  component: PageSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs", "test"],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["full-width", "contained", "split", "angled", "curved", "pattern"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl"],
    },
    contentAlignment: {
      control: "select",
      options: ["left", "center", "right"],
    },
    animationType: {
      control: "select",
      options: ["fade", "slide", "zoom", "slide-left", "slide-right"],
    },
    dividerTop: {
      control: "select",
      options: ["none", "wave", "angle", "curve"],
    },
    dividerBottom: {
      control: "select",
      options: ["none", "wave", "angle", "curve"],
    },
    background: {
      control: false,
    },
    dividerColor: {
      control: 'text',
    },
    layout: {
      control: false,
    },
    heading: {
      control: false,
    },
    ctas: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div className="grid md:grid-cols-3 gap-6">
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-3">Feature One</h3>
      <p className="text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
      </p>
    </Card>
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-3">Feature Two</h3>
      <p className="text-muted-foreground">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
      </p>
    </Card>
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-3">Feature Three</h3>
      <p className="text-muted-foreground">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
      </p>
    </Card>
  </div>
);

export const HeroSection: Story = {
  args: {
    layout: { type: "hero" },
    background: {
      type: "gradient",
      value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    heading: {
      title: "Build Something Amazing Today",
      subtitle: "The modern platform for creating exceptional digital experiences",
      alignment: "center",
    },
    description:
      "Join thousands of developers who are building the future with our powerful tools and intuitive APIs.",
    ctas: [
      { text: "Start Free Trial", size: "lg" },
      { text: "Watch Demo", variant: "outline", size: "lg" },
    ],
    padding: "2xl",
    children: (
      <div className="flex gap-8 justify-center text-white mt-8">
        <div className="text-center">
          <div className="text-3xl font-bold">10K+</div>
          <div className="text-sm opacity-80">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">99.9%</div>
          <div className="text-sm opacity-80">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">24/7</div>
          <div className="text-sm opacity-80">Support</div>
        </div>
      </div>
    ),
  },
};

export const FeatureWithImageLeft: Story = {
  args: {
    layout: {
      type: "image-left",
      imageUrl: "https://picsum.photos/600/400",
      imageAlt: "Feature demonstration",
      imageZoomOnHover: true,
      imageShadow: true,
      contentSpacing: "relaxed",
    },
    heading: {
      title: "Powerful Analytics Dashboard",
      subtitle: "Real-time insights at your fingertips",
    },
    description:
      "Track performance, monitor user behavior, and make data-driven decisions with our comprehensive analytics suite.",
    ctas: [
      { text: "Learn More", href: "#" },
      { text: "See Demo", variant: "outline", href: "#" },
    ],
    padding: "xl",
    children: (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <div className="font-medium">Real-time data visualization</div>
            <div className="text-sm text-muted-foreground">
              See your metrics update in real-time with beautiful charts
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <div className="font-medium">Custom dashboards</div>
            <div className="text-sm text-muted-foreground">
              Create personalized views for different team members
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <div className="font-medium">Export reports</div>
            <div className="text-sm text-muted-foreground">
              Generate PDF and Excel reports with one click
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const FeatureWithImageRight: Story = {
  args: {
    layout: {
      type: "image-right",
      imageUrl: "https://picsum.photos/600/400?random=1",
      imageAlt: "Collaboration features",
      imageZoomOnHover: true,
      imageShadow: true,
      contentSpacing: "relaxed",
    },
    heading: {
      title: "Seamless Team Collaboration",
      subtitle: "Work together like never before",
    },
    description: "Break down silos and enhance productivity with tools designed for modern teams.",
    ctas: [{ text: "Start Collaborating", href: "#" }],
    padding: "xl",
    background: {
      type: "color",
      value: "#f9fafb",
    },
    children: (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <div className="font-medium">Real-time collaboration</div>
            <div className="text-sm text-muted-foreground">
              Multiple team members can work on the same project simultaneously
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <div className="font-medium">Instant notifications</div>
            <div className="text-sm text-muted-foreground">
              Stay updated with real-time alerts and mentions
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <div className="font-medium">Secure sharing</div>
            <div className="text-sm text-muted-foreground">
              Enterprise-grade security for all your shared content
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const AlternatingFeatures: Story = {
  render: () => (
    <div>
      <PageSection
        layout={{
          type: "feature-alternating",
          imageUrl: "https://picsum.photos/600/400?random=2",
          imageAlt: "Feature 1",
          imageZoomOnHover: true,
          imageShadow: true,
        }}
        heading={{
          title: "Lightning Fast Performance",
          subtitle: "Built for speed from the ground up",
        }}
        description="Experience blazing fast load times and smooth interactions that keep your users engaged."
        padding="xl"
        alternateBackground
        sectionIndex={0}
      >
        <div className="space-y-6">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50ms</div>
            <div className="text-sm text-muted-foreground">Average response time</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">99.99%</div>
            <div className="text-sm text-muted-foreground">Uptime guarantee</div>
          </div>
        </div>
      </PageSection>

      <PageSection
        layout={{
          type: "feature-alternating",
          imageUrl: "https://picsum.photos/600/400?random=3",
          imageAlt: "Feature 2",
          imageZoomOnHover: true,
          imageShadow: true,
        }}
        heading={{
          title: "Enterprise-Grade Security",
          subtitle: "Your data is safe with us",
        }}
        description="Bank-level encryption and security measures to protect your most sensitive information."
        padding="xl"
        alternateBackground
        sectionIndex={1}
      >
        <div className="space-y-4">
          <Badge className="mb-4">SOC 2 Certified</Badge>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>256-bit SSL encryption</span>
            </li>
            <li className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>GDPR compliant</span>
            </li>
            <li className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Regular security audits</span>
            </li>
          </ul>
        </div>
      </PageSection>

      <PageSection
        layout={{
          type: "feature-alternating",
          imageUrl: "https://picsum.photos/600/400?random=4",
          imageAlt: "Feature 3",
          imageZoomOnHover: true,
          imageShadow: true,
        }}
        heading={{
          title: "Powerful Integrations",
          subtitle: "Connect with your favorite tools",
        }}
        description="Seamlessly integrate with the tools you already use and love."
        padding="xl"
        alternateBackground
        sectionIndex={2}
        ctas={[
          { text: "View All Integrations", href: "#" },
          { text: "Request Integration", variant: "outline", href: "#" },
        ]}
      >
        <div className="grid grid-cols-3 gap-4">
          {["Slack", "GitHub", "Jira", "Figma", "Notion", "Linear"].map((tool) => (
            <div
              key={tool}
              className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow"
            >
              <div className="text-sm font-medium">{tool}</div>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  ),
};

export const ServicesGrid: Story = {
  args: {
    variant: "contained",
    layout: { type: "default", contentWidth: "wide" },
    heading: {
      title: "Everything You Need to Succeed",
      subtitle: "Comprehensive solutions for modern businesses",
      alignment: "center",
    },
    padding: "xl",
    background: {
      type: "gradient",
      value: "linear-gradient(to bottom, #f9fafb, #ffffff)",
    },
    children: (
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Rocket className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Fast Deployment</h3>
          <p className="text-muted-foreground mb-4">
            Get up and running in minutes with our streamlined setup process and comprehensive
            documentation.
          </p>
          <Button variant="ghost" className="p-0 h-auto font-medium">
            Learn more <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Precision Analytics</h3>
          <p className="text-muted-foreground mb-4">
            Make informed decisions with detailed insights and real-time data visualization tools.
          </p>
          <Button variant="ghost" className="p-0 h-auto font-medium">
            Learn more <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Global Scale</h3>
          <p className="text-muted-foreground mb-4">
            Reach users worldwide with our distributed infrastructure and multi-region support.
          </p>
          <Button variant="ghost" className="p-0 h-auto font-medium">
            Learn more <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Card>
      </div>
    ),
  },
};

export const SplitBackground: Story = {
  args: {
    variant: "split",
    background: {
      type: "gradient",
      value: "linear-gradient(to right, #4f46e5 0%, #4f46e5 50%, #f3f4f6 50%, #f3f4f6 100%)",
    },
    children: (
      <>
        <div className="text-white">
          <h3 className="text-3xl font-bold mb-4">Left Side Content</h3>
          <p className="text-lg mb-6">
            This side has a colored background that complements the content on the right.
          </p>
          <Button variant="secondary">Learn More</Button>
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-4">Right Side Content</h3>
          <p className="text-lg text-muted-foreground mb-6">
            This side has a light background for contrast and visual balance.
          </p>
          <Button>Get Started</Button>
        </div>
      </>
    ),
  },
};

export const WithWaveDividers: Story = {
  args: {
    variant: "full-width",
    background: {
      type: "color",
      value: "#1e40af",
    },
    dividerTop: "wave",
    dividerBottom: "wave",
    dividerColor: "#ffffff",
    heading: {
      title: "Wave Dividers",
      subtitle: "Smooth wave shapes at top and bottom",
      alignment: "center",
    },
    children: (
      <div className="text-white">
        <SampleContent />
      </div>
    ),
  },
};

export const WithAngleDividers: Story = {
  args: {
    variant: "contained",
    background: {
      type: "gradient",
      value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    dividerTop: "angle",
    dividerBottom: "angle",
    dividerColor: "#ffffff",
    heading: {
      title: "Angled Dividers",
      subtitle: "Sharp angled dividers for a modern look",
      alignment: "center",
    },
    children: (
      <div className="text-white">
        <SampleContent />
      </div>
    ),
  },
};

export const WithCurveDividers: Story = {
  args: {
    variant: "full-width",
    background: {
      type: "color",
      value: "#059669",
    },
    dividerTop: "curve",
    dividerBottom: "curve",
    dividerColor: "#ffffff",
    heading: {
      title: "Curved Dividers",
      subtitle: "Elegant curved dividers for smooth transitions",
      alignment: "center",
    },
    children: (
      <div className="text-white">
        <SampleContent />
      </div>
    ),
  },
};

export const WithBackgroundImage: Story = {
  args: {
    variant: "full-width",
    background: {
      type: "image",
      value: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600",
      opacity: 0.1,
    },
    heading: {
      title: "Background Image Section",
      subtitle: "Beautiful background images with opacity control",
      alignment: "center",
    },
    children: <SampleContent />,
  },
};

export const WithPattern: Story = {
  args: {
    variant: "contained",
    background: {
      type: "pattern",
      value: "dots",
    },
    heading: {
      title: "Pattern Background",
      subtitle: "Subtle patterns for visual interest",
      alignment: "center",
    },
    children: <SampleContent />,
  },
};

export const WithParallax: Story = {
  args: {
    variant: "full-width",
    background: {
      type: "image",
      value: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600",
    },
    parallax: true,
    heading: {
      title: "Parallax Background",
      subtitle: "Scroll to see the parallax effect in action",
      alignment: "center",
    },
    padding: "xl",
    children: (
      <div className="text-white bg-black/50 p-8 rounded-lg">
        <SampleContent />
      </div>
    ),
  },
};

export const WithAnimation: Story = {
  args: {
    variant: "contained",
    background: {
      type: "gradient",
      value: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
    },
    animate: true,
    animationType: "slide",
    heading: {
      title: "Animated Section",
      subtitle: "Content slides in when scrolled into view",
      alignment: "center",
    },
    children: (
      <div className="text-white">
        <SampleContent />
      </div>
    ),
  },
};

export const MinimalPadding: Story = {
  args: {
    variant: "full-width",
    padding: "sm",
    background: {
      type: "color",
      value: "#fef3c7",
    },
    heading: {
      title: "Minimal Padding",
      alignment: "left",
    },
    contentAlignment: "left",
    children: (
      <p className="text-lg">This section has minimal padding for a more compact appearance.</p>
    ),
  },
};

export const ExtraPadding: Story = {
  args: {
    variant: "contained",
    padding: "2xl",
    background: {
      type: "gradient",
      value: "linear-gradient(to bottom, #e0e7ff, #c7d2fe)",
    },
    heading: {
      title: "Extra Large Padding",
      subtitle: "More breathing room for important content",
      alignment: "center",
    },
    children: (
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xl mb-8">
          Sometimes you need extra space to let your content breathe and create visual hierarchy.
        </p>
        <Button size="lg">Call to Action</Button>
      </div>
    ),
  },
};

export const RightAligned: Story = {
  args: {
    variant: "contained",
    contentAlignment: "right",
    heading: {
      title: "Right Aligned Content",
      subtitle: "Everything aligned to the right",
      alignment: "right",
    },
    children: (
      <div>
        <p className="mb-4">This content is right-aligned for specific design needs.</p>
        <Button>Right Aligned Button</Button>
      </div>
    ),
  },
};

export const ProcessSection: Story = {
  args: {
    variant: "contained",
    layout: { type: "default" },
    heading: {
      title: "How It Works",
      subtitle: "Get started in three simple steps",
      alignment: "center",
    },
    padding: "xl",
    children: (
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary">1</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
          <p className="text-muted-foreground">
            Create your account in seconds with just your email. No credit card required.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary">2</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Configure</h3>
          <p className="text-muted-foreground">
            Set up your workspace and invite your team members to collaborate.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary">3</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Launch</h3>
          <p className="text-muted-foreground">
            Deploy your first project and start seeing results immediately.
          </p>
        </div>
      </div>
    ),
  },
};

export const BenefitsSection: Story = {
  args: {
    variant: "contained",
    layout: { type: "two-column" },
    heading: {
      title: "Why Choose Our Platform?",
      subtitle: "Built by developers, for developers",
      alignment: "center",
    },
    padding: "xl",
    background: {
      type: "gradient",
      value: "linear-gradient(to bottom, #ffffff, #f9fafb)",
    },
    children: (
      <>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Increase Productivity
            </h3>
            <p className="text-muted-foreground">
              Streamline your workflow with automated processes and intelligent suggestions that
              help you work smarter, not harder.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Developer Friendly
            </h3>
            <p className="text-muted-foreground">
              Clean APIs, comprehensive documentation, and a vibrant community make integration a
              breeze.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Industry Leading
            </h3>
            <p className="text-muted-foreground">
              Trusted by Fortune 500 companies and startups alike for mission-critical applications.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Enterprise Security
            </h3>
            <p className="text-muted-foreground">
              Bank-level encryption, regular security audits, and compliance with international
              standards.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              Lightning Fast
            </h3>
            <p className="text-muted-foreground">
              Optimized for performance with global CDN distribution and edge computing
              capabilities.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              Team Collaboration
            </h3>
            <p className="text-muted-foreground">
              Real-time collaboration features that keep your entire team in sync and productive.
            </p>
          </div>
        </div>
      </>
    ),
  },
};

export const ComparisonSection: Story = {
  args: {
    variant: "contained",
    layout: { type: "centered" },
    heading: {
      title: "See the Difference",
      subtitle: "Compare us with the competition",
      alignment: "center",
    },
    padding: "xl",
    children: (
      <div className="overflow-x-auto mt-12">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Features</th>
              <th className="text-center p-4 bg-primary/5">
                <div className="font-bold text-primary">Our Platform</div>
              </th>
              <th className="text-center p-4">Competitor A</th>
              <th className="text-center p-4">Competitor B</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Unlimited Projects", true, false, true],
              ["24/7 Support", true, false, false],
              ["Custom Integrations", true, true, false],
              ["Advanced Analytics", true, false, false],
              ["API Access", true, true, true],
              ["White Labeling", true, false, false],
            ].map(([feature, us, compA, compB], index) => (
              <tr key={index} className="border-b">
                <td className="p-4 font-medium">{feature}</td>
                <td className="text-center p-4 bg-primary/5">
                  {us ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="text-center p-4">
                  {compA ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="text-center p-4">
                  {compB ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
};

export const FullMarketingPage: Story = {
  render: () => (
    <div>
      {/* Hero */}
      <PageSection
        layout={{ type: "hero" }}
        background={{
          type: "gradient",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
        heading={{
          title: "Build Something Amazing",
          subtitle: "The all-in-one platform for modern teams",
        }}
        description="Start building today with the tools you need to succeed."
        ctas={[
          { text: "Get Started Free", size: "lg" },
          { text: "Book a Demo", variant: "outline", size: "lg" },
        ]}
        padding="2xl"
      >
        <div />
      </PageSection>

      {/* Features */}
      <PageSection
        layout={{
          type: "feature-alternating",
          imageUrl: "https://picsum.photos/600/400?random=20",
          imageZoomOnHover: true,
          imageShadow: true,
        }}
        heading={{
          title: "Powerful Features",
          subtitle: "Everything you need in one place",
        }}
        alternateBackground
        sectionIndex={0}
        padding="xl"
      >
        <div className="space-y-4">
          <Badge>New</Badge>
          <p className="text-lg">
            Experience the next generation of productivity tools designed to help your team achieve
            more.
          </p>
        </div>
      </PageSection>

      {/* Stats */}
      <PageSection
        layout={{ type: "centered" }}
        heading={{
          title: "Trusted Worldwide",
          alignment: "center",
        }}
        alternateBackground
        sectionIndex={1}
        padding="xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">10M+</div>
            <div className="text-muted-foreground">Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">150+</div>
            <div className="text-muted-foreground">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <PageSection
        layout={{ type: "centered" }}
        background={{
          type: "gradient",
          value: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
        }}
        heading={{
          title: "Ready to Get Started?",
          subtitle: "Join thousands of teams already using our platform",
          alignment: "center",
        }}
        ctas={[{ text: "Start Free Trial", variant: "secondary", size: "lg" }]}
        padding="2xl"
        dividerTop="wave"
        dividerColor="#ffffff"
      >
        <div />
      </PageSection>
    </div>
  ),
};

export const CTASection: Story = {
  args: {
    variant: "full-width",
    layout: { type: "centered" },
    background: {
      type: "gradient",
      value: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    },
    padding: "2xl",
    dividerTop: "wave",
    dividerBottom: "wave",
    dividerColor: "#ffffff",
    animate: true,
    animationType: "zoom",
    heading: {
      title: "Ready to Get Started?",
      subtitle: "Join thousands of satisfied customers today",
      alignment: "center",
    },
    description: "Start your free trial today and see the difference. No credit card required.",
    ctas: [
      { text: "Start Free Trial", variant: "secondary", size: "lg" },
      { text: "Schedule Demo", variant: "outline", size: "lg" },
    ],
    children: (
      <div className="text-white text-center mt-8">
        <p className="text-sm opacity-80">
          ✓ 14-day free trial ✓ No credit card required ✓ Cancel anytime
        </p>
      </div>
    ),
  },
};

export const StatsSection: Story = {
  args: {
    variant: "contained",
    layout: { type: "centered" },
    heading: {
      title: "Trusted by Industry Leaders",
      subtitle: "Our numbers speak for themselves",
      alignment: "center",
    },
    padding: "xl",
    background: {
      type: "color",
      value: "#f9fafb",
    },
    children: (
      <div className="grid md:grid-cols-4 gap-8 mt-12">
        <div className="text-center">
          <div className="text-5xl font-bold text-primary mb-2">50K+</div>
          <div className="text-lg font-medium mb-1">Active Users</div>
          <div className="text-sm text-muted-foreground">Growing every day</div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold text-primary mb-2">99.9%</div>
          <div className="text-lg font-medium mb-1">Uptime SLA</div>
          <div className="text-sm text-muted-foreground">Industry leading reliability</div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold text-primary mb-2">4.9/5</div>
          <div className="text-lg font-medium mb-1">Customer Rating</div>
          <div className="text-sm text-muted-foreground">Based on 1000+ reviews</div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold text-primary mb-2">24/7</div>
          <div className="text-lg font-medium mb-1">Support Team</div>
          <div className="text-sm text-muted-foreground">Always here to help</div>
        </div>
      </div>
    ),
  },
};

export const TestimonialsSection: Story = {
  args: {
    variant: "full-width",
    layout: { type: "default" },
    heading: {
      title: "What Our Customers Say",
      subtitle: "Don't just take our word for it",
      alignment: "center",
    },
    padding: "xl",
    children: (
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card className="p-6">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              &ldquo;This platform has transformed how we work. The intuitive interface and powerful
              features have boosted our productivity significantly.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://picsum.photos/40/40?random=10"
                alt="Customer"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">CEO, TechCorp</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              &ldquo;The customer support is exceptional. They&apos;re always available and go above
              and beyond to ensure we&apos;re successful.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://picsum.photos/40/40?random=11"
                alt="Customer"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">Michael Chen</div>
                <div className="text-sm text-muted-foreground">CTO, StartupXYZ</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              &ldquo;Best investment we&apos;ve made this year. The ROI has been incredible, and our
              team loves using it every day.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://picsum.photos/40/40?random=12"
                alt="Customer"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">Emily Davis</div>
                <div className="text-sm text-muted-foreground">Product Manager, InnovateCo</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    ),
  },
};

export const PricingSection: Story = {
  args: {
    variant: "contained",
    layout: { type: "default" },
    heading: {
      title: "Simple, Transparent Pricing",
      subtitle: "Choose the plan that fits your needs",
      alignment: "center",
    },
    padding: "xl",
    children: (
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <div className="text-4xl font-bold mb-2">
              $29<span className="text-lg font-normal text-muted-foreground">/mo</span>
            </div>
            <p className="text-muted-foreground">Perfect for small teams</p>
          </div>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Up to 5 users</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>10GB storage</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Basic analytics</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Email support</span>
            </li>
          </ul>
          <Button className="w-full">Get Started</Button>
        </Card>
        <Card className="p-6 border-primary shadow-lg relative overflow-hidden">
          <Badge className="absolute top-4 right-4">Popular</Badge>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <div className="text-4xl font-bold mb-2">
              $79<span className="text-lg font-normal text-muted-foreground">/mo</span>
            </div>
            <p className="text-muted-foreground">For growing businesses</p>
          </div>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Up to 20 users</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>100GB storage</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Advanced analytics</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Priority support</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>API access</span>
            </li>
          </ul>
          <Button className="w-full" size="lg">
            Get Started
          </Button>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <div className="text-4xl font-bold mb-2">Custom</div>
            <p className="text-muted-foreground">For large organizations</p>
          </div>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Unlimited users</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Unlimited storage</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Custom analytics</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Dedicated support</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>SLA guarantee</span>
            </li>
          </ul>
          <Button className="w-full" variant="outline">
            Contact Sales
          </Button>
        </Card>
      </div>
    ),
  },
};
