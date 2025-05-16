import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{A as r}from"./aspect-ratio-LI9iySo7.js";import"./index-yBjzXJbu.js";import"./index-BlmOqGMO.js";import"./index-BFNyJKjA.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-CtJ-PWby.js";const y={title:"UI/AspectRatio",component:r,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{ratio:{control:{type:"number"},description:"The ratio of the width to height (e.g. 16/9, 1, 4/3)"}}},s={args:{ratio:16/9},render:t=>e.jsx("div",{className:"w-[500px]",children:e.jsx(r,{...t,children:e.jsx("img",{src:"https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=500&auto=format&fit=crop&q=80",alt:"A futuristic cityscape with neon lights",className:"object-cover w-full h-full rounded-md"})})})},a={args:{ratio:1},render:t=>e.jsx("div",{className:"w-[400px]",children:e.jsx(r,{...t,children:e.jsx("img",{src:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",alt:"Abstract geometric art with vibrant colors",className:"object-cover w-full h-full rounded-md"})})})},o={args:{ratio:3/4},render:t=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{...t,children:e.jsx("img",{src:"https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&auto=format&fit=crop&q=80",alt:"A portrait photograph",className:"object-cover w-full h-full rounded-md"})})})},c={args:{ratio:16/9},render:t=>e.jsx("div",{className:"w-[500px]",children:e.jsx(r,{...t,className:"bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl",children:e.jsxs("div",{className:"flex flex-col items-center justify-center h-full text-white p-6",children:[e.jsx("h3",{className:"text-2xl font-bold mb-2",children:"Stunning UI Components"}),e.jsx("p",{className:"text-center",children:"Create beautiful, responsive interfaces with precise aspect ratios"})]})})})};var i,n,l;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    ratio: 16 / 9
  },
  render: args => <div className="w-[500px]">
      <AspectRatio {...args}>
        <img src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=500&auto=format&fit=crop&q=80" alt="A futuristic cityscape with neon lights" className="object-cover w-full h-full rounded-md" />
      </AspectRatio>
    </div>
}`,...(l=(n=s.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var p,m,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    ratio: 1
  },
  render: args => <div className="w-[400px]">
      <AspectRatio {...args}>
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80" alt="Abstract geometric art with vibrant colors" className="object-cover w-full h-full rounded-md" />
      </AspectRatio>
    </div>
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,h,f;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    ratio: 3 / 4
  },
  render: args => <div className="w-[300px]">
      <AspectRatio {...args}>
        <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&auto=format&fit=crop&q=80" alt="A portrait photograph" className="object-cover w-full h-full rounded-md" />
      </AspectRatio>
    </div>
}`,...(f=(h=o.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var g,x,w;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ratio: 16 / 9
  },
  render: args => <div className="w-[500px]">
      <AspectRatio {...args} className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
        <div className="flex flex-col items-center justify-center h-full text-white p-6">
          <h3 className="text-2xl font-bold mb-2">Stunning UI Components</h3>
          <p className="text-center">
            Create beautiful, responsive interfaces with precise aspect ratios
          </p>
        </div>
      </AspectRatio>
    </div>
}`,...(w=(x=c.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};const C=["Default","Square","Portrait","WithContent"];export{s as Default,o as Portrait,a as Square,c as WithContent,C as __namedExportsOrder,y as default};
