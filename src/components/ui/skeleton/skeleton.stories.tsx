import type { Meta, StoryObj } from "@storybook/react";
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
};

export const Circle: Story = {
  args: {
    className: "size-12 rounded-full",
  },
};

export const Rectangle: Story = {
  args: {
    className: "h-32 w-full max-w-sm",
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
};
