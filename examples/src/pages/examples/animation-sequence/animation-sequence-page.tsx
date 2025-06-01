import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  AnimationSequence,
  AnimationSequenceControls,
  createAnimationSequence,
  createComplexSequence,
  useAnimationSequence,
} from "@alexberriman/react-jedi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";

export const AnimationSequencePage = () => {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Animation Sequences
          </h1>
          <p className="text-xl text-muted-foreground">
            Chain multiple animations together with precise timing control
          </p>
        </header>

        <Tabs defaultValue="examples" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
            <TabsTrigger value="complex">Complex Patterns</TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="space-y-8">
            <BasicSequenceExample />
            <MultiStepExample />
            <LoopingExample />
          </TabsContent>

          <TabsContent value="playground" className="space-y-8">
            <InteractivePlayground />
          </TabsContent>

          <TabsContent value="complex" className="space-y-8">
            <ParallelSequencesExample />
            <OrchestratedExample />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Basic sequence example
const BasicSequenceExample = () => {
  const controlRef = useRef<AnimationSequenceControls>(null);

  const config = createAnimationSequence(
    [{ opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 }, { scale: 1.05 }, { scale: 1 }],
    {
      duration: [0, 0.6, 0.3, 0.3],
      ease: ["linear", "easeOut", "easeInOut", "easeInOut"],
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Sequence</CardTitle>
        <CardDescription>A simple entrance animation with scale and opacity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button size="sm" onClick={() => controlRef.current?.play()}>
            <Play className="w-4 h-4 mr-1" /> Play
          </Button>
          <Button size="sm" onClick={() => controlRef.current?.reset()}>
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>
        </div>

        <AnimationSequence config={{ ...config, autoPlay: false }} controlRef={controlRef}>
          <div className="w-64 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-semibold">
            Animated Element
          </div>
        </AnimationSequence>
      </CardContent>
    </Card>
  );
};

// Multi-step example
const MultiStepExample = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const controlRef = useRef<AnimationSequenceControls>(null);

  const config = createAnimationSequence(
    [
      { x: -300, opacity: 0 },
      { x: -150, opacity: 0.5 },
      { x: 0, opacity: 1 },
      { x: 150, opacity: 0.5 },
      { x: 300, opacity: 0 },
    ],
    {
      duration: 0.5,
      ease: "easeInOut",
      callbacks: [
        { onComplete: () => setCurrentStep(1) },
        { onComplete: () => setCurrentStep(2) },
        { onComplete: () => setCurrentStep(3) },
        { onComplete: () => setCurrentStep(4) },
        { onComplete: () => setCurrentStep(0) },
      ],
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Multi-Step Sequence</CardTitle>
        <CardDescription>Track progress through multiple animation steps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((step) => (
              <Badge
                key={step}
                variant={currentStep === step ? "default" : "outline"}
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              >
                {step + 1}
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
              <Play className="w-4 h-4 mr-1" /> Play
            </Button>
            <Button
              size="sm"
              onClick={() => controlRef.current?.goToStep(currentStep + 1)}
              disabled={currentStep >= 4}
            >
              <SkipForward className="w-4 h-4 mr-1" /> Next
            </Button>
          </div>
        </div>

        <div className="relative h-20 overflow-hidden">
          <AnimationSequence config={{ ...config, autoPlay: false }} controlRef={controlRef}>
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                {currentStep + 1}
              </div>
            </div>
          </AnimationSequence>
        </div>
      </CardContent>
    </Card>
  );
};

// Looping example
const LoopingExample = () => {
  const config = createAnimationSequence(
    [
      { rotate: 0, scale: 1 },
      { rotate: 90, scale: 1.2 },
      { rotate: 180, scale: 1 },
      { rotate: 270, scale: 0.8 },
      { rotate: 360, scale: 1 },
    ],
    {
      duration: 0.5,
      ease: "easeInOut",
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Looping Sequence</CardTitle>
        <CardDescription>Continuous animation with yoyo effect</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <AnimationSequence
            config={{
              ...config,
              loop: true,
              yoyo: true,
              loopDelay: 0.2,
            }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </AnimationSequence>
        </div>
      </CardContent>
    </Card>
  );
};

// Interactive playground
const InteractivePlayground = () => {
  const controlRef = useRef<AnimationSequenceControls>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0.5);
  const [loop, setLoop] = useState(false);
  const [yoyo, setYoyo] = useState(false);
  const { config, status } = useAnimationSequence({
    steps: [
      { animate: { x: 0, y: 0, rotate: 0, scale: 1 }, duration: 0 },
      { animate: { x: 100, y: 0, rotate: 90, scale: 1.2 }, duration },
      { animate: { x: 100, y: 100, rotate: 180, scale: 1 }, duration },
      { animate: { x: 0, y: 100, rotate: 270, scale: 0.8 }, duration },
      { animate: { x: 0, y: 0, rotate: 360, scale: 1 }, duration },
    ],
    loop,
    yoyo,
    autoPlay: false,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Animation Playground</CardTitle>
        <CardDescription>Experiment with different sequence configurations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="duration-slider">
                Duration (seconds)
              </label>
              <input
                id="duration-slider"
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={duration}
                onChange={(e) => setDuration(Number.parseFloat(e.target.value))}
                className="w-full mt-1"
              />
              <span className="text-sm text-muted-foreground">{duration}s</span>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={loop}
                  onChange={(e) => setLoop(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Loop</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={yoyo}
                  onChange={(e) => setYoyo(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Yoyo Effect</span>
              </label>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Status: {status}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    controlRef.current?.play();
                    setIsPlaying(true);
                  }}
                  disabled={isPlaying}
                >
                  <Play className="w-4 h-4 mr-1" /> Play
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    controlRef.current?.pause();
                    setIsPlaying(false);
                  }}
                  disabled={!isPlaying}
                >
                  <Pause className="w-4 h-4 mr-1" /> Pause
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    controlRef.current?.reset();
                    setIsPlaying(false);
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-1" /> Reset
                </Button>
              </div>
            </div>
          </div>

          <div className="relative h-64 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <AnimationSequence config={config} controlRef={controlRef}>
              <div className="absolute top-4 left-4 w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                A
              </div>
            </AnimationSequence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Parallel sequences example
const ParallelSequencesExample = () => {
  const steps = createComplexSequence(
    [
      {
        target: "element1",
        steps: [
          { animate: { x: 0, opacity: 0 }, duration: 0 },
          { animate: { x: 0, opacity: 1 }, duration: 0.5 },
          { animate: { x: 100, scale: 1.2 }, duration: 0.5 },
          { animate: { x: 0, scale: 1 }, duration: 0.5 },
        ],
      },
      {
        target: "element2",
        steps: [
          { animate: { y: 0, opacity: 0 }, duration: 0 },
          { animate: { y: 0, opacity: 1 }, duration: 0.5, delay: 0.2 },
          { animate: { y: -50, rotate: 180 }, duration: 0.5 },
          { animate: { y: 0, rotate: 360 }, duration: 0.5 },
        ],
      },
      {
        target: "element3",
        steps: [
          { animate: { scale: 0, opacity: 0 }, duration: 0 },
          { animate: { scale: 1, opacity: 1 }, duration: 0.5, delay: 0.4 },
          { animate: { scale: 1.5, rotate: -90 }, duration: 0.5 },
          { animate: { scale: 1, rotate: 0 }, duration: 0.5 },
        ],
      },
    ],
    {
      stagger: 0.2,
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parallel Sequences</CardTitle>
        <CardDescription>Multiple elements animating with coordinated timing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimationSequence config={{ steps, loop: true, loopDelay: 1 }}>
          <div className="grid grid-cols-3 gap-4">
            <div
              data-sequence="element1"
              className="h-24 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"
            >
              1
            </div>
            <div
              data-sequence="element2"
              className="h-24 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold"
            >
              2
            </div>
            <div
              data-sequence="element3"
              className="h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold"
            >
              3
            </div>
          </div>
        </AnimationSequence>
      </CardContent>
    </Card>
  );
};

// Orchestrated example
const OrchestratedExample = () => {
  const [phase, setPhase] = useState(0);

  const config = createAnimationSequence(
    [
      // Phase 1: Gather
      {
        opacity: 0,
        scale: 0.8,
        x: (index: number) => (index - 1) * 100,
      },
      {
        opacity: 1,
        scale: 1,
        x: (index: number) => (index - 1) * 100,
      },
      // Phase 2: Center
      {
        x: 0,
        scale: 1.1,
      },
      // Phase 3: Expand
      {
        scale: 0.9,
        rotate: (index: number) => index * 120,
        x: (index: number) => Math.cos((index * 2 * Math.PI) / 3) * 80,
        y: (index: number) => Math.sin((index * 2 * Math.PI) / 3) * 80,
      },
      // Phase 4: Return
      {
        rotate: 0,
        x: (index: number) => (index - 1) * 100,
        y: 0,
        scale: 1,
      },
    ],
    {
      duration: 0.6,
      ease: "easeInOut",
      callbacks: [
        { onComplete: () => setPhase(1) },
        { onComplete: () => setPhase(2) },
        { onComplete: () => setPhase(3) },
        { onComplete: () => setPhase(4) },
      ],
    }
  );

  const phases = ["Initializing", "Appearing", "Gathering", "Expanding", "Complete"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orchestrated Animation</CardTitle>
        <CardDescription>Complex coordinated movements with multiple phases</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Phase {phase}: {phases[phase]}
          </Badge>
        </div>

        <div className="relative h-48 flex items-center justify-center">
          <AnimationSequence config={{ ...config, loop: true, loopDelay: 1 }}>
            <div className="flex gap-4">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  custom={index}
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold"
                >
                  {index + 1}
                </motion.div>
              ))}
            </div>
          </AnimationSequence>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimationSequencePage;
