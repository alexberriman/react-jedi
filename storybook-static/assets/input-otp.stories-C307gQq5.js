import{j as n}from"./jsx-runtime-Cf8x2fCZ.js";import{I as r,a as t,b as e,c as o}from"./input-otp-D1BHs6gH.js";import"./index-yBjzXJbu.js";import"./index-BlmOqGMO.js";import"./utils-C3T1saKV.js";import"./createLucideIcon-Dkfau1iJ.js";const cn={title:"Components/Form/InputOTP",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:{type:"text"},description:"Current value of the OTP input"},onChange:{description:"Callback when value changes"},maxLength:{control:{type:"number"},description:"Maximum number of characters",defaultValue:6},pattern:{control:{type:"text"},description:"Regex pattern for validation"},disabled:{control:{type:"boolean"},description:"Whether the input is disabled"}}},p={render:()=>n.jsxs(r,{maxLength:6,children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(o,{}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]})},i={render:()=>n.jsx(r,{maxLength:4,children:n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2}),n.jsx(e,{index:3})]})})},d={render:()=>n.jsxs(r,{maxLength:8,children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1})]}),n.jsx(o,{}),n.jsxs(t,{children:[n.jsx(e,{index:2}),n.jsx(e,{index:3})]}),n.jsx(o,{}),n.jsxs(t,{children:[n.jsx(e,{index:4}),n.jsx(e,{index:5})]}),n.jsx(o,{}),n.jsxs(t,{children:[n.jsx(e,{index:6}),n.jsx(e,{index:7})]})]})},u={render:()=>n.jsxs(r,{maxLength:6,children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2}),n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})},a={args:{value:"123"},render:s=>n.jsxs(r,{...s,children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(o,{}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]})},x={args:{disabled:!0},render:s=>n.jsxs(r,{...s,children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(o,{}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]})},l={args:{pattern:"^[0-9]*$"},render:s=>n.jsxs(r,{...s,children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(o,{}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]})},c={args:{pattern:"^[A-Za-z0-9]*$",maxLength:8},render:s=>n.jsxs(r,{...s,children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2}),n.jsx(e,{index:3})]}),n.jsx(o,{}),n.jsxs(t,{children:[n.jsx(e,{index:4}),n.jsx(e,{index:5}),n.jsx(e,{index:6}),n.jsx(e,{index:7})]})]})},O={args:{className:"text-blue-500",containerClassName:"gap-4"},render:s=>n.jsxs(r,{...s,children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(o,{}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]})};var P,T,I,j,m;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...(I=(T=p.parameters)==null?void 0:T.docs)==null?void 0:I.source},description:{story:"Default OTP input with 6 digits grouped by 3",...(m=(j=p.parameters)==null?void 0:j.docs)==null?void 0:m.description}}};var S,g,h,G,y;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <InputOTP maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
}`,...(h=(g=i.parameters)==null?void 0:g.docs)==null?void 0:h.source},description:{story:"Single group of 4 digits",...(y=(G=i.parameters)==null?void 0:G.docs)==null?void 0:y.description}}};var b,C,f,L,v;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <InputOTP maxLength={8}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
    </InputOTP>
}`,...(f=(C=d.parameters)==null?void 0:C.docs)==null?void 0:f.source},description:{story:"Custom pattern with dashes between groups",...(v=(L=d.parameters)==null?void 0:L.docs)==null?void 0:v.description}}};var D,N,w,A,$;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <InputOTP maxLength={6}>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
      <InputOTPSlot index={3} />
      <InputOTPSlot index={4} />
      <InputOTPSlot index={5} />
    </InputOTP>
}`,...(w=(N=u.parameters)==null?void 0:N.docs)==null?void 0:w.source},description:{story:"Individual slots without grouping",...($=(A=u.parameters)==null?void 0:A.docs)==null?void 0:$.description}}};var F,W,z,E,M;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    value: "123"
  },
  render: args => <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...(z=(W=a.parameters)==null?void 0:W.docs)==null?void 0:z.source},description:{story:"With controlled value",...(M=(E=a.parameters)==null?void 0:E.docs)==null?void 0:M.description}}};var R,Z,_,k,V;x.parameters={...x.parameters,docs:{...(R=x.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...(_=(Z=x.parameters)==null?void 0:Z.docs)==null?void 0:_.source},description:{story:"Disabled state",...(V=(k=x.parameters)==null?void 0:k.docs)==null?void 0:V.description}}};var q,B,H,J,K;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    pattern: "^[0-9]*$"
  },
  render: args => <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...(H=(B=l.parameters)==null?void 0:B.docs)==null?void 0:H.source},description:{story:"With pattern validation (only numbers)",...(K=(J=l.parameters)==null?void 0:J.docs)==null?void 0:K.description}}};var Q,U,X,Y,nn;c.parameters={...c.parameters,docs:{...(Q=c.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    pattern: "^[A-Za-z0-9]*$",
    maxLength: 8
  },
  render: args => <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
    </InputOTP>
}`,...(X=(U=c.parameters)==null?void 0:U.docs)==null?void 0:X.source},description:{story:"Mixed alphanumeric pattern",...(nn=(Y=c.parameters)==null?void 0:Y.docs)==null?void 0:nn.description}}};var en,tn,rn,sn,on;O.parameters={...O.parameters,docs:{...(en=O.parameters)==null?void 0:en.docs,source:{originalSource:`{
  args: {
    className: "text-blue-500",
    containerClassName: "gap-4"
  },
  render: args => <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...(rn=(tn=O.parameters)==null?void 0:tn.docs)==null?void 0:rn.source},description:{story:"Custom styling",...(on=(sn=O.parameters)==null?void 0:sn.docs)==null?void 0:on.description}}};const On=["Default","FourDigits","CustomPattern","Segmented","Controlled","Disabled","NumericOnly","Alphanumeric","CustomStyling"];export{c as Alphanumeric,a as Controlled,d as CustomPattern,O as CustomStyling,p as Default,x as Disabled,i as FourDigits,l as NumericOnly,u as Segmented,On as __namedExportsOrder,cn as default};
