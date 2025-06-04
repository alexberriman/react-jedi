import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AnimationProvider, useAnimation } from "./animation-provider";
import {
  useAnimationVariants,
  useStaggerAnimation,
  useHoverAnimation,
  useHoverPreset,
  useFocusAnimation,
  type HoverPreset,
} from "./animation-hooks";
import { motion } from "framer-motion";

const meta: Meta<typeof AnimationProvider> = {
  title: "Animation/AnimationProvider",
  component: AnimationProvider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modern animation system providing cutting-edge motion design capabilities for React components.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "600px", padding: "40px" }}>
        <Story />
      </div>
    ),
  ],

  tags: ['autodocs', 'animation-animation-provider']};

export default meta;
type Story = StoryObj<typeof AnimationProvider>;

type AnimationVariant =
  | "fadeIn"
  | "fadeOut"
  | "slideIn"
  | "slideOut"
  | "scaleIn"
  | "scaleOut"
  | "rotateIn"
  | "rotateOut";
type AnimationDirection = "up" | "down" | "left" | "right";
type ScaleDirection = "uniform" | "horizontal" | "vertical";

type RotationDirection = "clockwise" | "counterclockwise" | "full" | "halfTurn";

const AnimatedBox: React.FC<{
  children: React.ReactNode;
  variant?: AnimationVariant;
  direction?: AnimationDirection;
  scaleDirection?: ScaleDirection;
  rotationDirection?: RotationDirection;
}> = ({
  children,
  variant = "fadeIn",
  direction = "up",
  scaleDirection = "uniform",
  rotationDirection = "clockwise",
}) => {
  const animationProps = useAnimationVariants({
    variant,
    direction,
    scaleDirection,
    rotationDirection,
  });

  return (
    <motion.div
      {...animationProps}
      style={{
        padding: "24px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "16px",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}
    >
      {children}
    </motion.div>
  );
};

const StaggeredList: React.FC = () => {
  const staggerProps = useStaggerAnimation(0.1);
  const itemProps = useAnimationVariants({ variant: "slideIn", direction: "right" });

  const items = ["First Item", "Second Item", "Third Item", "Fourth Item"];

  return (
    <motion.div {...staggerProps} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          {...itemProps}
          style={{
            padding: "16px",
            background: "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
            borderRadius: "12px",
            color: "white",
            fontWeight: "500",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
};

const HoverBox: React.FC = () => {
  const hoverProps = useHoverAnimation(1.1);

  return (
    <motion.div
      {...hoverProps}
      style={{
        padding: "32px",
        background: "linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
        borderRadius: "20px",
        color: "white",
        fontWeight: "bold",
        fontSize: "20px",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
      }}
    >
      Hover & Click Me! 🚀
    </motion.div>
  );
};

const FocusableInput: React.FC = () => {
  const focusProps = useFocusAnimation();

  return (
    <motion.input
      {...focusProps}
      type="text"
      placeholder="Click to focus..."
      style={{
        padding: "16px 24px",
        fontSize: "16px",
        borderRadius: "12px",
        border: "2px solid #e5e7eb",
        outline: "none",
        width: "100%",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#6366f1";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#e5e7eb";
      }}
    />
  );
};

export const FadeInAnimation: Story = {
  render: () => (
    <AnimationProvider>
      <AnimatedBox variant="fadeIn">Fade In Animation ✨</AnimatedBox>
    </AnimationProvider>
  ),
};

export const SlideInAnimations: Story = {
  render: () => (
    <AnimationProvider>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(2, 1fr)" }}>
        <AnimatedBox variant="slideIn" direction="up">
          Slide Up
        </AnimatedBox>
        <AnimatedBox variant="slideIn" direction="down">
          Slide Down
        </AnimatedBox>
        <AnimatedBox variant="slideIn" direction="left">
          Slide Left
        </AnimatedBox>
        <AnimatedBox variant="slideIn" direction="right">
          Slide Right
        </AnimatedBox>
      </div>
    </AnimationProvider>
  ),
};

export const ScaleInAnimations: Story = {
  render: () => (
    <AnimationProvider>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <AnimatedBox variant="scaleIn" scaleDirection="uniform">
          Scale In Uniform 🎯
        </AnimatedBox>
        <AnimatedBox variant="scaleIn" scaleDirection="horizontal">
          Scale In Horizontal ↔️
        </AnimatedBox>
        <AnimatedBox variant="scaleIn" scaleDirection="vertical">
          Scale In Vertical ↕️
        </AnimatedBox>
      </div>
    </AnimationProvider>
  ),
};

export const ScaleOutAnimations: Story = {
  render: () => (
    <AnimationProvider>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <AnimatedBox variant="scaleOut" scaleDirection="uniform">
          Scale Out Uniform 🎯
        </AnimatedBox>
        <AnimatedBox variant="scaleOut" scaleDirection="horizontal">
          Scale Out Horizontal ↔️
        </AnimatedBox>
        <AnimatedBox variant="scaleOut" scaleDirection="vertical">
          Scale Out Vertical ↕️
        </AnimatedBox>
      </div>
    </AnimationProvider>
  ),
};

export const RotateInAnimations: Story = {
  render: () => (
    <AnimationProvider>
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
        }}
      >
        <AnimatedBox variant="rotateIn" rotationDirection="clockwise">
          Rotate In Clockwise 🌀
        </AnimatedBox>
        <AnimatedBox variant="rotateIn" rotationDirection="counterclockwise">
          Rotate In Counter 🔄
        </AnimatedBox>
        <AnimatedBox variant="rotateIn" rotationDirection="full">
          Rotate In Full 360° 🎡
        </AnimatedBox>
        <AnimatedBox variant="rotateIn" rotationDirection="halfTurn">
          Rotate In Half Turn 🔁
        </AnimatedBox>
      </div>
    </AnimationProvider>
  ),
};

export const RotateOutAnimations: Story = {
  render: () => (
    <AnimationProvider>
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
        }}
      >
        <AnimatedBox variant="rotateOut" rotationDirection="clockwise">
          Rotate Out Clockwise 🌀
        </AnimatedBox>
        <AnimatedBox variant="rotateOut" rotationDirection="counterclockwise">
          Rotate Out Counter 🔄
        </AnimatedBox>
        <AnimatedBox variant="rotateOut" rotationDirection="full">
          Rotate Out Full 360° 🎡
        </AnimatedBox>
        <AnimatedBox variant="rotateOut" rotationDirection="halfTurn">
          Rotate Out Half Turn 🔁
        </AnimatedBox>
      </div>
    </AnimationProvider>
  ),
};

export const StaggerAnimation: Story = {
  render: () => (
    <AnimationProvider>
      <StaggeredList />
    </AnimationProvider>
  ),
};

const HoverPresetBox: React.FC<{ preset: HoverPreset; children: React.ReactNode }> = ({
  preset,
  children,
}) => {
  const hoverProps = useHoverPreset(preset);

  return (
    <motion.div
      {...hoverProps}
      style={{
        padding: "24px",
        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        borderRadius: "16px",
        color: "white",
        fontWeight: "600",
        fontSize: "16px",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </motion.div>
  );
};

const CustomHoverBox: React.FC = () => {
  const hoverProps = useHoverAnimation({
    scale: 1.1,
    rotate: 3,
    brightness: 1.1,
    translateY: -8,
    shadow: "0 20px 40px rgba(99, 102, 241, 0.3)",
    borderColor: "#8b5cf6",
  });

  return (
    <motion.div
      {...hoverProps}
      style={{
        padding: "32px",
        background: "white",
        border: "2px solid #e5e7eb",
        borderRadius: "20px",
        color: "#111827",
        fontWeight: "bold",
        fontSize: "18px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      Custom Hover Effect 🎨
    </motion.div>
  );
};

export const InteractiveAnimations: Story = {
  render: () => (
    <AnimationProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <HoverBox />
        <FocusableInput />
      </div>
    </AnimationProvider>
  ),
};

export const HoverEffectPresets: Story = {
  render: () => (
    <AnimationProvider>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <HoverPresetBox preset="lift">Lift Effect ⬆️</HoverPresetBox>
        <HoverPresetBox preset="glow">Glow Effect ✨</HoverPresetBox>
        <HoverPresetBox preset="subtle">Subtle Effect 🌟</HoverPresetBox>
        <HoverPresetBox preset="bounce">Bounce Effect 🎪</HoverPresetBox>
        <HoverPresetBox preset="press">Press Effect 👇</HoverPresetBox>
        <HoverPresetBox preset="shine">Shine Effect 💫</HoverPresetBox>
        <HoverPresetBox preset="depth">Depth Effect 🎯</HoverPresetBox>
        <HoverPresetBox preset="float">Float Effect 🎈</HoverPresetBox>
        <CustomHoverBox />
      </div>
    </AnimationProvider>
  ),
};

const EnhancedFocusInput: React.FC = () => {
  const focusProps = useFocusAnimation({
    scale: 1.02,
    boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.3)",
    borderColor: "#6366f1",
    backgroundColor: "#f0f1ff",
  });

  return (
    <motion.input
      {...focusProps}
      type="text"
      placeholder="Enhanced focus effect..."
      style={{
        padding: "16px 24px",
        fontSize: "16px",
        borderRadius: "12px",
        border: "2px solid #e5e7eb",
        outline: "none",
        width: "100%",
        transition: "border-color 0.2s, background-color 0.2s",
      }}
    />
  );
};

export const CustomConfiguration: Story = {
  render: () => (
    <AnimationProvider
      config={{
        duration: {
          fast: 0.1,
          normal: 0.2,
          slow: 0.4,
        },
        transition: {
          type: "tween",
        },
      }}
    >
      <AnimatedBox variant="fadeIn">Custom Duration (Fast) ⚡</AnimatedBox>
    </AnimationProvider>
  ),
};

export const ReducedMotion: Story = {
  render: () => (
    <AnimationProvider reducedMotion={true}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <AnimatedBox variant="slideIn">Reduced Motion Mode (No Animation) ♿</AnimatedBox>
        <p style={{ color: "#6b7280", fontSize: "14px", textAlign: "center" }}>
          All animations are disabled when reduced motion is enabled
        </p>
      </div>
    </AnimationProvider>
  ),
};

const ConfigDisplay: React.FC = () => {
  const config = useAnimation();

  return (
    <div
      style={{
        padding: "24px",
        background: "#f9fafb",
        borderRadius: "12px",
        fontFamily: "monospace",
        fontSize: "14px",
      }}
    >
      <h3
        style={{ marginTop: 0, marginBottom: "16px", color: "#111827", fontFamily: "sans-serif" }}
      >
        Current Animation Configuration
      </h3>
      <pre style={{ margin: 0, color: "#6b7280" }}>{JSON.stringify(config, null, 2)}</pre>
    </div>
  );
};

const AnimationShowcase: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = React.useState<AnimationVariant>("scaleIn");
  const [selectedDirection, setSelectedDirection] = React.useState<AnimationDirection>("up");
  const [selectedScaleDirection, setSelectedScaleDirection] =
    React.useState<ScaleDirection>("uniform");
  const [selectedRotationDirection, setSelectedRotationDirection] =
    React.useState<RotationDirection>("clockwise");
  const [key, setKey] = React.useState(0);

  const animationProps = useAnimationVariants({
    variant: selectedVariant,
    direction: selectedDirection,
    scaleDirection: selectedScaleDirection,
    rotationDirection: selectedRotationDirection,
  });

  const resetAnimation = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div>
          <label
            htmlFor="animation-variant"
            style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
          >
            Animation Variant
          </label>
          <select
            id="animation-variant"
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value as AnimationVariant)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "14px",
            }}
          >
            <option value="fadeIn">Fade In</option>
            <option value="fadeOut">Fade Out</option>
            <option value="slideIn">Slide In</option>
            <option value="slideOut">Slide Out</option>
            <option value="scaleIn">Scale In</option>
            <option value="scaleOut">Scale Out</option>
            <option value="rotateIn">Rotate In</option>
            <option value="rotateOut">Rotate Out</option>
          </select>
        </div>
        {selectedVariant.includes("slide") && (
          <div>
            <label
              htmlFor="animation-direction"
              style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
            >
              Direction
            </label>
            <select
              id="animation-direction"
              value={selectedDirection}
              onChange={(e) => setSelectedDirection(e.target.value as AnimationDirection)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "14px",
              }}
            >
              <option value="up">Up</option>
              <option value="down">Down</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        )}
        {selectedVariant.includes("scale") && (
          <div>
            <label
              htmlFor="scale-direction"
              style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
            >
              Scale Direction
            </label>
            <select
              id="scale-direction"
              value={selectedScaleDirection}
              onChange={(e) => setSelectedScaleDirection(e.target.value as ScaleDirection)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "14px",
              }}
            >
              <option value="uniform">Uniform</option>
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>
        )}
        {selectedVariant.includes("rotate") && (
          <div>
            <label
              htmlFor="rotation-direction"
              style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
            >
              Rotation Direction
            </label>
            <select
              id="rotation-direction"
              value={selectedRotationDirection}
              onChange={(e) => setSelectedRotationDirection(e.target.value as RotationDirection)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "14px",
              }}
            >
              <option value="clockwise">Clockwise</option>
              <option value="counterclockwise">Counter-clockwise</option>
              <option value="full">Full 360°</option>
              <option value="halfTurn">Half Turn</option>
            </select>
          </div>
        )}
        <button
          onClick={resetAnimation}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#6366f1",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            alignSelf: "flex-end",
          }}
        >
          Replay Animation
        </button>
      </div>
      <motion.div
        key={key}
        {...animationProps}
        style={{
          padding: "48px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "20px",
          color: "white",
          fontWeight: "bold",
          fontSize: "24px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        {selectedVariant} Animation
      </motion.div>
    </div>
  );
};

