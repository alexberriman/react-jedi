import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { SkeletonLoader } from "./skeleton-loader";

const meta: Meta<typeof SkeletonLoader> = {
  title: "UI/SkeletonLoader",
  component: SkeletonLoader,
  parameters: {
    layout: "padded",
    tags: ["test"],
  },
  argTypes: {
    count: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of skeleton elements to render",
    },
    width: {
      control: "text",
      description: "Width of the skeleton (CSS value)",
    },
    height: {
      control: "text",
      description: "Height of the skeleton (CSS value)",
    },
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular", "rounded"],
      description: "Shape variant of the skeleton",
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", "none"],
      description: "Animation type",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonLoader>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[class*="animate-pulse"]');
    await expect(skeleton).toBeInTheDocument();
    // Check for height only, as width can be computed differently
    await expect(skeleton).toHaveStyle({ height: '20px' });
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    width: "200px",
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[class*="bg-gradient"]');
    await expect(skeleton).toHaveClass("rounded-sm");
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    width: "48px",
    height: "48px",
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[class*="bg-gradient"]');
    await expect(skeleton).toHaveClass("rounded-full");
    await expect(skeleton).toHaveStyle({ width: '48px', height: '48px' });
  },
};

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: "300px",
    height: "200px",
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[class*="bg-gradient"]');
    await expect(skeleton).toHaveClass("rounded-none");
  },
};

export const Rounded: Story = {
  args: {
    variant: "rounded",
    width: "250px",
    height: "150px",
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[class*="bg-gradient"]');
    await expect(skeleton).toHaveClass("rounded-lg");
  },
};

export const MultipleItems: Story = {
  args: {
    count: 3,
    height: "16px",
    className: "mb-2",
  },
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[class*="bg-gradient"]');
    await expect(skeletons).toHaveLength(3);
    for (const skeleton of skeletons) {
      expect(skeleton).toHaveClass("mb-2");
    }
  },
};

export const PulseAnimation: Story = {
  args: {
    animation: "pulse",
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[class*="bg-gradient"]');
    await expect(skeleton).toHaveClass("animate-pulse");
  },
};

export const WaveAnimation: Story = {
  args: {
    animation: "wave",
    width: "300px",
    height: "40px",
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[class*="bg-gradient"]');
    await expect(skeleton).toHaveClass("before:animate-[shimmer_2s_infinite]");
  },
};

export const NoAnimation: Story = {
  args: {
    animation: "none",
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[class*="bg-gradient"]');
    await expect(skeleton).not.toHaveClass("animate-pulse");
    await expect(skeleton).not.toHaveClass("before:animate-[shimmer_2s_infinite]");
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="max-w-sm p-4 border border-gray-200 rounded-lg">
      <SkeletonLoader variant="rectangular" height="200px" className="mb-4" />
      <SkeletonLoader variant="text" height="24px" width="75%" className="mb-2" />
      <SkeletonLoader variant="text" height="16px" className="mb-2" />
      <SkeletonLoader variant="text" height="16px" className="mb-4" />
      <div className="flex items-center space-x-4">
        <SkeletonLoader variant="circular" width="40px" height="40px" />
        <div className="flex-1">
          <SkeletonLoader variant="text" height="16px" width="120px" className="mb-1" />
          <SkeletonLoader variant="text" height="14px" width="80px" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[class*="bg-gradient"]');
    await expect(skeletons).toHaveLength(7);
  },
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="flex items-center space-x-4">
          <SkeletonLoader variant="circular" width="48px" height="48px" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader variant="text" height="20px" width="40%" />
            <SkeletonLoader variant="text" height="16px" width="60%" />
          </div>
          <SkeletonLoader variant="rounded" width="80px" height="32px" />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const circularSkeletons = canvasElement.querySelectorAll('.rounded-full');
    await expect(circularSkeletons).toHaveLength(3);
  },
};

export const FormSkeleton: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div>
        <SkeletonLoader variant="text" height="14px" width="80px" className="mb-2" />
        <SkeletonLoader variant="rounded" height="40px" />
      </div>
      <div>
        <SkeletonLoader variant="text" height="14px" width="100px" className="mb-2" />
        <SkeletonLoader variant="rounded" height="40px" />
      </div>
      <div>
        <SkeletonLoader variant="text" height="14px" width="120px" className="mb-2" />
        <SkeletonLoader variant="rounded" height="80px" />
      </div>
      <SkeletonLoader variant="rounded" height="40px" width="120px" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[class*="bg-gradient"]');
    await expect(skeletons).toHaveLength(7);
  },
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-2">
              <SkeletonLoader height="16px" width="80px" />
            </th>
            <th className="text-left p-2">
              <SkeletonLoader height="16px" width="100px" />
            </th>
            <th className="text-left p-2">
              <SkeletonLoader height="16px" width="60px" />
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((index) => (
            <tr key={index}>
              <td className="p-2">
                <SkeletonLoader height="16px" width="120px" />
              </td>
              <td className="p-2">
                <SkeletonLoader height="16px" width="150px" />
              </td>
              <td className="p-2">
                <SkeletonLoader height="16px" width="80px" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[class*="bg-gradient"]');
    await expect(skeletons).toHaveLength(18); // 3 headers + 5 rows * 3 columns
  },
};

export const ResponsiveSkeleton: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} className="p-4 border rounded">
          <SkeletonLoader variant="rectangular" height="120px" className="mb-3" />
          <SkeletonLoader variant="text" height="20px" width="80%" className="mb-2" />
          <SkeletonLoader variant="text" height="16px" />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const rectangularSkeletons = canvasElement.querySelectorAll('.rounded-none');
    await expect(rectangularSkeletons).toHaveLength(6);
  },
};