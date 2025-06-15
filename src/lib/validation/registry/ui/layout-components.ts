import { SchemaRegistry, ComponentExamples, RegistryModule } from "../../types/registry.types";
import { boxSchema } from "../../../../components/ui/box/box.schema";
import { flexSchema } from "../../../../components/ui/flex/flex.schema";
import { containerSchema } from "../../../../components/ui/container/container.schema";

/**
 * Registry for layout-related UI components
 */
export const layoutComponentsRegistry: RegistryModule = {
  registerSchemas(registry: SchemaRegistry): void {
    // Box
    registry.set("Box", { schema: boxSchema });
    
    // Flex
    registry.set("flex", { schema: flexSchema });
    
    // Container
    registry.set("Container", { schema: containerSchema });
  },
  
  registerExamples(examples: ComponentExamples): void {
    // Box examples
    examples.set("Box", [
      {
        type: "Box",
        display: "flex",
        padding: "md",
        margin: "sm",
        backgroundColor: "card",
        rounded: "lg",
        shadow: "md",
        children: []
      }
    ]);
    
    // Flex examples
    examples.set("flex", [
      {
        type: "flex",
        direction: "row",
        justify: "space-between",
        align: "center",
        gap: "md",
        children: []
      }
    ]);
    
    // Container examples
    examples.set("Container", [
      {
        type: "Container",
        size: "default",
        padding: "default",
        children: "Content goes here"
      },
      {
        type: "Container",
        size: "lg",
        align: "center",
        as: "section",
        children: []
      }
    ]);
  }
};