import { SchemaRegistry, ComponentExamples, RegistryModule } from "../../types/registry.types";
import { boxSchema } from "../../../../components/ui/box/box.schema";
import { flexSchema } from "../../../../components/ui/flex/flex.schema";
import { containerSchema } from "../../../../components/ui/container/container.schema";
import { aspectRatioSchema } from "../../../../components/ui/aspect-ratio/aspect-ratio.schema";
import { spacerSchema } from "../../../../components/ui/spacer/spacer.schema";
import { centerSchema } from "../../../../components/ui/center/center.schema";

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
    
    // AspectRatio
    registry.set("AspectRatio", { schema: aspectRatioSchema });
    
    // Spacer
    registry.set("Spacer", { schema: spacerSchema });
    
    // Center
    registry.set("Center", { schema: centerSchema });
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
    
    // AspectRatio examples
    examples.set("AspectRatio", [
      {
        type: "AspectRatio",
        ratio: 16 / 9,
        children: {
          type: "Image",
          src: "https://example.com/image.jpg",
          alt: "Example image"
        }
      },
      {
        type: "AspectRatio",
        ratio: 1,
        children: []
      }
    ]);
    
    // Spacer examples
    examples.set("Spacer", [
      {
        type: "Spacer",
        size: "md"
      },
      {
        type: "Spacer",
        size: "lg",
        orientation: "horizontal"
      },
      {
        type: "Spacer",
        size: "xl",
        showGuide: true
      }
    ]);
    
    // Center examples
    examples.set("Center", [
      {
        type: "Center",
        children: "Centered content"
      },
      {
        type: "Center",
        fullHeight: true,
        centerDirection: "both",
        children: "Centered in viewport"
      },
      {
        type: "Center",
        as: "section",
        centerDirection: "horizontal",
        children: []
      }
    ]);
  }
};