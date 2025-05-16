import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{T as r}from"./drawer-YfRFJixl.js";import{r as y}from"./combobox-cvJYIjnI.js";import{L as s}from"./label-D_M0g4lb.js";import"./index-yBjzXJbu.js";import"./index-BlmOqGMO.js";import"./utils-C3T1saKV.js";import"./index-CJrnEW2V.js";import"./index-DW48STyt.js";import"./index-CtJ-PWby.js";import"./index-Dkb_ZYRU.js";import"./index-CW4F2FBO.js";import"./index-5uDXI3f6.js";import"./index-Dz6nX4BC.js";import"./index-DCFLnjvQ.js";import"./index-BFNyJKjA.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-DZCApzUK.js";import"./index-D6GxElkK.js";import"./index-DT4_-hZ-.js";import"./index-CGaZw3rm.js";import"./button-MXz0hby-.js";import"./index-Y0L-LdVC.js";import"./x-DUkiYl9Y.js";import"./createLucideIcon-Dkfau1iJ.js";import"./card-BQPCVfwZ.js";import"./input-CjJObXXm.js";import"./aspect-ratio-LI9iySo7.js";import"./separator-Bqt3M-_D.js";import"./index-B5SwJHxK.js";import"./badge-BQEwSXkv.js";import"./avatar-D932CtUv.js";import"./container-CsoREV9z.js";import"./box-y1AJ49W5.js";import"./grid-DpiszY2f.js";import"./flex-FKx4Rg2S.js";import"./heading-CCgrqe0N.js";import"./text-BVNhesrM.js";import"./blockquote-DLQtMtae.js";import"./image-CPfDLinr.js";import"./form-B_0IetFP.js";import"./checkbox-CUI7yF3j.js";import"./index-DZ2oWOeb.js";import"./index-BnD1EARC.js";import"./check-CUJLOwX8.js";import"./radio-group-ClMZKDDj.js";import"./index-DyE1diwt.js";import"./index-DftwpC-x.js";import"./index-xprPBo3d.js";import"./circle-D1j_VW2M.js";import"./index-Dimdf7jq.js";import"./index-BdQq_4o_.js";import"./index-DBBP8lBG.js";import"./index-DxLjD58x.js";import"./chevron-down-Cf7i8DHK.js";import"./toggle-group-okttMWJq.js";import"./index-BwNCywue.js";import"./slider-PAeCtJ5M.js";import"./collapsible-11ZejvT2.js";import"./index-LrhrNugO.js";import"./stack-8SfavyQu.js";import"./group-BjIXpt1O.js";import"./center-CyA1C_RU.js";import"./spacer-B2o--1vy.js";import"./simple-grid-DNT4eNBv.js";import"./masonry-DaXmjEvJ.js";import"./scroll-area-Bf-ed3wD.js";import"./resizable-WeRcQtpl.js";import"./tabs-DhPfnhI4.js";import"./table-BZmOlgke.js";import"./accordion-BPWZHYTj.js";import"./dropdown-menu-DiTA5w26.js";import"./index-BHXiSELX.js";import"./chevron-right-CY0U52rr.js";import"./context-menu-ei1zGIhi.js";import"./menubar-_aWf0q22.js";import"./toast-BzGKN9ud.js";import"./index-C4bLmoCR.js";import"./index-Dww2_CNS.js";import"./popover-B1FL9BO9.js";import"./hover-card-CP3a5EJd.js";import"./alert-WeFc9uZY.js";import"./alert-dialog-DfHwvXpz.js";import"./progress-DoAcxRHK.js";import"./navigation-menu-CfE7FdS2.js";import"./pagination-component-5P52cdgI.js";import"./chevron-left-eAO7cari.js";import"./ellipsis-Ch17Wgs2.js";import"./iframe-DCC0ObKS.js";import"./breadcrumb-D1o0T3-C.js";import"./calendar-Dmb6QI9q.js";import"./date-picker-Dmhp0Hqt.js";import"./input-otp-D1BHs6gH.js";const Zr={title:"Components/Forms/Textarea",component:r,parameters:{layout:"centered",docs:{description:{component:"A multi-line text input component for longer text content."}}},tags:["autodocs"]},o={args:{placeholder:"Enter your message...",rows:4}},t={args:{defaultValue:"This is some example text that shows how the textarea looks with content.",rows:4}},n={args:{placeholder:"This textarea is disabled",disabled:!0,rows:4}},i={args:{defaultValue:"This text is read-only and cannot be edited.",readOnly:!0,rows:4}},c={args:{placeholder:"This textarea has 6 rows",rows:6}},l={args:{placeholder:"Maximum 100 characters allowed",maxLength:100,rows:4}},m={render:()=>e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{htmlFor:"message",children:"Message"}),e.jsx(r,{id:"message",placeholder:"Type your message here...",rows:4})]})},d={render:()=>e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{htmlFor:"required-message",children:"Required Message"}),e.jsx(r,{id:"required-message",placeholder:"This field is required",required:!0,rows:4})]})},p={name:"From JSON Specification",parameters:{docs:{source:{code:`
const spec: TextareaSpec = {
  type: "Textarea",
  id: "comment-textarea",
  name: "comment",
  placeholder: "Leave a comment...",
  rows: 5,
  maxLength: 500,
  className: "w-full"
};

return render({
  spec,
  resolver: defaultComponentResolver
});
        `}}},render:()=>{const a=y({type:"Textarea",id:"comment-textarea",name:"comment",placeholder:"Leave a comment...",rows:5,maxLength:500,className:"w-full"});return e.jsx(e.Fragment,{children:a})}},u={name:"Resizable Textarea",render:()=>{const a=y({type:"Textarea",placeholder:"This textarea can be resized",rows:4,resize:"both",className:"min-h-[100px] resize"});return e.jsx(e.Fragment,{children:a})}},h={name:"Non-resizable Textarea",render:()=>{const a=y({type:"Textarea",placeholder:"This textarea cannot be resized",rows:4,resize:"none",className:"resize-none"});return e.jsx(e.Fragment,{children:a})}},x={name:"Error State",render:()=>e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{htmlFor:"error-textarea",children:"Description"}),e.jsx(r,{id:"error-textarea",placeholder:"Enter description",className:"border-red-500 focus:border-red-500",rows:4}),e.jsx("p",{className:"text-sm text-red-500",children:"Description is required"})]})},b={name:"With Helper Text",render:()=>e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{htmlFor:"helper-textarea",children:"Bio"}),e.jsx(r,{id:"helper-textarea",placeholder:"Tell us about yourself",rows:4}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Write a short bio. Maximum 200 characters."})]})},g={name:"Full Width in Form",render:()=>e.jsxs("form",{className:"w-full max-w-md space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{htmlFor:"subject",children:"Subject"}),e.jsx("input",{id:"subject",type:"text",placeholder:"Message subject",className:"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{htmlFor:"message",children:"Message"}),e.jsx(r,{id:"message",placeholder:"Type your message here...",rows:6,className:"w-full"})]}),e.jsx("button",{type:"submit",className:"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",children:"Send Message"})]})},f={name:"Component Showcase",parameters:{layout:"padded"},render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Sizes & States"}),e.jsxs("div",{className:"grid gap-4",children:[e.jsx(r,{placeholder:"Default textarea",rows:3}),e.jsx(r,{placeholder:"Disabled textarea",disabled:!0,rows:3}),e.jsx(r,{defaultValue:"Read-only content",readOnly:!0,rows:3})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"With Labels"}),e.jsxs("div",{className:"grid gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{children:"Normal"}),e.jsx(r,{placeholder:"Enter text...",rows:3})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{children:"Required *"}),e.jsx(r,{placeholder:"This field is required",required:!0,rows:3})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Resize Options"}),e.jsxs("div",{className:"grid gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{children:"Resizable (both)"}),e.jsx(r,{placeholder:"Drag corner to resize",className:"resize",rows:3})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{children:"Vertical only"}),e.jsx(r,{placeholder:"Can only resize vertically",className:"resize-y",rows:3})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{children:"No resize"}),e.jsx(r,{placeholder:"Cannot be resized",className:"resize-none",rows:3})]})]})]})]})};var w,N,j;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter your message...",
    rows: 4
  }
}`,...(j=(N=o.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var T,S,z;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    defaultValue: "This is some example text that shows how the textarea looks with content.",
    rows: 4
  }
}`,...(z=(S=t.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var L,F,R;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
    rows: 4
  }
}`,...(R=(F=n.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var q,C,M;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    defaultValue: "This text is read-only and cannot be edited.",
    readOnly: true,
    rows: 4
  }
}`,...(M=(C=i.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var D,W,E;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    placeholder: "This textarea has 6 rows",
    rows: 6
  }
}`,...(E=(W=c.parameters)==null?void 0:W.docs)==null?void 0:E.source}}};var O,V,k;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    placeholder: "Maximum 100 characters allowed",
    maxLength: 100,
    rows: 4
  }
}`,...(k=(V=l.parameters)==null?void 0:V.docs)==null?void 0:k.source}}};var H,J,B;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here..." rows={4} />
    </div>
}`,...(B=(J=m.parameters)==null?void 0:J.docs)==null?void 0:B.source}}};var _,A,G;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">
      <Label htmlFor="required-message">Required Message</Label>
      <Textarea id="required-message" placeholder="This field is required" required rows={4} />
    </div>
}`,...(G=(A=d.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};var I,K,P;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: "From JSON Specification",
  parameters: {
    docs: {
      source: {
        code: \`
const spec: TextareaSpec = {
  type: "Textarea",
  id: "comment-textarea",
  name: "comment",
  placeholder: "Leave a comment...",
  rows: 5,
  maxLength: 500,
  className: "w-full"
};

return render({
  spec,
  resolver: defaultComponentResolver
});
        \`
      }
    }
  },
  render: () => {
    const spec: TextareaSpec = {
      type: "Textarea",
      id: "comment-textarea",
      name: "comment",
      placeholder: "Leave a comment...",
      rows: 5,
      maxLength: 500,
      className: "w-full"
    };
    const Component = render(spec);
    return <>{Component}</>;
  }
}`,...(P=(K=p.parameters)==null?void 0:K.docs)==null?void 0:P.source}}};var Q,U,X;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  name: "Resizable Textarea",
  render: () => {
    const spec: TextareaSpec = {
      type: "Textarea",
      placeholder: "This textarea can be resized",
      rows: 4,
      resize: "both",
      className: "min-h-[100px] resize"
    };
    const Component = render(spec);
    return <>{Component}</>;
  }
}`,...(X=(U=u.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,$;h.parameters={...h.parameters,docs:{...(Y=h.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: "Non-resizable Textarea",
  render: () => {
    const spec: TextareaSpec = {
      type: "Textarea",
      placeholder: "This textarea cannot be resized",
      rows: 4,
      resize: "none",
      className: "resize-none"
    };
    const Component = render(spec);
    return <>{Component}</>;
  }
}`,...($=(Z=h.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,re,se;x.parameters={...x.parameters,docs:{...(ee=x.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  name: "Error State",
  render: () => <div className="space-y-2">
      <Label htmlFor="error-textarea">Description</Label>
      <Textarea id="error-textarea" placeholder="Enter description" className="border-red-500 focus:border-red-500" rows={4} />
      <p className="text-sm text-red-500">Description is required</p>
    </div>
}`,...(se=(re=x.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var ae,oe,te;b.parameters={...b.parameters,docs:{...(ae=b.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  name: "With Helper Text",
  render: () => <div className="space-y-2">
      <Label htmlFor="helper-textarea">Bio</Label>
      <Textarea id="helper-textarea" placeholder="Tell us about yourself" rows={4} />
      <p className="text-sm text-muted-foreground">Write a short bio. Maximum 200 characters.</p>
    </div>
}`,...(te=(oe=b.parameters)==null?void 0:oe.docs)==null?void 0:te.source}}};var ne,ie,ce;g.parameters={...g.parameters,docs:{...(ne=g.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  name: "Full Width in Form",
  render: () => <form className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <input id="subject" type="text" placeholder="Message subject" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Type your message here..." rows={6} className="w-full" />
      </div>
      <button type="submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        Send Message
      </button>
    </form>
}`,...(ce=(ie=g.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var le,me,de;f.parameters={...f.parameters,docs:{...(le=f.parameters)==null?void 0:le.docs,source:{originalSource:`{
  name: "Component Showcase",
  parameters: {
    layout: "padded"
  },
  render: () => <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes & States</h3>
        <div className="grid gap-4">
          <Textarea placeholder="Default textarea" rows={3} />
          <Textarea placeholder="Disabled textarea" disabled rows={3} />
          <Textarea defaultValue="Read-only content" readOnly rows={3} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Labels</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Normal</Label>
            <Textarea placeholder="Enter text..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Required *</Label>
            <Textarea placeholder="This field is required" required rows={3} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Resize Options</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Resizable (both)</Label>
            <Textarea placeholder="Drag corner to resize" className="resize" rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Vertical only</Label>
            <Textarea placeholder="Can only resize vertically" className="resize-y" rows={3} />
          </div>
          <div className="space-y-2">
            <Label>No resize</Label>
            <Textarea placeholder="Cannot be resized" className="resize-none" rows={3} />
          </div>
        </div>
      </div>
    </div>
}`,...(de=(me=f.parameters)==null?void 0:me.docs)==null?void 0:de.source}}};const $r=["Default","WithValue","Disabled","ReadOnly","CustomRows","MaxLength","WithLabel","Required","FromJsonSpec","ResizableTextarea","NoResizeTextarea","ErrorState","HelperText","FullWidthForm","Showcase"];export{c as CustomRows,o as Default,n as Disabled,x as ErrorState,p as FromJsonSpec,g as FullWidthForm,b as HelperText,l as MaxLength,h as NoResizeTextarea,i as ReadOnly,d as Required,u as ResizableTextarea,f as Showcase,m as WithLabel,t as WithValue,$r as __namedExportsOrder,Zr as default};
