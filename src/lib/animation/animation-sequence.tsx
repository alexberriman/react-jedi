import React, { ReactNode, useRef, useState, useCallback, useEffect } from "react";
import { motion, useAnimationControls, TargetAndTransition } from "framer-motion";

/**
 * Defines a single step in an animation sequence
 */
export interface AnimationStep {
  /** Target animation properties */
  animate: TargetAndTransition;
  /** Duration of this step in seconds */
  duration?: number;
  /** Delay before this step starts */
  delay?: number;
  /** Easing function for this step */
  ease?: string | number[];
  /** Callback when this step starts */
  onStart?: () => void;
  /** Callback when this step completes */
  onComplete?: () => void;
}

/**
 * Configuration for the animation sequence
 */
export interface AnimationSequenceConfig {
  /** Array of animation steps to execute in order */
  steps: AnimationStep[];
  /** Whether to loop the sequence */
  loop?: boolean;
  /** Number of times to repeat (use Infinity for endless) */
  repeat?: number;
  /** Delay between loops in seconds */
  loopDelay?: number;
  /** Whether to reverse the sequence on alternate iterations */
  yoyo?: boolean;
  /** Whether to auto-play on mount */
  autoPlay?: boolean;
  /** Callback when sequence starts */
  onSequenceStart?: () => void;
  /** Callback when sequence completes */
  onSequenceComplete?: () => void;
  /** Callback when sequence is paused */
  onSequencePause?: () => void;
  /** Callback when sequence resumes */
  onSequenceResume?: () => void;
}

export interface AnimationSequenceProps {
  children: ReactNode;
  config: AnimationSequenceConfig;
  className?: string;
  style?: React.CSSProperties;
  /** Enable sequence controls (returns control methods) */
  controlRef?: React.MutableRefObject<AnimationSequenceControls | null>;
}

export interface AnimationSequenceControls {
  play: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  reverse: () => void;
  goToStep: (index: number) => void;
  getCurrentStep: () => number;
  getTotalSteps: () => number;
}

/**
 * Component that executes a sequence of animations step by step
 */
export const AnimationSequence: React.FC<AnimationSequenceProps> = ({
  children,
  config,
  className,
  style,
  controlRef,
}) => {
  const controls = useAnimationControls();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(config.autoPlay ?? true);
  const [isPaused, setIsPaused] = useState(false);
  const [repeatCount, setRepeatCount] = useState(0);
  const [isReversed, setIsReversed] = useState(false);

  const {
    steps,
    loop = false,
    repeat = 1,
    loopDelay = 0,
    yoyo = false,
    onSequenceStart,
    onSequenceComplete,
    onSequencePause,
    onSequenceResume,
  } = config;

  const timeoutRef = useRef<ReturnType<typeof globalThis.setTimeout>>();
  const executeStepRef = useRef<(stepIndex: number) => void>();

  const handleSequenceComplete = useCallback(() => {
    const shouldRepeat = loop || repeatCount < repeat - 1;

    if (shouldRepeat) {
      // Handle yoyo effect
      if (yoyo) {
        setIsReversed(!isReversed);
      }

      // Increment repeat count
      setRepeatCount((prev) => prev + 1);

      // Reset and restart sequence after loop delay
      timeoutRef.current = globalThis.setTimeout(() => {
        setCurrentStep(0);
        if (executeStepRef.current) {
          executeStepRef.current(0);
        }
      }, loopDelay * 1000);
    } else {
      // Sequence fully complete
      setIsPlaying(false);
      onSequenceComplete?.();
    }
  }, [loop, repeat, repeatCount, yoyo, loopDelay, isReversed, onSequenceComplete]);

  const executeStep = useCallback(
    async (stepIndex: number) => {
      if (!isPlaying || isPaused) return;

      const effectiveSteps = isReversed ? [...steps].reverse() : steps;
      const step = effectiveSteps[stepIndex];

      if (!step) return;

      // Call step start callback
      step.onStart?.();

      try {
        // Execute the animation
        await controls.start({
          ...step.animate,
          transition: {
            duration: step.duration || 0.5,
            delay: step.delay || 0,
            ease: step.ease || "easeInOut",
          },
        });
      } catch {
        // Handle animation errors (e.g., if animation is cancelled)
        return;
      }

      // Call step complete callback
      step.onComplete?.();

      // Move to next step
      const nextStepIndex = stepIndex + 1;

      if (nextStepIndex < effectiveSteps.length) {
        // Continue to next step
        setCurrentStep(nextStepIndex);
        executeStep(nextStepIndex);
      } else {
        // Sequence complete
        handleSequenceComplete();
      }
    },
    [controls, steps, isPlaying, isPaused, isReversed, handleSequenceComplete]
  );

  // Update ref when executeStep changes
  useEffect(() => {
    executeStepRef.current = executeStep;
  }, [executeStep]);

  // Control methods
  const play = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsPaused(false);
      onSequenceStart?.();
      executeStep(currentStep);
    }
  }, [isPlaying, currentStep, executeStep, onSequenceStart]);

  const pause = useCallback(() => {
    if (isPlaying && !isPaused) {
      setIsPaused(true);
      controls.stop();
      onSequencePause?.();
    }
  }, [isPlaying, isPaused, controls, onSequencePause]);

  const resume = useCallback(() => {
    if (isPlaying && isPaused) {
      setIsPaused(false);
      onSequenceResume?.();
      executeStep(currentStep);
    }
  }, [isPlaying, isPaused, currentStep, executeStep, onSequenceResume]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsPaused(false);
    setRepeatCount(0);
    setIsReversed(false);
    controls.set(steps[0]?.animate || {});
  }, [controls, steps]);

  const reverse = useCallback(() => {
    setIsReversed(!isReversed);
    if (isPlaying && !isPaused) {
      executeStep(currentStep);
    }
  }, [isReversed, isPlaying, isPaused, currentStep, executeStep]);

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < steps.length) {
        setCurrentStep(index);
        if (isPlaying && !isPaused) {
          executeStep(index);
        }
      }
    },
    [steps.length, isPlaying, isPaused, executeStep]
  );

  // Expose controls
  useEffect(() => {
    if (controlRef) {
      controlRef.current = {
        play,
        pause,
        resume,
        reset,
        reverse,
        goToStep,
        getCurrentStep: () => currentStep,
        getTotalSteps: () => steps.length,
      };
    }
  }, [controlRef, play, pause, resume, reset, reverse, goToStep, currentStep, steps.length]);

  // Start sequence if autoPlay is enabled
  useEffect(() => {
    if (config.autoPlay && !isPlaying) {
      play();
    }
  }, [config.autoPlay, isPlaying, play]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        globalThis.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className={className}
      style={style}
      animate={controls}
      initial={steps[0]?.animate || {}}
    >
      {children}
    </motion.div>
  );
};

