import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{B as r}from"./badge-Dv-F_FtT.js";import"./index-yBjzXJbu.js";import"./index-CY5ieB2z.js";import"./index-tvICUrOf.js";import"./index-Y0L-LdVC.js";import"./utils-C3T1saKV.js";const K={title:"Components/UI/Badge",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","secondary","destructive","outline"],description:"The visual style of the badge"},asChild:{control:"boolean",description:"Whether to render the badge as a child component"},className:{control:"text",description:"Additional CSS classes to apply"},children:{control:"text",description:"The content of the badge"}},args:{children:"Badge"}},a={args:{variant:"default",children:"Default"}},n={args:{variant:"secondary",children:"Secondary"}},s={args:{variant:"destructive",children:"Destructive"}},t={args:{variant:"outline",children:"Outline"}},o={args:{children:e.jsxs(e.Fragment,{children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}),e.jsx("path",{d:"m9 12 2 2 4-4"})]}),"Verified"]})}},d={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(r,{variant:"default",children:"Default"}),e.jsx(r,{variant:"secondary",children:"Secondary"}),e.jsx(r,{variant:"destructive",children:"Destructive"}),e.jsx(r,{variant:"outline",children:"Outline"})]})},l={render:()=>e.jsx("a",{href:"/example-page",children:e.jsx(r,{variant:"default",children:"Interactive Badge"})})},c={args:{variant:"secondary",children:"99+",className:"rounded-full"}},i={render:()=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs(r,{variant:"default",className:"bg-green-500 hover:bg-green-600",children:[e.jsx("span",{className:"h-2 w-2 rounded-full bg-white mr-1"}),"Online"]}),e.jsxs(r,{variant:"default",className:"bg-yellow-500 hover:bg-yellow-600",children:[e.jsx("span",{className:"h-2 w-2 rounded-full bg-white mr-1"}),"Away"]}),e.jsxs(r,{variant:"default",className:"bg-red-500 hover:bg-red-600",children:[e.jsx("span",{className:"h-2 w-2 rounded-full bg-white mr-1"}),"Offline"]})]})},g={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(r,{className:"bg-blue-500 text-white hover:bg-blue-600 border-transparent",children:"Blue"}),e.jsx(r,{className:"bg-purple-500 text-white hover:bg-purple-600 border-transparent",children:"Purple"}),e.jsx(r,{className:"bg-pink-500 text-white hover:bg-pink-600 border-transparent",children:"Pink"}),e.jsx(r,{className:"bg-amber-500 text-white hover:bg-amber-600 border-transparent",children:"Amber"}),e.jsx(r,{className:"bg-teal-500 text-white hover:bg-teal-600 border-transparent",children:"Teal"})]})};var p,u,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: "default",
    children: "Default"
  }
}`,...(m=(u=a.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var h,v,b;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: "secondary",
    children: "Secondary"
  }
}`,...(b=(v=n.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var x,f,B;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: "destructive",
    children: "Destructive"
  }
}`,...(B=(f=s.parameters)==null?void 0:f.docs)==null?void 0:B.source}}};var w,N,j;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: "outline",
    children: "Outline"
  }
}`,...(j=(N=t.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var y,S,k;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    children: <>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        Verified
      </>
  }
}`,...(k=(S=o.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var D,C,O;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
}`,...(O=(C=d.parameters)==null?void 0:C.docs)==null?void 0:O.source}}};var I,A,T;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <a href="/example-page">
      <Badge variant="default">Interactive Badge</Badge>
    </a>
}`,...(T=(A=l.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var W,L,P;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    variant: "secondary",
    children: "99+",
    className: "rounded-full"
  }
}`,...(P=(L=c.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var E,G,M;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <Badge variant="default" className="bg-green-500 hover:bg-green-600">
        <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
        Online
      </Badge>
      <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
        <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
        Away
      </Badge>
      <Badge variant="default" className="bg-red-500 hover:bg-red-600">
        <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
        Offline
      </Badge>
    </div>
}`,...(M=(G=i.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};var V,Z,_;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge className="bg-blue-500 text-white hover:bg-blue-600 border-transparent">Blue</Badge>
      <Badge className="bg-purple-500 text-white hover:bg-purple-600 border-transparent">
        Purple
      </Badge>
      <Badge className="bg-pink-500 text-white hover:bg-pink-600 border-transparent">Pink</Badge>
      <Badge className="bg-amber-500 text-white hover:bg-amber-600 border-transparent">Amber</Badge>
      <Badge className="bg-teal-500 text-white hover:bg-teal-600 border-transparent">Teal</Badge>
    </div>
}`,...(_=(Z=g.parameters)==null?void 0:Z.docs)==null?void 0:_.source}}};const Q=["Default","Secondary","Destructive","Outline","WithIcon","BadgeGroup","InteractiveBadge","CounterBadge","StatusBadge","CustomColoredBadge"];export{d as BadgeGroup,c as CounterBadge,g as CustomColoredBadge,a as Default,s as Destructive,l as InteractiveBadge,t as Outline,n as Secondary,i as StatusBadge,o as WithIcon,Q as __namedExportsOrder,K as default};
