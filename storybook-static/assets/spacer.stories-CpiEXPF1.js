import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{S as s}from"./spacer-B2o--1vy.js";import"./index-yBjzXJbu.js";import"./index-BlmOqGMO.js";import"./utils-C3T1saKV.js";const J={title:"Components/Layout/Spacer",component:s,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{size:{control:{type:"select"},options:["xs","sm","md","lg","xl","2xl","3xl","4xl","5xl","6xl","7xl","8xl","9xl"],description:"The amount of space to add"},orientation:{control:{type:"select"},options:["horizontal","vertical"],description:"The orientation of the spacer"},showGuide:{control:"boolean",description:"Shows a visual guide for the spacer (development only)"}}},t={args:{size:"md",showGuide:!0},render:n=>e.jsxs("div",{className:"p-4 bg-white rounded-lg border",children:[e.jsxs("div",{className:"p-4 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Top Section"}),e.jsx("p",{children:"Content above the spacer"})]}),e.jsx(s,{...n}),e.jsxs("div",{className:"p-4 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Bottom Section"}),e.jsx("p",{children:"Content below the spacer"})]})]})},r={render:()=>e.jsx("div",{className:"space-y-8",children:["xs","sm","md","lg","xl","2xl","3xl","4xl"].map(n=>e.jsxs("div",{className:"p-4 bg-white rounded-lg border",children:[e.jsxs("h3",{className:"text-lg font-semibold mb-4",children:["Size: ",n]}),e.jsx("div",{className:"p-3 bg-gray-200 rounded text-center",children:"Above"}),e.jsx(s,{size:n,showGuide:!0}),e.jsx("div",{className:"p-3 bg-gray-200 rounded text-center",children:"Below"})]},n))})},a={args:{orientation:"horizontal",size:"lg",showGuide:!0},render:n=>e.jsx("div",{className:"p-4 bg-white rounded-lg border",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("button",{className:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600",children:"Button 1"}),e.jsx(s,{...n}),e.jsx("button",{className:"px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600",children:"Button 2"}),e.jsx(s,{...n}),e.jsx("button",{className:"px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600",children:"Button 3"})]})})},o={render:()=>e.jsxs("div",{className:"p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Page Title"}),e.jsx(s,{size:"sm"}),e.jsx("p",{className:"text-gray-600",children:"Subtitle with smaller spacing"}),e.jsx(s,{size:"xl"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"p-4 bg-white rounded-lg shadow",children:[e.jsx("h3",{className:"font-semibold",children:"Card 1"}),e.jsx(s,{size:"xs"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Minimal spacing between title and content"})]}),e.jsxs("div",{className:"p-4 bg-white rounded-lg shadow",children:[e.jsx("h3",{className:"font-semibold",children:"Card 2"}),e.jsx(s,{size:"xs"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Consistent spacing across cards"})]}),e.jsxs("div",{className:"p-4 bg-white rounded-lg shadow",children:[e.jsx("h3",{className:"font-semibold",children:"Card 3"}),e.jsx(s,{size:"xs"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Clean and organized layout"})]})]}),e.jsx(s,{size:"2xl"}),e.jsx("button",{className:"w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800",children:"Call to Action"})]})},l={render:()=>e.jsxs("div",{className:"p-6 bg-white rounded-lg border",children:[e.jsxs("div",{className:"text-center mb-4",children:[e.jsx("h3",{className:"text-xl font-bold mb-2",children:"Responsive Spacing"}),e.jsx("p",{className:"text-gray-600",children:"Resize the viewport to see different spacing"})]}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"w-full max-w-xs p-4 bg-blue-100 rounded-lg text-center",children:e.jsx("p",{className:"font-medium",children:"Component A"})}),e.jsx(s,{size:"lg",className:"sm:hidden"}),e.jsx(s,{size:"xl",className:"hidden sm:block md:hidden"}),e.jsx(s,{size:"2xl",className:"hidden md:block lg:hidden"}),e.jsx(s,{size:"3xl",className:"hidden lg:block"}),e.jsx("div",{className:"w-full max-w-xs p-4 bg-green-100 rounded-lg text-center",children:e.jsx("p",{className:"font-medium",children:"Component B"})})]}),e.jsx("div",{className:"mt-8 text-center text-sm text-gray-500",children:e.jsx("p",{children:"Mobile: lg | Tablet: xl | Desktop: 2xl | Large: 3xl"})})]})},d={render:()=>e.jsxs("div",{className:"max-w-md mx-auto p-6 bg-white rounded-lg border",children:[e.jsx("h3",{className:"text-xl font-bold",children:"Contact Form"}),e.jsx(s,{size:"md"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700",children:"Name"}),e.jsx(s,{size:"xs"}),e.jsx("input",{id:"name",type:"text",className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"John Doe"})]}),e.jsx(s,{size:"md"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email"}),e.jsx(s,{size:"xs"}),e.jsx("input",{id:"email",type:"email",className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"john@example.com"})]}),e.jsx(s,{size:"md"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"message",className:"block text-sm font-medium text-gray-700",children:"Message"}),e.jsx(s,{size:"xs"}),e.jsx("textarea",{id:"message",className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",rows:4,placeholder:"Your message..."})]}),e.jsx(s,{size:"lg"}),e.jsx("button",{className:"w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",children:"Send Message"})]})},i={render:()=>e.jsx("nav",{className:"p-4 bg-gray-900 text-white rounded-lg",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"text-xl font-bold",children:"Logo"}),e.jsx(s,{orientation:"horizontal",size:"2xl"}),e.jsxs("div",{className:"flex items-center space-x-6",children:[e.jsx("button",{className:"hover:text-gray-300 bg-transparent border-none cursor-pointer",children:"Home"}),e.jsx("button",{className:"hover:text-gray-300 bg-transparent border-none cursor-pointer",children:"About"}),e.jsx("button",{className:"hover:text-gray-300 bg-transparent border-none cursor-pointer",children:"Services"}),e.jsx("button",{className:"hover:text-gray-300 bg-transparent border-none cursor-pointer",children:"Contact"})]}),e.jsx(s,{orientation:"horizontal",size:"2xl",className:"flex-1"}),e.jsx("button",{className:"px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700",children:"Get Started"})]})})},c={args:{size:"2xl",showGuide:!1},render:n=>e.jsx("div",{className:"p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"text-3xl font-bold text-gray-800",children:"Clean Spacing"}),e.jsx(s,{...n}),e.jsx("p",{className:"text-lg text-gray-600",children:"This example shows the spacer without the development guide"}),e.jsx(s,{...n}),e.jsxs("div",{className:"inline-flex gap-4",children:[e.jsx("button",{className:"px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700",children:"Primary Action"}),e.jsx("button",{className:"px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50",children:"Secondary Action"})]})]})})};var m,x,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    size: "md",
    showGuide: true
  },
  render: args => <div className="p-4 bg-white rounded-lg border">
      <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg">
        <h3 className="text-lg font-semibold">Top Section</h3>
        <p>Content above the spacer</p>
      </div>
      <Spacer {...args} />
      <div className="p-4 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg">
        <h3 className="text-lg font-semibold">Bottom Section</h3>
        <p>Content below the spacer</p>
      </div>
    </div>
}`,...(p=(x=t.parameters)==null?void 0:x.docs)==null?void 0:p.source}}};var g,u,b;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">
      {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const).map(size => <div key={size} className="p-4 bg-white rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Size: {size}</h3>
          <div className="p-3 bg-gray-200 rounded text-center">Above</div>
          <Spacer size={size} showGuide />
          <div className="p-3 bg-gray-200 rounded text-center">Below</div>
        </div>)}
    </div>
}`,...(b=(u=r.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var h,N,v;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal",
    size: "lg",
    showGuide: true
  },
  render: args => <div className="p-4 bg-white rounded-lg border">
      <div className="flex items-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Button 1
        </button>
        <Spacer {...args} />
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Button 2
        </button>
        <Spacer {...args} />
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
          Button 3
        </button>
      </div>
    </div>
}`,...(v=(N=a.parameters)==null?void 0:N.docs)==null?void 0:v.source}}};var f,j,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold">Page Title</h2>
      <Spacer size="sm" />
      <p className="text-gray-600">Subtitle with smaller spacing</p>
      <Spacer size="xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Card 1</h3>
          <Spacer size="xs" />
          <p className="text-sm text-gray-600">Minimal spacing between title and content</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Card 2</h3>
          <Spacer size="xs" />
          <p className="text-sm text-gray-600">Consistent spacing across cards</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Card 3</h3>
          <Spacer size="xs" />
          <p className="text-sm text-gray-600">Clean and organized layout</p>
        </div>
      </div>
      <Spacer size="2xl" />
      <button className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
        Call to Action
      </button>
    </div>
}`,...(y=(j=o.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var w,z,S;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="p-6 bg-white rounded-lg border">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-2">Responsive Spacing</h3>
        <p className="text-gray-600">Resize the viewport to see different spacing</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-xs p-4 bg-blue-100 rounded-lg text-center">
          <p className="font-medium">Component A</p>
        </div>

        {/* Different spacing on different screen sizes */}
        <Spacer size="lg" className="sm:hidden" />
        <Spacer size="xl" className="hidden sm:block md:hidden" />
        <Spacer size="2xl" className="hidden md:block lg:hidden" />
        <Spacer size="3xl" className="hidden lg:block" />

        <div className="w-full max-w-xs p-4 bg-green-100 rounded-lg text-center">
          <p className="font-medium">Component B</p>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Mobile: lg | Tablet: xl | Desktop: 2xl | Large: 3xl</p>
      </div>
    </div>
}`,...(S=(z=l.parameters)==null?void 0:z.docs)==null?void 0:S.source}}};var C,k,A;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div className="max-w-md mx-auto p-6 bg-white rounded-lg border">
      <h3 className="text-xl font-bold">Contact Form</h3>
      <Spacer size="md" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Spacer size="xs" />
        <input id="name" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
      </div>

      <Spacer size="md" />

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Spacer size="xs" />
        <input id="email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
      </div>

      <Spacer size="md" />

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <Spacer size="xs" />
        <textarea id="message" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} placeholder="Your message..." />
      </div>

      <Spacer size="lg" />

      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Send Message
      </button>
    </div>
}`,...(A=(k=d.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var G,B,T;i.parameters={...i.parameters,docs:{...(G=i.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <nav className="p-4 bg-gray-900 text-white rounded-lg">
      <div className="flex items-center">
        <div className="text-xl font-bold">Logo</div>
        <Spacer orientation="horizontal" size="2xl" />
        <div className="flex items-center space-x-6">
          <button className="hover:text-gray-300 bg-transparent border-none cursor-pointer">
            Home
          </button>
          <button className="hover:text-gray-300 bg-transparent border-none cursor-pointer">
            About
          </button>
          <button className="hover:text-gray-300 bg-transparent border-none cursor-pointer">
            Services
          </button>
          <button className="hover:text-gray-300 bg-transparent border-none cursor-pointer">
            Contact
          </button>
        </div>
        <Spacer orientation="horizontal" size="2xl" className="flex-1" />
        <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">Get Started</button>
      </div>
    </nav>
}`,...(T=(B=i.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var E,F,M;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    size: "2xl",
    showGuide: false
  },
  render: args => <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Clean Spacing</h2>
        <Spacer {...args} />
        <p className="text-lg text-gray-600">
          This example shows the spacer without the development guide
        </p>
        <Spacer {...args} />
        <div className="inline-flex gap-4">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Primary Action
          </button>
          <button className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50">
            Secondary Action
          </button>
        </div>
      </div>
    </div>
}`,...(M=(F=c.parameters)==null?void 0:F.docs)==null?void 0:M.source}}};const V=["Default","AllSizes","HorizontalSpacing","VerticalLayout","ResponsiveExample","FormExample","NavigationExample","WithoutGuide"];export{r as AllSizes,t as Default,d as FormExample,a as HorizontalSpacing,i as NavigationExample,l as ResponsiveExample,o as VerticalLayout,c as WithoutGuide,V as __namedExportsOrder,J as default};
