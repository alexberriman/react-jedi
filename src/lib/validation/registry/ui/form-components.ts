import { SchemaRegistry, ComponentExamples, RegistryModule } from "../../types/registry.types";
import { buttonSchema } from "../../../../components/ui/button/button.schema";
import { inputSchema } from "../../../../components/ui/input/input.schema";
import { labelSchema } from "../../../../components/ui/label/label.schema";
import { selectSchema, selectTriggerSchema, selectValueSchema, selectContentSchema, selectItemSchema, selectGroupSchema, selectLabelSchema, selectSeparatorSchema, selectScrollUpButtonSchema, selectScrollDownButtonSchema } from "../../../../components/ui/select/select.schema";
import { switchSchema } from "../../../../components/ui/switch/switch.schema";

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
  }
};