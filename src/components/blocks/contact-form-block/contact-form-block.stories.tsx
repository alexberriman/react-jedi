import type { Meta, StoryObj } from '@storybook/react';
import { ContactFormBlock } from './contact-form-block';
import { within, userEvent, expect } from '@storybook/test';

const meta = {
  title: 'Blocks/ContactFormBlock',
  component: ContactFormBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An advanced contact form block with multiple variants, field types, validation, and integration capabilities.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'detailed', 'with-map', 'split-screen', 'wizard'],
      description: 'The form variant to display'
    },
    animated: {
      control: 'boolean',
      description: 'Enable/disable animations'
    },
    compact: {
      control: 'boolean',
      description: 'Use compact form layout'
    },
    showRequiredIndicator: {
      control: 'boolean',
      description: 'Show asterisk for required fields'
    },
    validateOnBlur: {
      control: 'boolean',
      description: 'Validate fields on blur'
    },
    validateOnChange: {
      control: 'boolean',
      description: 'Validate fields on change'
    },
    resetOnSuccess: {
      control: 'boolean',
      description: 'Reset form after successful submission'
    },
    persistData: {
      control: 'boolean',
      description: 'Persist form data in local storage'
    }
  }
} satisfies Meta<typeof ContactFormBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    type: 'ContactFormBlock',
    variant: 'simple',
    title: 'Get in Touch',
    description: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    fields: [
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
        rows: 4,
        validation: [
          { type: 'required' },
          { type: 'minLength', value: 10, message: 'Message must be at least 10 characters' }
        ]
      }
    ],
    submitButton: {
      text: 'Send Message',
      variant: 'primary'
    }
  }
};

export const Detailed: Story = {
  args: {
    type: 'ContactFormBlock',
    variant: 'detailed',
    title: 'Contact Information',
    description: 'Please fill out the form below and we\'ll get back to you within 24 hours.',
    fields: [
      {
        id: 'firstName',
        type: 'text',
        label: 'First Name',
        placeholder: 'John',
        validation: [{ type: 'required' }]
      },
      {
        id: 'lastName',
        type: 'text',
        label: 'Last Name',
        placeholder: 'Doe',
        validation: [{ type: 'required' }]
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'john@example.com',
        validation: [
          { type: 'required' },
          { type: 'email' }
        ]
      },
      {
        id: 'phone',
        type: 'phone',
        label: 'Phone Number',
        placeholder: '+1 (555) 123-4567',
        phoneConfig: {
          defaultCountry: 'US',
          preferredCountries: ['US', 'CA', 'GB'],
          formatOnDisplay: true
        },
        validation: [{ type: 'phone' }]
      },
      {
        id: 'company',
        type: 'text',
        label: 'Company',
        placeholder: 'Acme Inc.'
      },
      {
        id: 'subject',
        type: 'select',
        label: 'Subject',
        placeholder: 'Select a subject',
        options: [
          { label: 'General Inquiry', value: 'general' },
          { label: 'Technical Support', value: 'support' },
          { label: 'Sales', value: 'sales' },
          { label: 'Partnership', value: 'partnership' },
          { label: 'Other', value: 'other' }
        ],
        validation: [{ type: 'required' }]
      },
      {
        id: 'message',
        type: 'textarea',
        label: 'Message',
        placeholder: 'Tell us more about your inquiry...',
        rows: 5,
        validation: [
          { type: 'required' },
          { type: 'minLength', value: 20, message: 'Please provide more details (at least 20 characters)' }
        ]
      },
      {
        id: 'subscribe',
        type: 'checkbox',
        label: 'Subscribe to our newsletter for updates and special offers'
      }
    ],
    submitButton: {
      text: 'Submit Inquiry',
      variant: 'primary',
      fullWidth: true
    },
    showRequiredIndicator: true
  }
};

