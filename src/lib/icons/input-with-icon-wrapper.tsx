import * as React from "react";
import { Input } from "../../components/ui/input";
import { cn } from "../utils";
import { isIconReference, transformIconReference } from "./sdui-icon";

interface BaseInputProps extends React.ComponentProps<"input"> {
  startIcon?: unknown;
  endIcon?: unknown;
}

export type InputWithIconWrapperProps = BaseInputProps;

/**
 * Wrapper component for Input that handles icon rendering in SDUI mode
 * This component wraps the Input with appropriate divs and positioning for icons
 */
export function InputWithIconWrapper({
  startIcon,
  endIcon,
  className = "",
  ...props
}: Readonly<InputWithIconWrapperProps>): React.ReactElement {
  const hasStartIcon = startIcon && isIconReference(startIcon);
  const hasEndIcon = endIcon && isIconReference(endIcon);
  
  // If no icons, render plain Input
  if (!hasStartIcon && !hasEndIcon) {
    return <Input className={className} {...props} />;
  }
  
  // Adjust padding based on icons
  const inputClassName = cn(
    className,
    hasStartIcon ? "pl-8" : "",
    hasEndIcon ? "pr-8" : ""
  );
  
  const startIconElement = hasStartIcon ? transformIconReference(startIcon) : null;
  const endIconElement = hasEndIcon ? transformIconReference(endIcon) : null;
  
  return (
    <div className="relative w-full">
      {startIconElement && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          {startIconElement}
        </div>
      )}
      
      <Input className={inputClassName} {...props} />
      
      {endIconElement && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          {endIconElement}
        </div>
      )}
    </div>
  );
}

InputWithIconWrapper.displayName = "InputWithIconWrapper";