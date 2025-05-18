import { render } from "@banja/react-jedi";
import { useEffect, useState } from "react";
import { Box, Text, Container } from "@banja/react-jedi";

export function MarketingDebugPage() {
  const [error, setError] = useState<string | null>(null);
  
  const schema = {
    type: "Box",
    props: {
      className: "p-8"
    },
    children: [
      {
        type: "Text",
        props: {
          className: "text-2xl font-bold mb-4",
          children: "Debug Page - Testing Component Resolution"
        }
      },
      {
        type: "Text",
        props: {
          className: "mb-4",
          children: "If you can see this text, the component resolver is working correctly."
        }
      },
      {
        type: "Badge",
        props: {
          variant: "outline",
          children: "Test Badge"
        }
      },
      {
        type: "Container",
        props: {
          className: "mt-8"
        },
        children: [
          {
            type: "Text",
            props: {
              children: "Container content"
            }
          }
        ]
      }
    ]
  };
  
  try {
    return render(schema);
  } catch (e) {
    console.error("Render error:", e);
    return <div className="p-8 text-red-500">Error: {e instanceof Error ? e.message : "Unknown error"}</div>;
  }
}