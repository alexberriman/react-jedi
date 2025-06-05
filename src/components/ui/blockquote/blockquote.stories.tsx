import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { BlockQuote } from "./blockquote";

const meta = {
  title: "Components/BlockQuote",
  component: BlockQuote,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "accent", "muted", "destructive"],
      description: "The color variant of the blockquote",
    },
    size: {
      control: "select",
      options: ["sm", "base", "lg", "xl"],
      description: "The size of the blockquote text",
    },
    styleVariant: {
      control: "select",
      options: ["classic", "modern", "elegant", "minimal", "decorative", "glossy"],
      description: "The visual style of the blockquote",
    },
    animation: {
      control: "select",
      options: ["none", "fadeIn", "slideIn", "pulse", "shimmer"],
      description: "Animation effect applied to the blockquote",
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Shadow effect applied to the blockquote",
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "Border radius of the blockquote",
    },
    cite: {
      control: "text",
      description: "Source of the quote",
    },
    author: {
      control: "text",
      description: "Author of the quote",
    },
  },
} satisfies Meta<typeof BlockQuote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test blockquote content
    const quote = canvas.getByText(
      "The future belongs to those who believe in the beauty of their dreams."
    );
    expect(quote).toBeInTheDocument();

    // Test author is rendered
    expect(canvas.getByText("Eleanor Roosevelt")).toBeInTheDocument();

    // Test blockquote element exists
    const blockquote = canvasElement.querySelector("blockquote");
    expect(blockquote).toBeInTheDocument();
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <BlockQuote variant="default">
        Design is not just what it looks like and feels like. Design is how it works.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Steve Jobs</span>
        </footer>
      </BlockQuote>

      <BlockQuote variant="primary">
        Innovation distinguishes between a leader and a follower.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Steve Jobs</span>
        </footer>
      </BlockQuote>

      <BlockQuote variant="secondary">
        Your time is limited, so don&apos;t waste it living someone else&apos;s life.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Steve Jobs</span>
        </footer>
      </BlockQuote>

      <BlockQuote variant="accent">
        Be a yardstick of quality. Some people aren&apos;t used to an environment where excellence
        is expected.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Steve Jobs</span>
        </footer>
      </BlockQuote>

      <BlockQuote variant="muted">
        Stay hungry, stay foolish.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Steve Jobs</span>
        </footer>
      </BlockQuote>

      <BlockQuote variant="destructive">
        I&apos;m as proud of what we don&apos;t do as I am of what we do.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Steve Jobs</span>
        </footer>
      </BlockQuote>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all variants are rendered
    const blockquotes = canvasElement.querySelectorAll("blockquote");
    expect(blockquotes).toHaveLength(6);

    // Test specific quotes
    expect(
      canvas.getByText(
        "Design is not just what it looks like and feels like. Design is how it works."
      )
    ).toBeInTheDocument();
    expect(
      canvas.getByText("Innovation distinguishes between a leader and a follower.")
    ).toBeInTheDocument();
    expect(canvas.getByText("Stay hungry, stay foolish.")).toBeInTheDocument();

    // Test all have Steve Jobs attribution
    const steveJobs = canvas.getAllByText("Steve Jobs");
    expect(steveJobs).toHaveLength(6);
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <BlockQuote size="sm">
        Small blockquote: Life is like riding a bicycle. To keep your balance, you must keep moving.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Albert Einstein</span>
        </footer>
      </BlockQuote>

      <BlockQuote size="base">
        Base blockquote: Imagination is more important than knowledge. Knowledge is limited.
        Imagination encircles the world.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Albert Einstein</span>
        </footer>
      </BlockQuote>

      <BlockQuote size="lg">
        Large blockquote: The true sign of intelligence is not knowledge but imagination.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Albert Einstein</span>
        </footer>
      </BlockQuote>

      <BlockQuote size="xl">
        Extra large blockquote: The world is a dangerous place to live; not because of the people
        who are evil, but because of the people who don&apos;t do anything about it.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Albert Einstein</span>
        </footer>
      </BlockQuote>
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div className="space-y-12 max-w-2xl">
      <BlockQuote styleVariant="classic">
        Classic style: The only way to do great work is to love what you do. If you haven&apos;t
        found it yet, keep looking. Don&apos;t settle.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Steve Jobs</span>
        </footer>
      </BlockQuote>

      <BlockQuote styleVariant="modern">
        Modern style: Twenty years from now you will be more disappointed by the things that you
        didn&apos;t do than by the ones you did do.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Mark Twain</span>
        </footer>
      </BlockQuote>

      <BlockQuote styleVariant="elegant">
        Elegant style: It does not matter how slowly you go as long as you do not stop.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Confucius</span>
        </footer>
      </BlockQuote>

      <BlockQuote styleVariant="minimal">
        Minimal style: Simplicity is the ultimate sophistication.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Leonardo da Vinci</span>
        </footer>
      </BlockQuote>

      <BlockQuote styleVariant="decorative">
        Decorative style: The greatest glory in living lies not in never falling, but in rising
        every time we fall.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Nelson Mandela</span>
        </footer>
      </BlockQuote>

      <BlockQuote styleVariant="glossy" shadow="md" rounded="md">
        Glossy style: The future belongs to those who believe in the beauty of their dreams.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Eleanor Roosevelt</span>
        </footer>
      </BlockQuote>
    </div>
  ),
};

