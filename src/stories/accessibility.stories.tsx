import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Heading } from "@/components/ui/heading";
import { announceToScreenReader, handleArrowKeyNavigation } from "@/lib/accessibility";

const meta: Meta = {
  title: "Accessibility/ARIA Examples",
  parameters: {
    docs: {
      description: {
        story: "Examples demonstrating accessibility features with ARIA attributes",
      },
    },
  },
};

export default meta;

const ButtonWithARIAComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <div className="space-y-4">
      <Heading level="h2">Button Accessibility Examples</Heading>

      <div className="space-x-4">
        <Button pressed={pressed} onClick={() => setPressed(!pressed)} aria-label="Toggle favorite">
          {pressed ? "❤️ Favorited" : "🤍 Favorite"}
        </Button>

        <Button
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle details"
          aria-controls="details-panel"
        >
          {expanded ? "Hide Details" : "Show Details"}
        </Button>
      </div>

      {expanded && (
        <div id="details-panel" className="p-4 border rounded-md">
          <p>These are the expanded details that were previously hidden.</p>
        </div>
      )}
    </div>
  );
};

export const ButtonWithARIA: StoryObj = {
  render: ButtonWithARIAComponent,
};

const FormWithValidationComponent = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.includes("@")) {
      setError(null);
      announceToScreenReader("Form submitted successfully", "polite");
    } else {
      setError("Please enter a valid email address");
      announceToScreenReader("Error: Please enter a valid email address", "assertive");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <Heading level="h2">Form Accessibility Example</Heading>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required={true}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "email-error" : undefined}
        />
        {error && (
          <p id="email-error" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export const FormWithValidation: StoryObj = {
  render: FormWithValidationComponent,
};

const AlertExamplesComponent = () => {
  return (
    <div className="space-y-4">
      <Heading level="h2">Alert Accessibility Examples</Heading>

      <Alert role="alert" aria-live="polite">
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This is an informational alert that will be announced to screen readers.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive" role="alert" aria-live="assertive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          This is an error alert that will be announced immediately to screen readers.
        </AlertDescription>
      </Alert>

      <Alert role="status" aria-live="polite">
        <AlertTitle>Status Update</AlertTitle>
        <AlertDescription>
          This is a status update that will be announced when convenient.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export const AlertExamples: StoryObj = {
  render: AlertExamplesComponent,
};

const KeyboardNavigationComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const items = ["Home", "About", "Services", "Contact"];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    handleArrowKeyNavigation(e as unknown as KeyboardEvent, {
      orientation: "horizontal",
      currentIndex: selectedIndex,
      totalItems: items.length,
      onIndexChange: setSelectedIndex,
      loop: true,
    });
  };

  return (
    <div className="space-y-4">
      <Heading level="h2">Keyboard Navigation Example</Heading>
      <p className="text-sm text-muted-foreground">Use arrow keys to navigate between tabs</p>

      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex space-x-2 border-b"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {items.map((item, index) => (
          <button
            key={item}
            role="tab"
            aria-selected={selectedIndex === index}
            aria-controls={`panel-${index}`}
            tabIndex={selectedIndex === index ? 0 : -1}
            onClick={() => setSelectedIndex(index)}
            className={`px-4 py-2 border-b-2 transition-colors ${
              selectedIndex === index ? "border-primary text-primary" : "border-transparent"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${selectedIndex}`}
        aria-labelledby={`tab-${selectedIndex}`}
        className="p-4"
      >
        <p>Content for {items[selectedIndex]} tab</p>
      </div>
    </div>
  );
};

export const KeyboardNavigation: StoryObj = {
  render: KeyboardNavigationComponent,
};

const LiveRegionExampleComponent = () => {
  const [message, setMessage] = useState("");

  const handleAnnouncement = (text: string, priority: "polite" | "assertive") => {
    setMessage(text);
    announceToScreenReader(text, priority);
  };

  return (
    <div className="space-y-4">
      <Heading level="h2">Live Region Announcements</Heading>

      <div className="space-x-2">
        <Button onClick={() => handleAnnouncement("Changes saved successfully", "polite")}>
          Polite Announcement
        </Button>

        <Button
          variant="destructive"
          onClick={() => handleAnnouncement("Error: Unable to save changes", "assertive")}
        >
          Assertive Announcement
        </Button>
      </div>

      {message && <p className="p-4 border rounded-md">Last announcement: {message}</p>}
    </div>
  );
};

export const LiveRegionExample: StoryObj = {
  render: LiveRegionExampleComponent,
};
