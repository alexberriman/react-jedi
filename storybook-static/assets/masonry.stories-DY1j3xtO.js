import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{M as n}from"./masonry-DaXmjEvJ.js";import{C as p,d as g}from"./card-BQPCVfwZ.js";import{I as q}from"./image-CPfDLinr.js";import{T as r}from"./text-BVNhesrM.js";import{B as V}from"./badge-BQEwSXkv.js";import{H as h}from"./heading-CCgrqe0N.js";import"./index-yBjzXJbu.js";import"./index-BlmOqGMO.js";import"./utils-C3T1saKV.js";import"./index-Y0L-LdVC.js";import"./index-CtJ-PWby.js";const ie={title:"Layout/Masonry",component:n,tags:["autodocs"],argTypes:{columns:{control:{type:"number"},description:"Number of columns in the grid"},gap:{control:{type:"number"},description:"Gap between items (in Tailwind units)"},glassmorphic:{control:{type:"boolean"},description:"Apply glassmorphic effects to items"},autoFit:{control:{type:"boolean"},description:"Auto-fit columns based on container width"}},parameters:{docs:{description:{component:`Masonry creates a Pinterest-style grid layout with beautiful animations and glassmorphic effects.
Perfect for showcasing dynamic content like images, cards, or any content with varying heights.`}}}},z=[{id:1,image:"https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=400",title:"Modern Architecture",category:"Design",likes:234,height:"h-64"},{id:2,image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800",title:"Portrait Photography",category:"Art",likes:567,height:"h-96"},{id:3,image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600",title:"Mountain Vista",category:"Nature",likes:892,height:"h-80"},{id:4,image:"https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&h=500",title:"Urban Minimalism",category:"Design",likes:432,height:"h-72"},{id:5,image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=700",title:"Abstract Art",category:"Art",likes:678,height:"h-88"},{id:6,image:"https://images.unsplash.com/photo-1515191107209-c28698631303?w=600&h=450",title:"Beach Sunset",category:"Nature",likes:1203,height:"h-64"},{id:7,image:"https://images.unsplash.com/photo-1481026469463-66327c86e544?w=600&h=900",title:"Fashion Editorial",category:"Fashion",likes:345,height:"h-112"},{id:8,image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600",title:"Professional Headshot",category:"Portrait",likes:789,height:"h-80"},{id:9,image:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=500",title:"Culinary Art",category:"Food",likes:521,height:"h-72"},{id:10,image:"https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?w=600&h=700",title:"Tech Innovation",category:"Technology",likes:932,height:"h-88"}],i={args:{columns:3,gap:4},render:a=>e.jsx(n,{...a,children:[1,2,3,4,5,6,7,8,9].map(t=>{let s="h-56";return t%3===0?s="h-64":t%2===0&&(s="h-48"),e.jsx(p,{className:s,children:e.jsxs(g,{className:"p-6",children:[e.jsxs(h,{level:"h4",children:["Card ",t]}),e.jsxs(r,{className:"mt-2 text-gray-600",children:["This is content for card ",t,". Masonry automatically arranges cards of different heights for optimal layout."]})]})},t)})})},o={args:{columns:{base:2,md:3,lg:4,xl:5},gap:6,glassmorphic:!0,animation:{duration:.5,stagger:.08}},render:a=>e.jsx("div",{className:"bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-8 rounded-lg",children:e.jsx(n,{...a,children:z.map(t=>e.jsx("div",{className:"rounded-xl overflow-hidden transform transition-transform duration-300",children:e.jsxs("div",{className:"relative group",children:[e.jsx(q,{src:t.image,alt:t.title,className:`w-full ${t.height} object-cover`}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300",children:[e.jsx(V,{className:"mb-2",variant:"secondary",children:t.category}),e.jsx(h,{level:"h6",className:"text-white mb-1",children:t.title}),e.jsxs(r,{className:"text-white/80",children:["❤️ ",t.likes]})]})]})},t.id))})})},l={args:{columns:{base:1,sm:2,md:3,lg:4,xl:5,"2xl":6},gap:4},render:a=>e.jsx(n,{...a,children:Array.from({length:18},(t,s)=>e.jsx(p,{className:"h-40",children:e.jsx(g,{className:"flex items-center justify-center h-full",children:e.jsx(r,{className:"text-2xl font-bold text-gray-400",children:s+1})})},s))})},c={args:{autoFit:!0,minColWidth:"280px",gap:6},render:a=>e.jsx(n,{...a,children:[{title:"Project Alpha",status:"Active",progress:75},{title:"Design System",status:"Completed",progress:100},{title:"API Integration",status:"In Progress",progress:45},{title:"Mobile App",status:"Planning",progress:10},{title:"Analytics Dashboard",status:"Active",progress:60},{title:"User Research",status:"Completed",progress:100}].map((t,s)=>e.jsx(p,{className:"overflow-hidden",children:e.jsxs(g,{className:"p-6",children:[e.jsxs("div",{className:"flex justify-between items-start mb-4",children:[e.jsx(h,{level:"h5",children:t.title}),e.jsx(V,{variant:t.status==="Completed"?"default":t.status==="Active"?"secondary":"outline",children:t.status})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsx(r,{children:"Progress"}),e.jsxs(r,{children:[t.progress,"%"]})]}),e.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:e.jsx("div",{className:"bg-primary h-2 rounded-full transition-all duration-300",style:{width:`${t.progress}%`}})})]})]})},s))})},m={args:{columns:3,gap:4,itemComponent:"article"},render:a=>e.jsx(n,{...a,children:["News Article 1","Blog Post","Tutorial","Case Study","Review","Guide"].map((t,s)=>e.jsx(p,{children:e.jsxs(g,{className:"p-6",children:[e.jsx(h,{level:"h5",children:t}),e.jsx(r,{className:"mt-2",children:"This content is wrapped in an article element for better semantic HTML."})]})},s))})},d={args:{columns:3,gap:4,animation:{duration:0,stagger:0}},render:a=>e.jsx(n,{...a,children:Array.from({length:9},(t,s)=>e.jsx(p,{className:"h-48",children:e.jsx(g,{className:"flex items-center justify-center h-full",children:e.jsxs(r,{children:["Static Item ",s+1]})})},s))})};var u,y,f,x,v;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    columns: 3,
    gap: 4
  },
  render: args => <Masonry {...args}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
      let className = "h-56";
      if (i % 3 === 0) {
        className = "h-64";
      } else if (i % 2 === 0) {
        className = "h-48";
      }
      return <Card key={i} className={className}>
            <CardContent className="p-6">
              <Heading level="h4">Card {i}</Heading>
              <Text className="mt-2 text-gray-600">
                This is content for card {i}. Masonry automatically arranges cards of different
                heights for optimal layout.
              </Text>
            </CardContent>
          </Card>;
    })}
    </Masonry>
}`,...(f=(y=i.parameters)==null?void 0:y.docs)==null?void 0:f.source},description:{story:"Default masonry grid showcasing various content types",...(v=(x=i.parameters)==null?void 0:x.docs)==null?void 0:v.description}}};var N,b,j,C,w;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    columns: {
      base: 2,
      md: 3,
      lg: 4,
      xl: 5
    },
    gap: 6,
    glassmorphic: true,
    animation: {
      duration: 0.5,
      stagger: 0.08
    }
  },
  render: args => <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-8 rounded-lg">
      <Masonry {...args}>
        {pinterestItems.map(item => <div key={item.id} className="rounded-xl overflow-hidden transform transition-transform duration-300">
            <div className="relative group">
              <Image src={item.image} alt={item.title} className={\`w-full \${item.height} object-cover\`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Badge className="mb-2" variant="secondary">
                  {item.category}
                </Badge>
                <Heading level="h6" className="text-white mb-1">
                  {item.title}
                </Heading>
                <Text className="text-white/80">❤️ {item.likes}</Text>
              </div>
            </div>
          </div>)}
      </Masonry>
    </div>
}`,...(j=(b=o.parameters)==null?void 0:b.docs)==null?void 0:j.source},description:{story:"Pinterest-style image gallery with glassmorphic effects",...(w=(C=o.parameters)==null?void 0:C.docs)==null?void 0:w.description}}};var A,T,M,k,P;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    columns: {
      base: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      "2xl": 6
    },
    gap: 4
  },
  render: args => <Masonry {...args}>
      {Array.from({
      length: 18
    }, (_, i) => <Card key={i} className="h-40">
          <CardContent className="flex items-center justify-center h-full">
            <Text className="text-2xl font-bold text-gray-400">{i + 1}</Text>
          </CardContent>
        </Card>)}
    </Masonry>
}`,...(M=(T=l.parameters)==null?void 0:T.docs)==null?void 0:M.source},description:{story:"Responsive masonry grid with different column counts",...(P=(k=l.parameters)==null?void 0:k.docs)==null?void 0:P.description}}};var I,H,S,B,D;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    autoFit: true,
    minColWidth: "280px",
    gap: 6
  },
  render: args => <Masonry {...args}>
      {[{
      title: "Project Alpha",
      status: "Active",
      progress: 75
    }, {
      title: "Design System",
      status: "Completed",
      progress: 100
    }, {
      title: "API Integration",
      status: "In Progress",
      progress: 45
    }, {
      title: "Mobile App",
      status: "Planning",
      progress: 10
    }, {
      title: "Analytics Dashboard",
      status: "Active",
      progress: 60
    }, {
      title: "User Research",
      status: "Completed",
      progress: 100
    }].map((project, i) => <Card key={i} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <Heading level="h5">{project.title}</Heading>
              <Badge variant={(() => {
            if (project.status === "Completed") return "default";
            if (project.status === "Active") return "secondary";
            return "outline";
          })()}>
                {project.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <Text>Progress</Text>
                <Text>{project.progress}%</Text>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{
              width: \`\${project.progress}%\`
            }} />
              </div>
            </div>
          </CardContent>
        </Card>)}
    </Masonry>
}`,...(S=(H=c.parameters)==null?void 0:H.docs)==null?void 0:S.source},description:{story:"Auto-fit columns based on minimum width",...(D=(B=c.parameters)==null?void 0:B.docs)==null?void 0:D.description}}};var F,R,_,G,W;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    columns: 3,
    gap: 4,
    itemComponent: "article"
  },
  render: args => <Masonry {...args}>
      {["News Article 1", "Blog Post", "Tutorial", "Case Study", "Review", "Guide"].map((title, i) => <Card key={i}>
            <CardContent className="p-6">
              <Heading level="h5">{title}</Heading>
              <Text className="mt-2">
                This content is wrapped in an article element for better semantic HTML.
              </Text>
            </CardContent>
          </Card>)}
    </Masonry>
}`,...(_=(R=m.parameters)==null?void 0:R.docs)==null?void 0:_.source},description:{story:"Masonry with custom item wrapper component",...(W=(G=m.parameters)==null?void 0:G.docs)==null?void 0:W.description}}};var $,E,L,U,O;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    columns: 3,
    gap: 4,
    animation: {
      duration: 0,
      stagger: 0
    }
  },
  render: args => <Masonry {...args}>
      {Array.from({
      length: 9
    }, (_, i) => <Card key={i} className="h-48">
          <CardContent className="flex items-center justify-center h-full">
            <Text>Static Item {i + 1}</Text>
          </CardContent>
        </Card>)}
    </Masonry>
}`,...(L=(E=d.parameters)==null?void 0:E.docs)==null?void 0:L.source},description:{story:"Masonry without animations (static layout)",...(O=(U=d.parameters)==null?void 0:U.docs)==null?void 0:O.description}}};const oe=["Default","PinterestGallery","ResponsiveColumns","AutoFitColumns","CustomWrapper","NoAnimation"];export{c as AutoFitColumns,m as CustomWrapper,i as Default,d as NoAnimation,o as PinterestGallery,l as ResponsiveColumns,oe as __namedExportsOrder,ie as default};
