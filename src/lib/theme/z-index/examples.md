# Z-Index Management System

The Z-Index Management System provides a standardized approach to handling z-index values in your application, ensuring consistent stacking order and preventing z-index wars.

## Basic Usage

### Using the default z-index values

```tsx
import { defaultZIndices, getZIndex } from "@alexberriman/react-jedi";

// Default z-index values are available for common UI layers
console.log(defaultZIndices.modal); // 50
console.log(defaultZIndices.tooltip); // 80

// You can get z-index values from a theme
const zIndex = getZIndex(theme, "modal"); // 50 (or custom value from theme)
```

### In a React component using the hook

```tsx
import React from "react";
import { useZIndex } from "@alexberriman/react-jedi";

function Modal() {
  const zIndex = useZIndex();
  
  return (
    <>
      {/* Using semantic layer names */}
      <div style={zIndex.style("overlay")}>
        {/* Backdrop */}
      </div>
      
      <div style={zIndex.style("modal")}>
        {/* Modal content */}
      </div>
      
      {/* Using relative values */}
      <div style={{ zIndex: zIndex.getRelative("modal", 1) }}>
        {/* Modal close button that should appear above the modal */}
      </div>
    </>
  );
}
```

## Creating custom z-index scales

You can create custom z-index scales by merging your values with the defaults:

```tsx
import { createZIndexScale } from "@alexberriman/react-jedi";

// Create a custom z-index scale
const customZIndices = createZIndexScale({
  // Override defaults
  modal: 100,
  
  // Add custom layers
  subNav: 25,
  modalHeader: 105
});
```

## Using Z-Index with Theme

The z-index system integrates with the theme system:

```tsx
// In your theme definition
const myTheme = {
  // ...other theme properties
  zIndices: {
    // Custom z-index values
    modal: 100,
    tooltip: 150,
    
    // Application-specific layers
    navBar: 40,
    sidebar: 35,
    floatingButton: 45
  }
};
```

## Creating CSS Variables

You can convert z-index values to CSS variables:

```tsx
import { createZIndexCSSVariables } from "@alexberriman/react-jedi";

const cssVars = createZIndexCSSVariables(defaultZIndices);
// Result:
// {
//   "--z-hide": "-1",
//   "--z-base": "0",
//   "--z-content": "1",
//   // ...and so on
// }

// These can be applied to a root element
document.documentElement.style.setProperty("--z-modal", "50");
```

## Best Practices

1. **Use semantic layer names** instead of arbitrary numbers
2. **Keep z-index values in one place** (your theme)
3. **Use relative values** within related components
4. **Limit the number of stacking contexts** in your application
5. **Use the useZIndex hook** for component-level access to z-index values