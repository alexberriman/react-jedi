import type { Meta, StoryObj } from "@storybook/react";
import { FadeIn, FadeOut, FadeTransition } from "./fade";
import { AnimationProvider } from "./animation-provider";
import { useState } from "react";

const meta: Meta<typeof FadeIn> = {
  title: "Animation/Fade",
  decorators: [
    (Story) => (
      <AnimationProvider>
        <Story />
      </AnimationProvider>
    ),
  ],

  tags: ['autodocs', 'animation-fade']};

export default meta;

export const FadeInDemo: StoryObj<typeof FadeIn> = {
  render: () => (
    <div className="space-y-4">
      <FadeIn>
        <div className="p-6 bg-blue-500 text-white rounded-lg">Default FadeIn Animation</div>
      </FadeIn>

      <FadeIn duration="fast">
        <div className="p-6 bg-green-500 text-white rounded-lg">Fast FadeIn Animation</div>
      </FadeIn>

      <FadeIn duration="slow" delay={0.5}>
        <div className="p-6 bg-purple-500 text-white rounded-lg">Slow FadeIn with 0.5s Delay</div>
      </FadeIn>

      <FadeIn duration={2}>
        <div className="p-6 bg-orange-500 text-white rounded-lg">Custom 2s FadeIn Animation</div>
      </FadeIn>
    </div>
  ),
};

export const FadeOutDemo: StoryObj<typeof FadeOut> = {
  render: () => (
    <div className="space-y-4">
      <FadeOut>
        <div className="p-6 bg-red-500 text-white rounded-lg">Default FadeOut Animation</div>
      </FadeOut>

      <FadeOut duration="fast">
        <div className="p-6 bg-yellow-500 text-white rounded-lg">Fast FadeOut Animation</div>
      </FadeOut>

      <FadeOut duration="slow" delay={0.5}>
        <div className="p-6 bg-indigo-500 text-white rounded-lg">Slow FadeOut with 0.5s Delay</div>
      </FadeOut>
    </div>
  ),
};

const FadeTransitionComponent = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Toggle Visibility
      </button>

      <FadeTransition isVisible={isVisible}>
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
          This content fades in and out!
        </div>
      </FadeTransition>

      <FadeTransition isVisible={!isVisible} duration="slow">
        <div className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg">
          This appears when the other hides (slow)
        </div>
      </FadeTransition>
    </div>
  );
};

export const FadeTransitionDemo: StoryObj<typeof FadeTransition> = {
  render: () => <FadeTransitionComponent />,
};

export const StaggeredFade: StoryObj<typeof FadeIn> = {
  render: () => {
    const items = ["First", "Second", "Third", "Fourth", "Fifth"];

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Staggered Fade In</h3>
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, index) => (
            <FadeIn key={item} delay={index * 0.1}>
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg">
                {item} Item (delay: {index * 0.1}s)
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    );
  },
};

export const DisabledAnimation: StoryObj<typeof FadeIn> = {
  render: () => (
    <div className="space-y-4">
      <FadeIn disabled>
        <div className="p-6 bg-gray-500 text-white rounded-lg">FadeIn with Animation Disabled</div>
      </FadeIn>

      <FadeOut disabled>
        <div className="p-6 bg-gray-600 text-white rounded-lg">FadeOut with Animation Disabled</div>
      </FadeOut>
    </div>
  ),
};

export const ReducedMotion: StoryObj<typeof FadeIn> = {
  decorators: [
    (Story) => (
      <AnimationProvider reducedMotion={true}>
        <Story />
      </AnimationProvider>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">These animations respect the reduced motion setting</p>
      <FadeIn>
        <div className="p-6 bg-blue-500 text-white rounded-lg">FadeIn with Reduced Motion</div>
      </FadeIn>
    </div>
  ),
};
