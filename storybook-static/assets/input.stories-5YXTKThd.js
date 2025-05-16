import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{I as t}from"./input-C_9i_XJH.js";import{L as f}from"./label-Dr_ntOI2.js";import"./index-yBjzXJbu.js";import"./utils-C3T1saKV.js";import"./index-tvICUrOf.js";import"./index-nFMdVv6h.js";import"./index-_r67kdfS.js";import"./index-fNjTmf9T.js";import"./index-CY5ieB2z.js";const R={title:"Components/Form/Input",component:t,parameters:{layout:"centered"},tags:["autodocs"]},r={args:{placeholder:"Enter text here..."}},a={render:()=>e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(f,{htmlFor:"email",children:"Email"}),e.jsx(t,{type:"email",id:"email",placeholder:"Enter your email"})]})},s={args:{disabled:!0,placeholder:"Disabled input"}},l={render:()=>e.jsxs("div",{className:"relative w-full max-w-sm",children:[e.jsx(t,{placeholder:"Search...",className:"pl-8"}),e.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-2",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"h-4 w-4 text-muted-foreground",children:e.jsx("path",{fillRule:"evenodd",d:"M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",clipRule:"evenodd"})})})]})};var o,n,i;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text here..."
  }
}`,...(i=(n=r.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var m,d,c;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
}`,...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,u,h;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: "Disabled input"
  }
}`,...(h=(u=s.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var x,g,v;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div className="relative w-full max-w-sm">
      <Input placeholder="Search..." className="pl-8" />
      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-muted-foreground">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
}`,...(v=(g=l.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};const z=["Default","WithLabel","Disabled","WithIcon"];export{r as Default,s as Disabled,l as WithIcon,a as WithLabel,z as __namedExportsOrder,R as default};
