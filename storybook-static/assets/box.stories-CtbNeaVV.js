import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{B as r}from"./box-y1AJ49W5.js";import"./index-yBjzXJbu.js";import"./index-Y0L-LdVC.js";import"./utils-C3T1saKV.js";const X={title:"UI/Box",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{display:{control:"select",options:["block","flex","inline","inline-block","grid","inline-flex","inline-grid","none"],description:"Controls the display CSS property"},position:{control:"select",options:["static","relative","absolute","fixed","sticky"],description:"Controls the positioning method"},padding:{control:"select",options:["none","xs","sm","md","lg","xl","2xl"],description:"Controls the padding on all sides"},margin:{control:"select",options:["none","xs","sm","md","lg","xl","2xl","auto"],description:"Controls the margin on all sides"},rounded:{control:"select",options:["none","sm","md","lg","xl","2xl","3xl","full"],description:"Controls the border radius (roundness of corners)"},shadow:{control:"select",options:["none","sm","md","lg","xl","2xl","inner"],description:"Controls the box shadow"},width:{control:"select",options:["auto","full","screen","fit","min","max","half","third","two-thirds","quarter","three-quarters"],description:"Controls the width of the box"},height:{control:"select",options:["auto","full","screen","fit","min","max","half","third","two-thirds","quarter","three-quarters"],description:"Controls the height of the box"},borderWidth:{control:"select",options:["none","thin","thick","thicker","thickest"],description:"Controls the border width"},backgroundColor:{control:"select",options:["transparent","primary","secondary","accent","muted","card","background","foreground","destructive","popover"],description:"Controls the background color"},textColor:{control:"select",options:["primary","secondary","accent","muted","card","background","foreground","destructive","popover"],description:"Controls the text color"},borderColor:{control:"select",options:["default","primary","secondary","accent","muted","card","background","foreground","destructive","popover"],description:"Controls the border color"},flexDirection:{control:"select",options:["row","row-reverse","col","col-reverse"],description:"Controls the direction of flex items when display is flex"},justifyContent:{control:"select",options:["start","end","center","between","around","evenly"],description:"Controls the alignment of flex items along the main axis"},alignItems:{control:"select",options:["start","end","center","baseline","stretch"],description:"Controls the alignment of flex items along the cross axis"},gap:{control:"select",options:["none","xs","sm","md","lg","xl","2xl"],description:"Controls the gap between grid/flex items"},overflow:{control:"select",options:["auto","hidden","visible","scroll","x-auto","y-auto","x-hidden","y-hidden","x-scroll","y-scroll"],description:"Controls how content overflows the box"},zIndex:{control:"select",options:["auto","0","10","20","30","40","50"],description:"Controls the stacking order"},transition:{control:"select",options:["none","default","fast","slow"],description:"Controls transition effects"},scale:{control:"select",options:["none","sm","md","lg","xl"],description:"Controls the scale transform"},blur:{control:"select",options:["none","sm","md","lg","xl","2xl","3xl"],description:"Controls the blur filter effect"},backdropBlur:{control:"select",options:["none","sm","md","lg","xl","2xl","3xl"],description:"Controls the backdrop blur effect"},glassmorphism:{control:"select",options:["none","light","medium","strong","dark","dark-medium","dark-strong"],description:"Applies glass morphism effect variants"},neumorphism:{control:"select",options:["none","light","medium","strong","dark","dark-medium","dark-strong"],description:"Applies neumorphism effect variants"},as:{control:"select",options:["div","section","article","main","aside","header","footer","nav"],description:"Renders the box as a different HTML element"}}},n={render:o=>e.jsx(r,{...o,className:"min-h-[200px] min-w-[200px] flex items-center justify-center",children:e.jsx("p",{className:"text-xl font-medium",children:"Default Box"})})},t={args:{padding:"lg",rounded:"lg",shadow:"md",backgroundColor:"card",borderWidth:"thin",borderColor:"default"},render:o=>e.jsx(r,{...o,className:"min-h-[200px] min-w-[200px] flex items-center justify-center",children:e.jsx("p",{className:"text-xl font-medium",children:"Styled Box"})})},s={args:{display:"flex",flexDirection:"col",gap:"md",padding:"md",justifyContent:"center",alignItems:"center",backgroundColor:"muted",rounded:"md"},render:o=>e.jsxs(r,{...o,className:"min-h-[300px] min-w-[300px]",children:[e.jsx(r,{padding:"sm",backgroundColor:"primary",rounded:"md",textColor:"primary",className:"w-full text-center",children:"Item 1"}),e.jsx(r,{padding:"sm",backgroundColor:"secondary",rounded:"md",textColor:"secondary",className:"w-full text-center",children:"Item 2"}),e.jsx(r,{padding:"sm",backgroundColor:"accent",rounded:"md",textColor:"accent",className:"w-full text-center",children:"Item 3"})]})},a={args:{display:"grid",gap:"md",padding:"md",rounded:"md",backgroundColor:"muted",className:"grid-cols-2"},render:o=>e.jsxs(r,{...o,className:"min-h-[300px] min-w-[300px]",children:[e.jsx(r,{padding:"sm",backgroundColor:"primary",rounded:"md",textColor:"primary",className:"text-center",children:"Grid Item 1"}),e.jsx(r,{padding:"sm",backgroundColor:"secondary",rounded:"md",textColor:"secondary",className:"text-center",children:"Grid Item 2"}),e.jsx(r,{padding:"sm",backgroundColor:"accent",rounded:"md",textColor:"accent",className:"text-center",children:"Grid Item 3"}),e.jsx(r,{padding:"sm",backgroundColor:"primary",rounded:"md",textColor:"primary",className:"text-center",children:"Grid Item 4"})]})},d={args:{glassmorphism:"medium",padding:"lg",rounded:"xl"},render:o=>e.jsx(r,{className:"w-[400px] h-[300px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center",children:e.jsx(r,{...o,className:"w-[300px] h-[200px] flex items-center justify-center",children:e.jsx("p",{className:"text-xl font-medium text-white",children:"Glassmorphism Box"})})})},l={args:{neumorphism:"medium",padding:"lg",rounded:"xl"},render:o=>e.jsx(r,{backgroundColor:"background",className:"w-[400px] h-[300px] flex items-center justify-center",children:e.jsx(r,{...o,className:"w-[300px] h-[200px] flex items-center justify-center",children:e.jsx("p",{className:"text-xl font-medium",children:"Neumorphism Box"})})})},c={args:{position:"absolute",padding:"md",backgroundColor:"primary",textColor:"primary",rounded:"md"},render:o=>e.jsx(r,{position:"relative",className:"w-[300px] h-[300px] border border-border",children:e.jsx(r,{...o,className:"m-4 top-0 left-0",children:"Absolute Positioned Box"})})},i={args:{padding:"md",rounded:"md",backgroundColor:"accent",transition:"default",shadow:"md",className:"hover:shadow-xl hover:scale-105"},render:o=>e.jsx(r,{...o,className:"w-[200px] h-[200px] flex items-center justify-center",children:e.jsx("p",{className:"text-lg font-medium text-accent-foreground",children:"Hover Me"})})},m={args:{height:"full",width:"full",overflow:"y-auto",padding:"md",backgroundColor:"card",rounded:"md",shadow:"md"},render:o=>e.jsxs(r,{...o,className:"w-[300px] h-[200px]",children:[e.jsx("p",{className:"mb-4",children:"This box has scrollable content that exceeds its height:"}),Array.from({length:10}).map((O,x)=>e.jsxs("p",{className:"mb-4",children:["Scrollable content paragraph ",x+1,". Lorem ipsum dolor sit amet, consectetur adipiscing elit."]},x))]})},p={args:{backdropBlur:"xl",padding:"lg",rounded:"lg",backgroundColor:"background",className:"bg-opacity-50"},render:o=>e.jsx(r,{className:"relative w-[400px] h-[300px]",children:e.jsxs(r,{className:"w-full h-full flex items-center justify-center",children:[e.jsx("img",{src:"https://source.unsplash.com/random/400x300?nature",alt:"Nature",className:"w-full h-full object-cover absolute inset-0 rounded-lg"}),e.jsx(r,{...o,className:"absolute inset-0 m-8 flex items-center justify-center",children:e.jsx("p",{className:"text-xl font-bold",children:"Text with Backdrop Blur"})})]})})};var u,g,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <Box {...args} className="min-h-[200px] min-w-[200px] flex items-center justify-center">
      <p className="text-xl font-medium">Default Box</p>
    </Box>
}`,...(h=(g=n.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,b,B;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    padding: "lg",
    rounded: "lg",
    shadow: "md",
    backgroundColor: "card",
    borderWidth: "thin",
    borderColor: "default"
  },
  render: args => <Box {...args} className="min-h-[200px] min-w-[200px] flex items-center justify-center">
      <p className="text-xl font-medium">Styled Box</p>
    </Box>
}`,...(B=(b=t.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};var y,C,N;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    display: "flex",
    flexDirection: "col",
    gap: "md",
    padding: "md",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "muted",
    rounded: "md"
  },
  render: args => <Box {...args} className="min-h-[300px] min-w-[300px]">
      <Box padding="sm" backgroundColor="primary" rounded="md" textColor="primary" className="w-full text-center">
        Item 1
      </Box>
      <Box padding="sm" backgroundColor="secondary" rounded="md" textColor="secondary" className="w-full text-center">
        Item 2
      </Box>
      <Box padding="sm" backgroundColor="accent" rounded="md" textColor="accent" className="w-full text-center">
        Item 3
      </Box>
    </Box>
}`,...(N=(C=s.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var w,k,j;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    display: "grid",
    gap: "md",
    padding: "md",
    rounded: "md",
    backgroundColor: "muted",
    className: "grid-cols-2"
  },
  render: args => <Box {...args} className="min-h-[300px] min-w-[300px]">
      <Box padding="sm" backgroundColor="primary" rounded="md" textColor="primary" className="text-center">
        Grid Item 1
      </Box>
      <Box padding="sm" backgroundColor="secondary" rounded="md" textColor="secondary" className="text-center">
        Grid Item 2
      </Box>
      <Box padding="sm" backgroundColor="accent" rounded="md" textColor="accent" className="text-center">
        Grid Item 3
      </Box>
      <Box padding="sm" backgroundColor="primary" rounded="md" textColor="primary" className="text-center">
        Grid Item 4
      </Box>
    </Box>
}`,...(j=(k=a.parameters)==null?void 0:k.docs)==null?void 0:j.source}}};var v,S,I;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    glassmorphism: "medium",
    padding: "lg",
    rounded: "xl"
  },
  render: args => <Box className="w-[400px] h-[300px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <Box {...args} className="w-[300px] h-[200px] flex items-center justify-center">
        <p className="text-xl font-medium text-white">Glassmorphism Box</p>
      </Box>
    </Box>
}`,...(I=(S=d.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var G,A,T;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    neumorphism: "medium",
    padding: "lg",
    rounded: "xl"
  },
  render: args => <Box backgroundColor="background" className="w-[400px] h-[300px] flex items-center justify-center">
      <Box {...args} className="w-[300px] h-[200px] flex items-center justify-center">
        <p className="text-xl font-medium">Neumorphism Box</p>
      </Box>
    </Box>
}`,...(T=(A=l.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var D,W,q;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    position: "absolute",
    padding: "md",
    backgroundColor: "primary",
    textColor: "primary",
    rounded: "md"
  },
  render: args => <Box position="relative" className="w-[300px] h-[300px] border border-border">
      <Box {...args} className="m-4 top-0 left-0">
        Absolute Positioned Box
      </Box>
    </Box>
}`,...(q=(W=c.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var P,_,H;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    padding: "md",
    rounded: "md",
    backgroundColor: "accent",
    transition: "default",
    shadow: "md",
    className: "hover:shadow-xl hover:scale-105"
  },
  render: args => <Box {...args} className="w-[200px] h-[200px] flex items-center justify-center">
      <p className="text-lg font-medium text-accent-foreground">Hover Me</p>
    </Box>
}`,...(H=(_=i.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};var L,M,E;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    height: "full",
    width: "full",
    overflow: "y-auto",
    padding: "md",
    backgroundColor: "card",
    rounded: "md",
    shadow: "md"
  },
  render: args => <Box {...args} className="w-[300px] h-[200px]">
      <p className="mb-4">This box has scrollable content that exceeds its height:</p>
      {Array.from({
      length: 10
    }).map((_, i) => <p key={i} className="mb-4">
          Scrollable content paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </p>)}
    </Box>
}`,...(E=(M=m.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};var F,R,z;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    backdropBlur: "xl",
    padding: "lg",
    rounded: "lg",
    backgroundColor: "background",
    className: "bg-opacity-50"
  },
  render: args => <Box className="relative w-[400px] h-[300px]">
      <Box className="w-full h-full flex items-center justify-center">
        <img src="https://source.unsplash.com/random/400x300?nature" alt="Nature" className="w-full h-full object-cover absolute inset-0 rounded-lg" />
        <Box {...args} className="absolute inset-0 m-8 flex items-center justify-center">
          <p className="text-xl font-bold">Text with Backdrop Blur</p>
        </Box>
      </Box>
    </Box>
}`,...(z=(R=p.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};const Y=["Default","StyledBox","FlexBox","GridBox","GlassmorphismBox","NeumorphismBox","AbsolutePositionedBox","TransitionBox","ScrollableBox","BoxWithBackdropBlur"];export{c as AbsolutePositionedBox,p as BoxWithBackdropBlur,n as Default,s as FlexBox,d as GlassmorphismBox,a as GridBox,l as NeumorphismBox,m as ScrollableBox,t as StyledBox,i as TransitionBox,Y as __namedExportsOrder,X as default};
