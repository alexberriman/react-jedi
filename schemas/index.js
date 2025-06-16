/**
 * React Jedi JSON Schema Definitions
 * 
 * This file provides a convenient way to import all JSON schemas
 * for use with JSON Schema validators like AJV.
 */

import gridSchema from './grid.schema.json';
import stackSchema from './stack.schema.json';
import toggleSchema from './toggle.schema.json';
import tabsSchema from './tabs.schema.json';
import dialogSchema from './dialog.schema.json';

// Export individual schemas
export {
  gridSchema,
  stackSchema,
  toggleSchema,
  tabsSchema,
  dialogSchema
};

// Export all schemas as a collection
export const schemas = {
  Grid: gridSchema,
  Stack: stackSchema,
  Toggle: toggleSchema,
  Tabs: tabsSchema,
  Dialog: dialogSchema
};

// Export schema URIs for reference
export const schemaURIs = {
  Grid: 'https://react-jedi.com/schemas/grid.schema.json',
  Stack: 'https://react-jedi.com/schemas/stack.schema.json',
  Toggle: 'https://react-jedi.com/schemas/toggle.schema.json',
  Tabs: 'https://react-jedi.com/schemas/tabs.schema.json',
  Dialog: 'https://react-jedi.com/schemas/dialog.schema.json'
};

// Helper function to get schema by component type
export function getSchema(componentType) {
  return schemas[componentType];
}

// Helper function to validate a component spec
export async function validateComponentSpec(componentSpec, ajvInstance) {
  const schema = getSchema(componentSpec.type);
  if (!schema) {
    throw new Error(`No schema found for component type: ${componentSpec.type}`);
  }
  
  const validate = ajvInstance.compile(schema);
  const valid = validate(componentSpec);
  
  return {
    valid,
    errors: validate.errors || []
  };
}