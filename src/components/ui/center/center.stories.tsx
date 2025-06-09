import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Center } from "./center";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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

export const Default: Story = enhanceStoryForDualMode<typeof Center>(
  {
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
  },
  {
    renderSpec: {
      type: "Center",
      className: "min-h-[400px] bg-gray-50 rounded-lg",
      children: {
        type: "Box",
        className: "p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white",
        children: [
          {
            type: "Heading",
            level: 2,
            className: "text-2xl font-bold mb-2",
            children: "Centered Content",
          },
          {
            type: "Text",
            children: "This content is perfectly centered in its container",
          },
        ],
      },
    },
  }
);

export const FullHeightCenter: Story = enhanceStoryForDualMode<typeof Center>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test center renders with fullHeight
      const center = canvasElement.querySelector(".flex");
      expect(center).toBeTruthy();
      expect(center).toHaveClass("flex");

      // Test content renders
      expect(canvas.getByText("Full Page Center")).toBeInTheDocument();
      expect(
        canvas.getByText(/This content is centered in the full viewport height/)
      ).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Get Started" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Center",
      fullHeight: true,
      className: "bg-gradient-to-br from-gray-50 to-gray-100",
      children: {
        type: "Box",
        className: "max-w-lg",
        children: {
          type: "Box",
          className: "p-8 bg-white rounded-2xl shadow-2xl",
          children: [
            {
              type: "Heading",
              level: 1,
              className: "text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
              children: "Full Page Center",
            },
            {
              type: "Text",
              className: "text-gray-600 text-lg mb-6",
              children: "This content is centered in the full viewport height, perfect for hero sections or loading states.",
            },
            {
              type: "Button",
              className: "w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow",
              children: "Get Started",
            },
          ],
        },
      },
    },
  }
);

export const HorizontalOnly: Story = enhanceStoryForDualMode<typeof Center>(
  {
    args: {
      centerDirection: "horizontal",
      children: (
        <div className="w-64 p-4 bg-blue-500 text-white rounded-lg text-center">
          <p>Only horizontally centered</p>
        </div>
      ),
      className: "min-h-[200px] bg-gray-100 rounded-lg relative",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test center renders with horizontal centering
      const center = canvasElement.querySelector(".flex");
      expect(center).toBeTruthy();
      expect(center).toHaveClass("justify-center");

      // Test content renders
      expect(canvas.getByText("Only horizontally centered")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Center",
      centerDirection: "horizontal",
      className: "min-h-[200px] bg-gray-100 rounded-lg relative",
      children: {
        type: "Box",
        className: "w-64 p-4 bg-blue-500 text-white rounded-lg text-center",
        children: {
          type: "Text",
          children: "Only horizontally centered",
        },
      },
    },
  }
);

export const VerticalOnly: Story = enhanceStoryForDualMode<typeof Center>(
  {
    args: {
      centerDirection: "vertical",
      children: (
        <div className="w-64 p-4 bg-green-500 text-white rounded-lg text-center">
          <p>Only vertically centered</p>
        </div>
      ),
      className: "min-h-[200px] bg-gray-100 rounded-lg relative",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test center renders with vertical centering
      const center = canvasElement.querySelector(".flex");
      expect(center).toBeTruthy();
      expect(center).toHaveClass("items-center");

      // Test content renders
      expect(canvas.getByText("Only vertically centered")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Center",
      centerDirection: "vertical",
      className: "min-h-[200px] bg-gray-100 rounded-lg relative",
      children: {
        type: "Box",
        className: "w-64 p-4 bg-green-500 text-white rounded-lg text-center",
        children: {
          type: "Text",
          children: "Only vertically centered",
        },
      },
    },
  }
);

export const WithMultipleElements: Story = enhanceStoryForDualMode<typeof Center>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test center container renders
      const center = canvasElement.querySelector(".flex");
      expect(center).toBeTruthy();

      // Test all elements render
      expect(canvas.getByRole("img", { name: "Placeholder" })).toBeInTheDocument();
      expect(canvas.getByText("Welcome Back!")).toBeInTheDocument();
      expect(canvas.getByText("Center multiple elements with perfect alignment")).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Login" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Center",
      className: "min-h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg",
      children: {
        type: "Flex",
        direction: "column",
        align: "center",
        gap: "lg",
        children: [
          {
            type: "Image",
            src: "https://placehold.co/100x100/EEE/31343C",
            alt: "Placeholder",
            className: "w-24 h-24 rounded-full",
          },
          {
            type: "Heading",
            level: 3,
            className: "text-2xl font-bold",
            children: "Welcome Back!",
          },
          {
            type: "Text",
            className: "text-gray-600 text-center max-w-sm",
            children: "Center multiple elements with perfect alignment",
          },
          {
            type: "Flex",
            gap: "md",
            children: [
              {
                type: "Button",
                className: "px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors",
                children: "Login",
              },
              {
                type: "Button",
                variant: "outline",
                className: "px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
                children: "Sign Up",
              },
            ],
          },
        ],
      },
    },
  }
);

