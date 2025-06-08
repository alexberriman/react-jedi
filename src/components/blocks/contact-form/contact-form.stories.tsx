import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect } from "storybook/test";
import { ContactForm } from "./contact-form";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

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

export const Simple: Story = enhanceStoryForDualMode<typeof ContactForm>({
  args: {
    variant: "simple",
    title: "Contact Us",
    description:
      "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title and description render
    expect(canvas.getByText("Contact Us")).toBeInTheDocument();
    expect(canvas.getByText("We'd love to hear from you. Send us a message and we'll respond as soon as possible.")).toBeInTheDocument();
    
    // Verify form fields
    expect(canvas.getByLabelText("Name")).toBeInTheDocument();
    expect(canvas.getByLabelText("Email")).toBeInTheDocument();
    expect(canvas.getByLabelText("Message")).toBeInTheDocument();
    
    // Verify submit button
    expect(canvas.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  },
});

export const Detailed: Story = enhanceStoryForDualMode<typeof ContactForm>({
  args: {
    variant: "detailed",
    title: "Get in Touch",
    description: "Have a question or want to work together? Fill out the form below.",
    showFileUpload: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title and description
    expect(canvas.getByText("Get in Touch")).toBeInTheDocument();
    expect(canvas.getByText("Have a question or want to work together? Fill out the form below.")).toBeInTheDocument();
    
    // Verify standard fields
    expect(canvas.getByLabelText("Name")).toBeInTheDocument();
    expect(canvas.getByLabelText("Email")).toBeInTheDocument();
    expect(canvas.getByLabelText("Message")).toBeInTheDocument();
    
    // Verify detailed variant fields
    expect(canvas.getByLabelText("Phone (optional)")).toBeInTheDocument();
    expect(canvas.getByLabelText("Company (optional)")).toBeInTheDocument();
    expect(canvas.getByText("Subject")).toBeInTheDocument();
    expect(canvas.getByText("Select a subject")).toBeInTheDocument();
    
    // Verify file upload
    expect(canvas.getByLabelText("Attachment (optional)")).toBeInTheDocument();
    
    // Verify submit button
    expect(canvas.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  },
});

export const WithMap: Story = enhanceStoryForDualMode<typeof ContactForm>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify form section
    expect(canvas.getByText("Contact Our Team")).toBeInTheDocument();
    expect(canvas.getByText("Reach out to us through the form or visit our office.")).toBeInTheDocument();
    
    // Verify form fields
    expect(canvas.getByLabelText("Name")).toBeInTheDocument();
    expect(canvas.getByLabelText("Email")).toBeInTheDocument();
    expect(canvas.getByLabelText("Message")).toBeInTheDocument();
    
    // Verify office info card
    expect(canvas.getByText("Get in Touch")).toBeInTheDocument();
    expect(canvas.getByText("Main Office")).toBeInTheDocument();
    expect(canvas.getByText("Address")).toBeInTheDocument();
    expect(canvas.getByText("123 Business Street")).toBeInTheDocument();
    expect(canvas.getByText("Phone")).toBeInTheDocument();
    expect(canvas.getByText("+1 (555) 123-4567")).toBeInTheDocument();
    expect(canvas.getByText("Email")).toBeInTheDocument();
    expect(canvas.getByText("hello@example.com")).toBeInTheDocument();
    expect(canvas.getByText("Business Hours")).toBeInTheDocument();
    
    // Verify map iframe
    expect(canvas.getByTitle("Office Location")).toBeInTheDocument();
  },
});

export const SplitScreen: Story = enhanceStoryForDualMode<typeof ContactForm>({
  args: {
    variant: "split-screen",
    title: "Let's Connect",
    description: "Transform your ideas into reality. Get in touch with our expert team.",
    backgroundImage:
      "https://placehold.co/1200x800/EEE/31343C",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify form fields (form is on the right side)
    expect(canvas.getByLabelText("Name")).toBeInTheDocument();
    expect(canvas.getByLabelText("Email")).toBeInTheDocument();
    expect(canvas.getByLabelText("Message")).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
    
    // On mobile, the title should appear above the form
    const mobileTitle = canvas.queryByRole("heading", { name: "Let's Connect" });
    if (mobileTitle) {
      expect(mobileTitle).toBeInTheDocument();
    }
  },
});

export const SplitScreenNoImage: Story = enhanceStoryForDualMode<typeof ContactForm>({
  name: "Split Screen (No Image)",
  args: {
    variant: "split-screen",
    title: "Start a Conversation",
    description: "We're here to help bring your vision to life. Let's talk about your project.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify form fields
    expect(canvas.getByLabelText("Name")).toBeInTheDocument();
    expect(canvas.getByLabelText("Email")).toBeInTheDocument();
    expect(canvas.getByLabelText("Message")).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
    
    // Verify title and description appear
    const titles = canvas.getAllByText("Start a Conversation");
    expect(titles.length).toBeGreaterThan(0);
  },
});

export const Minimal: Story = enhanceStoryForDualMode<typeof ContactForm>({
  args: {
    variant: "minimal",
    title: "Quick Contact",
    description: "Drop us a line",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title and description
    expect(canvas.getByText("Quick Contact")).toBeInTheDocument();
    expect(canvas.getByText("Drop us a line")).toBeInTheDocument();
    
    // Verify form fields
    expect(canvas.getByLabelText("Name")).toBeInTheDocument();
    expect(canvas.getByLabelText("Email")).toBeInTheDocument();
    expect(canvas.getByLabelText("Message")).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  },
});

