import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{S as R}from"./simple-grid-DNT4eNBv.js";import{B as r}from"./box-y1AJ49W5.js";import"./index-yBjzXJbu.js";import"./index-BlmOqGMO.js";import"./utils-C3T1saKV.js";import"./index-Y0L-LdVC.js";const P={title:"Components/Layout/SimpleGrid",component:R,parameters:{layout:"padded",docs:{description:{component:`
The SimpleGrid component creates a responsive grid layout with equal-sized cells. 
It's perfect for creating uniform grids of content like image galleries, product cards, or feature grids.

## Features
- Equal-sized grid cells
- Responsive column configuration
- Flexible spacing between items
- Auto-fit with minimum child width option
- Supports all standard HTML div attributes

## Usage
\`\`\`tsx
import { SimpleGrid } from "@banja/react-jedi";

// Fixed columns
<SimpleGrid columns={3} spacing="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</SimpleGrid>

// Responsive columns
<SimpleGrid 
  columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
  spacing="6"
>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</SimpleGrid>

// Auto-fit with minimum width
<SimpleGrid minChildWidth="250px" spacing="4">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</SimpleGrid>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{columns:{description:"Number of columns (can be responsive)",control:{type:"object"}},spacing:{description:"Spacing between grid items",control:{type:"text"}},minChildWidth:{description:"Minimum width for grid children (enables auto-fit)",control:{type:"text"}},children:{description:"Grid content",control:!1}}},m=({index:s})=>e.jsx(r,{className:"bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-shadow",children:s}),t={args:{columns:3,spacing:"4",children:e.jsx(e.Fragment,{children:Array.from({length:6},(s,n)=>e.jsx(m,{index:n+1},n))})}},a={args:{columns:{base:1,sm:2,md:3,lg:4,xl:5},spacing:"6",children:e.jsx(e.Fragment,{children:Array.from({length:10},(s,n)=>e.jsx(m,{index:n+1},n))})}},i={args:{minChildWidth:"200px",spacing:"4",children:e.jsx(e.Fragment,{children:Array.from({length:12},(s,n)=>e.jsx(m,{index:n+1},n))})},parameters:{docs:{description:{story:"Grid automatically adjusts columns based on minimum child width"}}}},o={args:{columns:3,spacing:{base:"2",sm:"4",md:"6",lg:"8"},children:e.jsx(e.Fragment,{children:Array.from({length:9},(s,n)=>e.jsx(m,{index:n+1},n))})},parameters:{docs:{description:{story:"Spacing increases at larger screen sizes"}}}},d={args:{columns:{base:2,sm:3,md:4,lg:5,xl:6},spacing:"3",children:e.jsx(e.Fragment,{children:Array.from({length:24},(s,n)=>e.jsxs(r,{className:"bg-slate-100 dark:bg-slate-800 rounded p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium",children:["Item ",n+1]},n))})}},l={args:{columns:{base:1,sm:2,lg:3},spacing:"6",children:e.jsx(e.Fragment,{children:Array.from({length:6},(s,n)=>e.jsxs(r,{className:"bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-3",children:[e.jsx("div",{className:"h-40 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg"}),e.jsxs("h3",{className:"text-lg font-semibold text-slate-800 dark:text-slate-200",children:["Card Title ",n+1]}),e.jsx("p",{className:"text-slate-600 dark:text-slate-400 text-sm",children:"This is a content card in a SimpleGrid layout. It demonstrates how real content might look."})]},n))})},parameters:{docs:{description:{story:"Example with content cards"}}}},c={args:{columns:4,spacing:"4",children:e.jsxs(e.Fragment,{children:[e.jsx(r,{className:"bg-red-500 text-white rounded p-4 h-32",children:"Red"}),e.jsx(r,{className:"bg-blue-500 text-white rounded p-4 h-48",children:"Blue (Taller)"}),e.jsx(r,{className:"bg-green-500 text-white rounded p-4 h-32",children:"Green"}),e.jsx(r,{className:"bg-yellow-500 text-black rounded p-4 h-40",children:"Yellow"}),e.jsx(r,{className:"bg-purple-500 text-white rounded p-4 h-32",children:"Purple"}),e.jsx(r,{className:"bg-pink-500 text-white rounded p-4 h-56",children:"Pink (Tallest)"}),e.jsx(r,{className:"bg-orange-500 text-white rounded p-4 h-32",children:"Orange"}),e.jsx(r,{className:"bg-teal-500 text-white rounded p-4 h-36",children:"Teal"})]})},parameters:{docs:{description:{story:"SimpleGrid with mixed height content. Note how rows adjust to the tallest item."}}}};var p,g,h;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    columns: 3,
    spacing: "4",
    children: <>
        {Array.from({
        length: 6
      }, (_, i) => <DemoBox key={i} index={i + 1} />)}
      </>
  }
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var u,x,b;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    columns: {
      base: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5
    },
    spacing: "6",
    children: <>
        {Array.from({
        length: 10
      }, (_, i) => <DemoBox key={i} index={i + 1} />)}
      </>
  }
}`,...(b=(x=a.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var w,f,y;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    minChildWidth: "200px",
    spacing: "4",
    children: <>
        {Array.from({
        length: 12
      }, (_, i) => <DemoBox key={i} index={i + 1} />)}
      </>
  },
  parameters: {
    docs: {
      description: {
        story: "Grid automatically adjusts columns based on minimum child width"
      }
    }
  }
}`,...(y=(f=i.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var j,N,B;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    columns: 3,
    spacing: {
      base: "2",
      sm: "4",
      md: "6",
      lg: "8"
    },
    children: <>
        {Array.from({
        length: 9
      }, (_, i) => <DemoBox key={i} index={i + 1} />)}
      </>
  },
  parameters: {
    docs: {
      description: {
        story: "Spacing increases at larger screen sizes"
      }
    }
  }
}`,...(B=(N=o.parameters)==null?void 0:N.docs)==null?void 0:B.source}}};var S,C,k;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    columns: {
      base: 2,
      sm: 3,
      md: 4,
      lg: 5,
      xl: 6
    },
    spacing: "3",
    children: <>
        {Array.from({
        length: 24
      }, (_, i) => <Box key={i} className="bg-slate-100 dark:bg-slate-800 rounded p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium">
            Item {i + 1}
          </Box>)}
      </>
  }
}`,...(k=(C=d.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var G,v,A;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    columns: {
      base: 1,
      sm: 2,
      lg: 3
    },
    spacing: "6",
    children: <>
        {Array.from({
        length: 6
      }, (_, i) => <Box key={i} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-3">
            <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg"></div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Card Title {i + 1}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              This is a content card in a SimpleGrid layout. It demonstrates how real content might
              look.
            </p>
          </Box>)}
      </>
  },
  parameters: {
    docs: {
      description: {
        story: "Example with content cards"
      }
    }
  }
}`,...(A=(v=l.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};var _,T,F;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    columns: 4,
    spacing: "4",
    children: <>
        <Box className="bg-red-500 text-white rounded p-4 h-32">Red</Box>
        <Box className="bg-blue-500 text-white rounded p-4 h-48">Blue (Taller)</Box>
        <Box className="bg-green-500 text-white rounded p-4 h-32">Green</Box>
        <Box className="bg-yellow-500 text-black rounded p-4 h-40">Yellow</Box>
        <Box className="bg-purple-500 text-white rounded p-4 h-32">Purple</Box>
        <Box className="bg-pink-500 text-white rounded p-4 h-56">Pink (Tallest)</Box>
        <Box className="bg-orange-500 text-white rounded p-4 h-32">Orange</Box>
        <Box className="bg-teal-500 text-white rounded p-4 h-36">Teal</Box>
      </>
  },
  parameters: {
    docs: {
      description: {
        story: "SimpleGrid with mixed height content. Note how rows adjust to the tallest item."
      }
    }
  }
}`,...(F=(T=c.parameters)==null?void 0:T.docs)==null?void 0:F.source}}};const O=["Default","ResponsiveColumns","AutoFitMinWidth","ResponsiveSpacing","LargeGrid","ContentCards","MixedContent"];export{i as AutoFitMinWidth,l as ContentCards,t as Default,d as LargeGrid,c as MixedContent,a as ResponsiveColumns,o as ResponsiveSpacing,O as __namedExportsOrder,P as default};
