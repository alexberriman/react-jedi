import React from "react";
import { render } from "../lib/render";
import { ComponentSpec } from "../types/schema/components";
import { useEventDebugger } from "../lib/events";

export function EventHandlersExample() {
  const { DebuggerPortal, toggleDebugger } = useEventDebugger({ enabled: true });

  const spec: ComponentSpec = {
    type: "Flex",
    direction: "column",
    className: "gap-4 p-6",
    children: [
      {
        type: "Heading",
        level: "h2",
        children: "Event Handlers Example",
      },
      {
        type: "Text",
        children: "Try interacting with the components below",
      },
      {
        type: "Button",
        id: "counter-button",
        children: "Click Counter: 0",
        eventHandlers: {
          click: {
            type: "click",
            handler: {
              type: "INCREMENT",
              payload: {
                key: "counter",
                amount: 1,
              },
            },
          },
        },
      },
      {
        type: "Button",
        id: "toggle-button",
        variant: "secondary",
        children: "Toggle State",
        eventHandlers: {
          click: {
            type: "click",
            handler: {
              type: "TOGGLE",
              payload: {
                key: "isToggled",
              },
            },
          },
        },
      },
      {
        type: "Input",
        id: "text-input",
        placeholder: "Type something...",
        eventHandlers: {
          change: {
            type: "change",
            handler: {
              type: "UPDATE_VALUE",
              payload: {
                key: "inputText",
                value: "$event.target.value",
              },
            },
          },
        },
      },
      {
        type: "Box",
        className: "p-4 border rounded",
        children: [
          {
            type: "Text",
            children: "State:",
          },
          {
            type: "pre",
            children: JSON.stringify({ counter: 0, isToggled: false, inputText: "" }, null, 2),
          },
        ],
      },
    ],
  };

  return (
    <>
      {render(spec, {
        development: true,
        initialState: {
          counter: 0,
          isToggled: false,
          inputText: "",
        },
      })}
      <button
        onClick={toggleDebugger}
        className="fixed bottom-4 left-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Event Debugger
      </button>
      <DebuggerPortal />
    </>
  );
}
