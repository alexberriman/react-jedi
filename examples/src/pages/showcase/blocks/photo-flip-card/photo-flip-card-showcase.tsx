import { Link } from "react-router-dom";
import { useState } from "react";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import { PageHeader } from "../../../../components/ui/page-header";
import { CodeBlock } from "../../../../components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

export function PhotoFlipCardShowcasePage() {
  usePageMetadata({
    title: "Photo Flip Card Block",
    description: "Interactive photo cards with elegant hover animations and multiple transition effects",
  });

  const [activeExample, setActiveExample] = useState("default");

  const examples: Record<string, { spec: ComponentSpec; title: string; description: string }> = {
    default: {
      title: "Default Flip Cards",
      description: "Beautiful photo flip cards with vertical flip animation",
      spec: {
        type: "PhotoFlipCardGrid",
        props: {
          columns: "3",
          gap: "md",
          cards: [
            {
              frontImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
              frontImageAlt: "Mountain landscape",
              title: "Mountain Vista",
              description: "Breathtaking mountain scenery",
              overlay: {
                title: "Explore Nature",
                description: "Discover the beauty of untouched wilderness and find your perfect adventure in the mountains.",
                badge: "Featured",
              },
              cta: {
                text: "Explore",
                variant: "secondary",
              },
              variant: "vertical-flip",
            },
            {
              frontImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop",
              frontImageAlt: "City skyline",
              title: "Urban Life",
              description: "Modern city living",
              overlay: {
                title: "City Experience",
                description: "Immerse yourself in the energy and culture of vibrant urban environments.",
              },
              cta: {
                text: "Discover",
                variant: "secondary",
              },
              variant: "horizontal-flip",
            },
            {
              frontImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
              frontImageAlt: "Technology",
              title: "Innovation",
              description: "Cutting-edge technology",
              overlay: {
                title: "Tech Innovation",
                description: "Experience the future with cutting-edge technology solutions and innovative designs.",
              },
              cta: {
                text: "Learn More",
                variant: "secondary",
              },
              variant: "fade",
            },
          ],
        },
      },
    },
    animationVariants: {
      title: "Animation Variants",
      description: "Different animation effects for unique interactions",
      spec: {
        type: "Stack",
        props: {
          gap: "lg",
          children: [
            {
              type: "Heading",
              props: {
                level: "h3",
                className: "mb-4",
                children: "Vertical Flip",
              },
            },
            {
              type: "PhotoFlipCard",
              props: {
                frontImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
                frontImageAlt: "Nature scene",
                title: "Vertical Flip",
                overlay: {
                  title: "Vertical Animation",
                  description: "Card flips along the horizontal axis with smooth vertical rotation.",
                },
                variant: "vertical-flip",
                size: "md",
              },
            },
            {
              type: "Heading",
              props: {
                level: "h3",
                className: "mb-4 mt-8",
                children: "Horizontal Flip",
              },
            },
            {
              type: "PhotoFlipCard",
              props: {
                frontImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop",
                frontImageAlt: "City view",
                title: "Horizontal Flip",
                overlay: {
                  title: "Horizontal Animation",
                  description: "Card flips along the vertical axis with smooth horizontal rotation.",
                },
                variant: "horizontal-flip",
                size: "md",
              },
            },
            {
              type: "Heading",
              props: {
                level: "h3",
                className: "mb-4 mt-8",
                children: "Fade Transition",
              },
            },
            {
              type: "PhotoFlipCard",
              props: {
                frontImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
                frontImageAlt: "Portrait",
                title: "Fade Effect",
                overlay: {
                  title: "Fade Animation",
                  description: "Smooth fade transition between front and back with scaling effect.",
                },
                variant: "fade",
                size: "md",
              },
            },
            {
              type: "Heading",
              props: {
                level: "h3",
                className: "mb-4 mt-8",
                children: "Slide Reveal",
              },
            },
            {
              type: "PhotoFlipCard",
              props: {
                frontImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
                frontImageAlt: "Technology",
                title: "Slide Animation",
                overlay: {
                  title: "Slide Effect",
                  description: "Content slides in from the side revealing the back content.",
                },
                variant: "slide-reveal",
                size: "md",
              },
            },
            {
              type: "Heading",
              props: {
                level: "h3",
                className: "mb-4 mt-8",
                children: "3D Rotation",
              },
            },
            {
              type: "PhotoFlipCard",
              props: {
                frontImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
                frontImageAlt: "Food",
                title: "3D Rotation",
                overlay: {
                  title: "3D Animation",
                  description: "Advanced 3D rotation with perspective transformation for a modern look.",
                },
                variant: "rotation-3d",
                size: "md",
              },
            },
          ],
        },
      },
    },
    sizes: {
      title: "Different Sizes",
      description: "Various card sizes for different use cases",
      spec: {
        type: "Stack",
        props: {
          gap: "lg",
          children: [
            {
              type: "Heading",
              props: {
                level: "h3",
                className: "mb-4",
                children: "Small Size",
              },
            },
            {
              type: "PhotoFlipCard",
              props: {
                frontImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
                frontImageAlt: "Small card",
                title: "Small Card",
                overlay: {
                  title: "Compact Design",
                  description: "Perfect for sidebars and smaller layouts.",
                },
                size: "sm",
                variant: "vertical-flip",
              },
            },
            {
              type: "Heading",
              props: {
                level: "h3",
                className: "mb-4 mt-8",
                children: "Large Size",
              },
            },
            {
              type: "PhotoFlipCard",
              props: {
                frontImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
                frontImageAlt: "Large card",
                title: "Large Card",
                description: "Perfect for hero sections",
                overlay: {
                  title: "Prominent Display",
                  description: "Large format cards are perfect for hero sections and featured content areas.",
                },
                size: "xl",
                aspectRatio: "video",
                variant: "horizontal-flip",
                cta: {
                  text: "Learn More",
                  variant: "secondary",
                },
              },
            },
          ],
        },
      },
    },
    customStyling: {
      title: "Custom Styling",
      description: "Cards with custom gradients, borders, and effects",
      spec: {
        type: "Stack",
        props: {
          gap: "lg",
          children: [
            {
              type: "PhotoFlipCard",
              props: {
                frontImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
                frontImageAlt: "Custom gradient",
                title: "Custom Gradient",
                gradientOverlay: {
                  from: "rgba(124, 58, 237, 0.1)",
                  to: "rgba(124, 58, 237, 0.8)",
                  direction: "to-br",
                  opacity: 0.9,
                },
                overlay: {
                  title: "Purple Theme",
                  description: "Beautiful custom gradient overlay with purple theme colors.",
                },
                borderRadius: "xl",
                shadow: "2xl",
                variant: "rotation-3d",
              },
            },
            {
              type: "PhotoFlipCard",
              props: {
                frontImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
                frontImageAlt: "Profile card",
                overlay: {
                  content: React.createElement("div", {
                    className: "space-y-4",
                    children: [
                      React.createElement("div", {
                        className: "w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto",
                        children: React.createElement("span", { className: "text-2xl" }, "👤"),
                      }),
                      React.createElement("h3", { className: "text-xl font-bold" }, "Sarah Johnson"),
                      React.createElement("p", { className: "text-white/90 text-sm" }, "Senior Designer"),
                      React.createElement("div", {
                        className: "flex gap-2 justify-center mt-4",
                        children: [
                          React.createElement("span", {
                            className: "w-8 h-8 bg-white/20 rounded-full flex items-center justify-center",
                            children: React.createElement("span", { className: "text-xs" }, "Li"),
                          }),
                          React.createElement("span", {
                            className: "w-8 h-8 bg-white/20 rounded-full flex items-center justify-center",
                            children: React.createElement("span", { className: "text-xs" }, "Tw"),
                          }),
                        ],
                      }),
                    ],
                  }),
                },
                variant: "fade",
                borderRadius: "full",
                shadow: "lg",
                trigger: "click",
              },
            },
          ],
        },
      },
    },
    interactive: {
      title: "Interactive Triggers",
      description: "Different interaction methods for various use cases",
      spec: {
        type: "Stack",
        props: {
          gap: "lg",
          children: [
            {
              type: "Heading",
              props: {
                level: "h3",
                className: "mb-4",
                children: "Hover Trigger (Default)",
              },
            },
            {
              type: "PhotoFlipCard",
              props: {
                frontImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
                frontImageAlt: "Hover trigger",
                title: "Hover to Flip",
                description: "Hover over the card to see the animation",
                overlay: {
                  title: "Hover Interaction",
                  description: "Perfect for desktop experiences with instant feedback.",
                },
                trigger: "hover",
                variant: "vertical-flip",
              },
            },
            {
              type: "Heading",
              props: {
                level: "h3",
                className: "mb-4 mt-8",
                children: "Click Trigger",
              },
            },
            {
              type: "PhotoFlipCard",
              props: {
                frontImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop",
                frontImageAlt: "Click trigger",
                title: "Click to Flip",
                description: "Click the card to toggle the animation",
                overlay: {
                  title: "Click Interaction",
                  description: "Better for mobile devices and intentional interactions.",
                },
                trigger: "click",
                variant: "horizontal-flip",
              },
            },
          ],
        },
      },
    },
  };

  const codeExamples: Record<string, string> = {
    default: `{
  "type": "PhotoFlipCardGrid",
  "props": {
    "columns": "3",
    "gap": "md",
    "cards": [
      {
        "frontImage": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        "frontImageAlt": "Mountain landscape",
        "title": "Mountain Vista",
        "description": "Breathtaking mountain scenery",
        "overlay": {
          "title": "Explore Nature",
          "description": "Discover the beauty of untouched wilderness.",
          "badge": "Featured"
        },
        "cta": {
          "text": "Explore",
          "variant": "secondary"
        },
        "variant": "vertical-flip"
      }
    ]
  }
}`,
    animationVariants: `{
  "type": "PhotoFlipCard",
  "props": {
    "frontImage": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    "frontImageAlt": "Nature scene",
    "title": "Vertical Flip",
    "overlay": {
      "title": "Vertical Animation",
      "description": "Card flips along the horizontal axis."
    },
    "variant": "vertical-flip",
    "size": "md"
  }
}`,
    sizes: `{
  "type": "PhotoFlipCard",
  "props": {
    "frontImage": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    "frontImageAlt": "Large card",
    "title": "Large Card",
    "overlay": {
      "title": "Prominent Display",
      "description": "Large format cards are perfect for hero sections."
    },
    "size": "xl",
    "aspectRatio": "video",
    "variant": "horizontal-flip"
  }
}`,
    customStyling: `{
  "type": "PhotoFlipCard",
  "props": {
    "frontImage": "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "gradientOverlay": {
      "from": "rgba(124, 58, 237, 0.1)",
      "to": "rgba(124, 58, 237, 0.8)",
      "direction": "to-br",
      "opacity": 0.9
    },
    "overlay": {
      "title": "Purple Theme",
      "description": "Beautiful custom gradient overlay."
    },
    "borderRadius": "xl",
    "shadow": "2xl",
    "variant": "rotation-3d"
  }
}`,
    interactive: `{
  "type": "PhotoFlipCard",
  "props": {
    "frontImage": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    "title": "Click to Flip",
    "overlay": {
      "title": "Click Interaction",
      "description": "Better for mobile devices."
    },
    "trigger": "click",
    "variant": "horizontal-flip"
  }
}`,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Photo Flip Card Block"
        description="Interactive photo cards with elegant hover animations and multiple transition effects"
      />

      <div className="space-y-6">
        <Link
          to="/showcase/blocks"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Blocks
        </Link>

        <Tabs value={activeExample} onValueChange={setActiveExample}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="animationVariants">Animations</TabsTrigger>
            <TabsTrigger value="sizes">Sizes</TabsTrigger>
            <TabsTrigger value="customStyling">Styling</TabsTrigger>
            <TabsTrigger value="interactive">Interactive</TabsTrigger>
          </TabsList>

          {Object.entries(examples).map(([key, example]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                <p className="text-muted-foreground mb-4">{example.description}</p>
              </div>

              <ShowcaseWrapper>
                {render(example.spec)}
              </ShowcaseWrapper>

              <div className="space-y-4">
                <h4 className="text-md font-medium">JSON Specification</h4>
                <CodeBlock code={codeExamples[key]} language="json" />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default PhotoFlipCardShowcasePage;