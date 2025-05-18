import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn, cleanDOMProps } from "../../../lib/utils";

const imageVariants = cva("transition-all duration-300 max-w-full", {
  variants: {
    objectFit: {
      contain: "object-contain",
      cover: "object-cover",
      fill: "object-fill",
      none: "object-none",
      scaleDown: "object-scale-down",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    },
    filter: {
      none: "",
      grayscale: "grayscale",
      sepia: "sepia",
      blur: "blur-sm",
      invert: "invert",
    },
    hover: {
      none: "",
      grow: "hover:scale-105",
      shrink: "hover:scale-95",
      rotate: "hover:rotate-2",
      shine: "hover:shadow-shine",
      glow: "hover:glow-md",
      pulse: "animate-pulse",
    },
    loading: {
      eager: "",
      lazy: "",
    },
  },
  defaultVariants: {
    objectFit: "cover",
    rounded: "md",
    shadow: "none",
    filter: "none",
    hover: "none",
    loading: "lazy",
  },
});

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "loading">,
    VariantProps<typeof imageVariants> {
  fallback?: string;
  aspectRatio?: string;
  width?: string | number;
  height?: string | number;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      src,
      alt,
      objectFit,
      rounded,
      shadow,
      filter,
      hover,
      loading,
      fallback,
      aspectRatio,
      width,
      height,
      ...props
    },
    ref
  ) => {
    const [imgSrc, setImgSrc] = React.useState<string | undefined>(src);
    const [isLoading, setIsLoading] = React.useState(true);

    // Handle image load errors
    const handleError = React.useCallback(() => {
      if (fallback) {
        setImgSrc(fallback);
      }
    }, [fallback]);

    // Handle successful image load
    const handleLoad = () => {
      setIsLoading(false);
    };

    // Update source if src prop changes
    React.useEffect(() => {
      setImgSrc(src);
    }, [src]);

    // Build container style for aspect ratio and dimensions
    const containerStyle: React.CSSProperties = {};

    if (aspectRatio) {
      containerStyle.aspectRatio = aspectRatio;
    }

    if (width) {
      containerStyle.width = typeof width === "number" ? `${width}px` : width;
    }

    if (height) {
      containerStyle.height = typeof height === "number" ? `${height}px` : height;
    }

    return (
      <div
        className={cn(
          "relative overflow-hidden",
          isLoading && "bg-muted/30 animate-pulse",
          className
        )}
        style={containerStyle}
        data-slot="image-container"
      >
        {imgSrc && (
          <img
            data-slot="image"
            ref={ref}
            src={imgSrc}
            alt={alt || ""}
            className={cn(
              imageVariants({
                objectFit,
                rounded,
                shadow,
                filter,
                hover,
                className: "w-full h-full",
              })
            )}
            loading={loading === "lazy" ? "lazy" : "eager"}
            onError={handleError}
            onLoad={handleLoad}
            {...cleanDOMProps(props)}
          />
        )}
      </div>
    );
  }
);

Image.displayName = "Image";

export { Image, imageVariants };
