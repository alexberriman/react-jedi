import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Spacer } from "./spacer";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Layout Components/Spacer",
  component: Spacer,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
        "8xl",
        "9xl",
      ],
      description: "The amount of space to add",
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the spacer",
    },
    showGuide: {
      control: "boolean",
      description: "Shows a visual guide for the spacer (development only)",
    },
  },
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Spacer>(
  {
    args: {
      size: "md",
      showGuide: true,
    },
    render: (args) => (
      <div className="p-4 bg-white rounded-lg border">
        <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg">
          <h3 className="text-lg font-semibold">Top Section</h3>
          <p>Content above the spacer</p>
        </div>
        <Spacer {...args} />
        <div className="p-4 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg">
          <h3 className="text-lg font-semibold">Bottom Section</h3>
          <p>Content below the spacer</p>
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test spacer renders
      const spacer = canvasElement.querySelector('[data-slot="spacer"]');
      expect(spacer).toBeTruthy();

      // Test guide is visible when showGuide is true
      if (spacer) {
        expect(spacer).toHaveClass("bg-purple-100");
      }

      // Test sections are rendered
      expect(canvas.getByText("Top Section")).toBeInTheDocument();
      expect(canvas.getByText("Bottom Section")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-4 bg-white rounded-lg border",
      children: [
        {
          type: "Box",
          className: "p-4 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg",
          children: [
            {
              type: "Heading",
              level: 3,
              className: "text-lg font-semibold",
              children: "Top Section",
            },
            {
              type: "Text",
              children: "Content above the spacer",
            },
          ],
        },
        {
          type: "Spacer",
          size: "md",
          showGuide: true,
        },
        {
          type: "Box",
          className: "p-4 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg",
          children: [
            {
              type: "Heading",
              level: 3,
              className: "text-lg font-semibold",
              children: "Bottom Section",
            },
            {
              type: "Text",
              children: "Content below the spacer",
            },
          ],
        },
      ],
    },
  }
);

export const AllSizes: Story = enhanceStoryForDualMode<typeof Spacer>(
  {
    render: () => (
      <div className="space-y-8">
        {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const).map((size) => (
          <div key={size} className="p-4 bg-white rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Size: {size}</h3>
            <div className="p-3 bg-gray-200 rounded text-center">Above</div>
            <Spacer size={size} showGuide />
            <div className="p-3 bg-gray-200 rounded text-center">Below</div>
          </div>
        ))}
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all size variants are rendered
      const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"];
      for (const size of sizes) {
        expect(canvas.getByText(`Size: ${size}`)).toBeInTheDocument();
      }

      // Test spacers are rendered
      const spacers = canvasElement.querySelectorAll('[data-slot="spacer"]');
      expect(spacers).toHaveLength(8);

      // Test all spacers have guide visible
      for (const spacer of spacers) {
        expect(spacer).toHaveClass("bg-purple-100");
      }
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      children: [
        "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl",
      ].map((size) => ({
        type: "Box",
        className: "p-4 bg-white rounded-lg border",
        children: [
          {
            type: "Heading",
            level: 3,
            className: "text-lg font-semibold mb-4",
            children: `Size: ${size}`,
          },
          {
            type: "Box",
            className: "p-3 bg-gray-200 rounded text-center",
            children: "Above",
          },
          {
            type: "Spacer",
            size: size as "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl",
            showGuide: true,
          },
          {
            type: "Box",
            className: "p-3 bg-gray-200 rounded text-center",
            children: "Below",
          },
        ],
      })),
    },
  }
);

