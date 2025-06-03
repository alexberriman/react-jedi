import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseLayout } from "../../../../components/layouts/showcase-layout";
import { CodeBlock } from "../../../../components/ui/code-block";
import { Tabs } from "../../../../components/ui/tabs";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";

// Example specifications
const simpleForm: ComponentSpec = {
  type: "ContactForm",
  props: {
    variant: "simple",
    title: "Contact Us",
    description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    submitText: "Send Message",
    successMessage: "Thank you for your message. We'll get back to you within 24 hours!",
    errorMessage: "Oops! Something went wrong. Please try again later or email us directly.",
  },
};

const detailedForm: ComponentSpec = {
  type: "ContactForm",
  props: {
    variant: "detailed",
    title: "Get a Quote",
    description: "Tell us about your project and we'll prepare a custom quote for you.",
    subjects: [
      "Web Development",
      "Mobile App",
      "UI/UX Design",
      "Consulting",
      "Support",
      "Other",
    ],
    showFileUpload: true,
    showPhone: true,
    showCompany: true,
    showPreferredContact: true,
    submitText: "Request Quote",
    successMessage: "Quote request received! We'll send you a detailed proposal within 48 hours.",
  },
};

const withMapForm: ComponentSpec = {
  type: "ContactForm",
  props: {
    variant: "with-map",
    title: "Visit Our Office",
    description: "Drop by for a coffee or reach out through the form below.",
    officeInfo: {
      name: "React Jedi HQ",
      address: "123 Tech Street\nSuite 400\nSan Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "hello@reactjedi.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977093193024!2d-122.39449938468219!3d37.78779927975692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807f619a62df%3A0x491ce2f73977af35!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus",
    },
    showPhone: true,
    showCompany: true,
  },
};

const splitScreenForm: ComponentSpec = {
  type: "ContactForm",
  props: {
    variant: "split-screen",
    title: "Start Your Journey",
    description: "Transform your ideas into reality with our expert team.",
    backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop",
    showCompany: true,
    submitText: "Get Started",
  },
};

const minimalForm: ComponentSpec = {
  type: "ContactForm",
  props: {
    variant: "minimal",
    title: "Quick Question?",
    description: "Drop us a line",
    submitText: "Send",
  },
};

const supportForm: ComponentSpec = {
  type: "ContactForm",
  props: {
    variant: "detailed",
    title: "Customer Support",
    description: "Having trouble? Our support team is here to help.",
    subjects: [
      "Account Issues",
      "Technical Problem",
      "Billing Question",
      "Feature Request",
      "Bug Report",
      "Other",
    ],
    showPhone: true,
    showCompany: true,
    showFileUpload: true,
    submitText: "Submit Ticket",
    successMessage: "Support ticket created! Ticket #12345. We'll respond within 4 hours.",
  },
};

const newsletterIntegratedForm: ComponentSpec = {
  type: "ContactForm",
  props: {
    variant: "with-map",
    title: "Stay Connected",
    description: "Contact us directly or subscribe to our newsletter for updates.",
    officeInfo: {
      address: "456 Innovation Drive\nTech Park, CA 94025",
      phone: "+1 (555) 987-6543",
      email: "info@techcompany.com",
      hours: "24/7 Support Available",
    },
    recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", // Test key
  },
};

