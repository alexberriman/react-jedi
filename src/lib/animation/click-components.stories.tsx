import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Click, ClickButton, ClickCard, ClickIcon } from "./click";
import { AnimationProvider } from "./animation-provider";
import { Box } from "../../components/ui/box";
import { Stack } from "../../components/ui/stack";
import { SimpleGrid } from "../../components/ui/simple-grid";
import { Heading } from "../../components/ui/heading";
import { Text } from "../../components/ui/text";

const meta = {
  title: "Animation/ClickComponents",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Pre-built click animation components for common UI patterns.",
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
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// Icon component for demos
const HeartIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const BasicClick: Story = {
  render: () => (
    <Stack spacing={6} align="center">
      <Heading level={3}>Basic Click Wrapper</Heading>
      <Click preset="bounce">
        <Box className="px-6 py-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">
          <Text>Click me! I&apos;ll bounce.</Text>
        </Box>
      </Click>
    </Stack>
  ),
};

export const ClickButtons: Story = {
  render: () => (
    <Stack spacing={6}>
      <Heading level={3} className="text-center">
        Click Buttons
      </Heading>

      <Stack spacing={4}>
        <Box className="flex gap-4 justify-center">
          <ClickButton>Primary</ClickButton>
          <ClickButton variant="secondary">Secondary</ClickButton>
          <ClickButton variant="ghost">Ghost</ClickButton>
          <ClickButton variant="danger">Danger</ClickButton>
        </Box>

        <Box className="flex gap-4 justify-center items-center">
          <ClickButton size="sm">Small</ClickButton>
          <ClickButton size="md">Medium</ClickButton>
          <ClickButton size="lg">Large</ClickButton>
        </Box>

        <Box className="flex gap-4 justify-center">
          <ClickButton preset="bounce">Bounce</ClickButton>
          <ClickButton preset="press">Press</ClickButton>
          <ClickButton preset="jelly">Jelly</ClickButton>
          <ClickButton preset="pulse">Pulse</ClickButton>
        </Box>

        <Box className="flex gap-4 justify-center">
          <ClickButton disabled>Disabled</ClickButton>
          <ClickButton
            animation={{
              scale: 0.85,
              rotate: -5,
              brightness: 0.8,
              shadow: "inset 0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Custom Animation
          </ClickButton>
        </Box>
      </Stack>
    </Stack>
  ),
};

export const ClickCards: Story = {
  render: () => (
    <Stack spacing={6}>
      <Heading level={3} className="text-center">
        Click Cards
      </Heading>

      <SimpleGrid columns={2} spacing={4}>
        <ClickCard
          header={<Heading level={4}>Default Card</Heading>}
          footer={<Text className="text-sm text-gray-500">With footer</Text>}
        >
          <Text>This card uses the default bounce preset.</Text>
        </ClickCard>

        <ClickCard preset="press" header={<Heading level={4}>Press Card</Heading>}>
          <Text>This card uses the press preset for a tactile feel.</Text>
        </ClickCard>

        <ClickCard
          preset="jelly"
          className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900"
        >
          <Heading level={4}>Gradient Card</Heading>
          <Text className="mt-2">Custom styled with jelly animation.</Text>
        </ClickCard>

        <ClickCard
          animation={{
            scale: 0.97,
            brightness: 0.95,
            translateY: 1,
            shadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        >
          <Heading level={4}>Custom Animation</Heading>
          <Text className="mt-2">This card has a custom animation config.</Text>
        </ClickCard>
      </SimpleGrid>
    </Stack>
  ),
};

export const ClickIcons: Story = {
  render: () => (
    <Stack spacing={6}>
      <Heading level={3} className="text-center">
        Click Icons
      </Heading>

      <Stack spacing={4}>
        <Box className="flex gap-4 justify-center">
          <ClickIcon icon={<HeartIcon />} size="sm" />
          <ClickIcon icon={<HeartIcon />} size="md" />
          <ClickIcon icon={<HeartIcon />} size="lg" />
        </Box>

        <Box className="flex gap-4 justify-center">
          <ClickIcon icon={<StarIcon />} preset="bounce" className="text-yellow-500" />
          <ClickIcon icon={<StarIcon />} preset="jelly" className="text-blue-500" />
          <ClickIcon icon={<StarIcon />} preset="pulse" className="text-purple-500" />
          <ClickIcon icon={<StarIcon />} preset="pop" className="text-green-500" />
        </Box>

        <Box className="flex gap-4 justify-center">
          <ClickIcon
            icon={<HeartIcon />}
            animation={{
              scale: 0.8,
              rotate: -15,
              brightness: 0.9,
            }}
            className="text-red-500"
          />
          <ClickIcon
            icon={<StarIcon />}
            animation={{
              scale: 1.1,
              brightness: 1.2,
              shadow: "0 0 10px currentColor",
            }}
            className="text-orange-500"
          />
        </Box>
      </Stack>
    </Stack>
  ),
};

const InteractiveExampleComponent = () => {
  const [count, setCount] = React.useState(0);
  const [rating, setRating] = React.useState(0);

  return (
    <Stack spacing={8}>
      <Box className="text-center">
        <Heading level={3} className="mb-4">
          Interactive Counter
        </Heading>
        <ClickButton preset="bounce" size="lg" onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </ClickButton>
      </Box>

      <Box className="text-center">
        <Heading level={3} className="mb-4">
          Star Rating
        </Heading>
        <Box className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <ClickIcon
              key={star}
              icon={<StarIcon />}
              preset="jelly"
              size="lg"
              className={star <= rating ? "text-yellow-400" : "text-gray-300"}
              onClick={() => setRating(star)}
            />
          ))}
        </Box>
        <Text className="mt-2">Rating: {rating}/5</Text>
      </Box>
    </Stack>
  );
};

export const InteractiveExample: Story = {
  render: () => <InteractiveExampleComponent />,
};

export const ComplexLayout: Story = {
  render: () => (
    <Stack spacing={6}>
      <Heading level={2} className="text-center">
        Product Cards
      </Heading>

      <SimpleGrid columns={3} spacing={4}>
        {[
          { name: "Basic Plan", price: "$9", features: ["1 User", "10GB Storage"] },
          {
            name: "Pro Plan",
            price: "$29",
            features: ["5 Users", "100GB Storage", "Priority Support"],
          },
          {
            name: "Enterprise",
            price: "$99",
            features: ["Unlimited Users", "1TB Storage", "24/7 Support"],
          },
        ].map((plan) => (
          <ClickCard key={plan.name} preset="bounce" className="text-center">
            <Heading level={4}>{plan.name}</Heading>
            <Text className="text-3xl font-bold my-4">{plan.price}</Text>
            <ul className="text-sm space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <ClickButton
              variant="primary"
              size="md"
              preset="press"
              className="mt-6 w-full"
              onClick={(e) => {
                e.stopPropagation();
                console.log(`Selected ${plan.name}`);
              }}
            >
              Choose Plan
            </ClickButton>
          </ClickCard>
        ))}
      </SimpleGrid>
    </Stack>
  ),
};
