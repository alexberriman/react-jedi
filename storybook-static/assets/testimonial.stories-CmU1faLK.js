import{j as a}from"./jsx-runtime-Cf8x2fCZ.js";import{T as p}from"./testimonial-Dk_2gUjW.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./utils-C3T1saKV.js";import"./avatar-DdRk7usP.js";import"./index-C3cpMgHl.js";import"./index-w-R8y4gP.js";import"./index-DTQC5rKR.js";import"./index-nFMdVv6h.js";import"./index-_r67kdfS.js";import"./index-fNjTmf9T.js";import"./index-CY5ieB2z.js";import"./card-DI9eU4No.js";import"./star-DpYLr8Xc.js";import"./createLucideIcon-CO2y_x_O.js";const ae={title:"Components/Marketing/Testimonial",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["card","minimal","large","quote"]},rating:{control:{type:"number",min:0,max:5}},highlight:{control:{type:"boolean"}}}},e={author:{name:"Sarah Chen",role:"Product Designer",company:"Tech Corp",avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"},content:"This library has transformed how we build UI components. The Server-Driven UI approach allows us to iterate faster and deliver beautiful experiences to our users.",rating:5,date:"November 2024"},t={args:e},r={args:{...e,variant:"minimal"}},o={args:{...e,variant:"large",content:"The React Jedi library is absolutely game-changing. We've cut our development time in half while delivering interfaces that look like they're from the future. The theming system is incredibly powerful and the component quality is outstanding."}},n={args:{...e,variant:"quote"}},i={args:{...e,highlight:!0}},s={args:{...e,rating:void 0}},c={args:{author:{name:"Alex Johnson",role:"CTO",company:"StartupCo"},content:"Incredible library that makes building beautiful interfaces a breeze.",rating:5}},m={args:{author:{name:"",role:"",company:""},content:""},render:()=>a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl",children:[a.jsx(p,{author:{name:"Maria Rodriguez",role:"Lead Developer",company:"Design Studio",avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"},content:"The component architecture is brilliant. Easy to customize and extend.",rating:5,variant:"card"}),a.jsx(p,{author:{name:"James Wilson",role:"Frontend Engineer",company:"WebDev Inc",avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"},content:"Best UI library I've worked with. The attention to detail is remarkable.",rating:5,variant:"card",highlight:!0}),a.jsx(p,{author:{name:"Emma Thompson",role:"UX Designer",company:"Creative Agency",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"},content:"Beautiful components that are a joy to work with. Highly recommended!",rating:5,variant:"card"})]})},l={args:{...e,content:"Working with React Jedi has been an absolute pleasure. The Server-Driven UI approach revolutionizes how we think about building interfaces. The component library is comprehensive, the theming system is powerful yet intuitive, and the overall developer experience is unmatched. We've been able to deliver stunning, performant applications in record time. This is truly the future of web development.",variant:"large"}};var u,h,d;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: defaultProps
}`,...(d=(h=t.parameters)==null?void 0:h.docs)==null?void 0:d.source}}};var g,v,f;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    variant: "minimal"
  }
}`,...(f=(v=r.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var b,y,w;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    variant: "large",
    content: "The React Jedi library is absolutely game-changing. We've cut our development time in half while delivering interfaces that look like they're from the future. The theming system is incredibly powerful and the component quality is outstanding."
  }
}`,...(w=(y=o.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var T,x,k;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    variant: "quote"
  }
}`,...(k=(x=n.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var S,D,W;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    highlight: true
  }
}`,...(W=(D=i.parameters)==null?void 0:D.docs)==null?void 0:W.source}}};var I,C,P;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    rating: undefined
  }
}`,...(P=(C=s.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var R,j,z;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    author: {
      name: "Alex Johnson",
      role: "CTO",
      company: "StartupCo"
    },
    content: "Incredible library that makes building beautiful interfaces a breeze.",
    rating: 5
  }
}`,...(z=(j=c.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var E,J,U;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    author: {
      name: "",
      role: "",
      company: ""
    },
    content: ""
  },
  render: () => <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
      <Testimonial author={{
      name: "Maria Rodriguez",
      role: "Lead Developer",
      company: "Design Studio",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }} content="The component architecture is brilliant. Easy to customize and extend." rating={5} variant="card" />
      <Testimonial author={{
      name: "James Wilson",
      role: "Frontend Engineer",
      company: "WebDev Inc",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    }} content="Best UI library I've worked with. The attention to detail is remarkable." rating={5} variant="card" highlight />
      <Testimonial author={{
      name: "Emma Thompson",
      role: "UX Designer",
      company: "Creative Agency",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
    }} content="Beautiful components that are a joy to work with. Highly recommended!" rating={5} variant="card" />
    </div>
}`,...(U=(J=m.parameters)==null?void 0:J.docs)==null?void 0:U.source}}};var M,A,L;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    content: "Working with React Jedi has been an absolute pleasure. The Server-Driven UI approach revolutionizes how we think about building interfaces. The component library is comprehensive, the theming system is powerful yet intuitive, and the overall developer experience is unmatched. We've been able to deliver stunning, performant applications in record time. This is truly the future of web development.",
    variant: "large"
  }
}`,...(L=(A=l.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};const te=["Default","Minimal","Large","Quote","Highlighted","WithoutRating","WithoutAvatar","MultipleTestimonials","LongContent"];export{t as Default,i as Highlighted,o as Large,l as LongContent,r as Minimal,m as MultipleTestimonials,n as Quote,c as WithoutAvatar,s as WithoutRating,te as __namedExportsOrder,ae as default};