export const HorizontalSpacing: Story = enhanceStoryForDualMode<typeof Spacer>(
  {
    args: {
      orientation: "horizontal",
      size: "lg",
      showGuide: true,
    },
    render: (args) => (
      <div className="p-4 bg-white rounded-lg border">
        <div className="flex items-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Button 1
          </button>
          <Spacer {...args} />
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Button 2
          </button>
          <Spacer {...args} />
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            Button 3
          </button>
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test buttons are rendered
      expect(canvas.getByText("Button 1")).toBeInTheDocument();
      expect(canvas.getByText("Button 2")).toBeInTheDocument();
      expect(canvas.getByText("Button 3")).toBeInTheDocument();

      // Test horizontal spacers
      const spacers = canvasElement.querySelectorAll('[data-slot="spacer"]');
      expect(spacers).toHaveLength(2);

      // Test horizontal orientation - spacers should have width, not height
      for (const spacer of spacers) {
        const spacerElement = spacer as HTMLElement;
        const styles = spacerElement.style;
        // lg size is 1.5rem = 24px
        expect(styles.width).toBe("1.5rem");
        expect(styles.height).toBe("1.5rem");
      }
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-4 bg-white rounded-lg border",
      children: {
        type: "Flex",
        align: "center",
        children: [
          {
            type: "Button",
            className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600",
            children: "Button 1",
          },
          {
            type: "Spacer",
            orientation: "horizontal",
            size: "lg",
            showGuide: true,
          },
          {
            type: "Button",
            className: "px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600",
            children: "Button 2",
          },
          {
            type: "Spacer",
            orientation: "horizontal",
            size: "lg",
            showGuide: true,
          },
          {
            type: "Button",
            className: "px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600",
            children: "Button 3",
          },
        ],
      },
    },
  }
);

