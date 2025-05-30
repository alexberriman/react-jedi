import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./input-otp";
import { within, userEvent, waitFor, expect } from "@storybook/test";

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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("maxlength", "6");

    await userEvent.type(input, "123456");
    expect(input).toHaveValue("123456");
  },
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("maxlength", "4");

    await userEvent.type(input, "1234");
    expect(input).toHaveValue("1234");
  },
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "987654");
    expect(input).toHaveValue("987654");
  },
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "ABC123");
    expect(input).toHaveValue("ABC123");
  },
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("maxlength", "8");

    await userEvent.type(input, "12345678");
    expect(input).toHaveValue("12345678");
  },
};

/**
 * With default value
 */
export const WithDefaultValue: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("123456");
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {} as React.ComponentProps<typeof InputOTP>,
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(input).toHaveValue("123456");
  },
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    expect(input).toBeInTheDocument();
    
    await waitFor(() => {
      expect(canvas.getByText("Current value: (empty)")).toBeInTheDocument();
    });

    await userEvent.type(input, "999");
    
    await waitFor(() => {
      expect(canvas.getByText("Current value: 999")).toBeInTheDocument();
    });
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "111222");
    
    await waitFor(
      () => {
        expect(canvas.getByText("✓ Code complete! Value: 111222")).toBeInTheDocument();
      },
      { timeout: 10_000 }
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("maxlength", "4");
    
    // Check that the OTP container has the password class
    const otpContainer = canvasElement.querySelector('.password');
    expect(otpContainer).toBeInTheDocument();

    await userEvent.type(input, "9876");
    expect(input).toHaveValue("9876");
  },
};
