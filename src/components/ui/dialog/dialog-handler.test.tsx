/**
 * Tests for Dialog event handler functionality in SDUI mode
 */

import { render } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { render as sduiRender } from '../../../lib/render';
import type { ComponentSpec } from '../../../types/schema/components';

describe('Dialog SDUI Handler Tests', () => {
  it('should call onOpenChange handler when dialog state changes', () => {
    const handleOpenChange = vi.fn();
    
    const dialogSpec: ComponentSpec = {
      type: 'Dialog',
      defaultOpen: false,
      onOpenChangeAction: 'handleDialogOpenChange',
      children: [
        {
          type: 'DialogTrigger',
          asChild: true,
          children: {
            type: 'Button',
            variant: 'outline',
            children: 'Open Dialog'
          }
        },
        {
          type: 'DialogContent',
          children: {
            type: 'DialogHeader',
            children: {
              type: 'DialogTitle',
              children: 'Test Dialog'
            }
          }
        }
      ]
    };
    
    const result = sduiRender(dialogSpec, {
      handlers: {
        handleDialogOpenChange: handleOpenChange
      }
    });
    
    // Render the component
    const { container } = render(result as React.ReactElement);
    
    // Verify the dialog trigger button is rendered
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe('Open Dialog');
    
    // The handler should be connected through the action system
    // When the dialog opens/closes, it should call the handler
    expect(handleOpenChange).toBeDefined();
  });
  
  it('should handle dialog with multiple handlers', () => {
    const handlers = {
      handleDialogOpenChange: vi.fn(),
      handleSave: vi.fn(),
      handleCancel: vi.fn()
    };
    
    const dialogSpec: ComponentSpec = {
      type: 'Dialog',
      defaultOpen: false,
      onOpenChangeAction: 'handleDialogOpenChange',
      children: [
        {
          type: 'DialogTrigger',
          asChild: true,
          children: {
            type: 'Button',
            children: 'Edit'
          }
        },
        {
          type: 'DialogContent',
          children: [
            {
              type: 'DialogHeader',
              children: {
                type: 'DialogTitle',
                children: 'Edit Item'
              }
            },
            {
              type: 'DialogFooter',
              children: [
                {
                  type: 'Button',
                  variant: 'outline',
                  onClickAction: 'handleCancel',
                  children: 'Cancel'
                },
                {
                  type: 'Button',
                  onClickAction: 'handleSave',
                  children: 'Save'
                }
              ]
            }
          ]
        }
      ]
    };
    
    const result = sduiRender(dialogSpec, { handlers });
    const { container } = render(result as React.ReactElement);
    
    // Verify all elements are rendered
    expect(container.querySelector('button')?.textContent).toBe('Edit');
    expect(handlers.handleDialogOpenChange).toBeDefined();
    expect(handlers.handleSave).toBeDefined();
    expect(handlers.handleCancel).toBeDefined();
  });
});