import * as React from "react";
import { cn } from "../../../lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse" | "bars";
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const spinnerAnimations = {
  sm: "animate-spin",
  md: "animate-spin",
  lg: "animate-spin",
  xl: "animate-spin",
};

const Loading: React.FC<LoadingProps> = ({
  className,
  size = "md",
  variant = "spinner",
  text,
  fullScreen = false,
  overlay = false,
}) => {
  const renderLoader = () => {
    switch (variant) {
      case "spinner": {
        return (
          <Loader2
            className={cn(sizes[size], spinnerAnimations[size], "text-blue-600 dark:text-blue-400")}
          />
        );
      }

      case "dots": {
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => {
              let sizeClass = "";
              switch (size) {
                case "sm": {
                  sizeClass = "w-1.5 h-1.5";
                  break;
                }
                case "md": {
                  sizeClass = "w-2 h-2";
                  break;
                }
                case "lg": {
                  sizeClass = "w-3 h-3";
                  break;
                }
                default: {
                  sizeClass = "w-4 h-4";
                }
              }

              return (
                <div
                  key={index}
                  className={cn(
                    "bg-blue-600 dark:bg-blue-400 rounded-full",
                    sizeClass,
                    "animate-bounce"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              );
            })}
          </div>
        );
      }

      case "pulse": {
        return (
          <div
            className={cn(
              "rounded-full bg-blue-600 dark:bg-blue-400",
              sizes[size],
              "animate-pulse"
            )}
          />
        );
      }

      case "bars": {
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3].map((index) => {
              let sizeClass = "";
              switch (size) {
                case "sm": {
                  sizeClass = "w-0.5 h-3";
                  break;
                }
                case "md": {
                  sizeClass = "w-1 h-4";
                  break;
                }
                case "lg": {
                  sizeClass = "w-1.5 h-6";
                  break;
                }
                default: {
                  sizeClass = "w-2 h-8";
                }
              }

              return (
                <div
                  key={index}
                  className={cn("bg-blue-600 dark:bg-blue-400", sizeClass, "animate-pulse")}
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              );
            })}
          </div>
        );
      }

      default: {
        return null;
      }
    }
  };

  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        fullScreen && "min-h-screen",
        overlay && "absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
        !fullScreen && !overlay && "py-8",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        {renderLoader()}
        {text && (
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );

  if (overlay) {
    return <div className="relative">{content}</div>;
  }

  return content;
};

export { Loading };
