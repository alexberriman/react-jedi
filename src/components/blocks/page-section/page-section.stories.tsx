import type { Meta, StoryObj } from '@storybook/react';
import { PageSection } from './page-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const meta: Meta<typeof PageSection> = {
  title: 'Blocks/PageSection',
  component: PageSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs', 'test'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['full-width', 'contained', 'split', 'angled', 'curved', 'pattern'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    contentAlignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    animationType: {
      control: 'select',
      options: ['fade', 'slide', 'zoom'],
    },
    dividerTop: {
      control: 'select',
      options: ['none', 'wave', 'angle', 'curve'],
    },
    dividerBottom: {
      control: 'select',
      options: ['none', 'wave', 'angle', 'curve'],
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

export const Default: Story = {
  args: {
    heading: {
      title: 'Default Page Section',
      subtitle: 'A simple page section with default settings',
      alignment: 'center',
    },
    children: <SampleContent />,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'full-width',
    background: {
      type: 'color',
      value: '#f3f4f6',
    },
    heading: {
      title: 'Full Width Section',
      subtitle: 'This section spans the entire width of the viewport',
      alignment: 'center',
    },
    children: <SampleContent />,
  },
};

export const Contained: Story = {
  args: {
    variant: 'contained',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    heading: {
      title: 'Contained Section',
      subtitle: 'Content is contained within a max-width container',
      alignment: 'center',
    },
    children: (
      <div className="text-white">
        <SampleContent />
      </div>
    ),
  },
};

export const SplitBackground: Story = {
  args: {
    variant: 'split',
    background: {
      type: 'gradient',
      value: 'linear-gradient(to right, #4f46e5 0%, #4f46e5 50%, #f3f4f6 50%, #f3f4f6 100%)',
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
    variant: 'full-width',
    background: {
      type: 'color',
      value: '#1e40af',
    },
    dividerTop: 'wave',
    dividerBottom: 'wave',
    dividerColor: '#ffffff',
    heading: {
      title: 'Wave Dividers',
      subtitle: 'Smooth wave shapes at top and bottom',
      alignment: 'center',
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
    variant: 'contained',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    dividerTop: 'angle',
    dividerBottom: 'angle',
    dividerColor: '#ffffff',
    heading: {
      title: 'Angled Dividers',
      subtitle: 'Sharp angled dividers for a modern look',
      alignment: 'center',
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
    variant: 'full-width',
    background: {
      type: 'color',
      value: '#059669',
    },
    dividerTop: 'curve',
    dividerBottom: 'curve',
    dividerColor: '#ffffff',
    heading: {
      title: 'Curved Dividers',
      subtitle: 'Elegant curved dividers for smooth transitions',
      alignment: 'center',
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
    variant: 'full-width',
    background: {
      type: 'image',
      value: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1600',
      opacity: 0.1,
    },
    heading: {
      title: 'Background Image Section',
      subtitle: 'Beautiful background images with opacity control',
      alignment: 'center',
    },
    children: <SampleContent />,
  },
};

export const WithPattern: Story = {
  args: {
    variant: 'contained',
    background: {
      type: 'pattern',
      value: 'dots',
    },
    heading: {
      title: 'Pattern Background',
      subtitle: 'Subtle patterns for visual interest',
      alignment: 'center',
    },
    children: <SampleContent />,
  },
};

export const WithParallax: Story = {
  args: {
    variant: 'full-width',
    background: {
      type: 'image',
      value: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600',
    },
    parallax: true,
    heading: {
      title: 'Parallax Background',
      subtitle: 'Scroll to see the parallax effect in action',
      alignment: 'center',
    },
    padding: 'xl',
    children: (
      <div className="text-white bg-black/50 p-8 rounded-lg">
        <SampleContent />
      </div>
    ),
  },
};

export const WithAnimation: Story = {
  args: {
    variant: 'contained',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
    },
    animate: true,
    animationType: 'slide',
    heading: {
      title: 'Animated Section',
      subtitle: 'Content slides in when scrolled into view',
      alignment: 'center',
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
    variant: 'full-width',
    padding: 'sm',
    background: {
      type: 'color',
      value: '#fef3c7',
    },
    heading: {
      title: 'Minimal Padding',
      alignment: 'left',
    },
    contentAlignment: 'left',
    children: (
      <p className="text-lg">
        This section has minimal padding for a more compact appearance.
      </p>
    ),
  },
};

export const ExtraPadding: Story = {
  args: {
    variant: 'contained',
    padding: '2xl',
    background: {
      type: 'gradient',
      value: 'linear-gradient(to bottom, #e0e7ff, #c7d2fe)',
    },
    heading: {
      title: 'Extra Large Padding',
      subtitle: 'More breathing room for important content',
      alignment: 'center',
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
    variant: 'contained',
    contentAlignment: 'right',
    heading: {
      title: 'Right Aligned Content',
      subtitle: 'Everything aligned to the right',
      alignment: 'right',
    },
    children: (
      <div>
        <p className="mb-4">This content is right-aligned for specific design needs.</p>
        <Button>Right Aligned Button</Button>
      </div>
    ),
  },
};

export const NoHeading: Story = {
  args: {
    variant: 'full-width',
    background: {
      type: 'color',
      value: '#f9fafb',
    },
    children: (
      <div className="text-center">
        <p className="text-xl text-muted-foreground mb-8">
          Sometimes you don&apos;t need a heading, just great content.
        </p>
        <SampleContent />
      </div>
    ),
  },
};

export const CombinedFeatures: Story = {
  args: {
    variant: 'full-width',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%)',
    },
    padding: 'xl',
    dividerTop: 'wave',
    dividerBottom: 'curve',
    dividerColor: '#ffffff',
    animate: true,
    animationType: 'zoom',
    heading: {
      title: 'All Features Combined',
      subtitle: 'Showing multiple features working together harmoniously',
      alignment: 'center',
    },
    children: (
      <div className="text-white">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-4">Feature Rich</h3>
            <p className="mb-6">
              This section demonstrates how multiple features can work together to create engaging layouts.
            </p>
            <Button variant="secondary" size="lg">
              Explore Features
            </Button>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Beautiful Design</h3>
            <p className="mb-6">
              Combine backgrounds, dividers, animations, and more to create stunning page sections.
            </p>
            <Button variant="secondary" size="lg">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    ),
  },
};