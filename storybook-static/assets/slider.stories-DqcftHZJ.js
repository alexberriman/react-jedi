import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as t}from"./index-BlmOqGMO.js";import{S as s}from"./slider-PAeCtJ5M.js";import"./index-yBjzXJbu.js";import"./index-BdQq_4o_.js";import"./index-DW48STyt.js";import"./index-CtJ-PWby.js";import"./index-Dkb_ZYRU.js";import"./index-Dz6nX4BC.js";import"./index-5uDXI3f6.js";import"./index-xprPBo3d.js";import"./index-DZ2oWOeb.js";import"./index-BnD1EARC.js";import"./index-BFNyJKjA.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-DftwpC-x.js";import"./utils-C3T1saKV.js";const Ee={title:"UI/Slider",component:s,parameters:{docs:{description:{component:`A customizable slider component for selecting values from a range. Built on top of Radix UI Slider.

## Usage

\`\`\`tsx
<Slider
  defaultValue={[50]}
  min={0}
  max={100}
  onValueChange={(value) => console.log(value)}
/>
\`\`\``}}},argTypes:{defaultValue:{control:"object",description:"The default value of the slider"},value:{control:"object",description:"The controlled value of the slider"},min:{control:"number",description:"The minimum value of the slider"},max:{control:"number",description:"The maximum value of the slider"},step:{control:"number",description:"The step size of the slider"},disabled:{control:"boolean",description:"Whether the slider is disabled"},orientation:{control:"radio",options:["horizontal","vertical"],description:"The orientation of the slider"},onValueChange:{action:"value changed",description:"Called when the value changes"}}},m={render:()=>e.jsx(s,{defaultValue:[50]})},i={render:()=>e.jsx(s,{defaultValue:[33],min:0,max:100})},d={render:()=>e.jsx(s,{defaultValue:[25,75],min:0,max:100})},c={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{defaultValue:[50],step:10}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Step: 10"})]})},u={render:()=>e.jsx(s,{defaultValue:[50],disabled:!0})},ne=()=>{const[a,r]=t.useState([50]);return e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{value:a,onValueChange:r}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Value: ",a[0]]})]})},p={render:()=>e.jsx(ne,{})},le=()=>{const[a,r]=t.useState([25,75]);return e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{value:a,onValueChange:r,min:0,max:100}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Range: ",a[0]," - ",a[1]]})]})},x={render:()=>e.jsx(le,{})},h={render:()=>e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"Temperature (°C)"}),e.jsx(s,{defaultValue:[22],min:16,max:30,step:.5})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"Volume"}),e.jsx(s,{defaultValue:[70],min:0,max:100,step:5})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"Year"}),e.jsx(s,{defaultValue:[2020],min:1990,max:2024,step:1})]})]})},oe=()=>{const[a,r]=t.useState([100,500]);return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"Price Range"}),e.jsx(s,{value:a,onValueChange:r,min:0,max:1e3,step:10})]}),e.jsxs("div",{className:"flex justify-between text-sm text-muted-foreground",children:[e.jsxs("span",{children:["$",a[0]]}),e.jsxs("span",{children:["$",a[1]]})]})]})},j={render:()=>e.jsx(oe,{})},me=()=>{const[a,r]=t.useState([180]),[n,b]=t.useState([75]),[l,S]=t.useState([50]),o=`hsl(${a[0]}, ${n[0]}%, ${l[0]}%)`;return e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"w-full h-24 rounded-lg border",style:{backgroundColor:o}}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-medium mb-2",children:["Hue: ",a[0],"°"]}),e.jsx(s,{value:a,onValueChange:r,min:0,max:360,step:1})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-medium mb-2",children:["Saturation: ",n[0],"%"]}),e.jsx(s,{value:n,onValueChange:b,min:0,max:100,step:1})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-medium mb-2",children:["Lightness: ",l[0],"%"]}),e.jsx(s,{value:l,onValueChange:S,min:0,max:100,step:1})]})]}),e.jsx("p",{className:"text-sm text-muted-foreground font-mono",children:o})]})},f={render:()=>e.jsx(me,{})},g={render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"Default size"}),e.jsx(s,{defaultValue:[50]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"Larger (with custom styles)"}),e.jsx(s,{defaultValue:[50],className:"[&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"Smaller (with custom styles)"}),e.jsx(s,{defaultValue:[50],className:"[&_[data-slot=slider-track]]:h-1 [&_[data-slot=slider-thumb]]:h-3 [&_[data-slot=slider-thumb]]:w-3"})]})]})},ie=()=>{const[a,r]=t.useState([75]),[n,b]=t.useState([100]),[l,S]=t.useState([100]),o=te=>{te.preventDefault(),alert(`Brightness: ${a[0]}%, Contrast: ${n[0]}%, Opacity: ${l[0]}%`)};return e.jsxs("form",{onSubmit:o,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"brightness",className:"text-sm font-medium mb-2 block",children:["Brightness: ",a[0],"%"]}),e.jsx(s,{id:"brightness",value:a,onValueChange:r,min:0,max:100,step:1})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"contrast",className:"text-sm font-medium mb-2 block",children:["Contrast: ",n[0],"%"]}),e.jsx(s,{id:"contrast",value:n,onValueChange:b,min:0,max:200,step:1})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"opacity",className:"text-sm font-medium mb-2 block",children:["Opacity: ",l[0],"%"]}),e.jsx(s,{id:"opacity",value:l,onValueChange:S,min:0,max:100,step:1})]}),e.jsx("button",{type:"submit",className:"px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90",children:"Apply Settings"})]})},v={render:()=>e.jsx(ie,{})};var V,N,C;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <Slider defaultValue={[50]} />
}`,...(C=(N=m.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};var y,R,_;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Slider defaultValue={[33]} min={0} max={100} />
}`,...(_=(R=i.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var E,k,w;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <Slider defaultValue={[25, 75]} min={0} max={100} />
}`,...(w=(k=d.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var P,T,$;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
      <Slider defaultValue={[50]} step={10} />
      <p className="text-sm text-muted-foreground">Step: 10</p>
    </div>
}`,...($=(T=c.parameters)==null?void 0:T.docs)==null?void 0:$.source}}};var z,F,B;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <Slider defaultValue={[50]} disabled />
}`,...(B=(F=u.parameters)==null?void 0:F.docs)==null?void 0:B.source}}};var D,L,O;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...(O=(L=p.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};var U,W,A;x.parameters={...x.parameters,docs:{...(U=x.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <RangeControlledExample />
}`,...(A=(W=x.parameters)==null?void 0:W.docs)==null?void 0:A.source}}};var H,I,Y;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Temperature (°C)</p>
        <Slider defaultValue={[22]} min={16} max={30} step={0.5} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Volume</p>
        <Slider defaultValue={[70]} min={0} max={100} step={5} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Year</p>
        <Slider defaultValue={[2020]} min={1990} max={2024} step={1} />
      </div>
    </div>
}`,...(Y=(I=h.parameters)==null?void 0:I.docs)==null?void 0:Y.source}}};var q,G,J;j.parameters={...j.parameters,docs:{...(q=j.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <PriceRangeExample />
}`,...(J=(G=j.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,M,Q;f.parameters={...f.parameters,docs:{...(K=f.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <ColorPickerExample />
}`,...(Q=(M=f.parameters)==null?void 0:M.docs)==null?void 0:Q.source}}};var X,Z,ee;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">
      <div>
        <p className="text-sm font-medium mb-2">Default size</p>
        <Slider defaultValue={[50]} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Larger (with custom styles)</p>
        <Slider defaultValue={[50]} className="[&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Smaller (with custom styles)</p>
        <Slider defaultValue={[50]} className="[&_[data-slot=slider-track]]:h-1 [&_[data-slot=slider-thumb]]:h-3 [&_[data-slot=slider-thumb]]:w-3" />
      </div>
    </div>
}`,...(ee=(Z=g.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var se,ae,re;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => <FormExample />
}`,...(re=(ae=v.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};const ke=["Basic","SingleValue","Range","SteppedSlider","Disabled","Controlled","ControlledRange","CustomRange","PriceRange","ColorPicker","VariableSizes","WithForm"];export{m as Basic,f as ColorPicker,p as Controlled,x as ControlledRange,h as CustomRange,u as Disabled,j as PriceRange,d as Range,i as SingleValue,c as SteppedSlider,g as VariableSizes,v as WithForm,ke as __namedExportsOrder,Ee as default};
