import type { Meta, StoryObj } from "@storybook/react";
import { Combobox, type ComboboxOption } from "./combobox";
import { within, userEvent, expect, waitFor } from "@storybook/test";

const meta = {
  title: "Components/Form/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The controlled value of the combobox",
    },
    onValueChange: {
      action: "value changed",
      description: "Callback fired when the value changes",
    },
    options: {
      control: "object",
      description: "Array of options to display",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no value is selected",
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder text for the search input",
    },
    emptyText: {
      control: "text",
      description: "Text to display when no options match the search",
    },
    disabled: {
      control: "boolean",
      description: "Whether the combobox is disabled",
    },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const frameworks: ComboboxOption[] = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "gatsby", label: "Gatsby" },
  { value: "vite", label: "Vite" },
];

const fruits: ComboboxOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "strawberry", label: "Strawberry" },
  { value: "watermelon", label: "Watermelon" },
  { value: "mango", label: "Mango" },
  { value: "pineapple", label: "Pineapple" },
];

const countries: ComboboxOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "br", label: "Brazil" },
];

export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework...",
    emptyText: "No framework found.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find the combobox trigger button
    const trigger = canvas.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveTextContent("Select framework...");
    
    // Open the combobox
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
    
    // Wait a bit for the popover animation
    await new Promise(resolve => globalThis.setTimeout(resolve, 200));
    
    // Verify search input is visible (might be in a portal)
    const searchInput = await waitFor(() => {
      const input = document.querySelector('input[placeholder="Search framework..."]');
      expect(input).toBeInTheDocument();
      return input;
    });
    
    // The command items might not have role="option", so we'll look for them by their data attributes
    const commandItems = document.querySelectorAll('[data-slot="command-item"]');
    expect(commandItems.length).toBeGreaterThan(0);
    
    // Verify specific options are visible by text content
    const nextOption = [...commandItems].find(el => el.textContent?.includes("Next.js"));
    const viteOption = [...commandItems].find(el => el.textContent?.includes("Vite"));
    expect(nextOption).toBeInTheDocument();
    expect(viteOption).toBeInTheDocument();
    
    // Search for a framework
    if (searchInput) {
      await userEvent.type(searchInput, "next");
    }
    await waitFor(() => {
      const visibleItems = document.querySelectorAll('[data-slot="command-item"]:not([data-disabled="true"])');
      const visibleNext = [...visibleItems].find(el => el.textContent?.includes("Next.js"));
      const visibleVite = [...visibleItems].find(el => el.textContent?.includes("Vite"));
      expect(visibleNext).toBeInTheDocument();
      expect(visibleVite).toBeUndefined();
    });
    
    // Select an option
    const nextOptionFiltered = [...document.querySelectorAll('[data-slot="command-item"]')].find(el => el.textContent?.includes("Next.js"));
    if (nextOptionFiltered) {
      await userEvent.click(nextOptionFiltered);
    }
    await waitFor(() => {
      expect(trigger).toHaveTextContent("Next.js");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: "next",
  },
};

export const Fruits: Story = {
  args: {
    options: fruits,
    placeholder: "Select a fruit...",
    searchPlaceholder: "Search fruits...",
    emptyText: "No fruit found.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    
    // Open combobox
    await userEvent.click(trigger);
    
    // Wait for popover to open and search input to be available
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
    
    // Wait a bit for the popover animation
    await new Promise(resolve => globalThis.setTimeout(resolve, 200));
    
    // Find the search input inside the popover (might be in a portal)
    const searchInput = await waitFor(() => {
      const input = document.querySelector('input[placeholder="Search fruits..."]');
      expect(input).toBeInTheDocument();
      return input;
    });
    
    // Type to filter options
    if (searchInput) {
      await userEvent.type(searchInput, "orange");
    }
    await waitFor(() => {
      const commandItems = document.querySelectorAll('[data-slot="command-item"]:not([data-disabled="true"])');
      const orangeOption = [...commandItems].find(el => el.textContent?.includes("Orange"));
      expect(orangeOption).toBeInTheDocument();
      
      const appleOption = [...commandItems].find(el => el.textContent?.includes("Apple"));
      expect(appleOption).toBeUndefined();
    });
    
    // Select the filtered option
    const orangeOption = [...document.querySelectorAll('[data-slot="command-item"]')].find(el => el.textContent?.includes("Orange"));
    if (orangeOption) {
      await userEvent.click(orangeOption);
    }
    await waitFor(() => {
      expect(trigger).toHaveTextContent("Orange");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  },
};

export const Countries: Story = {
  args: {
    options: countries,
    placeholder: "Select a country...",
    searchPlaceholder: "Search countries...",
    emptyText: "No country found.",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    value: "vite",
    disabled: true,
  },
};

export const CustomWidth: Story = {
  render: (args) => (
    <div className="w-96">
      <Combobox {...args} />
    </div>
  ),
  args: {
    ...Default.args,
  },
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    placeholder: "No options available",
    searchPlaceholder: "Type to search...",
    emptyText: "No options to display.",
  },
};

export const LongLabels: Story = {
  args: {
    options: [
      { value: "long1", label: "This is a very long option label that might need truncation" },
      {
        value: "long2",
        label: "Another extremely long option label to test how the component handles overflow",
      },
      { value: "long3", label: "Yet another super duper long option label for testing purposes" },
      { value: "short", label: "Short" },
    ],
    placeholder: "Select an option with long labels...",
  },
};
