import{j as u}from"./jsx-runtime-Cf8x2fCZ.js";import{r as o}from"./index-tvICUrOf.js";import{c as f}from"./utils-C3T1saKV.js";const v=(r,e)=>{if(typeof r=="number"){e["--grid-columns"]=r.toString();return}r!=null&&r.base&&(e["--grid-columns"]=r.base.toString()),r!=null&&r.sm&&(e["--grid-columns-sm"]=r.sm.toString()),r!=null&&r.md&&(e["--grid-columns-md"]=r.md.toString()),r!=null&&r.lg&&(e["--grid-columns-lg"]=r.lg.toString()),r!=null&&r.xl&&(e["--grid-columns-xl"]=r.xl.toString())},p=(r,e)=>{if(typeof r=="string"){e["--grid-spacing"]=r;return}r!=null&&r.base&&(e["--grid-spacing"]=r.base),r!=null&&r.sm&&(e["--grid-spacing-sm"]=r.sm),r!=null&&r.md&&(e["--grid-spacing-md"]=r.md),r!=null&&r.lg&&(e["--grid-spacing-lg"]=r.lg),r!=null&&r.xl&&(e["--grid-spacing-xl"]=r.xl)},d=o.forwardRef(({className:r,columns:e=1,spacing:n="4",minChildWidth:a,children:g,...m},s)=>{const t=()=>{const i={};return v(e,i),p(n,i),a&&(i["--grid-min-child-width"]=a),i},l=f("grid",a?"grid-cols-[repeat(auto-fit,minmax(var(--grid-min-child-width),1fr))]":"grid-cols-[repeat(var(--grid-columns,1),1fr)]","gap-[var(--grid-spacing)]","sm:grid-cols-[repeat(var(--grid-columns-sm,var(--grid-columns,1)),1fr)]","md:grid-cols-[repeat(var(--grid-columns-md,var(--grid-columns-sm,var(--grid-columns,1))),1fr)]","lg:grid-cols-[repeat(var(--grid-columns-lg,var(--grid-columns-md,var(--grid-columns-sm,var(--grid-columns,1)))),1fr)]","xl:grid-cols-[repeat(var(--grid-columns-xl,var(--grid-columns-lg,var(--grid-columns-md,var(--grid-columns-sm,var(--grid-columns,1))))),1fr)]","sm:gap-[var(--grid-spacing-sm,var(--grid-spacing))]","md:gap-[var(--grid-spacing-md,var(--grid-spacing-sm,var(--grid-spacing)))]","lg:gap-[var(--grid-spacing-lg,var(--grid-spacing-md,var(--grid-spacing-sm,var(--grid-spacing))))]","xl:gap-[var(--grid-spacing-xl,var(--grid-spacing-lg,var(--grid-spacing-md,var(--grid-spacing-sm,var(--grid-spacing)))))]",r);return u.jsx("div",{ref:s,className:l,style:t(),...m,children:g})});d.displayName="SimpleGrid";d.__docgenInfo={description:"",methods:[],displayName:"SimpleGrid",props:{columns:{required:!1,tsType:{name:"union",raw:`| number
| {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  }`,elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}`,signature:{properties:[{key:"base",value:{name:"number",required:!1}},{key:"sm",value:{name:"number",required:!1}},{key:"md",value:{name:"number",required:!1}},{key:"lg",value:{name:"number",required:!1}},{key:"xl",value:{name:"number",required:!1}}]}}]},description:"Number of columns for the grid",defaultValue:{value:"1",computed:!1}},spacing:{required:!1,tsType:{name:"union",raw:`| string
| {
    base?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  }`,elements:[{name:"string"},{name:"signature",type:"object",raw:`{
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}`,signature:{properties:[{key:"base",value:{name:"string",required:!1}},{key:"sm",value:{name:"string",required:!1}},{key:"md",value:{name:"string",required:!1}},{key:"lg",value:{name:"string",required:!1}},{key:"xl",value:{name:"string",required:!1}}]}}]},description:"Spacing between grid items",defaultValue:{value:'"4"',computed:!1}},minChildWidth:{required:!1,tsType:{name:"string"},description:"Minimum child width"},children:{required:!1,tsType:{name:"ReactNode"},description:"Children elements to be arranged in the grid"}}};export{d as S};
