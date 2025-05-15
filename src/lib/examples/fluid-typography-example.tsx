/**
 * Fluid Typography Example
 * 
 * This component demonstrates how to use the fluid typography system in action.
 */

import React, { useState } from "react";
import { ThemeProvider } from "../theme/theme-provider";
import { useFluidTypography, useFontSize } from "../theme/typography/hooks";
// Import type Breakpoint which is used in the component's config
import type { Breakpoint } from "../theme/typography/fluid-typography";

/**
 * Font Size Showcase Component
 * 
 * Displays different font sizes using the theme system
 */
const FontSizeShowcase: React.FC = () => {
  const { isFluid, enableFluidTypography, disableFluidTypography } = useFluidTypography();
  
  // Get font sizes for different scale points
  const xs2 = useFontSize("xs2");
  const xs1 = useFontSize("xs1");
  const base = useFontSize("base");
  const lg1 = useFontSize("lg1");
  const lg2 = useFontSize("lg2");
  const xl1 = useFontSize("1xl");
  const xl2 = useFontSize("2xl");
  const xl3 = useFontSize("3xl");
  const xl4 = useFontSize("4xl");
  const xl5 = useFontSize("5xl");
  
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ fontSize: xl4, marginBottom: "20px" }}>
        Fluid Typography Example
      </h1>
      
      <div style={{ 
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "40px",
        gap: "10px"
      }}>
        <button
          onClick={() => enableFluidTypography()}
          disabled={isFluid}
          style={{
            padding: "8px 16px",
            backgroundColor: isFluid ? "#ccc" : "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isFluid ? "default" : "pointer"
          }}
        >
          Enable Fluid Typography
        </button>
        
        <button
          onClick={() => disableFluidTypography()}
          disabled={!isFluid}
          style={{
            padding: "8px 16px",
            backgroundColor: isFluid ? "#ef4444" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isFluid ? "pointer" : "default"
          }}
        >
          Disable Fluid Typography
        </button>
        
        <div style={{
          padding: "8px 16px",
          backgroundColor: "#f3f4f6",
          borderRadius: "4px",
          fontWeight: "bold"
        }}>
          Status: {isFluid ? "Fluid" : "Static"}
        </div>
      </div>
      
      <div>
        <div style={{ fontSize: xs2, marginBottom: "8px" }}>Extra Small 2 (xs2): Lorem ipsum dolor sit amet</div>
        <div style={{ fontSize: xs1, marginBottom: "8px" }}>Extra Small 1 (xs1): Lorem ipsum dolor sit amet</div>
        <div style={{ fontSize: base, marginBottom: "8px" }}>Base: Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        <div style={{ fontSize: lg1, marginBottom: "8px" }}>Large 1 (lg1): Lorem ipsum dolor sit amet</div>
        <div style={{ fontSize: lg2, marginBottom: "8px" }}>Large 2 (lg2): Lorem ipsum dolor sit amet</div>
        <div style={{ fontSize: xl1, marginBottom: "8px" }}>Extra Large 1 (1xl): Lorem ipsum dolor sit</div>
        <div style={{ fontSize: xl2, marginBottom: "8px" }}>Extra Large 2 (2xl): Lorem ipsum dolor</div>
        <div style={{ fontSize: xl3, marginBottom: "8px" }}>Extra Large 3 (3xl): Lorem ipsum</div>
        <div style={{ fontSize: xl4, marginBottom: "8px" }}>Extra Large 4 (4xl): Lorem</div>
        <div style={{ fontSize: xl5, marginBottom: "8px" }}>Extra Large 5 (5xl): XL</div>
      </div>
      
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: xl2, marginBottom: "20px" }}>
          How it works
        </h2>
        <p style={{ fontSize: base, lineHeight: "1.5", marginBottom: "16px" }}>
          Fluid typography automatically scales text based on the viewport width. 
          Resize your browser window to see the text smoothly scale between minimum
          and maximum sizes.
        </p>
        <p style={{ fontSize: base, lineHeight: "1.5", marginBottom: "16px" }}>
          This system uses CSS <code style={{ fontFamily: "monospace" }}>clamp()</code> function, 
          which takes three parameters: minimum size, preferred size, and maximum size.
        </p>
        <p style={{ fontSize: base, lineHeight: "1.5" }}>
          Each font size is calculated based on its position in the type scale, 
          with different scales applied at different breakpoints.
        </p>
      </div>
    </div>
  );
};

/**
 * Advanced Fluid Typography Demo
 */
