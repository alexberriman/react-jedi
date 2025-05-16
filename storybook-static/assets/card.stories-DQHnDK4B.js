import{j as r}from"./jsx-runtime-Cf8x2fCZ.js";import{C as e,a as f,b as N,c as g,d,e as w}from"./card-BQPCVfwZ.js";import"./index-yBjzXJbu.js";import"./utils-C3T1saKV.js";const S={title:"UI/Card",component:e,parameters:{layout:"centered"},tags:["autodocs"]},a={render:()=>r.jsxs(e,{className:"w-[350px]",children:[r.jsxs(f,{children:[r.jsx(N,{children:"Card Title"}),r.jsx(g,{children:"Card description goes here"})]}),r.jsx(d,{children:r.jsx("p",{children:"Card content goes here."})}),r.jsx(w,{children:r.jsx("p",{children:"Card footer goes here"})})]})},n={render:()=>r.jsxs(e,{className:"w-[350px]",children:[r.jsxs(f,{children:[r.jsx(N,{children:"Card Title"}),r.jsx(g,{children:"Card without footer"})]}),r.jsx(d,{children:r.jsx("p",{children:"This card has no footer section."})})]})},s={render:()=>r.jsxs(e,{className:"w-[350px]",children:[r.jsx(d,{children:r.jsx("p",{children:"This card has no header section."})}),r.jsx(w,{children:r.jsx("p",{children:"Card footer"})})]})},o={render:()=>r.jsx(e,{className:"w-[350px]",children:r.jsx(d,{children:r.jsx("p",{children:"This card only has content."})})})};var t,c,i;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <p>Card footer goes here</p>
      </CardFooter>
    </Card>
}`,...(i=(c=a.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var C,p,l;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card without footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has no footer section.</p>
      </CardContent>
    </Card>
}`,...(l=(p=n.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var h,m,x;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent>
        <p>This card has no header section.</p>
      </CardContent>
      <CardFooter>
        <p>Card footer</p>
      </CardFooter>
    </Card>
}`,...(x=(m=s.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var j,u,T;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent>
        <p>This card only has content.</p>
      </CardContent>
    </Card>
}`,...(T=(u=o.parameters)==null?void 0:u.docs)==null?void 0:T.source}}};const O=["Default","NoFooter","NoHeader","ContentOnly"];export{o as ContentOnly,a as Default,n as NoFooter,s as NoHeader,O as __namedExportsOrder,S as default};
