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

// Sample logos for demonstration
const sampleLogos = [
  {
    id: "1",
    name: "Vercel",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg",
    href: "https://vercel.com",
  },
  {
    id: "2",
    name: "React",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/react.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/react.svg",
    href: "https://react.dev",
  },
  {
    id: "3",
    name: "TypeScript",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/typescript.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/typescript.svg",
    href: "https://www.typescriptlang.org",
  },
  {
    id: "4",
    name: "Tailwind CSS",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tailwindcss.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tailwindcss.svg",
    href: "https://tailwindcss.com",
  },
  {
    id: "5",
    name: "Vite",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vite.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vite.svg",
    href: "https://vitejs.dev",
  },
  {
    id: "6",
    name: "Next.js",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nextdotjs.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nextdotjs.svg",
    href: "https://nextjs.org",
  },
];

const enterpriseLogos = [
  {
    id: "e1",
    name: "Microsoft",
    lightSrc: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    href: "https://microsoft.com",
    width: 140,
    height: 30,
  },
  {
    id: "e2",
    name: "Google",
    lightSrc: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    href: "https://google.com",
    width: 120,
    height: 40,
  },
  {
    id: "e3",
    name: "Amazon",
    lightSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    href: "https://amazon.com",
    width: 130,
    height: 40,
  },
  {
    id: "e4",
    name: "Apple",
    lightSrc: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    darkSrc: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    href: "https://apple.com",
    width: 50,
    height: 60,
  },
  {
    id: "e5",
    name: "Meta",
    lightSrc: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
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
    size: "medium",
    spacing: "normal",
    columns: 3,
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