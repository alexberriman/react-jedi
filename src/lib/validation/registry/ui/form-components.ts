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
import { commandSchema, commandDialogSchema, commandInputSchema, commandListSchema, commandEmptySchema, commandGroupSchema, commandSeparatorSchema, commandItemSchema, commandShortcutSchema } from "../../../../components/ui/command/command.schema";
import { datePickerSchema } from "../../../../components/ui/date-picker/date-picker.schema";
import { dropdownMenuSchema, dropdownMenuTriggerSchema, dropdownMenuContentSchema, dropdownMenuGroupSchema, dropdownMenuItemSchema, dropdownMenuCheckboxItemSchema, dropdownMenuRadioGroupSchema, dropdownMenuRadioItemSchema, dropdownMenuLabelSchema, dropdownMenuSeparatorSchema, dropdownMenuShortcutSchema, dropdownMenuSubSchema, dropdownMenuSubTriggerSchema, dropdownMenuSubContentSchema, dropdownMenuPortalSchema } from "../../../../components/ui/dropdown-menu/dropdown-menu.schema";
import { inputOTPSchema, inputOTPGroupSchema, inputOTPSlotSchema, inputOTPSeparatorSchema } from "../../../../components/ui/input-otp/input-otp.schema";
import { sliderSchema } from "../../../../components/ui/slider/slider.schema";
import { toggleGroupSchema, toggleGroupItemSchema } from "../../../../components/ui/toggle-group/toggle-group.schema";
import { formSchema, formFieldSchema, formItemSchema, formLabelSchema, formControlSchema, formDescriptionSchema, formMessageSchema } from "../../../../components/ui/form/form.schema";

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
    
    // Command and sub-components
    registry.set("Command", { schema: commandSchema });
    registry.set("CommandDialog", { schema: commandDialogSchema });
    registry.set("CommandInput", { schema: commandInputSchema });
    registry.set("CommandList", { schema: commandListSchema });
    registry.set("CommandEmpty", { schema: commandEmptySchema });
    registry.set("CommandGroup", { schema: commandGroupSchema });
    registry.set("CommandSeparator", { schema: commandSeparatorSchema });
    registry.set("CommandItem", { schema: commandItemSchema });
    registry.set("CommandShortcut", { schema: commandShortcutSchema });
    
    // DatePicker
    registry.set("DatePicker", { schema: datePickerSchema });
    
    // DropdownMenu and sub-components
    registry.set("DropdownMenu", { schema: dropdownMenuSchema });
    registry.set("DropdownMenuPortal", { schema: dropdownMenuPortalSchema });
    registry.set("DropdownMenuTrigger", { schema: dropdownMenuTriggerSchema });
    registry.set("DropdownMenuContent", { schema: dropdownMenuContentSchema });
    registry.set("DropdownMenuGroup", { schema: dropdownMenuGroupSchema });
    registry.set("DropdownMenuItem", { schema: dropdownMenuItemSchema });
    registry.set("DropdownMenuCheckboxItem", { schema: dropdownMenuCheckboxItemSchema });
    registry.set("DropdownMenuRadioGroup", { schema: dropdownMenuRadioGroupSchema });
    registry.set("DropdownMenuRadioItem", { schema: dropdownMenuRadioItemSchema });
    registry.set("DropdownMenuLabel", { schema: dropdownMenuLabelSchema });
    registry.set("DropdownMenuSeparator", { schema: dropdownMenuSeparatorSchema });
    registry.set("DropdownMenuShortcut", { schema: dropdownMenuShortcutSchema });
    registry.set("DropdownMenuSub", { schema: dropdownMenuSubSchema });
    registry.set("DropdownMenuSubTrigger", { schema: dropdownMenuSubTriggerSchema });
    registry.set("DropdownMenuSubContent", { schema: dropdownMenuSubContentSchema });
    
    // InputOTP and sub-components
    registry.set("input-otp", { schema: inputOTPSchema });
    registry.set("input-otp-group", { schema: inputOTPGroupSchema });
    registry.set("input-otp-slot", { schema: inputOTPSlotSchema });
    registry.set("input-otp-separator", { schema: inputOTPSeparatorSchema });
    
    // Slider
    registry.set("Slider", { schema: sliderSchema });
    
    // ToggleGroup and sub-components
    registry.set("ToggleGroup", { schema: toggleGroupSchema });
    registry.set("ToggleGroupItem", { schema: toggleGroupItemSchema });
    
    // Form and sub-components
    registry.set("Form", { schema: formSchema });
    registry.set("FormField", { schema: formFieldSchema });
    registry.set("FormItem", { schema: formItemSchema });
    registry.set("FormLabel", { schema: formLabelSchema });
    registry.set("FormControl", { schema: formControlSchema });
    registry.set("FormDescription", { schema: formDescriptionSchema });
    registry.set("FormMessage", { schema: formMessageSchema });
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
    
    // Command examples
    examples.set("Command", [
      {
        type: "Command",
        children: [
          {
            type: "CommandInput",
            placeholder: "Type a command or search..."
          },
          {
            type: "CommandList",
            children: [
              {
                type: "CommandEmpty",
                children: "No results found."
              },
              {
                type: "CommandGroup",
                heading: "Suggestions",
                children: [
                  {
                    type: "CommandItem",
                    value: "calendar",
                    children: "Calendar"
                  },
                  {
                    type: "CommandItem",
                    value: "search-emoji",
                    children: "Search Emoji"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
    
    // DatePicker examples
    examples.set("DatePicker", [
      {
        type: "DatePicker",
        placeholder: "Pick a date"
      },
      {
        type: "DatePicker",
        date: new Date().toISOString(),
        disabled: true
      }
    ]);
    
    // DropdownMenu examples
    examples.set("DropdownMenu", [
      {
        type: "DropdownMenu",
        children: [
          {
            type: "DropdownMenuTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              children: "Open"
            }
          },
          {
            type: "DropdownMenuContent",
            children: [
              {
                type: "DropdownMenuLabel",
                children: "My Account"
              },
              {
                type: "DropdownMenuSeparator"
              },
              {
                type: "DropdownMenuItem",
                children: "Profile"
              },
              {
                type: "DropdownMenuItem",
                children: "Billing"
              },
              {
                type: "DropdownMenuItem",
                children: "Team"
              },
              {
                type: "DropdownMenuSeparator"
              },
              {
                type: "DropdownMenuItem",
                variant: "destructive",
                children: "Log out"
              }
            ]
          }
        ]
      }
    ]);
    
    // InputOTP examples
    examples.set("input-otp", [
      {
        type: "input-otp",
        maxLength: 6,
        pattern: "[0-9]*",
        children: [
          {
            type: "input-otp-group",
            children: [
              { type: "input-otp-slot", index: 0 },
              { type: "input-otp-slot", index: 1 },
              { type: "input-otp-slot", index: 2 }
            ]
          },
          {
            type: "input-otp-separator"
          },
          {
            type: "input-otp-group",
            children: [
              { type: "input-otp-slot", index: 3 },
              { type: "input-otp-slot", index: 4 },
              { type: "input-otp-slot", index: 5 }
            ]
          }
        ]
      },
      {
        type: "input-otp",
        maxLength: 4,
        pattern: "[A-Z]*",
        textAlign: "center",
        children: [
          {
            type: "input-otp-group",
            children: [
              { type: "input-otp-slot", index: 0 },
              { type: "input-otp-slot", index: 1 },
              { type: "input-otp-slot", index: 2 },
              { type: "input-otp-slot", index: 3 }
            ]
          }
        ]
      }
    ]);
    
    // Slider examples
    examples.set("Slider", [
      {
        type: "Slider",
        defaultValue: [50],
        min: 0,
        max: 100
      },
      {
        type: "Slider",
        defaultValue: [25, 75],
        min: 0,
        max: 100,
        step: 5
      },
      {
        type: "Slider",
        defaultValue: [50],
        disabled: true
      }
    ]);
    
    // ToggleGroup examples
    examples.set("ToggleGroup", [
      {
        type: "ToggleGroup",
        selectionType: "single",
        defaultValue: "center",
        children: [
          {
            type: "ToggleGroupItem",
            value: "left",
            "aria-label": "Left aligned",
            children: {
              type: "Icon",
              name: "align-left",
              size: 16
            }
          },
          {
            type: "ToggleGroupItem",
            value: "center",
            "aria-label": "Center aligned",
            children: {
              type: "Icon",
              name: "align-center",
              size: 16
            }
          },
          {
            type: "ToggleGroupItem",
            value: "right",
            "aria-label": "Right aligned",
            children: {
              type: "Icon",
              name: "align-right",
              size: 16
            }
          }
        ]
      },
      {
        type: "ToggleGroup",
        selectionType: "multiple",
        defaultValue: ["bold"],
        children: [
          {
            type: "ToggleGroupItem",
            value: "bold",
            "aria-label": "Toggle bold",
            children: {
              type: "Icon",
              name: "bold",
              size: 16
            }
          },
          {
            type: "ToggleGroupItem",
            value: "italic",
            "aria-label": "Toggle italic",
            children: {
              type: "Icon",
              name: "italic",
              size: 16
            }
          },
          {
            type: "ToggleGroupItem",
            value: "underline",
            "aria-label": "Toggle underline",
            children: {
              type: "Icon",
              name: "underline",
              size: 16
            }
          }
        ]
      }
    ]);
    
    // Form examples
    examples.set("Form", [
      {
        type: "Form",
        validation: {
          username: {
            required: "Username is required",
            minLength: { value: 3, message: "Username must be at least 3 characters" }
          },
          email: {
            required: "Email is required",
            email: true
          }
        },
        onSubmit: "handleFormSubmit",
        children: [
          {
            type: "FormField",
            name: "username",
            children: [
              {
                type: "FormItem",
                children: [
                  {
                    type: "FormLabel",
                    children: "Username"
                  },
                  {
                    type: "FormControl",
                    children: [{
                      type: "Input",
                      name: "username",
                      placeholder: "Enter username"
                    }]
                  },
                  {
                    type: "FormDescription",
                    children: "This is your public display name."
                  },
                  {
                    type: "FormMessage"
                  }
                ]
              }
            ]
          },
          {
            type: "FormField",
            name: "email",
            children: [
              {
                type: "FormItem",
                children: [
                  {
                    type: "FormLabel",
                    children: "Email"
                  },
                  {
                    type: "FormControl",
                    children: [{
                      type: "Input",
                      name: "email",
                      inputType: "email",
                      placeholder: "Enter email"
                    }]
                  },
                  {
                    type: "FormMessage"
                  }
                ]
              }
            ]
          },
          {
            type: "Button",
            htmlType: "submit",
            children: "Submit"
          }
        ]
      }
    ]);
  }
};