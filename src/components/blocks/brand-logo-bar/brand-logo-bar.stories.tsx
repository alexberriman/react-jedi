import type { Meta, StoryObj } from "@storybook/react";
import { BrandLogoBar } from "./brand-logo-bar";

const meta = {
  title: "Blocks/BrandLogoBar",
  component: BrandLogoBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["scrolling", "grid", "withHeading", "grayscale", "compact"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    spacing: {
      control: "select",
      options: ["tight", "normal", "loose"],
    },
    columns: {
      control: "select",
      options: [2, 3, 4, 5, 6],
    },
  },
} satisfies Meta<typeof BrandLogoBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample logos for demonstration using picsum.photos placeholders
const sampleLogos = [
  {
    id: "1",
    name: "Vercel",
    lightSrc: "https://picsum.photos/120/60?random=1",
    darkSrc: "https://picsum.photos/120/60?random=1&grayscale",
    href: "https://vercel.com",
  },
  {
    id: "2",
    name: "React",
    lightSrc: "https://picsum.photos/120/60?random=2",
    darkSrc: "https://picsum.photos/120/60?random=2&grayscale",
    href: "https://react.dev",
  },
  {
    id: "3",
    name: "TypeScript",
    lightSrc: "https://picsum.photos/120/60?random=3",
    darkSrc: "https://picsum.photos/120/60?random=3&grayscale",
    href: "https://www.typescriptlang.org",
  },
  {
    id: "4",
    name: "Tailwind CSS",
    lightSrc: "https://picsum.photos/120/60?random=4",
    darkSrc: "https://picsum.photos/120/60?random=4&grayscale",
    href: "https://tailwindcss.com",
  },
  {
    id: "5",
    name: "Vite",
    lightSrc: "https://picsum.photos/120/60?random=5",
    darkSrc: "https://picsum.photos/120/60?random=5&grayscale",
    href: "https://vitejs.dev",
  },
  {
    id: "6",
    name: "Next.js",
    lightSrc: "https://picsum.photos/120/60?random=6",
    darkSrc: "https://picsum.photos/120/60?random=6&grayscale",
    href: "https://nextjs.org",
  },
];

const enterpriseLogos = [
  {
    id: "e1",
    name: "Microsoft",
    lightSrc: "https://picsum.photos/140/30?random=7",
    darkSrc: "https://picsum.photos/140/30?random=7&grayscale",
    href: "https://microsoft.com",
    width: 140,
    height: 30,
  },
  {
    id: "e2",
    name: "Google",
    lightSrc: "https://picsum.photos/120/40?random=8",
    darkSrc: "https://picsum.photos/120/40?random=8&grayscale",
    href: "https://google.com",
    width: 120,
    height: 40,
  },
  {
    id: "e3",
    name: "Amazon",
    lightSrc: "https://picsum.photos/130/40?random=9",
    darkSrc: "https://picsum.photos/130/40?random=9&grayscale",
    href: "https://amazon.com",
    width: 130,
    height: 40,
  },
  {
    id: "e4",
    name: "Apple",
    lightSrc: "https://picsum.photos/50/60?random=10",
    darkSrc: "https://picsum.photos/50/60?random=10&grayscale",
    href: "https://apple.com",
    width: 50,
    height: 60,
  },
  {
    id: "e5",
    name: "Meta",
    lightSrc: "https://picsum.photos/140/30?random=11",
    darkSrc: "https://picsum.photos/140/30?random=11&grayscale",
    href: "https://meta.com",
    width: 140,
    height: 30,
  },
];

export const Default: Story = {
  args: {
    logos: sampleLogos,
    variant: "grid",
    size: "medium",
    spacing: "normal",
    columns: 4,
  },
};

export const ScrollingMarquee: Story = {
  args: {
    logos: sampleLogos,
    variant: "scrolling",
    size: "medium",
    spacing: "normal",
    pauseOnHover: true,
    scrollSpeed: 30,
  },
};

export const WithHeading: Story = {
  args: {
    logos: sampleLogos,
    variant: "withHeading",
    heading: "Trusted by Industry Leaders",
    headingPosition: "above",
    size: "medium",
    spacing: "normal",
    columns: 3,
  },
};

export const WithHeadingLeft: Story = {
  args: {
    logos: sampleLogos.slice(0, 4),
    variant: "withHeading",
    heading: "Trusted by",
    headingPosition: "left",
    size: "medium",
    spacing: "normal",
    columns: 4,
  },
};

export const Grayscale: Story = {
  args: {
    logos: sampleLogos,
    variant: "grayscale",
    size: "medium",
    spacing: "normal",
    columns: 4,
  },
};

export const Compact: Story = {
  args: {
    logos: sampleLogos,
    variant: "compact",
    size: "small",
    spacing: "tight",
    columns: 6,
  },
};

export const LargeGrid: Story = {
  args: {
    logos: enterpriseLogos,
    variant: "grid",
    size: "large",
    spacing: "loose",
    columns: 3,
  },
};

export const FastScrolling: Story = {
  args: {
    logos: [...sampleLogos, ...enterpriseLogos],
    variant: "scrolling",
    size: "medium",
    spacing: "normal",
    scrollSpeed: 15,
    pauseOnHover: true,
  },
};

export const TwoColumn: Story = {
  args: {
    logos: sampleLogos.slice(0, 4),
    variant: "grid",
    size: "large",
    spacing: "loose",
    columns: 2,
  },
};

export const GrayscaleWithHeading: Story = {
  args: {
    logos: enterpriseLogos,
    variant: "grayscale",
    heading: "Powering the World's Best Companies",
    headingPosition: "above",
    size: "medium",
    spacing: "normal",
    columns: 5,
  },
};

export const NoAnimation: Story = {
  args: {
    logos: sampleLogos,
    variant: "scrolling",
    size: "medium",
    spacing: "normal",
    animated: false,
  },
};

export const MobileOptimized: Story = {
  args: {
    logos: sampleLogos,
    variant: "grid",
    size: "small",
    spacing: "tight",
    columns: 3,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const DarkMode: Story = {
  args: {
    logos: sampleLogos,
    variant: "grayscale",
    size: "medium",
    spacing: "normal",
    columns: 4,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};