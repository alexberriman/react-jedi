import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ScreenReaderProvider, useScreenReaderAnnouncement } from "./screen-reader-announcements";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";

const AnnouncementDemo = () => {
  const { announcePolite, announceAssertive, announce, clear } = useScreenReaderAnnouncement();
  const [message, setMessage] = React.useState("");

  return (
    <div className="space-y-6 max-w-2xl">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Screen Reader Announcements</h2>
        <p className="mb-6 text-muted-foreground">
          This demo showcases screen reader announcements. While the announcements are not visible
          on screen, they are read by screen readers to provide important updates to users.
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a custom message"
              className="flex-1"
            />
            <Button onClick={() => message && announcePolite(message)} variant="secondary">
              Announce Polite
            </Button>
            <Button onClick={() => message && announceAssertive(message)} variant="secondary">
              Announce Assertive
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => announcePolite("Page loaded successfully")} variant="outline">
              Announce Page Load
            </Button>
            <Button
              onClick={() => announceAssertive("Error: Form submission failed")}
              variant="outline"
            >
              Announce Error
            </Button>
            <Button onClick={() => announcePolite("Form submitted successfully")} variant="outline">
              Announce Success
            </Button>
            <Button onClick={() => announcePolite("Loading data...")} variant="outline">
              Announce Loading
            </Button>
            <Button onClick={() => announcePolite("10 items loaded")} variant="outline">
              Announce Data Loaded
            </Button>
            <Button
              onClick={() => announce("This is a delayed message", { delay: 2000 })}
              variant="outline"
            >
              Delayed Announcement (2s)
            </Button>
          </div>

          <div className="pt-4">
            <Button onClick={clear} variant="destructive">
              Clear All Announcements
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Usage Instructions</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Enable a screen reader (NVDA, JAWS, VoiceOver) to hear announcements</li>
          <li>• Polite announcements wait for the screen reader to finish current content</li>
          <li>• Assertive announcements interrupt the screen reader immediately</li>
          <li>• Use assertive announcements sparingly for critical information only</li>
          <li>• Announcements are automatically cleared after 1 second to allow re-announcement</li>
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Live Regions (for Development)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          The following hidden regions contain the announcements (visible here for demonstration):
        </p>
        <div className="space-y-4">
          <div className="p-3 bg-muted rounded-md">
            <h4 className="font-medium text-sm mb-2">Polite Region (role=&quot;status&quot;)</h4>
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="text-sm text-muted-foreground"
            >
              {/* This would be populated by the actual component */}
            </div>
          </div>
          <div className="p-3 bg-muted rounded-md">
            <h4 className="font-medium text-sm mb-2">Assertive Region (role=&quot;alert&quot;)</h4>
            <div
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              className="text-sm text-muted-foreground"
            >
              {/* This would be populated by the actual component */}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const meta: Meta<typeof ScreenReaderProvider> = {
  title: "Accessibility/ScreenReaderAnnouncements",
  component: ScreenReaderProvider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Screen Reader Announcements system provides a way to programmatically announce
messages to screen reader users. It implements ARIA live regions with both polite
and assertive priorities.

## Usage

\`\`\`tsx
import { useScreenReaderAnnouncement } from "@/lib/a11y/screen-reader-announcements";

function MyComponent() {
  const { announcePolite, announceAssertive } = useScreenReaderAnnouncement();

  return (
    <button onClick={() => announcePolite("Button clicked")}>
      Click Me
    </button>
  );
}
\`\`\`

## Priorities

- **Polite**: Waits for the screen reader to finish current content
- **Assertive**: Interrupts the screen reader immediately (use sparingly)

## Common Use Cases

- Form submission feedback
- Route navigation announcements
- Loading and data fetch status
- Error and success messages
- Dynamic content updates
        `,
      },
    },
  },

  tags: ["autodocs", "accessibility-screen-reader-announcements"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenReaderProvider>
      <AnnouncementDemo />
    </ScreenReaderProvider>
  ),
};

export const WithSampleForm: Story = {
  render: () => {
    const FormDemo = () => {
      const { announcePolite, announceAssertive } = useScreenReaderAnnouncement();
      const [email, setEmail] = React.useState("");
      const [submitting, setSubmitting] = React.useState(false);

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.includes("@")) {
          announceAssertive("Error: Please enter a valid email address");
          return;
        }

        setSubmitting(true);
        announcePolite("Submitting form...");

        // Simulate API call
        globalThis.setTimeout(() => {
          setSubmitting(false);
          setEmail("");
          announcePolite("Form submitted successfully. Thank you!");
        }, 2000);
      };

      return (
        <Card className="p-6 max-w-md">
          <h2 className="text-xl font-bold mb-4">Newsletter Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={submitting}
              />
            </div>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting..." : "Subscribe"}
            </Button>
          </form>
        </Card>
      );
    };

    return (
      <ScreenReaderProvider>
        <FormDemo />
      </ScreenReaderProvider>
    );
  },
};
