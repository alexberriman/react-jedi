import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./input-otp";

const meta = {
  title: "Components/Form/InputOTP",
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
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default OTP input with 6 digits
 */
export const Default: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
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
};

/**
 * 4-digit PIN input
 */
export const FourDigitPIN: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
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
};

/**
 * SMS verification code with focus management
 */
export const SMSCode: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
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
};

/**
 * Alphanumeric code (letters and numbers)
 */
export const AlphanumericCode: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
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
};

/**
 * Custom separator style
 */
export const CustomSeparator: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
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
};

/**
 * With default value
 */
export const WithDefaultValue: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
  render: () => (
    <InputOTP maxLength={6} defaultValue="123456">
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
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
  render: () => (
    <InputOTP maxLength={6} disabled defaultValue="123456">
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
};

/**
 * Controlled component with value and onChange
 */
export const Controlled: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
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
};

/**
 * With onChange handler for form integration
 */
export const WithOnComplete: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
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
};

/**
 * Password input style with masked characters
 */
export const Password: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
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
};
