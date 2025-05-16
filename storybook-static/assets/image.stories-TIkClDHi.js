import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{I as h}from"./image-CPfDLinr.js";import"./index-yBjzXJbu.js";import"./index-BlmOqGMO.js";import"./index-Y0L-LdVC.js";import"./utils-C3T1saKV.js";const ce={title:"UI/Image",component:h,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{src:{control:"text",description:"Source URL of the image"},alt:{control:"text",description:"Alternative text for the image"},objectFit:{control:"select",options:["contain","cover","fill","none","scaleDown"],description:"How the image should be fitted inside its container"},rounded:{control:"select",options:["none","sm","md","lg","xl","2xl","3xl","full"],description:"Border radius of the image"},shadow:{control:"select",options:["none","sm","md","lg","xl"],description:"Shadow size around the image"},filter:{control:"select",options:["none","grayscale","sepia","blur","invert"],description:"Visual filter to apply to the image"},hover:{control:"select",options:["none","grow","shrink","rotate","shine","glow","pulse"],description:"Effect to apply on hover"},loading:{control:"select",options:["eager","lazy"],description:"Loading behavior of the image"},fallback:{control:"text",description:"Fallback image URL if the main image fails to load"},aspectRatio:{control:"text",description:"Aspect ratio of the image container (e.g., '16/9', '1/1')"},width:{control:"text",description:"Width of the image container (e.g., '300px', '100%')"},height:{control:"text",description:"Height of the image container (e.g., '200px', 'auto')"}},args:{src:"https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",alt:"Sample image",aspectRatio:"16/9",width:"400px"}},o={args:{objectFit:"cover",rounded:"md",shadow:"none"}},r={args:{rounded:"xl",shadow:"md"}},a={args:{rounded:"full",aspectRatio:"1/1",width:"200px",objectFit:"cover"}},t={args:{shadow:"xl",rounded:"lg"}},s={args:{filter:"grayscale"}},i={args:{filter:"sepia"}},c={args:{hover:"grow",shadow:"md"}},n={args:{hover:"glow",rounded:"xl"}},d={args:{width:"100%",height:"300px",objectFit:"cover"}},p={args:{aspectRatio:"21/9",width:"600px",objectFit:"cover"}},l={args:{aspectRatio:"3/4",width:"300px",height:"400px",objectFit:"cover"}},m={render:u=>e.jsxs("div",{className:"grid grid-cols-3 gap-4 p-4",children:[e.jsx(h,{...u,rounded:"lg",shadow:"md",hover:"grow",aspectRatio:"1/1",width:"100%",src:"https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"}),e.jsx(h,{...u,rounded:"lg",shadow:"md",hover:"grow",aspectRatio:"1/1",width:"100%",src:"https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"}),e.jsx(h,{...u,rounded:"lg",shadow:"md",hover:"grow",aspectRatio:"1/1",width:"100%",src:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"})]})},g={args:{src:"https://this-image-does-not-exist.jpg",fallback:"https://placehold.co/400x225/EFEFEF/AAAAAA?text=Image+Not+Found",rounded:"md",shadow:"sm"}};var f,x,w;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    objectFit: "cover",
    rounded: "md",
    shadow: "none"
  }
}`,...(w=(x=o.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var b,v,D;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    rounded: "xl",
    shadow: "md"
  }
}`,...(D=(v=r.parameters)==null?void 0:v.docs)==null?void 0:D.source}}};var A,H,j;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    rounded: "full",
    aspectRatio: "1/1",
    width: "200px",
    objectFit: "cover"
  }
}`,...(j=(H=a.parameters)==null?void 0:H.docs)==null?void 0:j.source}}};var F,G,M;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    shadow: "xl",
    rounded: "lg"
  }
}`,...(M=(G=t.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};var S,y,R;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    filter: "grayscale"
  }
}`,...(R=(y=s.parameters)==null?void 0:y.docs)==null?void 0:R.source}}};var B,W,E;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    filter: "sepia"
  }
}`,...(E=(W=i.parameters)==null?void 0:W.docs)==null?void 0:E.source}}};var I,V,k;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    hover: "grow",
    shadow: "md"
  }
}`,...(k=(V=c.parameters)==null?void 0:V.docs)==null?void 0:k.source}}};var q,Y,L;n.parameters={...n.parameters,docs:{...(q=n.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    hover: "glow",
    rounded: "xl"
  }
}`,...(L=(Y=n.parameters)==null?void 0:Y.docs)==null?void 0:L.source}}};var N,U,z;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    width: "100%",
    height: "300px",
    objectFit: "cover"
  }
}`,...(z=(U=d.parameters)==null?void 0:U.docs)==null?void 0:z.source}}};var C,P,_;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    aspectRatio: "21/9",
    width: "600px",
    objectFit: "cover"
  }
}`,...(_=(P=p.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var O,T,J;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    aspectRatio: "3/4",
    width: "300px",
    height: "400px",
    objectFit: "cover"
  }
}`,...(J=(T=l.parameters)==null?void 0:T.docs)==null?void 0:J.source}}};var K,Q,X;m.parameters={...m.parameters,docs:{...(K=m.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: args => <div className="grid grid-cols-3 gap-4 p-4">
      <Image {...args} rounded="lg" shadow="md" hover="grow" aspectRatio="1/1" width="100%" src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
      <Image {...args} rounded="lg" shadow="md" hover="grow" aspectRatio="1/1" width="100%" src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
      <Image {...args} rounded="lg" shadow="md" hover="grow" aspectRatio="1/1" width="100%" src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
    </div>
}`,...(X=(Q=m.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,$,ee;g.parameters={...g.parameters,docs:{...(Z=g.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    src: "https://this-image-does-not-exist.jpg",
    fallback: "https://placehold.co/400x225/EFEFEF/AAAAAA?text=Image+Not+Found",
    rounded: "md",
    shadow: "sm"
  }
}`,...(ee=($=g.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};const ne=["Default","Rounded","Circle","WithShadow","Grayscale","Sepia","HoverGrow","HoverGlow","FullWidth","Landscape","Portrait","Gallery","WithFallback"];export{a as Circle,o as Default,d as FullWidth,m as Gallery,s as Grayscale,n as HoverGlow,c as HoverGrow,p as Landscape,l as Portrait,r as Rounded,i as Sepia,g as WithFallback,t as WithShadow,ne as __namedExportsOrder,ce as default};
