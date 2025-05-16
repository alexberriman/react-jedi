import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{S as d}from"./scroll-area-DWG8fyO3.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./index-nFMdVv6h.js";import"./index-_r67kdfS.js";import"./index-fNjTmf9T.js";import"./index-CY5ieB2z.js";import"./index-De5ZkDKQ.js";import"./index-DTQC5rKR.js";import"./index-C3cpMgHl.js";import"./index-w-R8y4gP.js";import"./index-CKhrQlqu.js";import"./index-BdQq_4o_.js";import"./index-DW48STyt.js";import"./utils-C3T1saKV.js";const O={title:"Components/Layout/ScrollArea",component:d,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{className:{control:"text"}}},n=Array.from({length:50}).map((s,a,z)=>`v1.2.0-beta.${z.length-a}`),r={args:{className:"h-72 w-48 rounded-md border",children:e.jsxs("div",{className:"p-4",children:[e.jsx("h4",{className:"mb-4 text-sm font-medium leading-none",children:"Tags"}),n.map(s=>e.jsx("div",{className:"text-sm",children:s},s))]})}},t={args:{className:"w-96 whitespace-nowrap rounded-md border",children:e.jsx("div",{className:"flex w-max space-x-4 p-4",children:n.map(s=>e.jsxs("figure",{className:"shrink-0",children:[e.jsx("div",{className:"overflow-hidden rounded-md",children:e.jsx("img",{src:"https://via.placeholder.com/150",alt:`Version ${s}`,className:"aspect-[3/4] h-fit w-fit object-cover",width:150,height:200})}),e.jsxs("figcaption",{className:"pt-2 text-xs text-muted-foreground",children:["Version: ",e.jsx("span",{className:"font-semibold text-foreground",children:s})]})]},s))})}},i={args:{className:"h-72 w-96 rounded-md border",children:e.jsx("div",{className:"p-4",children:e.jsxs("table",{className:"w-full",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"sticky top-0 bg-background text-left",children:"Version"}),e.jsx("th",{className:"sticky top-0 bg-background text-left",children:"Status"}),e.jsx("th",{className:"sticky top-0 bg-background text-left",children:"Released"}),e.jsx("th",{className:"sticky top-0 bg-background text-left",children:"Downloads"}),e.jsx("th",{className:"sticky top-0 bg-background text-left",children:"Notes"})]})}),e.jsx("tbody",{children:n.map((s,a)=>e.jsxs("tr",{children:[e.jsx("td",{className:"whitespace-nowrap py-2",children:s}),e.jsx("td",{className:"whitespace-nowrap py-2",children:a<5?"Stable":a<10?"Beta":"Alpha"}),e.jsx("td",{className:"whitespace-nowrap py-2",children:new Date(2024,0,30-a).toLocaleDateString()}),e.jsx("td",{className:"whitespace-nowrap py-2",children:(a+1)*5432}),e.jsx("td",{className:"whitespace-nowrap py-2",children:a===0?"Latest stable release":a===1?"Security update":a===2?"Bug fixes and performance improvements":"Minor updates"})]},s))})]})})}},l={args:{className:"h-[400px] w-[350px] rounded-md border",children:e.jsxs("div",{className:"grid h-full grid-rows-2 gap-4 p-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"mb-2 text-sm font-medium",children:"Vertical Scroll"}),e.jsx(d,{className:"h-full w-full rounded-md border",children:e.jsx("div",{className:"p-2",children:n.map(s=>e.jsx("div",{className:"py-1 text-sm",children:s},s))})})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mb-2 text-sm font-medium",children:"Horizontal Scroll"}),e.jsx(d,{className:"h-full w-full rounded-md border",children:e.jsx("div",{className:"flex h-full w-max items-center space-x-2 p-2",children:n.map(s=>e.jsx("div",{className:"flex h-16 w-32 shrink-0 items-center justify-center rounded-md border bg-secondary text-sm",children:s},s))})})]})]})}},o={args:{className:"h-[400px] w-[600px] rounded-lg border",children:e.jsxs("div",{className:"p-6",children:[e.jsx("h2",{className:"mb-4 text-2xl font-bold",children:"ScrollArea Component Documentation"}),e.jsxs("div",{className:"space-y-4 text-sm",children:[e.jsx("p",{children:"The ScrollArea component provides a customizable scrollbar for overflowing content. It offers a consistent look across different browsers and operating systems, while maintaining accessibility."}),e.jsx("h3",{className:"text-lg font-semibold",children:"Features"}),e.jsxs("ul",{className:"list-disc space-y-2 pl-6",children:[e.jsx("li",{children:"Cross-browser consistency"}),e.jsx("li",{children:"Touch-friendly scrolling"}),e.jsx("li",{children:"Keyboard navigation support"}),e.jsx("li",{children:"Customizable scrollbar appearance"}),e.jsx("li",{children:"Smooth scrolling behavior"}),e.jsx("li",{children:"Support for both vertical and horizontal scrolling"})]}),e.jsx("h3",{className:"text-lg font-semibold",children:"Usage Examples"}),e.jsx("p",{children:"The ScrollArea component can be used in various scenarios:"}),e.jsxs("ol",{className:"list-decimal space-y-2 pl-6",children:[e.jsx("li",{children:"Long lists of items"}),e.jsx("li",{children:"Code editors or text areas"}),e.jsx("li",{children:"Image galleries"}),e.jsx("li",{children:"Data tables"}),e.jsx("li",{children:"Chat interfaces"}),e.jsx("li",{children:"Navigation menus"})]}),e.jsx("h3",{className:"text-lg font-semibold",children:"Accessibility"}),e.jsx("p",{children:"The component is built with accessibility in mind, supporting keyboard navigation and screen readers. Users can navigate the scrollable content using arrow keys, Page Up/Down, Home, and End keys."}),e.jsx("h3",{className:"text-lg font-semibold",children:"Performance"}),e.jsx("p",{children:"The ScrollArea component is optimized for performance, using virtual scrolling techniques when appropriate and minimizing repaints during scroll operations."}),Array.from({length:10}).map((s,a)=>e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},a))]})]})}},c={args:{className:"h-[300px] w-[300px] rounded-xl border-2 border-blue-500 bg-blue-50",children:e.jsxs("div",{className:"p-6",children:[e.jsx("h3",{className:"mb-4 text-xl font-bold text-blue-900",children:"Custom Styled ScrollArea"}),e.jsx("div",{className:"space-y-3",children:n.slice(0,20).map((s,a)=>e.jsxs("div",{className:"rounded-lg bg-white p-3 shadow-sm transition-all hover:shadow-md",children:[e.jsx("div",{className:"font-medium text-blue-900",children:s}),e.jsxs("div",{className:"text-sm text-blue-600",children:["Released: ",new Date(2024,0,30-a).toLocaleDateString()]})]},s))})]})}};var m,p,h;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    className: "h-72 w-48 rounded-md border",
    children: <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map(tag => <div key={tag} className="text-sm">
            {tag}
          </div>)}
      </div>
  }
}`,...(h=(p=r.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var u,x,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    className: "w-96 whitespace-nowrap rounded-md border",
    children: <div className="flex w-max space-x-4 p-4">
        {tags.map(tag => <figure key={tag} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img src="https://via.placeholder.com/150" alt={\`Version \${tag}\`} className="aspect-[3/4] h-fit w-fit object-cover" width={150} height={200} />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Version: <span className="font-semibold text-foreground">{tag}</span>
            </figcaption>
          </figure>)}
      </div>
  }
}`,...(g=(x=t.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var b,f,N;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    className: "h-72 w-96 rounded-md border",
    children: <div className="p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="sticky top-0 bg-background text-left">Version</th>
              <th className="sticky top-0 bg-background text-left">Status</th>
              <th className="sticky top-0 bg-background text-left">Released</th>
              <th className="sticky top-0 bg-background text-left">Downloads</th>
              <th className="sticky top-0 bg-background text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag, i) => <tr key={tag}>
                <td className="whitespace-nowrap py-2">{tag}</td>
                <td className="whitespace-nowrap py-2">
                  {(() => {
                if (i < 5) return "Stable";
                if (i < 10) return "Beta";
                return "Alpha";
              })()}
                </td>
                <td className="whitespace-nowrap py-2">
                  {new Date(2024, 0, 30 - i).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap py-2">
                  {/* Using fixed value for downloads to avoid ESLint warning about pseudorandom */}
                  {(i + 1) * 5432}
                </td>
                <td className="whitespace-nowrap py-2">
                  {(() => {
                if (i === 0) return "Latest stable release";
                if (i === 1) return "Security update";
                if (i === 2) return "Bug fixes and performance improvements";
                return "Minor updates";
              })()}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
  }
}`,...(N=(f=i.parameters)==null?void 0:f.docs)==null?void 0:N.source}}};var v,w,y;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    className: "h-[400px] w-[350px] rounded-md border",
    children: <div className="grid h-full grid-rows-2 gap-4 p-4">
        <div>
          <h4 className="mb-2 text-sm font-medium">Vertical Scroll</h4>
          <ScrollArea className="h-full w-full rounded-md border">
            <div className="p-2">
              {tags.map(tag => <div key={tag} className="py-1 text-sm">
                  {tag}
                </div>)}
            </div>
          </ScrollArea>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Horizontal Scroll</h4>
          <ScrollArea className="h-full w-full rounded-md border">
            <div className="flex h-full w-max items-center space-x-2 p-2">
              {tags.map(tag => <div key={tag} className="flex h-16 w-32 shrink-0 items-center justify-center rounded-md border bg-secondary text-sm">
                  {tag}
                </div>)}
            </div>
          </ScrollArea>
        </div>
      </div>
  }
}`,...(y=(w=l.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var j,S,k;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    className: "h-[400px] w-[600px] rounded-lg border",
    children: <div className="p-6">
        <h2 className="mb-4 text-2xl font-bold">ScrollArea Component Documentation</h2>
        <div className="space-y-4 text-sm">
          <p>
            The ScrollArea component provides a customizable scrollbar for overflowing content. It
            offers a consistent look across different browsers and operating systems, while
            maintaining accessibility.
          </p>
          <h3 className="text-lg font-semibold">Features</h3>
          <ul className="list-disc space-y-2 pl-6">
            <li>Cross-browser consistency</li>
            <li>Touch-friendly scrolling</li>
            <li>Keyboard navigation support</li>
            <li>Customizable scrollbar appearance</li>
            <li>Smooth scrolling behavior</li>
            <li>Support for both vertical and horizontal scrolling</li>
          </ul>
          <h3 className="text-lg font-semibold">Usage Examples</h3>
          <p>The ScrollArea component can be used in various scenarios:</p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Long lists of items</li>
            <li>Code editors or text areas</li>
            <li>Image galleries</li>
            <li>Data tables</li>
            <li>Chat interfaces</li>
            <li>Navigation menus</li>
          </ol>
          <h3 className="text-lg font-semibold">Accessibility</h3>
          <p>
            The component is built with accessibility in mind, supporting keyboard navigation and
            screen readers. Users can navigate the scrollable content using arrow keys, Page
            Up/Down, Home, and End keys.
          </p>
          <h3 className="text-lg font-semibold">Performance</h3>
          <p>
            The ScrollArea component is optimized for performance, using virtual scrolling
            techniques when appropriate and minimizing repaints during scroll operations.
          </p>
          {Array.from({
          length: 10
        }).map((_, i) => <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>)}
        </div>
      </div>
  }
}`,...(k=(S=o.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var A,D,C;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    className: "h-[300px] w-[300px] rounded-xl border-2 border-blue-500 bg-blue-50",
    children: <div className="p-6">
        <h3 className="mb-4 text-xl font-bold text-blue-900">Custom Styled ScrollArea</h3>
        <div className="space-y-3">
          {tags.slice(0, 20).map((tag, i) => <div key={tag} className="rounded-lg bg-white p-3 shadow-sm transition-all hover:shadow-md">
              <div className="font-medium text-blue-900">{tag}</div>
              <div className="text-sm text-blue-600">
                Released: {new Date(2024, 0, 30 - i).toLocaleDateString()}
              </div>
            </div>)}
        </div>
      </div>
  }
}`,...(C=(D=c.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};const G=["VerticalScroll","HorizontalScroll","BothDirections","NestedScrollAreas","LongContent","CustomStyling"];export{i as BothDirections,c as CustomStyling,t as HorizontalScroll,o as LongContent,l as NestedScrollAreas,r as VerticalScroll,G as __namedExportsOrder,O as default};
