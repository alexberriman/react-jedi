/**
 * Typewriter Text Component
 *
 * A dynamic text animation component with typewriter effects:
 * - Basic typing animation with customizable speed
 * - Delete and retype functionality for text cycling
 * - Multiple text phrases with rotation
 * - Cursor blinking animation with customizable styles
 * - Speed variations and pause controls
 * - Color transitions during typing
 * - Responsive text sizing
 * - Accessibility support with reduced motion preferences
 * - Loop control and completion callbacks
 */

import * as React from "react";
import { motion } from "framer-motion";
import type { ComponentProps as ReactJediComponentProps } from "../../../types/schema/components";
import type { TypewriterTextDef } from "../../../types/components/typewriter-text";
import { cn } from "../../../lib/utils";
import { useTypewriter } from "./use-typewriter";

interface TypewriterTextProps extends ReactJediComponentProps {
  readonly spec: TypewriterTextDef;
}

// Size classes for text
const textSizeClasses = {
  xs: "text-xs",
  sm: "text-sm", 
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

// Font weight classes
const fontWeightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

// Font family classes
const fontFamilyClasses = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
};

// Alignment classes
const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

// Cursor styles
const cursorStyles = {
  block: "bg-current",
  line: "border-r-2 border-current",
  underscore: "border-b-2 border-current",
  custom: "",
};

// Hook to detect reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mediaQuery) {
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);
      
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

// Cursor component
function TypewriterCursor({
  visible,
  style,
  char,
  blink,
  blinkSpeed,
  color,
  customCursorClass,
}: {
  readonly visible: boolean;
  readonly style: keyof typeof cursorStyles;
  readonly char?: string;
  readonly blink: boolean;
  readonly blinkSpeed: number;
  readonly color?: string;
  readonly customCursorClass?: string;
}) {
  const cursorClass = style === "custom" ? customCursorClass : cursorStyles[style];
  
  if (!visible) return null;

  const cursorElement = (
    <span
      className={cn(
        "inline-block",
        cursorClass,
        style === "block" && "w-[0.5em] h-[1em]",
        style === "line" && "w-0",
        style === "underscore" && "w-[0.5em]"
      )}
      style={{ 
        color: color,
        borderColor: color,
        backgroundColor: style === "block" ? color : undefined,
      }}
    >
      {(() => {
        if (style === "custom" && char) return char;
        if (style === "block") return "\u00A0";
        return "";
      })()}
    </span>
  );

  if (blink) {
    return (
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: blinkSpeed / 1000,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {cursorElement}
      </motion.span>
    );
  }

  return cursorElement;
}

/**
 * TypewriterText - Dynamic text animation component with typewriter effects
 */
export function TypewriterText({ spec }: TypewriterTextProps) {
  const {
    variant = "basic",
    texts,
    typeSpeed = 50,
    deleteSpeed = 30,
    pauseDuration = 1000,
    deleteDelay = 1000,
    loop = true,
    startDelay = 0,
    showCursor = true,
    cursorStyle = "line",
    cursorChar = "|",
    cursorBlink = true,
    cursorBlinkSpeed = 1000,
    textSize = "base",
    textColor,
    cursorColor,
    fontWeight = "normal",
    fontFamily = "sans",
    alignment = "left",
    animated = true,
    reduceMotion: forceReduceMotion = false,
    className,
    style,
    onComplete,
    onTextChange,
  } = spec;

  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = forceReduceMotion || prefersReducedMotion;
  
  // Adjust animation behavior based on variant
  const getVariantConfig = () => {
    switch (variant) {
      case "basic": {
        return {
          texts: Array.isArray(texts) ? texts[0] : texts,
          loop: false,
          shouldDelete: false,
        };
      }
      case "delete-retype": {
        return {
          texts: Array.isArray(texts) ? texts[0] : texts,
          loop: true,
          shouldDelete: true,
        };
      }
      case "rotation":
      case "infinite": {
        return {
          texts: texts,
          loop: true,
          shouldDelete: true,
        };
      }
      case "one-time": {
        return {
          texts: texts,
          loop: false,
          shouldDelete: false,
        };
      }
      default: {
        return {
          texts: texts,
          loop: loop,
          shouldDelete: Array.isArray(texts) && texts.length > 1,
        };
      }
    }
  };

  const { texts: configTexts, loop: configLoop, shouldDelete } = getVariantConfig();

  // If reduced motion is preferred, show final text immediately
  const typewriterConfig = React.useMemo(() => {
    if (shouldReduceMotion) {
      return {
        texts: configTexts,
        typeSpeed: 0,
        deleteSpeed: 0,
        pauseDuration: 0,
        deleteDelay: 0,
        loop: false,
        startDelay: 0,
        onComplete,
        onTextChange,
      };
    }

    return {
      texts: configTexts,
      typeSpeed: typeSpeed,
      deleteSpeed: shouldDelete ? deleteSpeed : 0,
      pauseDuration: shouldDelete ? pauseDuration : 0,
      deleteDelay: shouldDelete ? deleteDelay : 0,
      loop: configLoop,
      startDelay,
      onComplete,
      onTextChange,
    };
  }, [
    shouldReduceMotion,
    configTexts,
    configLoop,
    shouldDelete,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
    deleteDelay,
    startDelay,
    onComplete,
    onTextChange,
  ]);

  const { displayText, isTyping, isDeleting } = useTypewriter(typewriterConfig);

  // Determine final text for reduced motion
  const finalText = React.useMemo(() => {
    if (Array.isArray(configTexts)) {
      return configTexts.at(-1) || "";
    }
    return configTexts || "";
  }, [configTexts]);

  const textToShow = shouldReduceMotion ? finalText : displayText;

  return (
    <motion.div
      className={cn(
        "inline-block",
        textSizeClasses[textSize],
        fontWeightClasses[fontWeight],
        fontFamilyClasses[fontFamily],
        alignmentClasses[alignment],
        className
      )}
      style={{
        color: textColor,
        ...style,
      }}
      initial={animated && !shouldReduceMotion ? { opacity: 0 } : undefined}
      animate={animated && !shouldReduceMotion ? { opacity: 1 } : undefined}
      transition={animated && !shouldReduceMotion ? { duration: 0.3 } : undefined}
    >
      <span className="relative">
        {textToShow}
        <TypewriterCursor
          visible={showCursor && (!shouldReduceMotion || (shouldReduceMotion && !isTyping && !isDeleting))}
          style={cursorStyle}
          char={cursorChar}
          blink={cursorBlink && !shouldReduceMotion}
          blinkSpeed={cursorBlinkSpeed}
          color={cursorColor || textColor}
          customCursorClass={cursorStyle === "custom" ? "custom-cursor" : undefined}
        />
      </span>
    </motion.div>
  );
}

// Export alias with "Block" suffix for component resolver compatibility
export const TypewriterTextBlock = TypewriterText;
(TypewriterTextBlock as React.FC).displayName = "TypewriterTextBlock";