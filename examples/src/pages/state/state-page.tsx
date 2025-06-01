import { render } from "@alexberriman/react-jedi";
import type { UISpecification, StateManager } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../lib/meta";
import { PageHeader } from "../../components/ui/page-header";

const stateSpec: UISpecification = {
  version: "1.0",
  metadata: {
    title: "State Management Demo",
    description: "Demonstrates state management with components",
  },
  state: {
    initial: {
      count: 0,
      message: "Click the button to increment",
      isVisible: true,
    },
    computed: {
      doubleCount: {
        dependencies: ["count"],
        expression: "count * 2",
      },
      displayMessage: {
        dependencies: ["count", "message"],
        expression: "count > 0 ? `Count is ${count}` : message",
      },
    },
  },
  root: {
    type: "Container",
    id: "root",
    children: [
      {
        type: "Heading",
        level: "h1",
        text: "State Management Demo",
      },
      {
        type: "Box",
        id: "counter-box",
        className: "my-8 p-6 border rounded-lg",
        children: [
          {
            type: "Heading",
            level: "h3",
            text: "Counter Example",
          },
          {
            type: "Text",
            text: "{{state.displayMessage}}",
            className: "mb-4",
          },
          {
            type: "Flex",
            gap: "4",
            align: "center",
            className: "mb-4",
            children: [
              {
                type: "Text",
                text: "Count: {{state.count}}",
              },
              {
                type: "Text",
                text: "Double: {{state.doubleCount}}",
                className: "text-muted-foreground",
              },
            ],
          },
          {
            type: "Flex",
            gap: "2",
            children: [
              {
                type: "Button",
                text: "Increment",
                variant: "primary",
                events: {
                  onClick: {
                    action: "incrementCount",
                  },
                },
              },
              {
                type: "Button",
                text: "Reset",
                variant: "outline",
                events: {
                  onClick: {
                    action: "resetCount",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        id: "toggle-box",
        className: "my-8 p-6 border rounded-lg",
        children: [
          {
            type: "Heading",
            level: "h3",
            text: "Visibility Toggle",
          },
          {
            type: "Button",
            text: "{{state.isVisible ? 'Hide' : 'Show'}} Content",
            variant: "secondary",
            className: "mb-4",
            events: {
              onClick: {
                action: "toggleVisibility",
              },
            },
          },
          {
            type: "Box",
            className: "p-4 bg-muted rounded",
            style: {
              display: "{{state.isVisible ? 'block' : 'none'}}",
            },
            children: {
              type: "Text",
              text: "This content is conditionally visible based on state",
            },
          },
        ],
      },
    ],
  },
};

export function StatePage() {
  usePageMetadata({
    title: "State Management",
    description:
      "React Jedi state management examples - JSON-driven state with actions and event handlers.",
  });

  return (
    <div className="flex flex-col">
      <PageHeader 
        title="State Management"
        description="React Jedi state management examples - JSON-driven state with actions and event handlers."
      />
      
      <div className="container mx-auto px-4 py-8">
        {render(stateSpec, {
          handlers: {
            incrementCount: (manager: StateManager) => {
              const currentCount = manager.getState().count || 0;
              manager.setState({ count: currentCount + 1 });
            },
            resetCount: (manager: StateManager) => {
              manager.setState({ count: 0 });
            },
            toggleVisibility: (manager: StateManager) => {
              const currentVisibility = manager.getState().isVisible;
              manager.setState({ isVisible: !currentVisibility });
            },
          },
        })}
      </div>
    </div>
  );
}
