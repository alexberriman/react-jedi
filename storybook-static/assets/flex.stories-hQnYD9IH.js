import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{F as r}from"./flex-FKx4Rg2S.js";import"./index-yBjzXJbu.js";import"./index-BlmOqGMO.js";import"./index-Y0L-LdVC.js";import"./utils-C3T1saKV.js";const s=({className:p,children:z})=>e.jsx("div",{className:`size-16 bg-primary/15 flex items-center justify-center rounded-md ${p||""}`,children:z||"Box"}),K={title:"UI/Flex",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{direction:{control:"select",options:["row","column","rowReverse","columnReverse"],description:"The direction of the flex container"},wrap:{control:"select",options:["nowrap","wrap","wrapReverse"],description:"Whether and how flex items wrap"},justify:{control:"select",options:["start","end","center","between","around","evenly"],description:"How items are justified along the main axis"},align:{control:"select",options:["start","end","center","baseline","stretch"],description:"How items are aligned along the cross axis"},gap:{control:"select",options:["none","xs","sm","md","lg","xl"],description:"The gap between flex items"},className:{control:"text",description:"Additional CSS classes to apply"},children:{control:"text",description:"The content of the flex container"}},args:{children:e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"1"}),e.jsx(s,{children:"2"}),e.jsx(s,{children:"3"})]})}},a={args:{direction:"row",wrap:"nowrap",justify:"start",align:"start",gap:"md"}},n={args:{direction:"column",align:"center",gap:"md"}},t={args:{justify:"between",align:"center",className:"w-[400px]"}},o={args:{justify:"center",align:"center",gap:"md",className:"w-[400px]"}},l={args:{wrap:"wrap",gap:"md",className:"w-[300px]",children:e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"1"}),e.jsx(s,{children:"2"}),e.jsx(s,{children:"3"}),e.jsx(s,{children:"4"}),e.jsx(s,{children:"5"}),e.jsx(s,{children:"6"})]})}},c={args:{direction:"rowReverse",gap:"md"}},m={args:{align:"stretch",gap:"md",className:"h-32",children:e.jsxs(e.Fragment,{children:[e.jsx(s,{className:"h-full",children:"1"}),e.jsx(s,{className:"h-full",children:"2"}),e.jsx(s,{className:"h-full",children:"3"})]})}},i={args:{className:"flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-4 sm:items-center",children:e.jsxs(e.Fragment,{children:[e.jsx(s,{className:"w-full sm:w-auto",children:"Responsive"}),e.jsx(s,{className:"w-full sm:w-auto",children:"Layout"}),e.jsx(s,{className:"w-full sm:w-auto",children:"Example"})]})},parameters:{viewport:{defaultViewport:"responsive"}}},d={render:p=>e.jsxs("div",{className:"space-y-8 w-full max-w-[500px]",children:[e.jsxs(r,{justify:"between",align:"center",className:"bg-muted/50 p-4 rounded-lg",children:[e.jsx(s,{children:"Left"}),e.jsxs(r,{gap:"sm",children:[e.jsx(s,{children:"Right 1"}),e.jsx(s,{children:"Right 2"})]})]}),e.jsxs(r,{direction:"column",gap:"md",className:"bg-muted/50 p-4 rounded-lg",children:[e.jsx(s,{className:"w-full",children:"Header"}),e.jsxs(r,{gap:"sm",justify:"center",className:"w-full",children:[e.jsx(s,{children:"Content 1"}),e.jsx(s,{children:"Content 2"})]}),e.jsx(s,{className:"w-full",children:"Footer"})]})]})};var x,u,g;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    direction: "row",
    wrap: "nowrap",
    justify: "start",
    align: "start",
    gap: "md"
  }
}`,...(g=(u=a.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var w,h,f;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    direction: "column",
    align: "center",
    gap: "md"
  }
}`,...(f=(h=n.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var j,B,I;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    justify: "between",
    align: "center",
    className: "w-[400px]"
  }
}`,...(I=(B=t.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var N,y,v;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    justify: "center",
    align: "center",
    gap: "md",
    className: "w-[400px]"
  }
}`,...(v=(y=o.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var R,F,S;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    wrap: "wrap",
    gap: "md",
    className: "w-[300px]",
    children: <>
        <BoxItem>1</BoxItem>
        <BoxItem>2</BoxItem>
        <BoxItem>3</BoxItem>
        <BoxItem>4</BoxItem>
        <BoxItem>5</BoxItem>
        <BoxItem>6</BoxItem>
      </>
  }
}`,...(S=(F=l.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};var b,C,E;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    direction: "rowReverse",
    gap: "md"
  }
}`,...(E=(C=c.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var L,A,H;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    align: "stretch",
    gap: "md",
    className: "h-32",
    children: <>
        <BoxItem className="h-full">1</BoxItem>
        <BoxItem className="h-full">2</BoxItem>
        <BoxItem className="h-full">3</BoxItem>
      </>
  }
}`,...(H=(A=m.parameters)==null?void 0:A.docs)==null?void 0:H.source}}};var J,T,W;i.parameters={...i.parameters,docs:{...(J=i.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    className: "flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-4 sm:items-center",
    children: <>
        <BoxItem className="w-full sm:w-auto">Responsive</BoxItem>
        <BoxItem className="w-full sm:w-auto">Layout</BoxItem>
        <BoxItem className="w-full sm:w-auto">Example</BoxItem>
      </>
  },
  parameters: {
    viewport: {
      defaultViewport: "responsive"
    }
  }
}`,...(W=(T=i.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};var D,V,_;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <div className="space-y-8 w-full max-w-[500px]">
      <Flex justify="between" align="center" className="bg-muted/50 p-4 rounded-lg">
        <BoxItem>Left</BoxItem>
        <Flex gap="sm">
          <BoxItem>Right 1</BoxItem>
          <BoxItem>Right 2</BoxItem>
        </Flex>
      </Flex>

      <Flex direction="column" gap="md" className="bg-muted/50 p-4 rounded-lg">
        <BoxItem className="w-full">Header</BoxItem>
        <Flex gap="sm" justify="center" className="w-full">
          <BoxItem>Content 1</BoxItem>
          <BoxItem>Content 2</BoxItem>
        </Flex>
        <BoxItem className="w-full">Footer</BoxItem>
      </Flex>
    </div>
}`,...(_=(V=d.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};const M=["Default","Column","JustifyBetween","JustifyCenter","WrapExample","RowReverse","AlignStretch","ResponsiveLayout","ComplexAlignment"];export{m as AlignStretch,n as Column,d as ComplexAlignment,a as Default,t as JustifyBetween,o as JustifyCenter,i as ResponsiveLayout,c as RowReverse,l as WrapExample,M as __namedExportsOrder,K as default};
