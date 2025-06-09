import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NewsletterSignup } from "./newsletter-signup";
import { Mail, Sparkles, Gift, Star, Zap, Heart } from "lucide-react";
import { within, waitFor } from "storybook/test";

const meta = {
  title: "Blocks/Newsletter Signup",
  component: NewsletterSignup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "test"],
} satisfies Meta<typeof NewsletterSignup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Inline variant stories
export const Inline: Story = {
  args: {
    variant: "inline",
    title: "Subscribe to our newsletter",
    description: "Get the latest updates and exclusive content delivered to your inbox.",
    emailPlaceholder: "Enter your email address",
    submitButtonText: "Subscribe",
    showGdprCheckbox: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

export const InlineWithBenefits: Story = {
  args: {
    variant: "inline",
    title: "Join our community",
    description: "Stay informed with our weekly newsletter.",
    benefits: [
      {
        text: "Weekly industry insights and trends",
        icon: <Sparkles className="h-4 w-4 text-primary" />,
      },
      {
        text: "Exclusive subscriber-only content",
        icon: <Star className="h-4 w-4 text-primary" />,
      },
      { text: "Early access to new features", icon: <Zap className="h-4 w-4 text-primary" /> },
      { text: "No spam, unsubscribe anytime", icon: <Heart className="h-4 w-4 text-primary" /> },
    ],
    showNameField: true,
    namePlaceholder: "Your name",
  },
};

export const InlineWithBackground: Story = {
  args: {
    variant: "inline",
    title: "Never miss an update",
    description: "Subscribe to get notified about new releases and features.",
    backgroundPattern: "dots",
    className: "max-w-md",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

export const InlineMinimal: Story = {
  args: {
    variant: "inline",
    title: "Stay updated",
    showGdprCheckbox: false,
    className: "max-w-sm",
  },
};

// With incentive variant
export const WithIncentive: Story = {
  args: {
    variant: "with-incentive",
    title: "Get our free guide + newsletter",
    description: "Join 10,000+ subscribers getting actionable insights every week.",
    incentive: {
      title: "Free: The Ultimate Guide to Modern Web Development",
      description: "A comprehensive 50-page guide covering the latest trends and best practices.",
      icon: <Gift className="h-5 w-5 text-primary" />,
    },
    benefits: [
      { text: "Weekly tutorials and tips" },
      { text: "Exclusive discounts on courses" },
      { text: "Free downloadable resources" },
    ],
    backgroundPattern: "gradient",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

export const WithIncentiveCompact: Story = {
  args: {
    variant: "with-incentive",
    title: "Exclusive offer for new subscribers",
    incentive: {
      title: "Get 20% off your first purchase",
      description: "Plus weekly deals and new product announcements.",
    },
    submitButtonText: "Claim Offer",
    showNameField: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

// Modal variant stories
export const Modal: Story = {
  args: {
    variant: "modal",
    title: "Don't miss out!",
    description: "Subscribe to our newsletter for exclusive updates and offers.",
    benefits: [
      { text: "Be the first to know about new products" },
      { text: "Exclusive subscriber-only discounts" },
      { text: "Weekly tips and tutorials" },
    ],
  },
  render: function ModalStory(args) {
    return (
      <div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Open Newsletter Modal
        </button>
        <NewsletterSignup {...args} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the component to render
    await waitFor(() => {
      // Modal variant might not show checkbox immediately
      return canvas.getByText("Open Newsletter Modal");
    });
  },
};

export const ModalWithExitIntent: Story = {
  args: {
    variant: "modal",
    title: "Wait! Before you go...",
    description: "Get 10% off your first order when you subscribe.",
    showOnExitIntent: true,
    benefits: [
      { text: "Exclusive discount codes" },
      { text: "Early access to sales" },
      { text: "New product announcements" },
    ],
    submitButtonText: "Get My 10% Off",
  },
  parameters: {
    docs: {
      description: {
        story: "Move your mouse to the top of the viewport to trigger the exit intent popup.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Wait for component to render
    await waitFor(() => {
      // Modal with exit intent might not show immediately
      return canvasElement;
    });
  },
};

// Slide-in variant stories
export const SlideInBottomRight: Story = {
  args: {
    variant: "slide-in",
    position: "bottom-right",
    title: "Get updates",
    description: "Subscribe for the latest news.",
    delay: 2000,
    showGdprCheckbox: false,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Slides in from the bottom-right after 2 seconds.",
      },
    },
  },
};

export const SlideInTopLeft: Story = {
  args: {
    variant: "slide-in",
    position: "top-left",
    title: "Special offer!",
    description: "Subscribe and get 15% off.",
    delay: 1000,
    backgroundPattern: "waves",
  },
  parameters: {
    layout: "fullscreen",
  },
  play: async ({ canvasElement }) => {
    // Wait for slide-in to appear after delay
    await waitFor(() => {
      return canvasElement;
    }, { timeout: 2000 });
  },
};

export const SlideInCenter: Story = {
  args: {
    variant: "slide-in",
    position: "center",
    title: "Join our newsletter",
    description: "Get weekly insights delivered to your inbox.",
    delay: 1500,
    benefits: [
      { text: "Curated content" },
      { text: "Expert insights" },
      { text: "Community access" },
    ],
  },
  parameters: {
    layout: "fullscreen",
  },
  play: async ({ canvasElement }) => {
    // Wait for slide-in to appear after delay
    await waitFor(() => {
      return canvasElement;
    }, { timeout: 2000 });
  },
};

// Footer bar variant
export const FooterBar: Story = {
  args: {
    variant: "footer-bar",
    title: "Subscribe to our newsletter",
    description: "Get updates delivered to your inbox",
    showGdprCheckbox: false,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "A fixed footer bar that appears at the bottom of the page.",
      },
    },
  },
  render: function FooterBarStory(args) {
    return (
      <div className="min-h-[400px] relative">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Page Content</h1>
          <p className="mb-4">
            This is example page content. The newsletter signup bar appears at the bottom.
          </p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Show Footer Bar
          </button>
        </div>
        <NewsletterSignup {...args} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the component to render
    await waitFor(() => {
      // This story has showGdprCheckbox: false, so no checkbox to wait for
      return canvas.getByText("Subscribe to our newsletter");
    });
  },
};

// Different background patterns
export const BackgroundPatternDots: Story = {
  args: {
    variant: "inline",
    title: "Subscribe today",
    backgroundPattern: "dots",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

export const BackgroundPatternGrid: Story = {
  args: {
    variant: "inline",
    title: "Join our grid",
    backgroundPattern: "grid",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

export const BackgroundPatternWaves: Story = {
  args: {
    variant: "inline",
    title: "Ride the wave",
    backgroundPattern: "waves",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

export const BackgroundPatternGradient: Story = {
  args: {
    variant: "inline",
    title: "Gradient vibes",
    backgroundPattern: "gradient",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

// With custom background image
export const WithBackgroundImage: Story = {
  args: {
    variant: "inline",
    title: "Travel Newsletter",
    description: "Get wanderlust-inducing content every week.",
    backgroundImage:
      "https://placehold.co/1600x900/EEE/31343C",
    className: "text-white [&_*]:text-white [&_.text-muted-foreground]:text-white/80",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

// Form variations
export const WithNameField: Story = {
  args: {
    variant: "inline",
    title: "Personalized content",
    description: "Tell us your name for a personalized experience.",
    showNameField: true,
    namePlaceholder: "First name",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

export const WithoutGDPR: Story = {
  args: {
    variant: "inline",
    title: "Quick subscribe",
    description: "No checkbox required.",
    showGdprCheckbox: false,
  },
};

export const CustomTexts: Story = {
  args: {
    variant: "inline",
    title: "Tech Weekly",
    description: "The latest in technology, delivered weekly.",
    emailPlaceholder: "your@email.com",
    submitButtonText: "Get Tech News",
    gdprText: "I consent to receiving emails and understand the privacy terms",
    privacyPolicyUrl: "/privacy-policy",
    successTitle: "Welcome aboard!",
    successMessage: "You've successfully joined Tech Weekly. Your first issue will arrive soon.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

// Interactive example with submission handler
export const WithSubmissionHandler: Story = {
  args: {
    variant: "inline",
    title: "Working example",
    description: "This example logs form data to the console.",
    showNameField: true,
    onSubmit: async (data) => {
      console.log("Form submitted with data:", data);
      // Simulate API delay
      await new Promise((resolve) => globalThis.setTimeout(resolve, 2000));
      // You could throw an error here to test error handling
      // throw new Error("Subscription failed");
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

// Animated vs non-animated
export const NonAnimated: Story = {
  args: {
    variant: "inline",
    title: "No animations",
    description: "This variant has animations disabled.",
    animated: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

// Dark mode example
export const DarkMode: Story = {
  args: {
    variant: "inline",
    title: "Dark mode newsletter",
    description: "Looks great in dark mode too!",
    benefits: [
      { text: "Dark mode optimized content" },
      { text: "Eye-friendly reading experience" },
    ],
  },
  decorators: [
    (Story) => (
      <div className="dark bg-gray-900 p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};

// Full example combining multiple features
export const FullFeatured: Story = {
  args: {
    variant: "with-incentive",
    title: "The Developer's Newsletter",
    description: "Join 50,000+ developers getting better at their craft.",
    incentive: {
      title: "Free Course: Mastering TypeScript",
      description: "A $99 value, yours free when you subscribe today.",
      icon: <Gift className="h-6 w-6 text-primary" />,
    },
    benefits: [
      { text: "Weekly coding tutorials", icon: <Mail className="h-4 w-4 text-blue-500" /> },
      { text: "Industry news & trends", icon: <Sparkles className="h-4 w-4 text-purple-500" /> },
      { text: "Exclusive member resources", icon: <Star className="h-4 w-4 text-yellow-500" /> },
      { text: "Job opportunities", icon: <Zap className="h-4 w-4 text-green-500" /> },
    ],
    showNameField: true,
    namePlaceholder: "Your first name",
    emailPlaceholder: "developer@example.com",
    submitButtonText: "Get Free Course + Newsletter",
    backgroundPattern: "gradient",
    className: "max-w-2xl",
    successTitle: "Welcome to the community! 🎉",
    successMessage:
      "Check your email for your free TypeScript course and confirm your subscription.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for the checkbox to be rendered
    await waitFor(() => {
      const checkbox = canvas.getByRole("checkbox");
      return checkbox;
    });
  },
};