export const WithAuthorAndCite: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <BlockQuote author="Leonardo da Vinci" cite="Notebooks, 1519">
        Simplicity is the ultimate sophistication.
      </BlockQuote>

      <BlockQuote
        author="Martin Luther King Jr."
        cite="Letter from Birmingham Jail, 1963"
        styleVariant="modern"
        variant="primary"
      >
        Injustice anywhere is a threat to justice everywhere. We are caught in an inescapable
        network of mutuality, tied in a single garment of destiny. Whatever affects one directly,
        affects all indirectly.
      </BlockQuote>

      <BlockQuote
        author="Maya Angelou"
        cite="I Know Why the Caged Bird Sings"
        styleVariant="elegant"
        variant="accent"
      >
        There is no greater agony than bearing an untold story inside you.
      </BlockQuote>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test authors are displayed
    expect(canvas.getByText("Leonardo da Vinci")).toBeInTheDocument();
    expect(canvas.getByText("Martin Luther King Jr.")).toBeInTheDocument();
    expect(canvas.getByText("Maya Angelou")).toBeInTheDocument();

    // Test citations are displayed
    expect(canvas.getByText("Notebooks, 1519")).toBeInTheDocument();
    expect(canvas.getByText("Letter from Birmingham Jail, 1963")).toBeInTheDocument();
    expect(canvas.getByText("I Know Why the Caged Bird Sings")).toBeInTheDocument();

    // Test quote content
    expect(canvas.getByText("Simplicity is the ultimate sophistication.")).toBeInTheDocument();
  },
};

export const WithAnimation: Story = {
  render: () => (
    <div className="space-y-12 max-w-2xl">
      <BlockQuote animation="fadeIn" styleVariant="elegant" shadow="md" rounded="md">
        FadeIn animation: Life is what happens when you&apos;re busy making other plans.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">John Lennon</span>
        </footer>
      </BlockQuote>

      <BlockQuote animation="slideIn" styleVariant="modern" shadow="md" rounded="md">
        SlideIn animation: The purpose of our lives is to be happy.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Dalai Lama</span>
        </footer>
      </BlockQuote>

      <BlockQuote animation="pulse" styleVariant="decorative" shadow="md" rounded="md">
        Pulse animation: Get busy living or get busy dying.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Stephen King</span>
        </footer>
      </BlockQuote>

      <BlockQuote animation="shimmer" styleVariant="glossy" shadow="md" rounded="md">
        Shimmer animation: You only live once, but if you do it right, once is enough.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Mae West</span>
        </footer>
      </BlockQuote>
    </div>
  ),
};

export const WithShadowAndRounded: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <BlockQuote shadow="sm" rounded="sm" styleVariant="modern">
        Shadow (sm) and Rounded (sm): Many of life&apos;s failures are people who did not realize
        how close they were to success when they gave up.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Thomas Edison</span>
        </footer>
      </BlockQuote>

      <BlockQuote shadow="md" rounded="md" styleVariant="decorative" variant="primary">
        Shadow (md) and Rounded (md): The way to get started is to quit talking and begin doing.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Walt Disney</span>
        </footer>
      </BlockQuote>

      <BlockQuote shadow="lg" rounded="lg" styleVariant="glossy" variant="secondary">
        Shadow (lg) and Rounded (lg): If life were predictable it would cease to be life, and be
        without flavor.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">Eleanor Roosevelt</span>
        </footer>
      </BlockQuote>

      <BlockQuote shadow="lg" rounded="full" styleVariant="elegant" variant="accent">
        Shadow (lg) and Rounded (full): If you set your goals ridiculously high and it&apos;s a
        failure, you will fail above everyone else&apos;s success.
        <footer className="mt-2 text-sm opacity-75">
          <span className="font-semibold">James Cameron</span>
        </footer>
      </BlockQuote>
    </div>
  ),
};

export const Featured2025Design: Story = {
  args: {
    children:
      "Innovation isn&apos;t just about creating something new—it&apos;s about creating something meaningful. The future belongs to those who find ways to blend technology with humanity.",
    author: "Artificial Intelligence Foundation",
    cite: "Annual Report, 2025",
    styleVariant: "glossy",
    variant: "primary",
    shadow: "lg",
    rounded: "lg",
    animation: "shimmer",
    size: "lg",
  },
};
