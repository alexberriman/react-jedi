/**
 * Specification Validator Tests
 *
 * This file contains test cases for the specification validator.
 */

import { describe, it, expect } from 'vitest';
import {
  SpecificationValidator,
  validateUISpecification,
  validateComponentSpec,
  createValidator,
} from './specification-validator';
import { SpecificationParserErrorType } from './specification-parser';
import { type UISpecification, type ComponentSpec } from '@/types/schema/components';
import { type ColorScale } from '@/types/schema/specification';

describe('SpecificationValidator', () => {
  // UI Specification validation tests
  describe('UI Specification Validation', () => {
    it('should validate a valid UI specification', () => {
      const spec: UISpecification = {
        version: '1.0.0',
        metadata: {
          title: 'Test UI',
          description: 'Test UI Specification',
          author: 'Test Author',
          createdAt: new Date().toISOString(),
        },
        root: {
          type: 'Container',
          children: [
            {
              type: 'Heading',
              children: 'Hello World',
            },
          ],
        },
        theme: {
          colors: {
            primary: {
              "500": '#3b82f6'
            } as ColorScale,
          },
        },
        state: {
          initial: {
            counter: 0,
          },
        },
      };
      
      const result = validateUISpecification(spec);
      expect(result.ok).toBe(true);
    });
    
    it('should return error for UI specification with invalid properties', () => {
      // Create an invalid spec with type coercion for testing
      const invalidSpec = {
        version: 123, // Should be a string
        root: {
          type: 'Container',
        },
      };
      
      // Use type assertion to cast to UISpecification for testing purposes
      const result = validateUISpecification(invalidSpec as unknown as UISpecification);
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        expect(result.val.type).toBe(SpecificationParserErrorType.SCHEMA_VALIDATION);
        expect(result.val.validationErrors).toBeDefined();
      }
    });
  });
  
  // Component spec validation tests
  describe('Component Spec Validation', () => {
    it('should validate a valid component spec', () => {
      const spec: ComponentSpec = {
        type: 'Button',
        children: 'Click Me',
        className: 'bg-blue-500 text-white',
        data: {
          'test-id': 'test-button',
        },
      };
      
      const result = validateComponentSpec(spec);
      expect(result.ok).toBe(true);
    });
    
    it('should validate a component with children', () => {
      const spec: ComponentSpec = {
        type: 'Box',
        children: [
          {
            type: 'Heading',
            children: 'Title',
          },
          {
            type: 'Text',
            children: 'Content',
          },
        ],
      };
      
      const result = validateComponentSpec(spec);
      expect(result.ok).toBe(true);
    });
    
    it('should return error for component with invalid child', () => {
      // Create a component with an invalid child for testing
      const invalidComponent = {
        type: 'Box',
        children: [
          {
            type: 'Heading',
            children: 'Title',
          },
          {
            // Missing 'type' property
            children: 'Content',
          },
        ],
      };
      
      // Use type assertion to cast to ComponentSpec for testing purposes
      const result = validateComponentSpec(invalidComponent as unknown as ComponentSpec);
      expect(result.ok).toBe(false);
      
      if (!result.ok) {
        expect(result.val.type).toBe(SpecificationParserErrorType.SCHEMA_VALIDATION);
        expect(result.val.message).toContain('Invalid child component');
        expect(result.val.path).toContain('children');
        expect(result.val.path).toContain('1');  // Error in the second child (index 1)
      }
    });
  });
  
  // Grid component validation tests
  describe('Grid Component Validation', () => {
    it('should validate a valid Grid component', () => {
      const spec: ComponentSpec = {
        type: 'Grid',
        columns: 3,
        gap: "4", // Use string value to match the interface definition
        children: [
          {
            type: 'Box',
            children: 'Item 1',
          },
          {
            type: 'Box',
            children: 'Item 2',
          },
          {
            type: 'Box',
            children: 'Item 3',
          },
        ],
      };
      
      const result = validateComponentSpec(spec);
      expect(result.ok).toBe(true);
    });
    
    // Note: More specific Grid validation tests would be added here
    // once Grid schema validation is fully implemented
  });
  
  // Validator configuration tests
  describe('Validator Configuration', () => {
    it('should create validator with custom options', () => {
      const validator = createValidator({
        validateSchemas: false,
        development: true,
      });
      
      // Since options are private, we can't directly test them
      // Instead test behavior that would be affected by options
      expect(validator).toBeInstanceOf(SpecificationValidator);
      
      // With validateSchemas: false, even an invalid component should pass
      const invalidComponent = {
        missingType: true, // 'type' is required but missing
      };
      
      // Use type assertion to cast to ComponentSpec for testing purposes
      const result = validator.validateComponentSpec(invalidComponent as unknown as ComponentSpec);
      
      expect(result.ok).toBe(true);
    });
  });
});