const AdvancedFluidTypographyDemo: React.FC = () => {
  const [breakpointMode, setBreakpointMode] = useState("default");
  
  // Get initial theme
  const baseTheme = {
    typography: {
      // Default typography settings will be provided by the provider
    }
  };
  
  // Create different configurations
  const configs = {
    default: {
      enableFluidTypography: true,
      fluidTypographyConfig: {}
    },
    minimal: {
      enableFluidTypography: true,
      fluidTypographyConfig: {
        minSizeMultiplier: 0.9,
        maxSizeMultiplier: 1.1
      }
    },
    dramatic: {
      enableFluidTypography: true,
      fluidTypographyConfig: {
        minSizeMultiplier: 0.6,
        maxSizeMultiplier: 1.5,
        defaultScaleRatio: "goldenRatio" as const
      }
    }
  };
  
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ fontSize: "1.875rem", marginBottom: "20px" }}>
        Advanced Fluid Typography Options
      </h2>
      
      <div style={{ 
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "40px",
        gap: "10px"
      }}>
        <button
          onClick={() => setBreakpointMode("default")}
          style={{
            padding: "8px 16px",
            backgroundColor: breakpointMode === "default" ? "#4f46e5" : "#f3f4f6",
            color: breakpointMode === "default" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Default
        </button>
        
        <button
          onClick={() => setBreakpointMode("minimal")}
          style={{
            padding: "8px 16px",
            backgroundColor: breakpointMode === "minimal" ? "#4f46e5" : "#f3f4f6",
            color: breakpointMode === "minimal" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Minimal Scaling
        </button>
        
        <button
          onClick={() => setBreakpointMode("dramatic")}
          style={{
            padding: "8px 16px",
            backgroundColor: breakpointMode === "dramatic" ? "#4f46e5" : "#f3f4f6",
            color: breakpointMode === "dramatic" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Dramatic Scaling
        </button>
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <strong>Current Config: </strong>
        {breakpointMode === "default" && "Default - Standard fluid typography settings"}
        {breakpointMode === "minimal" && "Minimal - Less variation between small and large screens"}
        {breakpointMode === "dramatic" && "Dramatic - Extreme scaling using the golden ratio"}
      </div>
      
      <ThemeProvider 
        theme={baseTheme}
        {...configs[breakpointMode as keyof typeof configs]}
      >
        <FontSizeShowcase />
      </ThemeProvider>
    </div>
  );
};

/**
 * Breakpoint Demo
 */
const BreakpointDemo: React.FC = () => {
  // Get initial theme
  const baseTheme = {
    typography: {
      // Default typography settings will be provided by the provider
    }
  };
  
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ fontSize: "1.875rem", marginBottom: "20px" }}>
        Breakpoint-Based Fluid Typography
      </h2>
      
      <p style={{ marginBottom: "20px" }}>
        This demo shows how typography can be configured with different properties at different breakpoints.
      </p>
      
      <ThemeProvider 
        theme={baseTheme}
        enableFluidTypography={true}
        fluidTypographyConfig={{
          // Define custom breakpoints with explicit typing
          breakpoints: [
            { name: "mobile", minWidth: 320, baseFontSize: 14, scaleRatio: "minorThird" },
            { name: "tablet", minWidth: 768, baseFontSize: 16, scaleRatio: "perfectFourth" },
            { name: "desktop", minWidth: 1024, baseFontSize: 18, scaleRatio: "augmentedFourth" },
            { name: "widescreen", minWidth: 1536, baseFontSize: 20, scaleRatio: "perfectFifth" }
          ] as Breakpoint[]
        }}
      >
        <FontSizeShowcase />
      </ThemeProvider>
    </div>
  );
};

/**
 * Fluid Typography Example (main component)
 */
export function FluidTypographyExample(): React.ReactElement {
  return (
    <div>
      <h1 style={{ 
        fontSize: "3rem", 
        textAlign: "center", 
        marginBottom: "40px",
        background: "linear-gradient(45deg, #2563eb, #7c3aed)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        padding: "20px",
        fontWeight: "bold"
      }}>
        Fluid Typography System
      </h1>
      
      <div style={{ marginBottom: "80px" }}>
        <ThemeProvider theme={{ typography: {} }}>
          <FontSizeShowcase />
        </ThemeProvider>
      </div>
      
      <div style={{ marginBottom: "80px" }}>
        <AdvancedFluidTypographyDemo />
      </div>
      
      <div style={{ marginBottom: "80px" }}>
        <BreakpointDemo />
      </div>
    </div>
  );
}