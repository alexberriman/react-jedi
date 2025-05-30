import React from 'react';
import { UISpecification } from '../../../../../src/types';
import { render } from '../../../../../src/lib/render';
import { usePageMetadata } from '../../../lib/meta';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'levels', label: 'Heading Levels' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'variants', label: 'Color Variants' },
  { id: 'weights', label: 'Font Weights' },
  { id: 'alignment', label: 'Text Alignment' },
  { id: 'transforms', label: 'Text Transform' },
  { id: 'decorations', label: 'Text Decorations' },
  { id: 'gradients', label: 'Gradient Effects' },
  { id: 'shadows', label: 'Text Shadows' },
  { id: 'animations', label: 'Animations' },
  { id: 'spacing', label: 'Spacing Options' },
  { id: 'complex', label: 'Complex Examples' },
  { id: 'props', label: 'Props Reference' },
];

export function HeadingShowcase() {
  usePageMetadata({
    title: 'Heading Component | React Jedi Showcase',
    description: 'Explore the Heading component with various levels, sizes, colors, and effects.'
  });

  const [activeSection, setActiveSection] = React.useState('overview');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex gap-8">
      {/* Table of Contents */}
      <nav className="w-64 flex-shrink-0">
        <div className="sticky top-8 space-y-1">
          <h3 className="font-semibold text-lg mb-4">Table of Contents</h3>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`
                w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                ${activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
                }
              `}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 space-y-12 max-w-4xl">
        {/* Overview Section */}
        <section id="overview">
          <h1 className="text-4xl font-bold mb-4">Heading Component</h1>
          <p className="text-lg text-muted-foreground mb-6">
            The Heading component provides semantic HTML headings with extensive styling options.
            Use it to create visually appealing and accessible headings throughout your application.
          </p>
          
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>All semantic heading levels (h1-h6)</li>
              <li>Independent size control from heading level</li>
              <li>Multiple color variants and gradient effects</li>
              <li>Font weight customization</li>
              <li>Text alignment and transform options</li>
              <li>Animation effects</li>
              <li>Customizable spacing</li>
              <li>Full TypeScript support</li>
            </ul>
          </div>

          <DemoSection
            title="Basic Usage"
            specs={[
              { type: "Heading", content: "Hello World", level: "h1" },
              { type: "Heading", content: "Subheading Example", level: "h2", variant: "muted" },
              { type: "Heading", content: "Section Title", level: "h3", variant: "primary" }
            ]}
          />
        </section>

        {/* Heading Levels */}
        <section id="levels">
          <h2 className="text-3xl font-bold mb-4">Heading Levels</h2>
          <p className="text-muted-foreground mb-6">
            Choose from six semantic heading levels (h1-h6) for proper document structure.
          </p>
          
          <DemoSection
            title="All Heading Levels"
            specs={[
              { type: "Heading", content: "Heading Level 1", level: "h1" },
              { type: "Heading", content: "Heading Level 2", level: "h2" },
              { type: "Heading", content: "Heading Level 3", level: "h3" },
              { type: "Heading", content: "Heading Level 4", level: "h4" },
              { type: "Heading", content: "Heading Level 5", level: "h5" },
              { type: "Heading", content: "Heading Level 6", level: "h6" }
            ]}
          />
        </section>

        {/* Sizes */}
        <section id="sizes">
          <h2 className="text-3xl font-bold mb-4">Sizes</h2>
          <p className="text-muted-foreground mb-6">
            Control the visual size independently from the semantic level with size options from xs to 6xl.
          </p>
          
          <DemoSection
            title="Size Variations"
            specs={[
              { type: "Heading", content: "Extra Small (xs)", level: "h3", size: "xs" },
              { type: "Heading", content: "Small (sm)", level: "h3", size: "sm" },
              { type: "Heading", content: "Medium (md)", level: "h3", size: "md" },
              { type: "Heading", content: "Large (lg)", level: "h3", size: "lg" },
              { type: "Heading", content: "Extra Large (xl)", level: "h3", size: "xl" },
              { type: "Heading", content: "2XL Size", level: "h3", size: "2xl" },
              { type: "Heading", content: "3XL Size", level: "h3", size: "3xl" },
              { type: "Heading", content: "4XL Size", level: "h3", size: "4xl" },
              { type: "Heading", content: "5XL Size", level: "h3", size: "5xl" },
              { type: "Heading", content: "6XL Size", level: "h3", size: "6xl" }
            ]}
          />
        </section>

        {/* Color Variants */}
        <section id="variants">
          <h2 className="text-3xl font-bold mb-4">Color Variants</h2>
          <p className="text-muted-foreground mb-6">
            Apply different color schemes to match your design system.
          </p>
          
          <DemoSection
            title="Available Variants"
            specs={[
              { type: "Heading", content: "Default Variant", level: "h3", variant: "default" },
              { type: "Heading", content: "Primary Variant", level: "h3", variant: "primary" },
              { type: "Heading", content: "Secondary Variant", level: "h3", variant: "secondary" },
              { type: "Heading", content: "Accent Variant", level: "h3", variant: "accent" },
              { type: "Heading", content: "Muted Variant", level: "h3", variant: "muted" },
              { type: "Heading", content: "Destructive Variant", level: "h3", variant: "destructive" }
            ]}
          />
        </section>

        {/* Font Weights */}
        <section id="weights">
          <h2 className="text-3xl font-bold mb-4">Font Weights</h2>
          <p className="text-muted-foreground mb-6">
            Adjust font weight from thin to black for emphasis and hierarchy.
          </p>
          
          <DemoSection
            title="Weight Options"
            specs={[
              { type: "Heading", content: "Thin Weight", level: "h3", weight: "thin" },
              { type: "Heading", content: "Light Weight", level: "h3", weight: "light" },
              { type: "Heading", content: "Normal Weight", level: "h3", weight: "normal" },
              { type: "Heading", content: "Medium Weight", level: "h3", weight: "medium" },
              { type: "Heading", content: "Semibold Weight", level: "h3", weight: "semibold" },
              { type: "Heading", content: "Bold Weight", level: "h3", weight: "bold" },
              { type: "Heading", content: "Extrabold Weight", level: "h3", weight: "extrabold" },
              { type: "Heading", content: "Black Weight", level: "h3", weight: "black" }
            ]}
          />
        </section>

        {/* Text Alignment */}
        <section id="alignment">
          <h2 className="text-3xl font-bold mb-4">Text Alignment</h2>
          <p className="text-muted-foreground mb-6">
            Control text alignment within the heading component.
          </p>
          
          <DemoSection
            title="Alignment Options"
            specs={[
              { type: "Heading", content: "Left Aligned Text", level: "h3", align: "left" },
              { type: "Heading", content: "Center Aligned Text", level: "h3", align: "center" },
              { type: "Heading", content: "Right Aligned Text", level: "h3", align: "right" }
            ]}
          />
        </section>

        {/* Text Transform */}
        <section id="transforms">
          <h2 className="text-3xl font-bold mb-4">Text Transform</h2>
          <p className="text-muted-foreground mb-6">
            Apply text transformations for stylistic effects.
          </p>
          
          <DemoSection
            title="Transform Options"
            specs={[
              { type: "Heading", content: "Uppercase Transform", level: "h3", transform: "uppercase" },
              { type: "Heading", content: "Lowercase Transform", level: "h3", transform: "lowercase" },
              { type: "Heading", content: "Capitalize Each Word", level: "h3", transform: "capitalize" },
              { type: "Heading", content: "Normal Text (No Transform)", level: "h3", transform: "normal" }
            ]}
          />
        </section>

        {/* Text Decorations */}
        <section id="decorations">
          <h2 className="text-3xl font-bold mb-4">Text Decorations</h2>
          <p className="text-muted-foreground mb-6">
            Add underline or line-through decorations to your headings.
          </p>
          
          <DemoSection
            title="Decoration Options"
            specs={[
              { type: "Heading", content: "No Decoration", level: "h3", decoration: "none" },
              { type: "Heading", content: "Underlined Text", level: "h3", decoration: "underline" },
              { type: "Heading", content: "Line Through Text", level: "h3", decoration: "line-through" }
            ]}
          />
        </section>

        {/* Gradient Effects */}
        <section id="gradients">
          <h2 className="text-3xl font-bold mb-4">Gradient Effects</h2>
          <p className="text-muted-foreground mb-6">
            Apply stunning gradient effects to make your headings stand out.
          </p>
          
          <DemoSection
            title="Gradient Options"
            specs={[
              { type: "Heading", content: "Primary Gradient", level: "h2", gradient: "primary", size: "3xl" },
              { type: "Heading", content: "Rainbow Gradient", level: "h2", gradient: "rainbow", size: "3xl" },
              { type: "Heading", content: "Sunset Gradient", level: "h2", gradient: "sunset", size: "3xl" },
              { type: "Heading", content: "Ocean Gradient", level: "h2", gradient: "ocean", size: "3xl" },
              { type: "Heading", content: "Neon Gradient", level: "h2", gradient: "neon", size: "3xl" },
              { type: "Heading", content: "Golden Gradient", level: "h2", gradient: "golden", size: "3xl" }
            ]}
          />
        </section>

        {/* Text Shadows */}
        <section id="shadows">
          <h2 className="text-3xl font-bold mb-4">Text Shadows</h2>
          <p className="text-muted-foreground mb-6">
            Add subtle or dramatic shadow effects to your headings.
          </p>
          
          <DemoSection
            title="Shadow Options"
            specs={[
              { type: "Heading", content: "Small Shadow", level: "h3", shadow: "sm", size: "2xl" },
              { type: "Heading", content: "Medium Shadow", level: "h3", shadow: "md", size: "2xl" },
              { type: "Heading", content: "Large Shadow", level: "h3", shadow: "lg", size: "2xl" },
              { type: "Heading", content: "Extra Large Shadow", level: "h3", shadow: "xl", size: "2xl" },
              { type: "Heading", content: "2XL Shadow", level: "h3", shadow: "2xl", size: "2xl" }
            ]}
          />
        </section>

        {/* Animations */}
        <section id="animations">
          <h2 className="text-3xl font-bold mb-4">Animations</h2>
          <p className="text-muted-foreground mb-6">
            Add eye-catching animations to draw attention to important headings.
          </p>
          
          <DemoSection
            title="Animation Effects"
            specs={[
              { type: "Heading", content: "Glow Animation", level: "h3", animation: "glow", size: "2xl" },
              { type: "Heading", content: "Pulse Animation", level: "h3", animation: "pulse", size: "2xl" },
              { type: "Heading", content: "Bounce Animation", level: "h3", animation: "bounce", size: "2xl" },
              { type: "Heading", content: "Shimmer Animation", level: "h3", animation: "shimmer", size: "2xl" }
            ]}
          />
        </section>

        {/* Spacing */}
        <section id="spacing">
          <h2 className="text-3xl font-bold mb-4">Spacing Options</h2>
          <p className="text-muted-foreground mb-6">
            Control the bottom margin of headings for consistent vertical rhythm.
          </p>
          
          <DemoSection
            title="Spacing Examples"
            specs={[
              { type: "Box", className: "space-y-0", children: [
                { type: "Heading", content: "No Spacing", level: "h4", spacing: "none" },
                { type: "Text", content: "This text follows immediately after." }
              ]},
              { type: "Box", className: "space-y-0", children: [
                { type: "Heading", content: "Tight Spacing", level: "h4", spacing: "tight" },
                { type: "Text", content: "This text has minimal space above." }
              ]},
              { type: "Box", className: "space-y-0", children: [
                { type: "Heading", content: "Normal Spacing", level: "h4", spacing: "normal" },
                { type: "Text", content: "This text has standard space above." }
              ]},
              { type: "Box", className: "space-y-0", children: [
                { type: "Heading", content: "Relaxed Spacing", level: "h4", spacing: "relaxed" },
                { type: "Text", content: "This text has comfortable space above." }
              ]},
              { type: "Box", className: "space-y-0", children: [
                { type: "Heading", content: "Loose Spacing", level: "h4", spacing: "loose" },
                { type: "Text", content: "This text has generous space above." }
              ]}
            ]}
          />
        </section>

        {/* Complex Examples */}
        <section id="complex">
          <h2 className="text-3xl font-bold mb-4">Complex Examples</h2>
          <p className="text-muted-foreground mb-6">
            Combine multiple properties to create unique heading styles.
          </p>
          
          <DemoSection
            title="Hero Heading"
            specs={[
              { 
                type: "Heading", 
                content: "Welcome to the Future", 
                level: "h1",
                size: "6xl",
                gradient: "rainbow",
                weight: "bold",
                align: "center",
                animation: "shimmer"
              }
            ]}
          />

          <DemoSection
            title="Subtle Section Header"
            specs={[
              { 
                type: "Heading", 
                content: "Featured Products", 
                level: "h2",
                size: "2xl",
                variant: "muted",
                weight: "light",
                transform: "uppercase",
                decoration: "underline",
                spacing: "relaxed"
              }
            ]}
          />

          <DemoSection
            title="Alert Heading"
            specs={[
              { 
                type: "Heading", 
                content: "Limited Time Offer!", 
                level: "h3",
                size: "3xl",
                variant: "destructive",
                weight: "bold",
                align: "center",
                animation: "pulse",
                shadow: "lg"
              }
            ]}
          />
        </section>

        {/* Props Reference */}
        <section id="props">
          <h2 className="text-3xl font-bold mb-4">Props Reference</h2>
          <p className="text-muted-foreground mb-6">
            Complete reference of all available properties for the Heading component.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-background">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Prop</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Default</th>
                  <th className="text-left p-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">level</td>
                  <td className="p-4 font-mono text-sm">&quot;h1&quot; | &quot;h2&quot; | &quot;h3&quot; | &quot;h4&quot; | &quot;h5&quot; | &quot;h6&quot;</td>
                  <td className="p-4 font-mono text-sm">&quot;h2&quot;</td>
                  <td className="p-4">Semantic heading level</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">size</td>
                  <td className="p-4 font-mono text-sm">&quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot; | &quot;3xl&quot; | &quot;4xl&quot; | &quot;5xl&quot; | &quot;6xl&quot;</td>
                  <td className="p-4 font-mono text-sm">varies by level</td>
                  <td className="p-4">Visual size of the heading</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">variant</td>
                  <td className="p-4 font-mono text-sm">&quot;default&quot; | &quot;primary&quot; | &quot;secondary&quot; | &quot;accent&quot; | &quot;muted&quot; | &quot;destructive&quot;</td>
                  <td className="p-4 font-mono text-sm">&quot;default&quot;</td>
                  <td className="p-4">Color variant</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">weight</td>
                  <td className="p-4 font-mono text-sm">&quot;thin&quot; | &quot;light&quot; | &quot;normal&quot; | &quot;medium&quot; | &quot;semibold&quot; | &quot;bold&quot; | &quot;extrabold&quot; | &quot;black&quot;</td>
                  <td className="p-4 font-mono text-sm">&quot;bold&quot;</td>
                  <td className="p-4">Font weight</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">align</td>
                  <td className="p-4 font-mono text-sm">&quot;left&quot; | &quot;center&quot; | &quot;right&quot;</td>
                  <td className="p-4 font-mono text-sm">&quot;left&quot;</td>
                  <td className="p-4">Text alignment</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">transform</td>
                  <td className="p-4 font-mono text-sm">&quot;uppercase&quot; | &quot;lowercase&quot; | &quot;capitalize&quot; | &quot;normal&quot;</td>
                  <td className="p-4 font-mono text-sm">&quot;normal&quot;</td>
                  <td className="p-4">Text transformation</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">decoration</td>
                  <td className="p-4 font-mono text-sm">&quot;none&quot; | &quot;underline&quot; | &quot;line-through&quot;</td>
                  <td className="p-4 font-mono text-sm">&quot;none&quot;</td>
                  <td className="p-4">Text decoration</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">gradient</td>
                  <td className="p-4 font-mono text-sm">&quot;primary&quot; | &quot;rainbow&quot; | &quot;sunset&quot; | &quot;ocean&quot; | &quot;neon&quot; | &quot;golden&quot;</td>
                  <td className="p-4 font-mono text-sm">undefined</td>
                  <td className="p-4">Gradient effect</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">shadow</td>
                  <td className="p-4 font-mono text-sm">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot;</td>
                  <td className="p-4 font-mono text-sm">undefined</td>
                  <td className="p-4">Text shadow size</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">animation</td>
                  <td className="p-4 font-mono text-sm">&quot;glow&quot; | &quot;pulse&quot; | &quot;bounce&quot; | &quot;shimmer&quot;</td>
                  <td className="p-4 font-mono text-sm">undefined</td>
                  <td className="p-4">Animation effect</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">spacing</td>
                  <td className="p-4 font-mono text-sm">&quot;none&quot; | &quot;tight&quot; | &quot;normal&quot; | &quot;relaxed&quot; | &quot;loose&quot; | &quot;section&quot;</td>
                  <td className="p-4 font-mono text-sm">&quot;normal&quot;</td>
                  <td className="p-4">Bottom margin spacing</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">content</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 font-mono text-sm">-</td>
                  <td className="p-4">Text content of the heading</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 font-mono text-sm">React.ReactNode</td>
                  <td className="p-4 font-mono text-sm">-</td>
                  <td className="p-4">Alternative to content prop</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 font-mono text-sm">-</td>
                  <td className="p-4">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function DemoSection({ title, specs }: { title: string; specs: UISpecification[] }) {
  const [showJson, setShowJson] = React.useState(false);
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      
      <div className="rounded-lg bg-muted/50 p-6 space-y-4">
        {specs.map((spec, index) => (
          <div key={index}>
            {render(spec)}
          </div>
        ))}
      </div>
      
      <button
        onClick={() => setShowJson(!showJson)}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {showJson ? 'Hide' : 'Show'} JSON Specification
      </button>
      
      {showJson && (
        <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
          <code>{JSON.stringify(specs, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}