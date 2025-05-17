import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { AnimationProvider } from "./animation-provider";
import {
  StateTransition,
  InteractiveStateTransition,
  TransitionSequence,
} from "./state-transition";
import { ComponentState, useStatePreset } from "./state-transitions";
import {
  createFlowPattern,
  createElasticPattern,
  createLoopPattern,
  createMicroPattern,
  createDramaticPattern,
  createProgressivePattern,
} from "./transition-patterns";
import {
  createTween,
  createSpring,
  springPresets,
  durationPresets,
  easingPresets,
} from "./transition-timing";

const meta: Meta<typeof StateTransition> = {
  title: "Animation/State Transitions",
  component: StateTransition,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <AnimationProvider>
        <div className="space-y-8 p-8">
          <Story />
        </div>
      </AnimationProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StateTransition>;

// Button state showcase
export const ButtonStateTransitions: Story = {
  render: function ButtonStateTransitionsStory() {
    const [currentState, setCurrentState] = React.useState<ComponentState>("initial");
    const buttonPreset = useStatePreset("button");

    const states: ComponentState[] = [
      "initial",
      "hover",
      "active",
      "focus",
      "disabled",
      "loading",
      "success",
      "error",
    ];

    return (
      <div className="space-y-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Button State Transitions</h2>
          <p className="text-gray-600 mb-4">
            Click the buttons below to see different state transitions.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {states.map((state) => (
            <button
              key={state}
              className="px-4 py-2 bg-gray-200 rounded-md text-sm"
              onClick={() => setCurrentState(state)}
            >
              {state}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
          <StateTransition
            state={currentState}
            config={buttonPreset}
            className="px-6 py-3 rounded-md font-medium text-white text-center min-w-[200px]"
          >
            {currentState === "loading" ? "Loading..." : `${currentState} State`}
          </StateTransition>
        </div>
      </div>
    );
  },
};

// Interactive component showcase
export const InteractiveComponents: Story = {
  render: function InteractiveComponentsStory() {
    const buttonPreset = useStatePreset("button");
    const cardPreset = useStatePreset("card");
    const inputPreset = useStatePreset("input");
    const togglePreset = useStatePreset("toggle");

    return (
      <div className="space-y-12">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Interactive Components</h2>
          <p className="text-gray-600 mb-4">
            Interact with these components to see state transitions.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Button</h3>
            <InteractiveStateTransition
              config={buttonPreset}
              className="px-6 py-3 rounded-md font-medium text-white text-center"
            >
              Hover and Click Me
            </InteractiveStateTransition>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Card</h3>
            <InteractiveStateTransition
              config={cardPreset}
              className="p-6 rounded-lg shadow-md bg-white w-full max-w-md"
            >
              <h4 className="text-xl font-bold mb-2">Interactive Card</h4>
              <p className="text-gray-600">Hover over this card to see transitions.</p>
            </InteractiveStateTransition>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Input</h3>
            <InteractiveStateTransition
              config={inputPreset}
              className="px-4 py-2 border rounded-md w-full max-w-md"
            >
              <input placeholder="Focus on me..." className="w-full bg-transparent outline-none" />
            </InteractiveStateTransition>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Toggle</h3>
            <div className="flex items-center space-x-4">
              <InteractiveStateTransition
                initialState="initial"
                config={togglePreset}
                className="w-12 h-6 rounded-full flex items-center p-1 cursor-pointer"
                onChange={(state) => console.log(`Toggle state: ${state}`)}
              >
                <div className="w-4 h-4 bg-white rounded-full transform"></div>
              </InteractiveStateTransition>
              <span className="text-sm">Toggle switch</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Transition patterns showcase
export const TransitionPatterns: Story = {
  render: function TransitionPatternsStory() {
    const [activePattern, setActivePattern] = React.useState<string>("flow");

    // Base states for a button
    const baseStates = {
      initial: {
        scale: 1,
        backgroundColor: "#3f51b5",
        color: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      },
      hover: {
        scale: 1.05,
        backgroundColor: "#303f9f",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      },
      active: {
        scale: 0.95,
        backgroundColor: "#1a237e",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      },
    };

    const patterns = {
      flow: createFlowPattern(baseStates),
      elastic: createElasticPattern(baseStates),
      loop: createLoopPattern(baseStates),
      micro: createMicroPattern(baseStates),
      dramatic: createDramaticPattern(baseStates),
      progressive: createProgressivePattern(baseStates),
    };

    return (
      <div className="space-y-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Transition Patterns</h2>
          <p className="text-gray-600 mb-4">
            Different patterns for orchestrating state transitions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {Object.keys(patterns).map((pattern) => (
            <button
              key={pattern}
              className={`px-4 py-2 rounded-md text-sm ${
                activePattern === pattern ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActivePattern(pattern)}
            >
              {pattern}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
          <InteractiveStateTransition
            config={patterns[activePattern as keyof typeof patterns]}
            className="px-6 py-3 rounded-md font-medium text-center cursor-pointer"
          >
            {activePattern.charAt(0).toUpperCase() + activePattern.slice(1)} Pattern
          </InteractiveStateTransition>
        </div>
      </div>
    );
  },
};

// Timing functions showcase
export const TimingFunctions: Story = {
  render: function TimingFunctionsStory() {
    const [currentEasing, setCurrentEasing] = React.useState<keyof typeof easingPresets>("easeOut");
    const [currentDuration, setCurrentDuration] = React.useState<keyof typeof durationPresets>("normal");
    const [currentSpring, setCurrentSpring] = React.useState<keyof typeof springPresets>("default");

    const easingOptions = Object.keys(easingPresets);
    const durationOptions = Object.keys(durationPresets);
    const springOptions = Object.keys(springPresets);

    // Base button state
    const buttonState = {
      initial: {
        x: -150,
        backgroundColor: "#3f51b5",
        color: "white",
      },
      animated: {
        x: 150,
        backgroundColor: "#f50057",
        transition: createTween(currentDuration, currentEasing),
      },
      spring: {
        x: 150,
        backgroundColor: "#ff9800",
        transition: createSpring(currentSpring),
      },
    };

    return (
      <div className="space-y-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Timing Functions</h2>
          <p className="text-gray-600 mb-4">Explore different timing functions and durations.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="easing-select">
              Easing Function:
            </label>
            <select
              id="easing-select"
              className="w-full px-3 py-2 border rounded-md"
              value={currentEasing}
              onChange={(e) => setCurrentEasing(e.target.value as keyof typeof easingPresets)}
            >
              {easingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="duration-select">
              Duration:
            </label>
            <select
              id="duration-select"
              className="w-full px-3 py-2 border rounded-md"
              value={currentDuration}
              onChange={(e) => setCurrentDuration(e.target.value as keyof typeof durationPresets)}
            >
              {durationOptions.map((option) => (
                <option key={option} value={option}>
                  {option} ({durationPresets[option as keyof typeof durationPresets]}s)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="spring-select">
              Spring Preset:
            </label>
            <select
              id="spring-select"
              className="w-full px-3 py-2 border rounded-md"
              value={currentSpring}
              onChange={(e) => setCurrentSpring(e.target.value)}
            >
              {springOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center">
            <button
              className="absolute px-4 py-2 rounded-md text-sm mb-2"
              onClick={() => {
                const stateElement = document.querySelector("#tween-state") as HTMLElement;
                if (stateElement) {
                  const newState =
                    stateElement.dataset.state === "initial" ? "animated" : "initial";
                  stateElement.dataset.state = newState;
                }
              }}
            >
              Animate Tween
            </button>

            <StateTransition
              state="initial"
              config={{ states: buttonState, initialState: "initial" }}
              className="absolute px-6 py-3 rounded-md font-medium text-center"
            >
              Tween: {currentEasing}
            </StateTransition>
          </div>

          <div className="relative h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center">
            <button
              className="absolute px-4 py-2 rounded-md text-sm mb-2"
              onClick={() => {
                const stateElement = document.querySelector("#spring-state") as HTMLElement;
                if (stateElement) {
                  const newState = stateElement.dataset.state === "initial" ? "spring" : "initial";
                  stateElement.dataset.state = newState;
                }
              }}
            >
              Animate Spring
            </button>

            <StateTransition
              state="initial"
              config={{ states: buttonState, initialState: "initial" }}
              className="absolute px-6 py-3 rounded-md font-medium text-center"
            >
              Spring: {currentSpring}
            </StateTransition>
          </div>
        </div>
      </div>
    );
  },
};

// Transition sequence showcase
export const SequentialTransitions: Story = {
  render: function SequentialTransitionsStory() {
    const [isPlaying, setIsPlaying] = React.useState(false);

    // Define states for a sequential transition
    const loadingStates = {
      initial: {
        opacity: 1,
        scale: 1,
        backgroundColor: "#3f51b5",
        color: "white",
      },
      loading: {
        opacity: 0.7,
        scale: 0.98,
        backgroundColor: "#3949ab",
        transition: { duration: 0.3, ease: "easeOut" },
      },
      processing: {
        opacity: 0.8,
        scale: 1,
        backgroundColor: "#5c6bc0",
        transition: { duration: 0.4, ease: "easeInOut" },
      },
      validating: {
        opacity: 0.9,
        scale: 1.02,
        backgroundColor: "#7986cb",
        transition: { duration: 0.3, ease: "easeInOut" },
      },
      success: {
        opacity: 1,
        scale: 1.05,
        backgroundColor: "#4caf50",
        transition: { duration: 0.5, ease: "easeOut" },
      },
    };

    return (
      <div className="space-y-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Sequential Transitions</h2>
          <p className="text-gray-600 mb-4">
            Transitions that flow through multiple states in sequence.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "Reset Sequence" : "Play Sequence"}
          </button>
        </div>

        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
          {isPlaying ? (
            <TransitionSequence
              states={["initial", "loading", "processing", "validating", "success"]}
              config={{ states: loadingStates, initialState: "initial" }}
              durationPerState={1}
              loop={false}
              className="px-6 py-3 rounded-md font-medium text-center min-w-[200px]"
            >
              Processing...
            </TransitionSequence>
          ) : (
            <StateTransition
              state="initial"
              config={{ states: loadingStates, initialState: "initial" }}
              className="px-6 py-3 rounded-md font-medium text-center min-w-[200px]"
            >
              Click to Start
            </StateTransition>
          )}
        </div>
      </div>
    );
  },
};
