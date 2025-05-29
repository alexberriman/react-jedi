import type { Meta, StoryObj } from "@storybook/react";
import { SlideIn, SlideOut, SlideTransition } from "./slide";
import { AnimationProvider } from "./animation-provider";
import { useState } from "react";

const meta: Meta<typeof SlideIn> = {
  title: "Animation/Slide",
  decorators: [
    (Story) => (
      <AnimationProvider>
        <Story />
      </AnimationProvider>
    ),
  ],

  tags: ['animation-slide']};

export default meta;

export const SlideInDemo: StoryObj<typeof SlideIn> = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Slide from Bottom (default)</h3>
          <SlideIn>
            <div className="p-6 bg-blue-500 text-white rounded-lg">Slide Up Animation</div>
          </SlideIn>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Slide from Top</h3>
          <SlideIn direction="down">
            <div className="p-6 bg-green-500 text-white rounded-lg">Slide Down Animation</div>
          </SlideIn>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Slide from Right</h3>
          <SlideIn direction="left">
            <div className="p-6 bg-purple-500 text-white rounded-lg">Slide Left Animation</div>
          </SlideIn>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Slide from Left</h3>
          <SlideIn direction="right">
            <div className="p-6 bg-orange-500 text-white rounded-lg">Slide Right Animation</div>
          </SlideIn>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Different Speeds</h3>
        <SlideIn duration="fast" direction="up">
          <div className="p-4 bg-red-500 text-white rounded-lg">Fast Slide Animation</div>
        </SlideIn>

        <SlideIn duration="slow" direction="up" delay={0.2}>
          <div className="p-4 bg-indigo-500 text-white rounded-lg">Slow Slide with Delay</div>
        </SlideIn>

        <SlideIn duration={1.5} direction="up" delay={0.4}>
          <div className="p-4 bg-yellow-500 text-white rounded-lg">Custom 1.5s Duration</div>
        </SlideIn>
      </div>
    </div>
  ),
};

export const SlideOutDemo: StoryObj<typeof SlideOut> = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <SlideOut direction="up">
          <div className="p-6 bg-red-500 text-white rounded-lg">Slide Out Up</div>
        </SlideOut>

        <SlideOut direction="down">
          <div className="p-6 bg-yellow-500 text-white rounded-lg">Slide Out Down</div>
        </SlideOut>

        <SlideOut direction="left">
          <div className="p-6 bg-green-500 text-white rounded-lg">Slide Out Left</div>
        </SlideOut>

        <SlideOut direction="right">
          <div className="p-6 bg-blue-500 text-white rounded-lg">Slide Out Right</div>
        </SlideOut>
      </div>
    </div>
  ),
};

type SlideDirection = "up" | "down" | "left" | "right";

const SlideTransitionComponent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [direction, setDirection] = useState<SlideDirection>("up");

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Toggle Visibility
        </button>

        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as SlideDirection)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="up">Up</option>
          <option value="down">Down</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div className="min-h-[200px] flex items-center justify-center">
        <SlideTransition isVisible={isVisible} direction={direction}>
          <div className="p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-2">Sliding Content</h3>
            <p>This content slides in from {direction}!</p>
          </div>
        </SlideTransition>
      </div>
    </div>
  );
};

export const SlideTransitionDemo: StoryObj<typeof SlideTransition> = {
  render: () => <SlideTransitionComponent />,
};

export const StaggeredSlide: StoryObj<typeof SlideIn> = {
  render: () => {
    const items = ["First", "Second", "Third", "Fourth", "Fifth"];
    const colors = ["blue", "green", "purple", "orange", "red"];

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Staggered Slide In</h3>
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, index) => (
            <SlideIn key={item} delay={index * 0.1} direction="right">
              <div
                className={`p-4 bg-${colors[index]}-500 text-white rounded-lg`}
                style={{ backgroundColor: `var(--${colors[index]}-500)` }}
              >
                {item} Item (delay: {index * 0.1}s)
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    );
  },
};

export const MixedDirections: StoryObj<typeof SlideIn> = {
  render: () => {
    const directions: ("up" | "down" | "left" | "right")[] = ["up", "right", "down", "left"];

    return (
      <div className="grid grid-cols-2 gap-8">
        {directions.map((direction, index) => (
          <SlideIn key={direction} direction={direction} delay={index * 0.15}>
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg text-center">
              <div className="text-lg font-bold">From {direction}</div>
              <div className="text-sm opacity-80">Delay: {index * 0.15}s</div>
            </div>
          </SlideIn>
        ))}
      </div>
    );
  },
};

export const DisabledAnimation: StoryObj<typeof SlideIn> = {
  render: () => (
    <div className="space-y-4">
      <SlideIn disabled>
        <div className="p-6 bg-gray-500 text-white rounded-lg">SlideIn with Animation Disabled</div>
      </SlideIn>

      <SlideOut disabled>
        <div className="p-6 bg-gray-600 text-white rounded-lg">
          SlideOut with Animation Disabled
        </div>
      </SlideOut>
    </div>
  ),
};
