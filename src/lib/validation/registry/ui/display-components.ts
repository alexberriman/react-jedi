import { SchemaRegistry, ComponentExamples, RegistryModule } from "../../types/registry.types";
import { headingSchema } from "../../../../components/ui/heading/heading.schema";
import { textSchema } from "../../../../components/ui/text/text.schema";
import { imageSchema } from "../../../../components/ui/image/image.schema";
import { badgeSchema } from "../../../../components/ui/badge/badge.schema";
import { alertSchema, alertTitleSchema, alertDescriptionSchema } from "../../../../components/ui/alert/alert.schema";
import { cardSchema, cardHeaderSchema, cardTitleSchema, cardDescriptionSchema, cardActionSchema, cardContentSchema, cardFooterSchema, cardImageSchema } from "../../../../components/ui/card/card.schema";
import { avatarSchema, avatarImageSchema, avatarFallbackSchema } from "../../../../components/ui/avatar/avatar.schema";

/**
 * Registry for display-related UI components
 */
export const displayComponentsRegistry: RegistryModule = {
  registerSchemas(registry: SchemaRegistry): void {
    // Heading
    registry.set("heading", { schema: headingSchema });
    
    // Text
    registry.set("text", { schema: textSchema });
    
    // Image
    registry.set("Image", { schema: imageSchema });
    
    // Badge
    registry.set("Badge", { schema: badgeSchema });
    
    // Alert and sub-components
    registry.set("Alert", { schema: alertSchema });
    registry.set("AlertTitle", { schema: alertTitleSchema });
    registry.set("AlertDescription", { schema: alertDescriptionSchema });
    
    // Card and sub-components
    registry.set("Card", { schema: cardSchema });
    registry.set("CardHeader", { schema: cardHeaderSchema });
    registry.set("CardTitle", { schema: cardTitleSchema });
    registry.set("CardDescription", { schema: cardDescriptionSchema });
    registry.set("CardAction", { schema: cardActionSchema });
    registry.set("CardContent", { schema: cardContentSchema });
    registry.set("CardFooter", { schema: cardFooterSchema });
    registry.set("CardImage", { schema: cardImageSchema });
    
    // Avatar and sub-components
    registry.set("Avatar", { schema: avatarSchema });
    registry.set("AvatarImage", { schema: avatarImageSchema });
    registry.set("AvatarFallback", { schema: avatarFallbackSchema });
  },
  
  registerExamples(examples: ComponentExamples): void {
    // Heading examples
    examples.set("heading", [
      {
        type: "heading",
        level: "h1",
        content: "Welcome to Our Platform",
        align: "center",
        weight: "extrabold"
      },
      {
        type: "heading",
        level: "h2",
        content: "Featured Products",
        variant: "primary"
      }
    ]);
    
    // Text examples
    examples.set("text", [
      {
        type: "text",
        text: "This is a paragraph with custom styling.",
        size: "lg",
        weight: "medium"
      },
      {
        type: "text",
        text: "This is a styled span element.",
        element: "span",
        variant: "primary"
      }
    ]);
    
    // Image examples
    examples.set("Image", [
      {
        type: "Image",
        src: "https://example.com/image.jpg",
        alt: "Example image",
        rounded: "md"
      }
    ]);
    
    // Badge examples
    examples.set("Badge", [
      {
        type: "Badge",
        children: "New",
        variant: "default"
      },
      {
        type: "Badge",
        children: "Beta",
        variant: "secondary"
      }
    ]);
    
    // Alert examples
    examples.set("Alert", [
      {
        type: "Alert",
        variant: "default",
        children: [
          {
            type: "AlertTitle",
            children: "Heads up!"
          },
          {
            type: "AlertDescription",
            children: "You can add components to your app using the CLI."
          }
        ]
      },
      {
        type: "Alert",
        variant: "destructive",
        children: "Error: Something went wrong!"
      }
    ]);
    
    // Card examples
    examples.set("Card", [
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                children: "Card Title"
              },
              {
                type: "CardDescription",
                children: "Card description goes here"
              }
            ]
          },
          {
            type: "CardContent",
            children: "Card content goes here."
          }
        ]
      }
    ]);
    
    // Avatar examples
    examples.set("Avatar", [
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarImage",
            src: "https://example.com/avatar.jpg",
            alt: "User avatar"
          },
          {
            type: "AvatarFallback",
            children: "JD"
          }
        ]
      }
    ]);
  }
};