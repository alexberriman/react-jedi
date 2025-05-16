import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{L as s}from"./label-Dr_ntOI2.js";import{I as h}from"./input-C_9i_XJH.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./index-nFMdVv6h.js";import"./index-_r67kdfS.js";import"./index-fNjTmf9T.js";import"./index-CY5ieB2z.js";import"./utils-C3T1saKV.js";const I={title:"Components/Form/Label",component:s,parameters:{layout:"centered"},tags:["autodocs"]},r={args:{children:"Label",htmlFor:"input"}},a={render:()=>e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(s,{htmlFor:"email",children:"Email"}),e.jsx(h,{type:"email",id:"email",placeholder:"Enter your email"})]})},t={render:()=>e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(s,{htmlFor:"username",className:"after:content-['*'] after:ml-0.5 after:text-red-500",children:"Username"}),e.jsx(h,{id:"username",placeholder:"Enter username"})]})};var m,o,l;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: "Label",
    htmlFor: "input"
  }
}`,...(l=(o=r.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var n,i,c;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
}`,...(c=(i=a.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var d,p,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="username" className="after:content-['*'] after:ml-0.5 after:text-red-500">
        Username
      </Label>
      <Input id="username" placeholder="Enter username" />
    </div>
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const N=["Default","WithInput","Required"];export{r as Default,t as Required,a as WithInput,N as __namedExportsOrder,I as default};
