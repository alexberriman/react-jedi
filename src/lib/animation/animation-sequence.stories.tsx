import React, { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AnimationSequence,
  createAnimationSequence,
  createComplexSequence,
  useAnimationSequence,
  AnimationSequenceControls,
} from "./animation-sequence";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Animation/AnimationSequence",
  component: AnimationSequence,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component for creating complex, chained animation sequences with precise timing control.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AnimationSequence>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic sequence showing a simple fade-in animation
 */
export const BasicSequence: Story = {
  args: {
    config: {
      steps: [
        { animate: { opacity: 0 }, duration: 0 },
        { animate: { opacity: 1 }, duration: 1 },
      ],
      autoPlay: true,
    },
    children: null, // Children are provided in the render function
  },
  render: (args) => (
    <AnimationSequence {...args}>
      <Card className="p-6 w-64">
        <h3 className="text-lg font-semibold mb-2">Basic Sequence</h3>
        <p className="text-sm text-muted-foreground">This card fades in when the page loads.</p>
      </Card>
    </AnimationSequence>
  ),
};

/**
 * Multi-step sequence with different animation properties
 */
export const MultiStepSequence: Story = {
  args: {
    config: { steps: [], autoPlay: true },
    children: null,
  },
  render: () => {
    const config = createAnimationSequence(
      [
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0 },
        { scale: 1.05 },
        { scale: 1 },
      ],
      {
        duration: [0, 0.5, 0.2, 0.2],
        ease: ["linear", "easeOut", "easeInOut", "easeInOut"],
      }
    );

    return (
      <AnimationSequence config={config}>
        <Card className="p-6 w-64">
          <h3 className="text-lg font-semibold mb-2">Multi-Step Animation</h3>
          <p className="text-sm text-muted-foreground">
            Fades in, scales up, then settles with a bounce effect.
          </p>
        </Card>
      </AnimationSequence>
    );
  },
};

const ControlledSequenceWrapper = () => {
  const controlRef = useRef<AnimationSequenceControls>(null);

  const config = createAnimationSequence(
    [
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1 },
      { x: 100, opacity: 1 },
      { x: 0, opacity: 1 },
    ],
    {
      duration: 0.5,
      ease: "easeInOut",
    }
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => controlRef.current?.play()}>Play</Button>
        <Button onClick={() => controlRef.current?.pause()}>Pause</Button>
        <Button onClick={() => controlRef.current?.resume()}>Resume</Button>
        <Button onClick={() => controlRef.current?.reset()}>Reset</Button>
        <Button onClick={() => controlRef.current?.reverse()}>Reverse</Button>
      </div>

      <AnimationSequence config={{ ...config, autoPlay: false }} controlRef={controlRef}>
        <Card className="p-6 w-64">
          <h3 className="text-lg font-semibold mb-2">Controlled Animation</h3>
          <p className="text-sm text-muted-foreground">
            Use the buttons to control this animation.
          </p>
        </Card>
      </AnimationSequence>
    </div>
  );
};

/**
 * Controlled sequence with play/pause/reset controls
 */
export const ControlledSequence: Story = {
  args: {
    config: { steps: [], autoPlay: true },
    children: null,
  },
  render: () => <ControlledSequenceWrapper />,
};

/**
 * Looping sequence with yoyo effect
 */
export const LoopingYoyoSequence: Story = {
  args: {
    config: { steps: [], autoPlay: true },
    children: null,
  },
  render: () => {
    const config = createAnimationSequence(
      [
        { x: 0, rotate: 0 },
        { x: 200, rotate: 180 },
      ],
      {
        duration: 1,
        ease: "easeInOut",
      }
    );

    return (
      <AnimationSequence
        config={{
          ...config,
          loop: true,
          yoyo: true,
          loopDelay: 0.5,
        }}
      >
        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
          🚀
        </div>
      </AnimationSequence>
    );
  },
};

