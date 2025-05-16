import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{A as r,a as n,b as o,c as t}from"./accordion-BPWZHYTj.js";import"./index-yBjzXJbu.js";import"./index-BlmOqGMO.js";import"./index-Dkb_ZYRU.js";import"./index-DftwpC-x.js";import"./index-CtJ-PWby.js";import"./index-DW48STyt.js";import"./index-Dz6nX4BC.js";import"./index-5uDXI3f6.js";import"./index-BFNyJKjA.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-LrhrNugO.js";import"./index-CGaZw3rm.js";import"./index-CW4F2FBO.js";import"./index-xprPBo3d.js";import"./utils-C3T1saKV.js";import"./chevron-down-Cf7i8DHK.js";import"./createLucideIcon-Dkfau1iJ.js";const Q={title:"Components/UI/Accordion",component:r,parameters:{layout:"centered"},argTypes:{type:{control:"radio",options:["single","multiple"],description:"Type of accordion - single or multiple items can be expanded"},collapsible:{control:"boolean",description:"When type is 'single', determines if the item can be collapsed"},defaultValue:{control:"text",description:"The default expanded item(s)"},disabled:{control:"boolean",description:"Disable the entire accordion"},className:{control:"text",description:"Additional CSS classes"}}},c={args:{type:"single",collapsible:!0,className:"w-[400px]"},render:i=>e.jsxs(r,{...i,children:[e.jsxs(n,{value:"item-1",children:[e.jsx(o,{children:"Is it accessible?"}),e.jsx(t,{children:"Yes. It adheres to the WAI-ARIA design pattern."})]}),e.jsxs(n,{value:"item-2",children:[e.jsx(o,{children:"Is it styled?"}),e.jsx(t,{children:"Yes. It comes with default styles that match the other components' aesthetic."})]}),e.jsxs(n,{value:"item-3",children:[e.jsx(o,{children:"Is it animated?"}),e.jsx(t,{children:"Yes. It's animated by default, but you can disable it if you prefer."})]})]})},s={args:{type:"multiple",className:"w-[400px]",defaultValue:["item-1","item-3"]},render:i=>e.jsxs(r,{...i,children:[e.jsxs(n,{value:"item-1",children:[e.jsx(o,{children:"Section 1"}),e.jsx(t,{children:"Content for section 1. Multiple sections can be expanded at the same time."})]}),e.jsxs(n,{value:"item-2",children:[e.jsx(o,{children:"Section 2"}),e.jsx(t,{children:"Content for section 2. Try expanding multiple sections!"})]}),e.jsxs(n,{value:"item-3",children:[e.jsx(o,{children:"Section 3"}),e.jsx(t,{children:"Content for section 3. This section starts expanded by default."})]})]})},a={args:{type:"single",collapsible:!1,className:"w-[400px]",defaultValue:"item-1"},render:i=>e.jsxs(r,{...i,children:[e.jsxs(n,{value:"item-1",children:[e.jsx(o,{children:"Always Expanded Item"}),e.jsx(t,{children:"When collapsible is false, at least one item must remain expanded."})]}),e.jsxs(n,{value:"item-2",children:[e.jsx(o,{children:"Another Item"}),e.jsx(t,{children:"You can switch between items, but cannot collapse all items."})]})]})},l={args:{type:"single",collapsible:!0,className:"w-[400px]"},render:i=>e.jsxs(r,{...i,children:[e.jsxs(n,{value:"item-1",children:[e.jsx(o,{children:"Enabled Item"}),e.jsx(t,{children:"This item can be expanded normally."})]}),e.jsxs(n,{value:"item-2",disabled:!0,children:[e.jsx(o,{children:"Disabled Item"}),e.jsx(t,{children:"This content cannot be seen because the item is disabled."})]}),e.jsxs(n,{value:"item-3",children:[e.jsx(o,{children:"Another Enabled Item"}),e.jsx(t,{children:"This item also works normally."})]})]})},d={args:{type:"single",collapsible:!0,className:"w-[500px]"},render:i=>e.jsxs(r,{...i,children:[e.jsxs(n,{value:"item-1",children:[e.jsx(o,{children:"Item with Long Content"}),e.jsxs(t,{children:[e.jsx("p",{children:"This accordion item contains longer content to demonstrate how the component handles varying amounts of text."}),e.jsx("p",{className:"mt-2",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{className:"mt-2",children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})]}),e.jsxs(n,{value:"item-2",children:[e.jsx(o,{children:"Short Content"}),e.jsx(t,{children:"Just a brief bit of content here."})]})]})},m={args:{type:"single",collapsible:!0,className:"w-[400px] border-none"},render:i=>e.jsx(r,{...i,children:e.jsxs(n,{value:"item-1",className:"border-none",children:[e.jsx(o,{className:"hover:no-underline",children:"Unstyled Accordion"}),e.jsx(t,{children:"This accordion has minimal styling applied, showing the base functionality."})]})})};var p,u,g;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    type: "single",
    collapsible: true,
    className: "w-[400px]"
  },
  render: args => <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...(g=(u=c.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var h,A,x;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    type: "multiple",
    className: "w-[400px]",
    defaultValue: ["item-1", "item-3"]
  },
  render: args => <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Content for section 1. Multiple sections can be expanded at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content for section 2. Try expanding multiple sections!</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Content for section 3. This section starts expanded by default.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...(x=(A=s.parameters)==null?void 0:A.docs)==null?void 0:x.source}}};var b,I,j;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    type: "single",
    collapsible: false,
    className: "w-[400px]",
    defaultValue: "item-1"
  },
  render: args => <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Always Expanded Item</AccordionTrigger>
        <AccordionContent>
          When collapsible is false, at least one item must remain expanded.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Another Item</AccordionTrigger>
        <AccordionContent>
          You can switch between items, but cannot collapse all items.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...(j=(I=a.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var y,T,f;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    type: "single",
    collapsible: true,
    className: "w-[400px]"
  },
  render: args => <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled Item</AccordionTrigger>
        <AccordionContent>This item can be expanded normally.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Item</AccordionTrigger>
        <AccordionContent>
          This content cannot be seen because the item is disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another Enabled Item</AccordionTrigger>
        <AccordionContent>This item also works normally.</AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...(f=(T=l.parameters)==null?void 0:T.docs)==null?void 0:f.source}}};var C,v,w;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    type: "single",
    collapsible: true,
    className: "w-[500px]"
  },
  render: args => <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Item with Long Content</AccordionTrigger>
        <AccordionContent>
          <p>
            This accordion item contains longer content to demonstrate how the component handles
            varying amounts of text.
          </p>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="mt-2">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Short Content</AccordionTrigger>
        <AccordionContent>Just a brief bit of content here.</AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...(w=(v=d.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var N,S,q;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    type: "single",
    collapsible: true,
    className: "w-[400px] border-none"
  },
  render: args => <Accordion {...args}>
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="hover:no-underline">Unstyled Accordion</AccordionTrigger>
        <AccordionContent>
          This accordion has minimal styling applied, showing the base functionality.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...(q=(S=m.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};const X=["Single","Multiple","NonCollapsible","WithDisabledItems","LongContent","Unstyled"];export{d as LongContent,s as Multiple,a as NonCollapsible,c as Single,m as Unstyled,l as WithDisabledItems,X as __namedExportsOrder,Q as default};
