import { render } from "@alexberriman/react-jedi";
import type { ContactFormBlockProperties } from "@alexberriman/react-jedi";

const simpleContactForm: ContactFormBlockProperties = {
  type: "ContactFormBlock",
  variant: "simple",
  title: "Get in Touch",
  description: "Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
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
      id: "subject",
      type: "text",
      label: "Subject",
      placeholder: "How can we help?",
      validation: [{ type: "required" }]
    },
    {
      id: "message",
      type: "textarea",
      label: "Message",
      placeholder: "Tell us more about your inquiry...",
      rows: 5,
      validation: [
        { type: "required" },
        { type: "minLength", value: 20, message: "Please provide more details (at least 20 characters)" }
      ]
    }
  ],
  submitButton: {
    text: "Send Message",
    variant: "primary"
  },
  showRequiredIndicator: true,
  validateOnBlur: true
};

const enterpriseContactForm: ContactFormBlockProperties = {
  type: "ContactFormBlock",
  variant: "wizard",
  title: "Enterprise Solution Inquiry",
  description: "Complete this form to get a customized enterprise solution for your organization",
  steps: [
    {
      id: "personal",
      title: "Your Information",
      description: "Let us know who you are",
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
          validation: [
            { type: "required" },
            { type: "email" },
            { type: "pattern", value: String.raw`^[^@]+@(?!gmail|yahoo|hotmail|outlook)[^@]+\.[^@]+$`, message: "Please use your work email address" }
          ]
        },
        {
          id: "phone",
          type: "phone",
          label: "Phone Number",
          phoneConfig: {
            defaultCountry: "US",
            preferredCountries: ["US", "CA", "GB", "AU"],
            formatOnDisplay: true
          },
          validation: [{ type: "phone" }]
        },
        {
          id: "jobTitle",
          type: "text",
          label: "Job Title",
          validation: [{ type: "required" }]
        }
      ]
    },
    {
      id: "company",
      title: "Company Information",
      description: "Tell us about your organization",
      fields: [
        {
          id: "companyName",
          type: "text",
          label: "Company Name",
          validation: [{ type: "required" }]
        },
        {
          id: "website",
          type: "url",
          label: "Company Website",
          placeholder: "https://example.com",
          validation: [{ type: "url" }]
        },
        {
          id: "industry",
          type: "select",
          label: "Industry",
          options: [
            { label: "Technology", value: "tech" },
            { label: "Healthcare", value: "healthcare" },
            { label: "Finance", value: "finance" },
            { label: "Retail", value: "retail" },
            { label: "Manufacturing", value: "manufacturing" },
            { label: "Education", value: "education" },
            { label: "Government", value: "government" },
            { label: "Non-profit", value: "nonprofit" },
            { label: "Other", value: "other" }
          ],
          validation: [{ type: "required" }]
        },
        {
          id: "companySize",
          type: "radio",
          label: "Company Size",
          options: [
            { label: "1-50 employees", value: "small" },
            { label: "51-200 employees", value: "medium" },
            { label: "201-1000 employees", value: "large" },
            { label: "1000+ employees", value: "enterprise" }
          ],
          validation: [{ type: "required" }]
        },
        {
          id: "annualRevenue",
          type: "select",
          label: "Annual Revenue",
          options: [
            { label: "Less than $1M", value: "<1m" },
            { label: "$1M - $10M", value: "1m-10m" },
            { label: "$10M - $50M", value: "10m-50m" },
            { label: "$50M - $100M", value: "50m-100m" },
            { label: "More than $100M", value: ">100m" }
          ]
        }
      ]
    },
    {
      id: "requirements",
      title: "Your Requirements",
      description: "What are you looking for?",
      fields: [
        {
          id: "products",
          type: "checkbox",
          label: "Products of Interest",
          options: [
            { label: "Cloud Infrastructure", value: "cloud" },
            { label: "Data Analytics", value: "analytics" },
            { label: "Security Solutions", value: "security" },
            { label: "API Platform", value: "api" },
            { label: "Mobile Solutions", value: "mobile" },
            { label: "Custom Development", value: "custom" }
          ],
          validation: [{ type: "required", message: "Please select at least one product" }]
        },
        {
          id: "budget",
          type: "select",
          label: "Budget Range",
          options: [
            { label: "Less than $50k", value: "<50k" },
            { label: "$50k - $250k", value: "50k-250k" },
            { label: "$250k - $1M", value: "250k-1m" },
            { label: "More than $1M", value: ">1m" },
            { label: "Not sure yet", value: "unsure" }
          ],
          validation: [{ type: "required" }]
        },
        {
          id: "timeline",
          type: "radio",
          label: "Implementation Timeline",
          options: [
            { label: "Immediate (< 1 month)", value: "immediate" },
            { label: "Short-term (1-3 months)", value: "short" },
            { label: "Medium-term (3-6 months)", value: "medium" },
            { label: "Long-term (6+ months)", value: "long" }
          ],
          validation: [{ type: "required" }]
        },
        {
          id: "requirements",
          type: "textarea",
          label: "Detailed Requirements",
          placeholder: "Please describe your specific needs, challenges, and goals...",
          rows: 6,
          validation: [
            { type: "required" },
            { type: "minLength", value: 100, message: "Please provide detailed requirements (at least 100 characters)" }
          ]
        },
        {
          id: "attachments",
          type: "file",
          label: "Supporting Documents",
          fileConfig: {
            accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
            maxSize: 25 * 1024 * 1024, // 25MB
            maxFiles: 5,
            multiple: true
          },
          helperText: "Upload RFPs, technical specifications, or other relevant documents (max 5 files, 25MB each)"
        }
      ]
    }
  ],
  submitButton: {
    text: "Submit Inquiry",
    variant: "primary",
    loadingText: "Submitting your inquiry..."
  },
  crmConfig: {
    endpoint: "https://api.example.com/enterprise-leads",
    headers: {
      "X-API-Key": "your-enterprise-api-key"
    },
    fieldMapping: {
      "lead.firstName": "firstName",
      "lead.lastName": "lastName",
      "lead.email": "email",
      "lead.phone": "phone",
      "lead.company": "companyName",
      "lead.companySize": "companySize",
      "lead.products": "products",
      "lead.budget": "budget"
    },
    customData: {
      "source": "enterprise-inquiry-form",
      "priority": "high"
    }
  },
  successMessage: "Thank you for your inquiry! An enterprise solutions specialist will contact you within 24 hours.",
  animated: true
};

