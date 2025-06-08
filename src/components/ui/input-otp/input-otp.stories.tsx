import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./input-otp";
import { within, userEvent, waitFor, expect } from "storybook/test";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta: Meta<typeof InputOTP> = {
  title: "Form Components/InputOTP",
  component: InputOTP,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
An accessible one-time password (OTP) input component.
Built on the input-otp library, this component provides
a user-friendly way to enter verification codes, PINs, and other
numeric inputs that require digit-by-digit entry.

### Features
- Accessible keyboard navigation
- Automatic focus management
- Visual grouping and separators
- Support for different patterns (PIN, SMS code, 2FA)
- Customizable slot appearance
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    maxLength: {
      control: { type: "number", min: 1, max: 12 },
      description: "Maximum number of characters",
    },
    pattern: {
      control: "text",
      description: "Regex pattern to validate input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default OTP input with 6 digits
 */
export const Default = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      const input = canvas.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("maxlength", "6");

      await userEvent.type(input, "123456");
      expect(input).toHaveValue("123456");
    },
  },
  {
    renderSpec: {
      type: "InputOTP",
      maxLength: 6,
      render: {
        type: "grouped",
      },
    },
  }
);

/**
 * 4-digit PIN input
 */
export const FourDigitPIN = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <InputOTP maxLength={4} pattern="[0-9]*">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      const input = canvas.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("maxlength", "4");

      await userEvent.type(input, "1234");
      expect(input).toHaveValue("1234");
    },
  },
  {
    renderSpec: {
      type: "InputOTP",
      maxLength: 4,
      pattern: "[0-9]*",
      render: {
        type: "segmented",
      },
    },
  }
);

/**
 * SMS verification code with focus management
 */
export const SMSCode = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      const input = canvas.getByRole("textbox");
      expect(input).toBeInTheDocument();

      await userEvent.type(input, "987654");
      expect(input).toHaveValue("987654");
    },
  },
  {
    renderSpec: {
      type: "InputOTP",
      maxLength: 6,
      render: {
        type: "grouped",
      },
    },
  }
);

/**
 * Alphanumeric code (letters and numbers)
 */
export const AlphanumericCode = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <InputOTP maxLength={6} pattern="[A-Z0-9]*">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator>-</InputOTPSeparator>
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      const input = canvas.getByRole("textbox");
      expect(input).toBeInTheDocument();

      await userEvent.type(input, "ABC123");
      expect(input).toHaveValue("ABC123");
    },
  },
  {
    renderSpec: {
      type: "InputOTP",
      maxLength: 6,
      pattern: "[A-Z0-9]*",
      render: {
        type: "custom",
        pattern: "abc-def",
      },
    },
  }
);

/**
 * Custom separator style
 */
export const CustomSeparator = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <InputOTP maxLength={8}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator>•</InputOTPSeparator>
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator>•</InputOTPSeparator>
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
        <InputOTPSeparator>•</InputOTPSeparator>
        <InputOTPGroup>
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
        </InputOTPGroup>
      </InputOTP>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      const input = canvas.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("maxlength", "8");

      await userEvent.type(input, "12345678");
      expect(input).toHaveValue("12345678");
    },
  },
  {
    renderSpec: {
      type: "InputOTP",
      maxLength: 8,
      render: {
        type: "custom",
        pattern: "ab-cd-ef-gh",
      },
    },
  }
);

/**
 * With default value
 */
export const WithDefaultValue = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <InputOTP maxLength={6} value="123456">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      const input = canvas.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue("123456");
    },
  },
  {
    renderSpec: {
      type: "InputOTP",
      maxLength: 6,
      value: "123456",
      render: {
        type: "grouped",
      },
    },
  }
);

/**
 * Disabled state
 */
export const Disabled = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <InputOTP maxLength={6} disabled value="123456">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      const input = canvas.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toBeDisabled();
      expect(input).toHaveValue("123456");
    },
  },
  {
    renderSpec: {
      type: "InputOTP",
      maxLength: 6,
      disabled: true,
      value: "123456",
      render: {
        type: "grouped",
      },
    },
  }
);

/**
 * Controlled component with value and onChange
 */
export const Controlled = enhanceStoryForDualMode(
  {
    args: {},
    render: function ControlledRender() {
      const [value, setValue] = React.useState("");

      return (
        <div className="space-y-4">
          <InputOTP maxLength={6} value={value} onChange={setValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">Current value: {value || "(empty)"}</p>
        </div>
      );
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Wait for the OTP input to be rendered
      await waitFor(() => {
        expect(canvas.getByText("Current value: (empty)")).toBeInTheDocument();
      });

      // The OTP input might not have role="textbox", so look for the actual input element
      const otpContainer = canvasElement.querySelector('[data-slot="input-otp"]');
      expect(otpContainer).toBeInTheDocument();
      
      // Find the hidden input inside the OTP component
      const input = otpContainer?.querySelector('input') as HTMLInputElement;
      expect(input).toBeInTheDocument();

      // Focus and type into the input
      await userEvent.click(otpContainer!);
      await userEvent.type(input, "999");

      await waitFor(() => {
        expect(canvas.getByText("Current value: 999")).toBeInTheDocument();
      });
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "InputOTP",
          maxLength: 6,
          render: {
            type: "grouped",
          },
        },
        {
          type: "Text",
          size: "sm",
          variant: "muted",
          children: "Current value: (empty)",
        },
      ],
    },
  }
);

/**
 * With onChange handler for form integration
 */
export const WithOnComplete = enhanceStoryForDualMode(
  {
    args: {},
    render: function WithOnCompleteRender() {
      const [value, setValue] = React.useState("");
      const [isComplete, setIsComplete] = React.useState(false);

      return (
        <div className="space-y-4">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setIsComplete(newValue.length === 6);
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {isComplete && <p className="text-sm text-green-600">✓ Code complete! Value: {value}</p>}
        </div>
      );
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Wait for the OTP input to be rendered
      const otpContainer = await waitFor(() => {
        const container = canvasElement.querySelector('[data-slot="input-otp"]');
        expect(container).toBeInTheDocument();
        return container;
      });

      // Find the hidden input inside the OTP component
      const input = otpContainer?.querySelector('input') as HTMLInputElement;
      expect(input).toBeInTheDocument();

      // Focus and type the complete code
      await userEvent.click(otpContainer!);
      await userEvent.type(input, "111222");

      await waitFor(
        () => {
          expect(canvas.getByText("✓ Code complete! Value: 111222")).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "InputOTP",
      maxLength: 6,
      render: {
        type: "grouped",
      },
    },
  }
);

/**
 * Password input style with masked characters
 */
export const Password = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <InputOTP maxLength={4} pattern="[0-9]*" className="password">
        <InputOTPGroup>
          <InputOTPSlot index={0} className="password-char" />
          <InputOTPSlot index={1} className="password-char" />
          <InputOTPSlot index={2} className="password-char" />
          <InputOTPSlot index={3} className="password-char" />
        </InputOTPGroup>
      </InputOTP>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      const input = canvas.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("maxlength", "4");

      // Check that the OTP container has the password class
      const otpContainer = canvasElement.querySelector(".password");
      expect(otpContainer).toBeInTheDocument();

      await userEvent.type(input, "9876");
      expect(input).toHaveValue("9876");
    },
  },
  {
    renderSpec: {
      type: "InputOTP",
      maxLength: 4,
      pattern: "[0-9]*",
      className: "password",
      render: {
        type: "segmented",
      },
    },
  }
);
