import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Components/DataDisplay/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "h-4 w-40",
  },
  play: async ({ canvasElement }) => {
    // Test skeleton renders
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeInTheDocument();

    // Test it has animation class
    expect(skeleton).toHaveClass('animate-pulse');

    // Test dimensions are applied
    expect(skeleton).toHaveClass('h-4', 'w-40');
  },
};

export const Circle: Story = {
  args: {
    className: "size-12 rounded-full",
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeInTheDocument();

    // Test circular shape
    expect(skeleton).toHaveClass('rounded-full');
    expect(skeleton).toHaveClass('size-12');
  },
};

export const Rectangle: Story = {
  args: {
    className: "h-32 w-full max-w-sm",
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeInTheDocument();

    // Test rectangle shape
    expect(skeleton).toHaveClass('h-32', 'w-full', 'max-w-sm');
  },
};

export const Card: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[180px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Test multiple skeletons render
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons).toHaveLength(3);

    // Test first skeleton (image placeholder)
    expect(skeletons[0]).toHaveClass('rounded-xl');

    // Test all skeletons have animation
    for (const skeleton of skeletons) {
      expect(skeleton).toHaveClass('animate-pulse');
    }
  },
};

export const ProfileCard: Story = {
  render: () => (
    <div className="flex items-start space-x-4 w-full max-w-md p-5 bg-card rounded-xl shadow-lg">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[60%]" />
        <Skeleton className="h-16 w-full mt-4 rounded-md" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons).toHaveLength(4);

    // Test avatar skeleton
    expect(skeletons[0]).toHaveClass('rounded-full', 'size-12');

    // Test text skeletons have different widths
    expect(skeletons[1]).toHaveClass('w-[80%]');
    expect(skeletons[2]).toHaveClass('w-[60%]');

    // Test card container has shadow
    const card = canvasElement.querySelector('.shadow-lg');
    expect(card).toBeInTheDocument();
  },
};

export const TableRow: Story = {
  render: () => (
    <div className="flex flex-col space-y-3 w-full max-w-md">
      <div className="flex space-x-4">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[50%]" />
        </div>
      </div>
      <div className="flex space-x-4">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-[70%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
      <div className="flex space-x-4">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-[75%]" />
          <Skeleton className="h-4 w-[55%]" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Test 3 rows with consistent structure
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons).toHaveLength(9); // 3 rows × 3 skeletons each

    // Test circular avatars
    const avatars = canvasElement.querySelectorAll('.size-10.rounded-full');
    expect(avatars).toHaveLength(3);

    // Test varied text widths for realism
    const widthClasses = canvasElement.querySelectorAll('[class*="w-["]');
    expect(widthClasses.length).toBeGreaterThan(0);
  },
};

export const DashboardCard: Story = {
  render: () => (
    <div className="flex flex-col w-full max-w-md p-6 bg-card rounded-xl shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-[30%]" />
        <Skeleton className="size-8 rounded-full" />
      </div>
      <Skeleton className="h-24 w-full rounded-md" />
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-10 rounded-md" />
        <Skeleton className="h-10 rounded-md" />
        <Skeleton className="h-10 rounded-md" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons).toHaveLength(6);

    // Test header elements - check for elements with both height and width classes
    const headerElements = canvasElement.querySelectorAll('[class*="h-6"][class*="w-["]');
    expect(headerElements.length).toBeGreaterThan(0);

    // Test icon skeleton
    const iconSkeleton = canvasElement.querySelector('.size-8.rounded-full');
    expect(iconSkeleton).toBeInTheDocument();

    // Test main content area
    const mainContent = canvasElement.querySelector('.h-24.w-full');
    expect(mainContent).toBeInTheDocument();

    // Test grid layout
    const grid = canvasElement.querySelector('.grid-cols-3');
    expect(grid).toBeInTheDocument();
  },
};

export const GlassmorphicCard: Story = {
  render: () => (
    <div className="relative w-full max-w-md overflow-hidden rounded-xl backdrop-blur-md bg-background/30 border border-background/20 shadow-xl p-6">
      <div className="absolute -z-10 top-0 left-0 size-full bg-[radial-gradient(circle_at_top_right,rgba(156,132,255,0.1),transparent_70%)]"></div>
      <div className="absolute -z-10 bottom-0 right-0 size-full bg-[radial-gradient(circle_at_bottom_left,rgba(255,182,255,0.1),transparent_70%)]"></div>
      <div className="flex items-center space-x-4">
        <Skeleton className="size-14 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-[70%]" />
          <Skeleton className="h-4 w-[40%]" />
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-[85%]" />
      </div>
      <div className="mt-6 flex justify-between">
        <Skeleton className="h-10 w-[48%] rounded-lg" />
        <Skeleton className="h-10 w-[48%] rounded-lg" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons).toHaveLength(8);

    // Test glassmorphic container
    const container = canvasElement.querySelector('.backdrop-blur-md');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('bg-background/30');

    // Test gradient backgrounds
    const gradients = canvasElement.querySelectorAll('[class*="radial-gradient"]');
    expect(gradients).toHaveLength(2);

    // Test button skeletons - check for elements with height and 48% width
    const buttons = canvasElement.querySelectorAll('[class*="h-10"][class*="w-[48%]"]');
    expect(buttons).toHaveLength(2);
  },
};
