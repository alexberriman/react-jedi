import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{C as s}from"./container-CsoREV9z.js";import"./index-yBjzXJbu.js";import"./index-Y0L-LdVC.js";import"./utils-C3T1saKV.js";const P={title:"UI/Container",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:"select",options:["default","sm","md","lg","xl","full"],description:"Controls the max-width of the container"},padding:{control:"select",options:["default","none","sm","lg","xl"],description:"Controls the vertical padding of the container"},align:{control:"select",options:["default","center","end","stretch"],description:"Controls the alignment of container contents"},as:{control:"select",options:["div","section","article","main","aside"],description:"Renders the container as a different HTML element"}}},n={render:r=>e.jsx(s,{...r,className:"bg-card border shadow-sm",children:e.jsx("div",{className:"h-40 w-full flex items-center justify-center",children:e.jsx("p",{className:"text-xl font-medium text-muted-foreground",children:"Default Container"})})})},t={args:{size:"sm"},render:r=>e.jsx(s,{...r,className:"bg-card border shadow-sm",children:e.jsx("div",{className:"h-40 w-full flex items-center justify-center",children:e.jsx("p",{className:"text-xl font-medium text-muted-foreground",children:"Small Container (max-w-3xl)"})})})},a={args:{size:"lg"},render:r=>e.jsx(s,{...r,className:"bg-card border shadow-sm",children:e.jsx("div",{className:"h-40 w-full flex items-center justify-center",children:e.jsx("p",{className:"text-xl font-medium text-muted-foreground",children:"Large Container (max-w-7xl)"})})})},o={args:{padding:"none"},render:r=>e.jsx(s,{...r,className:"bg-card border shadow-sm",children:e.jsx("div",{className:"h-40 w-full flex items-center justify-center",children:e.jsx("p",{className:"text-xl font-medium text-muted-foreground",children:"Container without padding"})})})},d={args:{align:"center"},render:r=>e.jsx(s,{...r,className:"bg-card border shadow-sm",children:e.jsx("div",{className:"h-40 w-80 bg-primary-foreground border flex items-center justify-center",children:e.jsx("p",{className:"text-xl font-medium text-muted-foreground",children:"Center aligned content"})})})},c={args:{as:"section"},render:r=>e.jsx(s,{...r,className:"bg-card border shadow-sm",children:e.jsx("div",{className:"h-40 w-full flex items-center justify-center",children:e.jsx("p",{className:"text-xl font-medium text-muted-foreground",children:"Rendered as <section> element"})})})};var i,l,m;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => <Container {...args} className="bg-card border shadow-sm">
      <div className="h-40 w-full flex items-center justify-center">
        <p className="text-xl font-medium text-muted-foreground">Default Container</p>
      </div>
    </Container>
}`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var u,g,x;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    size: "sm"
  },
  render: args => <Container {...args} className="bg-card border shadow-sm">
      <div className="h-40 w-full flex items-center justify-center">
        <p className="text-xl font-medium text-muted-foreground">Small Container (max-w-3xl)</p>
      </div>
    </Container>
}`,...(x=(g=t.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var f,p,h;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    size: "lg"
  },
  render: args => <Container {...args} className="bg-card border shadow-sm">
      <div className="h-40 w-full flex items-center justify-center">
        <p className="text-xl font-medium text-muted-foreground">Large Container (max-w-7xl)</p>
      </div>
    </Container>
}`,...(h=(p=a.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var N,j,w;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    padding: "none"
  },
  render: args => <Container {...args} className="bg-card border shadow-sm">
      <div className="h-40 w-full flex items-center justify-center">
        <p className="text-xl font-medium text-muted-foreground">Container without padding</p>
      </div>
    </Container>
}`,...(w=(j=o.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var C,b,v;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    align: "center"
  },
  render: args => <Container {...args} className="bg-card border shadow-sm">
      <div className="h-40 w-80 bg-primary-foreground border flex items-center justify-center">
        <p className="text-xl font-medium text-muted-foreground">Center aligned content</p>
      </div>
    </Container>
}`,...(v=(b=d.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var y,S,z;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    as: "section"
  },
  render: args => <Container {...args} className="bg-card border shadow-sm">
      <div className="h-40 w-full flex items-center justify-center">
        <p className="text-xl font-medium text-muted-foreground">
          Rendered as &lt;section&gt; element
        </p>
      </div>
    </Container>
}`,...(z=(S=c.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};const T=["Default","Small","Large","NoPadding","CenterAligned","AsSection"];export{c as AsSection,d as CenterAligned,n as Default,a as Large,o as NoPadding,t as Small,T as __namedExportsOrder,P as default};
