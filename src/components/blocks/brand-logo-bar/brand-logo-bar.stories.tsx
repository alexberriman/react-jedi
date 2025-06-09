import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { BrandLogoBar } from "./brand-logo-bar";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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

// Sample logos for demonstration using placehold.co placeholders
const sampleLogos = [
  {
    id: "1",
    name: "Vercel",
    lightSrc: "https://placehold.co/120x60/EEE/31343C?random=1",
    darkSrc: "https://placehold.co/120x60/EEE/31343C?random=1&grayscale",
    href: "https://vercel.com",
  },
  {
    id: "2",
    name: "React",
    lightSrc: "https://placehold.co/120x60/EEE/31343C?random=2",
    darkSrc: "https://placehold.co/120x60/EEE/31343C?random=2&grayscale",
    href: "https://react.dev",
  },
  {
    id: "3",
    name: "TypeScript",
    lightSrc: "https://placehold.co/120x60/EEE/31343C?random=3",
    darkSrc: "https://placehold.co/120x60/EEE/31343C?random=3&grayscale",
    href: "https://www.typescriptlang.org",
  },
  {
    id: "4",
    name: "Tailwind CSS",
    lightSrc: "https://placehold.co/120x60/EEE/31343C?random=4",
    darkSrc: "https://placehold.co/120x60/EEE/31343C?random=4&grayscale",
    href: "https://tailwindcss.com",
  },
  {
    id: "5",
    name: "Vite",
    lightSrc: "https://placehold.co/120x60/EEE/31343C?random=5",
    darkSrc: "https://placehold.co/120x60/EEE/31343C?random=5&grayscale",
    href: "https://vitejs.dev",
  },
  {
    id: "6",
    name: "Next.js",
    lightSrc: "https://placehold.co/120x60/EEE/31343C?random=6",
    darkSrc: "https://placehold.co/120x60/EEE/31343C?random=6&grayscale",
    href: "https://nextjs.org",
  },
];

const enterpriseLogos = [
  {
    id: "e1",
    name: "Microsoft",
    lightSrc: "https://placehold.co/140x30/EEE/31343C?random=7",
    darkSrc: "https://placehold.co/140x30/EEE/31343C?random=7&grayscale",
    href: "https://microsoft.com",
    width: 140,
    height: 30,
  },
  {
    id: "e2",
    name: "Google",
    lightSrc: "https://placehold.co/120x40/EEE/31343C?random=8",
    darkSrc: "https://placehold.co/120x40/EEE/31343C?random=8&grayscale",
    href: "https://google.com",
    width: 120,
    height: 40,
  },
  {
    id: "e3",
    name: "Amazon",
    lightSrc: "https://placehold.co/130x40/EEE/31343C?random=9",
    darkSrc: "https://placehold.co/130x40/EEE/31343C?random=9&grayscale",
    href: "https://amazon.com",
    width: 130,
    height: 40,
  },
  {
    id: "e4",
    name: "Apple",
    lightSrc: "https://placehold.co/50x60/EEE/31343C?random=10",
    darkSrc: "https://placehold.co/50x60/EEE/31343C?random=10&grayscale",
    href: "https://apple.com",
    width: 50,
    height: 60,
  },
  {
    id: "e5",
    name: "Meta",
    lightSrc: "https://placehold.co/140x30/EEE/31343C?random=11",
    darkSrc: "https://placehold.co/140x30/EEE/31343C?random=11&grayscale",
    href: "https://meta.com",
    width: 140,
    height: 30,
  },
];

export const Default: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
  args: {
    logos: sampleLogos,
    variant: "grid",
    size: "medium",
    spacing: "normal",
    columns: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test logos render correctly
    for (const logo of sampleLogos) {
      const logoElement = canvas.getByAltText(logo.name);
      expect(logoElement).toBeInTheDocument();
    }
    
    // Test grid layout is applied
    const container = canvasElement.querySelector('.grid');
    expect(container).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: sampleLogos,
    variant: "grid",
    size: "medium",
    spacing: "normal",
    columns: 4,
  }
}) as Story;

