import { useState } from "react";
import { usePageMetadata } from "../../../../lib/meta";
import { PageHeader } from "../../../../components/ui/page-header";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";

const bottomBannerSpec: ComponentSpec = {
  type: "CookieConsentBanner",
  props: {
    variant: "bottom-banner",
    title: "We use cookies 🍪",
    description: "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.",
    cookiePolicyUrl: "/cookies",
    privacyPolicyUrl: "/privacy",
    animated: true,
  },
};

const topBarSpec: ComponentSpec = {
  type: "CookieConsentBanner",
  props: {
    variant: "top-bar",
    title: "Cookie Notice",
    description: "This website uses cookies to ensure you get the best experience on our website.",
    cookiePolicyUrl: "/cookie-policy",
    animated: true,
  },
};

const modalSpec: ComponentSpec = {
  type: "CookieConsentBanner",
  props: {
    variant: "modal",
    title: "Your Privacy Matters",
    description: "We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking accept, you agree to this, as outlined in our Cookie Policy.",
    cookiePolicyUrl: "/cookies",
    privacyPolicyUrl: "/privacy",
    animated: true,
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
        id: "marketing",
        name: "Marketing Cookies",
        description: "Used to deliver personalized advertisements.",
      },
      {
        id: "social",
        name: "Social Media Cookies",
        description: "Enable social media features and sharing.",
      },
    ],
  },
};

const cornerPopupSpec: ComponentSpec = {
  type: "CookieConsentBanner",
  props: {
    variant: "corner-popup",
    title: "Cookie Settings",
    description: "We use cookies to improve your experience. You can customize your preferences.",
    animated: true,
  },
};

const minimalSpec: ComponentSpec = {
  type: "CookieConsentBanner",
  props: {
    variant: "minimal",
    title: "Cookies",
    description: "We use cookies for a better experience.",
    animated: true,
  },
};

const getBannerPosition = (demo: string): string => {
  if (demo === "top") {
    return "top";
  }
  if (demo === "modal") {
    return "center";
  }
  if (demo === "corner" || demo === "minimal") {
    return "corner";
  }
  return "bottom";
};

