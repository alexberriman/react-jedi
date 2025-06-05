import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { Center } from "./center";

const meta = {
  title: "Layout Components/Center",
  component: Center,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["div", "section", "main", "article"],
      description: "The element to render as",
    },
    fullHeight: {
      control: "boolean",
      description: "Makes the container take full viewport height",
    },
    fullWidth: {
      control: "boolean",
      description: "Makes the container take full width",
    },
    centerDirection: {
      control: { type: "select" },
      options: ["horizontal", "vertical", "both"],
      description: "The direction to center content",
    },
  },
} satisfies Meta<typeof Center>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-2">Centered Content</h2>
        <p>This content is perfectly centered in its container</p>
      </div>
    ),
    className: "min-h-[400px] bg-gray-50 rounded-lg",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test center container - look for the component by its classes
    const center =
      canvasElement.querySelector(".flex.items-center.justify-center") ||
      canvasElement.querySelector(String.raw`.min-h-\[400px\]`);
    expect(center).toBeTruthy();
    expect(center).toHaveClass("min-h-[400px]", "bg-gray-50", "rounded-lg");

    // Test centered content
    expect(canvas.getByText("Centered Content")).toBeInTheDocument();
    expect(
      canvas.getByText("This content is perfectly centered in its container")
    ).toBeInTheDocument();

    // Test default centering (both directions) - check for classes instead of styles
    expect(center).toHaveClass("flex");
    expect(center).toHaveClass("items-center");
    expect(center).toHaveClass("justify-center");
  },
};

export const FullHeightCenter: Story = {
  args: {
    fullHeight: true,
    children: (
      <div className="max-w-lg">
        <div className="p-8 bg-white rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Full Page Center
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            This content is centered in the full viewport height, perfect for hero sections or
            loading states.
          </p>
          <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
            Get Started
          </button>
        </div>
      </div>
    ),
    className: "bg-gradient-to-br from-gray-50 to-gray-100",
  },
};

export const HorizontalOnly: Story = {
  args: {
    centerDirection: "horizontal",
    children: (
      <div className="w-64 p-4 bg-blue-500 text-white rounded-lg text-center">
        <p>Only horizontally centered</p>
      </div>
    ),
    className: "min-h-[200px] bg-gray-100 rounded-lg relative",
  },
};

export const VerticalOnly: Story = {
  args: {
    centerDirection: "vertical",
    children: (
      <div className="w-64 p-4 bg-green-500 text-white rounded-lg text-center">
        <p>Only vertically centered</p>
      </div>
    ),
    className: "min-h-[200px] bg-gray-100 rounded-lg relative",
  },
};

export const WithMultipleElements: Story = {
  args: {
    children: (
      <div className="flex flex-col items-center gap-6">
        <img
          src="https://placehold.co/100x100/EEE/31343C"
          alt="Placeholder"
          className="w-24 h-24 rounded-full"
        />
        <h3 className="text-2xl font-bold">Welcome Back!</h3>
        <p className="text-gray-600 text-center max-w-sm">
          Center multiple elements with perfect alignment
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Login
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    ),
    className: "min-h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg",
  },
};

export const LoadingState: Story = {
  args: {
    fullHeight: true,
    children: (
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 animate-pulse">Loading amazing content...</p>
      </div>
    ),
  },
};

export const ResponsiveCenter: Story = {
  args: {
    children: (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-blue-500 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Feature One</h3>
            <p className="text-gray-600">Responsive centered grid content</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-green-500 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Feature Two</h3>
            <p className="text-gray-600">Works great at all screen sizes</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Feature Three</h3>
            <p className="text-gray-600">Perfect for modern layouts</p>
          </div>
        </div>
      </div>
    ),
    className: "min-h-[600px] bg-gray-50",
  },
};

export const AsMain: Story = {
  args: {
    as: "main",
    fullHeight: true,
    children: (
      <article className="max-w-prose">
        <h1 className="text-5xl font-bold mb-6">Using Center as Main Element</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          The Center component can be rendered as any semantic HTML element. This example uses it as
          a main element, which is perfect for page content.
        </p>
      </article>
    ),
    className: "px-6",
  },
};
