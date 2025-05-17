import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { ScreenReaderProvider } from "./screen-reader-announcements";
import { RouteAnnouncer } from "./route-announcer";
import { useToastWithAnnouncements } from "./toast-announcer";
import { useFormAnnouncements } from "./form-announcer";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Toaster } from "../../components/ui/toast";

const IntegratedDemo = () => {
  return (
    <ScreenReaderProvider>
      <BrowserRouter>
        <RouteAnnouncer />
        <div className="p-8 max-w-4xl mx-auto">
          <nav className="mb-8">
            <ul className="flex gap-4">
              <li><Link to="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li><Link to="/about" className="text-blue-600 hover:underline">About</Link></li>
              <li><Link to="/contact" className="text-blue-600 hover:underline">Contact</Link></li>
            </ul>
          </nav>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Toaster />
      </BrowserRouter>
    </ScreenReaderProvider>
  );
};

const Home = () => {
  const toast = useToastWithAnnouncements();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Toast Notifications with Announcements</h2>
        <div className="space-y-4">
          <Button onClick={() => toast.success("Welcome to the home page!")}>
            Show Success Toast
          </Button>
          <Button onClick={() => toast.error("Something went wrong!")}>
            Show Error Toast
          </Button>
          <Button onClick={() => {
            const promise = new Promise(resolve => globalThis.setTimeout(resolve, 2000));
            toast.promise(promise, {
              loading: "Loading data...",
              success: "Data loaded successfully!",
              error: "Failed to load data",
            });
          }}>
            Show Async Toast
          </Button>
        </div>
      </Card>
    </div>
  );
};

const About = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About Page</h1>
      <Card className="p-6">
        <p>This page demonstrates route change announcements.</p>
        <p>Navigate between pages to hear screen reader announcements.</p>
      </Card>
    </div>
  );
};

const Contact = () => {
  const {
    announceFieldError,
    announceFieldValid,
    announceFormSubmitting,
    announceFormSuccess,
    announceValidationSummary,
  } = useFormAnnouncements({ formName: "Contact form" });

  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateEmail = (value: string) => {
    if (!value) {
      const error = "Email is required";
      setErrors(prev => ({ ...prev, email: error }));
      announceFieldError("Email", error);
      return false;
    }
    if (!value.includes("@")) {
      const error = "Please enter a valid email";
      setErrors(prev => ({ ...prev, email: error }));
      announceFieldError("Email", error);
      return false;
    }
    setErrors(prev => ({ ...prev, email: "" }));
    announceFieldValid("Email");
    return true;
  };

  const validateMessage = (value: string) => {
    if (!value) {
      const error = "Message is required";
      setErrors(prev => ({ ...prev, message: error }));
      announceFieldError("Message", error);
      return false;
    }
    if (value.length < 10) {
      const error = "Message must be at least 10 characters";
      setErrors(prev => ({ ...prev, message: error }));
      announceFieldError("Message", error);
      return false;
    }
    setErrors(prev => ({ ...prev, message: "" }));
    announceFieldValid("Message");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailValid = validateEmail(email);
    const messageValid = validateMessage(message);
    
    const errorCount = Object.values(errors).filter(Boolean).length;
    announceValidationSummary(errorCount);
    
    if (emailValid && messageValid) {
      announceFormSubmitting();
      
      // Simulate API call
      await new Promise(resolve => globalThis.setTimeout(resolve, 2000));
      
      announceFormSuccess("Thank you for your message! We'll get back to you soon.");
      setEmail("");
      setMessage("");
      setErrors({});
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact Page</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Form with Announcements</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-600 mt-1">
                {errors.email}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => validateMessage(message)}
              className="w-full p-2 border rounded-md"
              rows={4}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-red-600 mt-1">
                {errors.message}
              </p>
            )}
          </div>
          
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </Card>
    </div>
  );
};

const meta: Meta = {
  title: "Accessibility/IntegratedAnnouncements",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Demonstrates the integration of screen reader announcements with various UI components:

- **Route announcements**: Announces page changes when navigating
- **Toast announcements**: Announces toast messages with appropriate priority
- **Form announcements**: Announces validation errors, field validity, and submission status

## Integration Examples

### With React Router
\`\`\`tsx
<ScreenReaderProvider>
  <BrowserRouter>
    <RouteAnnouncer />
    {/* Your app */}
  </BrowserRouter>
</ScreenReaderProvider>
\`\`\`

### With Toasts
\`\`\`tsx
const toast = useToastWithAnnouncements();
toast.success("Operation completed!");
\`\`\`

### With Forms
\`\`\`tsx
const formAnnounce = useFormAnnouncements();
formAnnounce.announceFieldError("Email", "Invalid email format");
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <IntegratedDemo />,
};

export const FormValidationFlow: Story = {
  render: () => {
    const FormDemo = () => {
      const {
        announceFieldError,
        announceFieldValid,
        announceFormSubmitting,
        announceFormSuccess,
        announceFormError,
      } = useFormAnnouncements({ formName: "Registration form" });

      const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        confirmPassword: "",
      });

      const [touched, setTouched] = React.useState({
        username: false,
        password: false,
        confirmPassword: false,
      });

      const handleFieldBlur = (field: keyof typeof formData) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        
        if (field === "username" && formData.username.length < 3) {
          announceFieldError("Username", "Must be at least 3 characters");
        } else if (field === "username" && formData.username.length >= 3) {
          announceFieldValid("Username");
        }
        
        if (field === "password" && formData.password.length < 8) {
          announceFieldError("Password", "Must be at least 8 characters");
        } else if (field === "password" && formData.password.length >= 8) {
          announceFieldValid("Password");
        }
        
        if (field === "confirmPassword" && formData.password !== formData.confirmPassword) {
          announceFieldError("Confirm password", "Passwords do not match");
        } else if (field === "confirmPassword" && formData.password === formData.confirmPassword) {
          announceFieldValid("Confirm password");
        }
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.username.length < 3 || formData.password.length < 8 || formData.password !== formData.confirmPassword) {
          announceFormError("Please fix all errors before submitting");
          return;
        }
        
        announceFormSubmitting();
        
        try {
          await new Promise(resolve => globalThis.setTimeout(resolve, 2000));
          announceFormSuccess("Registration completed successfully!");
          setFormData({ username: "", password: "", confirmPassword: "" });
          setTouched({ username: false, password: false, confirmPassword: false });
        } catch {
          announceFormError("Registration failed. Please try again.");
        }
      };

      return (
        <Card className="p-6 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Registration Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                onBlur={() => handleFieldBlur("username")}
                aria-invalid={touched.username && formData.username.length < 3}
              />
              {touched.username && formData.username.length < 3 && (
                <p className="text-sm text-red-600 mt-1">Must be at least 3 characters</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                onBlur={() => handleFieldBlur("password")}
                aria-invalid={touched.password && formData.password.length < 8}
              />
              {touched.password && formData.password.length < 8 && (
                <p className="text-sm text-red-600 mt-1">Must be at least 8 characters</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                onBlur={() => handleFieldBlur("confirmPassword")}
                aria-invalid={touched.confirmPassword && formData.password !== formData.confirmPassword}
              />
              {touched.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
              )}
            </div>
            
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Card>
      );
    };

    return (
      <ScreenReaderProvider>
        <div className="p-8">
          <FormDemo />
        </div>
      </ScreenReaderProvider>
    );
  },
};