export const ScrollingMarquee: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
  args: {
    logos: sampleLogos,
    variant: "scrolling",
    size: "medium",
    spacing: "normal",
    pauseOnHover: true,
    scrollSpeed: 30,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test logos render in scrolling mode
    // Logos are duplicated for scrolling effect
    const logoElements = canvas.getAllByAltText(sampleLogos[0].name);
    expect(logoElements.length).toBeGreaterThan(1);
    
    // Test scrolling container exists
    const scrollContainer = canvasElement.querySelector('.overflow-hidden');
    expect(scrollContainer).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: sampleLogos,
    variant: "scrolling",
    size: "medium",
    spacing: "normal",
    pauseOnHover: true,
    scrollSpeed: 30,
  }
}) as Story;

export const WithHeading: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
  args: {
    logos: sampleLogos,
    variant: "withHeading",
    heading: "Trusted by Industry Leaders",
    headingPosition: "above",
    size: "medium",
    spacing: "normal",
    columns: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test heading renders
    const heading = canvas.getByText("Trusted by Industry Leaders");
    expect(heading).toBeInTheDocument();
    
    // Test logos render
    for (const logo of sampleLogos) {
      const logoElement = canvas.getByAltText(logo.name);
      expect(logoElement).toBeInTheDocument();
    }
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: sampleLogos,
    variant: "withHeading",
    heading: "Trusted by Industry Leaders",
    headingPosition: "above",
    size: "medium",
    spacing: "normal",
    columns: 3,
  }
}) as Story;

export const WithHeadingLeft: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
  args: {
    logos: sampleLogos.slice(0, 4),
    variant: "withHeading",
    heading: "Trusted by",
    headingPosition: "left",
    size: "medium",
    spacing: "normal",
    columns: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test heading renders
    const heading = canvas.getByText("Trusted by");
    expect(heading).toBeInTheDocument();
    
    // Test only 4 logos render
    const logoElements = canvas.getAllByRole('img');
    expect(logoElements).toHaveLength(4);
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: sampleLogos.slice(0, 4),
    variant: "withHeading",
    heading: "Trusted by",
    headingPosition: "left",
    size: "medium",
    spacing: "normal",
    columns: 4,
  }
}) as Story;

export const Grayscale: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
  args: {
    logos: sampleLogos,
    variant: "grayscale",
    size: "medium",
    spacing: "normal",
    columns: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test logos render
    for (const logo of sampleLogos) {
      const logoElement = canvas.getByAltText(logo.name);
      expect(logoElement).toBeInTheDocument();
    }
    
    // Test grayscale class is applied
    const grayscaleElements = canvasElement.querySelectorAll('.grayscale');
    expect(grayscaleElements.length).toBeGreaterThan(0);
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: sampleLogos,
    variant: "grayscale",
    size: "medium",
    spacing: "normal",
    columns: 4,
  }
}) as Story;

export const Compact: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
  args: {
    logos: sampleLogos,
    variant: "compact",
    size: "small",
    spacing: "tight",
    columns: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test all logos render
    for (const logo of sampleLogos) {
      const logoElement = canvas.getByAltText(logo.name);
      expect(logoElement).toBeInTheDocument();
    }
    
    // Test compact padding is applied
    const compactElements = canvasElement.querySelectorAll('.p-2');
    expect(compactElements.length).toBeGreaterThan(0);
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: sampleLogos,
    variant: "compact",
    size: "small",
    spacing: "tight",
    columns: 6,
  }
}) as Story;

export const LargeGrid: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
  args: {
    logos: enterpriseLogos,
    variant: "grid",
    size: "large",
    spacing: "loose",
    columns: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test enterprise logos render
    for (const logo of enterpriseLogos) {
      const logoElement = canvas.getByAltText(logo.name);
      expect(logoElement).toBeInTheDocument();
    }
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: enterpriseLogos,
    variant: "grid",
    size: "large",
    spacing: "loose",
    columns: 3,
  }
}) as Story;

