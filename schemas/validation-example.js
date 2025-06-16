/**
 * Example of using React Jedi JSON Schemas for validation
 */

import Ajv from 'ajv';
import { schemas, validateComponentSpec } from './index.js';

// Initialize AJV with all schemas
const ajv = new Ajv({ 
  allErrors: true,
  verbose: true 
});

// Add all schemas to AJV instance
Object.entries(schemas).forEach(([type, schema]) => {
  ajv.addSchema(schema, type);
});

// Example 1: Validate a Grid component
const gridExample = {
  type: "Grid",
  columns: { base: 1, md: 2, lg: 3 },
  gap: 4,
  autoFit: true,
  minColWidth: "250px",
  children: [
    { type: "Card", children: "Card 1" },
    { type: "Card", children: "Card 2" },
    { type: "Card", children: "Card 3" }
  ]
};

console.log('Grid validation:');
validateComponentSpec(gridExample, ajv).then(result => {
  console.log('Valid:', result.valid);
  if (!result.valid) {
    console.log('Errors:', result.errors);
  }
});

// Example 2: Validate a Stack component
const stackExample = {
  type: "Stack",
  orientation: "vertical",
  spacing: "md",
  align: "center",
  divider: { type: "Separator" },
  children: [
    { type: "heading", level: "h2", content: "Section Title" },
    { type: "text", text: "Some description text" },
    { type: "Button", children: "Click me" }
  ]
};

console.log('\nStack validation:');
validateComponentSpec(stackExample, ajv).then(result => {
  console.log('Valid:', result.valid);
  if (!result.valid) {
    console.log('Errors:', result.errors);
  }
});

// Example 3: Validate a Toggle component
const toggleExample = {
  type: "Toggle",
  variant: "outline",
  size: "lg",
  defaultPressed: false,
  children: "Bold",
  onPressedChange: {
    action: "updateFormatting",
    payload: { format: "bold" }
  },
  "aria-label": "Toggle bold formatting"
};

console.log('\nToggle validation:');
validateComponentSpec(toggleExample, ajv).then(result => {
  console.log('Valid:', result.valid);
  if (!result.valid) {
    console.log('Errors:', result.errors);
  }
});

// Example 4: Validate a Tabs component
const tabsExample = {
  type: "Tabs",
  defaultValue: "account",
  orientation: "horizontal",
  children: [
    {
      type: "TabsList",
      children: [
        { type: "TabsTrigger", value: "account", children: "Account" },
        { type: "TabsTrigger", value: "password", children: "Password" },
        { type: "TabsTrigger", value: "settings", children: "Settings" }
      ]
    },
    {
      type: "TabsContent",
      value: "account",
      children: "Account settings content"
    },
    {
      type: "TabsContent", 
      value: "password",
      children: "Password settings content"
    },
    {
      type: "TabsContent",
      value: "settings",
      children: "General settings content"
    }
  ]
};

console.log('\nTabs validation:');
validateComponentSpec(tabsExample, ajv).then(result => {
  console.log('Valid:', result.valid);
  if (!result.valid) {
    console.log('Errors:', result.errors);
  }
});

// Example 5: Validate a Dialog component
const dialogExample = {
  type: "Dialog",
  defaultOpen: false,
  children: [
    {
      type: "DialogTrigger",
      asChild: true,
      children: {
        type: "Button",
        variant: "outline",
        children: "Open Dialog"
      }
    },
    {
      type: "DialogContent",
      children: [
        {
          type: "DialogHeader",
          children: [
            { type: "DialogTitle", children: "Are you sure?" },
            { type: "DialogDescription", children: "This action cannot be undone." }
          ]
        },
        {
          type: "DialogFooter",
          children: [
            { type: "DialogClose", children: "Cancel" },
            { type: "Button", variant: "destructive", children: "Delete" }
          ]
        }
      ]
    }
  ]
};

console.log('\nDialog validation:');
validateComponentSpec(dialogExample, ajv).then(result => {
  console.log('Valid:', result.valid);
  if (!result.valid) {
    console.log('Errors:', result.errors);
  }
});

// Example 6: Invalid component (should fail validation)
const invalidExample = {
  type: "Grid",
  columns: "invalid", // Should be number or object
  gap: -5, // Should be >= 0
  unknownProp: "not allowed" // Additional properties not allowed
};

console.log('\nInvalid Grid validation:');
validateComponentSpec(invalidExample, ajv).then(result => {
  console.log('Valid:', result.valid);
  if (!result.valid) {
    console.log('Errors:', JSON.stringify(result.errors, null, 2));
  }
});