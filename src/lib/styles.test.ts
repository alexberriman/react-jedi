import { describe, it, expect } from "vitest";
import {
  processResponsive,
  processMargin,
  processPadding,
  processWidth,
  processHeight,
  processTextColor,
  processBackgroundColor,
  processBorder,
  processBorderRadius,
  processFlexDirection,
  processFlexWrap,
  processGap,
  processTextAlign,
  processFontSize,
  processFontWeight,
  processShadow,
  processZIndex,
  processDisplay,
  processOverflow,
  processPosition,
  processOffset,
  processOpacity,
  processTransition,
  arbitrary,
  extractStyles,
  conditionalClasses,
  stateClasses,
  processStyleProps
} from "./styles";

describe("Style Processing Utilities", () => {
  describe("processResponsive", () => {
    it("should process a single value", () => {
      const result = processResponsive("red", (color) => `text-${color}`);
      expect(result).toBe("text-red");
    });

    it("should process a responsive object with base value", () => {
      const result = processResponsive(
        { base: "red", md: "blue", lg: "green" },
        (color) => `text-${color}`
      );
      expect(result).toBe("text-red md:text-blue lg:text-green");
    });
    
    it("should process a responsive object with default value", () => {
      const result = processResponsive(
        { default: "red", md: "blue", lg: "green" },
        (color) => `text-${color}`
      );
      expect(result).toBe("text-red md:text-blue lg:text-green");
    });
    
    it("should handle undefined values", () => {
      const result = processResponsive(undefined, (color) => `text-${color}`);
      expect(result).toBe("");
    });
  });
  
  describe("Size processing functions", () => {
    it("should process margin values", () => {
      expect(processMargin(4)).toBe("m-4");
      expect(processMargin({ base: 2, md: 4 })).toBe("m-2 md:m-4");
    });
    
    it("should process padding values", () => {
      expect(processPadding(4)).toBe("p-4");
      expect(processPadding({ base: 2, md: 4 })).toBe("p-2 md:p-4");
    });
    
    it("should process width values", () => {
      expect(processWidth("full")).toBe("w-full");
      expect(processWidth(6)).toBe("w-6/12");
      expect(processWidth(50)).toBe("w-[50px]");
      expect(processWidth({ base: "full", md: 6 })).toBe("w-full md:w-6/12");
    });
    
    it("should process height values", () => {
      expect(processHeight("full")).toBe("h-full");
      expect(processHeight(50)).toBe("h-[50px]");
      expect(processHeight({ base: "auto", md: "screen" })).toBe("h-auto md:h-screen");
    });
  });
  
  describe("Color processing functions", () => {
    it("should process text color values", () => {
      expect(processTextColor("red-500")).toBe("text-red-500");
      expect(processTextColor({ base: "red-500", dark: "red-300" }))
        .toBe("text-red-500 dark:text-red-300");
    });
    
    it("should process background color values", () => {
      expect(processBackgroundColor("blue-500")).toBe("bg-blue-500");
      expect(processBackgroundColor({ base: "blue-500", dark: "blue-800" }))
        .toBe("bg-blue-500 dark:bg-blue-800");
    });
  });
  
  describe("Border processing functions", () => {
    it("should process border values", () => {
      expect(processBorder(true)).toBe("border");
      expect(processBorder(false)).toBe("");
      expect(processBorder("red-500")).toBe("border border-red-500");
      expect(processBorder({ base: true, md: "blue-500" }))
        .toBe("border md:border border-blue-500");
    });
    
    it("should process border radius values", () => {
      expect(processBorderRadius("md")).toBe("rounded-md");
      expect(processBorderRadius("full")).toBe("rounded-full");
      expect(processBorderRadius(8)).toBe("rounded-[8px]");
      expect(processBorderRadius({ base: "md", lg: "xl" }))
        .toBe("rounded-md lg:rounded-xl");
    });
  });
  
  describe("Flex processing functions", () => {
    it("should process flex direction values", () => {
      expect(processFlexDirection("row")).toBe("flex-row");
      expect(processFlexDirection({ base: "col", md: "row" }))
        .toBe("flex-col md:flex-row");
    });
    
    it("should process flex wrap values", () => {
      expect(processFlexWrap("wrap")).toBe("flex-wrap");
      expect(processFlexWrap({ base: "nowrap", lg: "wrap" }))
        .toBe("flex-nowrap lg:flex-wrap");
    });
    
    it("should process gap values", () => {
      expect(processGap(4)).toBe("gap-4");
      expect(processGap({ base: 2, md: 4, lg: 6 }))
        .toBe("gap-2 md:gap-4 lg:gap-6");
    });
  });
  
  describe("Typography processing functions", () => {
    it("should process text alignment values", () => {
      expect(processTextAlign("center")).toBe("text-center");
      expect(processTextAlign({ base: "left", md: "center" }))
        .toBe("text-left md:text-center");
    });
    
    it("should process font size values", () => {
      expect(processFontSize("lg")).toBe("text-lg");
      expect(processFontSize({ base: "sm", md: "base", lg: "lg" }))
        .toBe("text-sm md:text-base lg:text-lg");
    });
    
    it("should process font weight values", () => {
      expect(processFontWeight("bold")).toBe("font-bold");
      expect(processFontWeight(700)).toBe("font-700");
      expect(processFontWeight({ base: "normal", md: "semibold" }))
        .toBe("font-normal md:font-semibold");
    });
  });
  
  describe("Other style processing functions", () => {
    it("should process shadow values", () => {
      expect(processShadow(true)).toBe("shadow");
      expect(processShadow("md")).toBe("shadow-md");
      expect(processShadow({ base: true, lg: "xl" }))
        .toBe("shadow lg:shadow-xl");
    });
    
    it("should process z-index values", () => {
      expect(processZIndex(10)).toBe("z-10");
      expect(processZIndex({ base: 0, hover: 10 }))
        .toBe("z-0 hover:z-10");
    });
    
    it("should process display values", () => {
      expect(processDisplay("flex")).toBe("flex");
      expect(processDisplay({ base: "block", md: "flex" }))
        .toBe("block md:flex");
    });
    
    it("should process overflow values", () => {
      expect(processOverflow("hidden")).toBe("overflow-hidden");
      expect(processOverflow({ base: "auto", md: "hidden" }))
        .toBe("overflow-auto md:overflow-hidden");
    });
    
    it("should process position values", () => {
      expect(processPosition("relative")).toBe("relative");
      expect(processPosition({ base: "static", hover: "relative" }))
        .toBe("static hover:relative");
    });
    
    it("should process offset values", () => {
      const result1 = processOffset(0, "top");
      expect(result1).toBe("top-[0px]");
      expect(processOffset("4", "left")).toBe("left-4");
      const result2 = processOffset({ base: 0, md: 4 }, "bottom");
      expect(result2).toBe("bottom-[0px] md:bottom-[4px]");
    });
    
    it("should process opacity values", () => {
      expect(processOpacity(50)).toBe("opacity-50");
      expect(processOpacity({ base: 100, hover: 80 }))
        .toBe("opacity-100 hover:opacity-80");
    });
    
    it("should process transition values", () => {
      expect(processTransition(true)).toBe("transition");
      expect(processTransition("colors")).toBe("transition-colors");
      expect(processTransition({ base: true, hover: "transform" }))
        .toBe("transition hover:transition-transform");
    });
  });
  
  describe("Helper functions", () => {
    it("should create arbitrary value classes", () => {
      expect(arbitrary("margin-top", "17px")).toBe("[margin-top:17px]");
      expect(arbitrary("grid-template-columns", "repeat(3, 1fr)"))
        .toBe("[grid-template-columns:repeat(3, 1fr)]");
    });
    
    it("should extract styles from props", () => {
      const props = {
        margin: 4,
        padding: { base: 2, md: 4 },
        color: "red-500",
        fontSize: "lg",
        unknownProp: "value"
      };
      
      // Use type assertion to match the expected type
      const styleProps = {
        margin: processMargin,
        padding: processPadding,
        color: processTextColor,
        fontSize: processFontSize
      } as Record<string, (value: unknown) => string>;
      
      const result = extractStyles(props, styleProps);
      expect(result).toBe("m-4 p-2 md:p-4 text-red-500 text-lg");
    });
    
    it("should generate conditional classes", () => {
      expect(conditionalClasses(true, "bg-blue-500", "bg-gray-200"))
        .toBe("bg-blue-500");
      expect(conditionalClasses(false, "bg-blue-500", "bg-gray-200"))
        .toBe("bg-gray-200");
      expect(conditionalClasses(false, "bg-blue-500"))
        .toBe("");
    });
    
    it("should generate state-based classes", () => {
      const states = {
        idle: "text-gray-500",
        loading: "text-blue-500 animate-pulse",
        success: "text-green-500",
        error: "text-red-500"
      };
      
      expect(stateClasses("idle", states)).toBe("text-gray-500");
      expect(stateClasses("loading", states)).toBe("text-blue-500 animate-pulse");
      expect(stateClasses("unknown", states)).toBe("");
    });
    
    it("should process standard style props", () => {
      const props = {
        margin: 4,
        padding: 2,
        width: "full",
        color: "blue-500",
        backgroundColor: "gray-100",
        borderRadius: "md",
        unknownProp: "value"
      };
      
      const result = processStyleProps(props);
      expect(result).toBe("m-4 p-2 w-full text-blue-500 bg-gray-100 rounded-md");
    });
  });
});