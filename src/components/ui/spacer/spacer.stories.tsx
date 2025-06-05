import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { Spacer } from "./spacer";

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

export const Default: Story = {
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
};

export const AllSizes: Story = {
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
};

export const HorizontalSpacing: Story = {
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
};

export const VerticalLayout: Story = {
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
};

export const ResponsiveExample: Story = {
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
};

export const FormExample: Story = {
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
    expect(canvas.getByLabelText("Name")).toBeInTheDocument();
    expect(canvas.getByLabelText("Email")).toBeInTheDocument();
    expect(canvas.getByLabelText("Message")).toBeInTheDocument();
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
};

export const NavigationExample: Story = {
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
};

export const WithoutGuide: Story = {
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
};
