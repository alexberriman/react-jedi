import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { motion } from "framer-motion";
import { useClickAnimation, useClickPreset, clickPresets, ClickPreset } from "./animation-hooks";
import { AnimationProvider } from "./animation-provider";
import { Box } from "../../components/ui/box";
import { Button } from "../../components/ui/button";
import { Text } from "../../components/ui/text";
import { Heading } from "../../components/ui/heading";
import { Stack } from "../../components/ui/stack";
import { SimpleGrid } from "../../components/ui/simple-grid";

const meta = {
  title: "Animation/ClickAnimations",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Click animations provide visual feedback when elements are clicked or tapped.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AnimationProvider>
        <Box className="min-h-[400px] p-8">
          <Story />
        </Box>
      </AnimationProvider>
    ),
  ],

  tags: ['autodocs', 'animation-click'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// Component to demonstrate custom click animation
const CustomClickDemo = () => {
  const clickAnimation = useClickAnimation({
    scale: 0.9,
    rotate: -5,
    brightness: 0.85,
    shadow: "inset 0 2px 6px rgba(0,0,0,0.2)",
    translateY: 3,
  });

  return (
    <Box className="p-8 text-center">
      <Heading level="h3" className="mb-4">
        Custom Click Animation
      </Heading>
      <motion.button
        {...clickAnimation}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg cursor-pointer"
      >
        Click me with custom animation!
      </motion.button>
    </Box>
  );
};

// Component to demonstrate all click presets
const ClickPresetsDemo = () => {
  const presetKeys = Object.keys(clickPresets) as ClickPreset[];

  return (
    <Stack spacing="lg">
      <Heading level="h2" className="text-center">
        Click Animation Presets
      </Heading>
      <SimpleGrid columns={3} spacing="md">
        {presetKeys.map((preset) => {
          const PresetButton = () => {
            const animation = useClickPreset(preset);

            return (
              <motion.div
                {...animation}
                className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md cursor-pointer text-center"
              >
                <Text className="font-semibold text-lg mb-1">{preset}</Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">Click to test</Text>
              </motion.div>
            );
          };

          return <PresetButton key={preset} />;
        })}
      </SimpleGrid>
    </Stack>
  );
};

// Interactive playground for click animations
const ClickPlayground = () => {
  const [config, setConfig] = React.useState({
    scale: 0.95,
    rotate: 0,
    brightness: 0.9,
    translateY: 1,
  });

  const animation = useClickAnimation(config);

  return (
    <Stack spacing="lg">
      <Heading level="h2" className="text-center">
        Click Animation Playground
      </Heading>

      <Box className="grid grid-cols-2 gap-6">
        <Box className="space-y-4">
          <Box>
            <label className="block text-sm font-medium mb-1">Scale: {config.scale}</label>
            <input
              type="range"
              min="0.5"
              max="1.2"
              step="0.05"
              value={config.scale}
              onChange={(e) => setConfig({ ...config, scale: Number.parseFloat(e.target.value) })}
              className="w-full"
            />
          </Box>

          <Box>
            <label className="block text-sm font-medium mb-1">Rotate: {config.rotate}°</label>
            <input
              type="range"
              min="-20"
              max="20"
              step="1"
              value={config.rotate}
              onChange={(e) => setConfig({ ...config, rotate: Number(e.target.value) })}
              className="w-full"
            />
          </Box>

          <Box>
            <label className="block text-sm font-medium mb-1">
              Brightness: {config.brightness}
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={config.brightness}
              onChange={(e) =>
                setConfig({ ...config, brightness: Number.parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </Box>

          <Box>
            <label className="block text-sm font-medium mb-1">
              Translate Y: {config.translateY}px
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="1"
              value={config.translateY}
              onChange={(e) => setConfig({ ...config, translateY: Number(e.target.value) })}
              className="w-full"
            />
          </Box>
        </Box>

        <Box className="flex items-center justify-center">
          <motion.button
            {...animation}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-xl cursor-pointer text-lg"
          >
            Test Click Animation
          </motion.button>
        </Box>
      </Box>
    </Stack>
  );
};

// Component showing click animations with different UI elements
const UIElementsDemo = () => {
  const bounceClick = useClickPreset("bounce");
  const pressClick = useClickPreset("press");
  const jellyClick = useClickPreset("jelly");
  const pulseClick = useClickPreset("pulse");

  return (
    <Stack spacing="lg">
      <Heading level="h2" className="text-center">
        Click Animations on UI Elements
      </Heading>

      <SimpleGrid columns={2} spacing="lg">
        <motion.div {...bounceClick}>
          <Button size="lg" variant="default" className="w-full">
            Bounce Button
          </Button>
        </motion.div>

        <motion.div {...pressClick}>
          <Button size="lg" variant="secondary" className="w-full">
            Press Button
          </Button>
        </motion.div>

        <motion.div
          {...jellyClick}
          className="p-6 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg shadow-md cursor-pointer"
        >
          <Heading level="h4">Jelly Card</Heading>
          <Text className="mt-2">Click me for a jelly effect!</Text>
        </motion.div>

        <motion.div
          {...pulseClick}
          className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg shadow-md cursor-pointer"
        >
          <Heading level="h4">Pulse Card</Heading>
          <Text className="mt-2">Click me for a pulse effect!</Text>
        </motion.div>
      </SimpleGrid>
    </Stack>
  );
};

export const Default: Story = {
  render: () => <CustomClickDemo />,
};

export const Presets: Story = {
  render: () => <ClickPresetsDemo />,
};

export const Playground: Story = {
  render: () => <ClickPlayground />,
};

export const UIElements: Story = {
  render: () => <UIElementsDemo />,
};

export const CombinedEffects: Story = {
  render: () => {
    const ComboButton = () => {
      const clickAnimation = useClickAnimation({
        scale: 0.92,
        rotate: -2,
        brightness: 0.88,
        shadow: "0 1px 3px rgba(0,0,0,0.3)",
        translateY: 2,
      });

      // Also add hover effect for combined interaction
      const hoverAnimation = {
        whileHover: {
          scale: 1.05,
          brightness: 1.1,
          y: -2,
        },
      };

      return (
        <Box className="text-center p-8">
          <Heading level="h3" className="mb-6">
            Combined Hover & Click
          </Heading>
          <motion.button
            {...clickAnimation}
            {...hoverAnimation}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-xl cursor-pointer text-lg transform-gpu"
          >
            Hover then Click Me!
          </motion.button>
        </Box>
      );
    };

    return <ComboButton />;
  },
};

const DisabledStateComponent = () => {
  const animation = useClickAnimation({
    scale: 1, // No scale change for disabled
    brightness: 1, // No brightness change
    opacity: 0.6, // Just opacity for visual feedback
  });

  return (
    <Box className="text-center p-8">
      <Heading level="h3" className="mb-6">
        Disabled Click Animation
      </Heading>
      <motion.button
        {...animation}
        className="px-8 py-4 bg-gray-400 text-gray-600 font-bold rounded-xl shadow-md cursor-not-allowed text-lg"
        style={{ pointerEvents: "auto" }}
      >
        Disabled (Still Clickable for Demo)
      </motion.button>
    </Box>
  );
};

export const DisabledState: Story = {
  render: () => <DisabledStateComponent />,
};
