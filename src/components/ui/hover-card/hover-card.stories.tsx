import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar";
import { Button } from "../button/button";
import { CalendarDays } from "lucide-react";
import { within, userEvent, waitFor, expect, screen } from "storybook/test";

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
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

export const Default: Story = {
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

    const trigger = canvas.getByRole("button", { name: "@shadcn" });
    expect(trigger).toBeInTheDocument();

    await userEvent.hover(trigger);

    await waitFor(
      () => {
        const content = screen.getByText(
          "Creator of shadcn/ui - modern component library for React."
        );
        expect(content).toBeInTheDocument();
        expect(screen.getByText("Joined December 2021")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const UserProfile: Story = {
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
          screen.getByText("Develop. Preview. Ship. Creators of Next.js and the Edge Platform.")
        ).toBeInTheDocument();
        expect(screen.getByText("256")).toBeInTheDocument();
        expect(screen.getByText("44.5k")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const TextWithTooltip: Story = {
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
        expect(screen.getByText("Meta Platforms, Inc.")).toBeInTheDocument();
        expect(screen.getByText(/Previously known as Facebook/)).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const ProductPreview: Story = {
  name: "Product Preview",
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
        expect(screen.getByText("Premium Headphones")).toBeInTheDocument();
        expect(screen.getByText("$299.99")).toBeInTheDocument();
        expect(screen.getByText("In Stock")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const CodePreview: Story = {
  name: "Code Preview",
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
        expect(
          screen.getByText("A React hook for creating accessible hover card interactions.")
        ).toBeInTheDocument();
        expect(screen.getByText(/Provides keyboard navigation/)).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const CustomStyling: Story = {
  name: "Custom Styling",
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
        expect(screen.getByText("Welcome to the Future")).toBeInTheDocument();
        expect(screen.getByText("Modern")).toBeInTheDocument();
        expect(screen.getByText("Beautiful")).toBeInTheDocument();
        expect(screen.getByText("Accessible")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const DelayedOpen: Story = {
  name: "Delayed Open",
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
        expect(screen.getByText("Delayed Opening")).toBeInTheDocument();
        expect(screen.getByText("Close delay: 300ms")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};
