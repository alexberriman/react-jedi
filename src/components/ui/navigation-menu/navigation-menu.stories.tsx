import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "./navigation-menu";
import { cn } from "../../../lib/utils";
import { Badge } from "../badge";
import * as React from "react";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A collection of links for navigating websites",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "600px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "40px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    orientation: "horizontal",
  },

  tags: ["autodocs", "ui-navigation-menu"],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll Area",
    href: "#scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const ListItem = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, ...props }, ref) => {
    return (
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {props.children}
          </p>
        </a>
      </NavigationMenuLink>
    );
  }
);
ListItem.displayName = "ListItem";

export const Default: Story = enhanceStoryForDualMode<typeof NavigationMenu>(
  {
    render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-primary/5 to-primary/10 p-6 no-underline outline-none transition-all duration-200 hover:from-primary/10 hover:to-primary/15 focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">React Jedi</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Server-driven UI for rapid prototyping with beautiful components.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="#docs" title="Introduction">
                Build beautiful web interfaces through JSON specifications.
              </ListItem>
              <ListItem href="#docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="#docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#docs"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring/50 outline-none no-underline"
            )}
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test opening navigation menu
      const gettingStartedTrigger = await canvas.findByText("Getting Started");
      await userEvent.hover(gettingStartedTrigger);

      // Verify content appears
      await waitFor(
        () => {
          const reactJedi = canvas.getByText("React Jedi");
          expect(reactJedi).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Test navigating to Components menu
      const componentsTrigger = await canvas.findByText("Components");
      await userEvent.hover(componentsTrigger);

      // Verify component list appears
      await waitFor(
        () => {
          const alertDialog = canvas.getByText("Alert Dialog");
          expect(alertDialog).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Test direct link
      const documentationLink = await canvas.findByText("Documentation");
      expect(documentationLink).toHaveAttribute("href", "#docs");
    },
  },
  {
    renderSpec: {
      type: "navigationMenu",
      items: [
        {
          trigger: { label: "Getting Started" },
          content: {
            width: "lg",
            items: [
              {
                title: "React Jedi",
                description: "Server-driven UI for rapid prototyping with beautiful components.",
                href: "/"
              },
              {
                title: "Introduction",
                description: "Build beautiful web interfaces through JSON specifications.",
                href: "#docs"
              },
              {
                title: "Installation",
                description: "How to install dependencies and structure your app.",
                href: "#docs/installation"
              },
              {
                title: "Typography",
                description: "Styles for headings, paragraphs, lists...etc",
                href: "#docs/primitives/typography"
              }
            ]
          }
        },
        {
          trigger: { label: "Components" },
          content: {
            width: "2xl",
            items: [
              {
                title: "Alert Dialog",
                description: "A modal dialog that interrupts the user with important content and expects a response.",
                href: "#alert-dialog"
              },
              {
                title: "Hover Card",
                description: "For sighted users to preview content available behind a link.",
                href: "#hover-card"
              },
              {
                title: "Progress",
                description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
                href: "#progress"
              },
              {
                title: "Scroll Area",
                description: "Visually or semantically separates content.",
                href: "#scroll-area"
              },
              {
                title: "Tabs",
                description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
                href: "#tabs"
              },
              {
                title: "Tooltip",
                description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
                href: "#tooltip"
              }
            ]
          }
        },
        {
          trigger: { label: "Documentation" },
          href: "#docs"
        }
      ]
    }
  }
);

export const WithIconsAndBadges: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-1">
            Products{" "}
            <Badge variant="secondary" className="ml-2 h-5 px-1.5">
              New
            </Badge>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-primary/5 to-primary/10 p-6 no-underline outline-none transition-all duration-200 hover:from-primary/10 hover:to-primary/15 focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 text-4xl">🚀</div>
                    <div className="mb-2 text-lg font-medium">Featured Product</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Our most powerful development tool for modern applications.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="#product1" title="Core Platform">
                The foundation for building scalable applications
              </ListItem>
              <ListItem href="#product2" title="Developer Tools">
                Advanced tooling for rapid development
              </ListItem>
              <ListItem href="#product3" title="Cloud Services">
                Deploy and scale with confidence
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[500px] md:grid-cols-2">
              <ListItem href="#enterprise" title="🏢 Enterprise">
                Solutions for large-scale organizations
              </ListItem>
              <ListItem href="#startup" title="🚀 Startup">
                Get up and running quickly
              </ListItem>
              <ListItem href="#education" title="🎓 Education">
                Resources for students and educators
              </ListItem>
              <ListItem href="#nonprofit" title="❤️ Non-profit">
                Special programs for non-profit organizations
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#pricing"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring/50 outline-none no-underline"
            )}
          >
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test badge is visible
    const newBadge = await canvas.findByText("New");
    expect(newBadge).toBeInTheDocument();

    // Test Products menu with badge
    const productsTrigger = canvas.getByText("Products");
    await userEvent.hover(productsTrigger);

    // Verify emoji and featured product
    await waitFor(
      () => {
        const featuredProduct = canvas.getByText("Featured Product");
        expect(featuredProduct).toBeInTheDocument();
        const rocket = canvas.getByText("🚀");
        expect(rocket).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Test Solutions menu with emojis in titles
    const solutionsTrigger = await canvas.findByText("Solutions");
    await userEvent.hover(solutionsTrigger);

    await waitFor(
      () => {
        const enterprise = canvas.getByText(/Enterprise/);
        expect(enterprise).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  },
};

export const SimpleNavigation: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#home"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring/50 outline-none no-underline"
            )}
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#about"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring/50 outline-none no-underline"
            )}
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#services"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring/50 outline-none no-underline"
            )}
          >
            Services
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#contact"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring/50 outline-none no-underline"
            )}
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all simple links are present
    const homeLink = await canvas.findByText("Home");
    const aboutLink = await canvas.findByText("About");
    const servicesLink = await canvas.findByText("Services");
    const contactLink = await canvas.findByText("Contact");

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(servicesLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

    // Verify links have correct hrefs
    expect(homeLink).toHaveAttribute("href", "#home");
    expect(aboutLink).toHaveAttribute("href", "#about");
    expect(servicesLink).toHaveAttribute("href", "#services");
    expect(contactLink).toHaveAttribute("href", "#contact");
  },
};

