import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactFormBlock } from './contact-form-block';
import type { FormField } from '../../../types/components/contact-form-block';

// Mock libphonenumber-js
vi.mock('libphonenumber-js', () => ({
  parsePhoneNumber: vi.fn(),
  isValidPhoneNumber: vi.fn(() => true),
  formatPhoneNumber: vi.fn((value) => value),
  AsYouType: vi.fn(() => ({
    input: vi.fn((value) => value)
  }))
}));

// Mock fetch
globalThis.fetch = vi.fn();

// Mock ResizeObserver
globalThis.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('ContactFormBlock', () => {
  const mockFields: FormField[] = [
    {
      id: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Your name',
      validation: [{ type: 'required' }]
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'your@email.com',
      validation: [
        { type: 'required' },
        { type: 'email' }
      ]
    },
    {
      id: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Your message',
      validation: [{ type: 'required' }]
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders simple variant correctly', () => {
    render(
      <ContactFormBlock
        type="ContactFormBlock"
        variant="simple"
        title="Contact Us"
        description="Get in touch"
        fields={mockFields}
      />
    );

    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows required indicators when configured', () => {
    render(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={mockFields}
        showRequiredIndicator={true}
      />
    );

    const requiredIndicators = screen.getAllByText('*');
    expect(requiredIndicators).toHaveLength(3); // All fields are required
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    
    render(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={mockFields}
      />
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    
    render(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={mockFields}
        validateOnBlur={true}
      />
    );

    const emailInput = screen.getByLabelText(/Email/);
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Blur the field

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('handles form submission successfully', async () => {
    const user = userEvent.setup();
    const mockCrmConfig = {
      endpoint: 'https://api.example.com/contact',
      headers: { 'Authorization': 'Bearer token' }
    };

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    render(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={mockFields}
        crmConfig={mockCrmConfig}
        successMessage="Form submitted successfully!"
      />
    );

    // Fill in the form
    await user.type(screen.getByLabelText(/Name/), 'John Doe');
    await user.type(screen.getByLabelText(/Email/), 'john@example.com');
    await user.type(screen.getByLabelText(/Message/), 'Test message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      mockCrmConfig.endpoint,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          ...mockCrmConfig.headers
        })
      })
    );
  });

  it('handles form submission error', async () => {
    const user = userEvent.setup();
    const mockCrmConfig = {
      endpoint: 'https://api.example.com/contact'
    };

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

    render(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={mockFields}
        crmConfig={mockCrmConfig}
        errorMessage="Failed to submit form"
      />
    );

    // Fill in the form
    await user.type(screen.getByLabelText(/Name/), 'John Doe');
    await user.type(screen.getByLabelText(/Email/), 'john@example.com');
    await user.type(screen.getByLabelText(/Message/), 'Test message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to submit form')).toBeInTheDocument();
    });
  });

  it('persists form data when configured', async () => {
    const user = userEvent.setup();
    const storageKey = 'test-form-data';

    const { rerender } = render(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={mockFields}
        persistData={true}
        storageKey={storageKey}
      />
    );

    // Fill in some data
    await user.type(screen.getByLabelText(/Name/), 'John Doe');
    await user.type(screen.getByLabelText(/Email/), 'john@example.com');

    // Wait for data to be persisted
    await waitFor(() => {
      const savedData = localStorage.getItem(storageKey);
      expect(savedData).toBeTruthy();
      const parsed = JSON.parse(savedData!);
      expect(parsed.name).toBe('John Doe');
      expect(parsed.email).toBe('john@example.com');
    });

    // Remount the component
    rerender(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={mockFields}
        persistData={true}
        storageKey={storageKey}
      />
    );

    // Check if data is restored
    expect(screen.getByLabelText(/Name/)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/Email/)).toHaveValue('john@example.com');
  });

  it('handles conditional field display', () => {
    const conditionalFields: FormField[] = [
      {
        id: 'hasCompany',
        type: 'checkbox',
        label: 'I represent a company'
      },
      {
        id: 'companyName',
        type: 'text',
        label: 'Company Name',
        conditionalDisplay: {
          fieldId: 'hasCompany',
          operator: 'equals',
          value: true
        }
      }
    ];

    render(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={conditionalFields}
      />
    );

    // Initially, company name field should not be visible
    expect(screen.queryByLabelText('Company Name')).not.toBeInTheDocument();

    // Check the checkbox
    fireEvent.click(screen.getByLabelText(/I represent a company/));

    // Company name field should now be visible
    expect(screen.getByLabelText(/Company Name/)).toBeInTheDocument();
  });

  it('handles file upload fields', async () => {
    const user = userEvent.setup();
    const fileField: FormField = {
      id: 'attachment',
      type: 'file',
      label: 'Attachment',
      fileConfig: {
        accept: '.pdf,.doc,.docx',
        maxSize: 5 * 1024 * 1024, // 5MB
        maxFiles: 1
      }
    };

    render(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={[fileField]}
      />
    );

    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/Attachment/);

    await user.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });
  });

  it('handles phone number formatting', async () => {
    const user = userEvent.setup();
    const phoneField: FormField = {
      id: 'phone',
      type: 'phone',
      label: 'Phone',
      phoneConfig: {
        defaultCountry: 'US',
        formatOnDisplay: true
      }
    };

    render(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={[phoneField]}
      />
    );

    const phoneInput = screen.getByLabelText(/Phone/);
    await user.type(phoneInput, '5551234567');

    // The mock returns the same value, but in real usage it would be formatted
    expect(phoneInput).toHaveValue('5551234567');
  });

  it('renders wizard variant with steps', async () => {
    const user = userEvent.setup();
    const steps = [
      {
        id: 'personal',
        title: 'Personal Information',
        fields: [
          { id: 'firstName', type: 'text' as const, label: 'First Name' },
          { id: 'lastName', type: 'text' as const, label: 'Last Name' }
        ]
      },
      {
        id: 'contact',
        title: 'Contact Information',
        fields: [
          { id: 'email', type: 'email' as const, label: 'Email' },
          { id: 'phone', type: 'phone' as const, label: 'Phone' }
        ]
      }
    ];

    render(
      <ContactFormBlock
        type="ContactFormBlock"
        variant="wizard"
        steps={steps}
      />
    );

    // First step should be visible
    expect(screen.getByText('Step 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();

    // Click next
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Second step should be visible
    expect(screen.getByText('Step 2 of 2')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/)).toBeInTheDocument();

    // Previous button should work
    await user.click(screen.getByRole('button', { name: /previous/i }));
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('handles custom submit button configuration', () => {
    render(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={mockFields}
        submitButton={{
          text: 'Send Message',
          variant: 'primary',
          size: 'lg',
          fullWidth: true
        }}
      />
    );

    const submitButton = screen.getByRole('button', { name: /send message/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveClass('w-full'); // fullWidth class
  });

  it('resets form on successful submission when configured', async () => {
    const user = userEvent.setup();
    
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    render(
      <ContactFormBlock
        type="ContactFormBlock"
        fields={mockFields}
        resetOnSuccess={true}
        crmConfig={{ endpoint: 'https://api.example.com/contact' }}
      />
    );

    // Fill in the form
    await user.type(screen.getByLabelText(/Name/), 'John Doe');
    await user.type(screen.getByLabelText(/Email/), 'john@example.com');
    await user.type(screen.getByLabelText(/Message/), 'Test message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/)).toHaveValue('');
      expect(screen.getByLabelText(/Email/)).toHaveValue('');
      expect(screen.getByLabelText(/Message/)).toHaveValue('');
    });
  });
});