import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { render as sduiRender } from '../../../lib/render';
import type { ComponentSpec } from '../../../types/schema/components';

describe('Sheet SDUI Wrapper Simple Tests', () => {
  it('should render Sheet with wrapper in SDUI mode', () => {
    const sheetSpec: ComponentSpec = {
      type: 'Sheet',
      children: [
        {
          type: 'SheetTrigger',
          asChild: true,
          children: {
            type: 'Button',
            children: 'Open Sheet'
          }
        },
        {
          type: 'SheetContent',
          children: {
            type: 'Text',
            children: 'Sheet content'
          }
        }
      ]
    };
    
    const result = sduiRender(sheetSpec);
    render(result as React.ReactElement);
    
    // Just verify the button is rendered
    const button = screen.getByRole('button', { name: 'Open Sheet' });
    expect(button).toBeInTheDocument();
  });

  it('should pass onOpenChangeAction to wrapper', () => {
    const sheetSpec: ComponentSpec = {
      type: 'Sheet',
      onOpenChangeAction: 'handleSheetOpenChange',
      children: [
        {
          type: 'SheetTrigger',
          asChild: true,
          children: {
            type: 'Button',
            children: 'Test Button'
          }
        },
        {
          type: 'SheetContent',
          children: {
            type: 'Text',
            children: 'Content'
          }
        }
      ]
    };
    
    // Just test that it renders without errors
    const result = sduiRender(sheetSpec, {
      handlers: {
        handleSheetOpenChange: () => {}
      }
    });
    
    render(result as React.ReactElement);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
  });
});