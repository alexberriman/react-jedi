/**
 * React Jedi JSON Schema Type Definitions
 */

import { JSONSchema7 } from 'json-schema';

// Individual schema exports
export declare const gridSchema: JSONSchema7;
export declare const stackSchema: JSONSchema7;
export declare const toggleSchema: JSONSchema7;
export declare const tabsSchema: JSONSchema7;
export declare const dialogSchema: JSONSchema7;

// Collection of all schemas
export declare const schemas: {
  Grid: JSONSchema7;
  Stack: JSONSchema7;
  Toggle: JSONSchema7;
  Tabs: JSONSchema7;
  Dialog: JSONSchema7;
};

// Schema URI mapping
export declare const schemaURIs: {
  Grid: string;
  Stack: string;
  Toggle: string;
  Tabs: string;
  Dialog: string;
};

// Helper functions
export declare function getSchema(componentType: string): JSONSchema7 | undefined;

export declare function validateComponentSpec(
  componentSpec: { type: string; [key: string]: any },
  ajvInstance: any
): Promise<{
  valid: boolean;
  errors: any[];
}>;

// Component specification types derived from schemas
export interface GridSpec {
  type: 'Grid';
  columns?: number | { base?: number; sm?: number; md?: number; lg?: number; xl?: number; '2xl'?: number };
  gap?: number | { base?: number; sm?: number; md?: number; lg?: number; xl?: number; '2xl'?: number };
  autoFit?: boolean;
  minColWidth?: string;
  colWidth?: string;
  rows?: number | { base?: number; sm?: number; md?: number; lg?: number; xl?: number; '2xl'?: number };
  areas?: string[];
  flow?: 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense';
  stretch?: boolean;
  children?: any;
  className?: string;
  id?: string;
  style?: Record<string, any>;
}

export interface StackSpec {
  type: 'Stack';
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  as?: string;
  divider?: { type: string; [key: string]: any };
  children?: any;
  className?: string;
  id?: string;
  style?: Record<string, any>;
}

export interface ToggleSpec {
  type: 'Toggle';
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  pressed?: boolean;
  defaultPressed?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  children?: any;
  onPressedChange?: {
    action: string;
    payload?: Record<string, any>;
  };
  className?: string;
  id?: string;
  style?: Record<string, any>;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export interface TabsSpec {
  type: 'Tabs';
  defaultValue?: string;
  value?: string;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  activationMode?: 'automatic' | 'manual';
  animate?: boolean;
  children?: any;
  onValueChange?: {
    action: string;
    payload?: Record<string, any>;
  };
  className?: string;
  id?: string;
  style?: Record<string, any>;
}

export interface DialogSpec {
  type: 'Dialog';
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  children?: any;
  onOpenChange?: {
    action: string;
    payload?: Record<string, any>;
  };
}

export type ComponentSpec = GridSpec | StackSpec | ToggleSpec | TabsSpec | DialogSpec;