/**
 * Tests for React Jedi JSON Schemas
 */

import { describe, it, expect } from 'vitest';
import Ajv from 'ajv';
import gridSchema from '../../../schemas/grid.schema.json';
import stackSchema from '../../../schemas/stack.schema.json';
import toggleSchema from '../../../schemas/toggle.schema.json';
import tabsSchema from '../../../schemas/tabs.schema.json';
import dialogSchema from '../../../schemas/dialog.schema.json';

const schemas = {
  Grid: gridSchema,
  Stack: stackSchema,
  Toggle: toggleSchema,
  Tabs: tabsSchema,
  Dialog: dialogSchema
};

const ajv = new Ajv({ allErrors: true });

describe('JSON Schema Validation', () => {
  describe('Grid Schema', () => {
    const validate = ajv.compile(schemas.Grid);

    it('should validate a basic grid', () => {
      const spec = {
        type: 'Grid',
        columns: 3,
        gap: 4
      };
      expect(validate(spec)).toBe(true);
    });

    it('should validate responsive columns', () => {
      const spec = {
        type: 'Grid',
        columns: { base: 1, md: 2, lg: 3 },
        gap: { base: 2, md: 4 }
      };
      expect(validate(spec)).toBe(true);
    });

    it('should validate autoFit grid', () => {
      const spec = {
        type: 'Grid',
        autoFit: true,
        minColWidth: '250px',
        gap: 4
      };
      expect(validate(spec)).toBe(true);
    });

    it('should reject invalid column values', () => {
      const spec = {
        type: 'Grid',
        columns: 'invalid'
      };
      expect(validate(spec)).toBe(false);
    });

    it('should reject negative gap values', () => {
      const spec = {
        type: 'Grid',
        gap: -5
      };
      expect(validate(spec)).toBe(false);
    });
  });

  describe('Stack Schema', () => {
    const validate = ajv.compile(schemas.Stack);

    it('should validate a basic stack', () => {
      const spec = {
        type: 'Stack',
        orientation: 'vertical',
        spacing: 'md'
      };
      expect(validate(spec)).toBe(true);
    });

    it('should validate stack with divider', () => {
      const spec = {
        type: 'Stack',
        spacing: 'lg',
        divider: { type: 'Separator' }
      };
      expect(validate(spec)).toBe(true);
    });

    it('should reject invalid orientation', () => {
      const spec = {
        type: 'Stack',
        orientation: 'diagonal'
      };
      expect(validate(spec)).toBe(false);
    });

    it('should reject invalid spacing', () => {
      const spec = {
        type: 'Stack',
        spacing: 'huge'
      };
      expect(validate(spec)).toBe(false);
    });
  });

  describe('Toggle Schema', () => {
    const validate = ajv.compile(schemas.Toggle);

    it('should validate a basic toggle', () => {
      const spec = {
        type: 'Toggle',
        children: 'Bold'
      };
      expect(validate(spec)).toBe(true);
    });

    it('should validate toggle with all properties', () => {
      const spec = {
        type: 'Toggle',
        variant: 'outline',
        size: 'lg',
        defaultPressed: false,
        disabled: false,
        onPressedChange: {
          action: 'handleToggle',
          payload: { id: 'bold' }
        }
      };
      expect(validate(spec)).toBe(true);
    });

    it('should reject invalid variant', () => {
      const spec = {
        type: 'Toggle',
        variant: 'ghost'
      };
      expect(validate(spec)).toBe(false);
    });

    it('should reject invalid event handler', () => {
      const spec = {
        type: 'Toggle',
        onPressedChange: 'handleToggle' // Should be object
      };
      expect(validate(spec)).toBe(false);
    });
  });

  describe('Tabs Schema', () => {
    it('should validate tabs container', () => {
      const spec = {
        type: 'Tabs',
        defaultValue: 'tab1',
        orientation: 'horizontal'
      };
      
      // Note: The schema uses oneOf, so we need to check against the specific definition
      const tabsSchema = schemas.Tabs.definitions.Tabs;
      const validate = ajv.compile(tabsSchema);
      expect(validate(spec)).toBe(true);
    });

    it('should validate tabs list', () => {
      const spec = {
        type: 'TabsList',
        loop: true
      };
      
      const tabsListSchema = schemas.Tabs.definitions.TabsList;
      const validate = ajv.compile(tabsListSchema);
      expect(validate(spec)).toBe(true);
    });

    it('should validate tabs trigger', () => {
      const spec = {
        type: 'TabsTrigger',
        value: 'tab1',
        disabled: false
      };
      
      const tabsTriggerSchema = schemas.Tabs.definitions.TabsTrigger;
      const validate = ajv.compile(tabsTriggerSchema);
      expect(validate(spec)).toBe(true);
    });

    it('should reject tabs trigger without value', () => {
      const spec = {
        type: 'TabsTrigger'
      };
      
      const tabsTriggerSchema = schemas.Tabs.definitions.TabsTrigger;
      const validate = ajv.compile(tabsTriggerSchema);
      expect(validate(spec)).toBe(false);
    });
  });

  describe('Dialog Schema', () => {
    it('should validate dialog container', () => {
      const spec = {
        type: 'Dialog',
        defaultOpen: false,
        modal: true
      };
      
      const dialogSchema = schemas.Dialog.definitions.Dialog;
      const validate = ajv.compile(dialogSchema);
      expect(validate(spec)).toBe(true);
    });

    it('should validate dialog content', () => {
      const spec = {
        type: 'DialogContent',
        forceMount: true,
        onEscapeKeyDown: {
          action: 'closeDialog'
        }
      };
      
      const dialogContentSchema = schemas.Dialog.definitions.DialogContent;
      const validate = ajv.compile(dialogContentSchema);
      expect(validate(spec)).toBe(true);
    });

    it('should validate dialog trigger', () => {
      const spec = {
        type: 'DialogTrigger',
        asChild: true
      };
      
      const dialogTriggerSchema = schemas.Dialog.definitions.DialogTrigger;
      const validate = ajv.compile(dialogTriggerSchema);
      expect(validate(spec)).toBe(true);
    });
  });

  describe('Common Properties', () => {
    it('should allow className on all components', () => {
      const specs = [
        { type: 'Grid', className: 'custom-grid' },
        { type: 'Stack', className: 'custom-stack' },
        { type: 'Toggle', className: 'custom-toggle' }
      ];

      specs.forEach(spec => {
        const validate = ajv.compile(schemas[spec.type]);
        expect(validate(spec)).toBe(true);
      });
    });

    it('should allow id and style on all components', () => {
      const specs = [
        { type: 'Grid', id: 'main-grid', style: { marginTop: '20px' } },
        { type: 'Stack', id: 'main-stack', style: { padding: '10px' } },
        { type: 'Toggle', id: 'bold-toggle', style: { color: 'blue' } }
      ];

      specs.forEach(spec => {
        const validate = ajv.compile(schemas[spec.type]);
        expect(validate(spec)).toBe(true);
      });
    });

    it('should reject additional properties by default', () => {
      const spec = {
        type: 'Grid',
        unknownProp: 'value'
      };
      
      const validate = ajv.compile(schemas.Grid);
      expect(validate(spec)).toBe(false);
    });
  });
});