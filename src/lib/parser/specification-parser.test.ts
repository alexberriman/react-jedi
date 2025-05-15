/**
 * Specification Parser Tests
 *
 * This file contains test cases for the specification parser.
 */

import { describe, it, expect } from 'vitest';
import {
  SpecificationParser,
  SpecificationParserErrorType,
  parseSpecification,
  createParser,
  createValidationReport,
} from './specification-parser';
import { type UISpecification, type ComponentSpec } from '@/types/schema/components';

describe('SpecificationParser', () => {
  // Basic JSON parsing tests
  describe('JSON Parsing', () => {
    it('should parse valid JSON strings', () => {
      const json = `{
        "type": "Button",
        "children": "Click Me"
      }`;
      
      const result = parseSpecification(json, { validateSchemas: false });
      expect(result.ok).toBe(true);
      
      if (result.ok) {
        const spec = result.val as ComponentSpec;
        expect(spec.type).toBe('Button');
        expect(spec.children).toBe('Click Me');
      }
    });
    
    it('should return error for invalid JSON', () => {
      const json = `{
        "type": "Button",
        "children": "Click Me"
      `;
      
      const result = parseSpecification(json);
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        expect(result.val.type).toBe(SpecificationParserErrorType.INVALID_FORMAT);
        expect(result.val.message).toContain('Invalid JSON');
        expect(result.val.suggestions).toBeDefined();
        expect(result.val.suggestions!.length).toBeGreaterThan(0);
      }
    });
  });
  
  // Component spec parsing tests
  describe('Component Spec Parsing', () => {
    it('should parse a valid component spec', () => {
      const spec = {
        type: 'Button',
        children: 'Click Me',
        events: {
          click: {
            action: 'incrementCounter',
            params: { value: 1 }
          }
        }
      };
      
      const result = parseSpecification(spec, { validateSchemas: false });
      expect(result.ok).toBe(true);
      
      if (result.ok) {
        const parsedSpec = result.val as ComponentSpec;
        expect(parsedSpec.type).toBe('Button');
        expect(parsedSpec.children).toBe('Click Me');
        expect(parsedSpec.events?.click.action).toBe('incrementCounter');
        expect(parsedSpec.events?.click.params?.value).toBe(1);
      }
    });
    
    it('should return error for component without type', () => {
      const spec = {
        children: 'Click Me'
      };
      
      const result = parseSpecification(spec, { validateSchemas: false });
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        expect(result.val.type).toBe(SpecificationParserErrorType.INVALID_FORMAT);
        expect(result.val.message).toContain('Missing required properties');
        expect(result.val.suggestions).toBeDefined();
        expect(result.val.suggestions!.some(s => s.includes('type'))).toBe(true);
      }
    });
    
    it('should return error for invalid event handler', () => {
      const spec = {
        type: 'Button',
        children: 'Click Me',
        events: {
          click: { 
            // Missing 'action' property
            params: { value: 1 }
          }
        }
      };
      
      const result = parseSpecification(spec, { validateSchemas: false });
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        expect(result.val.type).toBe(SpecificationParserErrorType.INVALID_FORMAT);
        expect(result.val.message).toContain("Invalid event handler");
        expect(result.val.suggestions).toBeDefined();
        expect(result.val.suggestions!.some(s => s.includes('action'))).toBe(true);
      }
    });
  });
  
  // UI Specification parsing tests
  describe('UI Specification Parsing', () => {
    it('should parse a valid UI specification', () => {
      const spec = {
        version: '1.0.0',
        metadata: {
          title: 'Test UI',
          description: 'Test UI Specification'
        },
        root: {
          type: 'Container',
          children: [
            {
              type: 'Heading',
              children: 'Hello World'
            }
          ]
        },
        theme: {
          colors: {
            primary: '#3b82f6'
          }
        },
        state: {
          initial: {
            counter: 0
          }
        }
      };
      
      const result = parseSpecification(spec, { validateSchemas: false });
      expect(result.ok).toBe(true);
      
      if (result.ok) {
        const parsedSpec = result.val as UISpecification;
        expect(parsedSpec.version).toBe('1.0.0');
        expect(parsedSpec.metadata?.title).toBe('Test UI');
        expect(parsedSpec.root.type).toBe('Container');
        expect(Array.isArray(parsedSpec.root.children)).toBe(true);
        
        const children = parsedSpec.root.children as ComponentSpec[];
        expect(children[0].type).toBe('Heading');
        expect(children[0].children).toBe('Hello World');
        
        expect(parsedSpec.theme?.colors?.primary).toBe('#3b82f6');
        expect(parsedSpec.state?.initial?.counter).toBe(0);
      }
    });
    
    it('should return error for UI specification without version', () => {
      const spec = {
        root: {
          type: 'Container'
        }
      };
      
      const result = parseSpecification(spec, { validateSchemas: false });
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        expect(result.val.type).toBe(SpecificationParserErrorType.INVALID_FORMAT);
        expect(result.val.message).toContain('version must be a string');
        expect(result.val.suggestions).toBeDefined();
        expect(result.val.suggestions!.some(s => s.toLowerCase().includes('version'))).toBe(true);
      }
    });
    
    it('should return error for UI specification without root', () => {
      const spec = {
        version: '1.0.0'
      };
      
      const result = parseSpecification(spec);
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        expect(result.val.type).toBe(SpecificationParserErrorType.INVALID_FORMAT);
        expect(result.val.message).toContain('root must be an object');
        expect(result.val.suggestions).toBeDefined();
        expect(result.val.suggestions!.some(s => s.toLowerCase().includes('root'))).toBe(true);
      }
    });
  });
  
  // Children parsing tests
  describe('Children Parsing', () => {
    it('should parse string children', () => {
      const spec = {
        type: 'Text',
        children: 'Hello World'
      };
      
      const result = parseSpecification(spec);
      expect(result.ok).toBe(true);
      
      if (result.ok) {
        const parsedSpec = result.val as ComponentSpec;
        expect(parsedSpec.children).toBe('Hello World');
      }
    });
    
    it('should parse single component children', () => {
      const spec = {
        type: 'Box',
        children: {
          type: 'Text',
          children: 'Hello World'
        }
      };
      
      const result = parseSpecification(spec);
      expect(result.ok).toBe(true);
      
      if (result.ok) {
        const parsedSpec = result.val as ComponentSpec;
        const childSpec = parsedSpec.children as ComponentSpec;
        expect(childSpec.type).toBe('Text');
        expect(childSpec.children).toBe('Hello World');
      }
    });
    
    it('should parse array of component children', () => {
      const spec = {
        type: 'Box',
        children: [
          {
            type: 'Heading',
            children: 'Title'
          },
          {
            type: 'Text',
            children: 'Content'
          }
        ]
      };
      
      const result = parseSpecification(spec);
      expect(result.ok).toBe(true);
      
      if (result.ok) {
        const parsedSpec = result.val as ComponentSpec;
        const children = parsedSpec.children as ComponentSpec[];
        expect(Array.isArray(children)).toBe(true);
        expect(children.length).toBe(2);
        expect(children[0].type).toBe('Heading');
        expect(children[0].children).toBe('Title');
        expect(children[1].type).toBe('Text');
        expect(children[1].children).toBe('Content');
      }
    });
    
    it('should return error for invalid children in array', () => {
      const spec = {
        type: 'Box',
        children: [
          {
            type: 'Heading',
            children: 'Title'
          },
          {
            // Missing 'type' property
            children: 'Content'
          }
        ]
      };
      
      const result = parseSpecification(spec);
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        expect(result.val.type).toBe(SpecificationParserErrorType.INVALID_FORMAT);
        expect(result.val.message).toContain('Invalid child component');
        expect(result.val.path).toContain('1');  // Error in the second child (index 1)
        expect(result.val.suggestions).toBeDefined();
        expect(result.val.suggestions!.some(s => s.includes('type'))).toBe(true);
      }
    });
  });
  
  // Parser configuration tests
  describe('Parser Configuration', () => {
    it('should create parser with custom options', () => {
      const parser = createParser({
        development: true,
        validateSchemas: false,
        stopAtFirstError: true,
      });
      
      // Since options are private, we can't directly test them
      // Instead test behavior that would be affected by options
      expect(parser).toBeInstanceOf(SpecificationParser);
      
      // Validate without schema validation
      const result = parser.parse({
        // Invalid spec, but validateSchemas is false so it should pass basic parsing
        type: 'InvalidComponentType',
        invalidProp: true,
      });
      
      expect(result.ok).toBe(true);
    });
  });
  
  // Enhanced validation and error formatting
  describe('Validation and Error Formatting', () => {
    it('should format errors with suggestions', () => {
      const spec = {
        type: 'Grid',
        columns: 15, // Invalid (> 12)
        children: [
          { type: 'Box', children: 'Item 1' },
        ],
      };
      
      const parser = createParser({ 
        development: true,
        includeSuggestions: true,
      });
      
      const result = parser.parse(spec);
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        // Verify semantic validation triggered (Grid columns validation)
        expect(result.val.type).toBe(SpecificationParserErrorType.SEMANTIC_VALIDATION);
        
        // Format error and check it contains suggestions
        const formattedError = parser.formatError(result.val);
        expect(formattedError).toContain('Error:');
        expect(formattedError).toContain('columns');
        expect(formattedError).toContain('Suggestions:');
      }
    });
    
    it('should create detailed validation report', () => {
      const spec = {
        type: 'Grid',
        columns: 15, // Invalid (> 12)
        children: [], // Warning (empty grid)
      };
      
      const report = createValidationReport(spec);
      
      // Check report contains semantic validation errors
      expect(report).toContain('Validation Error Report');
      expect(report).toContain('SEMANTIC Stage Errors');
      expect(report).toContain('columns must be between 1 and 12');
      
      // Should also have a warning about empty grid
      expect(report).toContain('Grid should contain at least one child item');
    });
    
    it('should apply validation pipeline with semantic rules', () => {
      const spec = {
        type: 'Heading',
        level: 7, // Invalid (> 6)
        // Missing children - should trigger warning
      };
      
      const result = parseSpecification(spec);
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        // Should detect semantic error with heading level
        expect(result.val.type).toBe(SpecificationParserErrorType.SEMANTIC_VALIDATION);
        // Changed expectation to match actual error message
        expect(result.val.message).toContain('Heading level must be between 1 and 6');
        expect(result.val.suggestions).toBeDefined();
        expect(result.val.suggestions!.some(s => s.includes('between 1 and 6'))).toBe(true);
      }
    });
  });
});