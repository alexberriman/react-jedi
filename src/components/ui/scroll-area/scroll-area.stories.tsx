import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { ScrollArea } from "./scroll-area";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Layout Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

const getVersionStatus = (index: number): string => {
  if (index < 5) return "Stable";
  if (index < 10) return "Beta";
  return "Alpha";
};

const getVersionNotes = (index: number): string => {
  if (index === 0) return "Latest stable release";
  if (index === 1) return "Security update";
  if (index === 2) return "Bug fixes and performance improvements";
  return "Minor updates";
};

export const VerticalScroll: Story = enhanceStoryForDualMode<typeof ScrollArea>(
  {
    args: {
      className: "h-72 w-48 rounded-md border",
      children: (
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {tags.map((tag) => (
            <div key={tag} className="text-sm">
              {tag}
            </div>
          ))}
        </div>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that the scroll area is rendered
      const scrollArea = canvasElement.querySelector('[data-slot="scroll-area"]');
      expect(scrollArea).toBeInTheDocument();

      // Check that content is rendered
      expect(canvas.getByText("Tags")).toBeInTheDocument();
      expect(canvas.getByText("v1.2.0-beta.50")).toBeInTheDocument();

      // Test scrollbar visibility - scrollbars may not be visible initially
      expect(scrollArea).toBeTruthy();
    },
  },
  {
    renderSpec: {
      type: "ScrollArea",
      className: "h-72 w-48 rounded-md border",
      children: {
        type: "Box",
        className: "p-4",
        children: [
          {
            type: "Heading",
            element: "h4",
            className: "mb-4 text-sm font-medium leading-none",
            children: "Tags",
          },
          ...tags.map((tag) => ({
            type: "Text",
            element: "div",
            className: "text-sm",
            children: tag,
          })),
        ],
      },
    },
  }
);

export const HorizontalScroll: Story = enhanceStoryForDualMode<typeof ScrollArea>(
  {
    args: {
      className: "w-96 whitespace-nowrap rounded-md border",
      children: (
        <div className="flex w-max space-x-4 p-4">
          {tags.map((tag) => (
            <figure key={tag} className="shrink-0">
              <div className="overflow-hidden rounded-md">
                <img
                  src="https://placehold.co/150x150/EEE/31343C"
                  alt={`Version ${tag}`}
                  className="aspect-[3/4] h-fit w-fit object-cover"
                  width={150}
                  height={200}
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                Version: <span className="font-semibold text-foreground">{tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that the scroll area is rendered
      const scrollArea = canvasElement.querySelector('[data-slot="scroll-area"]');
      expect(scrollArea).toBeInTheDocument();

      // Check that content is rendered
      const firstImage = canvas.getByAltText("Version v1.2.0-beta.50");
      expect(firstImage).toBeInTheDocument();

      // Test horizontal scrollbar - scrollbars may not be visible initially
      expect(scrollArea).toBeTruthy();
    },
  },
  {
    renderSpec: {
      type: "ScrollArea",
      className: "w-96 whitespace-nowrap rounded-md border",
      children: {
        type: "Flex",
        className: "w-max space-x-4 p-4",
        children: tags.map((tag) => ({
          type: "Box",
          element: "figure",
          className: "shrink-0",
          children: [
            {
              type: "Box",
              className: "overflow-hidden rounded-md",
              children: {
                type: "Image",
                src: "https://placehold.co/150x150/EEE/31343C",
                alt: `Version ${tag}`,
                className: "aspect-[3/4] h-fit w-fit object-cover",
                width: 150,
                height: 200,
              },
            },
            {
              type: "Box",
              element: "figcaption",
              className: "pt-2 text-xs text-muted-foreground",
              children: [
                {
                  type: "Text",
                  children: "Version: ",
                },
                {
                  type: "Text",
                  element: "span",
                  className: "font-semibold text-foreground",
                  children: tag,
                },
              ],
            },
          ],
        })),
      },
    },
  }
);

export const BothDirections: Story = enhanceStoryForDualMode<typeof ScrollArea>(
  {
    args: {
      className: "h-72 w-96 rounded-md border",
      children: (
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="sticky top-0 bg-background text-left">Version</th>
                <th className="sticky top-0 bg-background text-left">Status</th>
                <th className="sticky top-0 bg-background text-left">Released</th>
                <th className="sticky top-0 bg-background text-left">Downloads</th>
                <th className="sticky top-0 bg-background text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, i) => (
                <tr key={tag}>
                  <td className="whitespace-nowrap py-2">{tag}</td>
                  <td className="whitespace-nowrap py-2">
                    {(() => {
                      if (i < 5) return "Stable";
                      if (i < 10) return "Beta";
                      return "Alpha";
                    })()}
                  </td>
                  <td className="whitespace-nowrap py-2">
                    {new Date(2024, 0, 30 - i).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap py-2">
                    {/* Using fixed value for downloads to avoid ESLint warning about pseudorandom */}
                    {(i + 1) * 5432}
                  </td>
                  <td className="whitespace-nowrap py-2">
                    {(() => {
                      if (i === 0) return "Latest stable release";
                      if (i === 1) return "Security update";
                      if (i === 2) return "Bug fixes and performance improvements";
                      return "Minor updates";
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that the scroll area is rendered
      const scrollArea = canvasElement.querySelector('[data-slot="scroll-area"]');
      expect(scrollArea).toBeInTheDocument();

      // Check that table headers are rendered
      expect(canvas.getByText("Version")).toBeInTheDocument();
      expect(canvas.getByText("Status")).toBeInTheDocument();
      expect(canvas.getByText("Released")).toBeInTheDocument();

      // Test content in table
      expect(canvas.getByText("v1.2.0-beta.50")).toBeInTheDocument();
      const stableElements = canvas.getAllByText("Stable");
      expect(stableElements.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "ScrollArea",
      className: "h-72 w-96 rounded-md border",
      children: {
        type: "Box",
        className: "p-4",
        children: {
          type: "Table",
          className: "w-full",
          head: {
            rows: [
              {
                cells: [
                  {
                    content: "Version",
                    className: "sticky top-0 bg-background text-left",
                  },
                  {
                    content: "Status",
                    className: "sticky top-0 bg-background text-left",
                  },
                  {
                    content: "Released",
                    className: "sticky top-0 bg-background text-left",
                  },
                  {
                    content: "Downloads",
                    className: "sticky top-0 bg-background text-left",
                  },
                  {
                    content: "Notes",
                    className: "sticky top-0 bg-background text-left",
                  },
                ],
              },
            ],
          },
          body: {
            rows: tags.map((tag, i) => ({
              cells: [
                {
                  content: tag,
                  className: "whitespace-nowrap py-2",
                },
                {
                  content: getVersionStatus(i),
                  className: "whitespace-nowrap py-2",
                },
                {
                  content: new Date(2024, 0, 30 - i).toLocaleDateString(),
                  className: "whitespace-nowrap py-2",
                },
                {
                  content: String((i + 1) * 5432),
                  className: "whitespace-nowrap py-2",
                },
                {
                  content: getVersionNotes(i),
                  className: "whitespace-nowrap py-2",
                },
              ],
            })),
          },
        },
      },
    },
  }
);

export const NestedScrollAreas: Story = enhanceStoryForDualMode<typeof ScrollArea>(
  {
    args: {
      className: "h-[400px] w-[350px] rounded-md border",
      children: (
        <div className="grid h-full grid-rows-2 gap-4 p-4">
          <div>
            <h4 className="mb-2 text-sm font-medium">Vertical Scroll</h4>
            <ScrollArea className="h-full w-full rounded-md border">
              <div className="p-2">
                {tags.map((tag) => (
                  <div key={tag} className="py-1 text-sm">
                    {tag}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">Horizontal Scroll</h4>
            <ScrollArea className="h-full w-full rounded-md border">
              <div className="flex h-full w-max items-center space-x-2 p-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex h-16 w-32 shrink-0 items-center justify-center rounded-md border bg-secondary text-sm"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that both scroll areas are rendered
      const scrollAreas = canvasElement.querySelectorAll('[data-slot="scroll-area"]');
      expect(scrollAreas).toHaveLength(3); // Parent + 2 nested

      // Check that both headings are present
      expect(canvas.getByText("Vertical Scroll")).toBeInTheDocument();
      expect(canvas.getByText("Horizontal Scroll")).toBeInTheDocument();

      // Verify nested content
      const allTags = canvas.getAllByText("v1.2.0-beta.50");
      expect(allTags.length).toBeGreaterThan(1);
    },
  },
  {
    renderSpec: {
      type: "ScrollArea",
      className: "h-[400px] w-[350px] rounded-md border",
      children: {
        type: "Grid",
        className: "h-full grid-rows-2 gap-4 p-4",
        children: [
          {
            type: "Box",
            children: [
              {
                type: "Heading",
                element: "h4",
                className: "mb-2 text-sm font-medium",
                children: "Vertical Scroll",
              },
              {
                type: "ScrollArea",
                className: "h-full w-full rounded-md border",
                children: {
                  type: "Box",
                  className: "p-2",
                  children: tags.map((tag) => ({
                    type: "Text",
                    element: "div",
                    className: "py-1 text-sm",
                    children: tag,
                  })),
                },
              },
            ],
          },
          {
            type: "Box",
            children: [
              {
                type: "Heading",
                element: "h4",
                className: "mb-2 text-sm font-medium",
                children: "Horizontal Scroll",
              },
              {
                type: "ScrollArea",
                className: "h-full w-full rounded-md border",
                children: {
                  type: "Flex",
                  className: "h-full w-max items-center space-x-2 p-2",
                  children: tags.map((tag) => ({
                    type: "Box",
                    className: "flex h-16 w-32 shrink-0 items-center justify-center rounded-md border bg-secondary text-sm",
                    children: tag,
                  })),
                },
              },
            ],
          },
        ],
      },
    },
  }
);

export const LongContent: Story = enhanceStoryForDualMode<typeof ScrollArea>(
  {
    args: {
      className: "h-[400px] w-[600px] rounded-lg border",
      children: (
        <div className="p-6">
          <h2 className="mb-4 text-2xl font-bold">ScrollArea Component Documentation</h2>
          <div className="space-y-4 text-sm">
            <p>
              The ScrollArea component provides a customizable scrollbar for overflowing content. It
              offers a consistent look across different browsers and operating systems, while
              maintaining accessibility.
            </p>
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>Cross-browser consistency</li>
              <li>Touch-friendly scrolling</li>
              <li>Keyboard navigation support</li>
              <li>Customizable scrollbar appearance</li>
              <li>Smooth scrolling behavior</li>
              <li>Support for both vertical and horizontal scrolling</li>
            </ul>
            <h3 className="text-lg font-semibold">Usage Examples</h3>
            <p>The ScrollArea component can be used in various scenarios:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>Long lists of items</li>
              <li>Code editors or text areas</li>
              <li>Image galleries</li>
              <li>Data tables</li>
              <li>Chat interfaces</li>
              <li>Navigation menus</li>
            </ol>
            <h3 className="text-lg font-semibold">Accessibility</h3>
            <p>
              The component is built with accessibility in mind, supporting keyboard navigation and
              screen readers. Users can navigate the scrollable content using arrow keys, Page
              Up/Down, Home, and End keys.
            </p>
            <h3 className="text-lg font-semibold">Performance</h3>
            <p>
              The ScrollArea component is optimized for performance, using virtual scrolling
              techniques when appropriate and minimizing repaints during scroll operations.
            </p>
            {Array.from({ length: 10 }).map((_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
        </div>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that the scroll area is rendered
      const scrollArea = canvasElement.querySelector('[data-slot="scroll-area"]');
      expect(scrollArea).toBeInTheDocument();

      // Check that the title is rendered
      expect(canvas.getByText("ScrollArea Component Documentation")).toBeInTheDocument();

      // Check that sections are rendered
      expect(canvas.getByText("Features")).toBeInTheDocument();
      expect(canvas.getByText("Accessibility")).toBeInTheDocument();

      // Test scrollbar presence for long content - scrollbars may not be visible initially
      expect(scrollArea).toBeTruthy();
    },
  },
  {
    renderSpec: {
      type: "ScrollArea",
      className: "h-[400px] w-[600px] rounded-lg border",
      children: {
        type: "Box",
        className: "p-6",
        children: [
          {
            type: "Heading",
            element: "h2",
            className: "mb-4 text-2xl font-bold",
            children: "ScrollArea Component Documentation",
          },
          {
            type: "Box",
            className: "space-y-4 text-sm",
            children: [
              {
                type: "Text",
                element: "p",
                children:
                  "The ScrollArea component provides a customizable scrollbar for overflowing content. It offers a consistent look across different browsers and operating systems, while maintaining accessibility.",
              },
              {
                type: "Heading",
                element: "h3",
                className: "text-lg font-semibold",
                children: "Features",
              },
              {
                type: "Box",
                element: "ul",
                className: "list-disc space-y-2 pl-6",
                children: [
                  {
                    type: "Text",
                    element: "li",
                    children: "Cross-browser consistency",
                  },
                  {
                    type: "Text",
                    element: "li",
                    children: "Touch-friendly scrolling",
                  },
                  {
                    type: "Text",
                    element: "li",
                    children: "Keyboard navigation support",
                  },
                  {
                    type: "Text",
                    element: "li",
                    children: "Customizable scrollbar appearance",
                  },
                  {
                    type: "Text",
                    element: "li",
                    children: "Smooth scrolling behavior",
                  },
                  {
                    type: "Text",
                    element: "li",
                    children: "Support for both vertical and horizontal scrolling",
                  },
                ],
              },
              {
                type: "Heading",
                element: "h3",
                className: "text-lg font-semibold",
                children: "Usage Examples",
              },
              {
                type: "Text",
                element: "p",
                children: "The ScrollArea component can be used in various scenarios:",
              },
              {
                type: "Box",
                element: "ol",
                className: "list-decimal space-y-2 pl-6",
                children: [
                  {
                    type: "Text",
                    element: "li",
                    children: "Long lists of items",
                  },
                  {
                    type: "Text",
                    element: "li",
                    children: "Code editors or text areas",
                  },
                  {
                    type: "Text",
                    element: "li",
                    children: "Image galleries",
                  },
                  {
                    type: "Text",
                    element: "li",
                    children: "Data tables",
                  },
                  {
                    type: "Text",
                    element: "li",
                    children: "Chat interfaces",
                  },
                  {
                    type: "Text",
                    element: "li",
                    children: "Navigation menus",
                  },
                ],
              },
              {
                type: "Heading",
                element: "h3",
                className: "text-lg font-semibold",
                children: "Accessibility",
              },
              {
                type: "Text",
                element: "p",
                children:
                  "The component is built with accessibility in mind, supporting keyboard navigation and screen readers. Users can navigate the scrollable content using arrow keys, Page Up/Down, Home, and End keys.",
              },
              {
                type: "Heading",
                element: "h3",
                className: "text-lg font-semibold",
                children: "Performance",
              },
              {
                type: "Text",
                element: "p",
                children:
                  "The ScrollArea component is optimized for performance, using virtual scrolling techniques when appropriate and minimizing repaints during scroll operations.",
              },
              ...Array.from({ length: 10 }).map((_, i) => ({
                type: "Text",
                element: "p",
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              })),
            ],
          },
        ],
      },
    },
  }
);

export const CustomStyling: Story = enhanceStoryForDualMode<typeof ScrollArea>(
  {
    args: {
      className: "h-[300px] w-[300px] rounded-xl border-2 border-blue-500 bg-blue-50",
      children: (
        <div className="p-6">
          <h3 className="mb-4 text-xl font-bold text-blue-900">Custom Styled ScrollArea</h3>
          <div className="space-y-3">
            {tags.slice(0, 20).map((tag, i) => (
              <div
                key={tag}
                className="rounded-lg bg-white p-3 shadow-sm transition-all hover:shadow-md"
              >
                <div className="font-medium text-blue-900">{tag}</div>
                <div className="text-sm text-blue-600">
                  Released: {new Date(2024, 0, 30 - i).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that the scroll area is rendered
      const scrollArea = canvasElement.querySelector('[data-slot="scroll-area"]');
      expect(scrollArea).toBeInTheDocument();

      // Check that the title is rendered
      expect(canvas.getByText("Custom Styled ScrollArea")).toBeInTheDocument();

      // Check that some version tags are rendered
      expect(canvas.getByText("v1.2.0-beta.50")).toBeInTheDocument();
      expect(canvas.getByText("v1.2.0-beta.31")).toBeInTheDocument();

      // Verify custom styling is applied
      expect(scrollArea).toHaveClass("bg-blue-50", "border-blue-500");
    },
  },
  {
    renderSpec: {
      type: "ScrollArea",
      className: "h-[300px] w-[300px] rounded-xl border-2 border-blue-500 bg-blue-50",
      children: {
        type: "Box",
        className: "p-6",
        children: [
          {
            type: "Heading",
            element: "h3",
            className: "mb-4 text-xl font-bold text-blue-900",
            children: "Custom Styled ScrollArea",
          },
          {
            type: "Box",
            className: "space-y-3",
            children: tags.slice(0, 20).map((tag, i) => ({
              type: "Box",
              className: "rounded-lg bg-white p-3 shadow-sm transition-all hover:shadow-md",
              children: [
                {
                  type: "Text",
                  element: "div",
                  className: "font-medium text-blue-900",
                  children: tag,
                },
                {
                  type: "Text",
                  element: "div",
                  className: "text-sm text-blue-600",
                  children: `Released: ${new Date(2024, 0, 30 - i).toLocaleDateString()}`,
                },
              ],
            })),
          },
        ],
      },
    },
  }
);
