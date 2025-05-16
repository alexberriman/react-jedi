import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as F}from"./index-BlmOqGMO.js";import{C as n,a as l,b as t}from"./collapsible-11ZejvT2.js";import{B as s}from"./button-MXz0hby-.js";import{C as Q}from"./chevron-down-Cf7i8DHK.js";import"./index-yBjzXJbu.js";import"./index-LrhrNugO.js";import"./index-DW48STyt.js";import"./index-Dkb_ZYRU.js";import"./index-Dz6nX4BC.js";import"./index-5uDXI3f6.js";import"./index-CtJ-PWby.js";import"./index-BFNyJKjA.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-CGaZw3rm.js";import"./index-CW4F2FBO.js";import"./index-Y0L-LdVC.js";import"./utils-C3T1saKV.js";import"./createLucideIcon-Dkfau1iJ.js";const me={title:"UI/Collapsible",component:n,parameters:{docs:{description:{component:`A collapsible component for showing and hiding content. Built on top of Radix UI Collapsible.

## Usage

\`\`\`tsx
<Collapsible>
  <CollapsibleTrigger>Toggle content</CollapsibleTrigger>
  <CollapsibleContent>
    This content can be toggled.
  </CollapsibleContent>
</Collapsible>
\`\`\``}}},argTypes:{open:{control:"boolean",description:"The controlled open state of the collapsible"},defaultOpen:{control:"boolean",description:"The default open state when uncontrolled"},disabled:{control:"boolean",description:"Whether the collapsible is disabled"},onOpenChange:{action:"open changed",description:"Called when the open state changes"}}},i={render:()=>e.jsxs(n,{children:[e.jsx(l,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Toggle Content"})}),e.jsx(t,{className:"mt-2",children:e.jsx("div",{className:"rounded-md border px-4 py-3 text-sm",children:"This is the collapsible content. It can be expanded or collapsed."})})]})},o={render:()=>e.jsxs(n,{defaultOpen:!0,children:[e.jsx(l,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Toggle Content"})}),e.jsx(t,{className:"mt-2",children:e.jsx("div",{className:"rounded-md border px-4 py-3 text-sm",children:"This collapsible starts in the open state by default."})})]})},U=()=>{const[a,r]=F.useState(!1);return e.jsxs("div",{className:"space-y-2",children:[e.jsxs(n,{open:a,onOpenChange:r,children:[e.jsx(l,{asChild:!0,children:e.jsxs(s,{variant:"outline",children:[a?"Hide":"Show"," Content"]})}),e.jsx(t,{className:"mt-2",children:e.jsxs("div",{className:"rounded-md border px-4 py-3 text-sm",children:["This is controlled content. State: ",a?"Open":"Closed"]})})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(s,{size:"sm",onClick:()=>r(!0),children:"Open"}),e.jsx(s,{size:"sm",onClick:()=>r(!1),children:"Close"})]})]})},d={render:()=>e.jsx(U,{})},z=()=>{const[a,r]=F.useState(!1);return e.jsxs(n,{open:a,onOpenChange:r,children:[e.jsx(l,{asChild:!0,children:e.jsxs(s,{variant:"ghost",className:"flex items-center gap-2",children:[e.jsx(Q,{className:`h-4 w-4 transition-transform duration-200 ${a?"rotate-180":""}`}),"Advanced Settings"]})}),e.jsx(t,{className:"mt-2",children:e.jsxs("div",{className:"space-y-2 rounded-md border p-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium",children:"Auto-save"}),e.jsx("span",{className:"text-sm text-muted-foreground",children:"Enabled"})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium",children:"Cache size"}),e.jsx("span",{className:"text-sm text-muted-foreground",children:"2.5 GB"})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium",children:"Updates"}),e.jsx("span",{className:"text-sm text-muted-foreground",children:"Automatic"})]})]})})]})},c={render:()=>e.jsx(z,{})},p={render:()=>e.jsxs("div",{className:"space-y-2",children:[e.jsxs(n,{children:[e.jsx(l,{asChild:!0,children:e.jsx(s,{variant:"outline",className:"w-full justify-start",children:"Section 1"})}),e.jsx(t,{className:"mt-1",children:e.jsx("div",{className:"rounded-md border px-4 py-3 text-sm",children:"Content for section 1. This can contain any elements."})})]}),e.jsxs(n,{children:[e.jsx(l,{asChild:!0,children:e.jsx(s,{variant:"outline",className:"w-full justify-start",children:"Section 2"})}),e.jsx(t,{className:"mt-1",children:e.jsx("div",{className:"rounded-md border px-4 py-3 text-sm",children:"Content for section 2. Multiple collapsibles can be used together."})})]}),e.jsxs(n,{children:[e.jsx(l,{asChild:!0,children:e.jsx(s,{variant:"outline",className:"w-full justify-start",children:"Section 3"})}),e.jsx(t,{className:"mt-1",children:e.jsx("div",{className:"rounded-md border px-4 py-3 text-sm",children:"Content for section 3. Each operates independently."})})]})]})},m={render:()=>e.jsxs(n,{disabled:!0,children:[e.jsx(l,{asChild:!0,children:e.jsx(s,{variant:"outline",disabled:!0,children:"Disabled Collapsible"})}),e.jsx(t,{children:e.jsx("div",{className:"rounded-md border px-4 py-3 text-sm",children:"This content cannot be toggled because the collapsible is disabled."})})]})},H=()=>{const a=[{question:"What is React?",answer:"React is a JavaScript library for building user interfaces."},{question:"How do I install React?",answer:"You can install React using npm or yarn: npm install react"},{question:"What is JSX?",answer:"JSX is a syntax extension for JavaScript that looks similar to XML or HTML."}];return e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Frequently Asked Questions"}),a.map((r,J)=>e.jsxs(n,{children:[e.jsx(l,{asChild:!0,children:e.jsxs(s,{variant:"ghost",className:"w-full justify-between px-4 py-2 text-left font-medium",children:[r.question,e.jsx(Q,{className:"h-4 w-4"})]})}),e.jsx(t,{children:e.jsx("div",{className:"px-4 py-2 text-sm text-muted-foreground",children:r.answer})})]},J))]})},x={render:()=>e.jsx(H,{})},L=()=>e.jsx("div",{className:"w-full max-w-md",children:e.jsx("div",{className:"rounded-lg border bg-card text-card-foreground shadow-sm",children:e.jsxs("div",{className:"p-6",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Order Summary"}),e.jsxs("div",{className:"mt-4 space-y-2",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Subtotal"}),e.jsx("span",{children:"$99.00"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Tax"}),e.jsx("span",{children:"$8.92"})]}),e.jsxs(n,{children:[e.jsx(l,{asChild:!0,children:e.jsx(s,{variant:"link",className:"h-auto p-0 text-sm",children:"View details"})}),e.jsx(t,{children:e.jsxs("div",{className:"pt-2 text-sm text-muted-foreground",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"State Tax (8%)"}),e.jsx("span",{children:"$7.92"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Local Tax (1%)"}),e.jsx("span",{children:"$1.00"})]})]})})]}),e.jsx("div",{className:"border-t pt-2",children:e.jsxs("div",{className:"flex justify-between font-semibold",children:[e.jsx("span",{children:"Total"}),e.jsx("span",{children:"$107.92"})]})})]})]})})}),u={render:()=>e.jsx(L,{})};var h,b,C;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="rounded-md border px-4 py-3 text-sm">
          This is the collapsible content. It can be expanded or collapsed.
        </div>
      </CollapsibleContent>
    </Collapsible>
}`,...(C=(b=i.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var j,g,f;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="rounded-md border px-4 py-3 text-sm">
          This collapsible starts in the open state by default.
        </div>
      </CollapsibleContent>
    </Collapsible>
}`,...(f=(g=o.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var N,v,y;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...(y=(v=d.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var T,w,S;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <WithIconExample />
}`,...(S=(w=c.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var B,O,E;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            Section 1
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1">
          <div className="rounded-md border px-4 py-3 text-sm">
            Content for section 1. This can contain any elements.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            Section 2
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1">
          <div className="rounded-md border px-4 py-3 text-sm">
            Content for section 2. Multiple collapsibles can be used together.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            Section 3
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1">
          <div className="rounded-md border px-4 py-3 text-sm">
            Content for section 3. Each operates independently.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
}`,...(E=(O=p.parameters)==null?void 0:O.docs)==null?void 0:E.source}}};var I,A,D;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Collapsible disabled>
      <CollapsibleTrigger asChild>
        <Button variant="outline" disabled>
          Disabled Collapsible
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border px-4 py-3 text-sm">
          This content cannot be toggled because the collapsible is disabled.
        </div>
      </CollapsibleContent>
    </Collapsible>
}`,...(D=(A=m.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var W,M,R;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <FAQExample />
}`,...(R=(M=x.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var $,k,q;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <CardExample />
}`,...(q=(k=u.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};const xe=["Basic","DefaultOpen","Controlled","WithIcon","Multiple","Disabled","FAQ","InCard"];export{i as Basic,d as Controlled,o as DefaultOpen,m as Disabled,x as FAQ,u as InCard,p as Multiple,c as WithIcon,xe as __namedExportsOrder,me as default};
