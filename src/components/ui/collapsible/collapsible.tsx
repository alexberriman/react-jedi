import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";
import { cn, cleanDOMProps } from "../../../lib/utils";
import "./collapsible.css";

function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const cleanProps = cleanDOMProps(props);
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...cleanProps} />;
}

function CollapsibleTrigger({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  const cleanProps = cleanDOMProps(props);
  const ref = React.useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = React.useState(false);
  
  // Remove no-transition class after mount to enable hover effects
  React.useEffect(() => {
    setMounted(true);
    const timeout = globalThis.setTimeout(() => {
      if (ref.current) {
        ref.current.classList.remove("collapsible-trigger-no-initial-transition");
      }
    }, 100);
    return () => globalThis.clearTimeout(timeout);
  }, []);
  
  return (
    <CollapsiblePrimitive.CollapsibleTrigger 
      ref={ref}
      data-slot="collapsible-trigger" 
      className={cn(!mounted && "collapsible-trigger-no-initial-transition", className)}
      {...cleanProps} 
    />
  );
}

interface CollapsibleContentProps extends React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> {
  readonly animated?: boolean;
}

function CollapsibleContent({
  className,
  animated = true,
  ...props
}: CollapsibleContentProps) {
  const cleanProps = cleanDOMProps(props);
  
  if (!animated) {
    return (
      <CollapsiblePrimitive.CollapsibleContent 
        data-slot="collapsible-content" 
        className={cn("collapsible-content-no-initial-transition", className)}
        {...cleanProps} 
      />
    );
  }
  
  return (
    <CollapsiblePrimitive.CollapsibleContent asChild {...cleanProps}>
      <motion.div
        data-slot="collapsible-content"
        className={cn("collapsible-content-no-initial-transition overflow-hidden", className)}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: "auto", 
          opacity: 1,
          transition: {
            height: {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            },
            opacity: {
              duration: 0.25,
              ease: "easeOut"
            }
          }
        }}
        exit={{ 
          height: 0, 
          opacity: 0,
          transition: {
            height: {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            },
            opacity: {
              duration: 0.2,
              ease: "easeIn"
            }
          }
        }}
      />
    </CollapsiblePrimitive.CollapsibleContent>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
export type { CollapsibleContentProps };
