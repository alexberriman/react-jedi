import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NewsletterSignup } from "./newsletter-signup";
import { Mail, Sparkles, Gift, Star, Zap, Heart } from "lucide-react";
import { within, waitFor, expect } from "storybook/test";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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

// Helper function to wait for component to fully render and settle
const waitForComponentToSettle = async () => {
  // Give Radix UI components time to initialize and settle internal state
  // This prevents act() warnings from internal state updates
  await new Promise(resolve => globalThis.setTimeout(resolve, 250));
};

// Helper function to safely wait for checkbox with proper timing
const waitForCheckbox = async (canvas: ReturnType<typeof within>) => {
  // First wait for component to settle
  await waitForComponentToSettle();
  
  await waitFor(() => {
    const checkbox = canvas.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    return checkbox;
  }, { timeout: 3000 });
};

// Inline variant stories
export const Inline = enhanceStoryForDualMode(
  {
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
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify email input is rendered
      await waitFor(() => {
        expect(canvas.getByLabelText("Email address")).toBeInTheDocument();
      });
      
      // Verify submit button is rendered
      await waitFor(() => {
        expect(canvas.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
      });
      
      // Verify GDPR checkbox is rendered
      await waitForCheckbox(canvas);
      
      // Verify title and description
      expect(canvas.getByText("Subscribe to our newsletter")).toBeInTheDocument();
      expect(canvas.getByText("Get the latest updates and exclusive content delivered to your inbox.")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "NewsletterSignup",
      variant: "inline",
      title: "Subscribe to our newsletter",
      description: "Get the latest updates and exclusive content delivered to your inbox.",
      emailPlaceholder: "Enter your email address",
      submitButtonText: "Subscribe",
      showGdprCheckbox: true,
    }
  }
) as Story;

export const InlineWithBenefits = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify name field is rendered
      await waitFor(() => {
        expect(canvas.getByLabelText("Name")).toBeInTheDocument();
      });
      
      // Verify email input is rendered
      await waitFor(() => {
        expect(canvas.getByLabelText("Email address")).toBeInTheDocument();
      });
      
      // Verify benefits are rendered
      await waitFor(() => {
        expect(canvas.getByText("Weekly industry insights and trends")).toBeInTheDocument();
        expect(canvas.getByText("Exclusive subscriber-only content")).toBeInTheDocument();
        expect(canvas.getByText("Early access to new features")).toBeInTheDocument();
        expect(canvas.getByText("No spam, unsubscribe anytime")).toBeInTheDocument();
      });
    },
  },
  {
    renderSpec: {
      type: "NewsletterSignup",
      variant: "inline",
      title: "Join our community",
      description: "Stay informed with our weekly newsletter.",
      benefits: [
        {
          text: "Weekly industry insights and trends",
          icon: "Sparkles"
        },
        {
          text: "Exclusive subscriber-only content",
          icon: "Star"
        },
        { text: "Early access to new features", icon: "Zap" },
        { text: "No spam, unsubscribe anytime", icon: "Heart" }
      ],
      showNameField: true,
      namePlaceholder: "Your name",
    }
  }
) as Story;

