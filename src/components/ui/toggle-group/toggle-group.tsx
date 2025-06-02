import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn, cleanDOMProps } from "../../../lib/utils";
import { toggleVariants } from "../toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

// Base props that are common to both single and multiple variants
type ToggleGroupBaseProps = VariantProps<typeof toggleVariants> & {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  rovingFocus?: boolean;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  loop?: boolean;
};

// Single selection variant props - either type or selectionType can specify "single"
type ToggleGroupSingleProps = ToggleGroupBaseProps & (
  | {
      selectionType?: "single";
      type?: never;
      value?: string;
      defaultValue?: string;
      onValueChange?: (value: string) => void;
    }
  | {
      selectionType?: never;
      type?: "single";
      value?: string;
      defaultValue?: string;
      onValueChange?: (value: string) => void;
    }
);

// Multiple selection variant props - either type or selectionType must specify "multiple"
type ToggleGroupMultipleProps = ToggleGroupBaseProps & (
  | {
      selectionType: "multiple";
      type?: never;
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
    }
  | {
      selectionType?: never;
      type: "multiple";
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
    }
);

type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

function ToggleGroup(props: ToggleGroupProps) {
  const { className, variant, size, children, selectionType = "single", type, ...restProps } = props;
  const cleanProps = cleanDOMProps(restProps);
  
  // Determine the final type, preferring explicit type over selectionType
  const finalType = type || selectionType;
  
  // Create the proper props based on the type
  const rootProps = {
    ...cleanProps,
    type: finalType,
  } as React.ComponentProps<typeof ToggleGroupPrimitive.Root>;
  
  return (
    <ToggleGroupPrimitive.Root
      {...rootProps}
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      )}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  const cleanProps = cleanDOMProps(props);
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant ?? variant}
      data-size={context.size ?? size}
      className={cn(
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      )}
      {...cleanProps}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