export const WithMap: Story = {
  args: {
    type: 'ContactFormBlock',
    variant: 'with-map',
    title: 'Visit Our Office',
    description: 'Stop by our office or send us a message',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        validation: [{ type: 'required' }]
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        validation: [
          { type: 'required' },
          { type: 'email' }
        ]
      },
      {
        id: 'subject',
        type: 'text',
        label: 'Subject',
        validation: [{ type: 'required' }]
      },
      {
        id: 'message',
        type: 'textarea',
        label: 'Message',
        rows: 4,
        validation: [{ type: 'required' }]
      }
    ],
    mapConfig: {
      lat: 40.7128,
      lng: -74.006,
      zoom: 15,
      marker: {
        title: 'Our Office'
      }
    }
  }
};

export const SplitScreen: Story = {
  args: {
    type: 'ContactFormBlock',
    variant: 'split-screen',
    title: 'Let\'s Connect',
    description: 'We\'re here to help with your questions',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        validation: [{ type: 'required' }]
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        validation: [
          { type: 'required' },
          { type: 'email' }
        ]
      },
      {
        id: 'phone',
        type: 'phone',
        label: 'Phone',
        phoneConfig: {
          defaultCountry: 'US'
        }
      },
      {
        id: 'message',
        type: 'textarea',
        label: 'How can we help?',
        rows: 4,
        validation: [{ type: 'required' }]
      }
    ],
    splitContent: {
      type: 'content',
      title: 'Why Choose Us?',
      description: 'We\'re committed to providing exceptional service',
      features: [
        '24/7 Customer Support',
        'Expert Team Members',
        'Quick Response Time',
        'Satisfaction Guaranteed',
        'Competitive Pricing'
      ]
    }
  }
};

export const Wizard: Story = {
  args: {
    type: 'ContactFormBlock',
    variant: 'wizard',
    title: 'Request a Quote',
    description: 'Complete the form to receive a personalized quote',
    steps: [
      {
        id: 'personal',
        title: 'Personal Information',
        description: 'Tell us about yourself',
        fields: [
          {
            id: 'firstName',
            type: 'text',
            label: 'First Name',
            validation: [{ type: 'required' }]
          },
          {
            id: 'lastName',
            type: 'text',
            label: 'Last Name',
            validation: [{ type: 'required' }]
          },
          {
            id: 'email',
            type: 'email',
            label: 'Email',
            validation: [
              { type: 'required' },
              { type: 'email' }
            ]
          },
          {
            id: 'phone',
            type: 'phone',
            label: 'Phone',
            phoneConfig: {
              defaultCountry: 'US'
            }
          }
        ]
      },
      {
        id: 'company',
        title: 'Company Details',
        description: 'Tell us about your organization',
        fields: [
          {
            id: 'companyName',
            type: 'text',
            label: 'Company Name',
            validation: [{ type: 'required' }]
          },
          {
            id: 'companySize',
            type: 'select',
            label: 'Company Size',
            options: [
              { label: '1-10 employees', value: '1-10' },
              { label: '11-50 employees', value: '11-50' },
              { label: '51-200 employees', value: '51-200' },
              { label: '201-500 employees', value: '201-500' },
              { label: '500+ employees', value: '500+' }
            ],
            validation: [{ type: 'required' }]
          },
          {
            id: 'industry',
            type: 'select',
            label: 'Industry',
            options: [
              { label: 'Technology', value: 'tech' },
              { label: 'Healthcare', value: 'healthcare' },
              { label: 'Finance', value: 'finance' },
              { label: 'Retail', value: 'retail' },
              { label: 'Manufacturing', value: 'manufacturing' },
              { label: 'Other', value: 'other' }
            ],
            validation: [{ type: 'required' }]
          },
          {
            id: 'website',
            type: 'url',
            label: 'Website',
            placeholder: 'https://example.com'
          }
        ]
      },
      {
        id: 'requirements',
        title: 'Your Requirements',
        description: 'What are you looking for?',
        fields: [
          {
            id: 'services',
            type: 'checkbox',
            label: 'Services Needed',
            options: [
              { label: 'Web Development', value: 'web' },
              { label: 'Mobile App Development', value: 'mobile' },
              { label: 'Cloud Services', value: 'cloud' },
              { label: 'Consulting', value: 'consulting' },
              { label: 'Support & Maintenance', value: 'support' }
            ],
            validation: [{ type: 'required', message: 'Please select at least one service' }]
          },
          {
            id: 'budget',
            type: 'radio',
            label: 'Budget Range',
            options: [
              { label: 'Under $10,000', value: '<10k' },
              { label: '$10,000 - $50,000', value: '10k-50k' },
              { label: '$50,000 - $100,000', value: '50k-100k' },
              { label: 'Over $100,000', value: '>100k' }
            ],
            validation: [{ type: 'required' }]
          },
          {
            id: 'timeline',
            type: 'select',
            label: 'Project Timeline',
            options: [
              { label: 'ASAP', value: 'asap' },
              { label: 'Within 1 month', value: '1month' },
              { label: 'Within 3 months', value: '3months' },
              { label: 'Within 6 months', value: '6months' },
              { label: 'Planning phase', value: 'planning' }
            ],
            validation: [{ type: 'required' }]
          },
          {
            id: 'details',
            type: 'textarea',
            label: 'Project Details',
            placeholder: 'Tell us more about your project...',
            rows: 5,
            validation: [
              { type: 'required' },
              { type: 'minLength', value: 50, message: 'Please provide more details (at least 50 characters)' }
            ]
          }
        ]
      }
    ],
    submitButton: {
      text: 'Submit Quote Request',
      variant: 'primary'
    }
  }
};

