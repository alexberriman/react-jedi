import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{G as t}from"./grid-BcYL_RTF.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./utils-C3T1saKV.js";const E={title:"Components/Layout/Grid",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{columns:{control:{type:"number"},description:"Number of columns in the grid"},gap:{control:{type:"number"},description:"Gap between grid items"},autoFit:{control:"boolean",description:"Whether to auto-fit columns to available width"},minColWidth:{control:"text",description:"Minimum width of auto-fit columns (when autoFit is true)"},colWidth:{control:"text",description:"Fixed column width (when autoFit is true)"},rows:{control:{type:"number"},description:"Rows in the grid"},flow:{control:{type:"select",options:["row","column","dense","row-dense","column-dense"]},description:"Flow direction of grid items"},stretch:{control:"boolean",description:"Whether grid items should stretch to fill container height"}}},r=({children:n,className:a=""})=>e.jsx("div",{className:`bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium animate-pulse ${a}`,children:n}),i={args:{columns:3,gap:4,className:"w-full max-w-4xl"},render:n=>e.jsx(t,{...n,children:Array.from({length:6},(a,s)=>e.jsxs(r,{children:["Item ",s+1]},s))})},d={args:{autoFit:!0,minColWidth:"200px",gap:4,className:"w-full max-w-4xl"},render:n=>e.jsx(t,{...n,children:Array.from({length:8},(a,s)=>e.jsxs(r,{children:["Item ",s+1]},s))})},o={args:{className:"grid-cols-[2fr_1fr_1fr] gap-4 w-full max-w-4xl"},render:n=>e.jsxs(t,{...n,children:[e.jsx(r,{children:"2fr"}),e.jsx(r,{children:"1fr"}),e.jsx(r,{children:"1fr"}),e.jsx(r,{children:"2fr"}),e.jsx(r,{children:"1fr"}),e.jsx(r,{children:"1fr"})]})},m={args:{className:"w-full max-w-4xl h-[400px]",areas:["header header header","sidebar content content","sidebar content content","footer footer footer"],gap:4},render:n=>e.jsxs(t,{...n,children:[e.jsx("div",{className:"bg-blue-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:header]",children:"Header"}),e.jsx("div",{className:"bg-green-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:sidebar]",children:"Sidebar"}),e.jsx("div",{className:"bg-purple-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:content]",children:"Main Content"}),e.jsx("div",{className:"bg-orange-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:footer]",children:"Footer"})]})},l={args:{columns:{base:1,md:2,lg:3,xl:4},gap:{base:2,md:4,lg:6},className:"w-full max-w-4xl"},render:n=>e.jsx(t,{...n,children:Array.from({length:8},(a,s)=>e.jsxs(r,{children:["Item ",s+1]},s))})},c={args:{columns:3,flow:"column-dense",gap:4,className:"w-full max-w-4xl grid-rows-3"},render:n=>e.jsxs(t,{...n,children:[e.jsx(r,{className:"row-span-2",children:"Span 2 rows"}),Array.from({length:7},(a,s)=>e.jsxs(r,{children:["Item ",s+1]},s))]})},u={args:{autoFit:!0,minColWidth:"180px",gap:4,className:"w-full max-w-4xl"},render:n=>e.jsxs(t,{...n,children:[e.jsx(r,{className:"h-24",children:"Short"}),e.jsx(r,{className:"h-48",children:"Medium"}),e.jsx(r,{className:"h-64",children:"Tall"}),e.jsx(r,{className:"h-32",children:"Short-Medium"}),e.jsx(r,{className:"h-56",children:"Medium-Tall"}),e.jsx(r,{className:"h-40",children:"Medium"}),e.jsx(r,{className:"h-32",children:"Short-Medium"}),e.jsx(r,{className:"h-48",children:"Medium"})]})};var h,x,g;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    columns: 3,
    gap: 4,
    className: "w-full max-w-4xl"
  },
  render: args => <Grid {...args}>
      {Array.from({
      length: 6
    }, (_, i) => <GridItem key={i}>Item {i + 1}</GridItem>)}
    </Grid>
}`,...(g=(x=i.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var p,f,G;d.parameters={...d.parameters,docs:{...(p=d.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    autoFit: true,
    minColWidth: "200px",
    gap: 4,
    className: "w-full max-w-4xl"
  },
  render: args => <Grid {...args}>
      {Array.from({
      length: 8
    }, (_, i) => <GridItem key={i}>Item {i + 1}</GridItem>)}
    </Grid>
}`,...(G=(f=d.parameters)==null?void 0:f.docs)==null?void 0:G.source}}};var w,I,N;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    className: "grid-cols-[2fr_1fr_1fr] gap-4 w-full max-w-4xl"
  },
  render: args => <Grid {...args}>
      <GridItem>2fr</GridItem>
      <GridItem>1fr</GridItem>
      <GridItem>1fr</GridItem>
      <GridItem>2fr</GridItem>
      <GridItem>1fr</GridItem>
      <GridItem>1fr</GridItem>
    </Grid>
}`,...(N=(I=o.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var j,b,y;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    className: "w-full max-w-4xl h-[400px]",
    areas: ["header header header", "sidebar content content", "sidebar content content", "footer footer footer"],
    gap: 4
  },
  render: args => <Grid {...args}>
      <div className="bg-blue-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:header]">
        Header
      </div>
      <div className="bg-green-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:sidebar]">
        Sidebar
      </div>
      <div className="bg-purple-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:content]">
        Main Content
      </div>
      <div className="bg-orange-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:footer]">
        Footer
      </div>
    </Grid>
}`,...(y=(b=m.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var S,M,v;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    columns: {
      base: 1,
      md: 2,
      lg: 3,
      xl: 4
    },
    gap: {
      base: 2,
      md: 4,
      lg: 6
    },
    className: "w-full max-w-4xl"
  },
  render: args => <Grid {...args}>
      {Array.from({
      length: 8
    }, (_, i) => <GridItem key={i}>Item {i + 1}</GridItem>)}
    </Grid>
}`,...(v=(M=l.parameters)==null?void 0:M.docs)==null?void 0:v.source}}};var _,F,A;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    columns: 3,
    flow: "column-dense",
    gap: 4,
    className: "w-full max-w-4xl grid-rows-3"
  },
  render: args => <Grid {...args}>
      <GridItem className="row-span-2">Span 2 rows</GridItem>
      {Array.from({
      length: 7
    }, (_, i) => <GridItem key={i}>Item {i + 1}</GridItem>)}
    </Grid>
}`,...(A=(F=c.parameters)==null?void 0:F.docs)==null?void 0:A.source}}};var C,W,k;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    autoFit: true,
    minColWidth: "180px",
    gap: 4,
    className: "w-full max-w-4xl"
  },
  render: args => <Grid {...args}>
      <GridItem className="h-24">Short</GridItem>
      <GridItem className="h-48">Medium</GridItem>
      <GridItem className="h-64">Tall</GridItem>
      <GridItem className="h-32">Short-Medium</GridItem>
      <GridItem className="h-56">Medium-Tall</GridItem>
      <GridItem className="h-40">Medium</GridItem>
      <GridItem className="h-32">Short-Medium</GridItem>
      <GridItem className="h-48">Medium</GridItem>
    </Grid>
}`,...(k=(W=u.parameters)==null?void 0:W.docs)==null?void 0:k.source}}};const H=["Default","AutoFit","DifferentColumnSizes","NamedAreas","ResponsiveGrid","ColumnDense","MasonryLikeGrid"];export{d as AutoFit,c as ColumnDense,i as Default,o as DifferentColumnSizes,u as MasonryLikeGrid,m as NamedAreas,l as ResponsiveGrid,H as __namedExportsOrder,E as default};
