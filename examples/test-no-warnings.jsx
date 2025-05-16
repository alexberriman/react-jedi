import React from "react";
import ReactDOM from "react-dom/client";
import { render } from "../dist/index.js";

// Test that no React warnings are produced
const originalError = console.error;
const warnings = [];
console.error = (...args) => {
  warnings.push(args);
  originalError(...args);
};

const spec = {
  type: "Box",
  props: {
    className: "test-class",
  },
  children: [
    {
      type: "Container",
      children: [
        {
          type: "Heading",
          props: {
            level: 1,
          },
          children: "Test Heading"
        },
        {
          type: "Text",
          children: "This should render without React warnings"
        }
      ]
    }
  ]
};

const element = render(spec, {
  theme: { primary: "blue" },
  initialState: { count: 0 }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);

// Check for warnings after a short delay
setTimeout(() => {
  const propWarnings = warnings.filter(args => 
    args[0]?.includes("React does not recognize") ||
    args[0]?.includes("Invalid DOM property") ||
    args[0]?.includes("parentContext") ||
    args[0]?.includes("theme") ||
    args[0]?.includes("state")
  );
  
  if (propWarnings.length > 0) {
    console.log("FAIL: React warnings found:");
    propWarnings.forEach(warn => console.log(warn[0]));
  } else {
    console.log("PASS: No React prop warnings found");
  }
  
  // Log any other warnings
  const otherWarnings = warnings.filter(args => !propWarnings.includes(args));
  if (otherWarnings.length > 0) {
    console.log("\nOther warnings:");
    otherWarnings.forEach(warn => console.log(warn[0]));
  }
}, 100);