import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { render as sduiRender } from '../../../lib/render';

describe('Input SDUI id property', () => {
  it('should render Input with id property in SDUI mode', () => {
    const spec = {
      type: 'Input',
      id: 'test-input-id',
      name: 'testInput',
      placeholder: 'Enter text',
    };

    const element = sduiRender(spec);
    if (!element) {
      throw new Error('Failed to render element');
    }
    const { container } = render(element);
    
    const input = container.querySelector('input');
    expect(input).toBeTruthy();
    expect(input?.id).toBe('test-input-id');
    expect(input?.getAttribute('id')).toBe('test-input-id');
  });

  it('should render Input with id property when wrapped with icons', () => {
    const spec = {
      type: 'Input',
      id: 'icon-input-id',
      name: 'iconInput',
      placeholder: 'Search...',
      startIcon: { type: 'Icon', name: 'search' },
    };

    const element = sduiRender(spec);
    if (!element) {
      throw new Error('Failed to render element');
    }
    const { container } = render(element);
    
    const input = container.querySelector('input');
    expect(input).toBeTruthy();
    expect(input?.id).toBe('icon-input-id');
  });

  it('should preserve all standard HTML attributes', () => {
    const spec = {
      type: 'Input',
      id: 'full-input-id',
      name: 'fullInput',
      placeholder: 'Full input',
      'aria-label': 'Full input field',
      'data-testid': 'full-input-test',
      className: 'custom-class',
    };

    const element = sduiRender(spec);
    if (!element) {
      throw new Error('Failed to render element');
    }
    const { container } = render(element);
    
    const input = container.querySelector('input');
    expect(input).toBeTruthy();
    expect(input?.id).toBe('full-input-id');
    expect(input?.getAttribute('aria-label')).toBe('Full input field');
    expect(input?.getAttribute('data-testid')).toBe('full-input-test');
    expect(input?.className).toContain('custom-class');
  });
});