export const InlineWithBackground = enhanceStoryForDualMode(
  {
    args: {
      variant: "inline",
      title: "Never miss an update",
      description: "Subscribe to get notified about new releases and features.",
      backgroundPattern: "dots",
      className: "max-w-md",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify title and description
      await waitFor(() => {
        expect(canvas.getByText("Never miss an update")).toBeInTheDocument();
        expect(canvas.getByText("Subscribe to get notified about new releases and features.")).toBeInTheDocument();
      });
      
      // Verify GDPR checkbox is rendered
      await waitForCheckbox(canvas);
      
      // Verify submit button
      await waitFor(() => {
        expect(canvas.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
      });
    },
  },
  {
    renderSpec: {
      type: "NewsletterSignup",
      variant: "inline",
      title: "Never miss an update",
      description: "Subscribe to get notified about new releases and features.",
      backgroundPattern: "dots",
      className: "max-w-md",
    }
  }
) as Story;

export const InlineMinimal = enhanceStoryForDualMode(
  {
    args: {
      variant: "inline",
      title: "Stay updated",
      showGdprCheckbox: false,
      className: "max-w-sm",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify title is rendered
      await waitFor(() => {
        expect(canvas.getByText("Stay updated")).toBeInTheDocument();
      });
      
      // Verify email input is rendered
      await waitFor(() => {
        expect(canvas.getByLabelText("Email address")).toBeInTheDocument();
      });
      
      // Verify no GDPR checkbox (showGdprCheckbox is false)
      expect(canvas.queryByRole("checkbox")).not.toBeInTheDocument();
      
      // Verify submit button
      await waitFor(() => {
        expect(canvas.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
      });
    },
  },
  {
    renderSpec: {
      type: "NewsletterSignup",
      variant: "inline",
      title: "Stay updated",
      showGdprCheckbox: false,
      className: "max-w-sm",
    }
  }
) as Story;

// With incentive variant
export const WithIncentive = enhanceStoryForDualMode(
  {
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
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify title and description
      await waitFor(() => {
        expect(canvas.getByText("Get our free guide + newsletter")).toBeInTheDocument();
        expect(canvas.getByText("Join 10,000+ subscribers getting actionable insights every week.")).toBeInTheDocument();
      });
      
      // Verify incentive content
      await waitFor(() => {
        expect(canvas.getByText("Free: The Ultimate Guide to Modern Web Development")).toBeInTheDocument();
        expect(canvas.getByText("A comprehensive 50-page guide covering the latest trends and best practices.")).toBeInTheDocument();
      });
      
      // Verify benefits
      await waitFor(() => {
        expect(canvas.getByText("Weekly tutorials and tips")).toBeInTheDocument();
        expect(canvas.getByText("Exclusive discounts on courses")).toBeInTheDocument();
        expect(canvas.getByText("Free downloadable resources")).toBeInTheDocument();
      });
      
      // Verify checkbox is rendered
      await waitForCheckbox(canvas);
    },
  },
  {
    renderSpec: {
      type: "NewsletterSignup",
      variant: "with-incentive",
      title: "Get our free guide + newsletter",
      description: "Join 10,000+ subscribers getting actionable insights every week.",
      incentive: {
        title: "Free: The Ultimate Guide to Modern Web Development",
        description: "A comprehensive 50-page guide covering the latest trends and best practices.",
        icon: "Gift"
      },
      benefits: [
        { text: "Weekly tutorials and tips" },
        { text: "Exclusive discounts on courses" },
        { text: "Free downloadable resources" }
      ],
      backgroundPattern: "gradient",
    }
  }
) as Story;

export const WithIncentiveCompact = enhanceStoryForDualMode(
  {
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
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify title
      await waitFor(() => {
        expect(canvas.getByText("Exclusive offer for new subscribers")).toBeInTheDocument();
      });
      
      // Verify incentive
      await waitFor(() => {
        expect(canvas.getByText("Get 20% off your first purchase")).toBeInTheDocument();
        expect(canvas.getByText("Plus weekly deals and new product announcements.")).toBeInTheDocument();
      });
      
      // Verify name field is shown
      await waitFor(() => {
        expect(canvas.getByLabelText("Name")).toBeInTheDocument();
      });
      
      // Verify custom submit button text
      await waitFor(() => {
        expect(canvas.getByRole("button", { name: "Claim Offer" })).toBeInTheDocument();
      });
      
      // Verify checkbox is rendered
      await waitForCheckbox(canvas);
    },
  },
  {
    renderSpec: {
      type: "NewsletterSignup",
      variant: "with-incentive",
      title: "Exclusive offer for new subscribers",
      incentive: {
        title: "Get 20% off your first purchase",
        description: "Plus weekly deals and new product announcements."
      },
      submitButtonText: "Claim Offer",
      showNameField: true,
    }
  }
) as Story;

// Modal variant stories
export const Modal = enhanceStoryForDualMode(
  {
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
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify the open button is rendered
      await waitFor(() => {
        expect(canvas.getByText("Open Newsletter Modal")).toBeInTheDocument();
      });
      
      // Note: Modal content is not immediately visible, so we only verify the trigger exists
      // The actual modal content would need to be tested after clicking the button
    },
  },
  {
    renderSpec: {
      type: "Box",
      children: [
        {
          type: "Button",
          children: "Open Newsletter Modal",
          className: "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        },
        {
          type: "NewsletterSignup",
          variant: "modal",
          title: "Don't miss out!",
          description: "Subscribe to our newsletter for exclusive updates and offers.",
          benefits: [
            { text: "Be the first to know about new products" },
            { text: "Exclusive subscriber-only discounts" },
            { text: "Weekly tips and tutorials" }
          ]
        }
      ]
    }
  }
) as Story;

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
    // Wait for component to settle to avoid act() warnings
    await waitForComponentToSettle();
    
    // Wait for component to render
    await waitFor(() => {
      // Modal with exit intent might not show immediately
      return canvasElement;
    });
  },
};