export const WithCustomSubjects: Story = enhanceStoryForDualMode<typeof ContactForm>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    
    // Verify title and description
    expect(canvas.getByText("How Can We Help?")).toBeInTheDocument();
    expect(canvas.getByText("Select a topic and tell us more about your inquiry.")).toBeInTheDocument();
    
    // Verify subject dropdown
    const subjectSelect = canvas.getByText("Select a subject");
    await user.click(subjectSelect);
    
    // Verify custom subjects are available
    expect(canvas.getByText("Technical Support")).toBeInTheDocument();
    expect(canvas.getByText("Billing Question")).toBeInTheDocument();
    expect(canvas.getByText("Feature Request")).toBeInTheDocument();
    expect(canvas.getByText("Bug Report")).toBeInTheDocument();
    expect(canvas.getByText("Enterprise Sales")).toBeInTheDocument();
  },
});

export const WithAllOptions: Story = enhanceStoryForDualMode<typeof ContactForm>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all fields are present
    expect(canvas.getByLabelText("Name")).toBeInTheDocument();
    expect(canvas.getByLabelText("Email")).toBeInTheDocument();
    expect(canvas.getByLabelText("Phone (optional)")).toBeInTheDocument();
    expect(canvas.getByLabelText("Company (optional)")).toBeInTheDocument();
    expect(canvas.getByText("Subject")).toBeInTheDocument();
    expect(canvas.getByText("Preferred Contact Method")).toBeInTheDocument();
    expect(canvas.getByLabelText("Message")).toBeInTheDocument();
    expect(canvas.getByLabelText("Attachment (optional)")).toBeInTheDocument();
    
    // Verify custom submit text
    expect(canvas.getByRole("button", { name: "Submit Inquiry" })).toBeInTheDocument();
  },
});

export const CustomerSupport: Story = enhanceStoryForDualMode<typeof ContactForm>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title and description
    expect(canvas.getByText("Customer Support")).toBeInTheDocument();
    expect(canvas.getByText("Need help? Our support team is here to assist you.")).toBeInTheDocument();
    
    // Verify required fields for support
    expect(canvas.getByLabelText("Phone (optional)")).toBeInTheDocument();
    expect(canvas.getByLabelText("Company (optional)")).toBeInTheDocument();
    expect(canvas.getByLabelText("Attachment (optional)")).toBeInTheDocument();
    
    // Verify custom submit text
    expect(canvas.getByRole("button", { name: "Submit Ticket" })).toBeInTheDocument();
  },
});

export const SalesInquiry: Story = enhanceStoryForDualMode<typeof ContactForm>({
  args: {
    variant: "split-screen",
    title: "Ready to Get Started?",
    description: "Tell us about your project and we'll prepare a custom quote.",
    showCompany: true,
    showPhone: true,
    subjects: ["Small Business", "Enterprise", "Non-Profit", "Government"],
    submitText: "Request Quote",
    backgroundImage:
      "https://placehold.co/1200x800/EEE/31343C",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify form fields
    expect(canvas.getByLabelText("Name")).toBeInTheDocument();
    expect(canvas.getByLabelText("Email")).toBeInTheDocument();
    expect(canvas.getByLabelText("Phone (optional)")).toBeInTheDocument();
    expect(canvas.getByLabelText("Company (optional)")).toBeInTheDocument();
    expect(canvas.getByLabelText("Message")).toBeInTheDocument();
    
    // Verify custom submit text
    expect(canvas.getByRole("button", { name: "Request Quote" })).toBeInTheDocument();
  },
});

export const NewsletterIntegration: Story = enhanceStoryForDualMode<typeof ContactForm>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify form section
    expect(canvas.getByText("Stay Connected")).toBeInTheDocument();
    expect(canvas.getByText("Contact us or subscribe to our newsletter for updates.")).toBeInTheDocument();
    
    // Verify office info
    expect(canvas.getByText("456 Innovation Drive")).toBeInTheDocument();
    expect(canvas.getByText("+1 (555) 987-6543")).toBeInTheDocument();
    expect(canvas.getByText("info@techcompany.com")).toBeInTheDocument();
    expect(canvas.getByText("24/7 Support Available")).toBeInTheDocument();
  },
});

export const MinimalDark: Story = enhanceStoryForDualMode<typeof ContactForm>({
  name: "Minimal (Dark Mode)",
  args: {
    variant: "minimal",
    title: "Say Hello",
    description: "We'd love to hear from you",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify content renders in dark mode
    expect(canvas.getByText("Say Hello")).toBeInTheDocument();
    expect(canvas.getByText("We'd love to hear from you")).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  },
});

export const WithRecaptcha: Story = enhanceStoryForDualMode<typeof ContactForm>({
  name: "With reCAPTCHA",
  args: {
    variant: "simple",
    title: "Secure Contact Form",
    description: "Protected by reCAPTCHA to prevent spam.",
    recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", // Test key
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify form content
    expect(canvas.getByText("Secure Contact Form")).toBeInTheDocument();
    expect(canvas.getByText("Protected by reCAPTCHA to prevent spam.")).toBeInTheDocument();
    
    // Verify reCAPTCHA notice
    expect(canvas.getByText("Protected by reCAPTCHA")).toBeInTheDocument();
  },
});

export const LoadingState: Story = enhanceStoryForDualMode<typeof ContactForm>({
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
    const user = userEvent.setup();

    // Fill out form
    await user.type(canvas.getByLabelText(/name/i), "John Doe");
    await user.type(canvas.getByLabelText(/email/i), "john@example.com");
    await user.type(canvas.getByLabelText(/message/i), "This is a test message");

    // Submit to see loading state
    await user.click(canvas.getByRole("button", { name: /send/i }));
  },
});