export function CookieConsentBannerShowcasePage() {
  usePageMetadata({
    title: "Cookie Consent Banner - Component Blocks",
    description: "GDPR-compliant cookie consent banner with multiple variants, preference management, and animations.",
  });

  const [activeDemo, setActiveDemo] = useState<"bottom" | "top" | "modal" | "corner" | "minimal">("bottom");

  const getDemoSpec = () => {
    switch (activeDemo) {
      case "top": {
        return topBarSpec;
      }
      case "modal": {
        return modalSpec;
      }
      case "corner": {
        return cornerPopupSpec;
      }
      case "minimal": {
        return minimalSpec;
      }
      default: {
        return bottomBannerSpec;
      }
    }
  };

  // Reset localStorage to show the banner
  const showDemo = (variant: typeof activeDemo) => {
    localStorage.removeItem("cookie-consent");
    setActiveDemo(variant);
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Cookie Consent Banner"
        description="A flexible cookie consent banner component with GDPR compliance features. Supports multiple variants, customizable categories, and preference management."
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
                  { id: "bottom", label: "Bottom Banner" },
                  { id: "top", label: "Top Bar" },
                  { id: "modal", label: "Modal" },
                  { id: "corner", label: "Corner Popup" },
                  { id: "minimal", label: "Minimal" },
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
              title={`Cookie Consent - ${activeDemo.charAt(0).toUpperCase() + activeDemo.slice(1)} Variant`}
              code={getDemoSpec()}
            >
              <div className="relative h-[400px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Your Website Content</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    This is a demo page showing how the cookie consent banner appears on your website.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    The banner will appear at the {getBannerPosition(activeDemo)} of the page.
                  </p>
                </div>
                {render(getDemoSpec())}
              </div>
            </ShowcaseWrapper>

            {/* Custom Categories Example */}
            <ShowcaseWrapper
              title="Custom Cookie Categories"
              code={{
                type: "CookieConsentBanner",
                props: {
                  variant: "bottom-banner",
                  title: "Manage Your Privacy",
                  description: "Choose which cookies you want to accept. You can change your preferences at any time.",
                  categories: [
                    {
                      id: "functional",
                      name: "Functional",
                      description: "Enable core functionality like page navigation and secure areas.",
                      required: true,
                    },
                    {
                      id: "analytics",
                      name: "Analytics & Performance",
                      description: "Allow us to measure traffic and improve your experience.",
                    },
                    {
                      id: "advertising",
                      name: "Advertising & Targeting",
                      description: "Show you relevant ads based on your interests.",
                    },
                    {
                      id: "social",
                      name: "Social Media",
                      description: "Enable sharing and social features.",
                    },
                  ],
                  cookiePolicyUrl: "/cookie-policy",
                  privacyPolicyUrl: "/privacy-policy",
                  animated: true,
                },
              }}
            >
              <div className="relative h-[400px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Custom Categories Demo</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    This example shows how you can customize cookie categories to match your specific needs.
                  </p>
                </div>
                {render({
                  type: "CookieConsentBanner",
                  props: {
                    variant: "bottom-banner",
                    title: "Manage Your Privacy",
                    description: "Choose which cookies you want to accept. You can change your preferences at any time.",
                    categories: [
                      {
                        id: "functional",
                        name: "Functional",
                        description: "Enable core functionality like page navigation and secure areas.",
                        required: true,
                      },
                      {
                        id: "analytics",
                        name: "Analytics & Performance",
                        description: "Allow us to measure traffic and improve your experience.",
                      },
                      {
                        id: "advertising",
                        name: "Advertising & Targeting",
                        description: "Show you relevant ads based on your interests.",
                      },
                      {
                        id: "social",
                        name: "Social Media",
                        description: "Enable sharing and social features.",
                      },
                    ],
                    cookiePolicyUrl: "/cookie-policy",
                    privacyPolicyUrl: "/privacy-policy",
                    animated: true,
                    storageKey: "cookie-consent-custom", // Different key to show independently
                  },
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
                <li>• Bottom banner for prominent display</li>
                <li>• Top bar for minimal intrusion</li>
                <li>• Modal overlay for focused consent</li>
                <li>• Corner popup for subtle notification</li>
                <li>• Minimal notice for simple sites</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🔒 GDPR Compliance</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Granular cookie category management</li>
                <li>• Accept all / Reject all options</li>
                <li>• Privacy and cookie policy links</li>
                <li>• Preference persistence in localStorage</li>
                <li>• Required cookies cannot be disabled</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">✨ User Experience</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Smooth slide-in animations</li>
                <li>• Dark mode support</li>
                <li>• Mobile responsive design</li>
                <li>• Accessible with ARIA labels</li>
                <li>• Customizable text and styling</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">⚙️ Customization</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Custom cookie categories</li>
                <li>• Configurable storage key</li>
                <li>• Callback functions for consent events</li>
                <li>• Custom button text</li>
                <li>• Optional animation toggle</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Usage</h2>
          <div className="bg-gray-900 rounded-lg p-6">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`{
  type: "CookieConsentBanner",
  props: {
    variant: "bottom-banner",
    title: "We use cookies",
    description: "We use cookies to enhance your experience...",
    categories: [
      {
        id: "necessary",
        name: "Necessary",
        description: "Essential cookies",
        required: true
      },
      {
        id: "analytics",
        name: "Analytics",
        description: "Help us improve"
      }
    ],
    cookiePolicyUrl: "/cookies",
    privacyPolicyUrl: "/privacy",
    onAcceptAll: () => console.log("All accepted"),
    onRejectAll: () => console.log("All rejected"),
    onSavePreferences: (prefs) => console.log("Saved:", prefs)
  }
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}