export const WithConditionalFields: Story = {
  args: {
    type: 'ContactFormBlock',
    title: 'Dynamic Form Example',
    description: 'Fields appear based on your selections',
    fields: [
      {
        id: 'contactType',
        type: 'radio',
        label: 'I am a',
        options: [
          { label: 'Individual', value: 'individual' },
          { label: 'Business', value: 'business' }
        ],
        validation: [{ type: 'required' }]
      },
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        validation: [{ type: 'required' }],
        conditionalDisplay: {
          fieldId: 'contactType',
          operator: 'equals',
          value: 'individual'
        }
      },
      {
        id: 'businessName',
        type: 'text',
        label: 'Business Name',
        validation: [{ type: 'required' }],
        conditionalDisplay: {
          fieldId: 'contactType',
          operator: 'equals',
          value: 'business'
        }
      },
      {
        id: 'taxId',
        type: 'text',
        label: 'Tax ID',
        conditionalDisplay: {
          fieldId: 'contactType',
          operator: 'equals',
          value: 'business'
        }
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        validation: [
          { type: 'required' },
          { type: 'email' }
        ]
      },
      {
        id: 'hasAttachment',
        type: 'checkbox',
        label: 'I have files to attach'
      },
      {
        id: 'attachment',
        type: 'file',
        label: 'Upload Files',
        fileConfig: {
          accept: '.pdf,.doc,.docx,.jpg,.png',
          maxSize: 10 * 1024 * 1024, // 10MB
          maxFiles: 3,
          multiple: true
        },
        conditionalDisplay: {
          fieldId: 'hasAttachment',
          operator: 'equals',
          value: true
        },
        helperText: 'Max 3 files, 10MB each. Supported formats: PDF, DOC, DOCX, JPG, PNG'
      },
      {
        id: 'message',
        type: 'textarea',
        label: 'Message',
        rows: 4,
        validation: [{ type: 'required' }]
      }
    ]
  }
};

