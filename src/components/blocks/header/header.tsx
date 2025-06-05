import * as React from "react";
import { cn, omit } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuIndicator } from "../../ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../../ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { Menu, ChevronDown, Moon, Sun, LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

export interface HeaderLogoProperties {
  type: "image" | "text";
  src?: string;
  alt?: string;
  text?: string;
  href?: string;
  height?: number | string;
  width?: number | string;
}

export interface HeaderNavigationItem {
  label: string;
  href?: string;
  description?: string;
  icon?: LucideIcon | string;
  items?: Array<{
    label: string;
    href: string;
    description?: string;
    icon?: LucideIcon | string;
  }>;
}

export interface HeaderAction {
  label: string;
  href?: string;
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
}

export interface HeaderProperties {
  logo?: HeaderLogoProperties;
  navigation?: HeaderNavigationItem[];
  actions?: HeaderAction[];
  showDarkModeToggle?: boolean;
  sticky?: boolean;
  variant?: "default" | "minimal" | "centered" | "split";
  className?: string;
  animated?: boolean;
  backgroundColor?: string;
  blur?: boolean;
  shadow?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  height?: "sm" | "md" | "lg";
  mobileTriggerIcon?: "menu" | "dots";
  // React Jedi specific props that should not be passed to DOM
  readonly parentContext?: Record<string, unknown>;
  readonly spec?: import("@/types/schema/components").ComponentSpec;
  readonly theme?: Record<string, unknown>;
  readonly state?: Record<string, unknown>;
  readonly conditionalProps?: Record<string, unknown>;
  readonly computedProps?: Record<string, unknown>;
  readonly when?: string | boolean;
  readonly eventActions?: Record<string, unknown>;
}

// Helper function to render icons
function renderIcon(icon: LucideIcon | string | undefined): React.ReactNode {
  if (!icon) return null;
  
  if (typeof icon === "string" && icon in Icons) {
    const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon;
    return <IconComponent className="h-4 w-4" />;
  }
  
  if (typeof icon === "function") {
    const IconComponent = icon as LucideIcon;
    return <IconComponent className="h-4 w-4" />;
  }
  
  return null;
}

// Dark Mode Toggle Component (simplified for the header)
function DarkModeToggle({ size = "default" }: { readonly size?: "default" | "sm" }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button
      variant="ghost"
      size={size === "sm" ? "sm" : "icon"}
      onClick={toggleTheme}
      className={cn("transition-colors", size === "sm" && "h-8 w-8")}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}

