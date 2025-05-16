import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{P as w,a as Q,b as n,c as T,d as s,e as V,f as U,g as a}from"./pagination-component-5P52cdgI.js";import{R as X}from"./index-BlmOqGMO.js";import"./index-yBjzXJbu.js";import"./utils-C3T1saKV.js";import"./button-MXz0hby-.js";import"./index-CtJ-PWby.js";import"./index-Y0L-LdVC.js";import"./chevron-left-eAO7cari.js";import"./createLucideIcon-Dkfau1iJ.js";import"./ellipsis-Ch17Wgs2.js";import"./chevron-right-CY0U52rr.js";const ue={title:"Components/Navigation/Pagination",component:w,parameters:{layout:"centered",docs:{description:{component:"A pagination component that allows users to navigate through pages of content. Supports various configurations including page ranges, ellipsis, and navigation controls."}}},tags:["autodocs"]},i={render:()=>e.jsx(w,{children:e.jsxs(Q,{children:[e.jsx(n,{children:e.jsx(T,{href:"#"})}),e.jsx(n,{children:e.jsx(s,{href:"#",children:"1"})}),e.jsx(n,{children:e.jsx(s,{href:"#",isActive:!0,children:"2"})}),e.jsx(n,{children:e.jsx(s,{href:"#",children:"3"})}),e.jsx(n,{children:e.jsx(V,{})}),e.jsx(n,{children:e.jsx(s,{href:"#",children:"10"})}),e.jsx(n,{children:e.jsx(U,{href:"#"})})]})})},g={name:"JSON: Simple Pagination",render:()=>e.jsx(a,{type:"pagination",totalPages:5,currentPage:3,showPrevNext:!0,showFirstLast:!1}),parameters:{docs:{source:{code:`{
  "type": "pagination",
  "totalPages": 5,
  "currentPage": 3,
  "showPrevNext": true,
  "showFirstLast": false
}`,language:"json"}}}},c={name:"JSON: With Ellipsis",render:()=>e.jsx(a,{type:"pagination",totalPages:20,currentPage:10,showPrevNext:!0,showFirstLast:!0,siblingCount:1,boundaryCount:1}),parameters:{docs:{source:{code:`{
  "type": "pagination",
  "totalPages": 20,
  "currentPage": 10,
  "showPrevNext": true,
  "showFirstLast": true,
  "siblingCount": 1,
  "boundaryCount": 1
}`,language:"json"}}}},u={name:"JSON: Minimal",render:()=>e.jsx(a,{type:"pagination",totalPages:3,currentPage:2,showPrevNext:!1,showFirstLast:!1}),parameters:{docs:{source:{code:`{
  "type": "pagination",
  "totalPages": 3,
  "currentPage": 2,
  "showPrevNext": false,
  "showFirstLast": false
}`,language:"json"}}}},p={name:"JSON: Large Dataset",render:()=>e.jsx(a,{type:"pagination",totalPages:100,currentPage:50,showPrevNext:!0,showFirstLast:!0,siblingCount:2,boundaryCount:1}),parameters:{docs:{source:{code:`{
  "type": "pagination",
  "totalPages": 100,
  "currentPage": 50,
  "showPrevNext": true,
  "showFirstLast": true,
  "siblingCount": 2,
  "boundaryCount": 1
}`,language:"json"}}}},l={name:"JSON: First Page",render:()=>e.jsx(a,{type:"pagination",totalPages:10,currentPage:1,showPrevNext:!0,showFirstLast:!0}),parameters:{docs:{source:{code:`{
  "type": "pagination",
  "totalPages": 10,
  "currentPage": 1,
  "showPrevNext": true,
  "showFirstLast": true
}`,language:"json"}}}},P={name:"JSON: Last Page",render:()=>e.jsx(a,{type:"pagination",totalPages:10,currentPage:10,showPrevNext:!0,showFirstLast:!0}),parameters:{docs:{source:{code:`{
  "type": "pagination",
  "totalPages": 10,
  "currentPage": 10,
  "showPrevNext": true,
  "showFirstLast": true
}`,language:"json"}}}},m={name:"JSON: Custom Sibling Count",render:()=>e.jsx(a,{type:"pagination",totalPages:15,currentPage:8,showPrevNext:!0,showFirstLast:!0,siblingCount:3,boundaryCount:1}),parameters:{docs:{source:{code:`{
  "type": "pagination",
  "totalPages": 15,
  "currentPage": 8,
  "showPrevNext": true,
  "showFirstLast": true,
  "siblingCount": 3,
  "boundaryCount": 1
}`,language:"json"}}}};function Y(){const[r,h]=X.useState(1),o=10;return e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"text-center",children:e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Current page: ",r," of ",o]})}),e.jsx(w,{children:e.jsxs(Q,{children:[e.jsx(n,{children:e.jsx(T,{href:"#",onClick:t=>{t.preventDefault(),h(Math.max(1,r-1))},className:r===1?"pointer-events-none opacity-50":""})}),Array.from({length:o},(t,x)=>x+1).map(t=>e.jsx(n,{children:e.jsx(s,{href:"#",onClick:x=>{x.preventDefault(),h(t)},isActive:t===r,children:t})},t)),e.jsx(n,{children:e.jsx(U,{href:"#",onClick:t=>{t.preventDefault(),h(Math.min(o,r+1))},className:r===o?"pointer-events-none opacity-50":""})})]})})]})}const d={render:Y,parameters:{docs:{description:{story:"An interactive example showing pagination with state management."}}}};var j,v,N;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...(N=(v=i.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};var y,C,L;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "JSON: Simple Pagination",
  render: () => <PaginationComponent type="pagination" totalPages={5} currentPage={3} showPrevNext={true} showFirstLast={false} />,
  parameters: {
    docs: {
      source: {
        code: \`{
  "type": "pagination",
  "totalPages": 5,
  "currentPage": 3,
  "showPrevNext": true,
  "showFirstLast": false
}\`,
        language: "json"
      }
    }
  }
}`,...(L=(C=g.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var f,S,F;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "JSON: With Ellipsis",
  render: () => <PaginationComponent type="pagination" totalPages={20} currentPage={10} showPrevNext={true} showFirstLast={true} siblingCount={1} boundaryCount={1} />,
  parameters: {
    docs: {
      source: {
        code: \`{
  "type": "pagination",
  "totalPages": 20,
  "currentPage": 10,
  "showPrevNext": true,
  "showFirstLast": true,
  "siblingCount": 1,
  "boundaryCount": 1
}\`,
        language: "json"
      }
    }
  }
}`,...(F=(S=c.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var b,J,I;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "JSON: Minimal",
  render: () => <PaginationComponent type="pagination" totalPages={3} currentPage={2} showPrevNext={false} showFirstLast={false} />,
  parameters: {
    docs: {
      source: {
        code: \`{
  "type": "pagination",
  "totalPages": 3,
  "currentPage": 2,
  "showPrevNext": false,
  "showFirstLast": false
}\`,
        language: "json"
      }
    }
  }
}`,...(I=(J=u.parameters)==null?void 0:J.docs)==null?void 0:I.source}}};var O,k,E;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: "JSON: Large Dataset",
  render: () => <PaginationComponent type="pagination" totalPages={100} currentPage={50} showPrevNext={true} showFirstLast={true} siblingCount={2} boundaryCount={1} />,
  parameters: {
    docs: {
      source: {
        code: \`{
  "type": "pagination",
  "totalPages": 100,
  "currentPage": 50,
  "showPrevNext": true,
  "showFirstLast": true,
  "siblingCount": 2,
  "boundaryCount": 1
}\`,
        language: "json"
      }
    }
  }
}`,...(E=(k=p.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var A,D,M;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: "JSON: First Page",
  render: () => <PaginationComponent type="pagination" totalPages={10} currentPage={1} showPrevNext={true} showFirstLast={true} />,
  parameters: {
    docs: {
      source: {
        code: \`{
  "type": "pagination",
  "totalPages": 10,
  "currentPage": 1,
  "showPrevNext": true,
  "showFirstLast": true
}\`,
        language: "json"
      }
    }
  }
}`,...(M=(D=l.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var W,R,_;P.parameters={...P.parameters,docs:{...(W=P.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: "JSON: Last Page",
  render: () => <PaginationComponent type="pagination" totalPages={10} currentPage={10} showPrevNext={true} showFirstLast={true} />,
  parameters: {
    docs: {
      source: {
        code: \`{
  "type": "pagination",
  "totalPages": 10,
  "currentPage": 10,
  "showPrevNext": true,
  "showFirstLast": true
}\`,
        language: "json"
      }
    }
  }
}`,...(_=(R=P.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var q,z,B;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: "JSON: Custom Sibling Count",
  render: () => <PaginationComponent type="pagination" totalPages={15} currentPage={8} showPrevNext={true} showFirstLast={true} siblingCount={3} boundaryCount={1} />,
  parameters: {
    docs: {
      source: {
        code: \`{
  "type": "pagination",
  "totalPages": 15,
  "currentPage": 8,
  "showPrevNext": true,
  "showFirstLast": true,
  "siblingCount": 3,
  "boundaryCount": 1
}\`,
        language: "json"
      }
    }
  }
}`,...(B=(z=m.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var G,H,K;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: InteractivePaginationExample,
  parameters: {
    docs: {
      description: {
        story: "An interactive example showing pagination with state management."
      }
    }
  }
}`,...(K=(H=d.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};const pe=["Default","JsonSimple","JsonWithEllipsis","JsonMinimal","JsonLargePagination","JsonFirstPage","JsonLastPage","JsonWithCustomSiblings","InteractiveExample"];export{i as Default,d as InteractiveExample,l as JsonFirstPage,p as JsonLargePagination,P as JsonLastPage,u as JsonMinimal,g as JsonSimple,m as JsonWithCustomSiblings,c as JsonWithEllipsis,pe as __namedExportsOrder,ue as default};