export const ConfigurationDisplay: Story = {
  render: () => (
    <AnimationProvider>
      <ConfigDisplay />
    </AnimationProvider>
  ),
};

export const InteractiveShowcase: Story = {
  render: () => (
    <AnimationProvider>
      <AnimationShowcase />
    </AnimationProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "An interactive showcase allowing you to test all animation variants with different configurations.",
      },
    },
  },
};

const FocusButtons: React.FC = () => {
  const successFocusProps = useFocusAnimation({
    scale: 1.05,
    boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.3)",
    backgroundColor: "#ecfdf5",
  });

  const dangerFocusProps = useFocusAnimation({
    scale: 1.05,
    boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.3)",
    backgroundColor: "#fef2f2",
  });

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <motion.button
        {...successFocusProps}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #10b981",
          background: "white",
          color: "#10b981",
          fontWeight: "600",
          cursor: "pointer",
          outline: "none",
        }}
      >
        Success Button
      </motion.button>
      <motion.button
        {...dangerFocusProps}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #ef4444",
          background: "white",
          color: "#ef4444",
          fontWeight: "600",
          cursor: "pointer",
          outline: "none",
        }}
      >
        Danger Button
      </motion.button>
    </div>
  );
};

export const FocusEffects: Story = {
  render: () => (
    <AnimationProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <FocusableInput />
        <EnhancedFocusInput />
        <FocusButtons />
      </div>
    </AnimationProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Various focus effects for form controls and interactive elements.",
      },
    },
  },
};