// Mobile Navigation Component
function MobileNavigation({
  navigation,
  actions,
  showDarkModeToggle,
  logo,
  triggerIcon = "menu",
}: {
  readonly navigation?: HeaderNavigationItem[];
  readonly actions?: HeaderAction[];
  readonly showDarkModeToggle?: boolean;
  readonly logo?: HeaderLogoProperties;
  readonly triggerIcon?: "menu" | "dots";
}) {
  const [open, setOpen] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleNavClick = () => {
    setOpen(false);
    setExpandedItems([]);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Toggle menu">
          {triggerIcon === "menu" ? (
            <Menu className="h-5 w-5" />
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">Mobile navigation menu</SheetDescription>
        
        <div className="flex flex-col gap-6 mt-6">
          {/* Logo in mobile menu */}
          {logo && (
            <div className="px-2">
              {logo.type === "text" ? (
                <div className="text-xl font-bold">{logo.text}</div>
              ) : (
                <img
                  src={logo.src}
                  alt={logo.alt || "Logo"}
                  className="h-8"
                />
              )}
            </div>
          )}

          {/* Navigation items */}
          {navigation && navigation.length > 0 && (
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <div key={item.label}>
                  {item.items ? (
                    <Collapsible
                      open={expandedItems.includes(item.label)}
                      onOpenChange={() => toggleExpanded(item.label)}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-left hover:bg-accent rounded-md transition-colors cursor-pointer">
                        <span className="font-medium no-underline">{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedItems.includes(item.label) && "rotate-180"
                          )}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1">
                        {item.items.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors no-underline cursor-pointer"
                            onClick={handleNavClick}
                          >
                            <div className="flex items-start gap-3">
                              {subItem.icon && renderIcon(subItem.icon)}
                              <div className="flex-1">
                                <span className="block">{subItem.label}</span>
                                {subItem.description && (
                                  <span className="block text-xs text-muted-foreground mt-1">
                                    {subItem.description}
                                  </span>
                                )}
                              </div>
                            </div>
                          </a>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-3 py-2 font-medium hover:bg-accent rounded-md transition-colors no-underline cursor-pointer"
                      onClick={handleNavClick}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Actions */}
          {actions && actions.length > 0 && (
            <div className="flex flex-col gap-2 pt-4 border-t">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant ?? "default"}
                  size={action.size ?? "default"}
                  className="w-full justify-center"
                  onClick={() => {
                    if (action.onClick) action.onClick();
                    if (action.href) globalThis.location.href = action.href;
                    handleNavClick();
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}

          {/* Dark mode toggle */}
          {showDarkModeToggle && (
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between px-3">
                <span className="text-sm font-medium">Dark Mode</span>
                <DarkModeToggle size="sm" />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Main Header Component
export function Header({
  logo,
  navigation = [],
  actions: actionsProp = [],
  showDarkModeToggle = false,
  sticky = false,
  variant = "default",
  className,
  animated = true,
  backgroundColor,
  blur = true,
  shadow = true,
  maxWidth = "xl",
  height = "md",
  mobileTriggerIcon = "menu",
  ...props
}: Readonly<HeaderProperties>) {
  const cleanProps = omit(props, [
    "parentContext",
    "spec",
    "theme",
    "state",
    "conditionalProps",
    "computedProps",
    "when",
    "eventActions",
  ]);

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sticky]);

  const heightClasses = {
    sm: "h-14",
    md: "h-16",
    lg: "h-20",
  };

  const maxWidthClasses = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
    "2xl": "max-w-7xl",
    full: "max-w-full",
  };

  const variantClasses = {
    default: "justify-between",
    minimal: "justify-between",
    centered: "justify-center",
    split: "justify-between",
  };

  const headerClasses = cn(
    "w-full border-b transition-all",
    sticky && "sticky top-0 z-50",
    blur && sticky && "backdrop-blur-md",
    shadow && isScrolled && sticky && "shadow-sm",
    backgroundColor || "bg-background/95",
    animated && "duration-300 ease-in-out",
    heightClasses[height],
    className
  );

  const containerClasses = cn(
    "mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center",
    maxWidthClasses[maxWidth],
    variantClasses[variant]
  );

  const renderLogo = () => {
    if (!logo) return null;

    const logoElement = logo.type === "text" ? (
      <span className="text-xl font-bold">{logo.text}</span>
    ) : (
      <img
        src={logo.src}
        alt={logo.alt || "Logo"}
        height={logo.height}
        width={logo.width}
        className="h-8 w-auto"
      />
    );

    return logo.href ? (
      <a href={logo.href} className="flex items-center">
        {logoElement}
      </a>
    ) : (
      <div className="flex items-center">{logoElement}</div>
    );
  };

  const renderNavigation = () => {
    if (!navigation || navigation.length === 0) return null;

    return (
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          {navigation.map((item) => (
            <NavigationMenuItem key={item.label}>
              {item.items ? (
                <>
                  <NavigationMenuTrigger className="data-[state=open]:bg-accent/50">
                    <span className="flex items-center gap-2">
                      {item.icon && renderIcon(item.icon)}
                      {item.label}
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.items.map((subItem) => (
                        <li key={subItem.label}>
                          <NavigationMenuLink asChild>
                            <a
                              href={subItem.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            >
                              <div className="flex items-start gap-3">
                                {subItem.icon && <div className="mt-0.5">{renderIcon(subItem.icon)}</div>}
                                <div className="flex-1">
                                  <div className="text-sm font-medium leading-none">
                                    {subItem.label}
                                  </div>
                                  {subItem.description && (
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                      {subItem.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <a
                    href={item.href}
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 no-underline cursor-pointer"
                  >
                    <span className="flex items-center gap-2 no-underline">
                      {item.icon && renderIcon(item.icon)}
                      {item.label}
                    </span>
                  </a>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
          <NavigationMenuIndicator />
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  const renderActions = () => {
    if (actionsProp.length === 0 && !showDarkModeToggle) return null;

    return (
      <div className="flex items-center gap-2">
        {showDarkModeToggle && (
          <div className="hidden lg:block">
            <DarkModeToggle />
          </div>
        )}
        {actionsProp.map((action, index) => (
          <Button
            key={index}
            variant={action.variant ?? "default"}
            size={action.size ?? "default"}
            className="hidden lg:inline-flex"
            onClick={() => {
              if (action.onClick) action.onClick();
              if (action.href) globalThis.location.href = action.href;
            }}
          >
            {action.label}
          </Button>
        ))}
        <MobileNavigation
          navigation={navigation}
          actions={actionsProp}
          showDarkModeToggle={showDarkModeToggle}
          logo={logo}
          triggerIcon={mobileTriggerIcon}
        />
      </div>
    );
  };

  // Render based on variant
  const renderContent = () => {
    switch (variant) {
      case "minimal": {
        return (
          <>
            <div className="flex items-center gap-8">
              {renderLogo()}
            </div>
            {renderActions()}
          </>
        );
      }

      case "centered": {
        return (
          <>
            <div className="lg:flex-1">
              {renderLogo()}
            </div>
            <div className="flex items-center justify-center flex-1">
              {renderNavigation()}
            </div>
            <div className="lg:flex-1 flex justify-end">
              {renderActions()}
            </div>
          </>
        );
      }

      case "split": {
        return (
          <>
            <div className="flex items-center gap-8">
              {renderLogo()}
              {renderNavigation()}
            </div>
            {renderActions()}
          </>
        );
      }

      default: {
        return (
          <>
            {renderLogo()}
            {renderNavigation()}
            {renderActions()}
          </>
        );
      }
    }
  };

  return (
    <header data-slot="header" className={headerClasses} {...cleanProps}>
      <div className={containerClasses}>{renderContent()}</div>
    </header>
  );
}

Header.displayName = "Header";