import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";

import { cn, cleanDOMProps } from "../../../lib/utils";

export interface TabsProperties extends React.ComponentProps<typeof TabsPrimitive.Root> {
  readonly animate?: boolean;
}

const TabsContext = React.createContext<{ animate: boolean }>({ animate: true });

function Tabs({ className, animate = true, ...props }: Readonly<TabsProperties>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <TabsContext.Provider value={{ animate }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-3", className)}
        {...cleanProps}
      />
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof TabsPrimitive.List>>) {
  const cleanProps = cleanDOMProps(props);
  const [activeTab, setActiveTab] = React.useState<HTMLElement | null>(null);
  const [indicatorPosition, setIndicatorPosition] = React.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const { animate } = React.useContext(TabsContext);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateIndicator = () => {
      if (!listRef.current) return;
      
      const activeElement = listRef.current.querySelector('[data-state="active"]') as HTMLElement;
      if (activeElement) {
        setActiveTab(activeElement);
        const listRect = listRef.current.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        
        setIndicatorPosition({
          left: activeRect.left - listRect.left,
          top: activeRect.top - listRect.top,
          width: activeRect.width,
          height: activeRect.height,
        });
      }
    };

    updateIndicator();
    const observer = new MutationObserver(updateIndicator);
    
    if (listRef.current) {
      observer.observe(listRef.current, {
        attributes: true,
        attributeFilter: ["data-state"],
        subtree: true,
      });
    }

    window.addEventListener("resize", updateIndicator);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, []);

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        "relative inline-flex h-auto w-fit items-center justify-start rounded-xl bg-gray-100/50 dark:bg-gray-800/50 p-1 text-gray-600 dark:text-gray-400 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50",
        className
      )}
      {...cleanProps}
    >
      {animate && activeTab && (
        <motion.div
          className="absolute bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50"
          initial={false}
          animate={{
            left: indicatorPosition.left,
            top: indicatorPosition.top,
            width: indicatorPosition.width,
            height: indicatorPosition.height,
          }}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.4,
          }}
        />
      )}
      {props.children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof TabsPrimitive.Trigger>>) {
  const cleanProps = cleanDOMProps(props);
  const { animate } = React.useContext(TabsContext);
  
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        "data-[state=active]:text-foreground data-[state=active]:font-semibold",
        "data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400",
        "hover:text-foreground/80",
        animate && "transition-colors duration-200",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...cleanProps}
    />
  );
}

function TabsContent({
  className,
  value,
  ...props
}: Readonly<React.ComponentProps<typeof TabsPrimitive.Content>>) {
  const cleanProps = cleanDOMProps(props);
  const { animate } = React.useContext(TabsContext);
  
  const content = (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      value={value}
      className={cn("flex-1 outline-none mt-2", className)}
      {...cleanProps}
    />
  );

  if (!animate) {
    return content;
  }

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      value={value}
      className={cn("flex-1 outline-none mt-2", className)}
      {...cleanProps}
      asChild
    >
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          opacity: { duration: 0.15 },
          y: { type: "spring", stiffness: 300, damping: 30, duration: 0.15 }
        }}
      >
        {props.children}
      </motion.div>
    </TabsPrimitive.Content>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