/**
 * Creates an animation sequence configuration from arrays of properties
 */
export function createAnimationSequence(
  animations: TargetAndTransition[],
  options: {
    duration?: number | number[];
    delay?: number | number[];
    ease?: string | number[] | (string | number[])[];
    callbacks?: {
      onStart?: () => void;
      onComplete?: () => void;
    }[];
  } = {}
): AnimationSequenceConfig {
  const { duration = 0.5, delay = 0, ease = "easeInOut", callbacks = [] } = options;

  const steps: AnimationStep[] = animations.map((animate, index) => ({
    animate,
    duration: Array.isArray(duration) ? duration[index] || 0.5 : duration,
    delay: Array.isArray(delay) ? delay[index] || 0 : delay,
    ease: Array.isArray(ease) 
      ? (ease[index] || "easeInOut") as string | number[]
      : ease as string | number[],
    onStart: callbacks[index]?.onStart,
    onComplete: callbacks[index]?.onComplete,
  }));

  return { steps };
}

/**
 * Creates a complex animation sequence with parallel animations
 */
export function createComplexSequence(
  sequences: {
    target: string;
    steps: AnimationStep[];
  }[],
  options: {
    stagger?: number;
    syncPoints?: number[];
  } = {}
): AnimationStep[] {
  const { stagger = 0, syncPoints = [] } = options;
  const complexSteps: AnimationStep[] = [];

  // Calculate the total duration of each sequence
  const sequenceDurations = sequences.map((seq) =>
    seq.steps.reduce((total, step) => total + (step.duration || 0.5) + (step.delay || 0), 0)
  );

  const maxDuration = Math.max(...sequenceDurations);

  // Create a timeline
  for (const [seqIndex, sequence] of sequences.entries()) {
    let currentTime = seqIndex * stagger;

    for (const [stepIndex, step] of sequence.steps.entries()) {
      // Check if this step should sync with others
      const syncPoint = syncPoints.find((sp) => sp === stepIndex);
      if (syncPoint !== undefined) {
        // Align timing at sync points
        currentTime = syncPoint * (maxDuration / Math.max(...syncPoints));
      }

      complexSteps.push({
        ...step,
        delay: currentTime,
        animate: step.animate,
      });

      currentTime += (step.duration || 0.5) + (step.delay || 0);
    }
  }

  return complexSteps;
}

/**
 * Hook for creating dynamic animation sequences
 */
export function useAnimationSequence(config: AnimationSequenceConfig) {
  const controlRef = useRef<AnimationSequenceControls | null>(null);
  const [status, setStatus] = useState<"idle" | "playing" | "paused" | "complete">("idle");

  const enhancedConfig: AnimationSequenceConfig = {
    ...config,
    onSequenceStart: () => {
      setStatus("playing");
      config.onSequenceStart?.();
    },
    onSequenceComplete: () => {
      setStatus("complete");
      config.onSequenceComplete?.();
    },
    onSequencePause: () => {
      setStatus("paused");
      config.onSequencePause?.();
    },
    onSequenceResume: () => {
      setStatus("playing");
      config.onSequenceResume?.();
    },
  };

  return {
    controlRef,
    status,
    config: enhancedConfig,
    controls: controlRef.current,
  };
}
