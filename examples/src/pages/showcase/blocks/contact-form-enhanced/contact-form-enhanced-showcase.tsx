import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseLayout } from "../../../../components/layouts/showcase-layout";
import { CodeBlock } from "../../../../components/ui/code-block";
import { Tabs } from "../../../../components/ui/tabs";
import { Button } from "../../../../components/ui/button";

// Example specifications
const simpleFormSpec: ComponentSpec = {
  type: "ContactFormBlock",
  props: {
    variant: "simple",
    title: "Contact Support",
    description: "We're here to help. Send us a message and we'll respond within 24 hours.",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Your Name",
        placeholder: "John Doe",
        validation: [{ type: "required" }]
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "john@example.com",
        validation: [
          { type: "required" },
          { type: "email" }
        ]
      },
      {
        id: "message",
        type: "textarea",
        label: "Message",
        placeholder: "How can we help you?",
        rows: 4,
        validation: [
          { type: "required" },
          { type: "minLength", value: 10, message: "Please provide more details" }
        ]
      }
    ],
    submitButton: {
      text: "Send Message",
      variant: "primary"
    },
    showRequiredIndicator: true
  }
};

const detailedFormSpec: ComponentSpec = {
  type: "ContactFormBlock",
  props: {
    variant: "detailed",
    title: "Request a Demo",
    description: "Fill out the form below and we'll schedule a personalized demo for your team.",
    fields: [
      {
        id: "firstName",
        type: "text",
        label: "First Name",
        validation: [{ type: "required" }]
      },
      {
        id: "lastName",
        type: "text",
        label: "Last Name",
        validation: [{ type: "required" }]
      },
      {
        id: "email",
        type: "email",
        label: "Work Email",
        validation: [{ type: "required" }, { type: "email" }]
      },
      {
        id: "phone",
        type: "phone",
        label: "Phone Number",
        phoneConfig: {
          defaultCountry: "US",
          formatOnDisplay: true
        },
        validation: [{ type: "phone" }]
      },
      {
        id: "company",
        type: "text",
        label: "Company Name",
        validation: [{ type: "required" }]
      },
      {
        id: "companySize",
        type: "select",
        label: "Company Size",
        options: [
          { label: "1-10 employees", value: "1-10" },
          { label: "11-50 employees", value: "11-50" },
          { label: "51-200 employees", value: "51-200" },
          { label: "201-500 employees", value: "201-500" },
          { label: "500+ employees", value: "500+" }
        ],
        validation: [{ type: "required" }]
      },
      {
        id: "interest",
        type: "checkbox",
        label: "Areas of Interest",
        options: [
          { label: "Product Features", value: "features" },
          { label: "Pricing", value: "pricing" },
          { label: "Implementation", value: "implementation" },
          { label: "Integration", value: "integration" },
          { label: "Security", value: "security" }
        ]
      },
      {
        id: "message",
        type: "textarea",
        label: "Additional Comments",
        placeholder: "Tell us about your needs...",
        rows: 3
      }
    ],
    submitButton: {
      text: "Request Demo",
      variant: "primary",
      fullWidth: true
    }
  }
};

const withMapSpec: ComponentSpec = {
  type: "ContactFormBlock",
  props: {
    variant: "with-map",
    title: "Visit Our Office",
    description: "Come say hello or send us a message",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Name",
        validation: [{ type: "required" }]
      },
      {
        id: "email",
        type: "email",
        label: "Email",
        validation: [{ type: "required" }, { type: "email" }]
      },
      {
        id: "subject",
        type: "select",
        label: "Subject",
        options: [
          { label: "General Inquiry", value: "general" },
          { label: "Schedule a Meeting", value: "meeting" },
          { label: "Partnership", value: "partnership" },
          { label: "Support", value: "support" }
        ]
      },
      {
        id: "message",
        type: "textarea",
        label: "Message",
        rows: 4,
        validation: [{ type: "required" }]
      }
    ],
    mapConfig: {
      lat: 37.7749,
      lng: -122.4194,
      zoom: 15,
      marker: {
        title: "Our Office"
      },
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY"
    }
  }
};

const splitScreenSpec: ComponentSpec = {
  type: "ContactFormBlock",
  props: {
    variant: "split-screen",
    title: "Get Started Today",
    description: "Join thousands of satisfied customers",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        validation: [{ type: "required" }]
      },
      {
        id: "email",
        type: "email",
        label: "Email",
        validation: [{ type: "required" }, { type: "email" }]
      },
      {
        id: "phone",
        type: "phone",
        label: "Phone",
        phoneConfig: {
          defaultCountry: "US"
        }
      },
      {
        id: "message",
        type: "textarea",
        label: "How can we help?",
        rows: 4
      }
    ],
    splitContent: {
      type: "content",
      title: "Why Choose Us?",
      description: "We're committed to your success",
      features: [
        "24/7 Customer Support",
        "Industry-Leading Security",
        "99.9% Uptime Guarantee",
        "Free Setup & Migration",
        "30-Day Money Back Guarantee"
      ]
    },
    submitButton: {
      text: "Start Free Trial",
      variant: "primary"
    }
  }
};

