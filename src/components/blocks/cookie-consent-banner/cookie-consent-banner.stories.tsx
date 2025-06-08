import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { CookieConsentBanner } from "./cookie-consent-banner";
import { useState, useEffect } from "react";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Blocks/Cookie Consent Banner",
  component: CookieConsentBanner,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A flexible cookie consent banner component with GDPR compliance features. Supports multiple variants, customizable categories, and preference management.",
      },
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["bottom-banner", "top-bar", "modal", "corner-popup", "minimal"],
      description: "Visual style variant of the banner",
    },
    animated: {
      control: "boolean",
      description: "Enable/disable animations",
    },
  },
} satisfies Meta<typeof CookieConsentBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper wrapper to reset localStorage for stories
function StoryWrapper({
  children,
  storageKey,
}: {
  readonly children: React.ReactNode;
  readonly storageKey?: string;
}) {
  useEffect(() => {
    // Clear the consent on mount to always show the banner
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  return <div style={{ minHeight: "400px", position: "relative" }}>{children}</div>;
}

export const BottomBanner: Story = enhanceStoryForDualMode<typeof CookieConsentBanner>(
  {
    args: {
      variant: "bottom-banner",
      animated: true,
      storageKey: "storybook-cookie-consent-bottom",
    },
    render: (args) => (
      <StoryWrapper storageKey={args.storageKey}>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Website Content</h1>
          <p className="text-gray-600">
            This is your main website content. The cookie consent banner appears at the bottom of the
            page.
          </p>
        </div>
        <CookieConsentBanner {...args} />
      </StoryWrapper>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test cookie consent banner renders with default text
      expect(canvas.getByText("We use cookies")).toBeInTheDocument();
      expect(canvas.getByText(/We use cookies to enhance your browsing experience/)).toBeInTheDocument();
      
      // Test action buttons render
      expect(canvas.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Manage Preferences" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "CookieConsentBanner",
      variant: "bottom-banner",
      animated: true,
      storageKey: "storybook-cookie-consent-bottom",
    },
  }
) as Story;

export const TopBar: Story = enhanceStoryForDualMode<typeof CookieConsentBanner>(
  {
    args: {
      variant: "top-bar",
      animated: true,
      storageKey: "storybook-cookie-consent-top",
    },
    render: (args) => (
      <StoryWrapper storageKey={args.storageKey}>
        <CookieConsentBanner {...args} />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Website Content</h1>
          <p className="text-gray-600">
            The cookie consent banner appears at the top of the page as a bar.
          </p>
        </div>
      </StoryWrapper>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test cookie consent banner renders with default text
      expect(canvas.getByText("We use cookies")).toBeInTheDocument();
      expect(canvas.getByText(/We use cookies to enhance your browsing experience/)).toBeInTheDocument();
      
      // Test action buttons render
      expect(canvas.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Manage Preferences" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "CookieConsentBanner",
      variant: "top-bar",
      animated: true,
      storageKey: "storybook-cookie-consent-top",
    },
  }
) as Story;

export const Modal: Story = enhanceStoryForDualMode<typeof CookieConsentBanner>(
  {
    args: {
      variant: "modal",
      animated: true,
      storageKey: "storybook-cookie-consent-modal",
    },
    render: (args) => (
      <StoryWrapper storageKey={args.storageKey}>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Website Content</h1>
          <p className="text-gray-600">
            The cookie consent appears as a modal overlay in the center of the screen.
          </p>
        </div>
        <CookieConsentBanner {...args} />
      </StoryWrapper>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test cookie consent banner renders with default text
      expect(canvas.getByText("We use cookies")).toBeInTheDocument();
      expect(canvas.getByText(/We use cookies to enhance your browsing experience/)).toBeInTheDocument();
      
      // Test action buttons render
      expect(canvas.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Manage Preferences" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "CookieConsentBanner",
      variant: "modal",
      animated: true,
      storageKey: "storybook-cookie-consent-modal",
    },
  }
) as Story;

export const CornerPopup: Story = enhanceStoryForDualMode<typeof CookieConsentBanner>(
  {
    args: {
      variant: "corner-popup",
      animated: true,
      storageKey: "storybook-cookie-consent-corner",
    },
    render: (args) => (
      <StoryWrapper storageKey={args.storageKey}>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Website Content</h1>
          <p className="text-gray-600">
            The cookie consent appears as a popup in the bottom-right corner.
          </p>
        </div>
        <CookieConsentBanner {...args} />
      </StoryWrapper>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test cookie consent banner renders with default text
      expect(canvas.getByText("We use cookies")).toBeInTheDocument();
      expect(canvas.getByText(/We use cookies to enhance your browsing experience/)).toBeInTheDocument();
      
      // Test action buttons render
      expect(canvas.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Manage Preferences" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "CookieConsentBanner",
      variant: "corner-popup",
      animated: true,
      storageKey: "storybook-cookie-consent-corner",
    },
  }
) as Story;

export const Minimal: Story = enhanceStoryForDualMode<typeof CookieConsentBanner>(
  {
    args: {
      variant: "minimal",
      animated: true,
      storageKey: "storybook-cookie-consent-minimal",
    },
    render: (args) => (
      <StoryWrapper storageKey={args.storageKey}>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Website Content</h1>
          <p className="text-gray-600">A minimal cookie consent notice in the bottom-left corner.</p>
        </div>
        <CookieConsentBanner {...args} />
      </StoryWrapper>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test cookie consent banner renders with default text
      expect(canvas.getByText("We use cookies")).toBeInTheDocument();
      expect(canvas.getByText(/We use cookies to enhance your browsing experience/)).toBeInTheDocument();
      
      // Test action button renders (minimal variant only has Accept All)
      expect(canvas.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "CookieConsentBanner",
      variant: "minimal",
      animated: true,
      storageKey: "storybook-cookie-consent-minimal",
    },
  }
) as Story;

export const WithPolicyLinks: Story = enhanceStoryForDualMode<typeof CookieConsentBanner>(
  {
    args: {
      variant: "bottom-banner",
      animated: true,
      cookiePolicyUrl: "https://example.com/cookies",
      privacyPolicyUrl: "https://example.com/privacy",
      storageKey: "storybook-cookie-consent-links",
    },
    render: (args) => (
      <StoryWrapper storageKey={args.storageKey}>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Website Content</h1>
          <p className="text-gray-600">
            Cookie consent banner with links to Cookie Policy and Privacy Policy.
          </p>
        </div>
        <CookieConsentBanner {...args} />
      </StoryWrapper>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test cookie consent banner renders with policy links
      expect(canvas.getByText("We use cookies")).toBeInTheDocument();
      expect(canvas.getByRole("link", { name: "Cookie Policy" })).toBeInTheDocument();
      expect(canvas.getByRole("link", { name: "Privacy Policy" })).toBeInTheDocument();
      
      // Test action buttons render
      expect(canvas.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "CookieConsentBanner",
      variant: "bottom-banner",
      animated: true,
      cookiePolicyUrl: "https://example.com/cookies",
      privacyPolicyUrl: "https://example.com/privacy",
      storageKey: "storybook-cookie-consent-links",
    },
  }
) as Story;

export const CustomCategories: Story = enhanceStoryForDualMode<typeof CookieConsentBanner>(
  {
    args: {
      variant: "bottom-banner",
      animated: true,
      storageKey: "storybook-cookie-consent-custom",
      categories: [
        {
          id: "essential",
          name: "Essential Cookies",
          description: "Required for the website to function. Cannot be disabled.",
          required: true,
        },
        {
          id: "performance",
          name: "Performance Cookies",
          description: "Help us analyze website performance and user behavior.",
        },
        {
          id: "advertising",
          name: "Advertising Cookies",
          description: "Used to deliver personalized advertisements.",
        },
        {
          id: "social",
          name: "Social Media Cookies",
          description: "Enable social media features and sharing.",
        },
      ],
    },
    render: (args) => (
      <StoryWrapper storageKey={args.storageKey}>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Website Content</h1>
          <p className="text-gray-600">Cookie consent with custom cookie categories.</p>
        </div>
        <CookieConsentBanner {...args} />
      </StoryWrapper>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test cookie consent banner renders
      expect(canvas.getByText("We use cookies")).toBeInTheDocument();
      
      // Test action buttons render
      expect(canvas.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Manage Preferences" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "CookieConsentBanner",
      variant: "bottom-banner",
      animated: true,
      storageKey: "storybook-cookie-consent-custom",
      categories: [
        {
          id: "essential",
          name: "Essential Cookies",
          description: "Required for the website to function. Cannot be disabled.",
          required: true,
        },
        {
          id: "performance",
          name: "Performance Cookies",
          description: "Help us analyze website performance and user behavior.",
        },
        {
          id: "advertising",
          name: "Advertising Cookies",
          description: "Used to deliver personalized advertisements.",
        },
        {
          id: "social",
          name: "Social Media Cookies",
          description: "Enable social media features and sharing.",
        },
      ],
    },
  }
) as Story;

export const WithCallbacks: Story = enhanceStoryForDualMode<typeof CookieConsentBanner>(
  {
    args: {
      variant: "bottom-banner",
      animated: true,
      storageKey: "storybook-cookie-consent-callbacks",
      onAcceptAll: () => {
        console.log("User accepted all cookies");
        alert("All cookies accepted!");
      },
      onRejectAll: () => {
        console.log("User rejected all cookies");
        alert("Non-essential cookies rejected!");
      },
      onSavePreferences: (preferences) => {
        console.log("User saved preferences:", preferences);
        alert(`Preferences saved: ${JSON.stringify(preferences, null, 2)}`);
      },
    },
    render: (args) => (
      <StoryWrapper storageKey={args.storageKey}>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Website Content</h1>
          <p className="text-gray-600">
            Cookie consent with callback functions. Check the console and alerts when interacting.
          </p>
        </div>
        <CookieConsentBanner {...args} />
      </StoryWrapper>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test cookie consent banner renders
      expect(canvas.getByText("We use cookies")).toBeInTheDocument();
      // The "Cookie consent with callback functions" text is in the page content, not the banner
      expect(canvas.getByText("Cookie consent with callback functions. Check the console and alerts when interacting.")).toBeInTheDocument();
      
      // Test action buttons render
      expect(canvas.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Manage Preferences" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "CookieConsentBanner",
      variant: "bottom-banner",
      animated: true,
      storageKey: "storybook-cookie-consent-callbacks",
    },
  }
) as Story;

export const NoAnimation: Story = enhanceStoryForDualMode<typeof CookieConsentBanner>(
  {
    args: {
      variant: "modal",
      animated: false,
      storageKey: "storybook-cookie-consent-no-anim",
    },
    render: (args) => (
      <StoryWrapper storageKey={args.storageKey}>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Website Content</h1>
          <p className="text-gray-600">Cookie consent without animations for accessibility.</p>
        </div>
        <CookieConsentBanner {...args} />
      </StoryWrapper>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test cookie consent banner renders
      expect(canvas.getByText("We use cookies")).toBeInTheDocument();
      
      // Test action buttons render
      expect(canvas.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Manage Preferences" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "CookieConsentBanner",
      variant: "modal",
      animated: false,
      storageKey: "storybook-cookie-consent-no-anim",
    },
  }
) as Story;

export const CustomContent: Story = enhanceStoryForDualMode<typeof CookieConsentBanner>(
  {
    args: {
      variant: "bottom-banner",
      animated: true,
      title: "🍪 Cookie Notice",
      description:
        "Our website uses cookies to give you the best experience. By continuing to browse, you agree to our use of cookies.",
      storageKey: "storybook-cookie-consent-custom-content",
    },
    render: (args) => (
      <StoryWrapper storageKey={args.storageKey}>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Website Content</h1>
          <p className="text-gray-600">Cookie consent with custom title and description.</p>
        </div>
        <CookieConsentBanner {...args} />
      </StoryWrapper>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test custom content renders
      expect(canvas.getByText("🍪 Cookie Notice")).toBeInTheDocument();
      expect(canvas.getByText(/Our website uses cookies to give you the best experience/)).toBeInTheDocument();
      
      // Test action buttons render
      expect(canvas.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "CookieConsentBanner",
      variant: "bottom-banner",
      animated: true,
      title: "🍪 Cookie Notice",
      description:
        "Our website uses cookies to give you the best experience. By continuing to browse, you agree to our use of cookies.",
      storageKey: "storybook-cookie-consent-custom-content",
    },
  }
) as Story;

function InteractiveDemoComponent() {
  const [variant, setVariant] = useState<
    "bottom-banner" | "top-bar" | "modal" | "corner-popup" | "minimal"
  >("bottom-banner");
  const [showBanner, setShowBanner] = useState(false);
  const storageKey = "storybook-cookie-consent-interactive";

  const handleShowBanner = () => {
    localStorage.removeItem(storageKey);
    setShowBanner(true);
    // Force re-render
    globalThis.setTimeout(() => setShowBanner(false), 0);
    globalThis.setTimeout(() => setShowBanner(true), 10);
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Cookie Consent Banner Demo</h1>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Choose a variant:</h2>
          <div className="flex flex-wrap gap-2">
            {(["bottom-banner", "top-bar", "modal", "corner-popup", "minimal"] as const).map(
              (v) => (
                <button
                  key={v}
                  onClick={() => {
                    setVariant(v);
                    handleShowBanner();
                  }}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    variant === v
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {v.replace("-", " ").replaceAll(/\b\w/g, (l) => l.toUpperCase())}
                </button>
              )
            )}
          </div>
        </div>

        <button
          onClick={handleShowBanner}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Show Cookie Banner Again
        </button>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">About this demo:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Click any variant button to see different styles</li>
            <li>The banner remembers your choice in localStorage</li>
            <li>Use &ldquo;Show Cookie Banner Again&rdquo; to reset and display it</li>
            <li>Try the &ldquo;Manage Preferences&rdquo; option to see detailed settings</li>
          </ul>
        </div>
      </div>

      {showBanner && (
        <CookieConsentBanner
          key={variant}
          variant={variant}
          storageKey={storageKey}
          animated={true}
          cookiePolicyUrl="https://example.com/cookies"
          privacyPolicyUrl="https://example.com/privacy"
        />
      )}
    </div>
  );
}

export const InteractiveDemo: Story = enhanceStoryForDualMode<typeof CookieConsentBanner>(
  {
    render: () => <InteractiveDemoComponent />,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test interactive demo renders
      expect(canvas.getByText("Cookie Consent Banner Demo")).toBeInTheDocument();
      expect(canvas.getByText("Choose a variant:")).toBeInTheDocument();
      
      // For React mode, test variant buttons
      const bottomBannerButton = canvas.queryByRole("button", { name: "Bottom Banner" });
      if (bottomBannerButton) {
        // Interactive React version
        expect(bottomBannerButton).toBeInTheDocument();
        expect(canvas.getByRole("button", { name: "Top Bar" })).toBeInTheDocument();
        expect(canvas.getByRole("button", { name: "Modal" })).toBeInTheDocument();
        expect(canvas.getByRole("button", { name: "Corner Popup" })).toBeInTheDocument();
        expect(canvas.getByRole("button", { name: "Minimal" })).toBeInTheDocument();
        expect(canvas.getByRole("button", { name: "Show Cookie Banner Again" })).toBeInTheDocument();
      } else {
        // Static SDUI version - just verify the demo description is shown
        expect(canvas.getByText("About this demo:")).toBeInTheDocument();
      }
    },
  },
  {
    renderSpec: {
      type: "Container",
      className: "p-8",
      children: [
        {
          type: "Box",
          className: "max-w-2xl mx-auto space-y-6",
          children: [
            {
              type: "Heading",
              level: 1,
              className: "text-3xl font-bold",
              children: "Cookie Consent Banner Demo"
            },
            {
              type: "Box", 
              className: "space-y-4",
              children: [
                {
                  type: "Heading",
                  level: 2,
                  className: "text-xl font-semibold",
                  children: "Choose a variant:"
                },
                {
                  type: "Text",
                  className: "text-sm text-muted-foreground",
                  children: "Select a variant to see different cookie consent banner styles"
                }
              ]
            },
            {
              type: "Box",
              className: "mt-8 p-6 bg-muted rounded-lg",
              children: [
                {
                  type: "Heading",
                  level: 3,
                  className: "font-semibold mb-2",
                  children: "About this demo:"
                },
                {
                  type: "Text",
                  as: "ul",
                  className: "list-disc list-inside space-y-1 text-sm text-muted-foreground",
                  children: [
                    "Click any variant button to see different styles",
                    "The banner remembers your choice in localStorage",
                    'Use "Show Cookie Banner Again" to reset and display it',
                    'Try the "Manage Preferences" option to see detailed settings'
                  ]
                }
              ]
            },
            {
              type: "CookieConsentBanner",
              variant: "bottom-banner",
              storageKey: "storybook-cookie-consent-interactive",
              animated: true,
              cookiePolicyUrl: "https://example.com/cookies",
              privacyPolicyUrl: "https://example.com/privacy"
            }
          ]
        }
      ]
    },
  }
) as Story;
