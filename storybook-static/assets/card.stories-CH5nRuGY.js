import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{c as o}from"./utils-C3T1saKV.js";import"./index-yBjzXJbu.js";function n({className:r,...a}){return e.jsx("div",{"data-slot":"card",className:o("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",r),...a})}function l({className:r,...a}){return e.jsx("div",{"data-slot":"card-header",className:o("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",r),...a})}function p({className:r,...a}){return e.jsx("div",{"data-slot":"card-title",className:o("leading-none font-semibold",r),...a})}function C({className:r,...a}){return e.jsx("div",{"data-slot":"card-description",className:o("text-muted-foreground text-sm",r),...a})}function d({className:r,...a}){return e.jsx("div",{"data-slot":"card-content",className:o("px-6",r),...a})}function m({className:r,...a}){return e.jsx("div",{"data-slot":"card-footer",className:o("flex items-center px-6 [.border-t]:pt-6",r),...a})}n.__docgenInfo={description:"",methods:[],displayName:"Card"};l.__docgenInfo={description:"",methods:[],displayName:"CardHeader"};m.__docgenInfo={description:"",methods:[],displayName:"CardFooter"};p.__docgenInfo={description:"",methods:[],displayName:"CardTitle"};C.__docgenInfo={description:"",methods:[],displayName:"CardDescription"};d.__docgenInfo={description:"",methods:[],displayName:"CardContent"};const I={title:"Components/UI/Card",component:n,parameters:{layout:"centered"},tags:["autodocs"]},t={render:()=>e.jsxs(n,{className:"w-[350px]",children:[e.jsxs(l,{children:[e.jsx(p,{children:"Card Title"}),e.jsx(C,{children:"Card description goes here"})]}),e.jsx(d,{children:e.jsx("p",{children:"Card content goes here."})}),e.jsx(m,{children:e.jsx("p",{children:"Card footer goes here"})})]})},s={render:()=>e.jsxs(n,{className:"w-[350px]",children:[e.jsxs(l,{children:[e.jsx(p,{children:"Card Title"}),e.jsx(C,{children:"Card without footer"})]}),e.jsx(d,{children:e.jsx("p",{children:"This card has no footer section."})})]})},c={render:()=>e.jsxs(n,{className:"w-[350px]",children:[e.jsx(d,{children:e.jsx("p",{children:"This card has no header section."})}),e.jsx(m,{children:e.jsx("p",{children:"Card footer"})})]})},i={render:()=>e.jsx(n,{className:"w-[350px]",children:e.jsx(d,{children:e.jsx("p",{children:"This card only has content."})})})};var h,x,u;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(u=(x=t.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};var f,j,g;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card without footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has no footer section.</p>
      </CardContent>
    </Card>
}`,...(g=(j=s.parameters)==null?void 0:j.docs)==null?void 0:g.source}}};var N,T,_;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent>
        <p>This card has no header section.</p>
      </CardContent>
      <CardFooter>
        <p>Card footer</p>
      </CardFooter>
    </Card>
}`,...(_=(T=c.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var w,y,D;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent>
        <p>This card only has content.</p>
      </CardContent>
    </Card>
}`,...(D=(y=i.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};const v=["Default","NoFooter","NoHeader","ContentOnly"];export{i as ContentOnly,t as Default,s as NoFooter,c as NoHeader,v as __namedExportsOrder,I as default};