export const LoadingState: Story = enhanceStoryForDualMode<typeof Center>(
  {
    args: {
      fullHeight: true,
      children: (
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 animate-pulse">Loading amazing content...</p>
        </div>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test center renders with fullHeight
      const center = canvasElement.querySelector(".flex");
      expect(center).toBeTruthy();

      // Test loading elements render
      const spinner = canvasElement.querySelector(".animate-spin");
      expect(spinner).toBeTruthy();
      expect(spinner).toHaveClass("w-16", "h-16", "rounded-full");

      // Test loading text renders
      expect(canvas.getByText("Loading amazing content...")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Center",
      fullHeight: true,
      children: {
        type: "Flex",
        direction: "column",
        align: "center",
        gap: "md",
        children: [
          {
            type: "Box",
            className: "w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin",
          },
          {
            type: "Text",
            className: "text-gray-600 animate-pulse",
            children: "Loading amazing content...",
          },
        ],
      },
    },
  }
);

export const ResponsiveCenter: Story = enhanceStoryForDualMode<typeof Center>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test center renders
      const center = canvasElement.querySelector(".flex");
      expect(center).toBeTruthy();

      // Test all feature cards render
      expect(canvas.getByText("Feature One")).toBeInTheDocument();
      expect(canvas.getByText("Responsive centered grid content")).toBeInTheDocument();
      expect(canvas.getByText("Feature Two")).toBeInTheDocument();
      expect(canvas.getByText("Works great at all screen sizes")).toBeInTheDocument();
      expect(canvas.getByText("Feature Three")).toBeInTheDocument();
      expect(canvas.getByText("Perfect for modern layouts")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Center",
      className: "min-h-[600px] bg-gray-50",
      children: {
        type: "Box",
        className: "w-full max-w-6xl mx-auto p-6",
        children: {
          type: "Grid",
          columns: { base: 1, md: 3 },
          gap: "lg",
          children: [
            {
              type: "Box",
              className: "p-6 bg-white rounded-lg shadow-lg",
              children: [
                {
                  type: "Box",
                  className: "w-12 h-12 bg-blue-500 rounded-lg mb-4",
                },
                {
                  type: "Heading",
                  level: 3,
                  className: "text-lg font-semibold mb-2",
                  children: "Feature One",
                },
                {
                  type: "Text",
                  className: "text-gray-600",
                  children: "Responsive centered grid content",
                },
              ],
            },
            {
              type: "Box",
              className: "p-6 bg-white rounded-lg shadow-lg",
              children: [
                {
                  type: "Box",
                  className: "w-12 h-12 bg-green-500 rounded-lg mb-4",
                },
                {
                  type: "Heading",
                  level: 3,
                  className: "text-lg font-semibold mb-2",
                  children: "Feature Two",
                },
                {
                  type: "Text",
                  className: "text-gray-600",
                  children: "Works great at all screen sizes",
                },
              ],
            },
            {
              type: "Box",
              className: "p-6 bg-white rounded-lg shadow-lg",
              children: [
                {
                  type: "Box",
                  className: "w-12 h-12 bg-purple-500 rounded-lg mb-4",
                },
                {
                  type: "Heading",
                  level: 3,
                  className: "text-lg font-semibold mb-2",
                  children: "Feature Three",
                },
                {
                  type: "Text",
                  className: "text-gray-600",
                  children: "Perfect for modern layouts",
                },
              ],
            },
          ],
        },
      },
    },
  }
);

export const AsMain: Story = enhanceStoryForDualMode<typeof Center>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test center renders as main element
      const mainElement = canvasElement.querySelector("main");
      expect(mainElement).toBeTruthy();
      expect(mainElement).toHaveClass("flex");

      // Test content renders
      expect(canvas.getByText("Using Center as Main Element")).toBeInTheDocument();
      expect(
        canvas.getByText(/The Center component can be rendered as any semantic HTML element/)
      ).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Center",
      as: "main",
      fullHeight: true,
      className: "px-6",
      children: {
        type: "Box",
        as: "article",
        className: "max-w-prose",
        children: [
          {
            type: "Heading",
            level: 1,
            className: "text-5xl font-bold mb-6",
            children: "Using Center as Main Element",
          },
          {
            type: "Text",
            className: "text-xl text-gray-600 leading-relaxed",
            children: "The Center component can be rendered as any semantic HTML element. This example uses it as a main element, which is perfect for page content.",
          },
        ],
      },
    },
  }
);
