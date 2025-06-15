import { SchemaRegistry, ComponentExamples, RegistryModule } from "../../types/registry.types";
import { boxSchema } from "../../../../components/ui/box/box.schema";
import { flexSchema } from "../../../../components/ui/flex/flex.schema";
import { containerSchema } from "../../../../components/ui/container/container.schema";
import { aspectRatioSchema } from "../../../../components/ui/aspect-ratio/aspect-ratio.schema";
import { spacerSchema } from "../../../../components/ui/spacer/spacer.schema";
import { centerSchema } from "../../../../components/ui/center/center.schema";
import { gridSchema } from "../../../../components/ui/grid/grid.schema";
import { stackSchema } from "../../../../components/ui/stack/stack.schema";
import { groupSchema } from "../../../../components/ui/group/group.schema";
import { masonrySchema } from "../../../../components/ui/masonry/masonry.schema";
import { resizablePanelGroupSchema, resizablePanelSchema, resizableHandleSchema } from "../../../../components/ui/resizable/resizable.schema";

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
    
    // Grid
    registry.set("Grid", { schema: gridSchema });
    
    // Stack
    registry.set("Stack", { schema: stackSchema });
    
    // Group
    registry.set("group", { schema: groupSchema });
    
    // Masonry
    registry.set("Masonry", { schema: masonrySchema });
    
    // Resizable components
    registry.set("ResizablePanelGroup", { schema: resizablePanelGroupSchema });
    registry.set("ResizablePanel", { schema: resizablePanelSchema });
    registry.set("ResizableHandle", { schema: resizableHandleSchema });
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
    
    // Grid examples
    examples.set("Grid", [
      {
        type: "Grid",
        columns: 3,
        gap: 4,
        children: []
      },
      {
        type: "Grid",
        columns: { base: 1, sm: 2, md: 3, lg: 4 },
        gap: { base: 2, md: 4 },
        autoFit: false,
        children: []
      },
      {
        type: "Grid",
        autoFit: true,
        minColWidth: "300px",
        gap: 6,
        children: []
      }
    ]);
    
    // Stack examples
    examples.set("Stack", [
      {
        type: "Stack",
        orientation: "vertical",
        spacing: "md",
        children: []
      },
      {
        type: "Stack",
        orientation: "horizontal",
        spacing: "lg",
        align: "center",
        justify: "between",
        children: []
      },
      {
        type: "Stack",
        orientation: "vertical",
        spacing: "sm",
        divider: { type: "Separator" },
        children: []
      }
    ]);
    
    // Group examples
    examples.set("group", [
      {
        type: "group",
        spacing: "md",
        align: "center",
        children: []
      },
      {
        type: "group",
        spacing: "lg",
        justify: "between",
        wrap: "wrap",
        children: []
      },
      {
        type: "group",
        spacing: "sm",
        align: "start",
        fullWidth: true,
        children: []
      }
    ]);
    
    // Masonry examples
    examples.set("Masonry", [
      {
        type: "Masonry",
        columns: 3,
        gap: 4,
        children: []
      },
      {
        type: "Masonry",
        columns: { base: 1, sm: 2, md: 3, lg: 4 },
        gap: { base: 2, md: 4 },
        animation: { duration: 0.3, stagger: 0.05 },
        children: []
      },
      {
        type: "Masonry",
        autoFit: true,
        minColWidth: "250px",
        gap: 6,
        glassmorphic: true,
        children: []
      }
    ]);
    
    // ResizablePanelGroup examples
    examples.set("ResizablePanelGroup", [
      {
        type: "ResizablePanelGroup",
        direction: "horizontal",
        children: [
          {
            type: "ResizablePanel",
            defaultSize: 50,
            children: "Panel 1"
          },
          {
            type: "ResizableHandle",
            withHandle: true
          },
          {
            type: "ResizablePanel",
            defaultSize: 50,
            children: "Panel 2"
          }
        ]
      },
      {
        type: "ResizablePanelGroup",
        direction: "vertical",
        autoSaveId: "my-layout",
        children: []
      }
    ]);
    
    // ResizablePanel examples
    examples.set("ResizablePanel", [
      {
        type: "ResizablePanel",
        defaultSize: 30,
        minSize: 20,
        maxSize: 80,
        children: "Resizable content"
      },
      {
        type: "ResizablePanel",
        collapsible: true,
        collapsedSize: 5,
        children: []
      }
    ]);
    
    // ResizableHandle examples
    examples.set("ResizableHandle", [
      {
        type: "ResizableHandle",
        withHandle: true
      },
      {
        type: "ResizableHandle",
        withHandle: true,
        iconName: "grip-vertical"
      }
    ]);
  }
};