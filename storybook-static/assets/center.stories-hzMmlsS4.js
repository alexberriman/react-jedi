import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{C as L}from"./center-C66moWck.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./utils-C3T1saKV.js";const U={title:"Components/Layout/Center",component:L,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{as:{control:{type:"select"},options:["div","section","main","article"],description:"The element to render as"},fullHeight:{control:"boolean",description:"Makes the container take full viewport height"},fullWidth:{control:"boolean",description:"Makes the container take full width"},centerDirection:{control:{type:"select"},options:["horizontal","vertical","both"],description:"The direction to center content"}}},t={args:{children:e.jsxs("div",{className:"p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white",children:[e.jsx("h2",{className:"text-2xl font-bold mb-2",children:"Centered Content"}),e.jsx("p",{children:"This content is perfectly centered in its container"})]}),className:"min-h-[400px] bg-gray-50 rounded-lg"}},r={args:{fullHeight:!0,children:e.jsx("div",{className:"max-w-lg",children:e.jsxs("div",{className:"p-8 bg-white rounded-2xl shadow-2xl",children:[e.jsx("h1",{className:"text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",children:"Full Page Center"}),e.jsx("p",{className:"text-gray-600 text-lg mb-6",children:"This content is centered in the full viewport height, perfect for hero sections or loading states."}),e.jsx("button",{className:"w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow",children:"Get Started"})]})}),className:"bg-gradient-to-br from-gray-50 to-gray-100"}},a={args:{centerDirection:"horizontal",children:e.jsx("div",{className:"w-64 p-4 bg-blue-500 text-white rounded-lg text-center",children:e.jsx("p",{children:"Only horizontally centered"})}),className:"min-h-[200px] bg-gray-100 rounded-lg relative"}},n={args:{centerDirection:"vertical",children:e.jsx("div",{className:"w-64 p-4 bg-green-500 text-white rounded-lg text-center",children:e.jsx("p",{children:"Only vertically centered"})}),className:"min-h-[200px] bg-gray-100 rounded-lg relative"}},s={args:{children:e.jsxs("div",{className:"flex flex-col items-center gap-6",children:[e.jsx("img",{src:"https://via.placeholder.com/100",alt:"Placeholder",className:"w-24 h-24 rounded-full"}),e.jsx("h3",{className:"text-2xl font-bold",children:"Welcome Back!"}),e.jsx("p",{className:"text-gray-600 text-center max-w-sm",children:"Center multiple elements with perfect alignment"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx("button",{className:"px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors",children:"Login"}),e.jsx("button",{className:"px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",children:"Sign Up"})]})]}),className:"min-h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"}},l={args:{fullHeight:!0,children:e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx("div",{className:"w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"}),e.jsx("p",{className:"text-gray-600 animate-pulse",children:"Loading amazing content..."})]})}},o={args:{children:e.jsx("div",{className:"w-full max-w-6xl mx-auto p-6",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"p-6 bg-white rounded-lg shadow-lg",children:[e.jsx("div",{className:"w-12 h-12 bg-blue-500 rounded-lg mb-4"}),e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Feature One"}),e.jsx("p",{className:"text-gray-600",children:"Responsive centered grid content"})]}),e.jsxs("div",{className:"p-6 bg-white rounded-lg shadow-lg",children:[e.jsx("div",{className:"w-12 h-12 bg-green-500 rounded-lg mb-4"}),e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Feature Two"}),e.jsx("p",{className:"text-gray-600",children:"Works great at all screen sizes"})]}),e.jsxs("div",{className:"p-6 bg-white rounded-lg shadow-lg",children:[e.jsx("div",{className:"w-12 h-12 bg-purple-500 rounded-lg mb-4"}),e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Feature Three"}),e.jsx("p",{className:"text-gray-600",children:"Perfect for modern layouts"})]})]})}),className:"min-h-[600px] bg-gray-50"}},i={args:{as:"main",fullHeight:!0,children:e.jsxs("article",{className:"max-w-prose",children:[e.jsx("h1",{className:"text-5xl font-bold mb-6",children:"Using Center as Main Element"}),e.jsx("p",{className:"text-xl text-gray-600 leading-relaxed",children:"The Center component can be rendered as any semantic HTML element. This example uses it as a main element, which is perfect for page content."})]}),className:"px-6"}};var c,d,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-2">Centered Content</h2>
        <p>This content is perfectly centered in its container</p>
      </div>,
    className: "min-h-[400px] bg-gray-50 rounded-lg"
  }
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var g,p,h;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    fullHeight: true,
    children: <div className="max-w-lg">
        <div className="p-8 bg-white rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Full Page Center
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            This content is centered in the full viewport height, perfect for hero sections or
            loading states.
          </p>
          <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
            Get Started
          </button>
        </div>
      </div>,
    className: "bg-gradient-to-br from-gray-50 to-gray-100"
  }
}`,...(h=(p=r.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var u,x,b;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    centerDirection: "horizontal",
    children: <div className="w-64 p-4 bg-blue-500 text-white rounded-lg text-center">
        <p>Only horizontally centered</p>
      </div>,
    className: "min-h-[200px] bg-gray-100 rounded-lg relative"
  }
}`,...(b=(x=a.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var N,f,v;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    centerDirection: "vertical",
    children: <div className="w-64 p-4 bg-green-500 text-white rounded-lg text-center">
        <p>Only vertically centered</p>
      </div>,
    className: "min-h-[200px] bg-gray-100 rounded-lg relative"
  }
}`,...(v=(f=n.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var w,y,j;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: <div className="flex flex-col items-center gap-6">
        <img src="https://via.placeholder.com/100" alt="Placeholder" className="w-24 h-24 rounded-full" />
        <h3 className="text-2xl font-bold">Welcome Back!</h3>
        <p className="text-gray-600 text-center max-w-sm">
          Center multiple elements with perfect alignment
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Login
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Sign Up
          </button>
        </div>
      </div>,
    className: "min-h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"
  }
}`,...(j=(y=s.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var C,T,S;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    fullHeight: true,
    children: <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 animate-pulse">Loading amazing content...</p>
      </div>
  }
}`,...(S=(T=l.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var H,k,z;o.parameters={...o.parameters,docs:{...(H=o.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    children: <div className="w-full max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-blue-500 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Feature One</h3>
            <p className="text-gray-600">Responsive centered grid content</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-green-500 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Feature Two</h3>
            <p className="text-gray-600">Works great at all screen sizes</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Feature Three</h3>
            <p className="text-gray-600">Perfect for modern layouts</p>
          </div>
        </div>
      </div>,
    className: "min-h-[600px] bg-gray-50"
  }
}`,...(z=(k=o.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var O,F,M;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    as: "main",
    fullHeight: true,
    children: <article className="max-w-prose">
        <h1 className="text-5xl font-bold mb-6">Using Center as Main Element</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          The Center component can be rendered as any semantic HTML element. This example uses it as
          a main element, which is perfect for page content.
        </p>
      </article>,
    className: "px-6"
  }
}`,...(M=(F=i.parameters)==null?void 0:F.docs)==null?void 0:M.source}}};const A=["Default","FullHeightCenter","HorizontalOnly","VerticalOnly","WithMultipleElements","LoadingState","ResponsiveCenter","AsMain"];export{i as AsMain,t as Default,r as FullHeightCenter,a as HorizontalOnly,l as LoadingState,o as ResponsiveCenter,n as VerticalOnly,s as WithMultipleElements,A as __namedExportsOrder,U as default};
