import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContactForm } from "./contact-form";

const meta: Meta<typeof ContactForm> = {
  title: "Blocks/ContactForm",
  component: ContactForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["simple", "detailed", "with-map", "split-screen", "minimal"],
    },
    showFileUpload: {
      control: "boolean",
    },
    showPhone: {
      control: "boolean",
    },
    showCompany: {
      control: "boolean",
    },
    showPreferredContact: {
      control: "boolean",
    },
    animated: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    variant: "simple",
    title: "Contact Us",
    description:
      "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  },
};

export const Detailed: Story = {
  args: {
    variant: "detailed",
    title: "Get in Touch",
    description: "Have a question or want to work together? Fill out the form below.",
    showFileUpload: true,
  },
};

export const WithMap: Story = {
  args: {
    variant: "with-map",
    title: "Contact Our Team",
    description: "Reach out to us through the form or visit our office.",
    officeInfo: {
      name: "Main Office",
      address: "123 Business Street\nSuite 100\nSan Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "hello@example.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977093193024!2d-122.39449938468219!3d37.78779927975692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807f619a62df%3A0x491ce2f73977af35!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus",
    },
  },
};

export const SplitScreen: Story = {
  args: {
    variant: "split-screen",
    title: "Let's Connect",
    description: "Transform your ideas into reality. Get in touch with our expert team.",
    backgroundImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
  },
};

export const SplitScreenNoImage: Story = {
  name: "Split Screen (No Image)",
  args: {
    variant: "split-screen",
    title: "Start a Conversation",
    description: "We're here to help bring your vision to life. Let's talk about your project.",
  },
};

export const Minimal: Story = {
  args: {
    variant: "minimal",
    title: "Quick Contact",
    description: "Drop us a line",
  },
};

export const WithCustomSubjects: Story = {
  name: "With Custom Subjects",
  args: {
    variant: "detailed",
    title: "How Can We Help?",
    description: "Select a topic and tell us more about your inquiry.",
    subjects: [
      "Technical Support",
      "Billing Question",
      "Feature Request",
      "Bug Report",
      "Enterprise Sales",
      "Media Inquiry",
      "Other",
    ],
  },
};

export const WithAllOptions: Story = {
  name: "With All Options",
  args: {
    variant: "detailed",
    title: "Complete Contact Form",
    description: "All fields and options enabled for comprehensive inquiries.",
    showFileUpload: true,
    showPhone: true,
    showCompany: true,
    showPreferredContact: true,
    subjects: ["General", "Support", "Sales", "Partnership"],
    submitText: "Submit Inquiry",
    successMessage: "Your inquiry has been received! We'll contact you within 24 hours.",
    errorMessage: "Failed to submit your inquiry. Please try again or email us directly.",
  },
};

export const CustomerSupport: Story = {
  name: "Customer Support",
  args: {
    variant: "detailed",
    title: "Customer Support",
    description: "Need help? Our support team is here to assist you.",
    subjects: [
      "Account Issues",
      "Technical Problem",
      "Billing Question",
      "Feature Request",
      "Other",
    ],
    showPhone: true,
    showCompany: true,
    showFileUpload: true,
    submitText: "Submit Ticket",
    successMessage: "Support ticket created! Ticket #12345. We'll respond within 4 hours.",
  },
};

export const SalesInquiry: Story = {
  name: "Sales Inquiry",
  args: {
    variant: "split-screen",
    title: "Ready to Get Started?",
    description: "Tell us about your project and we'll prepare a custom quote.",
    showCompany: true,
    showPhone: true,
    subjects: ["Small Business", "Enterprise", "Non-Profit", "Government"],
    submitText: "Request Quote",
    backgroundImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
  },
};

export const NewsletterIntegration: Story = {
  name: "With Newsletter Integration",
  args: {
    variant: "with-map",
    title: "Stay Connected",
    description: "Contact us or subscribe to our newsletter for updates.",
    officeInfo: {
      address: "456 Innovation Drive\nTech Park, CA 94025",
      phone: "+1 (555) 987-6543",
      email: "info@techcompany.com",
      hours: "24/7 Support Available",
    },
  },
};

export const MinimalDark: Story = {
  name: "Minimal (Dark Mode)",
  args: {
    variant: "minimal",
    title: "Say Hello",
    description: "We'd love to hear from you",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const WithRecaptcha: Story = {
  name: "With reCAPTCHA",
  args: {
    variant: "simple",
    title: "Secure Contact Form",
    description: "Protected by reCAPTCHA to prevent spam.",
    recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", // Test key
  },
};

export const LoadingState: Story = {
  name: "Loading State",
  args: {
    variant: "simple",
    title: "Contact Form",
    description: "Example showing loading state",
    onFormSubmit: async () => {
      // Simulate a long-running operation
      await new Promise((resolve) => globalThis.setTimeout(resolve, 10_000));
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill out form
    await userEvent.type(canvas.getByLabelText(/name/i), "John Doe");
    await userEvent.type(canvas.getByLabelText(/email/i), "john@example.com");
    await userEvent.type(canvas.getByLabelText(/message/i), "This is a test message");

    // Submit to see loading state
    await userEvent.click(canvas.getByRole("button", { name: /send/i }));
  },
};

// Import necessary testing utilities at the top of the file
import { within, userEvent } from "storybook/test";