const wizardFormSpec: ComponentSpec = {
  type: "ContactFormBlock",
  props: {
    variant: "wizard",
    title: "Project Quote Request",
    description: "Get a custom quote in 3 easy steps",
    steps: [
      {
        id: "contact",
        title: "Contact Information",
        description: "How can we reach you?",
        fields: [
          {
            id: "firstName",
            type: "text",
            label: "First Name",
            validation: [{ type: "required" }]
          },
          {
            id: "lastName",
            type: "text",
            label: "Last Name",
            validation: [{ type: "required" }]
          },
          {
            id: "email",
            type: "email",
            label: "Email",
            validation: [{ type: "required" }, { type: "email" }]
          },
          {
            id: "phone",
            type: "phone",
            label: "Phone",
            phoneConfig: {
              defaultCountry: "US"
            }
          }
        ]
      },
      {
        id: "project",
        title: "Project Details",
        description: "Tell us about your project",
        fields: [
          {
            id: "projectType",
            type: "select",
            label: "Project Type",
            options: [
              { label: "Website", value: "website" },
              { label: "Mobile App", value: "mobile" },
              { label: "Web Application", value: "webapp" },
              { label: "E-commerce", value: "ecommerce" },
              { label: "Other", value: "other" }
            ],
            validation: [{ type: "required" }]
          },
          {
            id: "budget",
            type: "radio",
            label: "Budget Range",
            options: [
              { label: "< $5,000", value: "<5k" },
              { label: "$5,000 - $15,000", value: "5k-15k" },
              { label: "$15,000 - $50,000", value: "15k-50k" },
              { label: "> $50,000", value: ">50k" }
            ],
            validation: [{ type: "required" }]
          },
          {
            id: "timeline",
            type: "select",
            label: "Timeline",
            options: [
              { label: "ASAP", value: "asap" },
              { label: "Within 1 month", value: "1month" },
              { label: "Within 3 months", value: "3months" },
              { label: "Flexible", value: "flexible" }
            ],
            validation: [{ type: "required" }]
          }
        ]
      },
      {
        id: "details",
        title: "Additional Details",
        description: "Help us understand your needs better",
        fields: [
          {
            id: "description",
            type: "textarea",
            label: "Project Description",
            placeholder: "Describe your project goals and requirements...",
            rows: 5,
            validation: [
              { type: "required" },
              { type: "minLength", value: 50, message: "Please provide more details (min 50 characters)" }
            ]
          },
          {
            id: "attachments",
            type: "file",
            label: "Attachments (Optional)",
            fileConfig: {
              accept: ".pdf,.doc,.docx,.jpg,.png",
              maxSize: 10 * 1024 * 1024,
              maxFiles: 3,
              multiple: true
            },
            helperText: "Upload any relevant documents or mockups (max 3 files, 10MB each)"
          },
          {
            id: "referral",
            type: "text",
            label: "How did you hear about us?",
            placeholder: "Google, social media, referral..."
          }
        ]
      }
    ],
    submitButton: {
      text: "Submit Quote Request",
      variant: "primary"
    }
  }
};

const conditionalFormSpec: ComponentSpec = {
  type: "ContactFormBlock",
  props: {
    title: "Smart Contact Form",
    description: "This form adapts based on your selections",
    fields: [
      {
        id: "userType",
        type: "radio",
        label: "I am a",
        options: [
          { label: "Student", value: "student" },
          { label: "Professional", value: "professional" },
          { label: "Business Owner", value: "business" }
        ],
        validation: [{ type: "required" }]
      },
      {
        id: "name",
        type: "text",
        label: "Name",
        validation: [{ type: "required" }]
      },
      {
        id: "school",
        type: "text",
        label: "School/University",
        conditionalDisplay: {
          fieldId: "userType",
          operator: "equals",
          value: "student"
        }
      },
      {
        id: "company",
        type: "text",
        label: "Company",
        conditionalDisplay: {
          fieldId: "userType",
          operator: "notEquals",
          value: "student"
        }
      },
      {
        id: "employees",
        type: "select",
        label: "Number of Employees",
        options: [
          { label: "1-10", value: "1-10" },
          { label: "11-50", value: "11-50" },
          { label: "51-200", value: "51-200" },
          { label: "200+", value: "200+" }
        ],
        conditionalDisplay: {
          fieldId: "userType",
          operator: "equals",
          value: "business"
        }
      },
      {
        id: "email",
        type: "email",
        label: "Email",
        validation: [{ type: "required" }, { type: "email" }]
      },
      {
        id: "needDemo",
        type: "checkbox",
        label: "I'd like to schedule a demo"
      },
      {
        id: "preferredDate",
        type: "date",
        label: "Preferred Demo Date",
        min: new Date().toISOString().split('T')[0],
        conditionalDisplay: {
          fieldId: "needDemo",
          operator: "equals",
          value: true
        }
      },
      {
        id: "preferredTime",
        type: "time",
        label: "Preferred Time",
        conditionalDisplay: {
          fieldId: "needDemo",
          operator: "equals",
          value: true
        }
      },
      {
        id: "message",
        type: "textarea",
        label: "Message",
        rows: 4
      }
    ],
    submitButton: {
      text: "Submit",
      variant: "primary"
    }
  }
};

