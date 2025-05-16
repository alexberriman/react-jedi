import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as c}from"./index-tvICUrOf.js";import{c as xe}from"./index-DW48STyt.js";import{u as re}from"./index-CY5ieB2z.js";import{c as fe}from"./index-C3cpMgHl.js";import{u as ge}from"./index-ICJYJqR3.js";import{u as je}from"./index-C1xbsqtW.js";import{u as ve}from"./index-BDT2uzI7.js";import{P as de}from"./index-nFMdVv6h.js";import{c as B}from"./utils-C3T1saKV.js";import"./index-yBjzXJbu.js";import"./index-DTQC5rKR.js";import"./index-_r67kdfS.js";import"./index-fNjTmf9T.js";var y="Switch",[Ne,He]=fe(y),[ke,be]=Ne(y),ie=c.forwardRef((t,a)=>{const{__scopeSwitch:n,name:o,checked:r,defaultChecked:l,required:d,disabled:i,value:p="on",onCheckedChange:E,form:m,...P}=t,[h,u]=c.useState(null),A=re(a,f=>u(f)),R=c.useRef(!1),_=h?m||!!h.closest("form"):!0,[x,he]=ge({prop:r,defaultProp:l??!1,onChange:E,caller:y});return e.jsxs(ke,{scope:n,checked:x,disabled:i,children:[e.jsx(de.button,{type:"button",role:"switch","aria-checked":x,"aria-required":d,"data-state":pe(x),"data-disabled":i?"":void 0,disabled:i,value:p,...P,ref:A,onClick:xe(t.onClick,f=>{he(ue=>!ue),_&&(R.current=f.isPropagationStopped(),R.current||f.stopPropagation())})}),_&&e.jsx(me,{control:h,bubbles:!R.current,name:o,value:p,checked:x,required:d,disabled:i,form:m,style:{transform:"translateX(-100%)"}})]})});ie.displayName=y;var oe="SwitchThumb",le=c.forwardRef((t,a)=>{const{__scopeSwitch:n,...o}=t,r=be(oe,n);return e.jsx(de.span,{"data-state":pe(r.checked),"data-disabled":r.disabled?"":void 0,...o,ref:a})});le.displayName=oe;var we="SwitchBubbleInput",me=c.forwardRef(({__scopeSwitch:t,control:a,checked:n,bubbles:o=!0,...r},l)=>{const d=c.useRef(null),i=re(d,l),p=je(n),E=ve(a);return c.useEffect(()=>{const m=d.current;if(!m)return;const P=window.HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(P,"checked").set;if(p!==n&&u){const A=new Event("click",{bubbles:o});u.call(m,n),m.dispatchEvent(A)}},[p,n,o]),e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:n,...r,tabIndex:-1,ref:i,style:{...r.style,...E,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})});me.displayName=we;function pe(t){return t?"checked":"unchecked"}var Se=ie,Ce=le;function s({className:t,...a}){return e.jsx(Se,{"data-slot":"switch",className:B("peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",t),...a,children:e.jsx(Ce,{"data-slot":"switch-thumb",className:B("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")})})}s.__docgenInfo={description:"",methods:[],displayName:"Switch"};const qe={title:"Components/Form/Switch",component:s,parameters:{docs:{description:{component:`A modern toggle switch component that allows users to switch between on and off states. Built on top of Radix UI Switch.

## Usage

\`\`\`tsx
<Switch 
  checked={isEnabled}
  onCheckedChange={setIsEnabled}
/>
\`\`\``}}},argTypes:{checked:{control:"boolean",description:"The controlled state of the switch"},defaultChecked:{control:"boolean",description:"The default state for uncontrolled usage"},disabled:{control:"boolean",description:"Whether the switch is disabled"},onCheckedChange:{action:"checked changed",description:"Called when the state changes"}}},g={render:()=>e.jsx(s,{})},j={render:()=>e.jsx(s,{defaultChecked:!0})},v={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{disabled:!0}),e.jsx("span",{className:"text-sm text-muted-foreground",children:"Disabled (unchecked)"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{disabled:!0,defaultChecked:!0}),e.jsx("span",{className:"text-sm text-muted-foreground",children:"Disabled (checked)"})]})]})},ye=()=>{const[t,a]=c.useState(!1);return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{checked:t,onCheckedChange:a}),e.jsxs("span",{className:"text-sm",children:["Status: ",t?"On":"Off"]})]}),e.jsx("button",{onClick:()=>a(!t),className:"px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90",children:"Toggle programmatically"})]})},N={render:()=>e.jsx(ye,{})},k={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm font-medium",children:"WiFi"}),e.jsx(s,{defaultChecked:!0})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm font-medium",children:"Bluetooth"}),e.jsx(s,{})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm font-medium",children:"Airplane Mode"}),e.jsx(s,{})]})]})},Ee=()=>{const[t,a]=c.useState(!0),[n,o]=c.useState(!1),[r,l]=c.useState(!0);return e.jsxs("div",{className:"w-full max-w-md",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Email Preferences"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-sm",children:"Notifications"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Receive email about your account activity"})]}),e.jsx(s,{checked:t,onCheckedChange:a})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-sm",children:"Marketing"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Receive promotional emails and updates"})]}),e.jsx(s,{checked:n,onCheckedChange:o})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-sm",children:"Security Alerts"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Important security updates and alerts"})]}),e.jsx(s,{checked:r,onCheckedChange:l,disabled:!0})]})]})]})},b={render:()=>e.jsx(Ee,{})},w={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"scale-75",children:e.jsx(s,{})}),e.jsx("span",{className:"text-sm",children:"Small (scaled)"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{}),e.jsx("span",{className:"text-sm",children:"Default"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"scale-125",children:e.jsx(s,{})}),e.jsx("span",{className:"text-sm",children:"Large (scaled)"})]})]})},S={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{className:"data-[state=checked]:bg-green-500"}),e.jsx("span",{className:"text-sm",children:"Green when checked"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{className:"data-[state=checked]:bg-orange-500"}),e.jsx("span",{className:"text-sm",children:"Orange when checked"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{className:"data-[state=checked]:bg-purple-500"}),e.jsx("span",{className:"text-sm",children:"Purple when checked"})]})]})},Pe=()=>{const[t,a]=c.useState("light"),[n,o]=c.useState(!0),[r,l]=c.useState({email:!0,push:!1,sms:!1});return e.jsx("div",{className:"w-full max-w-md p-6 border rounded-lg space-y-6",children:e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Settings"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-sm",children:"Dark Mode"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Use dark theme across the app"})]}),e.jsx(s,{checked:t==="dark",onCheckedChange:d=>a(d?"dark":"light")})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-sm",children:"Auto-save"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Automatically save your work"})]}),e.jsx(s,{checked:n,onCheckedChange:o})]}),e.jsxs("div",{className:"border-t pt-4 mt-4",children:[e.jsx("p",{className:"font-medium text-sm mb-3",children:"Notifications"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Email"}),e.jsx(s,{checked:r.email,onCheckedChange:d=>l(i=>({...i,email:d}))})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Push"}),e.jsx(s,{checked:r.push,onCheckedChange:d=>l(i=>({...i,push:d}))})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"SMS"}),e.jsx(s,{checked:r.sms,onCheckedChange:d=>l(i=>({...i,sms:d}))})]})]})]})]})]})})},C={render:()=>e.jsx(Pe,{})};var D,T,M;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <Switch />
}`,...(M=(T=g.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var I,W,F;j.parameters={...j.parameters,docs:{...(I=j.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Switch defaultChecked />
}`,...(F=(W=j.parameters)==null?void 0:W.docs)==null?void 0:F.source}}};var O,L,U;v.parameters={...v.parameters,docs:{...(O=v.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Switch disabled />
        <span className="text-sm text-muted-foreground">Disabled (unchecked)</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch disabled defaultChecked />
        <span className="text-sm text-muted-foreground">Disabled (checked)</span>
      </div>
    </div>
}`,...(U=(L=v.parameters)==null?void 0:L.docs)==null?void 0:U.source}}};var z,H,q;N.parameters={...N.parameters,docs:{...(z=N.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...(q=(H=N.parameters)==null?void 0:H.docs)==null?void 0:q.source}}};var G,X,$;k.parameters={...k.parameters,docs:{...(G=k.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">WiFi</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Bluetooth</span>
        <Switch />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Airplane Mode</span>
        <Switch />
      </div>
    </div>
}`,...($=(X=k.parameters)==null?void 0:X.docs)==null?void 0:$.source}}};var J,K,Q;b.parameters={...b.parameters,docs:{...(J=b.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <WithFormExample />
}`,...(Q=(K=b.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var V,Y,Z;w.parameters={...w.parameters,docs:{...(V=w.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="scale-75">
          <Switch />
        </div>
        <span className="text-sm">Small (scaled)</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch />
        <span className="text-sm">Default</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="scale-125">
          <Switch />
        </div>
        <span className="text-sm">Large (scaled)</span>
      </div>
    </div>
}`,...(Z=(Y=w.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,se,te;S.parameters={...S.parameters,docs:{...(ee=S.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Switch className="data-[state=checked]:bg-green-500" />
        <span className="text-sm">Green when checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch className="data-[state=checked]:bg-orange-500" />
        <span className="text-sm">Orange when checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch className="data-[state=checked]:bg-purple-500" />
        <span className="text-sm">Purple when checked</span>
      </div>
    </div>
}`,...(te=(se=S.parameters)==null?void 0:se.docs)==null?void 0:te.source}}};var ae,ce,ne;C.parameters={...C.parameters,docs:{...(ae=C.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <AdvancedExampleComponent />
}`,...(ne=(ce=C.parameters)==null?void 0:ce.docs)==null?void 0:ne.source}}};const Ge=["Basic","DefaultChecked","Disabled","Controlled","WithLabels","WithForm","Sizes","CustomStyling","AdvancedExample"];export{C as AdvancedExample,g as Basic,N as Controlled,S as CustomStyling,j as DefaultChecked,v as Disabled,w as Sizes,b as WithForm,k as WithLabels,Ge as __namedExportsOrder,qe as default};
