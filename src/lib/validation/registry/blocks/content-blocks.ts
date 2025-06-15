import { SchemaRegistry, ComponentExamples, RegistryModule } from "../../types/registry.types";
import { headerSchema } from "../../../../components/blocks/header/header.schema";

/**
 * Registry for content block components
 */
export const contentBlocksRegistry: RegistryModule = {
  registerSchemas(registry: SchemaRegistry): void {
    // Header
    registry.set("header", { schema: headerSchema });
  },
  
  registerExamples(examples: ComponentExamples): void {
    // Header examples
    examples.set("header", [
      {
        type: "header",
        logo: {
          type: "text",
          text: "My Company",
          href: "/"
        },
        navigation: [
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" }
        ],
        actions: [
          {
            text: "Sign In",
            href: "/signin",
            variant: "outline"
          }
        ],
        sticky: true,
        blur: true
      }
    ]);
  }
};