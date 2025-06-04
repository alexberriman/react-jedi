import type { Meta, StoryObj } from '@storybook/react'
import { CookieConsentBanner } from './cookie-consent-banner'
import { useState, useEffect } from 'react'

const meta = {
  title: 'Blocks/Cookie Consent Banner',
  component: CookieConsentBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible cookie consent banner component with GDPR compliance features. Supports multiple variants, customizable categories, and preference management.',
      },
    },
  },
  tags: ['autodocs', 'test'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['bottom-banner', 'top-bar', 'modal', 'corner-popup', 'minimal'],
      description: 'Visual style variant of the banner',
    },
    animated: {
      control: 'boolean',
      description: 'Enable/disable animations',
    },
  },
} satisfies Meta<typeof CookieConsentBanner>

export default meta
type Story = StoryObj<typeof meta>

// Helper wrapper to reset localStorage for stories
function StoryWrapper({ children, storageKey }: { readonly children: React.ReactNode; readonly storageKey?: string }) {
  useEffect(() => {
    // Clear the consent on mount to always show the banner
    if (storageKey) {
      localStorage.removeItem(storageKey)
    }
  }, [storageKey])

  return <div style={{ minHeight: '400px', position: 'relative' }}>{children}</div>
}

export const BottomBanner: Story = {
  args: {
    variant: 'bottom-banner',
    animated: true,
    storageKey: 'storybook-cookie-consent-bottom',
  },
  render: (args) => (
    <StoryWrapper storageKey={args.storageKey}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Website Content</h1>
        <p className="text-gray-600">
          This is your main website content. The cookie consent banner appears at the bottom of the page.
        </p>
      </div>
      <CookieConsentBanner {...args} />
    </StoryWrapper>
  ),
}

export const TopBar: Story = {
  args: {
    variant: 'top-bar',
    animated: true,
    storageKey: 'storybook-cookie-consent-top',
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
}

export const Modal: Story = {
  args: {
    variant: 'modal',
    animated: true,
    storageKey: 'storybook-cookie-consent-modal',
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
}

export const CornerPopup: Story = {
  args: {
    variant: 'corner-popup',
    animated: true,
    storageKey: 'storybook-cookie-consent-corner',
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
}

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    animated: true,
    storageKey: 'storybook-cookie-consent-minimal',
  },
  render: (args) => (
    <StoryWrapper storageKey={args.storageKey}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Website Content</h1>
        <p className="text-gray-600">
          A minimal cookie consent notice in the bottom-left corner.
        </p>
      </div>
      <CookieConsentBanner {...args} />
    </StoryWrapper>
  ),
}

export const WithPolicyLinks: Story = {
  args: {
    variant: 'bottom-banner',
    animated: true,
    cookiePolicyUrl: 'https://example.com/cookies',
    privacyPolicyUrl: 'https://example.com/privacy',
    storageKey: 'storybook-cookie-consent-links',
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
}

export const CustomCategories: Story = {
  args: {
    variant: 'bottom-banner',
    animated: true,
    storageKey: 'storybook-cookie-consent-custom',
    categories: [
      {
        id: 'essential',
        name: 'Essential Cookies',
        description: 'Required for the website to function. Cannot be disabled.',
        required: true,
      },
      {
        id: 'performance',
        name: 'Performance Cookies',
        description: 'Help us analyze website performance and user behavior.',
      },
      {
        id: 'advertising',
        name: 'Advertising Cookies',
        description: 'Used to deliver personalized advertisements.',
      },
      {
        id: 'social',
        name: 'Social Media Cookies',
        description: 'Enable social media features and sharing.',
      },
    ],
  },
  render: (args) => (
    <StoryWrapper storageKey={args.storageKey}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Website Content</h1>
        <p className="text-gray-600">
          Cookie consent with custom cookie categories.
        </p>
      </div>
      <CookieConsentBanner {...args} />
    </StoryWrapper>
  ),
}

export const WithCallbacks: Story = {
  args: {
    variant: 'bottom-banner',
    animated: true,
    storageKey: 'storybook-cookie-consent-callbacks',
    onAcceptAll: () => {
      console.log('User accepted all cookies')
      alert('All cookies accepted!')
    },
    onRejectAll: () => {
      console.log('User rejected all cookies')
      alert('Non-essential cookies rejected!')
    },
    onSavePreferences: (preferences) => {
      console.log('User saved preferences:', preferences)
      alert(`Preferences saved: ${JSON.stringify(preferences, null, 2)}`)
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
}

export const NoAnimation: Story = {
  args: {
    variant: 'modal',
    animated: false,
    storageKey: 'storybook-cookie-consent-no-anim',
  },
  render: (args) => (
    <StoryWrapper storageKey={args.storageKey}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Website Content</h1>
        <p className="text-gray-600">
          Cookie consent without animations for accessibility.
        </p>
      </div>
      <CookieConsentBanner {...args} />
    </StoryWrapper>
  ),
}

export const CustomContent: Story = {
  args: {
    variant: 'bottom-banner',
    animated: true,
    title: '🍪 Cookie Notice',
    description: 'Our website uses cookies to give you the best experience. By continuing to browse, you agree to our use of cookies.',
    storageKey: 'storybook-cookie-consent-custom-content',
  },
  render: (args) => (
    <StoryWrapper storageKey={args.storageKey}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Website Content</h1>
        <p className="text-gray-600">
          Cookie consent with custom title and description.
        </p>
      </div>
      <CookieConsentBanner {...args} />
    </StoryWrapper>
  ),
}

function InteractiveDemoComponent() {
  const [variant, setVariant] = useState<'bottom-banner' | 'top-bar' | 'modal' | 'corner-popup' | 'minimal'>('bottom-banner')
  const [showBanner, setShowBanner] = useState(false)
  const storageKey = 'storybook-cookie-consent-interactive'

  const handleShowBanner = () => {
    localStorage.removeItem(storageKey)
    setShowBanner(true)
    // Force re-render
    globalThis.setTimeout(() => setShowBanner(false), 0)
    globalThis.setTimeout(() => setShowBanner(true), 10)
  }

    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Cookie Consent Banner Demo</h1>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Choose a variant:</h2>
            <div className="flex flex-wrap gap-2">
              {(['bottom-banner', 'top-bar', 'modal', 'corner-popup', 'minimal'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    setVariant(v)
                    handleShowBanner()
                  }}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    variant === v
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {v.replace('-', ' ').replaceAll(/\b\w/g, (l) => l.toUpperCase())}
                </button>
              ))}
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
    )
}

export const InteractiveDemo: Story = {
  render: () => <InteractiveDemoComponent />,
}