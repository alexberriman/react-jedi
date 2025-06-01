import { render } from "@alexberriman/react-jedi";

export function MarketingDebugPage() {
  
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
  } catch (error_) {
    console.error("Render error:", error_);
    return <div className="p-8 text-red-500">Error: {error_ instanceof Error ? error_.message : "Unknown error"}</div>;
  }
}