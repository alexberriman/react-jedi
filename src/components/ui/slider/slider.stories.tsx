import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import * as React from "react";
import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "Form Components/Slider",
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: `A customizable slider component for selecting values from a range. Built on top of Radix UI Slider.

## Usage

\`\`\`tsx
<Slider
  defaultValue={[50]}
  min={0}
  max={100}
  onValueChange={(value) => console.log(value)}
/>
\`\`\``,
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: "object",
      description: "The default value of the slider",
    },
    value: {
      control: "object",
      description: "The controlled value of the slider",
    },
    min: {
      control: "number",
      description: "The minimum value of the slider",
    },
    max: {
      control: "number",
      description: "The maximum value of the slider",
    },
    step: {
      control: "number",
      description: "The step size of the slider",
    },
    disabled: {
      control: "boolean",
      description: "Whether the slider is disabled",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "The orientation of the slider",
    },
    onValueChange: {
      action: "value changed",
      description: "Called when the value changes",
    },
  },

  tags: ['autodocs', 'ui-slider']};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  render: () => <Slider defaultValue={[50]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test slider renders
    const slider = canvas.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue(50);

    // Test slider interaction
    await user.click(slider);

    // Test keyboard navigation
    slider.focus();
    await user.keyboard("{ArrowRight}");
    expect(Number.parseInt(slider.getAttribute("aria-valuenow") || "0")).toBeGreaterThan(50);
  },
};

export const SingleValue: Story = {
  render: () => <Slider defaultValue={[33]} min={0} max={100} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const slider = canvas.getByRole("slider");
    expect(slider).toHaveValue(33);
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");

    // Test keyboard navigation
    slider.focus();
    await user.keyboard("{Home}");
    expect(slider).toHaveValue(0);

    await user.keyboard("{End}");
    expect(slider).toHaveValue(100);
  },
};

export const Range: Story = {
  render: () => <Slider defaultValue={[25, 75]} min={0} max={100} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test range slider has two thumbs
    const sliders = canvas.getAllByRole("slider");
    expect(sliders).toHaveLength(2);

    // Test first thumb
    expect(sliders[0]).toHaveValue(25);
    sliders[0].focus();
    await user.keyboard("{ArrowRight}");

    // Test second thumb
    expect(sliders[1]).toHaveValue(75);
    sliders[1].focus();
    await user.keyboard("{ArrowLeft}");
  },
};

export const SteppedSlider: Story = {
  render: () => (
    <div className="space-y-4">
      <Slider defaultValue={[50]} step={10} />
      <p className="text-sm text-muted-foreground">Step: 10</p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const slider = canvas.getByRole("slider");
    expect(slider).toHaveValue(50);
    
    // Test step behavior
    slider.focus();
    await user.keyboard("{ArrowRight}");
    expect(slider).toHaveValue(60); // Should increase by step size

    await user.keyboard("{ArrowLeft}");
    expect(slider).toHaveValue(50); // Should decrease by step size
  },
};

export const Disabled: Story = {
  render: () => <Slider defaultValue={[50]} disabled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const slider = canvas.getByRole("slider");
    expect(slider).toHaveAttribute("data-disabled");
    expect(slider).toHaveValue(50);

    // Test disabled state prevents interaction
    await user.click(slider);
    expect(slider).toHaveValue(50); // Value should not change
  },
};

const ControlledExample = () => {
  const [value, setValue] = React.useState([50]);

  return (
    <div className="space-y-4">
      <Slider value={value} onValueChange={setValue} />
      <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test controlled component displays value
    expect(canvas.getByText("Value: 50")).toBeInTheDocument();

    const slider = canvas.getByRole("slider");
    slider.focus();
    await user.keyboard("{ArrowRight}");

    // Value display should update
    expect(canvas.getByText(/Value: 5[1-9]/)).toBeInTheDocument();
  },
};

const RangeControlledExample = () => {
  const [value, setValue] = React.useState([25, 75]);

  return (
    <div className="space-y-4">
      <Slider value={value} onValueChange={setValue} min={0} max={100} />
      <p className="text-sm text-muted-foreground">
        Range: {value[0]} - {value[1]}
      </p>
    </div>
  );
};

export const ControlledRange: Story = {
  render: () => <RangeControlledExample />,
};