export const FastScrolling: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
  args: {
    logos: [...sampleLogos, ...enterpriseLogos],
    variant: "scrolling",
    size: "medium",
    spacing: "normal",
    scrollSpeed: 15,
    pauseOnHover: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test combined logos render (duplicated for scrolling)
    const firstLogo = canvas.getAllByAltText(sampleLogos[0].name);
    expect(firstLogo.length).toBeGreaterThan(1);
    
    const enterpriseLogo = canvas.getAllByAltText(enterpriseLogos[0].name);
    expect(enterpriseLogo.length).toBeGreaterThan(1);
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: [...sampleLogos, ...enterpriseLogos],
    variant: "scrolling",
    size: "medium",
    spacing: "normal",
    scrollSpeed: 15,
    pauseOnHover: true,
  }
}) as Story;

export const TwoColumn: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
  args: {
    logos: sampleLogos.slice(0, 4),
    variant: "grid",
    size: "large",
    spacing: "loose",
    columns: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test only 4 logos render
    const logoElements = canvas.getAllByRole('img');
    expect(logoElements).toHaveLength(4);
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: sampleLogos.slice(0, 4),
    variant: "grid",
    size: "large",
    spacing: "loose",
    columns: 2,
  }
}) as Story;

export const GrayscaleWithHeading: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
  args: {
    logos: enterpriseLogos,
    variant: "grayscale",
    heading: "Powering the World's Best Companies",
    headingPosition: "above",
    size: "medium",
    spacing: "normal",
    columns: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test heading renders
    const heading = canvas.getByText("Powering the World's Best Companies");
    expect(heading).toBeInTheDocument();
    
    // Test grayscale logos render
    for (const logo of enterpriseLogos) {
      const logoElement = canvas.getByAltText(logo.name);
      expect(logoElement).toBeInTheDocument();
    }
    
    // Test grayscale class is applied
    const grayscaleElements = canvasElement.querySelectorAll('.grayscale');
    expect(grayscaleElements.length).toBeGreaterThan(0);
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: enterpriseLogos,
    variant: "grayscale",
    heading: "Powering the World's Best Companies",
    headingPosition: "above",
    size: "medium",
    spacing: "normal",
    columns: 5,
  }
}) as Story;

export const NoAnimation: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
  args: {
    logos: sampleLogos,
    variant: "scrolling",
    size: "medium",
    spacing: "normal",
    animated: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test logos render without animation
    for (const logo of sampleLogos.slice(0, 3)) {
      const logoElements = canvas.getAllByAltText(logo.name);
      expect(logoElements.length).toBeGreaterThan(0);
    }
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: sampleLogos,
    variant: "scrolling",
    size: "medium",
    spacing: "normal",
    animated: false,
  }
}) as Story;

export const MobileOptimized: Story = enhanceStoryForDualMode<typeof BrandLogoBar>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test logos render in mobile view
    for (const logo of sampleLogos) {
      const logoElement = canvas.getByAltText(logo.name);
      expect(logoElement).toBeInTheDocument();
    }
  },
}, {
  renderSpec: {
    type: "BrandLogoBar",
    logos: sampleLogos,
    variant: "grid",
    size: "small",
    spacing: "tight",
    columns: 3,
  }
}) as Story;

export const DarkMode: Story = enhanceStoryForDualMode<typeof BrandLogoBar>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test logos render in dark mode
      for (const logo of sampleLogos) {
        const logoElement = canvas.getByAltText(logo.name);
        expect(logoElement).toBeInTheDocument();
      }
      
      // Test dark mode wrapper is applied
      const darkWrapper = canvasElement.querySelector('.dark');
      expect(darkWrapper).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "dark",
      children: {
        type: "BrandLogoBar",
        logos: sampleLogos,
        variant: "grayscale",
        size: "medium",
        spacing: "normal",
        columns: 4,
      },
    },
  }
) as Story;
