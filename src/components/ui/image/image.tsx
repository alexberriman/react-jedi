import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn, cleanDOMProps } from "../../../lib/utils";

const imageVariants = cva("max-w-full", {
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
      grow: "",
      shrink: "",
      rotate: "",
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
    const [imageError, setImageError] = React.useState(false);

    // Handle image load errors
    const handleError = React.useCallback(() => {
      // Use setTimeout to ensure state updates happen in the next tick
      // This helps avoid act() warnings in tests
      globalThis.setTimeout(() => {
        setImageError(true);
        setIsLoading(false);
        if (fallback) {
          setImgSrc(fallback);
          setImageError(false);
          setIsLoading(true);
        }
      }, 0);
    }, [fallback]);

    // Handle successful image load
    const handleLoad = React.useCallback(() => {
      // Use setTimeout to ensure state updates happen in the next tick
      // This helps avoid act() warnings in tests
      globalThis.setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }, []);

    // Update source if src prop changes
    React.useEffect(() => {
      setImgSrc(src);
      setIsLoading(true);
      setImageError(false);
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

    // Define Framer Motion variants for hover effects
    const hoverVariants = {
      grow: {
        scale: 1.1,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      },
      shrink: {
        scale: 0.95,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      },
      rotate: {
        rotate: 3,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      },
    };

    // Determine which hover effect to use
    const whileHoverEffect = hover && hover !== "none" && hover !== "shine" && hover !== "glow" && hover !== "pulse" 
      ? hoverVariants[hover as keyof typeof hoverVariants] 
      : undefined;

    // Extract only the props that are safe to pass to motion.img
    const {
      onClick,
      onMouseEnter,
      onMouseLeave,
      title,
      // Extract and ignore conflicting event handlers
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      ...restProps
    } = cleanDOMProps(props);

    const safeImageProps: Record<string, unknown> = {
      onClick,
      onMouseEnter,
      onMouseLeave,
      title,
    };

    // Add ARIA and data attributes
    for (const key in restProps) {
      if (key.startsWith('aria-') || key.startsWith('data-')) {
        safeImageProps[key] = restProps[key as keyof typeof restProps];
      }
    }

    return (
      <div
        className={cn(
          "relative overflow-hidden",
          isLoading && !imageError && "bg-muted/30 animate-pulse",
          className
        )}
        style={containerStyle}
        data-slot="image-container"
      >
        {imgSrc && !imageError && (
          <motion.img
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
            initial={{ scale: 1, rotate: 0 }}
            whileHover={whileHoverEffect}
            {...safeImageProps}
          />
        )}
        {imageError && !fallback && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Failed to load image</span>
          </div>
        )}
      </div>
    );
  }
);

Image.displayName = "Image";

export { Image, imageVariants };