export function ContactFormShowcasePage() {
  usePageMetadata({
    title: "Contact Form Block | Component Showcase",
    description: "Advanced contact form component with multiple variants, validation, and office integration",
  });

  const variants = [
    { id: "simple", name: "Simple", spec: simpleForm },
    { id: "detailed", name: "Detailed", spec: detailedForm },
    { id: "with-map", name: "With Map", spec: withMapForm },
    { id: "split-screen", name: "Split Screen", spec: splitScreenForm },
    { id: "minimal", name: "Minimal", spec: minimalForm },
  ];

  const examples = [
    { id: "support", name: "Customer Support", spec: supportForm },
    { id: "newsletter", name: "With Newsletter", spec: newsletterIntegratedForm },
  ];

  return (
    <ShowcaseLayout
      title="Contact Form"
      description="A versatile contact form block with multiple variants, validation, and rich features for collecting user inquiries."
      badge="Block"
      features={[
        "5 distinct variants",
        "Form validation",
        "File upload support",
        "Map integration",
        "reCAPTCHA support",
        "Customizable fields",
        "Success/error states",
        "Mobile responsive",
      ]}
    >
      {/* Variants Section */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Variants</h2>
          <p className="text-muted-foreground">
            Choose from multiple contact form layouts to match your design needs
          </p>
        </div>

        <Tabs defaultValue="simple" className="w-full">
          <div className="flex flex-wrap gap-2 mb-8">
            {variants.map((variant) => (
              <Button
                key={variant.id}
                data-value={variant.id}
                variant="outline"
                size="sm"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {variant.name}
              </Button>
            ))}
          </div>

          {variants.map((variant) => (
            <div
              key={variant.id}
              data-value={variant.id}
              className="mt-6 data-[state=inactive]:hidden"
            >
              <div className={cn(
                "rounded-lg border bg-card p-8",
                variant.id === "split-screen" && "p-0",
                variant.id === "minimal" && "max-w-md mx-auto"
              )}>
                {render(variant.spec)}
              </div>
              <div className="mt-6">
                <CodeBlock language="json">
                  {JSON.stringify(variant.spec, null, 2)}
                </CodeBlock>
              </div>
            </div>
          ))}
        </Tabs>
      </section>

      {/* Use Cases Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-bold mb-2">Use Cases</h2>
          <p className="text-muted-foreground">
            Pre-configured examples for common contact form scenarios
          </p>
        </div>

        <div className="space-y-12">
          {examples.map((example) => (
            <div key={example.id}>
              <h3 className="text-lg font-semibold mb-4">{example.name}</h3>
              <div className="rounded-lg border bg-card p-8">
                {render(example.spec)}
              </div>
              <div className="mt-6">
                <CodeBlock language="json">
                  {JSON.stringify(example.spec, null, 2)}
                </CodeBlock>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Configuration Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-bold mb-2">Configuration Options</h2>
          <p className="text-muted-foreground">
            Customize the contact form to meet your specific requirements
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Available Props</h3>
          <div className="space-y-4">
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">variant</code>
              <p className="text-sm text-muted-foreground mt-1">
                Visual variant: "simple" | "detailed" | "with-map" | "split-screen" | "minimal"
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">title</code>
              <p className="text-sm text-muted-foreground mt-1">
                Form title text
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">description</code>
              <p className="text-sm text-muted-foreground mt-1">
                Form description or subtitle
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">officeInfo</code>
              <p className="text-sm text-muted-foreground mt-1">
                Office contact details for map variant (address, phone, email, hours, mapUrl)
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">subjects</code>
              <p className="text-sm text-muted-foreground mt-1">
                Array of subject options for detailed variant
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">showFileUpload</code>
              <p className="text-sm text-muted-foreground mt-1">
                Enable file attachment field
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">showPhone</code>
              <p className="text-sm text-muted-foreground mt-1">
                Show phone number field
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">showCompany</code>
              <p className="text-sm text-muted-foreground mt-1">
                Show company name field
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">showPreferredContact</code>
              <p className="text-sm text-muted-foreground mt-1">
                Show preferred contact method selection
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">submitText</code>
              <p className="text-sm text-muted-foreground mt-1">
                Custom submit button text
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">recaptchaSiteKey</code>
              <p className="text-sm text-muted-foreground mt-1">
                reCAPTCHA site key for spam protection
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">successMessage</code>
              <p className="text-sm text-muted-foreground mt-1">
                Message shown on successful submission
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">errorMessage</code>
              <p className="text-sm text-muted-foreground mt-1">
                Message shown on submission error
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">backgroundImage</code>
              <p className="text-sm text-muted-foreground mt-1">
                Background image URL for split-screen variant
              </p>
            </div>
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">animated</code>
              <p className="text-sm text-muted-foreground mt-1">
                Enable/disable animations (default: true)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Example */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-bold mb-2">Integration Example</h2>
          <p className="text-muted-foreground">
            How to handle form submissions in your application
          </p>
        </div>

        <CodeBlock language="typescript">
{`// Example: Handling form submission
const contactFormSpec = {
  type: "ContactForm",
  props: {
    variant: "detailed",
    title: "Contact Sales",
    onFormSubmit: async (data) => {
      // Send to your API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      // Handle success
      console.log('Message sent successfully!');
    },
  },
};

// Render the form
render(contactFormSpec);`}
        </CodeBlock>
      </section>
    </ShowcaseLayout>
  );
}