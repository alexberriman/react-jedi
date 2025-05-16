import{P as M}from"./pricing-table-suYlr87y.js";import"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./utils-C3T1saKV.js";import"./card-DI9eU4No.js";import"./button-CrD3QBL2.js";import"./index-CY5ieB2z.js";import"./index-Y0L-LdVC.js";import"./badge-Dv-F_FtT.js";import"./check-w7m6lauF.js";import"./createLucideIcon-CO2y_x_O.js";import"./x-CHgulcVy.js";const J={title:"Components/Marketing/PricingTable",component:M,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{columns:{control:{type:"select"},options:[1,2,3,4]}}},r=[{name:"Starter",description:"Perfect for small projects",price:9,currency:"$",period:"month",features:[{text:"5 Projects",included:!0},{text:"Up to 10 users",included:!0},{text:"2GB Storage",included:!0},{text:"Community Support",included:!0},{text:"Advanced Analytics",included:!1},{text:"Custom Domain",included:!1}],cta:{text:"Get Started",variant:"outline"}},{name:"Professional",description:"Best for growing teams",price:29,currency:"$",period:"month",badge:"Most Popular",highlighted:!0,features:[{text:"Unlimited Projects",included:!0},{text:"Up to 50 users",included:!0},{text:"50GB Storage",included:!0},{text:"Priority Support",included:!0},{text:"Advanced Analytics",included:!0},{text:"Custom Domain",included:!0}],cta:{text:"Start Free Trial",variant:"default"}},{name:"Enterprise",description:"For large organizations",price:"Custom",features:[{text:"Unlimited Projects",included:!0},{text:"Unlimited Users",included:!0},{text:"Unlimited Storage",included:!0},{text:"24/7 Dedicated Support",included:!0},{text:"Advanced Analytics",included:!0},{text:"Custom Domain",included:!0}],cta:{text:"Contact Sales",variant:"outline"}}],t={args:{tiers:r,columns:3}},n={args:{tiers:r.slice(0,2),columns:2}},s={args:{tiers:[{name:"Free",price:0,currency:"$",period:"forever",features:[{text:"1 Project",included:!0},{text:"1 User",included:!0},{text:"100MB Storage",included:!0},{text:"Community Support",included:!1}],cta:{text:"Sign Up",variant:"outline"}},...r],columns:4}},a={args:{tiers:r.map(e=>({...e,price:typeof e.price=="number"?e.price*10:e.price,period:e.period==="month"?"year":e.period,badge:e.name==="Professional"?"Save 20%":e.badge})),columns:3}},o={args:{tiers:r.map(e=>({...e,features:e.features.slice(0,3)})),columns:3}},i={args:{tiers:r.map(e=>({...e,highlighted:!1,badge:void 0})),columns:3}},c={args:{tiers:[r[1]],columns:1}};var u,d,l;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    tiers: defaultTiers,
    columns: 3
  }
}`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var m,p,g;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    tiers: defaultTiers.slice(0, 2),
    columns: 2
  }
}`,...(g=(p=n.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var f,x,S;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    tiers: [{
      name: "Free",
      price: 0,
      currency: "$",
      period: "forever",
      features: [{
        text: "1 Project",
        included: true
      }, {
        text: "1 User",
        included: true
      }, {
        text: "100MB Storage",
        included: true
      }, {
        text: "Community Support",
        included: false
      }],
      cta: {
        text: "Sign Up",
        variant: "outline"
      }
    }, ...defaultTiers],
    columns: 4
  }
}`,...(S=(x=s.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var y,h,P;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    tiers: defaultTiers.map(tier => ({
      ...tier,
      price: typeof tier.price === "number" ? tier.price * 10 : tier.price,
      period: tier.period === "month" ? "year" : tier.period,
      badge: tier.name === "Professional" ? "Save 20%" : tier.badge
    })),
    columns: 3
  }
}`,...(P=(h=a.parameters)==null?void 0:h.docs)==null?void 0:P.source}}};var C,T,v;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    tiers: defaultTiers.map(tier => ({
      ...tier,
      features: tier.features.slice(0, 3)
    })),
    columns: 3
  }
}`,...(v=(T=o.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var b,U,A;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    tiers: defaultTiers.map(tier => ({
      ...tier,
      highlighted: false,
      badge: undefined
    })),
    columns: 3
  }
}`,...(A=(U=i.parameters)==null?void 0:U.docs)==null?void 0:A.source}}};var F,j,D;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    tiers: [defaultTiers[1]],
    columns: 1
  }
}`,...(D=(j=c.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};const K=["Default","TwoColumns","FourColumns","AnnualPricing","MinimalFeatures","NoHighlight","SingleColumn"];export{a as AnnualPricing,t as Default,s as FourColumns,o as MinimalFeatures,i as NoHighlight,c as SingleColumn,n as TwoColumns,K as __namedExportsOrder,J as default};
