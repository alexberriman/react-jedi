import * as React from "react";
import { useState, useMemo } from "react";
import type { StoryContext, StoryFn } from "@storybook/react";
import { render } from "../../src/lib/render";
import { Toggle } from "../../src/components/ui/toggle";
import { ScrollArea } from "../../src/components/ui/scroll-area";
import { TabButton } from "../components/tab-button";
import { JsonSyntaxHighlighter } from "../components/json-syntax-highlighter";
import { CopyButton } from "../components/copy-button";
import { convertArgsToSpec } from "../utils/args-to-spec";
import type { ComponentSpec } from "../../src/types/schema/components";

// Icons (same as original)
function ReactIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
    </svg>
  );
}

function JsonIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7.5C4 6.67157 4.67157 6 5.5 6H9L12 9H19C19.8284 9 20.5 9.67157 20.5 10.5V17.5C20.5 18.3284 19.8284 19 19 19H5C4.17157 19 3.5 18.3284 3.5 17.5V7.5Z" />
      <path d="M9 13L11 15L15 11" />
    </svg>
  );
}

function CodeIcon({ className }: { readonly className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

// Helper to extract event handlers from the story context
function extractEventHandlers(context: StoryContext): Record<string, (...args: unknown[]) => void> {
  const handlers: Record<string, (...args: unknown[]) => void> = {};
  
  // Check if there are explicit handlers defined in parameters
  if (context.parameters?.dualMode?.handlers) {
    Object.assign(handlers, context.parameters.dualMode.handlers);
  }
  
  // Extract handlers from the renderSpec if available
  const renderSpec = context.parameters?.dualMode?.renderSpec;
  if (renderSpec) {
    extractHandlersFromSpec(renderSpec, handlers);
  }
  
  return handlers;
}

// Helper to create a placeholder handler
function createPlaceholderHandler(handlerName: string): (...args: unknown[]) => void {
  if (handlerName === 'handleDialogOpenChange') {
    return (...args: unknown[]) => {
      const open = args[0] as boolean;
      console.log(`Dialog open state changed to: ${open}`);
    };
  }
  return (...args: unknown[]) => {
    console.log(`Handler '${handlerName}' called with:`, args);
  };
}

// Helper to process action properties
function processActionProperty(
  key: string,
  value: unknown,
  handlers: Record<string, (...args: unknown[]) => void>
): void {
  if (key.endsWith('Action') && typeof value === 'string' && !handlers[value]) {
    handlers[value] = createPlaceholderHandler(value);
  }
}

// Helper to process children
function processChildren(
  children: unknown,
  handlers: Record<string, (...args: unknown[]) => void>
): void {
  if (Array.isArray(children)) {
    for (const child of children) {
      extractHandlersFromSpec(child, handlers);
    }
  } else if (children) {
    extractHandlersFromSpec(children, handlers);
  }
}

// Recursive function to extract action handlers from spec
function extractHandlersFromSpec(
  spec: unknown, 
  handlers: Record<string, (...args: unknown[]) => void>
): void {
  if (!spec || typeof spec !== 'object') return;
  
  const obj = spec as Record<string, unknown>;
  
  // Process each property
  for (const [key, value] of Object.entries(obj)) {
    processActionProperty(key, value, handlers);
    
    if (key === 'children') {
      processChildren(value, handlers);
    }
  }
}

export const DualModeDecoratorEnhanced = (Story: StoryFn, context: StoryContext) => {
  // Check if dual mode is enabled for this story
  const isDualModeEnabled = context.parameters?.dualMode?.enabled !== false;
  
  const [activeTab, setActiveTab] = useState<'react' | 'sdui'>('react');
  const [showJson, setShowJson] = useState(true);
  
  // State for dialog handling
  const [, setDialogStates] = useState<Record<string, boolean>>({});
  
  // Get custom spec or convert from args - must be called unconditionally
  const jsonSpec = useMemo(() => {
    if (!isDualModeEnabled) return null;
    
    if (context.parameters?.dualMode?.jsonSpec) {
      return context.parameters.dualMode.jsonSpec;
    }
    
    // For stories with render functions, we need a manual spec
    if (context.parameters?.dualMode?.renderSpec) {
      return context.parameters.dualMode.renderSpec;
    }
    
    return convertArgsToSpec(context.args, context.id);
  }, [context.args, context.id, context.parameters, isDualModeEnabled]);
  
  // Extract and enhance event handlers
  const handlers = useMemo(() => {
    const baseHandlers = extractEventHandlers(context);
    
    // Add stateful dialog handlers if needed, but don't override existing ones
    if (jsonSpec && hasDialogComponent(jsonSpec) && !baseHandlers.handleDialogOpenChange) {
      baseHandlers.handleDialogOpenChange = (...args: unknown[]) => {
        const open = args[0] as boolean;
        setDialogStates(prev => ({ ...prev, defaultDialog: open }));
        console.log('Dialog state changed:', open);
      };
    }
    
    return baseHandlers;
  }, [context, jsonSpec]);
  
  if (!isDualModeEnabled) {
    return <Story />;
  }
  
  return (
    <div className="w-full" data-dual-mode-decorator>
      <div className="space-y-4">
        {/* Tab Header */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <TabButton 
                active={activeTab === 'react'} 
                onClick={() => setActiveTab('react')}
                icon={<ReactIcon />}
              >
                React Component
              </TabButton>
              <TabButton 
                active={activeTab === 'sdui'} 
                onClick={() => setActiveTab('sdui')}
                icon={<JsonIcon />}
              >
                SDUI (JSON)
              </TabButton>
            </div>
            
            {activeTab === 'sdui' && (
              <Toggle
                pressed={showJson}
                onPressedChange={setShowJson}
                size="sm"
                variant="outline"
                aria-label="Toggle JSON preview"
                className="cursor-pointer"
              >
                <CodeIcon className="w-4 h-4 mr-2" />
                {showJson ? 'Hide' : 'Show'} JSON
              </Toggle>
            )}
          </div>
        </div>
        
        {/* Content Area */}
        <div className="relative px-4 pb-4">
          {activeTab === 'react' ? (
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div data-testid="react-render">
                <Story />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* SDUI Rendered View */}
              <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                <div data-testid="sdui-render">
                  {render(jsonSpec as ComponentSpec, { 
                    handlers,
                    development: true // Enable development mode for better debugging
                  })}
                </div>
              </div>
              
              {/* JSON Preview Panel */}
              {showJson && (
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                    <span className="text-xs font-mono text-gray-400">
                      Component Specification
                    </span>
                    <CopyButton text={JSON.stringify(jsonSpec, null, 2)} />
                  </div>
                  <ScrollArea className="h-[400px]">
                    <div className="p-4">
                      <JsonSyntaxHighlighter spec={jsonSpec} />
                    </div>
                  </ScrollArea>
                  
                  {/* Show handlers info in development */}
                  {Object.keys(handlers).length > 0 && (
                    <div className="border-t border-gray-700 p-4">
                      <p className="text-xs font-mono text-gray-400 mb-2">Active Handlers:</p>
                      <ul className="text-xs font-mono text-green-400">
                        {Object.keys(handlers).map(name => (
                          <li key={name}>• {name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper to check if spec contains dialog components
function hasDialogComponent(spec: unknown): boolean {
  if (!spec || typeof spec !== 'object') return false;
  
  const obj = spec as Record<string, unknown>;
  
  if (obj.type === 'Dialog' || obj.type === 'dialog') return true;
  
  if (obj.children) {
    if (Array.isArray(obj.children)) {
      return obj.children.some(child => hasDialogComponent(child));
    }
    return hasDialogComponent(obj.children);
  }
  
  return false;
}