import { useState } from "react";
import { usePageMetadata } from "../../../../lib/meta";
import { PageHeader } from "../../../../components/ui/page-header";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";

const topBannerSpec: ComponentSpec = {
  type: "AnnouncementBar",
  props: {
    variant: "top-banner",
    message: "🎉 New feature released! Check out our latest updates and improvements.",
    actions: [
      { label: "Learn More", variant: "primary", href: "#" },
      { label: "Dismiss", variant: "link" }
    ],
    colorScheme: "info",
    sticky: false,
    animated: true,
    id: "announcement-top-banner"
  },
};

const floatingBarSpec: ComponentSpec = {
  type: "AnnouncementBar",
  props: {
    variant: "floating",
    message: "Limited time offer: Get 30% off all plans!",
    actions: [
      { label: "Get Started", variant: "primary" }
    ],
    colorScheme: "success",
    sticky: false,
    animated: true,
    id: "announcement-floating"
  },
};

const slideInSpec: ComponentSpec = {
  type: "AnnouncementBar",
  props: {
    variant: "slide-in",
    message: "Your session will expire in 5 minutes. Please save your work.",
    actions: [
      { label: "Continue Working", variant: "primary" },
      { label: "Log Out", variant: "secondary" }
    ],
    colorScheme: "warning",
    position: "top",
    sticky: false,
    animated: true,
    id: "announcement-slide-in"
  },
};

const countdownSpec: ComponentSpec = {
  type: "AnnouncementBar",
  props: {
    variant: "countdown",
    message: "Product launch coming soon!",
    countdownMessage: "🚀 Product launch countdown:",
    countdownTo: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    actions: [
      { label: "Get Notified", variant: "primary" }
    ],
    colorScheme: "default",
    sticky: false,
    animated: true,
    id: "announcement-countdown"
  },
};

const dismissibleSpec: ComponentSpec = {
  type: "AnnouncementBar",
  props: {
    variant: "dismissible",
    message: "We use cookies to improve your experience. By continuing, you agree to our cookie policy.",
    actions: [
      { label: "Accept", variant: "primary" },
      { label: "Learn More", variant: "link", href: "#" }
    ],
    colorScheme: "default",
    dismissible: true,
    sticky: false,
    animated: true,
    id: "announcement-dismissible"
  },
};

const customColorSpec: ComponentSpec = {
  type: "AnnouncementBar",
  props: {
    variant: "top-banner",
    message: "🎨 Custom branded announcement with your brand colors!",
    actions: [
      { label: "Shop Now", variant: "primary" }
    ],
    colorScheme: "custom",
    customColors: {
      background: "#8B5CF6",
      text: "#FFFFFF",
      button: "#FCD34D"
    },
    sticky: false,
    animated: true,
    id: "announcement-custom"
  },
};

const autoHideSpec: ComponentSpec = {
  type: "AnnouncementBar",
  props: {
    variant: "slide-in",
    message: "This notification will automatically disappear in 5 seconds",
    autoHide: 5000,
    colorScheme: "success",
    dismissible: false,
    sticky: false,
    animated: true,
    id: "announcement-autohide"
  },
};

const errorSpec: ComponentSpec = {
  type: "AnnouncementBar",
  props: {
    variant: "top-banner",
    message: "System maintenance scheduled for tonight at 11 PM EST. Some services may be unavailable.",
    actions: [
      { label: "View Details", variant: "primary" }
    ],
    colorScheme: "error",
    sticky: false,
    animated: true,
    id: "announcement-error"
  },
};

