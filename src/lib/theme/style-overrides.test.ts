import { describe, expect, it } from "vitest";
import { processStyleOverrides, mergeStyles, cascadeStyles } from "./style-overrides";
import { createTokenResolver } from "./token-resolver";
import { extractTokensFromTheme, createTokenCollection } from "./theme-tokens";
import type { ComponentSpec } from "@/types/schema/components";
import type { ThemeSpecification } from "@/types/schema/specification";

describe("Style Overrides", () => {
  describe("processStyleOverrides", () => {
    it("should apply global overrides", () => {
      const spec: ComponentSpec = {
        type: "Button",
        children: "Click me",
      };
      
      const theme: ThemeSpecification = {
        components: {
          Button: {
            global: {
              className: "rounded-lg shadow-md",
              styles: {
                padding: "8px 16px",
              },
            },
          },
        },
      };
      
      const extractedTokens = extractTokensFromTheme(theme);
      const tokens = createTokenCollection(extractedTokens);
      const tokenResolver = createTokenResolver(theme, tokens);
      const result = processStyleOverrides(spec, theme, tokenResolver);
      
      expect(result.className).toBe("rounded-lg shadow-md");
      expect(result.style).toEqual({
        padding: "8px 16px",
      });
    });
    
    it("should apply variant-specific overrides", () => {
      const spec = {
        type: "Button",
        variant: "primary",
        children: "Click me",
      } as ComponentSpec;
      
      const theme: ThemeSpecification = {
        components: {
          Button: {
            variants: {
              primary: {
                className: "bg-primary text-white",
                styles: {
                  fontWeight: "bold",
                },
              },
            },
          },
        },
      };
      
      const extractedTokens = extractTokensFromTheme(theme);
      const tokens = createTokenCollection(extractedTokens);
      const tokenResolver = createTokenResolver(theme, tokens);
      const result = processStyleOverrides(spec, theme, tokenResolver);
      
      expect(result.className).toBe("bg-primary text-white");
      expect(result.style).toEqual({
        fontWeight: "bold",
      });
    });
    
    it("should apply size-specific overrides", () => {
      const spec = {
        type: "Button",
        size: "large",
        children: "Click me",
      } as ComponentSpec;
      
      const theme: ThemeSpecification = {
        components: {
          Button: {
            sizes: {
              large: {
                className: "text-lg px-6 py-3",
                styles: {
                  fontSize: "1.125rem",
                },
              },
            },
          },
        },
      };
      
      const extractedTokens = extractTokensFromTheme(theme);
      const tokens = createTokenCollection(extractedTokens);
      const tokenResolver = createTokenResolver(theme, tokens);
      const result = processStyleOverrides(spec, theme, tokenResolver);
      
      expect(result.className).toBe("text-lg px-6 py-3");
      expect(result.style).toEqual({
        fontSize: "1.125rem",
      });
    });
    
    it("should apply combination overrides", () => {
      const spec = {
        type: "Button",
        variant: "primary",
        size: "large",
        children: "Click me",
      } as ComponentSpec;
      
      const theme: ThemeSpecification = {
        components: {
          Button: {
            combinations: [
              {
                variant: "primary",
                size: "large",
                className: "bg-primary-500 hover:bg-primary-600 text-xl",
                styles: {
                  padding: "12px 24px",
                },
              },
            ],
          },
        },
      };
      
      const extractedTokens = extractTokensFromTheme(theme);
      const tokens = createTokenCollection(extractedTokens);
      const tokenResolver = createTokenResolver(theme, tokens);
      const result = processStyleOverrides(spec, theme, tokenResolver);
      
      expect(result.className).toBe("bg-primary-500 hover:bg-primary-600 text-xl");
      expect(result.style).toEqual({
        padding: "12px 24px",
      });
    });
    
    it("should merge all applicable overrides", () => {
      const spec = {
        type: "Button",
        variant: "primary",
        size: "large",
        className: "custom-class",
        style: {
          marginTop: "10px",
        },
        children: "Click me",
      } as ComponentSpec;
      
      const theme: ThemeSpecification = {
        components: {
          Button: {
            global: {
              className: "rounded shadow",
              styles: {
                display: "inline-block",
              },
            },
            variants: {
              primary: {
                className: "bg-primary text-white",
                styles: {
                  fontWeight: "bold",
                },
              },
            },
            sizes: {
              large: {
                className: "text-lg",
                styles: {
                  padding: "12px 24px",
                },
              },
            },
          },
        },
      };
      
      const extractedTokens = extractTokensFromTheme(theme);
      const tokens = createTokenCollection(extractedTokens);
      const tokenResolver = createTokenResolver(theme, tokens);
      const result = processStyleOverrides(spec, theme, tokenResolver);
      
      expect(result.className).toBe("rounded shadow bg-primary text-white text-lg custom-class");
      expect(result.style).toEqual({
        display: "inline-block",
        fontWeight: "bold",
        padding: "12px 24px",
        marginTop: "10px",
      });
    });
    
    it("should apply token-based styles", () => {
      const spec: ComponentSpec = {
        type: "Card",
        children: "Content",
      };
      
      const theme: ThemeSpecification = {
        colors: {
          primary: {
            500: "#3B82F6",
          },
        },
        spacing: {
          lg: "1rem",
        },
        components: {
          Card: {
            global: {
              tokens: {
                backgroundColor: "colors.primary.500",
                padding: "spacing.lg",
              },
            },
          },
        },
      };
      
      const extractedTokens = extractTokensFromTheme(theme);
      const tokens = createTokenCollection(extractedTokens);
      const tokenResolver = createTokenResolver(theme, tokens);
      const result = processStyleOverrides(spec, theme, tokenResolver);
      
      expect(result.style).toEqual({
        "background-color": "#3B82F6",
        padding: "1rem",
      });
    });
  });
  
  describe("mergeStyles", () => {
    it("should merge classNames and styles", () => {
      const base = {
        className: "base-class",
        style: { color: "blue", fontSize: "14px" },
      };
      
      const override = {
        className: "override-class",
        style: { color: "red", padding: "10px" },
      };
      
      const result = mergeStyles(base, override);
      
      expect(result.className).toBe("base-class override-class");
      expect(result.style).toEqual({
        color: "red",
        fontSize: "14px",
        padding: "10px",
      });
    });
  });
  
  describe("cascadeStyles", () => {
    it("should cascade multiple style sources", () => {
      const source1 = {
        className: "class1",
        style: { color: "blue" },
      };
      
      const source2 = {
        className: "class2",
        style: { fontSize: "16px" },
      };
      
      const source3 = {
        className: "class3",
        style: { color: "red", padding: "20px" },
      };
      
      const result = cascadeStyles(source1, source2, source3);
      
      expect(result.className).toBe("class1 class2 class3");
      expect(result.style).toEqual({
        color: "red",
        fontSize: "16px",
        padding: "20px",
      });
    });
  });
});