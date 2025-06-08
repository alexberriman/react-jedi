import { describe, it, expect, vi } from 'vitest';
import { render as testRender } from '@testing-library/react';
import { CallToAction } from './call-to-action';
import { render } from '../../../lib/render';

describe('CallToAction', () => {
  it('should render basic CTA correctly', () => {
    const { container } = testRender(
      <CallToAction 
        title="Test CTA"
        description="Test description"
        primaryAction={{
          label: 'Click me',
          onClick: () => {},
        }}
      />
    );
    
    expect(container.textContent).toContain('Test CTA');
    expect(container.textContent).toContain('Test description');
    expect(container.textContent).toContain('Click me');
  });

  it('should handle SDUI mode with correct prop transformations', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const spec = {
      type: 'CallToAction',
      title: 'Test CTA',
      formComponent: {
        type: 'Box',
        element: 'form',
        children: [
          {
            type: 'Input',
            inputType: 'email', // This should be transformed to 'type'
            placeholder: 'Enter your email',
          },
          {
            type: 'Button',
            children: 'Submit',
          },
        ],
      },
    };

    const { container } = testRender(<>{render(spec)}</>);
    
    // For now, check that the Box component was rendered as a container for the form elements
    // The Box with element='form' will render as a div, but it should contain our form inputs
    const formContainer = container.querySelector('[data-slot="box"]');
    expect(formContainer).toBeTruthy();
    
    // Check that the email input was rendered correctly (inputType should be transformed to type)
    const emailInput = container.querySelector('input[type="email"]');
    expect(emailInput).toBeTruthy();
    
    // Check that no prop warnings were logged
    const propWarnings = consoleSpy.mock.calls.filter(call => 
      call[0]?.toString().includes('Warning: React does not recognize the `inputType` prop')
    );
    
    expect(propWarnings.length).toBe(0);
    
    consoleSpy.mockRestore();
  });

  it('should render icon correctly when provided as SDUI spec', () => {
    const spec = {
      type: 'CallToAction',
      title: 'Test with Icon',
      icon: {
        type: 'Icon',
        name: 'Star',
        size: 24,
      },
      primaryAction: {
        label: 'Action',
        icon: {
          type: 'Icon',
          name: 'ArrowRight',
          size: 16,
        },
      },
    };

    const { container } = testRender(<>{render(spec)}</>);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should handle trust indicators with icons', () => {
    const spec = {
      type: 'CallToAction',
      title: 'Test with Trust Indicators',
      trustIndicators: [
        {
          label: 'Users',
          value: '10K+',
          icon: {
            type: 'Icon',
            name: 'Users',
          },
        },
      ],
    };

    const { container } = testRender(<>{render(spec)}</>);
    expect(container.textContent).toContain('10K+');
    expect(container.textContent).toContain('Users');
  });
});