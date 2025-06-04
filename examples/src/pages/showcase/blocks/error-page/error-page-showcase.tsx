import { useState } from 'react'
import { render } from '@alexberriman/react-jedi'
import type { ComponentSpec } from '@alexberriman/react-jedi'
import { PageHeader } from '../../../../components/ui/page-header'
import { ShowcaseWrapper } from '../../../../components/ui/showcase-wrapper'
import { Button } from '../../../../components/ui/button'
import { usePageMetadata } from '../../../../lib/meta'

const errorPageVariants = {
  'friendly-404': {
    title: 'Friendly 404',
    description: 'A welcoming 404 page that helps users find their way',
    spec: {
      type: 'ErrorPage',
      props: {
        variant: 'friendly-404',
        popularLinks: [
          { label: 'Homepage', href: '/', description: 'Return to the main page' },
          { label: 'Documentation', href: '/docs', description: 'Browse our guides' },
          { label: 'Support', href: '/support', description: 'Get help from our team' },
        ],
        contactEmail: 'support@example.com',
        animated: true,
      },
    },
  },
  'friendly-404-search': {
    title: '404 with Search',
    description: 'Help users find what they need with integrated search',
    spec: {
      type: 'ErrorPage',
      props: {
        variant: 'friendly-404',
        title: "Can't Find That Page",
        description: "It seems the page you're looking for has moved or doesn't exist. Try searching for what you need.",
        searchConfig: {
          enabled: true,
          placeholder: 'Search our site...',
          searchAction: '/search',
        },
        popularLinks: [
          { label: 'Getting Started', href: '/docs/getting-started', description: 'New to our platform?' },
          { label: 'API Reference', href: '/docs/api', description: 'Technical documentation' },
          { label: 'Pricing', href: '/pricing', description: 'View our plans' },
          { label: 'Blog', href: '/blog', description: 'Latest updates' },
        ],
        showBreadcrumb: true,
        breadcrumbItems: [
          { label: 'Products', href: '/products' },
          { label: 'Not Found' },
        ],
        animated: true,
      },
    },
  },
  'technical-error': {
    title: 'Technical Error (500)',
    description: 'Server error page with helpful information',
    spec: {
      type: 'ErrorPage',
      props: {
        variant: 'technical-error',
        contactEmail: 'support@example.com',
        animated: true,
      },
    },
  },
  'technical-error-detailed': {
    title: 'Detailed Server Error',
    description: 'Technical error with error ID and custom actions',
    spec: {
      type: 'ErrorPage',
      props: {
        variant: 'technical-error',
        title: '500 - Internal Server Error',
        description: 'An unexpected error occurred while processing your request. Error ID: ERR_2024_001. Our engineering team has been automatically notified and is working on a fix.',
        contactEmail: 'support@example.com',
        customActions: [
          { label: 'Retry', onClick: () => window.location.reload() },
          { label: 'System Status', href: '/status' },
          { label: 'Report Issue', href: '/support/report' },
        ],
        animated: true,
      },
    },
  },
  'maintenance': {
    title: 'Maintenance Mode',
    description: 'Inform users about scheduled maintenance',
    spec: {
      type: 'ErrorPage',
      props: {
        variant: 'maintenance',
        animated: true,
      },
    },
  },
  'maintenance-custom': {
    title: 'Scheduled Maintenance',
    description: 'Maintenance page with estimated completion time',
    spec: {
      type: 'ErrorPage',
      props: {
        variant: 'maintenance',
        title: 'Scheduled System Upgrade',
        description: 'We are performing important system upgrades to enhance performance and security. Expected completion: 2:00 AM EST.',
        customActions: [
          { label: 'Check Status', href: '/status', variant: 'default' },
          { label: 'Follow Updates', href: 'https://twitter.com/example', variant: 'outline' },
          { label: 'Get Notified', href: '#notify', variant: 'ghost' },
        ],
        animated: true,
      },
    },
  },
  'coming-soon': {
    title: 'Coming Soon',
    description: 'Build anticipation with a countdown timer',
    spec: {
      type: 'ErrorPage',
      props: {
        variant: 'coming-soon',
        countdownDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        animated: true,
      },
    },
  },
  'coming-soon-custom': {
    title: 'Product Launch',
    description: 'Custom coming soon page for product launches',
    spec: {
      type: 'ErrorPage',
      props: {
        variant: 'coming-soon',
        title: 'Revolutionary Dashboard Launching Soon!',
        description: 'Get ready for the most intuitive analytics dashboard ever created. Sign up to be among the first to experience it.',
        countdownDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        countdownMessage: 'Going live in:',
        customActions: [
          { label: 'Get Early Access', href: '#early-access', variant: 'default' },
          { label: 'Watch Demo', href: '#demo', variant: 'outline' },
          { label: 'Follow Updates', href: '#updates', variant: 'ghost' },
        ],
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
        showIcon: false,
        animated: true,
      },
    },
  },
  'search-suggestions': {
    title: 'Search Suggestions',
    description: 'Help users find content with search and suggestions',
    spec: {
      type: 'ErrorPage',
      props: {
        variant: 'search-suggestions',
        searchConfig: {
          enabled: true,
          placeholder: 'What are you looking for?',
          onSearch: (query: string) => console.log('Searching for:', query),
        },
        popularLinks: [
          { label: 'Documentation', href: '/docs', description: 'Browse our guides' },
          { label: 'API Reference', href: '/api', description: 'Technical docs' },
          { label: 'Examples', href: '/examples', description: 'Code samples' },
          { label: 'Community', href: '/community', description: 'Join discussions' },
          { label: 'Support', href: '/support', description: 'Get help' },
          { label: 'Blog', href: '/blog', description: 'Latest news' },
        ],
        animated: true,
      },
    },
  },
  'custom-content': {
    title: 'Custom Error Page',
    description: 'Error page with custom content and styling',
    spec: {
      type: 'ErrorPage',
      props: {
        variant: 'friendly-404',
        title: 'Lost in the Digital Cosmos',
        description: 'Houston, we have a problem. The page you seek has drifted into the vast expanse of cyberspace.',
        image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&h=300&fit=crop',
        showIcon: false,
        popularLinks: [
          { label: 'Mission Control', href: '/', description: 'Return to base' },
          { label: 'Star Map', href: '/sitemap', description: 'Navigate the site' },
          { label: 'Send Signal', href: '/contact', description: 'Contact us' },
        ],
        children: {
          type: 'Box',
          props: {
            className: 'mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg',
            children: [
              {
                type: 'Text',
                props: {
                  className: 'font-semibold mb-2',
                  children: '🚀 Quick Navigation Tips:'
                }
              },
              {
                type: 'Text',
                props: {
                  size: 'small',
                  variant: 'muted',
                  children: [
                    {
                      type: 'ul',
                      props: {
                        className: 'list-disc list-inside space-y-1 mt-2',
                        children: [
                          { type: 'li', children: 'Use the search bar above to find specific content' },
                          { type: 'li', children: 'Check the URL for any typos' },
                          { type: 'li', children: 'Browse our popular pages below' },
                          { type: 'li', children: 'Return to the homepage and navigate from there' },
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        animated: true,
      },
    },
  },
}

export function ErrorPageShowcase() {
  usePageMetadata({
    title: 'Error Page Block',
    description: 'Customizable error pages for 404, 500, maintenance, and coming soon scenarios',
  })

  const [activeVariant, setActiveVariant] = useState<keyof typeof errorPageVariants>('friendly-404')
  const [showCode, setShowCode] = useState(false)

  const currentVariant = errorPageVariants[activeVariant]

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Error Page Block"
        description="Create engaging error pages that help users recover from errors, find what they need, or build anticipation for upcoming features. Perfect for 404 pages, server errors, maintenance notices, and coming soon pages."
      />

      <div className="container mx-auto px-4 py-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">🎨 Multiple Variants</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Friendly 404, technical errors, maintenance mode, coming soon, and search-focused pages
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">🔍 Smart Features</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Integrated search, popular links, breadcrumbs, and countdown timers
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">✨ Beautiful Design</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Smooth animations, custom icons, and fully responsive layouts
            </p>
          </div>
        </div>

        {/* Variant Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Select Variant</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(errorPageVariants).map(([key, variant]) => (
              <button
                key={key}
                onClick={() => setActiveVariant(key as keyof typeof errorPageVariants)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  activeVariant === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {variant.title}
              </button>
            ))}
          </div>
        </div>

        {/* Current Variant Info */}
        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{currentVariant.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{currentVariant.description}</p>
        </div>

        {/* Code Toggle */}
        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? 'Hide' : 'Show'} Code
          </Button>
        </div>

        {/* Preview */}
        <ShowcaseWrapper>
          <div className="min-h-[600px] bg-white dark:bg-gray-900">
            {render(currentVariant.spec as ComponentSpec)}
          </div>
        </ShowcaseWrapper>

        {/* Code Display */}
        {showCode && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">JSON Specification</h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">
                {JSON.stringify(currentVariant.spec, null, 2)}
              </code>
            </pre>
          </div>
        )}

        {/* Usage Examples */}
        <div className="mt-12 space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Usage Examples</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Basic 404 Page</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{`{
  type: "ErrorPage",
  props: {
    variant: "friendly-404",
    contactEmail: "help@yoursite.com"
  }
}`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Coming Soon with Countdown</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{`{
  type: "ErrorPage",
  props: {
    variant: "coming-soon",
    title: "Big Launch Coming!",
    countdownDate: new Date("2024-12-31"),
    customActions: [
      { label: "Notify Me", href: "/subscribe" }
    ]
  }
}`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Server Error with Actions</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{`{
  type: "ErrorPage",
  props: {
    variant: "technical-error",
    title: "Database Connection Failed",
    description: "Error ID: DB_CONN_001",
    customActions: [
      { 
        label: "Retry", 
        onClick: () => location.reload() 
      },
      { 
        label: "Status Page", 
        href: "/status" 
      }
    ]
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Best Practices</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Always provide clear navigation options to help users recover from errors</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Use friendly, human language instead of technical jargon</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Include search functionality for 404 pages to help users find content</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Add popular links or suggestions to guide users to relevant content</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>For maintenance pages, provide estimated completion times when possible</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Use animations sparingly and respect prefers-reduced-motion preferences</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}