export const WithFullWidthContent: Story = {
  render: () => (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[600px] lg:w-[800px] lg:grid-cols-3">
              <div>
                <h3 className="mb-3 text-base font-medium">Learn</h3>
                <ul className="space-y-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#tutorials"
                        className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground no-underline"
                      >
                        Tutorials
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#guides"
                        className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground no-underline"
                      >
                        Guides
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#examples"
                        className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground no-underline"
                      >
                        Examples
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-base font-medium">Community</h3>
                <ul className="space-y-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#forums"
                        className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground no-underline"
                      >
                        Forums
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#discord"
                        className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground no-underline"
                      >
                        Discord
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#github"
                        className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground no-underline"
                      >
                        GitHub
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-base font-medium">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#help"
                        className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground no-underline"
                      >
                        Help Center
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#contact"
                        className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground no-underline"
                      >
                        Contact Support
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="#status"
                        className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground no-underline"
                      >
                        Status
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#blog"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring/50 outline-none no-underline"
            )}
          >
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open Resources menu
    const resourcesTrigger = await canvas.findByText("Resources");
    await userEvent.hover(resourcesTrigger);

    // Verify categories are displayed
    await waitFor(
      () => {
        expect(canvas.getByText("Learn")).toBeInTheDocument();
        expect(canvas.getByText("Community")).toBeInTheDocument();
        expect(canvas.getByText("Support")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Verify subcategory links
    expect(canvas.getByText("Tutorials")).toBeInTheDocument();
    expect(canvas.getByText("Discord")).toBeInTheDocument();
    expect(canvas.getByText("Help Center")).toBeInTheDocument();
  },
};

export const WithBrandingAndCTA: Story = {
  render: () => (
    <div className="flex w-full items-center justify-between px-8">
      <div className="flex items-center space-x-6">
        <div className="text-2xl font-bold">ACME</div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-blue-500/5 to-blue-500/10 p-6 no-underline outline-none transition-all duration-200 hover:from-blue-500/10 hover:to-blue-500/15 focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 text-4xl">⚡</div>
                        <div className="mb-2 text-lg font-medium">ACME Pro</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          The ultimate toolkit for modern development.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="#cloud" title="Cloud">
                    Scalable infrastructure for your apps
                  </ListItem>
                  <ListItem href="#edge" title="Edge">
                    Deploy to the edge in seconds
                  </ListItem>
                  <ListItem href="#analytics" title="Analytics">
                    Real-time insights for your business
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#pricing"
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
                )}
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#docs"
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
                )}
              >
                Docs
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-sm font-medium cursor-pointer transition-colors duration-200 hover:text-primary">
          Sign In
        </button>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground cursor-pointer transition-all duration-200 hover:bg-primary/90 hover:shadow-md">
          Get Started
        </button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify branding
    const brand = await canvas.findByText("ACME");
    expect(brand).toBeInTheDocument();

    // Test navigation
    const productsTrigger = await canvas.findByText("Products");
    await userEvent.hover(productsTrigger);

    await waitFor(
      () => {
        const acmePro = canvas.getByText("ACME Pro");
        expect(acmePro).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Verify CTA buttons
    const signInButton = canvas.getByText("Sign In");
    const getStartedButton = canvas.getByText("Get Started");

    expect(signInButton).toBeInTheDocument();
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveClass("bg-primary");
  },
};
