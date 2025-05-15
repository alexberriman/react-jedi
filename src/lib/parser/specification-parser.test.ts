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
      
      const result = parseSpecification(json);
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
      
      const result = parseSpecification(spec);
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
      
      const result = parseSpecification(spec);
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        expect(result.val.type).toBe(SpecificationParserErrorType.INVALID_FORMAT);
        expect(result.val.message).toContain('Missing required properties');
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
      
      const result = parseSpecification(spec);
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        expect(result.val.type).toBe(SpecificationParserErrorType.INVALID_FORMAT);
        expect(result.val.message).toContain("Invalid event handler");
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
      
      const result = parseSpecification(spec);
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
      
      const result = parseSpecification(spec);
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        expect(result.val.type).toBe(SpecificationParserErrorType.INVALID_FORMAT);
        expect(result.val.message).toContain('version must be a string');
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
      }
    });
  });
  
  // Parser configuration tests
  describe('Parser Configuration', () => {
    it('should create parser with custom options', () => {
      const parser = createParser({
        development: true,
        validateSchemas: false,
      });
      
      // Since options are private, we can't directly test them
      // Instead test behavior that would be affected by options
      expect(parser).toBeInstanceOf(SpecificationParser);
    });
  });
});