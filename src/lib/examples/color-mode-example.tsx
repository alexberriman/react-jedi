/**
 * Color Mode System Example
 *
 * This example demonstrates the color mode system with automatic system preference detection.
 */

import React, { useState } from "react";
import { 
  ColorModeProvider, 
  ColorModeToggle, 
  AdvancedModeToggle, 
  useColorMode
} from "../theme/color-mode";

/**
 * Component that displays information about the current color mode
 */
const ColorModeInfo: React.FC = () => {
  const { 
    colorMode, 
    resolvedColorMode, 
    systemPrefersDark, 
    transitionsEnabled, 
    setTransitionsEnabled 
  } = useColorMode();
  
  return (
    <div className="color-mode-info p-6 max-w-md mx-auto rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Color Mode System</h2>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="font-medium">User selected mode:</div>
        <div className="font-mono">{colorMode}</div>
        
        <div className="font-medium">Actual applied mode:</div>
        <div className="font-mono">{resolvedColorMode}</div>
        
        <div className="font-medium">System prefers dark:</div>
        <div className="font-mono">{systemPrefersDark ? "Yes" : "No"}</div>
        
        <div className="font-medium">Transitions:</div>
        <div className="font-mono">{transitionsEnabled ? "Enabled" : "Disabled"}</div>
      </div>
      
      <div className="flex items-center justify-between gap-4 pt-4">
        <ColorModeToggle showLabel size="md" />
        
        <button 
          onClick={() => setTransitionsEnabled(!transitionsEnabled)}
          className="inline-flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {transitionsEnabled ? "Disable Transitions" : "Enable Transitions"}
        </button>
      </div>
      
      <div className="flex flex-col space-y-2 pt-2">
        <div className="w-full h-20 rounded-md shadow-inner bg-primary-100 dark:bg-primary-900 transition-colors"></div>
        <div className="w-full h-20 rounded-md shadow-inner bg-secondary-100 dark:bg-secondary-900 transition-colors"></div>
      </div>
    </div>
  );
};

/**
 * Showcase of different Advanced Mode Toggle variants
 */
const AdvancedToggleShowcase: React.FC = () => {
  const [animationType, setAnimationType] = useState<"slide" | "fade" | "scale" | "morph">("slide");
  
  return (
    <div className="p-6 max-w-md mx-auto mt-8 rounded-xl shadow-md space-y-6 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
      <h2 className="text-xl font-bold">Advanced Mode Toggles</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Default</h3>
          <div className="flex justify-center py-2">
            <AdvancedModeToggle animation={animationType} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Glass</h3>
          <div className="flex justify-center py-2">
            <AdvancedModeToggle variant="glass" animation={animationType} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Solid</h3>
          <div className="flex justify-center py-2">
            <AdvancedModeToggle variant="solid" animation={animationType} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Minimal</h3>
          <div className="flex justify-center py-2">
            <AdvancedModeToggle variant="minimal" animation={animationType} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Pill</h3>
          <div className="flex justify-center py-2">
            <AdvancedModeToggle variant="pill" animation={animationType} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">With Label</h3>
          <div className="flex justify-center py-2">
            <AdvancedModeToggle showLabels animation={animationType} />
          </div>
        </div>
      </div>
      
      <div className="space-y-2 pt-2">
        <h3 className="text-sm font-medium">Animation Style</h3>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setAnimationType("slide")}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${animationType === "slide" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            Slide
          </button>
          <button 
            onClick={() => setAnimationType("fade")}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${animationType === "fade" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            Fade
          </button>
          <button 
            onClick={() => setAnimationType("scale")}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${animationType === "scale" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            Scale
          </button>
          <button 
            onClick={() => setAnimationType("morph")}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${animationType === "morph" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            Morph
          </button>
        </div>
      </div>
      
      <div className="space-y-2 pt-2">
        <h3 className="text-sm font-medium">Size Variants</h3>
        <div className="flex items-center justify-around py-2">
          <AdvancedModeToggle size="sm" animation={animationType} />
          <AdvancedModeToggle size="md" animation={animationType} />
          <AdvancedModeToggle size="lg" animation={animationType} />
          <AdvancedModeToggle size="xl" animation={animationType} />
        </div>
      </div>
    </div>
  );
};

/**
 * Example App showing how to use ColorModeProvider
 */
const ColorModeExample: React.FC = () => {
  // Sample color mode settings
  const colorModeSettings = {
    defaultMode: "system" as const,
    respectSystemPreference: true,
    storageKey: "color-mode-example",
    transition: {
      duration: 200,
      easing: "ease-in-out",
    },
    light: {
      colors: {
        // Light mode colors
        primary: {
          "50": "#f0f9ff",
          "100": "#e0f2fe",
          "200": "#bae6fd",
          "300": "#7dd3fc",
          "400": "#38bdf8",
          "500": "#0ea5e9",
          "600": "#0284c7",
          "700": "#0369a1",
          "800": "#075985",
          "900": "#0c4a6e",
        },
      },
    },
    dark: {
      colors: {
        // Dark mode colors - different hue for distinction
        primary: {
          "50": "#f0fdff",
          "100": "#ccfbff",
          "200": "#99f6ff",
          "300": "#5ee7ff",
          "400": "#2cceff",
          "500": "#00a3ff",
          "600": "#007fff",
          "700": "#0067cc",
          "800": "#0055a3",
          "900": "#004580",
        },
      },
    },
  };
  
  return (
    <ColorModeProvider 
      settings={colorModeSettings}
      initialColorMode="system"
      storageKey="color-mode-example"
    >
      <div className="min-h-screen p-8 bg-background text-foreground transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end pb-4">
            <AdvancedModeToggle variant="glass" showLabels />
          </div>
          
          <ColorModeInfo />
          <AdvancedToggleShowcase />
        </div>
      </div>
    </ColorModeProvider>
  );
};

export default ColorModeExample;