import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox, type ComboboxOption } from "./combobox";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Form Components/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "test"],
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

export const Default: Story = enhanceStoryForDualMode<typeof Combobox>({
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
    await new Promise((resolve) => globalThis.setTimeout(resolve, 200));

    // Verify search input is visible (might be in a portal)
    await waitFor(() => {
      const input = document.querySelector('input[placeholder="Search framework..."]');
      expect(input).toBeInTheDocument();
    });
    const searchInput = document.querySelector('input[placeholder="Search framework..."]');

    // The command items might not have role="option", so we'll look for them by their data attributes
    const commandItems = document.querySelectorAll('[data-slot="command-item"]');
    expect(commandItems.length).toBeGreaterThan(0);

    // Verify specific options are visible by text content
    const nextOption = [...commandItems].find((el) => el.textContent?.includes("Next.js"));
    const viteOption = [...commandItems].find((el) => el.textContent?.includes("Vite"));
    expect(nextOption).toBeInTheDocument();
    expect(viteOption).toBeInTheDocument();

    // Search for a framework
    if (searchInput) {
      await userEvent.type(searchInput, "next");
    }
    await waitFor(() => {
      const visibleItems = document.querySelectorAll(
        '[data-slot="command-item"]:not([data-disabled="true"])'
      );
      const visibleNext = [...visibleItems].find((el) => el.textContent?.includes("Next.js"));
      const visibleVite = [...visibleItems].find((el) => el.textContent?.includes("Vite"));
      expect(visibleNext).toBeInTheDocument();
      expect(visibleVite).toBeUndefined();
    });

    // Select an option
    const nextOptionFiltered = [...document.querySelectorAll('[data-slot="command-item"]')].find(
      (el) => el.textContent?.includes("Next.js")
    );
    if (nextOptionFiltered) {
      await userEvent.click(nextOptionFiltered);
    }
    await waitFor(() => {
      expect(trigger).toHaveTextContent("Next.js");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  },
});

export const WithValue: Story = enhanceStoryForDualMode<typeof Combobox>({
  args: {
    ...Default.args,
    value: "next",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify the combobox shows the selected value
    const trigger = canvas.getByRole("combobox");
    expect(trigger).toHaveTextContent("Next.js");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
});

export const Fruits: Story = enhanceStoryForDualMode<typeof Combobox>({
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

    // Wait for popover to open
    await waitFor(
      () => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
      },
      { timeout: 10_000 }
    );

    // Add a small delay for animations
    await new Promise((resolve) => globalThis.setTimeout(resolve, 300));

    // Wait for search input to be available
    await waitFor(
      () => {
        const input = document.querySelector('input[placeholder="Search fruits..."]');
        expect(input).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );

    const searchInput = document.querySelector(
      'input[placeholder="Search fruits..."]'
    ) as HTMLInputElement;

    // Type to filter options
    if (searchInput) {
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, "orange");

      // Wait for filtering to complete
      await waitFor(
        () => {
          const commandItems = document.querySelectorAll(
            '[data-slot="command-item"]:not([data-disabled="true"])'
          );
          const orangeOption = [...commandItems].find((el) => el.textContent?.includes("Orange"));
          expect(orangeOption).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Select the filtered option
      const orangeOption = [...document.querySelectorAll('[data-slot="command-item"]')].find((el) =>
        el.textContent?.includes("Orange")
      );
      if (orangeOption) {
        await userEvent.click(orangeOption);
      }

      // Verify selection
      await waitFor(
        () => {
          expect(trigger).toHaveTextContent("Orange");
          expect(trigger).toHaveAttribute("aria-expanded", "false");
        },
        { timeout: 5000 }
      );
    }
  },
});

export const Countries: Story = enhanceStoryForDualMode<typeof Combobox>({
  args: {
    options: countries,
    placeholder: "Select a country...",
    searchPlaceholder: "Search countries...",
    emptyText: "No country found.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify the combobox renders with country options
    const trigger = canvas.getByRole("combobox");
    expect(trigger).toHaveTextContent("Select a country...");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    
    // Verify it can be opened
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
  },
});

export const Disabled: Story = enhanceStoryForDualMode<typeof Combobox>({
  args: {
    ...Default.args,
    value: "vite",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify the combobox is disabled and shows selected value
    const trigger = canvas.getByRole("combobox");
    expect(trigger).toHaveTextContent("Vite");
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
});

export const CustomWidth: Story = enhanceStoryForDualMode<typeof Combobox>(
  {
    render: (args) => (
      <div className="w-96">
        <Combobox {...args} />
      </div>
    ),
    args: {
      ...Default.args,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify the combobox renders within a custom width container
      const trigger = canvas.getByRole("combobox");
      expect(trigger).toHaveTextContent("Select framework...");
      
      // Check that the container has the correct width class
      const container = trigger.closest('.w-96');
      expect(container).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-96",
      children: {
        type: "Combobox",
        options: frameworks,
        placeholder: "Select framework...",
        searchPlaceholder: "Search framework...",
        emptyText: "No framework found.",
      },
    },
  }
);

export const EmptyOptions: Story = enhanceStoryForDualMode<typeof Combobox>({
  args: {
    options: [],
    placeholder: "No options available",
    searchPlaceholder: "Type to search...",
    emptyText: "No options to display.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify the combobox renders with no options
    const trigger = canvas.getByRole("combobox");
    expect(trigger).toHaveTextContent("No options available");
    
    // Open and verify empty state
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
    
    // Wait for empty text to appear
    await waitFor(() => {
      const emptyText = document.querySelector('[data-slot="command-empty"]');
      expect(emptyText).toHaveTextContent("No options to display.");
    });
  },
});

export const LongLabels: Story = enhanceStoryForDualMode<typeof Combobox>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify the combobox renders with long label options
    const trigger = canvas.getByRole("combobox");
    expect(trigger).toHaveTextContent("Select an option with long labels...");
    
    // Open combobox to verify options render
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
    
    // Wait and verify long labels are visible
    await waitFor(() => {
      const commandItems = document.querySelectorAll('[data-slot="command-item"]');
      expect(commandItems.length).toBe(4);
      
      // Check that a long label is present
      const longLabelItem = [...commandItems].find(el => 
        el.textContent?.includes("This is a very long option label")
      );
      expect(longLabelItem).toBeInTheDocument();
    });
  },
});