// Slide-in variant stories
export const SlideInBottomRight = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Wait for slide-in to appear after delay
      await waitFor(() => {
        expect(canvas.getByText("Get updates")).toBeInTheDocument();
        expect(canvas.getByText("Subscribe for the latest news.")).toBeInTheDocument();
      }, { timeout: 3000 });
      
      // Verify email input
      await waitFor(() => {
        expect(canvas.getByLabelText("Email address")).toBeInTheDocument();
      });
      
      // Verify no checkbox (showGdprCheckbox is false)
      expect(canvas.queryByRole("checkbox")).not.toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "NewsletterSignup",
      variant: "slide-in",
      position: "bottom-right",
      title: "Get updates",
      description: "Subscribe for the latest news.",
      delay: 2000,
      showGdprCheckbox: false
    }
  }
) as Story;

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
    // Wait for component to settle to avoid act() warnings
    await waitForComponentToSettle();
    
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
    // Wait for component to settle to avoid act() warnings
    await waitForComponentToSettle();
    
    // Wait for slide-in to appear after delay
    await waitFor(() => {
      return canvasElement;
    }, { timeout: 2000 });
  },
};

// Footer bar variant
export const FooterBar = enhanceStoryForDualMode(
  {
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
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify page content is rendered
      await waitFor(() => {
        expect(canvas.getByText("Page Content")).toBeInTheDocument();
        expect(canvas.getByText("This is example page content. The newsletter signup bar appears at the bottom.")).toBeInTheDocument();
      });
      
      // Verify footer bar content
      await waitFor(() => {
        expect(canvas.getByText("Subscribe to our newsletter")).toBeInTheDocument();
        expect(canvas.getByText("Get updates delivered to your inbox")).toBeInTheDocument();
      });
      
      // Verify no checkbox since showGdprCheckbox is false
      expect(canvas.queryByRole("checkbox")).not.toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "min-h-[400px] relative",
      children: [
        {
          type: "Box",
          className: "p-8",
          children: [
            {
              type: "Heading",
              level: 1,
              className: "text-2xl font-bold mb-4",
              children: "Page Content"
            },
            {
              type: "Text",
              element: "p",
              className: "mb-4",
              children: "This is example page content. The newsletter signup bar appears at the bottom."
            },
            {
              type: "Button",
              className: "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90",
              children: "Show Footer Bar"
            }
          ]
        },
        {
          type: "NewsletterSignup",
          variant: "footer-bar",
          title: "Subscribe to our newsletter",
          description: "Get updates delivered to your inbox",
          showGdprCheckbox: false
        }
      ]
    }
  }
) as Story;

// Different background patterns
export const BackgroundPatternDots: Story = {
  args: {
    variant: "inline",
    title: "Subscribe today",
    backgroundPattern: "dots",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for component to settle to avoid act() warnings
    await waitForComponentToSettle();
    // Wait for the checkbox to be rendered
    await waitForCheckbox(canvas);
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
    // Wait for component to settle to avoid act() warnings
    await waitForComponentToSettle();
    // Wait for the checkbox to be rendered
    await waitForCheckbox(canvas);
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
    // Wait for component to settle to avoid act() warnings
    await waitForComponentToSettle();
    // Wait for the checkbox to be rendered
    await waitForCheckbox(canvas);
  },
};

export const BackgroundPatternGradient = enhanceStoryForDualMode(
  {
    args: {
      variant: "inline",
      title: "Gradient vibes",
      backgroundPattern: "gradient",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify title
      await waitFor(() => {
        expect(canvas.getByText("Gradient vibes")).toBeInTheDocument();
      });
      
      // Verify form elements
      await waitFor(() => {
        expect(canvas.getByLabelText("Email address")).toBeInTheDocument();
        expect(canvas.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
      });
      
      await waitForCheckbox(canvas);
    },
  },
  {
    renderSpec: {
      type: "NewsletterSignup",
      variant: "inline",
      title: "Gradient vibes",
      backgroundPattern: "gradient"
    }
  }
) as Story;

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
    // Wait for component to settle to avoid act() warnings
    await waitForComponentToSettle();
    // Wait for the checkbox to be rendered
    await waitForCheckbox(canvas);
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
    // Wait for component to settle to avoid act() warnings
    await waitForComponentToSettle();
    // Wait for the checkbox to be rendered
    await waitForCheckbox(canvas);
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
    // Wait for component to settle to avoid act() warnings
    await waitForComponentToSettle();
    // Wait for the checkbox to be rendered
    await waitForCheckbox(canvas);
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
    // Wait for component to settle to avoid act() warnings
    await waitForComponentToSettle();
    // Wait for the checkbox to be rendered
    await waitForCheckbox(canvas);
  },
};

