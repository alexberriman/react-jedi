import{j as n}from"./jsx-runtime-Cf8x2fCZ.js";import{r as O}from"./index-tvICUrOf.js";import{I as s,a as t,b as e,c as r}from"./input-otp-DYwqJd8h.js";import"./index-yBjzXJbu.js";import"./utils-C3T1saKV.js";import"./createLucideIcon-CO2y_x_O.js";const Gn={title:"Components/Form/InputOTP",component:s,parameters:{layout:"centered",docs:{description:{component:`
An accessible one-time password (OTP) input component.
Built on the input-otp library, this component provides
a user-friendly way to enter verification codes, PINs, and other
numeric inputs that require digit-by-digit entry.

### Features
- Accessible keyboard navigation
- Automatic focus management
- Visual grouping and separators
- Support for different patterns (PIN, SMS code, 2FA)
- Customizable slot appearance
        `}}},tags:["autodocs"],argTypes:{maxLength:{control:{type:"number",min:1,max:12},description:"Maximum number of characters"},pattern:{control:"text",description:"Regex pattern to validate input"}}},a={args:{},render:()=>n.jsxs(s,{maxLength:6,children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(r,{}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]})},p={args:{},render:()=>n.jsx(s,{maxLength:4,pattern:"[0-9]*",children:n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2}),n.jsx(e,{index:3})]})})},u={args:{},render:()=>n.jsxs(s,{maxLength:6,children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(r,{}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]})},d={args:{},render:()=>n.jsxs(s,{maxLength:6,pattern:"[A-Z0-9]*",children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(r,{children:"-"}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]})},i={args:{},render:()=>n.jsxs(s,{maxLength:8,children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1})]}),n.jsx(r,{children:"•"}),n.jsxs(t,{children:[n.jsx(e,{index:2}),n.jsx(e,{index:3})]}),n.jsx(r,{children:"•"}),n.jsxs(t,{children:[n.jsx(e,{index:4}),n.jsx(e,{index:5})]}),n.jsx(r,{children:"•"}),n.jsxs(t,{children:[n.jsx(e,{index:6}),n.jsx(e,{index:7})]})]})},x={args:{},render:()=>n.jsxs(s,{maxLength:6,defaultValue:"123456",children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(r,{}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]})},c={args:{},render:()=>n.jsxs(s,{maxLength:6,disabled:!0,defaultValue:"123456",children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(r,{}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]})},l={args:{},render:function(){const[o,I]=O.useState("");return n.jsxs("div",{className:"space-y-4",children:[n.jsxs(s,{maxLength:6,value:o,onChange:I,children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(r,{}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]}),n.jsxs("p",{className:"text-sm text-muted-foreground",children:["Current value: ",o||"(empty)"]})]})}},P={args:{},render:function(){const[o,I]=O.useState(""),[On,Tn]=O.useState(!1);return n.jsxs("div",{className:"space-y-4",children:[n.jsxs(s,{maxLength:6,value:o,onChange:T=>{I(T),Tn(T.length===6)},children:[n.jsxs(t,{children:[n.jsx(e,{index:0}),n.jsx(e,{index:1}),n.jsx(e,{index:2})]}),n.jsx(r,{}),n.jsxs(t,{children:[n.jsx(e,{index:3}),n.jsx(e,{index:4}),n.jsx(e,{index:5})]})]}),On&&n.jsxs("p",{className:"text-sm text-green-600",children:["✓ Code complete! Value: ",o]})]})}},m={args:{},render:()=>n.jsx(s,{maxLength:4,pattern:"[0-9]*",className:"password",children:n.jsxs(t,{children:[n.jsx(e,{index:0,className:"password-char"}),n.jsx(e,{index:1,className:"password-char"}),n.jsx(e,{index:2,className:"password-char"}),n.jsx(e,{index:3,className:"password-char"})]})})};var j,S,h,g,C;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {} as React.ComponentProps<typeof InputOTP>,
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
}`,...(h=(S=a.parameters)==null?void 0:S.docs)==null?void 0:h.source},description:{story:"Default OTP input with 6 digits",...(C=(g=a.parameters)==null?void 0:g.docs)==null?void 0:C.description}}};var f,G,y,v,N;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {} as React.ComponentProps<typeof InputOTP>,
  render: () => <InputOTP maxLength={4} pattern="[0-9]*">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
}`,...(y=(G=p.parameters)==null?void 0:G.docs)==null?void 0:y.source},description:{story:"4-digit PIN input",...(N=(v=p.parameters)==null?void 0:v.docs)==null?void 0:N.description}}};var w,L,R,V,b;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {} as React.ComponentProps<typeof InputOTP>,
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
}`,...(R=(L=u.parameters)==null?void 0:L.docs)==null?void 0:R.source},description:{story:"SMS verification code with focus management",...(b=(V=u.parameters)==null?void 0:V.docs)==null?void 0:b.description}}};var D,A,W,F,M;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {} as React.ComponentProps<typeof InputOTP>,
  render: () => <InputOTP maxLength={6} pattern="[A-Z0-9]*">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator>-</InputOTPSeparator>
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...(W=(A=d.parameters)==null?void 0:A.docs)==null?void 0:W.source},description:{story:"Alphanumeric code (letters and numbers)",...(M=(F=d.parameters)==null?void 0:F.docs)==null?void 0:M.description}}};var E,k,Z,_,q;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {} as React.ComponentProps<typeof InputOTP>,
  render: () => <InputOTP maxLength={8}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator>•</InputOTPSeparator>
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator>•</InputOTPSeparator>
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
      <InputOTPSeparator>•</InputOTPSeparator>
      <InputOTPGroup>
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
    </InputOTP>
}`,...(Z=(k=i.parameters)==null?void 0:k.docs)==null?void 0:Z.source},description:{story:"Custom separator style",...(q=(_=i.parameters)==null?void 0:_.docs)==null?void 0:q.description}}};var z,B,H,J,K;x.parameters={...x.parameters,docs:{...(z=x.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {} as React.ComponentProps<typeof InputOTP>,
  render: () => <InputOTP maxLength={6} defaultValue="123456">
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
}`,...(H=(B=x.parameters)==null?void 0:B.docs)==null?void 0:H.source},description:{story:"With default value",...(K=(J=x.parameters)==null?void 0:J.docs)==null?void 0:K.description}}};var Q,U,X,Y,$;c.parameters={...c.parameters,docs:{...(Q=c.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {} as React.ComponentProps<typeof InputOTP>,
  render: () => <InputOTP maxLength={6} disabled defaultValue="123456">
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
}`,...(X=(U=c.parameters)==null?void 0:U.docs)==null?void 0:X.source},description:{story:"Disabled state",...($=(Y=c.parameters)==null?void 0:Y.docs)==null?void 0:$.description}}};var nn,en,tn,sn,rn;l.parameters={...l.parameters,docs:{...(nn=l.parameters)==null?void 0:nn.docs,source:{originalSource:`{
  args: {} as React.ComponentProps<typeof InputOTP>,
  render: function ControlledRender() {
    const [value, setValue] = React.useState("");
    return <div className="space-y-4">
        <InputOTP maxLength={6} value={value} onChange={setValue}>
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
        <p className="text-sm text-muted-foreground">Current value: {value || "(empty)"}</p>
      </div>;
  }
}`,...(tn=(en=l.parameters)==null?void 0:en.docs)==null?void 0:tn.source},description:{story:"Controlled component with value and onChange",...(rn=(sn=l.parameters)==null?void 0:sn.docs)==null?void 0:rn.description}}};var on,an,pn,un,dn;P.parameters={...P.parameters,docs:{...(on=P.parameters)==null?void 0:on.docs,source:{originalSource:`{
  args: {} as React.ComponentProps<typeof InputOTP>,
  render: function WithOnCompleteRender() {
    const [value, setValue] = React.useState("");
    const [isComplete, setIsComplete] = React.useState(false);
    return <div className="space-y-4">
        <InputOTP maxLength={6} value={value} onChange={newValue => {
        setValue(newValue);
        setIsComplete(newValue.length === 6);
      }}>
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

        {isComplete && <p className="text-sm text-green-600">✓ Code complete! Value: {value}</p>}
      </div>;
  }
}`,...(pn=(an=P.parameters)==null?void 0:an.docs)==null?void 0:pn.source},description:{story:"With onChange handler for form integration",...(dn=(un=P.parameters)==null?void 0:un.docs)==null?void 0:dn.description}}};var xn,cn,ln,Pn,mn;m.parameters={...m.parameters,docs:{...(xn=m.parameters)==null?void 0:xn.docs,source:{originalSource:`{
  args: {} as React.ComponentProps<typeof InputOTP>,
  render: () => <InputOTP maxLength={4} pattern="[0-9]*" className="password">
      <InputOTPGroup>
        <InputOTPSlot index={0} className="password-char" />
        <InputOTPSlot index={1} className="password-char" />
        <InputOTPSlot index={2} className="password-char" />
        <InputOTPSlot index={3} className="password-char" />
      </InputOTPGroup>
    </InputOTP>
}`,...(ln=(cn=m.parameters)==null?void 0:cn.docs)==null?void 0:ln.source},description:{story:"Password input style with masked characters",...(mn=(Pn=m.parameters)==null?void 0:Pn.docs)==null?void 0:mn.description}}};const yn=["Default","FourDigitPIN","SMSCode","AlphanumericCode","CustomSeparator","WithDefaultValue","Disabled","Controlled","WithOnComplete","Password"];export{d as AlphanumericCode,l as Controlled,i as CustomSeparator,a as Default,c as Disabled,p as FourDigitPIN,m as Password,u as SMSCode,x as WithDefaultValue,P as WithOnComplete,yn as __namedExportsOrder,Gn as default};