const supportForm: ContactFormBlockProperties = {
  type: "ContactFormBlock",
  variant: "split-screen",
  title: "Need Help?",
  description: "Our support team is here to assist you",
  fields: [
    {
      id: "category",
      type: "select",
      label: "Issue Category",
      options: [
        { label: "Technical Support", value: "technical" },
        { label: "Billing & Account", value: "billing" },
        { label: "Feature Request", value: "feature" },
        { label: "Bug Report", value: "bug" },
        { label: "Other", value: "other" }
      ],
      validation: [{ type: "required" }]
    },
    {
      id: "priority",
      type: "radio",
      label: "Priority Level",
      options: [
        { label: "Low - General question", value: "low" },
        { label: "Medium - Issue affecting work", value: "medium" },
        { label: "High - Critical business impact", value: "high" }
      ],
      validation: [{ type: "required" }]
    },
    {
      id: "email",
      type: "email",
      label: "Your Email",
      validation: [
        { type: "required" },
        { type: "email" }
      ]
    },
    {
      id: "description",
      type: "textarea",
      label: "Describe Your Issue",
      placeholder: "Please provide as much detail as possible...",
      rows: 5,
      validation: [
        { type: "required" },
        { type: "minLength", value: 30 }
      ]
    },
    {
      id: "screenshots",
      type: "file",
      label: "Screenshots (Optional)",
      fileConfig: {
        accept: "image/*",
        maxSize: 5 * 1024 * 1024,
        maxFiles: 3,
        multiple: true
      },
      helperText: "Add screenshots to help us understand the issue"
    }
  ],
  splitContent: {
    type: "info",
    title: "Support Resources",
    description: "While you wait for our response:",
    features: [
      "Check our documentation for instant answers",
      "Join our community forum for peer support",
      "Watch video tutorials on our YouTube channel",
      "Schedule a live support session",
      "Average response time: 2 hours"
    ]
  },
  submitButton: {
    text: "Submit Ticket",
    variant: "primary"
  },
  compact: true
};

export function ContactFormEnhancedPage() {
  return (
    <div className="container mx-auto py-12 space-y-16">
      <section>
        <h1 className="text-4xl font-bold mb-4">Contact Form Enhanced Examples</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Advanced contact forms with validation, conditional fields, file uploads, and CRM integration.
        </p>
      </section>

      <section className="space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Simple Contact Form</h2>
          <div className="max-w-2xl mx-auto">
            {render(simpleContactForm)}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Enterprise Multi-Step Form</h2>
          <div className="max-w-4xl mx-auto">
            {render(enterpriseContactForm)}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Support Ticket Form</h2>
          <div className="max-w-5xl mx-auto">
            {render(supportForm)}
          </div>
        </div>
      </section>
    </div>
  );
}