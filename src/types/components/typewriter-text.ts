import type { BaseComponentSpec } from "../schema/base";

export interface TypewriterTextDef extends BaseComponentSpec {
  type: "TypewriterText";
  readonly variant?: "basic" | "delete-retype" | "rotation" | "infinite" | "one-time";
  readonly texts: string | string[];
  readonly typeSpeed?: number;
  readonly deleteSpeed?: number;
  readonly pauseDuration?: number;
  readonly deleteDelay?: number;
  readonly loop?: boolean;
  readonly startDelay?: number;
  readonly showCursor?: boolean;
  readonly cursorStyle?: "block" | "line" | "underscore" | "custom";
  readonly cursorChar?: string;
  readonly cursorBlink?: boolean;
  readonly cursorBlinkSpeed?: number;
  readonly textSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  readonly textColor?: string;
  readonly cursorColor?: string;
  readonly fontWeight?: "normal" | "medium" | "semibold" | "bold";
  readonly fontFamily?: "sans" | "serif" | "mono";
  readonly alignment?: "left" | "center" | "right";
  readonly animated?: boolean;
  readonly reduceMotion?: boolean;
  readonly onComplete?: () => void;
  readonly onTextChange?: (text: string, index: number) => void;
}