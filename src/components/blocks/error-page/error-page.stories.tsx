import type { Meta, StoryObj } from '@storybook/react'
import { ErrorPage } from './error-page'

const meta = {
  title: 'Blocks/ErrorPage',
  component: ErrorPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['test'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['friendly-404', 'technical-error', 'maintenance', 'coming-soon', 'search-suggestions'],
    },
    animated: {
      control: 'boolean',
    },
    showIcon: {
      control: 'boolean',
    },
    showBreadcrumb: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ErrorPage>

export default meta
type Story = StoryObj<typeof meta>

// Popular links for examples
const popularLinks = [
  { label: 'Homepage', href: '/', description: 'Return to the main page' },
  { label: 'Documentation', href: '/docs', description: 'Browse our guides' },
  { label: 'Support', href: '/support', description: 'Get help from our team' },
  { label: 'Blog', href: '/blog', description: 'Read our latest posts' },
  { label: 'Contact', href: '/contact', description: 'Get in touch' },
  { label: 'Status', href: '/status', description: 'Check system status' },
]

export const Friendly404: Story = {
  args: {
    variant: 'friendly-404',
    popularLinks: popularLinks.slice(0, 3),
    contactEmail: 'support@example.com',
  },
}

export const Friendly404WithSearch: Story = {
  args: {
    variant: 'friendly-404',
    popularLinks,
    searchConfig: {
      enabled: true,
      placeholder: 'Search for pages...',
      searchAction: '/search',
    },
    contactEmail: 'support@example.com',
  },
}

export const Friendly404WithBreadcrumb: Story = {
  args: {
    variant: 'friendly-404',
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Not Found' },
    ],
    popularLinks: popularLinks.slice(0, 4),
  },
}

export const Friendly404CustomContent: Story = {
  args: {
    variant: 'friendly-404',
    title: "Oops! Lost in Space",
    description: "Houston, we have a problem. The page you're looking for has drifted into the cosmos.",
    image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop',
    showIcon: false,
    popularLinks: popularLinks.slice(0, 3),
  },
}

export const TechnicalError: Story = {
  args: {
    variant: 'technical-error',
    contactEmail: 'support@example.com',
  },
}

export const TechnicalErrorDetailed: Story = {
  args: {
    variant: 'technical-error',
    title: '500 - Internal Server Error',
    description: 'An unexpected error occurred while processing your request. Error ID: ERR_2024_001. Our engineering team has been automatically notified.',
    contactEmail: 'support@example.com',
    customActions: [
      { label: 'Retry', onClick: () => globalThis.location.reload() },
      { label: 'System Status', href: '/status' },
    ],
  },
}

export const Maintenance: Story = {
  args: {
    variant: 'maintenance',
  },
}

export const MaintenanceWithTimer: Story = {
  args: {
    variant: 'maintenance',
    title: 'Scheduled Maintenance',
    description: 'We are performing system upgrades to enhance your experience. Expected completion time: 2:00 AM EST.',
    customActions: [
      { label: 'Check Status', href: '/status', variant: 'default' },
      { label: 'Follow Updates', href: 'https://twitter.com/example', variant: 'outline' },
    ],
  },
}

export const ComingSoon: Story = {
  args: {
    variant: 'coming-soon',
    countdownDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  },
}

export const ComingSoonCustom: Story = {
  args: {
    variant: 'coming-soon',
    title: 'New Feature Launching Soon!',
    description: 'Get ready for our revolutionary new dashboard. Sign up to be notified when we launch.',
    countdownDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    countdownMessage: 'Launching in:',
    customActions: [
      { label: 'Get Notified', href: '#notify', variant: 'default' },
      { label: 'Learn More', href: '#learn', variant: 'outline' },
    ],
  },
}

export const SearchSuggestions: Story = {
  args: {
    variant: 'search-suggestions',
    searchConfig: {
      enabled: true,
      placeholder: 'What are you looking for?',
      onSearch: (query) => console.log('Searching for:', query),
    },
    popularLinks,
  },
}

export const SearchSuggestionsWithCategories: Story = {
  args: {
    variant: 'search-suggestions',
    title: "Let's Find What You Need",
    description: 'Use the search below or browse our most visited sections.',
    searchConfig: {
      enabled: true,
      placeholder: 'Search docs, products, support...',
      searchAction: '/search',
    },
    popularLinks: [
      { label: 'Getting Started Guide', href: '/docs/getting-started', description: 'New to our platform?' },
      { label: 'API Reference', href: '/docs/api', description: 'Technical documentation' },
      { label: 'Pricing Plans', href: '/pricing', description: 'Find the right plan' },
      { label: 'Feature Requests', href: '/feedback', description: 'Suggest new features' },
      { label: 'Community Forum', href: '/community', description: 'Connect with users' },
      { label: 'Video Tutorials', href: '/tutorials', description: 'Learn by watching' },
    ],
  },
}

export const CustomErrorPage: Story = {
  args: {
    variant: 'friendly-404',
    title: 'Page Temporarily Unavailable',
    description: 'This page is being updated with fresh content. Check back soon!',
    showIcon: false,
    children: (
      <div className="p-6 bg-muted/50 rounded-lg">
        <h3 className="font-semibold mb-2">What you can do:</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Double-check the URL for typos</li>
          <li>Use the search bar to find what you need</li>
          <li>Browse our popular pages below</li>
          <li>Contact our support team for assistance</li>
        </ul>
      </div>
    ),
    popularLinks: popularLinks.slice(0, 3),
    contactEmail: 'help@example.com',
  },
}

export const NoAnimation: Story = {
  args: {
    variant: 'friendly-404',
    animated: false,
    popularLinks: popularLinks.slice(0, 3),
  },
}

export const MinimalError: Story = {
  args: {
    variant: 'friendly-404',
    title: '404',
    description: 'Page not found',
    showIcon: true,
    homeLinkText: 'Home',
  },
}

export const AllFeatures: Story = {
  args: {
    variant: 'search-suggestions',
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: 'Store', href: '/store' },
      { label: 'Search' },
    ],
    searchConfig: {
      enabled: true,
      placeholder: 'Search our store...',
      searchAction: '/search',
    },
    popularLinks,
    contactEmail: 'support@example.com',
    customActions: [
      { label: 'View Cart', href: '/cart', variant: 'outline' },
      { label: 'Track Order', href: '/orders', variant: 'outline' },
    ],
    children: (
      <div className="text-sm text-muted-foreground">
        <p>Can&apos;t find what you&apos;re looking for? Our customer service team is here to help!</p>
        <p className="mt-2">Call us: 1-800-EXAMPLE | Hours: Mon-Fri 9AM-5PM EST</p>
      </div>
    ),
  },
}