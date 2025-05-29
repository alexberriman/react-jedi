import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drag, DragCard, DragListItem } from "./drag";
import { AnimationProvider } from "./animation-provider";
import { dragPresets } from "./animation-hooks";

const meta: Meta<typeof Drag> = {
  title: "Animation/Drag",
  component: Drag,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <AnimationProvider>
        <Story />
      </AnimationProvider>
    ),
  ],
  args: {
    children: (
      <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-semibold">
        Drag Me!
      </div>
    ),
  },

  tags: ['animation-drag']};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithConstraints: Story = {
  render: () => (
    <div className="relative w-96 h-96 border-2 border-dashed border-gray-300 rounded-lg">
      <Drag dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}>
        <div className="w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
          Drag Me!
        </div>
      </Drag>
    </div>
  ),
};

export const HorizontalAxis: Story = {
  args: {
    axis: "x",
    children: (
      <div className="w-32 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
        X-Axis Only
      </div>
    ),
  },
};

export const VerticalAxis: Story = {
  args: {
    axis: "y",
    children: (
      <div className="w-16 h-32 bg-gradient-to-b from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
        Y
      </div>
    ),
  },
};

export const AllPresets: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-8">
      {Object.keys(dragPresets).map((preset) => (
        <div key={preset} className="text-center">
          <h3 className="text-sm font-semibold mb-4">{preset}</h3>
          <Drag preset={preset as keyof typeof dragPresets}>
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
              {preset}
            </div>
          </Drag>
        </div>
      ))}
    </div>
  ),
};

export const DragCards: Story = {
  render: () => (
    <div className="space-y-6">
      <DragCard variant="elevated">
        <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
        <p className="text-gray-600">This card has an elevated style with shadows.</p>
      </DragCard>

      <DragCard variant="outlined">
        <h3 className="text-lg font-semibold mb-2">Outlined Card</h3>
        <p className="text-gray-600">This card has an outlined style with borders.</p>
      </DragCard>

      <DragCard variant="flat">
        <h3 className="text-lg font-semibold mb-2">Flat Card</h3>
        <p className="text-gray-600">This card has a flat style with subtle backgrounds.</p>
      </DragCard>

      <DragCard variant="interactive">
        <h3 className="text-lg font-semibold mb-2">Interactive Card</h3>
        <p className="text-gray-600">This card has an interactive style with enhanced effects.</p>
      </DragCard>
    </div>
  ),
};

export const DragList: Story = {
  render: () => {
    const items = [
      { id: 1, title: "Item 1", description: "First draggable item" },
      { id: 2, title: "Item 2", description: "Second draggable item" },
      { id: 3, title: "Item 3", description: "Third draggable item" },
      { id: 4, title: "Item 4", description: "Fourth draggable item" },
    ];

    return (
      <div className="w-96">
        <h3 className="text-lg font-semibold mb-4">Draggable List</h3>
        {items.map((item) => (
          <DragListItem key={item.id} handle>
            <div>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </DragListItem>
        ))}
      </div>
    );
  },
};

export const CustomAnimation: Story = {
  args: {
    animation: {
      scale: 1.1,
      rotate: 10,
      shadow: "0 20px 40px rgba(124, 58, 237, 0.3)",
      brightness: 1.2,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    children: (
      <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold">
        Custom
      </div>
    ),
  },
};

export const WithSnapToOrigin: Story = {
  args: {
    dragSnapToOrigin: true,
    children: (
      <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-semibold">
        Snap Back
      </div>
    ),
  },
};

export const NoMomentum: Story = {
  args: {
    dragMomentum: false,
    children: (
      <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center text-white font-semibold">
        No Momentum
      </div>
    ),
  },
};

export const HighElasticity: Story = {
  render: () => (
    <div className="relative w-96 h-96 border-2 border-dashed border-gray-300 rounded-lg">
      <Drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} dragElastic={0.5}>
        <div className="w-24 h-24 bg-purple-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
          Elastic
        </div>
      </Drag>
    </div>
  ),
};

export const DragWithEvents: Story = {
  render: function DragWithEventsComponent() {
    const [dragState, setDragState] = React.useState("idle");
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">State: {dragState}</p>
          <p className="text-sm text-gray-600">
            Position: ({position.x.toFixed(0)}, {position.y.toFixed(0)})
          </p>
        </div>
        <div className="relative w-96 h-64 border-2 border-dashed border-gray-300 rounded-lg">
          <Drag
            onDragStart={() => setDragState("dragging")}
            onDragEnd={() => setDragState("idle")}
            onDrag={(event, info) => setPosition({ x: info.point.x, y: info.point.y })}
            dragConstraints={{ left: -150, right: 150, top: -100, bottom: 100 }}
          >
            <div className="w-24 h-24 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-semibold">
              Track Me
            </div>
          </Drag>
        </div>
      </div>
    );
  },
};

export const DisabledDrag: Story = {
  args: {
    disabled: true,
    children: (
      <div className="w-32 h-32 bg-gray-400 rounded-lg flex items-center justify-center text-white font-semibold opacity-50">
        Disabled
      </div>
    ),
  },
};
