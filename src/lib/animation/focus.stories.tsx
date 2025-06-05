import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Focus, FocusButton, FocusInput, FocusTextarea, FocusCard, FocusLink } from "./focus";
import { AnimationProvider } from "./animation-provider";

const meta: Meta<typeof Focus> = {
  title: "Animation/Focus",
  component: Focus,
  decorators: [
    (Story) => (
      <AnimationProvider>
        <Story />
      </AnimationProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs", "animation-focus"],
};

export default meta;
type Story = StoryObj<typeof Focus>;

export const Default: Story = {
  args: {
    children: <div className="p-4 bg-gray-100 rounded-lg">Tab to focus on this element</div>,
    preset: "ring",
  },
};

export const AllPresets: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Focus Animation Presets</h3>
      <div className="grid grid-cols-2 gap-4">
        {(
          ["ring", "glow", "highlight", "lift", "underline", "border", "subtle", "intense"] as const
        ).map((preset) => (
          <div key={preset} className="space-y-2">
            <p className="text-sm font-semibold capitalize">{preset}</p>
            <Focus preset={preset}>
              <div className="p-4 bg-white rounded-lg border">Tab to focus (preset: {preset})</div>
            </Focus>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Buttons: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Focus Button Variants</h3>
      <div className="grid grid-cols-2 gap-4">
        {(["primary", "secondary", "ghost", "danger"] as const).map((variant) => (
          <div key={variant} className="space-y-2">
            <FocusButton variant={variant} preset="ring">
              {variant} Button
            </FocusButton>
            <FocusButton variant={variant} preset="glow">
              {variant} Button (Glow)
            </FocusButton>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">Focus Button Sizes</h3>
      <div className="flex items-center gap-4">
        <FocusButton size="sm">Small</FocusButton>
        <FocusButton size="md">Medium</FocusButton>
        <FocusButton size="lg">Large</FocusButton>
      </div>

      <h3 className="text-xl font-bold mb-4">Disabled State</h3>
      <div className="flex items-center gap-4">
        <FocusButton disabled>Disabled Primary</FocusButton>
        <FocusButton variant="secondary" disabled>
          Disabled Secondary
        </FocusButton>
      </div>
    </div>
  ),
};

export const Forms: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Form Elements with Focus Animations</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="input-border" className="block text-sm font-medium mb-1">
            Text Input (Border Preset)
          </label>
          <FocusInput id="input-border" placeholder="Enter your name" preset="border" />
        </div>

        <div>
          <label htmlFor="input-glow" className="block text-sm font-medium mb-1">
            Email Input (Glow Preset)
          </label>
          <FocusInput id="input-glow" type="email" placeholder="Enter your email" preset="glow" />
        </div>

        <div>
          <label htmlFor="input-intense" className="block text-sm font-medium mb-1">
            Password Input (Intense Preset)
          </label>
          <FocusInput
            id="input-intense"
            type="password"
            placeholder="Enter your password"
            preset="intense"
          />
        </div>

        <div>
          <label htmlFor="textarea-lift" className="block text-sm font-medium mb-1">
            Textarea (Lift Preset)
          </label>
          <FocusTextarea
            id="textarea-lift"
            placeholder="Enter your message"
            preset="lift"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="input-disabled" className="block text-sm font-medium mb-1">
            Disabled Input
          </label>
          <FocusInput
            id="input-disabled"
            placeholder="This is disabled"
            disabled
            value="Cannot edit"
          />
        </div>
      </div>
    </div>
  ),
};

export const Cards: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Focus Cards</h3>

      <div className="grid grid-cols-2 gap-4">
        <FocusCard preset="lift">
          <h4 className="font-semibold mb-2">Lift Card</h4>
          <p className="text-gray-600">Tab to focus on this card with lift animation</p>
        </FocusCard>

        <FocusCard preset="glow">
          <h4 className="font-semibold mb-2">Glow Card</h4>
          <p className="text-gray-600">Tab to focus on this card with glow animation</p>
        </FocusCard>

        <FocusCard
          preset="highlight"
          header={<h4 className="font-semibold">Card with Header</h4>}
          footer={<p className="text-sm text-gray-500">Card footer</p>}
        >
          <p className="text-gray-600">This card has header and footer sections</p>
        </FocusCard>

        <FocusCard preset="ring" disabled>
          <h4 className="font-semibold mb-2">Disabled Card</h4>
          <p className="text-gray-600">This card is disabled and won&apos;t receive focus</p>
        </FocusCard>
      </div>
    </div>
  ),
};

export const Links: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Focus Links</h3>

      <div className="space-y-3">
        <div>
          <FocusLink href="#internal" preset="underline">
            Internal link with underline focus
          </FocusLink>
        </div>

        <div>
          <FocusLink href="https://example.com" external preset="glow">
            External link with glow focus
          </FocusLink>
        </div>

        <div>
          <FocusLink href="#another" preset="highlight">
            Highlight focus link
          </FocusLink>
        </div>

        <div>
          <FocusLink href="#disabled" disabled preset="ring">
            Disabled link (cannot focus)
          </FocusLink>
        </div>
      </div>
    </div>
  ),
};

export const CustomAnimations: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Custom Focus Animations</h3>

      <div className="space-y-4">
        <Focus
          animation={{
            scale: 1.1,
            boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.5)",
            outline: "none",
          }}
        >
          <div className="p-4 bg-white rounded-lg border">Custom scale and shadow animation</div>
        </Focus>

        <Focus
          animation={{
            borderColor: "#10b981",
            backgroundColor: "#f0fdf4",
            outline: "none",
          }}
        >
          <div className="p-4 bg-white rounded-lg border">Custom color animation</div>
        </Focus>

        <FocusButton
          animation={{
            scale: 0.95,
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Custom Button Animation
        </FocusButton>
      </div>
    </div>
  ),
};

export const ComplexForm: Story = {
  render: () => (
    <div className="max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-6">Complete Form Example</h3>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <FocusInput placeholder="Full Name" preset="border" className="w-full" />
        </div>

        <div>
          <FocusInput type="email" placeholder="Email Address" preset="glow" className="w-full" />
        </div>

        <div>
          <FocusTextarea
            placeholder="Tell us about yourself"
            preset="lift"
            rows={4}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <FocusButton preset="ring" className="flex-1">
            Submit
          </FocusButton>
          <FocusButton variant="ghost" preset="subtle" className="flex-1">
            Cancel
          </FocusButton>
        </div>
      </form>
    </div>
  ),
};
