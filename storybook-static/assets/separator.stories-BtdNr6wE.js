import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{R as C}from"./index-DkqaS01M.js";import{c as R}from"./utils-C3T1saKV.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./index-nFMdVv6h.js";import"./index-_r67kdfS.js";import"./index-fNjTmf9T.js";import"./index-CY5ieB2z.js";function a({className:t,orientation:b="horizontal",decorative:w=!0,...z}){return e.jsx(C,{"data-slot":"separator-root",decorative:w,orientation:b,className:R("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",t),...z})}a.__docgenInfo={description:"",methods:[],displayName:"Separator",props:{orientation:{defaultValue:{value:'"horizontal"',computed:!1},required:!1},decorative:{defaultValue:{value:"true",computed:!1},required:!1}}};const q={title:"Components/UI/Separator",component:a,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{orientation:{control:{type:"radio"},options:["horizontal","vertical"],description:"The orientation of the separator"},decorative:{control:{type:"boolean"},description:"Whether the separator is decorative or semantic"},className:{control:{type:"text"},description:"Additional CSS classes to apply"}}},r={args:{orientation:"horizontal",decorative:!0},render:t=>e.jsxs("div",{className:"w-[300px]",children:[e.jsx("div",{className:"text-lg font-medium",children:"Content Above"}),e.jsx(a,{...t,className:"my-4"}),e.jsx("div",{className:"text-lg font-medium",children:"Content Below"})]})},o={args:{orientation:"vertical",decorative:!0},render:t=>e.jsxs("div",{className:"flex h-32 items-center",children:[e.jsx("div",{className:"text-lg font-medium",children:"Left"}),e.jsx(a,{...t,className:"mx-4 h-full"}),e.jsx("div",{className:"text-lg font-medium",children:"Right"})]})},s={args:{orientation:"horizontal",decorative:!0},render:t=>e.jsxs("div",{className:"w-[300px]",children:[e.jsx("div",{className:"text-lg font-medium",children:"Gradient Separator"}),e.jsx(a,{...t,className:"my-4 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"}),e.jsx("div",{className:"text-lg font-medium",children:"Content Below"})]})},n={args:{orientation:"horizontal",decorative:!0},render:t=>e.jsxs("div",{className:"w-[300px]",children:[e.jsx("div",{className:"text-lg font-medium",children:"Dotted Separator"}),e.jsx(a,{...t,className:"my-4 border-t-2 border-dotted border-gray-300 bg-transparent"}),e.jsx("div",{className:"text-lg font-medium",children:"Content Below"})]})},i={args:{orientation:"horizontal",decorative:!0},render:t=>e.jsx("div",{className:"w-[400px]",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{...t,className:"flex-1"}),e.jsx("span",{className:"text-sm font-medium text-gray-500",children:"OR"}),e.jsx(a,{...t,className:"flex-1"})]})})};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal",
    decorative: true
  },
  render: args => <div className="w-[300px]">
      <div className="text-lg font-medium">Content Above</div>
      <Separator {...args} className="my-4" />
      <div className="text-lg font-medium">Content Below</div>
    </div>
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var c,p,u;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    orientation: "vertical",
    decorative: true
  },
  render: args => <div className="flex h-32 items-center">
      <div className="text-lg font-medium">Left</div>
      <Separator {...args} className="mx-4 h-full" />
      <div className="text-lg font-medium">Right</div>
    </div>
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var x,v,g;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal",
    decorative: true
  },
  render: args => <div className="w-[300px]">
      <div className="text-lg font-medium">Gradient Separator</div>
      <Separator {...args} className="my-4 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      <div className="text-lg font-medium">Content Below</div>
    </div>
}`,...(g=(v=s.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var f,h,N;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal",
    decorative: true
  },
  render: args => <div className="w-[300px]">
      <div className="text-lg font-medium">Dotted Separator</div>
      <Separator {...args} className="my-4 border-t-2 border-dotted border-gray-300 bg-transparent" />
      <div className="text-lg font-medium">Content Below</div>
    </div>
}`,...(N=(h=n.parameters)==null?void 0:h.docs)==null?void 0:N.source}}};var j,S,y;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal",
    decorative: true
  },
  render: args => <div className="w-[400px]">
      <div className="flex items-center gap-2">
        <Separator {...args} className="flex-1" />
        <span className="text-sm font-medium text-gray-500">OR</span>
        <Separator {...args} className="flex-1" />
      </div>
    </div>
}`,...(y=(S=i.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};const E=["Default","Vertical","CustomStyle","Dotted","WithLabel"];export{s as CustomStyle,r as Default,n as Dotted,o as Vertical,i as WithLabel,E as __namedExportsOrder,q as default};