export default function ContactFormEnhancedShowcase() {
  usePageMetadata({
    title: "Contact Form Enhanced Block - React Jedi",
    description:
      "Advanced contact form with conditional fields, file uploads, phone formatting, wizard steps, and CRM integration.",
  });

  const examples = [
    {
      id: "simple",
      title: "Simple Contact Form",
      description: "Basic contact form with essential fields",
      component: simpleFormSpec,
    },
    {
      id: "detailed",
      title: "Detailed Form",
      description: "Comprehensive form with multiple field types",
      component: detailedFormSpec,
    },
    {
      id: "with-map",
      title: "Form with Map",
      description: "Contact form with integrated location map",
      component: withMapSpec,
    },
    {
      id: "split-screen",
      title: "Split Screen Layout",
      description: "Form with content panel showing features",
      component: splitScreenSpec,
    },
    {
      id: "wizard",
      title: "Multi-Step Wizard",
      description: "Form broken into logical steps with progress tracking",
      component: wizardFormSpec,
    },
    {
      id: "conditional",
      title: "Conditional Fields",
      description: "Dynamic form that shows/hides fields based on user input",
      component: conditionalFormSpec,
    },
  ];

  return (
    <ShowcaseLayout
      title="Contact Form Enhanced"
      description="Advanced contact form block with multiple variants, field types, validation, conditional logic, and integration capabilities."
      componentType="ContactFormBlock"
    >
      <div className="space-y-12">
        <section>
          <h2 className="mb-6 text-2xl font-bold">Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">Field Types</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Text, Email, Phone, URL inputs</li>
                <li>• Textarea with customizable rows</li>
                <li>• Select dropdowns and radio groups</li>
                <li>• Checkbox (single and multiple)</li>
                <li>• File upload with validation</li>
                <li>• Date and time pickers</li>
              </ul>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">Advanced Features</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Real-time validation</li>
                <li>• Conditional field display</li>
                <li>• Multi-region phone formatting</li>
                <li>• Form data persistence</li>
                <li>• CRM integration support</li>
                <li>• Custom success/error handling</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">Examples</h2>
          <Tabs defaultValue="simple" className="w-full">
            <div className="mb-4 flex flex-wrap gap-2">
              {examples.map((example) => (
                <Button
                  key={example.id}
                  variant="outline"
                  size="sm"
                  data-value={example.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {example.title}
                </Button>
              ))}
            </div>

            {examples.map((example) => (
              <div
                key={example.id}
                data-value={example.id}
                className="mt-6 space-y-6"
              >
                <div className="rounded-lg border bg-muted/30 p-6">
                  <p className="mb-4 text-sm text-muted-foreground">
                    {example.description}
                  </p>
                  <div className="flex justify-center">
                    <div className="w-full max-w-2xl">
                      {render(example.component)}
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={JSON.stringify(example.component, null, 2)}
                  language="json"
                  showLineNumbers
                />
              </div>
            ))}
          </Tabs>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">Validation Rules</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Rule Type</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4"><code>required</code></td>
                  <td className="p-4">Field must have a value</td>
                  <td className="p-4"><code>{`{ type: "required" }`}</code></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4"><code>email</code></td>
                  <td className="p-4">Must be a valid email address</td>
                  <td className="p-4"><code>{`{ type: "email" }`}</code></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4"><code>phone</code></td>
                  <td className="p-4">Must be a valid phone number</td>
                  <td className="p-4"><code>{`{ type: "phone" }`}</code></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4"><code>pattern</code></td>
                  <td className="p-4">Must match regex pattern</td>
                  <td className="p-4"><code>{`{ type: "pattern", value: "^[A-Z]" }`}</code></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4"><code>minLength</code></td>
                  <td className="p-4">Minimum character length</td>
                  <td className="p-4"><code>{`{ type: "minLength", value: 10 }`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">CRM Integration</h2>
          <div className="rounded-lg border bg-muted/30 p-6">
            <p className="mb-4">
              Configure CRM integration to automatically send form submissions to your CRM system:
            </p>
            <CodeBlock
              code={`{
  type: "ContactFormBlock",
  props: {
    // ... other props
    crmConfig: {
      endpoint: "https://api.yourcrm.com/leads",
      headers: {
        "Authorization": "Bearer YOUR_API_KEY",
        "X-CRM-Source": "website-contact"
      },
      fieldMapping: {
        // Map form fields to CRM fields
        "lead_first_name": "firstName",
        "lead_last_name": "lastName",
        "lead_email": "email",
        "lead_phone": "phone",
        "lead_company": "company"
      },
      customData: {
        // Additional data to send
        "source": "contact-form",
        "campaign": "q4-2024"
      }
    }
  }
}`}
              language="javascript"
              showLineNumbers
            />
          </div>
        </section>
      </div>
    </ShowcaseLayout>
  );
}