export function AnnouncementBarShowcasePage() {
  usePageMetadata({
    title: "Announcement Bar - Component Blocks",
    description: "Versatile announcement bar for important notices, alerts, and time-sensitive information with multiple variants.",
  });

  const [activeDemo, setActiveDemo] = useState<"top-banner" | "floating" | "slide-in" | "countdown" | "dismissible">("top-banner");

  const getDemoSpec = () => {
    switch (activeDemo) {
      case "floating": {
        return floatingBarSpec;
      }
      case "slide-in": {
        return slideInSpec;
      }
      case "countdown": {
        return countdownSpec;
      }
      case "dismissible": {
        return dismissibleSpec;
      }
      default: {
        return topBannerSpec;
      }
    }
  };

  // Reset localStorage to show the announcement
  const showDemo = (variant: typeof activeDemo) => {
    // Clear all announcement bar dismissals
    const dismissedBars = localStorage.getItem('dismissedAnnouncementBars');
    if (dismissedBars) {
      const parsed = JSON.parse(dismissedBars);
      for (const key of Object.keys(parsed)) {
        if (key.startsWith('announcement-')) {
          delete parsed[key];
        }
      }
      localStorage.setItem('dismissedAnnouncementBars', JSON.stringify(parsed));
    }
    setActiveDemo(variant);
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Announcement Bar"
        description="A flexible announcement bar component for displaying important notices, alerts, and time-sensitive information. Supports multiple variants, countdown timers, and customizable styling."
        backLink={{
          href: "/showcase/blocks",
          label: "Back to Blocks",
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Variants</h2>
          <div className="grid gap-6">
            {/* Variant Selector */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Choose a Variant</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "top-banner", label: "Top Banner" },
                  { id: "floating", label: "Floating Bar" },
                  { id: "slide-in", label: "Slide-in" },
                  { id: "countdown", label: "Countdown" },
                  { id: "dismissible", label: "Dismissible" },
                ].map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => showDemo(variant.id as typeof activeDemo)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      activeDemo === variant.id
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Demo */}
            <ShowcaseWrapper 
              title={`Announcement Bar - ${activeDemo.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Variant`}
              code={getDemoSpec()}
            >
              <div className="relative h-[200px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Your Website Content</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    The announcement bar appears here to grab user attention.
                  </p>
                </div>
                {render(getDemoSpec())}
              </div>
            </ShowcaseWrapper>

            {/* Color Schemes */}
            <ShowcaseWrapper
              title="Color Schemes"
              code={{
                type: "Flex",
                props: {
                  direction: "col",
                  gap: "sm",
                },
                children: [
                  {
                    type: "AnnouncementBar",
                    props: {
                      variant: "top-banner",
                      message: "Default color scheme for general announcements",
                      colorScheme: "default",
                      sticky: false,
                      id: "color-default"
                    }
                  },
                  {
                    type: "AnnouncementBar",
                    props: {
                      variant: "top-banner",
                      message: "Info: New features and updates available",
                      colorScheme: "info",
                      sticky: false,
                      id: "color-info"
                    }
                  },
                  {
                    type: "AnnouncementBar",
                    props: {
                      variant: "top-banner",
                      message: "Success: Your payment has been processed",
                      colorScheme: "success",
                      sticky: false,
                      id: "color-success"
                    }
                  },
                  {
                    type: "AnnouncementBar",
                    props: {
                      variant: "top-banner",
                      message: "Warning: Account will expire in 7 days",
                      colorScheme: "warning",
                      sticky: false,
                      id: "color-warning"
                    }
                  },
                  {
                    type: "AnnouncementBar",
                    props: {
                      variant: "top-banner",
                      message: "Error: System maintenance in progress",
                      colorScheme: "error",
                      sticky: false,
                      id: "color-error"
                    }
                  }
                ]
              }}
            >
              <div className="space-y-2">
                {render({
                  type: "Flex",
                  props: {
                    direction: "col",
                    gap: "sm",
                  },
                  children: [
                    {
                      type: "AnnouncementBar",
                      props: {
                        variant: "top-banner",
                        message: "Default color scheme for general announcements",
                        colorScheme: "default",
                        sticky: false,
                        id: "color-default"
                      }
                    },
                    {
                      type: "AnnouncementBar",
                      props: {
                        variant: "top-banner",
                        message: "Info: New features and updates available",
                        colorScheme: "info",
                        sticky: false,
                        id: "color-info"
                      }
                    },
                    {
                      type: "AnnouncementBar",
                      props: {
                        variant: "top-banner",
                        message: "Success: Your payment has been processed",
                        colorScheme: "success",
                        sticky: false,
                        id: "color-success"
                      }
                    },
                    {
                      type: "AnnouncementBar",
                      props: {
                        variant: "top-banner",
                        message: "Warning: Account will expire in 7 days",
                        colorScheme: "warning",
                        sticky: false,
                        id: "color-warning"
                      }
                    },
                    {
                      type: "AnnouncementBar",
                      props: {
                        variant: "top-banner",
                        message: "Error: System maintenance in progress",
                        colorScheme: "error",
                        sticky: false,
                        id: "color-error"
                      }
                    }
                  ]
                })}
              </div>
            </ShowcaseWrapper>

            {/* Custom Colors Example */}
            <ShowcaseWrapper
              title="Custom Colors"
              code={customColorSpec}
            >
              <div className="relative h-[100px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                {render(customColorSpec)}
              </div>
            </ShowcaseWrapper>

            {/* Auto-hide Example */}
            <ShowcaseWrapper
              title="Auto-hide Timer"
              code={autoHideSpec}
            >
              <div className="relative h-[150px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click the button below to show a notification that auto-hides after 5 seconds.
                  </p>
                  <button
                    onClick={() => {
                      const dismissedBars = localStorage.getItem('dismissedAnnouncementBars');
                      if (dismissedBars) {
                        const parsed = JSON.parse(dismissedBars);
                        delete parsed['announcement-autohide'];
                        localStorage.setItem('dismissedAnnouncementBars', JSON.stringify(parsed));
                      }
                      // Force re-render
                      globalThis.location.reload();
                    }}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Show Auto-hide Demo
                  </button>
                </div>
                {render(autoHideSpec)}
              </div>
            </ShowcaseWrapper>

            {/* Complex Content Example */}
            <ShowcaseWrapper
              title="Complex Content"
              code={{
                type: "AnnouncementBar",
                props: {
                  variant: "floating",
                  message: {
                    type: "Flex",
                    props: {
                      direction: "col",
                      gap: "xs"
                    },
                    children: [
                      {
                        type: "Text",
                        props: {
                          className: "font-semibold"
                        },
                        children: "Black Friday Sale!"
                      },
                      {
                        type: "Text",
                        props: {
                          size: "sm",
                          className: "opacity-90"
                        },
                        children: "Save up to 70% on selected items. Limited time only!"
                      }
                    ]
                  },
                  actions: [
                    { label: "Shop Sale", variant: "primary" },
                    { label: "View Terms", variant: "link" }
                  ],
                  colorScheme: "error",
                  sticky: false,
                  animated: true,
                  id: "announcement-complex"
                }
              }}
            >
              <div className="relative h-[150px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                {render({
                  type: "AnnouncementBar",
                  props: {
                    variant: "floating",
                    message: (
                      <div className="space-y-1">
                        <div className="font-semibold">Black Friday Sale!</div>
                        <div className="text-sm opacity-90">Save up to 70% on selected items. Limited time only!</div>
                      </div>
                    ),
                    actions: [
                      { label: "Shop Sale", variant: "primary" },
                      { label: "View Terms", variant: "link" }
                    ],
                    colorScheme: "error",
                    sticky: false,
                    animated: true,
                    id: "announcement-complex"
                  }
                })}
              </div>
            </ShowcaseWrapper>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🎨 Multiple Variants</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Top banner for site-wide notices</li>
                <li>• Floating bar for centered attention</li>
                <li>• Slide-in for contextual alerts</li>
                <li>• Countdown timer for time-sensitive info</li>
                <li>• Dismissible alerts with persistence</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🎯 Flexible Actions</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Multiple action buttons</li>
                <li>• Primary, secondary, and link variants</li>
                <li>• Custom onClick handlers</li>
                <li>• Support for href links</li>
                <li>• Optional dismiss button</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">✨ Advanced Features</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Countdown timer with custom message</li>
                <li>• Auto-hide with configurable duration</li>
                <li>• LocalStorage persistence</li>
                <li>• Custom icon support</li>
                <li>• Rich content support</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🎨 Customization</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• 5 predefined color schemes</li>
                <li>• Custom color support</li>
                <li>• Sticky/non-sticky positioning</li>
                <li>• Top or bottom placement</li>
                <li>• Animation toggle</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Usage</h2>
          <div className="bg-gray-900 rounded-lg p-6">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`{
  type: "AnnouncementBar",
  props: {
    variant: "top-banner",
    message: "Important announcement message",
    actions: [
      {
        label: "Learn More",
        variant: "primary",
        onClick: () => console.log("Clicked!")
      }
    ],
    colorScheme: "info",
    dismissible: true,
    sticky: true,
    position: "top",
    autoHide: 10000, // Hide after 10 seconds
    animated: true,
    id: "unique-announcement-id"
  }
}

// Countdown variant
{
  type: "AnnouncementBar",
  props: {
    variant: "countdown",
    countdownMessage: "Sale ends in:",
    countdownTo: new Date("2024-12-31T23:59:59"),
    onCountdownEnd: () => console.log("Countdown ended!")
  }
}

// Custom colors
{
  type: "AnnouncementBar",
  props: {
    colorScheme: "custom",
    customColors: {
      background: "#8B5CF6",
      text: "#FFFFFF",
      button: "#FCD34D"
    }
  }
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}