export const CustomRange: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Temperature (°C)</p>
        <Slider defaultValue={[22]} min={16} max={30} step={0.5} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Volume</p>
        <Slider defaultValue={[70]} min={0} max={100} step={5} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Year</p>
        <Slider defaultValue={[2020]} min={1990} max={2024} step={1} />
      </div>
    </div>
  ),
};

const PriceRangeExample = () => {
  const [priceRange, setPriceRange] = React.useState([100, 500]);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Price Range</p>
        <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={1000} step={10} />
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
  );
};

export const PriceRange: Story = {
  render: () => <PriceRangeExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test price display
    expect(canvas.getByText("$100")).toBeInTheDocument();
    expect(canvas.getByText("$500")).toBeInTheDocument();

    // Test range sliders
    const sliders = canvas.getAllByRole("slider");
    expect(sliders).toHaveLength(2);

    // Adjust first slider
    sliders[0].focus();
    await user.keyboard("{ArrowRight}");

    // Price should update
    expect(canvas.getByText(/\$11\d/)).toBeInTheDocument();
  },
};

const ColorPickerExample = () => {
  const [hue, setHue] = React.useState([180]);
  const [saturation, setSaturation] = React.useState([75]);
  const [lightness, setLightness] = React.useState([50]);

  const color = `hsl(${hue[0]}, ${saturation[0]}%, ${lightness[0]}%)`;

  return (
    <div className="space-y-6">
      <div className="w-full h-24 rounded-lg border" style={{ backgroundColor: color }} />
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Hue: {hue[0]}°</p>
          <Slider value={hue} onValueChange={setHue} min={0} max={360} step={1} />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Saturation: {saturation[0]}%</p>
          <Slider value={saturation} onValueChange={setSaturation} min={0} max={100} step={1} />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Lightness: {lightness[0]}%</p>
          <Slider value={lightness} onValueChange={setLightness} min={0} max={100} step={1} />
        </div>
      </div>
      <p className="text-sm text-muted-foreground font-mono">{color}</p>
    </div>
  );
};

export const ColorPicker: Story = {
  render: () => <ColorPickerExample />,
};

export const VariableSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium mb-2">Default size</p>
        <Slider defaultValue={[50]} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Larger (with custom styles)</p>
        <Slider
          defaultValue={[50]}
          className="[&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Smaller (with custom styles)</p>
        <Slider
          defaultValue={[50]}
          className="[&_[data-slot=slider-track]]:h-1 [&_[data-slot=slider-thumb]]:h-3 [&_[data-slot=slider-thumb]]:w-3"
        />
      </div>
    </div>
  ),
};

const FormExample = () => {
  const [brightness, setBrightness] = React.useState([75]);
  const [contrast, setContrast] = React.useState([100]);
  const [opacity, setOpacity] = React.useState([100]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Brightness: ${brightness[0]}%, Contrast: ${contrast[0]}%, Opacity: ${opacity[0]}%`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="brightness" className="text-sm font-medium mb-2 block">
          Brightness: {brightness[0]}%
        </label>
        <Slider
          id="brightness"
          value={brightness}
          onValueChange={setBrightness}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <div>
        <label htmlFor="contrast" className="text-sm font-medium mb-2 block">
          Contrast: {contrast[0]}%
        </label>
        <Slider
          id="contrast"
          value={contrast}
          onValueChange={setContrast}
          min={0}
          max={200}
          step={1}
        />
      </div>

      <div>
        <label htmlFor="opacity" className="text-sm font-medium mb-2 block">
          Opacity: {opacity[0]}%
        </label>
        <Slider
          id="opacity"
          value={opacity}
          onValueChange={setOpacity}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Apply Settings
      </button>
    </form>
  );
};

export const WithForm: Story = {
  render: () => <FormExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test form labels
    expect(canvas.getByText("Brightness: 75%")).toBeInTheDocument();
    expect(canvas.getByText("Contrast: 100%")).toBeInTheDocument();
    expect(canvas.getByText("Opacity: 100%")).toBeInTheDocument();

    // Test sliders in form context
    const sliders = canvas.getAllByRole("slider");
    expect(sliders).toHaveLength(3);

    // Test form submission
    const submitButton = canvas.getByText("Apply Settings");
    expect(submitButton).toBeInTheDocument();
  },
};