export const WithValidation: Story = {
  args: {
    type: 'ContactFormBlock',
    title: 'Form Validation Example',
    description: 'Demonstrates various validation rules',
    fields: [
      {
        id: 'username',
        type: 'text',
        label: 'Username',
        placeholder: 'Choose a username',
        validation: [
          { type: 'required' },
          { type: 'minLength', value: 3, message: 'Username must be at least 3 characters' },
          { type: 'maxLength', value: 20, message: 'Username must not exceed 20 characters' },
          { type: 'pattern', value: '^[a-zA-Z0-9_]+$', message: 'Username can only contain letters, numbers, and underscores' }
        ],
        helperText: 'Letters, numbers, and underscores only'
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        validation: [
          { type: 'required' },
          { type: 'email', message: 'Please enter a valid email address' }
        ]
      },
      {
        id: 'phone',
        type: 'phone',
        label: 'Phone Number',
        phoneConfig: {
          defaultCountry: 'US',
          formatOnDisplay: true
        },
        validation: [
          { type: 'required' },
          { type: 'phone', message: 'Please enter a valid phone number' }
        ]
      },
      {
        id: 'website',
        type: 'url',
        label: 'Website',
        placeholder: 'https://example.com',
        validation: [
          { type: 'url', message: 'Please enter a valid URL' }
        ]
      },
      {
        id: 'age',
        type: 'number',
        label: 'Age',
        validation: [
          { type: 'required' },
          { type: 'min', value: 18, message: 'You must be at least 18 years old' },
          { type: 'max', value: 120, message: 'Please enter a valid age' }
        ]
      },
      {
        id: 'bio',
        type: 'textarea',
        label: 'Bio',
        rows: 3,
        validation: [
          { type: 'maxLength', value: 500, message: 'Bio must not exceed 500 characters' }
        ],
        helperText: 'Tell us about yourself (max 500 characters)'
      }
    ],
    validateOnBlur: true,
    showRequiredIndicator: true
  }
};

export const Compact: Story = {
  args: {
    type: 'ContactFormBlock',
    title: 'Quick Contact',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        validation: [{ type: 'required' }]
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        validation: [
          { type: 'required' },
          { type: 'email' }
        ]
      },
      {
        id: 'message',
        type: 'textarea',
        label: 'Message',
        rows: 3,
        validation: [{ type: 'required' }]
      }
    ],
    compact: true,
    submitButton: {
      text: 'Send',
      size: 'sm'
    }
  }
};

export const WithPersistence: Story = {
  args: {
    type: 'ContactFormBlock',
    title: 'Form with Auto-Save',
    description: 'Your progress is automatically saved',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        validation: [{ type: 'required' }]
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        validation: [{ type: 'required' }, { type: 'email' }]
      },
      {
        id: 'message',
        type: 'textarea',
        label: 'Message',
        rows: 4
      }
    ],
    persistData: true,
    storageKey: 'storybook-contact-form',
    animated: false
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for the component to be rendered and find input elements
    const nameInput = await canvas.findByRole('textbox', { name: /name/i });
    const emailInput = await canvas.findByRole('textbox', { name: /email/i });
    
    // Type some data
    await userEvent.type(nameInput, 'Test User');
    await userEvent.type(emailInput, 'test@example.com');
    
    // Data should be persisted to localStorage
    await expect(localStorage.getItem('storybook-contact-form')).toBeTruthy();
  }
};

export const WithCRMIntegration: Story = {
  args: {
    type: 'ContactFormBlock',
    title: 'CRM-Connected Form',
    description: 'This form integrates with your CRM system',
    fields: [
      {
        id: 'firstName',
        type: 'text',
        label: 'First Name',
        validation: [{ type: 'required' }]
      },
      {
        id: 'lastName',
        type: 'text',
        label: 'Last Name',
        validation: [{ type: 'required' }]
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        validation: [{ type: 'required' }, { type: 'email' }]
      },
      {
        id: 'company',
        type: 'text',
        label: 'Company'
      },
      {
        id: 'leadSource',
        type: 'select',
        label: 'How did you hear about us?',
        options: [
          { label: 'Google Search', value: 'google' },
          { label: 'Social Media', value: 'social' },
          { label: 'Referral', value: 'referral' },
          { label: 'Advertisement', value: 'ad' },
          { label: 'Other', value: 'other' }
        ]
      }
    ],
    crmConfig: {
      endpoint: 'https://api.example.com/leads',
      headers: {
        'X-API-Key': 'your-api-key'
      },
      fieldMapping: {
        first_name: 'firstName',
        last_name: 'lastName',
        email_address: 'email',
        company_name: 'company',
        source: 'leadSource'
      },
      customData: {
        form_id: 'contact-form-001',
        campaign: 'website-contact'
      }
    },
    successMessage: 'Thank you! Your information has been sent to our sales team.',
    submitButton: {
      text: 'Submit to CRM',
      variant: 'primary'
    }
  }
};