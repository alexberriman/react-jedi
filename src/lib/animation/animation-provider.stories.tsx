import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AnimationProvider, useAnimation } from "./animation-provider";
import {
  useAnimationVariants,
  useStaggerAnimation,
  useHoverAnimation,
  useFocusAnimation,
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
};

export default meta;
type Story = StoryObj<typeof AnimationProvider>;

const AnimatedBox: React.FC<{
  children: React.ReactNode;
  variant?: "fadeIn" | "slideIn" | "scaleIn" | "rotateIn";
  direction?: "up" | "down" | "left" | "right";
}> = ({ children, variant = "fadeIn", direction = "up" }) => {
  const animationProps = useAnimationVariants({ variant, direction });

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

export const ScaleAnimation: Story = {
  render: () => (
    <AnimationProvider>
      <AnimatedBox variant="scaleIn">Scale In Animation 🎯</AnimatedBox>
    </AnimationProvider>
  ),
};

export const RotateAnimation: Story = {
  render: () => (
    <AnimationProvider>
      <AnimatedBox variant="rotateIn">Rotate In Animation 🌀</AnimatedBox>
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

export const ConfigurationDisplay: Story = {
  render: () => (
    <AnimationProvider>
      <ConfigDisplay />
    </AnimationProvider>
  ),
};
