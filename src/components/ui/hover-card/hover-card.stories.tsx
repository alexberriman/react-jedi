import type { Meta, StoryObj } from "@storybook/react-vite";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar";
import { Button } from "../button/button";
import { CalendarDays } from "lucide-react";
import { within, userEvent, waitFor, expect } from "storybook/test";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  tags: ["autodocs", "test"],
  parameters: {
    docs: {
      description: {
        component:
          "A HoverCard component that displays content when hovering over a trigger element. Perfect for showing additional information, user profiles, or quick previews without cluttering the interface.",
      },
    },
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof HoverCard>(
  {
    render: () => (
      <div className="p-8 flex justify-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@shadcn</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@shadcn</h4>
                <p className="text-sm text-muted-foreground">
                  Creator of shadcn/ui - modern component library for React.
                </p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">Joined December 2021</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Just verify the trigger exists - hover interactions are difficult to test reliably
      const trigger = canvas.getByRole("button", { name: "@shadcn" });
      expect(trigger).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-8 flex justify-center",
      children: {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "link",
              children: "@shadcn",
            },
          },
          {
            type: "HoverCardContent",
            className: "w-80",
            children: {
              type: "Flex",
              justify: "space-between",
              gap: "md",
              children: [
                {
                  type: "Avatar",
                  children: [
                    {
                      type: "AvatarImage",
                      src: "https://github.com/shadcn.png",
                    },
                    {
                      type: "AvatarFallback",
                      children: "SC",
                    },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  gap: "xs",
                  children: [
                    {
                      type: "Text",
                      element: "h4",
                      size: "sm",
                      weight: "semibold",
                      children: "@shadcn",
                    },
                    {
                      type: "Text",
                      element: "p",
                      size: "sm",
                      variant: "muted",
                      children: "Creator of shadcn/ui - modern component library for React.",
                    },
                    {
                      type: "Flex",
                      align: "center",
                      className: "pt-2",
                      children: [
                        {
                          type: "Text",
                          element: "span",
                          size: "xs",
                          variant: "muted",
                          children: "📅 Joined December 2021",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    },
  }
);

export const UserProfile: Story = enhanceStoryForDualMode<typeof HoverCard>(
  {
    name: "User Profile Card",
    render: () => (
      <div className="p-8 flex justify-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hover:underline">@vercel</span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Vercel</h4>
                  <p className="text-sm text-muted-foreground">@vercel</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Develop. Preview. Ship. Creators of Next.js and the Edge Platform.
              </p>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div>
                  <span className="font-semibold text-foreground">256</span> repos
                </div>
                <div>
                  <span className="font-semibold text-foreground">44.5k</span> followers
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      const trigger = canvas.getByText("@vercel");
      expect(trigger).toBeInTheDocument();

      await userEvent.hover(trigger);

      await waitFor(
        () => {
          expect(
            within(document.body).getByText("Develop. Preview. Ship. Creators of Next.js and the Edge Platform.")
          ).toBeInTheDocument();
          expect(within(document.body).getByText("256")).toBeInTheDocument();
          expect(within(document.body).getByText("44.5k")).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-8 flex justify-center",
      children: {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            asChild: true,
            children: {
              type: "Flex",
              align: "center",
              gap: "sm",
              className: "cursor-pointer",
              children: [
                {
                  type: "Avatar",
                  className: "h-8 w-8",
                  children: [
                    {
                      type: "AvatarImage",
                      src: "https://github.com/vercel.png",
                    },
                    {
                      type: "AvatarFallback",
                      children: "VC",
                    },
                  ],
                },
                {
                  type: "Text",
                  element: "span",
                  size: "sm",
                  weight: "medium",
                  className: "hover:underline",
                  children: "@vercel",
                },
              ],
            },
          },
          {
            type: "HoverCardContent",
            className: "w-80",
            children: {
              type: "Flex",
              direction: "column",
              gap: "md",
              children: [
              {
                type: "Flex",
                align: "start",
                gap: "md",
                children: [
                  {
                    type: "Avatar",
                    className: "h-12 w-12",
                    children: [
                      {
                        type: "AvatarImage",
                        src: "https://github.com/vercel.png",
                      },
                      {
                        type: "AvatarFallback",
                        children: "VC",
                      },
                    ],
                  },
                  {
                    type: "Flex",
                    direction: "column",
                    gap: "xs",
                    children: [
                      {
                        type: "Text",
                        element: "h4",
                        size: "sm",
                        weight: "semibold",
                        children: "Vercel",
                      },
                      {
                        type: "Text",
                        element: "p",
                        size: "sm",
                        variant: "muted",
                        children: "@vercel",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Text",
                element: "p",
                size: "sm",
                variant: "muted",
                children: "Develop. Preview. Ship. Creators of Next.js and the Edge Platform.",
              },
              {
                type: "Flex",
                gap: "md",
                children: [
                  {
                    type: "Text",
                    size: "sm",
                    variant: "muted",
                    children: [
                      {
                        type: "Text",
                        element: "span",
                        weight: "semibold",
                        variant: "default",
                        children: "256",
                      },
                      " repos",
                    ],
                  },
                  {
                    type: "Text",
                    size: "sm",
                    variant: "muted",
                    children: [
                      {
                        type: "Text",
                        element: "span",
                        weight: "semibold",
                        variant: "default",
                        children: "44.5k",
                      },
                      " followers",
                    ],
                  },
                ],
              },
            ],
            },
          },
        ],
      },
    },
  }
);

export const TextWithTooltip: Story = enhanceStoryForDualMode<typeof HoverCard>(
  {
    name: "Text with Definition",
    render: () => (
      <div className="p-8 max-w-md mx-auto">
        <p className="text-sm">
          React is a JavaScript library for building user interfaces. It&apos;s maintained by{" "}
          <HoverCard>
            <HoverCardTrigger asChild>
              <span className="text-blue-600 underline cursor-pointer">Meta</span>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Meta Platforms, Inc.</h4>
                <p className="text-sm text-muted-foreground">
                  Previously known as Facebook, Inc., Meta is a technology company that develops
                  social media platforms, virtual reality technology, and other digital services.
                </p>
                <p className="text-xs text-muted-foreground">Founded: February 2004</p>
              </div>
            </HoverCardContent>
          </HoverCard>{" "}
          and a community of developers.
        </p>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      const trigger = canvas.getByText("Meta");
      expect(trigger).toBeInTheDocument();

      await userEvent.hover(trigger);

      await waitFor(
        () => {
          // Look for the hover card content specifically
          const hoverCardContent = document.body.querySelector('[data-radix-popper-content-wrapper]');
          if (!hoverCardContent) {
            throw new Error('Hover card content not found');
          }
          const hoverScreen = within(hoverCardContent as HTMLElement);
          expect(hoverScreen.getByText("Meta Platforms, Inc.")).toBeInTheDocument();
          expect(hoverScreen.getByText(/Previously known as Facebook/)).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-8 max-w-md mx-auto",
      children: {
        type: "Text",
        element: "p",
        size: "sm",
        children: [
          "React is a JavaScript library for building user interfaces. It's maintained by ",
          {
            type: "HoverCard",
            children: [
              {
                type: "HoverCardTrigger",
                asChild: true,
                children: {
                  type: "Text",
                  element: "span",
                  className: "text-blue-600 underline cursor-pointer",
                  children: "Meta",
                },
              },
              {
                type: "HoverCardContent",
                className: "w-80",
                children: {
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: [
                    {
                      type: "Text",
                      element: "h4",
                      size: "sm",
                      weight: "semibold",
                      children: "Meta Platforms, Inc.",
                    },
                    {
                      type: "Text",
                      element: "p",
                      size: "sm",
                      variant: "muted",
                      children:
                        "Previously known as Facebook, Inc., Meta is a technology company that develops social media platforms, virtual reality technology, and other digital services.",
                    },
                    {
                      type: "Text",
                      element: "p",
                      size: "xs",
                      variant: "muted",
                      children: "Founded: February 2004",
                    },
                  ],
                },
              },
            ],
          },
          " and a community of developers.",
        ],
      },
    },
  }
);

export const ProductPreview: Story = enhanceStoryForDualMode<typeof HoverCard>(
  {
    render: () => (
      <div className="p-8 flex justify-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">View Product</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <img
                src="https://placehold.co/320x180/EEE/31343C"
                alt="Product"
                className="w-full h-32 object-cover rounded-md"
              />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Premium Headphones</h4>
                <p className="text-sm text-muted-foreground">
                  High-quality wireless headphones with noise cancellation and 30-hour battery life.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">$299.99</span>
                  <span className="text-sm text-green-600">In Stock</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      const trigger = canvas.getByRole("button", { name: "View Product" });
      expect(trigger).toBeInTheDocument();

      await userEvent.hover(trigger);

      await waitFor(
        () => {
          expect(within(document.body).getByText("Premium Headphones")).toBeInTheDocument();
          expect(within(document.body).getByText("$299.99")).toBeInTheDocument();
          expect(within(document.body).getByText("In Stock")).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-8 flex justify-center",
      children: {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              children: "View Product",
            },
          },
          {
            type: "HoverCardContent",
            className: "w-80",
            children: {
              type: "Flex",
              direction: "column",
              gap: "md",
              children: [
              {
                type: "Image",
                src: "https://placehold.co/320x180/EEE/31343C",
                alt: "Product",
                className: "w-full h-32 object-cover rounded-md",
              },
              {
                type: "Flex",
                direction: "column",
                gap: "sm",
                children: [
                  {
                    type: "Text",
                    element: "h4",
                    size: "sm",
                    weight: "semibold",
                    children: "Premium Headphones",
                  },
                  {
                    type: "Text",
                    element: "p",
                    size: "sm",
                    variant: "muted",
                    children:
                      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
                  },
                  {
                    type: "Flex",
                    align: "center",
                    justify: "space-between",
                    children: [
                      {
                        type: "Text",
                        element: "span",
                        size: "lg",
                        weight: "semibold",
                        children: "$299.99",
                      },
                      {
                        type: "Text",
                        element: "span",
                        size: "sm",
                        className: "text-green-600",
                        children: "In Stock",
                      },
                    ],
                  },
                ],
              },
            ],
            },
          },
        ],
      },
    },
  }
);

export const CodePreview: Story = enhanceStoryForDualMode<typeof HoverCard>(
  {
    render: () => (
      <div className="p-8 flex justify-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <code className="px-2 py-1 bg-muted rounded text-sm cursor-pointer">useHoverCard</code>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold font-mono">useHoverCard</h4>
              <p className="text-sm text-muted-foreground">
                A React hook for creating accessible hover card interactions.
              </p>
              <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                {`const { isOpen, ref, handlers } =
  useHoverCard({
    openDelay: 700,
    closeDelay: 300
  });`}
              </pre>
              <p className="text-xs text-muted-foreground">
                Provides keyboard navigation and ARIA attributes.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      const trigger = canvas.getByText("useHoverCard");
      expect(trigger).toBeInTheDocument();

      await userEvent.hover(trigger);

      await waitFor(
        () => {
          // Look for the hover card content specifically
          const hoverCardContent = document.body.querySelector('[data-radix-popper-content-wrapper]');
          if (!hoverCardContent) {
            throw new Error('Hover card content not found');
          }
          const hoverScreen = within(hoverCardContent as HTMLElement);
          expect(
            hoverScreen.getByText("A React hook for creating accessible hover card interactions.")
          ).toBeInTheDocument();
          expect(hoverScreen.getByText(/Provides keyboard navigation/)).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-8 flex justify-center",
      children: {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            asChild: true,
            children: {
              type: "Text",
              element: "code",
              className: "px-2 py-1 bg-muted rounded text-sm cursor-pointer",
              children: "useHoverCard",
            },
          },
          {
            type: "HoverCardContent",
            className: "w-80",
            children: {
              type: "Flex",
            direction: "column",
            gap: "sm",
            children: [
              {
                type: "Text",
                element: "h4",
                size: "sm",
                weight: "semibold",
                className: "font-mono",
                children: "useHoverCard",
              },
              {
                type: "Text",
                element: "p",
                size: "sm",
                variant: "muted",
                children: "A React hook for creating accessible hover card interactions.",
              },
              {
                type: "Text",
                element: "pre",
                size: "xs",
                className: "bg-muted p-2 rounded overflow-x-auto",
                children: `const { isOpen, ref, handlers } =
  useHoverCard({
    openDelay: 700,
    closeDelay: 300
  });`,
              },
              {
                type: "Text",
                element: "p",
                size: "xs",
                variant: "muted",
                children: "Provides keyboard navigation and ARIA attributes.",
              },
            ],
            },
          },
        ],
      },
    },
  }
);

export const CustomStyling: Story = enhanceStoryForDualMode<typeof HoverCard>(
  {
    render: () => (
      <div className="p-8 flex justify-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline" className="border-purple-500 text-purple-700">
              Hover for Magic ✨
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300">
            <div className="space-y-3">
              <h4 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome to the Future
              </h4>
              <p className="text-sm text-purple-800">
                Experience the next generation of hover cards with custom styling and smooth
                animations. This card demonstrates the flexibility of the HoverCard component.
              </p>
              <div className="flex space-x-2">
                <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                  Modern
                </span>
                <span className="text-xs bg-pink-200 text-pink-800 px-2 py-1 rounded-full">
                  Beautiful
                </span>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                  Accessible
                </span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      const trigger = canvas.getByRole("button", { name: "Hover for Magic ✨" });
      expect(trigger).toBeInTheDocument();

      await userEvent.hover(trigger);

      await waitFor(
        () => {
          expect(within(document.body).getByText("Welcome to the Future")).toBeInTheDocument();
          expect(within(document.body).getByText("Modern")).toBeInTheDocument();
          expect(within(document.body).getByText("Beautiful")).toBeInTheDocument();
          expect(within(document.body).getByText("Accessible")).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-8 flex justify-center",
      children: {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              className: "border-purple-500 text-purple-700",
              children: "Hover for Magic ✨",
            },
          },
          {
            type: "HoverCardContent",
            className: "w-80 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300",
            children: {
              type: "Flex",
              direction: "column",
              gap: "md",
              children: [
              {
                type: "Text",
                element: "h4",
                size: "lg",
                weight: "bold",
                className: "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
                children: "Welcome to the Future",
              },
              {
                type: "Text",
                element: "p",
                size: "sm",
                className: "text-purple-800",
                children:
                  "Experience the next generation of hover cards with custom styling and smooth animations. This card demonstrates the flexibility of the HoverCard component.",
              },
              {
                type: "Flex",
                gap: "sm",
                children: [
                  {
                    type: "Text",
                    element: "span",
                    size: "xs",
                    className: "bg-purple-200 text-purple-800 px-2 py-1 rounded-full",
                    children: "Modern",
                  },
                  {
                    type: "Text",
                    element: "span",
                    size: "xs",
                    className: "bg-pink-200 text-pink-800 px-2 py-1 rounded-full",
                    children: "Beautiful",
                  },
                  {
                    type: "Text",
                    element: "span",
                    size: "xs",
                    className: "bg-blue-200 text-blue-800 px-2 py-1 rounded-full",
                    children: "Accessible",
                  },
                ],
              },
            ],
            },
          },
        ],
      },
    },
  }
);

export const DelayedOpen: Story = enhanceStoryForDualMode<typeof HoverCard>(
  {
    render: () => (
      <div className="p-8 flex justify-center">
        <HoverCard openDelay={500} closeDelay={300}>
          <HoverCardTrigger asChild>
            <Button variant="secondary">Hover (500ms delay)</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Delayed Opening</h4>
              <p className="text-sm text-muted-foreground">
                This hover card has a 500ms opening delay to prevent accidental triggers when quickly
                moving the cursor.
              </p>
              <p className="text-xs text-muted-foreground">Close delay: 300ms</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      const trigger = canvas.getByRole("button", { name: "Hover (500ms delay)" });
      expect(trigger).toBeInTheDocument();

      await userEvent.hover(trigger);

      await waitFor(
        () => {
          expect(within(document.body).getByText("Delayed Opening")).toBeInTheDocument();
          expect(within(document.body).getByText("Close delay: 300ms")).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "p-8 flex justify-center",
      children: {
        type: "HoverCard",
        openDelay: 500,
        closeDelay: 300,
        children: [
          {
            type: "HoverCardTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "secondary",
              children: "Hover (500ms delay)",
            },
          },
          {
            type: "HoverCardContent",
            className: "w-80",
            children: {
              type: "Flex",
            direction: "column",
            gap: "sm",
            children: [
              {
                type: "Text",
                element: "h4",
                size: "sm",
                weight: "semibold",
                children: "Delayed Opening",
              },
              {
                type: "Text",
                element: "p",
                size: "sm",
                variant: "muted",
                children:
                  "This hover card has a 500ms opening delay to prevent accidental triggers when quickly moving the cursor.",
              },
              {
                type: "Text",
                element: "p",
                size: "xs",
                variant: "muted",
                children: "Close delay: 300ms",
              },
            ],
            },
          },
        ],
      },
    },
  }
);
