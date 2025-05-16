import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{P as s}from"./progress-DoAcxRHK.js";import{R as h}from"./index-BlmOqGMO.js";import"./index-yBjzXJbu.js";import"./index-Dkb_ZYRU.js";import"./index-BFNyJKjA.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-CtJ-PWby.js";import"./utils-C3T1saKV.js";const fe={title:"UI/Progress",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:1},description:"Progress value from 0 to 100"},className:{control:"text",description:"Additional CSS classes"}}},r={args:{value:60}},a={args:{value:0}},t={args:{value:25}},n={args:{value:50}},o={args:{value:75}},c={args:{value:100}},l={args:{value:40,className:"w-96"}},i={args:{value:70,className:"h-4"}},m={args:{value:85,className:"bg-blue-100 [&_[data-slot='progress-indicator']]:bg-blue-500"}},u={render:function(){const[g,ne]=h.useState(0);return h.useEffect(()=>{const x=globalThis.setInterval(()=>{ne(oe=>{const f=oe+10;return f>=100?(globalThis.clearInterval(x),100):f})},1e3);return()=>globalThis.clearInterval(x)},[]),e.jsxs("div",{className:"w-96 space-y-4",children:[e.jsx(s,{value:g}),e.jsxs("p",{className:"text-center text-sm text-muted-foreground",children:[g,"% Complete"]})]})}},d={render:()=>e.jsxs("div",{className:"w-96 space-y-4",children:[e.jsx("div",{className:"bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",children:e.jsx("div",{className:"bg-primary h-full w-1/2 animate-pulse"})}),e.jsx("p",{className:"text-center text-sm text-muted-foreground",children:"Loading..."})]})},p={render:()=>e.jsxs("div",{className:"w-96 space-y-2",children:[e.jsxs("div",{className:"flex justify-between text-sm text-muted-foreground",children:[e.jsx("span",{children:"Progress"}),e.jsxs("span",{children:[65,"%"]})]}),e.jsx(s,{value:65})]})},v={render:()=>e.jsxs("div",{className:"w-96 space-y-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsx("span",{children:"File 1"}),e.jsx("span",{children:"25%"})]}),e.jsx(s,{value:25})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsx("span",{children:"File 2"}),e.jsx("span",{children:"50%"})]}),e.jsx(s,{value:50})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsx("span",{children:"File 3"}),e.jsx("span",{children:"90%"})]}),e.jsx(s,{value:90})]})]})};var j,N,y;r.parameters={...r.parameters,docs:{...(j=r.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    value: 60
  }
}`,...(y=(N=r.parameters)==null?void 0:N.docs)==null?void 0:y.source}}};var b,w,P;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    value: 0
  }
}`,...(P=(w=a.parameters)==null?void 0:w.docs)==null?void 0:P.source}}};var S,C,I;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    value: 25
  }
}`,...(I=(C=t.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var T,E,F;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    value: 50
  }
}`,...(F=(E=n.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var R,H,L;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    value: 75
  }
}`,...(L=(H=o.parameters)==null?void 0:H.docs)==null?void 0:L.source}}};var Q,V,_;c.parameters={...c.parameters,docs:{...(Q=c.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    value: 100
  }
}`,...(_=(V=c.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};var z,D,M;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    value: 40,
    className: "w-96"
  }
}`,...(M=(D=l.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var W,A,O;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    value: 70,
    className: "h-4"
  }
}`,...(O=(A=i.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};var U,k,q;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    value: 85,
    className: "bg-blue-100 [&_[data-slot='progress-indicator']]:bg-blue-500"
  }
}`,...(q=(k=m.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var B,G,J;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: function InteractiveProgress() {
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
      const timer = globalThis.setInterval(() => {
        setProgress(prev => {
          const newValue = prev + 10;
          if (newValue >= 100) {
            globalThis.clearInterval(timer);
            return 100;
          }
          return newValue;
        });
      }, 1000);
      return () => globalThis.clearInterval(timer);
    }, []);
    return <div className="w-96 space-y-4">
        <Progress value={progress} />
        <p className="text-center text-sm text-muted-foreground">{progress}% Complete</p>
      </div>;
  }
}`,...(J=(G=u.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,X,Y;d.parameters={...d.parameters,docs:{...(K=d.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    // Progress component doesn't support indeterminate state by default
    // This is a demo of how it could be customized
    return <div className="w-96 space-y-4">
        <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
          <div className="bg-primary h-full w-1/2 animate-pulse" />
        </div>
        <p className="text-center text-sm text-muted-foreground">Loading...</p>
      </div>;
  }
}`,...(Y=(X=d.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;p.parameters={...p.parameters,docs:{...(Z=p.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => {
    const value = 65;
    return <div className="w-96 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{value}%</span>
        </div>
        <Progress value={value} />
      </div>;
  }
}`,...(ee=($=p.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var se,re,ae;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => {
    return <div className="w-96 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>File 1</span>
            <span>25%</span>
          </div>
          <Progress value={25} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>File 2</span>
            <span>50%</span>
          </div>
          <Progress value={50} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>File 3</span>
            <span>90%</span>
          </div>
          <Progress value={90} />
        </div>
      </div>;
  }
}`,...(ae=(re=v.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};const he=["Default","Empty","Quarter","Half","ThreeQuarters","Complete","CustomSized","CustomHeight","CustomColors","Interactive","IndeterminateProgress","WithLabel","MultipleProgress"];export{c as Complete,m as CustomColors,i as CustomHeight,l as CustomSized,r as Default,a as Empty,n as Half,d as IndeterminateProgress,u as Interactive,v as MultipleProgress,t as Quarter,o as ThreeQuarters,p as WithLabel,he as __namedExportsOrder,fe as default};
