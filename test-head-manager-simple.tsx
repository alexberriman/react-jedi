import React from "react";
import { render } from "./src/lib/render";

// Test HeadManager in SDUI mode
const TestHeadManagerSDUI = () => {
  const spec = {
    type: "HeadManager",
    metadata: {
      title: "SDUI Test Page",
      description: "Testing HeadManager in SDUI mode",
      keywords: ["test", "sdui", "headmanager"],
      author: "Test Author"
    },
    children: {
      type: "Container",
      children: [
        {
          type: "Heading",
          level: 1,
          children: "HeadManager SDUI Test"
        },
        {
          type: "Text",
          children: "Check document.title in console"
        }
      ]
    }
  };

  React.useEffect(() => {
    // Check if metadata was applied after a short delay
    setTimeout(() => {
      console.log("=== HeadManager SDUI Test Results ===");
      console.log("Document title:", document.title);
      console.log("Meta description:", document.querySelector('meta[name="description"]')?.getAttribute("content"));
      console.log("Meta keywords:", document.querySelector('meta[name="keywords"]')?.getAttribute("content"));
      console.log("Meta author:", document.querySelector('meta[name="author"]')?.getAttribute("content"));
      console.log("=====================================");
    }, 100);
  }, []);

  return render(spec);
};

export default TestHeadManagerSDUI;