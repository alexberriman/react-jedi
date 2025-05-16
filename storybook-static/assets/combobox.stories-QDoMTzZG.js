import{j as i}from"./jsx-runtime-Cf8x2fCZ.js";import{C as F}from"./combobox-cvJYIjnI.js";import"./index-yBjzXJbu.js";import"./index-BlmOqGMO.js";import"./utils-C3T1saKV.js";import"./button-MXz0hby-.js";import"./index-CtJ-PWby.js";import"./index-Y0L-LdVC.js";import"./index-CJrnEW2V.js";import"./index-DW48STyt.js";import"./index-Dkb_ZYRU.js";import"./index-CW4F2FBO.js";import"./index-5uDXI3f6.js";import"./index-Dz6nX4BC.js";import"./index-DCFLnjvQ.js";import"./index-BFNyJKjA.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-DZCApzUK.js";import"./index-D6GxElkK.js";import"./index-DT4_-hZ-.js";import"./index-CGaZw3rm.js";import"./x-DUkiYl9Y.js";import"./createLucideIcon-Dkfau1iJ.js";import"./card-BQPCVfwZ.js";import"./input-CjJObXXm.js";import"./label-D_M0g4lb.js";import"./aspect-ratio-LI9iySo7.js";import"./separator-Bqt3M-_D.js";import"./index-B5SwJHxK.js";import"./badge-BQEwSXkv.js";import"./avatar-D932CtUv.js";import"./container-CsoREV9z.js";import"./box-y1AJ49W5.js";import"./grid-DpiszY2f.js";import"./flex-FKx4Rg2S.js";import"./heading-CCgrqe0N.js";import"./text-BVNhesrM.js";import"./blockquote-DLQtMtae.js";import"./image-CPfDLinr.js";import"./form-B_0IetFP.js";import"./drawer-YfRFJixl.js";import"./checkbox-CUI7yF3j.js";import"./index-DZ2oWOeb.js";import"./index-BnD1EARC.js";import"./check-CUJLOwX8.js";import"./radio-group-ClMZKDDj.js";import"./index-DyE1diwt.js";import"./index-DftwpC-x.js";import"./index-xprPBo3d.js";import"./circle-D1j_VW2M.js";import"./index-Dimdf7jq.js";import"./index-BdQq_4o_.js";import"./index-DBBP8lBG.js";import"./index-DxLjD58x.js";import"./chevron-down-Cf7i8DHK.js";import"./toggle-group-okttMWJq.js";import"./index-BwNCywue.js";import"./slider-PAeCtJ5M.js";import"./collapsible-11ZejvT2.js";import"./index-LrhrNugO.js";import"./stack-8SfavyQu.js";import"./group-BjIXpt1O.js";import"./center-CyA1C_RU.js";import"./spacer-B2o--1vy.js";import"./simple-grid-DNT4eNBv.js";import"./masonry-DaXmjEvJ.js";import"./scroll-area-Bf-ed3wD.js";import"./resizable-WeRcQtpl.js";import"./tabs-DhPfnhI4.js";import"./table-BZmOlgke.js";import"./accordion-BPWZHYTj.js";import"./dropdown-menu-DiTA5w26.js";import"./index-BHXiSELX.js";import"./chevron-right-CY0U52rr.js";import"./context-menu-ei1zGIhi.js";import"./menubar-_aWf0q22.js";import"./toast-BzGKN9ud.js";import"./index-C4bLmoCR.js";import"./index-Dww2_CNS.js";import"./popover-B1FL9BO9.js";import"./hover-card-CP3a5EJd.js";import"./alert-WeFc9uZY.js";import"./alert-dialog-DfHwvXpz.js";import"./progress-DoAcxRHK.js";import"./navigation-menu-CfE7FdS2.js";import"./pagination-component-5P52cdgI.js";import"./chevron-left-eAO7cari.js";import"./ellipsis-Ch17Wgs2.js";import"./iframe-DCC0ObKS.js";import"./breadcrumb-D1o0T3-C.js";import"./calendar-Dmb6QI9q.js";import"./date-picker-Dmhp0Hqt.js";import"./input-otp-D1BHs6gH.js";const Co={title:"Components/Form/Combobox",component:F,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:"text",description:"The controlled value of the combobox"},onValueChange:{action:"value changed",description:"Callback fired when the value changes"},options:{control:"object",description:"Array of options to display"},placeholder:{control:"text",description:"Placeholder text when no value is selected"},searchPlaceholder:{control:"text",description:"Placeholder text for the search input"},emptyText:{control:"text",description:"Text to display when no options match the search"},disabled:{control:"boolean",description:"Whether the combobox is disabled"}}},O=[{value:"next",label:"Next.js"},{value:"sveltekit",label:"SvelteKit"},{value:"nuxt",label:"Nuxt.js"},{value:"remix",label:"Remix"},{value:"astro",label:"Astro"},{value:"gatsby",label:"Gatsby"},{value:"vite",label:"Vite"}],V=[{value:"apple",label:"Apple"},{value:"banana",label:"Banana"},{value:"orange",label:"Orange"},{value:"grape",label:"Grape"},{value:"strawberry",label:"Strawberry"},{value:"watermelon",label:"Watermelon"},{value:"mango",label:"Mango"},{value:"pineapple",label:"Pineapple"}],G=[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"},{value:"au",label:"Australia"},{value:"de",label:"Germany"},{value:"fr",label:"France"},{value:"jp",label:"Japan"},{value:"br",label:"Brazil"}],e={args:{options:O,placeholder:"Select framework...",searchPlaceholder:"Search framework...",emptyText:"No framework found."}},o={args:{...e.args,value:"next"}},r={args:{options:V,placeholder:"Select a fruit...",searchPlaceholder:"Search fruits...",emptyText:"No fruit found."}},t={args:{options:G,placeholder:"Select a country...",searchPlaceholder:"Search countries...",emptyText:"No country found."}},a={args:{...e.args,value:"vite",disabled:!0}},l={render:L=>i.jsx("div",{className:"w-96",children:i.jsx(F,{...L})}),args:{...e.args}},s={args:{options:[],placeholder:"No options available",searchPlaceholder:"Type to search...",emptyText:"No options to display."}},n={args:{options:[{value:"long1",label:"This is a very long option label that might need truncation"},{value:"long2",label:"Another extremely long option label to test how the component handles overflow"},{value:"long3",label:"Yet another super duper long option label for testing purposes"},{value:"short",label:"Short"}],placeholder:"Select an option with long labels..."}};var p,m,c;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    options: frameworks,
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework...",
    emptyText: "No framework found."
  }
}`,...(c=(m=e.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var u,d,h;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    value: "next"
  }
}`,...(h=(d=o.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};var b,g,v;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    options: fruits,
    placeholder: "Select a fruit...",
    searchPlaceholder: "Search fruits...",
    emptyText: "No fruit found."
  }
}`,...(v=(g=r.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var f,x,y;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    options: countries,
    placeholder: "Select a country...",
    searchPlaceholder: "Search countries...",
    emptyText: "No country found."
  }
}`,...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var S,w,T;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    value: "vite",
    disabled: true
  }
}`,...(T=(w=a.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var N,C,P;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => <div className="w-96">
      <Combobox {...args} />
    </div>,
  args: {
    ...Default.args
  }
}`,...(P=(C=l.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var k,j,D;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    options: [],
    placeholder: "No options available",
    searchPlaceholder: "Type to search...",
    emptyText: "No options to display."
  }
}`,...(D=(j=s.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var A,W,E;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    options: [{
      value: "long1",
      label: "This is a very long option label that might need truncation"
    }, {
      value: "long2",
      label: "Another extremely long option label to test how the component handles overflow"
    }, {
      value: "long3",
      label: "Yet another super duper long option label for testing purposes"
    }, {
      value: "short",
      label: "Short"
    }],
    placeholder: "Select an option with long labels..."
  }
}`,...(E=(W=n.parameters)==null?void 0:W.docs)==null?void 0:E.source}}};const Po=["Default","WithValue","Fruits","Countries","Disabled","CustomWidth","EmptyOptions","LongLabels"];export{t as Countries,l as CustomWidth,e as Default,a as Disabled,s as EmptyOptions,r as Fruits,n as LongLabels,o as WithValue,Po as __namedExportsOrder,Co as default};
