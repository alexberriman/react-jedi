import type { Meta, StoryObj } from '@storybook/react'
import { AnnouncementBar } from './announcement-bar'
import { MdRocketLaunch, MdCelebration, MdWarning } from 'react-icons/md'
import { FaBullhorn } from 'react-icons/fa'

const meta = {
  title: 'Blocks/AnnouncementBar',
  component: AnnouncementBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A versatile announcement bar component for displaying important notices, alerts, and time-sensitive information with multiple variants and customization options.'
      }
    }
  },
  tags: ['autodocs', 'test'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['top-banner', 'floating', 'slide-in', 'countdown', 'dismissible']
    },
    position: {
      control: 'select',
      options: ['top', 'bottom']
    },
    colorScheme: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error', 'custom']
    },
    animated: {
      control: 'boolean'
    },
    dismissible: {
      control: 'boolean'
    },
    sticky: {
      control: 'boolean'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
        <Story />
        <div style={{ padding: '60px 20px' }}>
          <h2 style={{ marginBottom: '20px' }}>Page Content</h2>
          <p style={{ marginBottom: '16px' }}>This is example page content to demonstrate how the announcement bar appears above or below the main content.</p>
          <p style={{ marginBottom: '16px' }}>The announcement bar can be positioned at the top or bottom of the viewport and can be sticky or scroll with the page.</p>
          <p>Different variants provide different visual styles and behaviors suitable for various use cases.</p>
        </div>
      </div>
    )
  ]
} satisfies Meta<typeof AnnouncementBar>

export default meta
type Story = StoryObj<typeof meta>

export const TopBanner: Story = {
  args: {
    variant: 'top-banner',
    message: '🎉 New feature released! Check out our latest updates and improvements.',
    actions: [
      { label: 'Learn More', variant: 'primary', href: '#' },
      { label: 'Dismiss', variant: 'link' }
    ],
    colorScheme: 'info'
  }
}

export const FloatingBar: Story = {
  args: {
    variant: 'floating',
    message: 'Limited time offer: Get 30% off all plans!',
    actions: [
      { label: 'Get Started', variant: 'primary' }
    ],
    icon: <MdCelebration className="h-5 w-5" />,
    colorScheme: 'success'
  }
}

export const SlideInNotification: Story = {
  args: {
    variant: 'slide-in',
    message: 'Your session will expire in 5 minutes. Please save your work.',
    actions: [
      { label: 'Continue Working', variant: 'primary' },
      { label: 'Log Out', variant: 'secondary' }
    ],
    colorScheme: 'warning',
    icon: <MdWarning className="h-5 w-5" />
  }
}

export const CountdownTimer: Story = {
  args: {
    variant: 'countdown',
    message: 'Product launch coming soon!',
    countdownMessage: '🚀 Product launch countdown:',
    countdownTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    actions: [
      { label: 'Get Notified', variant: 'primary' }
    ],
    colorScheme: 'default',
    icon: <MdRocketLaunch className="h-6 w-6" />
  }
}

export const DismissibleAlert: Story = {
  args: {
    variant: 'dismissible',
    message: 'We use cookies to improve your experience. By continuing, you agree to our cookie policy.',
    actions: [
      { label: 'Accept', variant: 'primary' },
      { label: 'Learn More', variant: 'link', href: '#' }
    ],
    colorScheme: 'default'
  }
}

export const CustomColors: Story = {
  args: {
    variant: 'top-banner',
    message: 'Custom branded announcement with your brand colors!',
    actions: [
      { label: 'Shop Now', variant: 'primary' }
    ],
    colorScheme: 'custom',
    customColors: {
      background: '#8B5CF6',
      text: '#FFFFFF',
      button: '#FCD34D'
    },
    icon: <FaBullhorn className="h-5 w-5" />
  }
}

export const BottomPosition: Story = {
  args: {
    variant: 'floating',
    position: 'bottom',
    message: 'This announcement appears at the bottom of the screen',
    actions: [
      { label: 'Got it', variant: 'primary' }
    ],
    colorScheme: 'info'
  }
}

export const AutoHide: Story = {
  args: {
    variant: 'slide-in',
    message: 'This notification will automatically disappear in 5 seconds',
    autoHide: 5000,
    colorScheme: 'success',
    dismissible: false
  }
}

export const ErrorAnnouncement: Story = {
  args: {
    variant: 'top-banner',
    message: 'System maintenance scheduled for tonight at 11 PM EST. Some services may be unavailable.',
    actions: [
      { label: 'View Details', variant: 'primary' }
    ],
    colorScheme: 'error'
  }
}

export const MinimalAnnouncement: Story = {
  args: {
    variant: 'top-banner',
    message: 'Free shipping on orders over $50',
    colorScheme: 'success',
    dismissible: false,
    actions: []
  }
}

export const ComplexContent: Story = {
  args: {
    variant: 'floating',
    message: (
      <div className="space-y-1">
        <div className="font-semibold">Black Friday Sale!</div>
        <div className="text-sm opacity-90">Save up to 70% on selected items. Limited time only!</div>
      </div>
    ),
    actions: [
      { label: 'Shop Sale', variant: 'primary' },
      { label: 'View Terms', variant: 'link' }
    ],
    colorScheme: 'error',
    icon: <MdCelebration className="h-6 w-6" />
  }
}

export const NonSticky: Story = {
  args: {
    variant: 'top-banner',
    message: 'This banner scrolls with the page content',
    sticky: false,
    colorScheme: 'info',
    actions: [
      { label: 'Learn More', variant: 'primary' }
    ]
  }
}

export const NoAnimation: Story = {
  args: {
    variant: 'slide-in',
    message: 'This notification appears without animation',
    animated: false,
    colorScheme: 'warning',
    actions: [
      { label: 'OK', variant: 'primary' }
    ]
  }
}

export const ShortCountdown: Story = {
  args: {
    variant: 'countdown',
    message: 'Limited time offer!',
    countdownMessage: '⏰ Flash sale ends in:',
    countdownTo: new Date(Date.now() + 60 * 1000), // 1 minute from now
    actions: [
      { label: 'Shop Now', variant: 'primary' }
    ],
    colorScheme: 'error',
    onCountdownEnd: () => alert('Countdown ended!')
  }
}

export const MultipleActions: Story = {
  args: {
    variant: 'top-banner',
    message: 'New version available with bug fixes and performance improvements',
    actions: [
      { label: 'Update Now', variant: 'primary' },
      { label: 'View Changelog', variant: 'secondary' },
      { label: 'Remind Me Later', variant: 'link' }
    ],
    colorScheme: 'info'
  }
}