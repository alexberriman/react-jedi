import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{C as n,a as r,b as t,c as i,d as c}from"./carousel-BhQd7Wkv.js";import{C as l,a as o}from"./card-DI9eU4No.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./utils-C3T1saKV.js";import"./button-CrD3QBL2.js";import"./index-CY5ieB2z.js";import"./index-Y0L-LdVC.js";import"./createLucideIcon-CO2y_x_O.js";import"./arrow-right-CpS0FbRn.js";const K={title:"Components/UI/Carousel",component:n,tags:["autodocs"],argTypes:{orientation:{control:{type:"select"},options:["horizontal","vertical"],description:"Carousel orientation"},opts:{control:{type:"object"},description:"Carousel options (loop, align, etc.)"},className:{control:{type:"text"},description:"Additional CSS classes"}}},m={render:()=>e.jsx("div",{className:"w-full max-w-4xl mx-auto p-8",children:e.jsxs(n,{children:[e.jsx(r,{children:Array.from({length:5}).map((a,s)=>e.jsx(t,{children:e.jsx(l,{children:e.jsx(o,{className:"flex aspect-square items-center justify-center p-6",children:e.jsx("span",{className:"text-4xl font-semibold",children:s+1})})})},s))}),e.jsx(i,{}),e.jsx(c,{})]})})},d={render:()=>e.jsx("div",{className:"w-full max-w-4xl mx-auto p-8",children:e.jsxs(n,{opts:{loop:!0},children:[e.jsx(r,{children:Array.from({length:5}).map((a,s)=>e.jsx(t,{children:e.jsx(l,{children:e.jsx(o,{className:"flex aspect-square items-center justify-center p-6",children:e.jsx("span",{className:"text-4xl font-semibold",children:s+1})})})},s))}),e.jsx(i,{}),e.jsx(c,{})]})})},x={render:()=>e.jsx("div",{className:"w-full max-w-5xl mx-auto p-8",children:e.jsxs(n,{children:[e.jsx(r,{className:"-ml-2 md:-ml-4",children:Array.from({length:9}).map((a,s)=>e.jsx(t,{className:"pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4",children:e.jsx(l,{children:e.jsx(o,{className:"flex aspect-square items-center justify-center p-6",children:e.jsx("span",{className:"text-2xl font-semibold",children:s+1})})})},s))}),e.jsx(i,{}),e.jsx(c,{})]})})},u={render:()=>e.jsx("div",{className:"w-full max-w-2xl mx-auto p-8",children:e.jsxs(n,{orientation:"vertical",className:"w-full max-w-md",children:[e.jsx(r,{className:"h-[400px]",children:Array.from({length:5}).map((a,s)=>e.jsx(t,{children:e.jsx(l,{children:e.jsx(o,{className:"flex h-[120px] items-center justify-center p-6",children:e.jsxs("span",{className:"text-2xl font-semibold",children:["Item ",s+1]})})})},s))}),e.jsx(i,{}),e.jsx(c,{})]})})},p={render:()=>e.jsx("div",{className:"w-full max-w-4xl mx-auto p-8",children:e.jsx(n,{children:e.jsx(r,{children:Array.from({length:5}).map((a,s)=>e.jsx(t,{children:e.jsx(l,{children:e.jsx(o,{className:"flex aspect-square items-center justify-center p-6",children:e.jsx("span",{className:"text-4xl font-semibold",children:s+1})})})},s))})})})},C={render:()=>e.jsx("div",{className:"w-full max-w-5xl mx-auto p-8",children:e.jsxs(n,{opts:{align:"start"},children:[e.jsx(r,{children:[{title:"Modern Design",desc:"Beautiful and responsive interfaces",color:"bg-blue-500"},{title:"Fast Performance",desc:"Optimized for speed and efficiency",color:"bg-green-500"},{title:"Easy to Use",desc:"Intuitive API and documentation",color:"bg-purple-500"},{title:"Flexible",desc:"Customizable to fit your needs",color:"bg-orange-500"},{title:"Reliable",desc:"Battle-tested in production",color:"bg-red-500"}].map((a,s)=>e.jsx(t,{className:"md:basis-1/2 lg:basis-1/3",children:e.jsx(l,{className:`${a.color} border-none text-white`,children:e.jsxs(o,{className:"flex flex-col justify-between h-48 p-6",children:[e.jsx("h3",{className:"text-2xl font-bold",children:a.title}),e.jsx("p",{className:"text-lg opacity-90",children:a.desc})]})})},s))}),e.jsx(i,{variant:"secondary"}),e.jsx(c,{variant:"secondary"})]})})},f={render:()=>e.jsx("div",{className:"w-full max-w-4xl mx-auto p-8",children:e.jsxs(n,{opts:{align:"center"},className:"w-full",children:[e.jsx(r,{children:Array.from({length:5}).map((a,s)=>e.jsx(t,{className:"basis-4/5",children:e.jsx(l,{className:"h-64",children:e.jsx(o,{className:"flex items-center justify-center h-full p-6",children:e.jsxs("span",{className:"text-4xl font-semibold",children:["Slide ",s+1]})})})},s))}),e.jsx(i,{}),e.jsx(c,{})]})})};var h,j,N;m.parameters={...m.parameters,docs:{...(h=m.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-4xl mx-auto p-8">
      <Carousel>
        <CarouselContent>
          {Array.from({
          length: 5
        }).map((_, index) => <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
}`,...(N=(j=m.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var b,g,y;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-4xl mx-auto p-8">
      <Carousel opts={{
      loop: true
    }}>
        <CarouselContent>
          {Array.from({
          length: 5
        }).map((_, index) => <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
}`,...(y=(g=d.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var w,v,I;x.parameters={...x.parameters,docs:{...(w=x.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-5xl mx-auto p-8">
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({
          length: 9
        }).map((_, index) => <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
}`,...(I=(v=x.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};var A,_,P;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-2xl mx-auto p-8">
      <Carousel orientation="vertical" className="w-full max-w-md">
        <CarouselContent className="h-[400px]">
          {Array.from({
          length: 5
        }).map((_, index) => <CarouselItem key={index}>
              <Card>
                <CardContent className="flex h-[120px] items-center justify-center p-6">
                  <span className="text-2xl font-semibold">Item {index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
}`,...(P=(_=u.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};var S,q,k;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-4xl mx-auto p-8">
      <Carousel>
        <CarouselContent>
          {Array.from({
          length: 5
        }).map((_, index) => <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>)}
        </CarouselContent>
      </Carousel>
    </div>
}`,...(k=(q=p.parameters)==null?void 0:q.docs)==null?void 0:k.source}}};var B,z,E;C.parameters={...C.parameters,docs:{...(B=C.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-5xl mx-auto p-8">
      <Carousel opts={{
      align: "start"
    }}>
        <CarouselContent>
          {[{
          title: "Modern Design",
          desc: "Beautiful and responsive interfaces",
          color: "bg-blue-500"
        }, {
          title: "Fast Performance",
          desc: "Optimized for speed and efficiency",
          color: "bg-green-500"
        }, {
          title: "Easy to Use",
          desc: "Intuitive API and documentation",
          color: "bg-purple-500"
        }, {
          title: "Flexible",
          desc: "Customizable to fit your needs",
          color: "bg-orange-500"
        }, {
          title: "Reliable",
          desc: "Battle-tested in production",
          color: "bg-red-500"
        }].map((item, index) => <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className={\`\${item.color} border-none text-white\`}>
                <CardContent className="flex flex-col justify-between h-48 p-6">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-lg opacity-90">{item.desc}</p>
                </CardContent>
              </Card>
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious variant="secondary" />
        <CarouselNext variant="secondary" />
      </Carousel>
    </div>
}`,...(E=(z=C.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var F,M,W;f.parameters={...f.parameters,docs:{...(F=f.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-4xl mx-auto p-8">
      <Carousel opts={{
      align: "center"
    }} className="w-full">
        <CarouselContent>
          {Array.from({
          length: 5
        }).map((_, index) => <CarouselItem key={index} className="basis-4/5">
              <Card className="h-64">
                <CardContent className="flex items-center justify-center h-full p-6">
                  <span className="text-4xl font-semibold">Slide {index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
}`,...(W=(M=f.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};const Q=["Basic","WithLoop","MultipleItems","Vertical","WithoutArrows","CustomContent","CenterAligned"];export{m as Basic,f as CenterAligned,C as CustomContent,x as MultipleItems,u as Vertical,d as WithLoop,p as WithoutArrows,Q as __namedExportsOrder,K as default};