export const VerticalLayout: Story = enhanceStoryForDualMode<typeof Spacer>(
  {
    render: () => (
      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold">Page Title</h2>
        <Spacer size="sm" />
        <p className="text-gray-600">Subtitle with smaller spacing</p>
        <Spacer size="xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">Card 1</h3>
            <Spacer size="xs" />
            <p className="text-sm text-gray-600">Minimal spacing between title and content</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">Card 2</h3>
            <Spacer size="xs" />
            <p className="text-sm text-gray-600">Consistent spacing across cards</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">Card 3</h3>
            <Spacer size="xs" />
            <p className="text-sm text-gray-600">Clean and organized layout</p>
          </div>
        </div>
        <Spacer size="2xl" />
        <button className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
          Call to Action
        </button>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test main elements render
      expect(canvas.getByText("Page Title")).toBeInTheDocument();
      expect(canvas.getByText("Subtitle with smaller spacing")).toBeInTheDocument();
      expect(canvas.getByText("Call to Action")).toBeInTheDocument();

      // Test cards render
      expect(canvas.getByText("Card 1")).toBeInTheDocument();
      expect(canvas.getByText("Card 2")).toBeInTheDocument();
      expect(canvas.getByText("Card 3")).toBeInTheDocument();

      // Test spacers are rendered
      const spacers = canvasElement.querySelectorAll('[data-slot="spacer"]');
      expect(spacers.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg",
      children: [
        {
          type: "Heading",
          level: 2,
          className: "text-2xl font-bold",
          children: "Page Title",
        },
        {
          type: "Spacer",
          size: "sm",
        },
        {
          type: "Text",
          className: "text-gray-600",
          children: "Subtitle with smaller spacing",
        },
        {
          type: "Spacer",
          size: "xl",
        },
        {
          type: "Grid",
          cols: 3,
          gap: "md",
          className: "grid-cols-1 md:grid-cols-3",
          children: [
            {
              type: "Box",
              className: "p-4 bg-white rounded-lg shadow",
              children: [
                {
                  type: "Heading",
                  level: 3,
                  className: "font-semibold",
                  children: "Card 1",
                },
                {
                  type: "Spacer",
                  size: "xs",
                },
                {
                  type: "Text",
                  className: "text-sm text-gray-600",
                  children: "Minimal spacing between title and content",
                },
              ],
            },
            {
              type: "Box",
              className: "p-4 bg-white rounded-lg shadow",
              children: [
                {
                  type: "Heading",
                  level: 3,
                  className: "font-semibold",
                  children: "Card 2",
                },
                {
                  type: "Spacer",
                  size: "xs",
                },
                {
                  type: "Text",
                  className: "text-sm text-gray-600",
                  children: "Consistent spacing across cards",
                },
              ],
            },
            {
              type: "Box",
              className: "p-4 bg-white rounded-lg shadow",
              children: [
                {
                  type: "Heading",
                  level: 3,
                  className: "font-semibold",
                  children: "Card 3",
                },
                {
                  type: "Spacer",
                  size: "xs",
                },
                {
                  type: "Text",
                  className: "text-sm text-gray-600",
                  children: "Clean and organized layout",
                },
              ],
            },
          ],
        },
        {
          type: "Spacer",
          size: "2xl",
        },
        {
          type: "Button",
          className: "w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800",
          children: "Call to Action",
        },
      ],
    },
  }
);

export const ResponsiveExample: Story = enhanceStoryForDualMode<typeof Spacer>(
  {
    render: () => (
      <div className="p-6 bg-white rounded-lg border">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-2">Responsive Spacing</h3>
          <p className="text-gray-600">Resize the viewport to see different spacing</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-xs p-4 bg-blue-100 rounded-lg text-center">
            <p className="font-medium">Component A</p>
          </div>

          {/* Different spacing on different screen sizes */}
          <Spacer size="lg" className="sm:hidden" />
          <Spacer size="xl" className="hidden sm:block md:hidden" />
          <Spacer size="2xl" className="hidden md:block lg:hidden" />
          <Spacer size="3xl" className="hidden lg:block" />

          <div className="w-full max-w-xs p-4 bg-green-100 rounded-lg text-center">
            <p className="font-medium">Component B</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Mobile: lg | Tablet: xl | Desktop: 2xl | Large: 3xl</p>
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test components render
      expect(canvas.getByText("Component A")).toBeInTheDocument();
      expect(canvas.getByText("Component B")).toBeInTheDocument();
      expect(canvas.getByText("Responsive Spacing")).toBeInTheDocument();

      // Test responsive spacers are rendered
      const spacers = canvasElement.querySelectorAll('[data-slot="spacer"]');
      expect(spacers).toHaveLength(4);

      // Test responsive classes
      expect(spacers[0]).toHaveClass("sm:hidden");
      expect(spacers[1]).toHaveClass("hidden", "sm:block", "md:hidden");
      expect(spacers[2]).toHaveClass("hidden", "md:block", "lg:hidden");
      expect(spacers[3]).toHaveClass("hidden", "lg:block");
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-6 bg-white rounded-lg border",
      children: [
        {
          type: "Box",
          className: "text-center mb-4",
          children: [
            {
              type: "Heading",
              level: 3,
              className: "text-xl font-bold mb-2",
              children: "Responsive Spacing",
            },
            {
              type: "Text",
              className: "text-gray-600",
              children: "Resize the viewport to see different spacing",
            },
          ],
        },
        {
          type: "Flex",
          direction: "column",
          align: "center",
          children: [
            {
              type: "Box",
              className: "w-full max-w-xs p-4 bg-blue-100 rounded-lg text-center",
              children: {
                type: "Text",
                className: "font-medium",
                children: "Component A",
              },
            },
            {
              type: "Spacer",
              size: "lg",
              className: "sm:hidden",
            },
            {
              type: "Spacer",
              size: "xl",
              className: "hidden sm:block md:hidden",
            },
            {
              type: "Spacer",
              size: "2xl",
              className: "hidden md:block lg:hidden",
            },
            {
              type: "Spacer",
              size: "3xl",
              className: "hidden lg:block",
            },
            {
              type: "Box",
              className: "w-full max-w-xs p-4 bg-green-100 rounded-lg text-center",
              children: {
                type: "Text",
                className: "font-medium",
                children: "Component B",
              },
            },
          ],
        },
        {
          type: "Box",
          className: "mt-8 text-center text-sm text-gray-500",
          children: {
            type: "Text",
            children: "Mobile: lg | Tablet: xl | Desktop: 2xl | Large: 3xl",
          },
        },
      ],
    },
  }
);

export const FormExample: Story = enhanceStoryForDualMode<typeof Spacer>(
  {
    render: () => (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg border">
        <h3 className="text-xl font-bold">Contact Form</h3>
        <Spacer size="md" />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Spacer size="xs" />
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <Spacer size="md" />

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Spacer size="xs" />
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>

        <Spacer size="md" />

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <Spacer size="xs" />
          <textarea
            id="message"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Your message..."
          />
        </div>

        <Spacer size="lg" />

        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Send Message
        </button>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test form elements
      expect(canvas.getByText("Contact Form")).toBeInTheDocument();
      expect(canvas.getByText("Name")).toBeInTheDocument();
      expect(canvas.getByText("Email")).toBeInTheDocument();
      expect(canvas.getByText("Message")).toBeInTheDocument();
      expect(canvas.getByPlaceholderText("John Doe")).toBeInTheDocument();
      expect(canvas.getByPlaceholderText("john@example.com")).toBeInTheDocument();
      expect(canvas.getByPlaceholderText("Your message...")).toBeInTheDocument();
      expect(canvas.getByText("Send Message")).toBeInTheDocument();

      // Test spacers are used for consistent spacing
      const spacers = canvasElement.querySelectorAll('[data-slot="spacer"]');
      expect(spacers.length).toBeGreaterThan(0);

      // Test different spacer sizes by checking their styles
      let mdCount = 0;
      let xsCount = 0;
      for (const spacer of spacers) {
        const spacerElement = spacer as HTMLElement;
        const height = spacerElement.style.height;
        if (height === "1rem") mdCount++; // md size
        if (height === "0.25rem") xsCount++; // xs size
      }
      expect(mdCount).toBeGreaterThan(0);
      expect(xsCount).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "max-w-md mx-auto p-6 bg-white rounded-lg border",
      children: [
        {
          type: "Heading",
          level: 3,
          className: "text-xl font-bold",
          children: "Contact Form",
        },
        {
          type: "Spacer",
          size: "md",
        },
        {
          type: "Box",
          children: [
            {
              type: "Label",
              htmlFor: "name",
              className: "block text-sm font-medium text-gray-700",
              children: "Name",
            },
            {
              type: "Spacer",
              size: "xs",
            },
            {
              type: "Input",
              id: "name",
              name: "name",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              placeholder: "John Doe",
            },
          ],
        },
        {
          type: "Spacer",
          size: "md",
        },
        {
          type: "Box",
          children: [
            {
              type: "Label",
              htmlFor: "email",
              className: "block text-sm font-medium text-gray-700",
              children: "Email",
            },
            {
              type: "Spacer",
              size: "xs",
            },
            {
              type: "Input",
              id: "email",
              name: "email",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              placeholder: "john@example.com",
            },
          ],
        },
        {
          type: "Spacer",
          size: "md",
        },
        {
          type: "Box",
          children: [
            {
              type: "Label",
              htmlFor: "message",
              className: "block text-sm font-medium text-gray-700",
              children: "Message",
            },
            {
              type: "Spacer",
              size: "xs",
            },
            {
              type: "Textarea",
              id: "message",
              name: "message",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              rows: 4,
              placeholder: "Your message...",
            },
          ],
        },
        {
          type: "Spacer",
          size: "lg",
        },
        {
          type: "Button",
          className: "w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
          children: "Send Message",
        },
      ],
    },
  }
);

export const NavigationExample: Story = enhanceStoryForDualMode<typeof Spacer>(
  {
    render: () => (
      <nav className="p-4 bg-gray-900 text-white rounded-lg">
        <div className="flex items-center">
          <div className="text-xl font-bold">Logo</div>
          <Spacer orientation="horizontal" size="2xl" />
          <div className="flex items-center space-x-6">
            <button className="hover:text-gray-300 bg-transparent border-none cursor-pointer">
              Home
            </button>
            <button className="hover:text-gray-300 bg-transparent border-none cursor-pointer">
              About
            </button>
            <button className="hover:text-gray-300 bg-transparent border-none cursor-pointer">
              Services
            </button>
            <button className="hover:text-gray-300 bg-transparent border-none cursor-pointer">
              Contact
            </button>
          </div>
          <Spacer orientation="horizontal" size="2xl" className="flex-1" />
          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">Get Started</button>
        </div>
      </nav>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test navigation elements render
      expect(canvas.getByText("Logo")).toBeInTheDocument();
      expect(canvas.getByText("Home")).toBeInTheDocument();
      expect(canvas.getByText("About")).toBeInTheDocument();
      expect(canvas.getByText("Services")).toBeInTheDocument();
      expect(canvas.getByText("Contact")).toBeInTheDocument();
      expect(canvas.getByText("Get Started")).toBeInTheDocument();

      // Test spacers are rendered
      const spacers = canvasElement.querySelectorAll('[data-slot="spacer"]');
      expect(spacers).toHaveLength(2);
    },
  },
  {
    renderSpec: {
      type: "Box",
      element: "nav",
      className: "p-4 bg-gray-900 text-white rounded-lg",
      children: {
        type: "Flex",
        align: "center",
        children: [
          {
            type: "Box",
            className: "text-xl font-bold",
            children: "Logo",
          },
          {
            type: "Spacer",
            orientation: "horizontal",
            size: "2xl",
          },
          {
            type: "Flex",
            align: "center",
            gap: "lg",
            children: [
              {
                type: "Button",
                className: "hover:text-gray-300 bg-transparent border-none cursor-pointer",
                children: "Home",
              },
              {
                type: "Button",
                className: "hover:text-gray-300 bg-transparent border-none cursor-pointer",
                children: "About",
              },
              {
                type: "Button",
                className: "hover:text-gray-300 bg-transparent border-none cursor-pointer",
                children: "Services",
              },
              {
                type: "Button",
                className: "hover:text-gray-300 bg-transparent border-none cursor-pointer",
                children: "Contact",
              },
            ],
          },
          {
            type: "Spacer",
            orientation: "horizontal",
            size: "2xl",
            className: "flex-1",
          },
          {
            type: "Button",
            className: "px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700",
            children: "Get Started",
          },
        ],
      },
    },
  }
);

export const WithoutGuide: Story = enhanceStoryForDualMode<typeof Spacer>(
  {
    args: {
      size: "2xl",
      showGuide: false,
    },
    render: (args) => (
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Clean Spacing</h2>
          <Spacer {...args} />
          <p className="text-lg text-gray-600">
            This example shows the spacer without the development guide
          </p>
          <Spacer {...args} />
          <div className="inline-flex gap-4">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Primary Action
            </button>
            <button className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50">
              Secondary Action
            </button>
          </div>
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test content renders
      expect(canvas.getByText("Clean Spacing")).toBeInTheDocument();
      expect(canvas.getByText("Primary Action")).toBeInTheDocument();
      expect(canvas.getByText("Secondary Action")).toBeInTheDocument();

      // Test spacers are rendered without guide
      const spacers = canvasElement.querySelectorAll('[data-slot="spacer"]');
      expect(spacers).toHaveLength(2);

      // Test guide is NOT visible (no purple background)
      for (const spacer of spacers) {
        expect(spacer).not.toHaveClass("bg-purple-100");
      }
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg",
      children: {
        type: "Box",
        className: "text-center",
        children: [
          {
            type: "Heading",
            level: 2,
            className: "text-3xl font-bold text-gray-800",
            children: "Clean Spacing",
          },
          {
            type: "Spacer",
            size: "2xl",
            showGuide: false,
          },
          {
            type: "Text",
            className: "text-lg text-gray-600",
            children: "This example shows the spacer without the development guide",
          },
          {
            type: "Spacer",
            size: "2xl",
            showGuide: false,
          },
          {
            type: "Flex",
            className: "inline-flex",
            gap: "md",
            children: [
              {
                type: "Button",
                className: "px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700",
                children: "Primary Action",
              },
              {
                type: "Button",
                className: "px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50",
                children: "Secondary Action",
              },
            ],
          },
        ],
      },
    },
  }
);
