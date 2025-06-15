import { SchemaRegistry, ComponentExamples, RegistryModule } from "../../types/registry.types";
import { buttonSchema } from "../../../../components/ui/button/button.schema";
import { inputSchema } from "../../../../components/ui/input/input.schema";
import { labelSchema } from "../../../../components/ui/label/label.schema";
import { selectSchema, selectTriggerSchema, selectValueSchema, selectContentSchema, selectItemSchema, selectGroupSchema, selectLabelSchema, selectSeparatorSchema, selectScrollUpButtonSchema, selectScrollDownButtonSchema } from "../../../../components/ui/select/select.schema";
import { switchSchema } from "../../../../components/ui/switch/switch.schema";
import { calendarSchema } from "../../../../components/ui/calendar/calendar.schema";
import { checkboxSchema } from "../../../../components/ui/checkbox/checkbox.schema";
import { radioGroupSchema, radioGroupItemSchema } from "../../../../components/ui/radio-group/radio-group.schema";
import { textareaSchema } from "../../../../components/ui/textarea/textarea.schema";
import { comboboxSchema } from "../../../../components/ui/combobox/combobox.schema";

/**
 * Registry for form-related UI components
 */
export const formComponentsRegistry: RegistryModule = {
  registerSchemas(registry: SchemaRegistry): void {
    // Button
    registry.set("Button", { schema: buttonSchema });
    
    // Input
    registry.set("Input", { schema: inputSchema });
    
    // Label
    registry.set("Label", { schema: labelSchema });
    
    // Select and sub-components
    registry.set("Select", { schema: selectSchema });
    registry.set("SelectTrigger", { schema: selectTriggerSchema });
    registry.set("SelectValue", { schema: selectValueSchema });
    registry.set("SelectContent", { schema: selectContentSchema });
    registry.set("SelectItem", { schema: selectItemSchema });
    registry.set("SelectGroup", { schema: selectGroupSchema });
    registry.set("SelectLabel", { schema: selectLabelSchema });
    registry.set("SelectSeparator", { schema: selectSeparatorSchema });
    registry.set("SelectScrollUpButton", { schema: selectScrollUpButtonSchema });
    registry.set("SelectScrollDownButton", { schema: selectScrollDownButtonSchema });
    
    // Switch
    registry.set("Switch", { schema: switchSchema });
    
    // Calendar
    registry.set("Calendar", { schema: calendarSchema });
    
    // Checkbox
    registry.set("Checkbox", { schema: checkboxSchema });
    
    // RadioGroup and sub-components
    registry.set("RadioGroup", { schema: radioGroupSchema });
    registry.set("RadioGroupItem", { schema: radioGroupItemSchema });
    
    // Textarea
    registry.set("Textarea", { schema: textareaSchema });
    
    // Combobox
    registry.set("Combobox", { schema: comboboxSchema });
  },
  
  registerExamples(examples: ComponentExamples): void {
    // Button examples
    examples.set("Button", [
      {
        type: "Button",
        children: "Click me",
        variant: "primary",
        size: "default"
      },
      {
        type: "Button",
        children: "Submit",
        variant: "destructive",
        htmlType: "submit"
      }
    ]);
    
    // Input examples
    examples.set("Input", [
      {
        type: "Input",
        placeholder: "Enter your email",
        inputType: "email",
        name: "email"
      },
      {
        type: "Input",
        placeholder: "Password",
        inputType: "password",
        required: true
      }
    ]);
    
    // Label examples
    examples.set("Label", [
      {
        type: "Label",
        children: "Email",
        htmlFor: "email-input"
      },
      {
        type: "Label",
        children: "Required Field",
        required: true
      }
    ]);
    
    // Select examples
    examples.set("Select", [
      {
        type: "Select",
        children: [
          {
            type: "SelectTrigger",
            children: {
              type: "SelectValue",
              placeholder: "Select an option"
            }
          },
          {
            type: "SelectContent",
            children: [
              {
                type: "SelectItem",
                value: "option1",
                children: "Option 1"
              },
              {
                type: "SelectItem",
                value: "option2",
                children: "Option 2"
              }
            ]
          }
        ]
      }
    ]);
    
    // Switch examples
    examples.set("Switch", [
      {
        type: "Switch",
        defaultChecked: false,
        animated: true
      },
      {
        type: "Switch",
        checked: true,
        disabled: true
      }
    ]);
    
    // Calendar examples
    examples.set("Calendar", [
      {
        type: "Calendar",
        mode: "single",
        showOutsideDays: true
      },
      {
        type: "Calendar",
        mode: "range",
        numberOfMonths: 2,
        selected: {
          from: new Date().toISOString(),
          to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      }
    ]);
    
    // Checkbox examples
    examples.set("Checkbox", [
      {
        type: "Checkbox",
        defaultChecked: false
      },
      {
        type: "Checkbox",
        checked: true,
        disabled: true
      }
    ]);
    
    // RadioGroup examples
    examples.set("RadioGroup", [
      {
        type: "RadioGroup",
        defaultValue: "option1",
        children: [
          {
            type: "RadioGroupItem",
            value: "option1",
            id: "option1"
          },
          {
            type: "RadioGroupItem",
            value: "option2",
            id: "option2"
          },
          {
            type: "RadioGroupItem",
            value: "option3",
            id: "option3"
          }
        ]
      }
    ]);
    
    // Textarea examples
    examples.set("Textarea", [
      {
        type: "Textarea",
        placeholder: "Enter your message...",
        rows: 4
      },
      {
        type: "Textarea",
        defaultValue: "This is some example text.",
        rows: 5,
        maxLength: 500
      },
      {
        type: "Textarea",
        placeholder: "Required field",
        required: true,
        name: "message"
      }
    ]);
    
    // Combobox examples
    examples.set("Combobox", [
      {
        type: "Combobox",
        placeholder: "Select framework",
        searchPlaceholder: "Search frameworks...",
        emptyText: "No framework found.",
        options: [
          { value: "next.js", label: "Next.js" },
          { value: "sveltekit", label: "SvelteKit" },
          { value: "nuxt.js", label: "Nuxt.js" },
          { value: "remix", label: "Remix" },
          { value: "astro", label: "Astro" }
        ]
      },
      {
        type: "Combobox",
        value: "next.js",
        disabled: true,
        options: [
          { value: "next.js", label: "Next.js" }
        ]
      }
    ]);
  }
};