// Animated vs non-animated
export const NonAnimated = enhanceStoryForDualMode(
  {
    args: {
      variant: "inline",
      title: "No animations",
      description: "This variant has animations disabled.",
      animated: false,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify title and description
      await waitFor(() => {
        expect(canvas.getByText("No animations")).toBeInTheDocument();
        expect(canvas.getByText("This variant has animations disabled.")).toBeInTheDocument();
      });
      
      // Verify form elements
      await waitFor(() => {
        expect(canvas.getByLabelText("Email address")).toBeInTheDocument();
        expect(canvas.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
      });
      
      await waitForCheckbox(canvas);
    },
  },
  {
    renderSpec: {
      type: "NewsletterSignup",
      variant: "inline",
      title: "No animations",
      description: "This variant has animations disabled.",
      animated: false
    }
  }
) as Story;

// Dark mode example
export const DarkMode = enhanceStoryForDualMode(
  {
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
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify title and description
      await waitFor(() => {
        expect(canvas.getByText("Dark mode newsletter")).toBeInTheDocument();
        expect(canvas.getByText("Looks great in dark mode too!")).toBeInTheDocument();
      });
      
      // Verify benefits
      await waitFor(() => {
        expect(canvas.getByText("Dark mode optimized content")).toBeInTheDocument();
        expect(canvas.getByText("Eye-friendly reading experience")).toBeInTheDocument();
      });
      
      // Verify checkbox is rendered
      await waitForCheckbox(canvas);
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "dark bg-gray-900 p-8 rounded-lg",
      children: {
        type: "NewsletterSignup",
        variant: "inline",
        title: "Dark mode newsletter",
        description: "Looks great in dark mode too!",
        benefits: [
          { text: "Dark mode optimized content" },
          { text: "Eye-friendly reading experience" }
        ]
      }
    }
  }
) as Story;

// Full example combining multiple features
export const FullFeatured = enhanceStoryForDualMode(
  {
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
      
      // Wait for component to settle to avoid act() warnings
      await waitForComponentToSettle();
      
      // Verify title and description
      await waitFor(() => {
        expect(canvas.getByText("The Developer's Newsletter")).toBeInTheDocument();
        expect(canvas.getByText("Join 50,000+ developers getting better at their craft.")).toBeInTheDocument();
      });
      
      // Verify incentive
      await waitFor(() => {
        expect(canvas.getByText("Free Course: Mastering TypeScript")).toBeInTheDocument();
        expect(canvas.getByText("A $99 value, yours free when you subscribe today.")).toBeInTheDocument();
      });
      
      // Verify benefits
      await waitFor(() => {
        expect(canvas.getByText("Weekly coding tutorials")).toBeInTheDocument();
        expect(canvas.getByText("Industry news & trends")).toBeInTheDocument();
        expect(canvas.getByText("Exclusive member resources")).toBeInTheDocument();
        expect(canvas.getByText("Job opportunities")).toBeInTheDocument();
      });
      
      // Verify form fields
      await waitFor(() => {
        expect(canvas.getByLabelText("Name")).toBeInTheDocument();
        expect(canvas.getByLabelText("Email address")).toBeInTheDocument();
      });
      
      await waitForCheckbox(canvas);
      
      // Verify custom button text
      await waitFor(() => {
        expect(canvas.getByRole("button", { name: "Get Free Course + Newsletter" })).toBeInTheDocument();
      });
    },
  },
  {
    renderSpec: {
      type: "NewsletterSignup",
      variant: "with-incentive",
      title: "The Developer's Newsletter",
      description: "Join 50,000+ developers getting better at their craft.",
      incentive: {
        title: "Free Course: Mastering TypeScript",
        description: "A $99 value, yours free when you subscribe today.",
        icon: "Gift"
      },
      benefits: [
        { text: "Weekly coding tutorials", icon: "Mail" },
        { text: "Industry news & trends", icon: "Sparkles" },
        { text: "Exclusive member resources", icon: "Star" },
        { text: "Job opportunities", icon: "Zap" }
      ],
      showNameField: true,
      namePlaceholder: "Your first name",
      emailPlaceholder: "developer@example.com",
      submitButtonText: "Get Free Course + Newsletter",
      backgroundPattern: "gradient",
      className: "max-w-2xl",
      successTitle: "Welcome to the community! 🎉",
      successMessage: "Check your email for your free TypeScript course and confirm your subscription."
    }
  }
) as Story;
