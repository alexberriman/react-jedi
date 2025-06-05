import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ScrollReveal,
  ScrollParallax,
  ScrollProgress,
  ScrollContainer,
  ScrollScale,
  ScrollTextReveal,
} from "./scroll";
import { AnimationProvider } from "./animation-provider";
import { scrollPresets } from "./scroll-hooks";

const meta: Meta<typeof ScrollReveal> = {
  title: "Animation/Scroll",
  component: ScrollReveal,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <AnimationProvider>
        <div style={{ minHeight: "200vh", padding: "2rem" }}>
          <Story />
        </div>
      </AnimationProvider>
    ),
  ],

  tags: ["autodocs", "animation-scroll"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicReveal: Story = {
  render: () => (
    <div className="space-y-32 max-w-4xl mx-auto">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Scroll Down to See Animations</h1>
      </div>

      <ScrollReveal animation="fadeIn">
        <div className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Fade In Animation</h2>
          <p>This content fades in when scrolled into view.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="slideUp">
        <div className="p-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Slide Up Animation</h2>
          <p>This content slides up when scrolled into view.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="scaleIn">
        <div className="p-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Scale In Animation</h2>
          <p>This content scales in when scrolled into view.</p>
        </div>
      </ScrollReveal>
    </div>
  ),
};

export const AllPresets: Story = {
  render: () => (
    <div className="space-y-24 max-w-4xl mx-auto">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Scroll Animation Presets</h1>
      </div>

      {Object.keys(scrollPresets).map((preset) => (
        <ScrollReveal key={preset} animation={preset as keyof typeof scrollPresets}>
          <div className="p-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4 capitalize">{preset} Animation</h2>
            <p>This demonstrates the {preset} scroll animation preset.</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  ),
};

export const ParallaxEffect: Story = {
  render: () => (
    <div className="relative">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Parallax Scroll Effect</h1>
      </div>

      <div className="relative h-screen">
        <ScrollParallax speed={0.5}>
          <div className="absolute top-0 left-10 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
        </ScrollParallax>

        <ScrollParallax speed={-0.3}>
          <div className="absolute top-32 right-10 w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full" />
        </ScrollParallax>

        <ScrollParallax speed={0.8}>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl" />
        </ScrollParallax>
      </div>

      <div className="h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900">Elements move at different speeds</h2>
      </div>
    </div>
  ),
};

export const ProgressIndicator: Story = {
  render: () => (
    <>
      <ScrollProgress color="#7c3aed" thickness={4} position="top" />

      <div className="space-y-96 max-w-4xl mx-auto py-20">
        <section>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Scroll Progress Indicator</h1>
          <p className="text-lg text-gray-600">
            The purple bar at the top shows your scroll progress through this page.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Section 1</h2>
          <p className="text-lg text-gray-600">Keep scrolling to see the progress bar fill up.</p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Section 2</h2>
          <p className="text-lg text-gray-600">
            You&apos;re making progress! The bar shows how far you&apos;ve scrolled.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Section 3</h2>
          <p className="text-lg text-gray-600">Almost there! Just a bit more to reach the end.</p>
        </section>
      </div>
    </>
  ),
};

export const StaggeredReveal: Story = {
  render: () => (
    <div className="space-y-32 max-w-4xl mx-auto">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Staggered Animations</h1>
      </div>

      <ScrollContainer stagger={0.1} animation="slideUp">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white"
            >
              <h3 className="text-xl font-bold">Item {item}</h3>
              <p>This item appears with a staggered animation effect.</p>
            </div>
          ))}
        </div>
      </ScrollContainer>
    </div>
  ),
};

export const ScaleOnScroll: Story = {
  render: () => (
    <div className="space-y-96 max-w-4xl mx-auto">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Scale on Scroll</h1>
      </div>

      <ScrollScale startScale={0.5} endScale={1.2}>
        <div className="p-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">I Scale as You Scroll</h2>
          <p className="text-lg">This element scales from 0.5x to 1.2x as you scroll past it.</p>
        </div>
      </ScrollScale>

      <div className="h-screen" />
    </div>
  ),
};

export const TextReveal: Story = {
  render: () => (
    <div className="space-y-48 max-w-4xl mx-auto">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Text Reveal Animation</h1>
      </div>

      <ScrollTextReveal
        text="This text reveals word by word as you scroll into view creating a dynamic reading experience"
        className="text-3xl font-bold text-gray-900"
      />

      <ScrollTextReveal
        text="You can use this effect for headlines quotes or any important text that deserves special attention"
        className="text-2xl text-gray-700"
        stagger={0.03}
      />

      <div className="h-screen" />
    </div>
  ),
};

export const CombinedEffects: Story = {
  render: () => (
    <div className="space-y-64 max-w-6xl mx-auto">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Combined Scroll Effects</h1>
      </div>

      <div className="relative">
        <ScrollParallax speed={0.3}>
          <ScrollReveal animation="fadeIn">
            <div className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Parallax + Fade In</h2>
              <p>This combines parallax movement with a fade-in reveal.</p>
            </div>
          </ScrollReveal>
        </ScrollParallax>

        <div className="mt-16">
          <ScrollScale startScale={0.8} endScale={1}>
            <ScrollReveal animation="slideUp" delay={0.2}>
              <div className="p-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg text-white">
                <h2 className="text-2xl font-bold mb-4">Scale + Slide Up</h2>
                <p>This combines scaling with a slide-up reveal animation.</p>
              </div>
            </ScrollReveal>
          </ScrollScale>
        </div>
      </div>

      <div className="h-screen" />
    </div>
  ),
};

export const ResponsiveOptions: Story = {
  render: () => (
    <div className="space-y-32 max-w-4xl mx-auto">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Responsive Scroll Options</h1>
      </div>

      <ScrollReveal animation="slideRight" triggerOnce={false}>
        <div className="p-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Repeating Animation</h2>
          <p>This animation triggers every time you scroll in and out of view.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="slideLeft" threshold={0.5} rootMargin="-100px">
        <div className="p-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Custom Trigger Point</h2>
          <p>This triggers when 50% of the element is visible with a -100px margin.</p>
        </div>
      </ScrollReveal>

      <div className="h-screen" />
    </div>
  ),
};
