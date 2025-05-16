import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{T as t}from"./text-BVNhesrM.js";import"./index-yBjzXJbu.js";import"./index-Y0L-LdVC.js";import"./utils-C3T1saKV.js";const Te={title:"Components/Typography/Text",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{element:{control:"select",options:["p","span","div","blockquote","code","strong","em","small"],description:"HTML element to render as"},variant:{control:"select",options:["default","primary","secondary","accent","muted","destructive"],description:"Text color variant"},size:{control:"select",options:["xs","sm","base","lg","xl","2xl","3xl"],description:"Text size"},weight:{control:"select",options:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],description:"Font weight"},align:{control:"select",options:["left","center","right","justify"],description:"Text alignment"},transform:{control:"select",options:["uppercase","lowercase","capitalize","normal"],description:"Text transformation"},decoration:{control:"select",options:["none","underline","line-through"],description:"Text decoration"},italic:{control:"boolean",description:"Italic text"},gradient:{control:"select",options:["none","primary","rainbow","sunset","ocean","neon","golden"],description:"Text gradient effect"},shadow:{control:"select",options:["none","sm","md","lg","xl","2xl"],description:"Text shadow effect"},animation:{control:"select",options:["none","glow","pulse","bounce","shimmer"],description:"Text animation"},truncate:{control:"select",options:[!0,!1,"ellipsis","multiline","multiline-3","multiline-4"],description:"Truncate text"},wrap:{control:"select",options:["normal","nowrap","pre","pre-line","pre-wrap"],description:"Text wrapping"},lineHeight:{control:"select",options:["none","tight","snug","normal","relaxed","loose"],description:"Line height"},tracking:{control:"select",options:["tighter","tight","normal","wide","wider","widest"],description:"Letter spacing"}}},n={args:{children:"This is a paragraph of text that demonstrates the default styling of the Text component. It should have a reasonable width for comfortable reading and proper spacing."}},i={render:()=>e.jsxs("div",{className:"space-y-4 max-w-lg",children:[e.jsx(t,{element:"p",children:"Paragraph: Default text element with standard styling for body content."}),e.jsx(t,{element:"span",children:"Span: Inline text element."}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(t,{element:"span",children:"This is regular text"}),e.jsx(t,{element:"strong",children:"Strong: Bold emphasis"}),e.jsx(t,{element:"em",children:"Em: Italic emphasis"})]}),e.jsx(t,{element:"small",children:"Small: Smaller text for less emphasis or secondary information."}),e.jsx(t,{element:"blockquote",children:'Blockquote: Used for quotations. "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt'}),e.jsx(t,{element:"code",children:"Code: for inline code snippets or technical terms."}),e.jsx(t,{element:"div",children:"Div: Block-level container for text content."})]})},a={render:()=>e.jsxs("div",{className:"space-y-4 max-w-lg",children:[e.jsx(t,{size:"xs",children:"Extra Small (xs): Tiny text for legal text or footnotes."}),e.jsx(t,{size:"sm",children:"Small (sm): Slightly smaller text than the base size."}),e.jsx(t,{size:"base",children:"Base: The default text size for body content."}),e.jsx(t,{size:"lg",children:"Large (lg): Slightly larger than the base size, for emphasis."}),e.jsx(t,{size:"xl",children:"Extra Large (xl): For subheadings or important text."}),e.jsx(t,{size:"2xl",children:"2XL: Even larger text, almost heading-like."}),e.jsx(t,{size:"3xl",children:"3XL: The largest text size, for major emphasis."})]})},s={render:()=>e.jsxs("div",{className:"space-y-2 max-w-lg",children:[e.jsx(t,{weight:"thin",children:"Thin (100): The lightest font weight."}),e.jsx(t,{weight:"extralight",children:"Extra Light (200): Very light font weight."}),e.jsx(t,{weight:"light",children:"Light (300): Light but readable weight."}),e.jsx(t,{weight:"normal",children:"Normal (400): The default font weight."}),e.jsx(t,{weight:"medium",children:"Medium (500): Slightly bolder than normal."}),e.jsx(t,{weight:"semibold",children:"Semi Bold (600): Good for mild emphasis."}),e.jsx(t,{weight:"bold",children:"Bold (700): Strong emphasis."}),e.jsx(t,{weight:"extrabold",children:"Extra Bold (800): Very strong emphasis."}),e.jsx(t,{weight:"black",children:"Black (900): The heaviest font weight."})]})},r={render:()=>e.jsxs("div",{className:"space-y-4 w-full max-w-lg border border-muted p-4",children:[e.jsx(t,{align:"left",children:"Left Aligned: This text is aligned to the left, which is the default. It's the most common alignment for body text in left-to-right languages."}),e.jsx(t,{align:"center",children:"Center Aligned: This text is centered. Center alignment works well for headings or short pieces of text that need emphasis."}),e.jsx(t,{align:"right",children:"Right Aligned: This text is aligned to the right. Right alignment can be useful for certain design elements or in right-to-left languages."}),e.jsx(t,{align:"justify",children:"Justify Aligned: This text is justified, meaning it stretches to fill the full width with even spacing between words. This creates clean edges on both sides but can sometimes create awkward spacing."})]})},o={render:()=>e.jsxs("div",{className:"space-y-2 max-w-lg",children:[e.jsx(t,{variant:"default",children:"Default Color: The standard text color."}),e.jsx(t,{variant:"primary",children:"Primary Color: Uses the primary brand color."}),e.jsx(t,{variant:"secondary",children:"Secondary Color: Uses the secondary brand color."}),e.jsx(t,{variant:"accent",children:"Accent Color: Uses the accent color for emphasis."}),e.jsx(t,{variant:"muted",children:"Muted Color: Subdued color for less important text."}),e.jsx(t,{variant:"destructive",children:"Destructive Color: For warnings or errors."})]})},l={render:()=>e.jsxs("div",{className:"space-y-2 max-w-lg",children:[e.jsx(t,{transform:"uppercase",children:"UPPERCASE TEXT: TRANSFORMS ALL CHARACTERS TO UPPERCASE. GOOD FOR HEADINGS OR EMPHASIS."}),e.jsx(t,{transform:"lowercase",children:"lowercase text: transforms all characters to lowercase. can be used for stylistic purposes."}),e.jsx(t,{transform:"capitalize",children:"Capitalize Text: Makes The First Letter Of Each Word Capital. Good For Titles."}),e.jsx(t,{transform:"normal",children:"Normal Case Text: Leaves the text as-is, without transformation. This is the default."})]})},c={render:()=>e.jsxs("div",{className:"space-y-4 max-w-lg",children:[e.jsx(t,{decoration:"underline",children:"Underlined text for emphasis or links."}),e.jsx(t,{decoration:"line-through",children:"Strikethrough text to indicate deletion."}),e.jsx(t,{italic:!0,children:"Italic text for emphasis or stylistic purposes."}),e.jsx(t,{italic:!0,decoration:"underline",children:"Combined styles: both italic and underlined."})]})},d={render:()=>e.jsxs("div",{className:"space-y-2 max-w-lg",children:[e.jsx(t,{gradient:"primary",size:"xl",weight:"bold",children:"Primary Gradient: Brand-specific gradient"}),e.jsx(t,{gradient:"rainbow",size:"xl",weight:"bold",children:"Rainbow Gradient: Vibrant multi-color"}),e.jsx(t,{gradient:"sunset",size:"xl",weight:"bold",children:"Sunset Gradient: Warm orange to pink"}),e.jsx(t,{gradient:"ocean",size:"xl",weight:"bold",children:"Ocean Gradient: Cool blue to green"}),e.jsx(t,{gradient:"neon",size:"xl",weight:"bold",children:"Neon Gradient: Bright purple to blue"}),e.jsx(t,{gradient:"golden",size:"xl",weight:"bold",children:"Golden Gradient: Luxurious amber to gold"})]})},h={render:()=>e.jsxs("div",{className:"space-y-4 max-w-lg",children:[e.jsx(t,{shadow:"sm",size:"lg",weight:"semibold",children:"Small Shadow: Subtle depth effect"}),e.jsx(t,{shadow:"md",size:"lg",weight:"semibold",children:"Medium Shadow: Balanced shadow effect"}),e.jsx(t,{shadow:"lg",size:"lg",weight:"semibold",children:"Large Shadow: Pronounced shadow"}),e.jsx(t,{shadow:"xl",size:"lg",weight:"semibold",children:"Extra Large Shadow: Heavy shadow effect"}),e.jsx(t,{shadow:"2xl",size:"lg",weight:"semibold",children:"2XL Shadow: Dramatic shadow effect"})]})},m={render:()=>e.jsxs("div",{className:"space-y-8 max-w-lg",children:[e.jsx(t,{animation:"glow",size:"xl",weight:"bold",children:"Glowing Text Effect"}),e.jsx(t,{animation:"pulse",size:"lg",children:"Pulsing Text Animation"}),e.jsx(t,{animation:"bounce",size:"lg",children:"Bouncing Text Effect"}),e.jsx(t,{animation:"shimmer",size:"xl",weight:"semibold",children:"Shimmering Text Animation"})]})},g={render:()=>e.jsxs("div",{className:"space-y-4 max-w-xs border border-muted p-4",children:[e.jsx(t,{children:"No truncation: This text will wrap naturally to the next line when it reaches the edge of its container."}),e.jsx(t,{truncate:!0,className:"w-full",children:"Truncated (boolean): This long text will be cut off with an ellipsis when it reaches the edge..."}),e.jsx(t,{truncate:"ellipsis",className:"w-full",children:"Truncated (ellipsis): This text is explicitly set to truncate with an ellipsis at the end."}),e.jsx(t,{truncate:"multiline",className:"w-full",children:"Multiline truncation (2 lines): This text will display for two lines before being truncated with an ellipsis. This is useful for card descriptions or previews where you want to show a bit more content."}),e.jsx(t,{truncate:"multiline-3",className:"w-full",children:"Multiline truncation (3 lines): This text will display for three lines before being truncated with an ellipsis. This gives readers more context while still maintaining a consistent height. Good for longer descriptions that need more space."}),e.jsx(t,{truncate:"multiline-4",className:"w-full",children:"Multiline truncation (4 lines): This text will display for four lines before being truncated with an ellipsis. This is the maximum number of lines available for truncation. Use this for important content that requires more comprehensive previews before truncation."})]})},x={render:()=>e.jsxs("div",{className:"space-y-8 max-w-lg",children:[e.jsx("div",{className:"border border-muted p-2",children:e.jsx(t,{lineHeight:"none",children:"Line Height: None. This text has no extra space between lines. Words are cramped tightly together which can be hard to read but saves vertical space. Only use for special cases."})}),e.jsx("div",{className:"border border-muted p-2",children:e.jsx(t,{lineHeight:"tight",children:"Line Height: Tight. This text has minimal spacing between lines. It's more compact than normal but still maintains some readability. Good for constrained spaces."})}),e.jsx("div",{className:"border border-muted p-2",children:e.jsx(t,{lineHeight:"snug",children:"Line Height: Snug. This text has slightly less spacing than normal. A good compromise between space efficiency and readability. Works well for many interfaces."})}),e.jsx("div",{className:"border border-muted p-2",children:e.jsx(t,{lineHeight:"normal",children:"Line Height: Normal. This text has standard spacing between lines. A balanced choice for most body content that provides good readability without wasting space."})}),e.jsx("div",{className:"border border-muted p-2",children:e.jsx(t,{lineHeight:"relaxed",children:"Line Height: Relaxed. This text has generous spacing between lines, improving readability for longer content. The default choice for most paragraph text in this library."})}),e.jsx("div",{className:"border border-muted p-2",children:e.jsx(t,{lineHeight:"loose",children:"Line Height: Loose. This text has maximum spacing between lines. Very easy to read but takes up more vertical space. Use for content where readability is the highest priority."})})]})},p={render:()=>e.jsxs("div",{className:"space-y-4 max-w-lg",children:[e.jsx(t,{tracking:"tighter",size:"lg",children:"Tighter tracking: Reduced letter spacing for a more compact look."}),e.jsx(t,{tracking:"tight",size:"lg",children:"Tight tracking: Slightly reduced spacing between letters."}),e.jsx(t,{tracking:"normal",size:"lg",children:"Normal tracking: Default letter spacing."}),e.jsx(t,{tracking:"wide",size:"lg",children:"Wide tracking: Increased spacing for better legibility."}),e.jsx(t,{tracking:"wider",size:"lg",children:"Wider tracking: More pronounced letter spacing."}),e.jsx(t,{tracking:"widest",size:"lg",children:"Widest tracking: Maximum letter spacing for dramatic effect."})]})},u={render:()=>e.jsxs("div",{className:"max-w-prose space-y-4",children:[e.jsx(t,{size:"lg",weight:"semibold",children:"The Importance of Typography in Design"}),e.jsx(t,{children:"Typography is a fundamental component of design and is crucial in establishing visual hierarchy, enhancing readability, and creating an emotional connection with the audience. When used effectively, typography can transform a simple design into an immersive experience."}),e.jsx(t,{children:"The choice of font, size, weight, spacing, and alignment all contribute to how information is perceived and processed. Good typography makes content accessible and engaging, while poor typography can make even the most valuable content difficult to consume."}),e.jsx(t,{children:"In web design, typography is especially important as it directly impacts user experience. Readable text with appropriate contrast and spacing reduces eye strain and makes information easier to digest, particularly on smaller screens or for users with visual impairments."}),e.jsx(t,{children:"Beyond functionality, typography also sets the tone and personality of a design. A sleek, modern sans-serif font conveys a different feeling than a classic serif or a playful display font. These subtle differences can reinforce brand identity and evoke specific emotional responses."}),e.jsx(t,{weight:"semibold",children:"For 2025 and beyond, typography trends are evolving to embrace:"}),e.jsx(t,{children:"• Variable fonts that adapt to different screen sizes and contexts"}),e.jsx(t,{children:"• Custom typefaces that make brands instantly recognizable"}),e.jsx(t,{children:"• Experimental typography that pushes creative boundaries"}),e.jsx(t,{children:"• Accessibility-focused designs that work for all users"}),e.jsx(t,{children:"• AI-enhanced typography that personalizes the reading experience"}),e.jsx(t,{children:"The Text component in this library is designed to accommodate these trends while maintaining flexibility, readability, and visual appeal across all applications."})]})},T={args:{size:"xl",weight:"bold",gradient:"rainbow",shadow:"lg",animation:"shimmer",align:"center",children:"2025 Design Aesthetic"}};var f,w,b;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    children: "This is a paragraph of text that demonstrates the default styling of the Text component. It should have a reasonable width for comfortable reading and proper spacing."
  }
}`,...(b=(w=n.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var y,v,j;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 max-w-lg">
      <Text element="p">
        Paragraph: Default text element with standard styling for body content.
      </Text>
      <Text element="span">Span: Inline text element.</Text>
      <div className="flex gap-2 items-center">
        <Text element="span">This is regular text</Text>
        <Text element="strong">Strong: Bold emphasis</Text>
        <Text element="em">Em: Italic emphasis</Text>
      </div>
      <Text element="small">Small: Smaller text for less emphasis or secondary information.</Text>
      <Text element="blockquote">
        Blockquote: Used for quotations. &quot;The future belongs to those who believe in the beauty
        of their dreams.&quot; - Eleanor Roosevelt
      </Text>
      <Text element="code">Code: for inline code snippets or technical terms.</Text>
      <Text element="div">Div: Block-level container for text content.</Text>
    </div>
}`,...(j=(v=i.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var S,z,k;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 max-w-lg">
      <Text size="xs">Extra Small (xs): Tiny text for legal text or footnotes.</Text>
      <Text size="sm">Small (sm): Slightly smaller text than the base size.</Text>
      <Text size="base">Base: The default text size for body content.</Text>
      <Text size="lg">Large (lg): Slightly larger than the base size, for emphasis.</Text>
      <Text size="xl">Extra Large (xl): For subheadings or important text.</Text>
      <Text size="2xl">2XL: Even larger text, almost heading-like.</Text>
      <Text size="3xl">3XL: The largest text size, for major emphasis.</Text>
    </div>
}`,...(k=(z=a.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};var N,L,A;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="space-y-2 max-w-lg">
      <Text weight="thin">Thin (100): The lightest font weight.</Text>
      <Text weight="extralight">Extra Light (200): Very light font weight.</Text>
      <Text weight="light">Light (300): Light but readable weight.</Text>
      <Text weight="normal">Normal (400): The default font weight.</Text>
      <Text weight="medium">Medium (500): Slightly bolder than normal.</Text>
      <Text weight="semibold">Semi Bold (600): Good for mild emphasis.</Text>
      <Text weight="bold">Bold (700): Strong emphasis.</Text>
      <Text weight="extrabold">Extra Bold (800): Very strong emphasis.</Text>
      <Text weight="black">Black (900): The heaviest font weight.</Text>
    </div>
}`,...(A=(L=s.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var E,C,H;r.parameters={...r.parameters,docs:{...(E=r.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-full max-w-lg border border-muted p-4">
      <Text align="left">
        Left Aligned: This text is aligned to the left, which is the default. It&apos;s the most
        common alignment for body text in left-to-right languages.
      </Text>
      <Text align="center">
        Center Aligned: This text is centered. Center alignment works well for headings or short
        pieces of text that need emphasis.
      </Text>
      <Text align="right">
        Right Aligned: This text is aligned to the right. Right alignment can be useful for certain
        design elements or in right-to-left languages.
      </Text>
      <Text align="justify">
        Justify Aligned: This text is justified, meaning it stretches to fill the full width with
        even spacing between words. This creates clean edges on both sides but can sometimes create
        awkward spacing.
      </Text>
    </div>
}`,...(H=(C=r.parameters)==null?void 0:C.docs)==null?void 0:H.source}}};var G,R,V;o.parameters={...o.parameters,docs:{...(G=o.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="space-y-2 max-w-lg">
      <Text variant="default">Default Color: The standard text color.</Text>
      <Text variant="primary">Primary Color: Uses the primary brand color.</Text>
      <Text variant="secondary">Secondary Color: Uses the secondary brand color.</Text>
      <Text variant="accent">Accent Color: Uses the accent color for emphasis.</Text>
      <Text variant="muted">Muted Color: Subdued color for less important text.</Text>
      <Text variant="destructive">Destructive Color: For warnings or errors.</Text>
    </div>
}`,...(V=(R=o.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var B,I,M;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="space-y-2 max-w-lg">
      <Text transform="uppercase">
        UPPERCASE TEXT: TRANSFORMS ALL CHARACTERS TO UPPERCASE. GOOD FOR HEADINGS OR EMPHASIS.
      </Text>
      <Text transform="lowercase">
        lowercase text: transforms all characters to lowercase. can be used for stylistic purposes.
      </Text>
      <Text transform="capitalize">
        Capitalize Text: Makes The First Letter Of Each Word Capital. Good For Titles.
      </Text>
      <Text transform="normal">
        Normal Case Text: Leaves the text as-is, without transformation. This is the default.
      </Text>
    </div>
}`,...(M=(I=l.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var D,P,W;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 max-w-lg">
      <Text decoration="underline">Underlined text for emphasis or links.</Text>
      <Text decoration="line-through">Strikethrough text to indicate deletion.</Text>
      <Text italic>Italic text for emphasis or stylistic purposes.</Text>
      <Text italic decoration="underline">
        Combined styles: both italic and underlined.
      </Text>
    </div>
}`,...(W=(P=c.parameters)==null?void 0:P.docs)==null?void 0:W.source}}};var O,U,F;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div className="space-y-2 max-w-lg">
      <Text gradient="primary" size="xl" weight="bold">
        Primary Gradient: Brand-specific gradient
      </Text>
      <Text gradient="rainbow" size="xl" weight="bold">
        Rainbow Gradient: Vibrant multi-color
      </Text>
      <Text gradient="sunset" size="xl" weight="bold">
        Sunset Gradient: Warm orange to pink
      </Text>
      <Text gradient="ocean" size="xl" weight="bold">
        Ocean Gradient: Cool blue to green
      </Text>
      <Text gradient="neon" size="xl" weight="bold">
        Neon Gradient: Bright purple to blue
      </Text>
      <Text gradient="golden" size="xl" weight="bold">
        Golden Gradient: Luxurious amber to gold
      </Text>
    </div>
}`,...(F=(U=d.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};var q,X,J;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 max-w-lg">
      <Text shadow="sm" size="lg" weight="semibold">
        Small Shadow: Subtle depth effect
      </Text>
      <Text shadow="md" size="lg" weight="semibold">
        Medium Shadow: Balanced shadow effect
      </Text>
      <Text shadow="lg" size="lg" weight="semibold">
        Large Shadow: Pronounced shadow
      </Text>
      <Text shadow="xl" size="lg" weight="semibold">
        Extra Large Shadow: Heavy shadow effect
      </Text>
      <Text shadow="2xl" size="lg" weight="semibold">
        2XL Shadow: Dramatic shadow effect
      </Text>
    </div>
}`,...(J=(X=h.parameters)==null?void 0:X.docs)==null?void 0:J.source}}};var _,K,Q;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 max-w-lg">
      <Text animation="glow" size="xl" weight="bold">
        Glowing Text Effect
      </Text>
      <Text animation="pulse" size="lg">
        Pulsing Text Animation
      </Text>
      <Text animation="bounce" size="lg">
        Bouncing Text Effect
      </Text>
      <Text animation="shimmer" size="xl" weight="semibold">
        Shimmering Text Animation
      </Text>
    </div>
}`,...(Q=(K=m.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var Y,Z,$;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 max-w-xs border border-muted p-4">
      <Text>
        No truncation: This text will wrap naturally to the next line when it reaches the edge of
        its container.
      </Text>
      <Text truncate={true} className="w-full">
        Truncated (boolean): This long text will be cut off with an ellipsis when it reaches the
        edge...
      </Text>
      <Text truncate="ellipsis" className="w-full">
        Truncated (ellipsis): This text is explicitly set to truncate with an ellipsis at the end.
      </Text>
      <Text truncate="multiline" className="w-full">
        Multiline truncation (2 lines): This text will display for two lines before being truncated
        with an ellipsis. This is useful for card descriptions or previews where you want to show a
        bit more content.
      </Text>
      <Text truncate="multiline-3" className="w-full">
        Multiline truncation (3 lines): This text will display for three lines before being
        truncated with an ellipsis. This gives readers more context while still maintaining a
        consistent height. Good for longer descriptions that need more space.
      </Text>
      <Text truncate="multiline-4" className="w-full">
        Multiline truncation (4 lines): This text will display for four lines before being truncated
        with an ellipsis. This is the maximum number of lines available for truncation. Use this for
        important content that requires more comprehensive previews before truncation.
      </Text>
    </div>
}`,...($=(Z=g.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,te,ne;x.parameters={...x.parameters,docs:{...(ee=x.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 max-w-lg">
      <div className="border border-muted p-2">
        <Text lineHeight="none">
          Line Height: None. This text has no extra space between lines. Words are cramped tightly
          together which can be hard to read but saves vertical space. Only use for special cases.
        </Text>
      </div>
      <div className="border border-muted p-2">
        <Text lineHeight="tight">
          Line Height: Tight. This text has minimal spacing between lines. It&apos;s more compact
          than normal but still maintains some readability. Good for constrained spaces.
        </Text>
      </div>
      <div className="border border-muted p-2">
        <Text lineHeight="snug">
          Line Height: Snug. This text has slightly less spacing than normal. A good compromise
          between space efficiency and readability. Works well for many interfaces.
        </Text>
      </div>
      <div className="border border-muted p-2">
        <Text lineHeight="normal">
          Line Height: Normal. This text has standard spacing between lines. A balanced choice for
          most body content that provides good readability without wasting space.
        </Text>
      </div>
      <div className="border border-muted p-2">
        <Text lineHeight="relaxed">
          Line Height: Relaxed. This text has generous spacing between lines, improving readability
          for longer content. The default choice for most paragraph text in this library.
        </Text>
      </div>
      <div className="border border-muted p-2">
        <Text lineHeight="loose">
          Line Height: Loose. This text has maximum spacing between lines. Very easy to read but
          takes up more vertical space. Use for content where readability is the highest priority.
        </Text>
      </div>
    </div>
}`,...(ne=(te=x.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var ie,ae,se;p.parameters={...p.parameters,docs:{...(ie=p.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 max-w-lg">
      <Text tracking="tighter" size="lg">
        Tighter tracking: Reduced letter spacing for a more compact look.
      </Text>
      <Text tracking="tight" size="lg">
        Tight tracking: Slightly reduced spacing between letters.
      </Text>
      <Text tracking="normal" size="lg">
        Normal tracking: Default letter spacing.
      </Text>
      <Text tracking="wide" size="lg">
        Wide tracking: Increased spacing for better legibility.
      </Text>
      <Text tracking="wider" size="lg">
        Wider tracking: More pronounced letter spacing.
      </Text>
      <Text tracking="widest" size="lg">
        Widest tracking: Maximum letter spacing for dramatic effect.
      </Text>
    </div>
}`,...(se=(ae=p.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var re,oe,le;u.parameters={...u.parameters,docs:{...(re=u.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <div className="max-w-prose space-y-4">
      <Text size="lg" weight="semibold">
        The Importance of Typography in Design
      </Text>
      <Text>
        Typography is a fundamental component of design and is crucial in establishing visual
        hierarchy, enhancing readability, and creating an emotional connection with the audience.
        When used effectively, typography can transform a simple design into an immersive
        experience.
      </Text>
      <Text>
        The choice of font, size, weight, spacing, and alignment all contribute to how information
        is perceived and processed. Good typography makes content accessible and engaging, while
        poor typography can make even the most valuable content difficult to consume.
      </Text>
      <Text>
        In web design, typography is especially important as it directly impacts user experience.
        Readable text with appropriate contrast and spacing reduces eye strain and makes information
        easier to digest, particularly on smaller screens or for users with visual impairments.
      </Text>
      <Text>
        Beyond functionality, typography also sets the tone and personality of a design. A sleek,
        modern sans-serif font conveys a different feeling than a classic serif or a playful display
        font. These subtle differences can reinforce brand identity and evoke specific emotional
        responses.
      </Text>
      <Text weight="semibold">For 2025 and beyond, typography trends are evolving to embrace:</Text>
      <Text>• Variable fonts that adapt to different screen sizes and contexts</Text>
      <Text>• Custom typefaces that make brands instantly recognizable</Text>
      <Text>• Experimental typography that pushes creative boundaries</Text>
      <Text>• Accessibility-focused designs that work for all users</Text>
      <Text>• AI-enhanced typography that personalizes the reading experience</Text>
      <Text>
        The Text component in this library is designed to accommodate these trends while maintaining
        flexibility, readability, and visual appeal across all applications.
      </Text>
    </div>
}`,...(le=(oe=u.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var ce,de,he;T.parameters={...T.parameters,docs:{...(ce=T.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    size: "xl",
    weight: "bold",
    gradient: "rainbow",
    shadow: "lg",
    animation: "shimmer",
    align: "center",
    children: "2025 Design Aesthetic"
  }
}`,...(he=(de=T.parameters)==null?void 0:de.docs)==null?void 0:he.source}}};const fe=["Default","ElementTypes","SizeVariants","WeightVariants","AlignmentVariants","ColorVariants","TextTransformVariants","StyleVariants","GradientVariants","TextWithShadow","AnimatedText","TruncationVariants","LineHeightVariants","LetterSpacingVariants","LongformText","FeatureText"];export{r as AlignmentVariants,m as AnimatedText,o as ColorVariants,n as Default,i as ElementTypes,T as FeatureText,d as GradientVariants,p as LetterSpacingVariants,x as LineHeightVariants,u as LongformText,a as SizeVariants,c as StyleVariants,l as TextTransformVariants,h as TextWithShadow,g as TruncationVariants,s as WeightVariants,fe as __namedExportsOrder,Te as default};
