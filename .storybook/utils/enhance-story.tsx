import type { ComponentType, ReactElement } from "react";
import { useState } from "react";
import type { StoryObj } from "@storybook/react-vite";
import { render } from "../../src/lib/render";

type StoryConfig<T extends ComponentType<any>> = Omit<StoryObj<T>, "decorators"> & {
  renderSpec?: any;
};

interface EnhanceOptions {
  renderSpec?: any;
}

export function enhanceStoryForDualMode<T extends ComponentType<any>>(
  storyConfig: StoryConfig<T>,
  options?: EnhanceOptions
): StoryObj<T> {
  const { renderSpec, ...restConfig } = storyConfig;
  const finalRenderSpec = options?.renderSpec || renderSpec;

  return {
    ...restConfig,
    decorators: [
      (Story, context) => {
        const [mode, setMode] = useState<"react" | "sdui">("react");

        // If there's a custom render function and a renderSpec, we need to handle both modes
        if (restConfig.render && finalRenderSpec) {
          return (
            <div className="space-y-4">
              <div className="flex gap-2 p-2 border-b">
                <button
                  onClick={() => setMode("react")}
                  className={`px-3 py-1 rounded ${
                    mode === "react" ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}
                >
                  React
                </button>
                <button
                  onClick={() => setMode("sdui")}
                  className={`px-3 py-1 rounded ${
                    mode === "sdui" ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}
                >
                  SDUI
                </button>
                <button
                  onClick={() => setMode("sdui")}
                  className={`px-3 py-1 rounded ${
                    mode === "sdui" ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}
                >
                  JSON
                </button>
              </div>
              <div data-testid="story-render-mode" data-mode={mode}>
                {mode === "react" ? (
                  restConfig.render(context.args, context)
                ) : (
                  <div className="space-y-4">
                    {(() => {
                      // Extract handlers from the spec
                      const { handlers, ...specWithoutHandlers } = finalRenderSpec || {};
                      return (
                        <>
                          {render(specWithoutHandlers, { handlers: handlers || {} })}
                          <details className="border rounded p-4">
                            <summary className="cursor-pointer font-medium">View JSON Spec</summary>
                            <pre className="mt-4 overflow-auto text-sm bg-muted p-4 rounded">
                              {JSON.stringify(specWithoutHandlers, null, 2)}
                            </pre>
                          </details>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          );
        }

        // For stories with only args (no custom render), create the spec from args
        const componentName = context.title.split("/").pop() || "";
        
        // Extract handlers from the renderSpec if present
        const { handlers = {}, ...specWithoutHandlers } = finalRenderSpec || {};
        
        const spec = specWithoutHandlers || {
          type: componentName,
          ...context.args,
        };

        return (
          <div className="space-y-4">
            <div className="flex gap-2 p-2 border-b">
              <button
                onClick={() => setMode("react")}
                className={`px-3 py-1 rounded ${
                  mode === "react" ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}
              >
                React
              </button>
              <button
                onClick={() => setMode("sdui")}
                className={`px-3 py-1 rounded ${
                  mode === "sdui" ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}
              >
                SDUI
              </button>
              <button
                onClick={() => setMode("sdui")}
                className={`px-3 py-1 rounded ${
                  mode === "sdui" ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}
              >
                JSON
              </button>
            </div>
            <div data-testid="story-render-mode" data-mode={mode}>
              {mode === "react" ? (
                <Story {...context} />
              ) : (
                <div className="space-y-4">
                  {render(spec, { handlers: handlers as Record<string, (...args: unknown[]) => void> })}
                  <details className="border rounded p-4">
                    <summary className="cursor-pointer font-medium">View JSON Spec</summary>
                    <pre className="mt-4 overflow-auto text-sm bg-muted p-4 rounded">
                      {JSON.stringify(spec, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </div>
        );
      },
    ],
    play: async (context) => {
      // If there's an existing play function, we need to run it for both modes
      if (restConfig.play) {
        const { canvasElement } = context;
        
        // Test React mode
        await restConfig.play(context);
        
        // Switch to SDUI mode and test again
        const sduiButton = canvasElement.querySelector('button:nth-child(2)') as HTMLButtonElement;
        if (sduiButton) {
          sduiButton.click();
          
          // Wait for re-render
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Run tests again in SDUI mode
          await restConfig.play(context);
        }
      }
    },
  };
}