const SequenceWithCallbacksWrapper = () => {
  const [status, setStatus] = React.useState("idle");
  const [currentStep, setCurrentStep] = React.useState(0);

  const config = createAnimationSequence(
    [{ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { scale: 1.1 }, { scale: 1, rotate: 360 }],
    {
      duration: 0.5,
      callbacks: [
        { onStart: () => setCurrentStep(0) },
        { onStart: () => setCurrentStep(1) },
        { onStart: () => setCurrentStep(2) },
        { onStart: () => setCurrentStep(3) },
      ],
    }
  );

  const enhancedConfig = {
    ...config,
    onSequenceStart: () => setStatus("playing"),
    onSequenceComplete: () => setStatus("complete"),
    onSequencePause: () => setStatus("paused"),
    onSequenceResume: () => setStatus("playing"),
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Badge variant={status === "playing" ? "default" : "secondary"}>Status: {status}</Badge>
        <Badge variant="outline">Step: {currentStep + 1}/4</Badge>
      </div>

      <AnimationSequence config={enhancedConfig}>
        <Card className="p-6 w-64">
          <h3 className="text-lg font-semibold mb-2">Animated Card</h3>
          <p className="text-sm text-muted-foreground">
            Watch the status badges update as the animation progresses.
          </p>
        </Card>
      </AnimationSequence>
    </div>
  );
};

/**
 * Sequence with callbacks and status tracking
 */
export const SequenceWithCallbacks: Story = {
  args: {
    config: { steps: [], autoPlay: true },
    children: null,
  },
  render: () => <SequenceWithCallbacksWrapper />,
};

/**
 * Complex parallel sequences
 */
export const ParallelSequences: Story = {
  args: {
    config: { steps: [], autoPlay: true },
    children: null,
  },
  render: () => {
    const steps = createComplexSequence(
      [
        {
          target: "card1",
          steps: [
            { animate: { x: 0, opacity: 0 }, duration: 0 },
            { animate: { x: 0, opacity: 1 }, duration: 0.5 },
            { animate: { x: 50 }, duration: 0.5 },
          ],
        },
        {
          target: "card2",
          steps: [
            { animate: { x: 0, opacity: 0 }, duration: 0 },
            { animate: { x: 0, opacity: 1 }, duration: 0.5, delay: 0.2 },
            { animate: { x: -50 }, duration: 0.5 },
          ],
        },
      ],
      {
        stagger: 0.2,
      }
    );

    return (
      <AnimationSequence config={{ steps }}>
        <div className="flex gap-4">
          <Card className="p-4 w-48" data-sequence="card1">
            <h4 className="font-semibold">Card 1</h4>
            <p className="text-sm text-muted-foreground">Moves right</p>
          </Card>
          <Card className="p-4 w-48" data-sequence="card2">
            <h4 className="font-semibold">Card 2</h4>
            <p className="text-sm text-muted-foreground">Moves left</p>
          </Card>
        </div>
      </AnimationSequence>
    );
  },
};

const HookExampleWrapper = () => {
  const { config, status, controlRef } = useAnimationSequence({
    steps: [
      { animate: { scale: 1, rotate: 0 }, duration: 0 },
      { animate: { scale: 1.2, rotate: 90 }, duration: 0.5 },
      { animate: { scale: 1, rotate: 180 }, duration: 0.5 },
      { animate: { scale: 0.8, rotate: 270 }, duration: 0.5 },
      { animate: { scale: 1, rotate: 360 }, duration: 0.5 },
    ],
    loop: true,
  });

  return (
    <div className="space-y-4 text-center">
      <div className="text-sm text-muted-foreground">
        Status: <span className="font-semibold">{status}</span>
      </div>

      <AnimationSequence config={config} controlRef={controlRef}>
        <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto" />
      </AnimationSequence>

      <div className="flex gap-2 justify-center">
        <Button size="sm" onClick={() => controlRef.current?.play()}>
          Play
        </Button>
        <Button size="sm" onClick={() => controlRef.current?.pause()}>
          Pause
        </Button>
        <Button size="sm" onClick={() => controlRef.current?.goToStep(0)}>
          Go to Start
        </Button>
      </div>
    </div>
  );
};

/**
 * Using the useAnimationSequence hook
 */
export const HookExample: Story = {
  args: {
    config: { steps: [], autoPlay: true },
    children: null,
  },
  render: () => <HookExampleWrapper />,
};

const StepByStepShowcaseWrapper = () => {
  const controlRef = useRef<AnimationSequenceControls>(null);
  const [currentStep, setCurrentStep] = React.useState(0);

  const config = createAnimationSequence(
    [
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 0.5, y: 25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1 },
      { scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" },
      { scale: 1, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" },
    ],
    {
      duration: 0.3,
      ease: "easeOut",
      callbacks: [
        { onComplete: () => setCurrentStep(1) },
        { onComplete: () => setCurrentStep(2) },
        { onComplete: () => setCurrentStep(3) },
        { onComplete: () => setCurrentStep(4) },
        { onComplete: () => setCurrentStep(5) },
      ],
    }
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <Badge
              key={step}
              variant={currentStep >= step ? "default" : "outline"}
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
            >
              {step}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => {
              controlRef.current?.reset();
              controlRef.current?.play();
              setCurrentStep(0);
            }}
          >
            Restart
          </Button>
          <Button
            size="sm"
            onClick={() => controlRef.current?.goToStep(currentStep + 1)}
            disabled={currentStep >= 4}
          >
            Next Step
          </Button>
        </div>
      </div>

      <AnimationSequence config={{ ...config, autoPlay: false }} controlRef={controlRef}>
        <Card className="p-8 w-full max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-4">Step-by-Step Animation</h3>
          <p className="text-muted-foreground mb-4">
            This animation has 5 distinct steps. Click &quot;Next Step&quot; to progress through
            them, or &quot;Restart&quot; to begin again.
          </p>
          <div className="text-center text-sm text-muted-foreground">
            Current Step: {currentStep}/5
          </div>
        </Card>
      </AnimationSequence>
    </div>
  );
};

/**
 * Step-by-step animation showcase
 */
export const StepByStepShowcase: Story = {
  args: {
    config: { steps: [], autoPlay: true },
    children: null,
  },
  render: () => <StepByStepShowcaseWrapper />,
};
