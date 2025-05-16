import{j as u}from"./jsx-runtime-Cf8x2fCZ.js";import{r as d}from"./index-tvICUrOf.js";import{c as x}from"./utils-C3T1saKV.js";const c={xs:"0.25rem",sm:"0.5rem",md:"1rem",lg:"1.5rem",xl:"2rem","2xl":"3rem","3xl":"4rem","4xl":"6rem","5xl":"8rem","6xl":"10rem","7xl":"12rem","8xl":"14rem","9xl":"16rem"},a=d.forwardRef(({className:r,size:t="md",orientation:n="vertical",showGuide:p=!1,style:i,...m},s)=>{const l=c[t],e=n==="vertical",o={[e?"height":"width"]:l,[e?"width":"height"]:e?"100%":l,flexShrink:0,...i};return u.jsx("div",{ref:s,className:x("block",e&&"min-h-0",!e&&"min-w-0 inline-block",r),style:o,"aria-hidden":"true",...m})});a.displayName="Spacer";a.__docgenInfo={description:"",methods:[],displayName:"Spacer",props:{size:{required:!1,tsType:{name:"union",raw:`| "xs"
| "sm"
| "md"
| "lg"
| "xl"
| "2xl"
| "3xl"
| "4xl"
| "5xl"
| "6xl"
| "7xl"
| "8xl"
| "9xl"`,elements:[{name:"literal",value:'"xs"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'},{name:"literal",value:'"2xl"'},{name:"literal",value:'"3xl"'},{name:"literal",value:'"4xl"'},{name:"literal",value:'"5xl"'},{name:"literal",value:'"6xl"'},{name:"literal",value:'"7xl"'},{name:"literal",value:'"8xl"'},{name:"literal",value:'"9xl"'}]},description:"The amount of space to add",defaultValue:{value:'"md"',computed:!1}},orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:`The orientation of the spacer
@default "vertical"`,defaultValue:{value:'"vertical"',computed:!1}},showGuide:{required:!1,tsType:{name:"boolean"},description:`Whether to show a guide line in development (for debugging)
@default false`,defaultValue:{value:"false",computed:!1}}}};export{a as S};
