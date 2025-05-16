import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{R as G,T as V,C as X,b as Y,a as J,D as K,P as Q,O as Z}from"./index-CkJmUoDi.js";import{c as h}from"./utils-C3T1saKV.js";import{X as $}from"./x-CHgulcVy.js";import{B as n}from"./button-CrD3QBL2.js";import{I as v}from"./input-CjJObXXm.js";import{L as N}from"./label-Dr_ntOI2.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./index-DW48STyt.js";import"./index-CY5ieB2z.js";import"./index-C3cpMgHl.js";import"./index-C04s5Ipr.js";import"./index-DTQC5rKR.js";import"./index-ICJYJqR3.js";import"./index-CiwnS10a.js";import"./index-nFMdVv6h.js";import"./index-_r67kdfS.js";import"./index-fNjTmf9T.js";import"./index-w-R8y4gP.js";import"./index-CDNqlkCF.js";import"./index-BJG2KE18.js";import"./index-De5ZkDKQ.js";import"./createLucideIcon-CO2y_x_O.js";import"./index-Y0L-LdVC.js";function r({...t}){return e.jsx(G,{"data-slot":"sheet",...t})}function i({...t}){return e.jsx(V,{"data-slot":"sheet-trigger",...t})}function c({...t}){return e.jsx(Y,{"data-slot":"sheet-close",...t})}function ee({...t}){return e.jsx(Q,{"data-slot":"sheet-portal",...t})}function te({className:t,...s}){return e.jsx(Z,{"data-slot":"sheet-overlay",className:h("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",t),...s})}function a({className:t,children:s,side:p="right",...z}){return e.jsxs(ee,{children:[e.jsx(te,{}),e.jsxs(X,{"data-slot":"sheet-content",className:h("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",p==="right"&&"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",p==="left"&&"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",p==="top"&&"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",p==="bottom"&&"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",t),...z,children:[s,e.jsxs(Y,{className:"ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",children:[e.jsx($,{className:"size-4"}),e.jsx("span",{className:"sr-only",children:"Close"})]})]})]})}function o({className:t,...s}){return e.jsx("div",{"data-slot":"sheet-header",className:h("flex flex-col gap-1.5 p-4",t),...s})}function b({className:t,...s}){return e.jsx("div",{"data-slot":"sheet-footer",className:h("mt-auto flex flex-col gap-2 p-4",t),...s})}function l({className:t,...s}){return e.jsx(J,{"data-slot":"sheet-title",className:h("text-foreground font-semibold",t),...s})}function d({className:t,...s}){return e.jsx(K,{"data-slot":"sheet-description",className:h("text-muted-foreground text-sm",t),...s})}r.__docgenInfo={description:"",methods:[],displayName:"Sheet"};i.__docgenInfo={description:"",methods:[],displayName:"SheetTrigger"};c.__docgenInfo={description:"",methods:[],displayName:"SheetClose"};a.__docgenInfo={description:"",methods:[],displayName:"SheetContent",props:{side:{required:!1,tsType:{name:"union",raw:'"top" | "right" | "bottom" | "left"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"right"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'}]},description:"",defaultValue:{value:'"right"',computed:!1}}}};o.__docgenInfo={description:"",methods:[],displayName:"SheetHeader"};b.__docgenInfo={description:"",methods:[],displayName:"SheetFooter"};l.__docgenInfo={description:"",methods:[],displayName:"SheetTitle"};d.__docgenInfo={description:"",methods:[],displayName:"SheetDescription"};const Be={title:"Components/Overlay/Sheet",component:r,parameters:{layout:"centered"},tags:["autodocs"]},m={render:()=>e.jsxs(r,{children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Open Sheet"})}),e.jsxs(a,{children:[e.jsxs(o,{children:[e.jsx(l,{children:"Sheet Title"}),e.jsx(d,{children:"This is a sheet description. Sheets are used for tasks that don't require the user to leave the current page."})]}),e.jsx("div",{className:"py-4",children:e.jsx("p",{children:"Sheet content goes here."})})]})]})},u={render:()=>e.jsxs(r,{children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{children:"Edit Profile"})}),e.jsxs(a,{children:[e.jsxs(o,{children:[e.jsx(l,{children:"Edit profile"}),e.jsx(d,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(N,{htmlFor:"name",className:"text-right",children:"Name"}),e.jsx(v,{id:"name",value:"Pedro Duarte",className:"col-span-3"})]}),e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(N,{htmlFor:"username",className:"text-right",children:"Username"}),e.jsx(v,{id:"username",value:"@peduarte",className:"col-span-3"})]})]}),e.jsx(b,{children:e.jsx(c,{asChild:!0,children:e.jsx(n,{type:"submit",children:"Save changes"})})})]})]})},x={render:()=>e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs(r,{children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Open from Left"})}),e.jsx(a,{side:"left",children:e.jsxs(o,{children:[e.jsx(l,{children:"Left Sheet"}),e.jsx(d,{children:"This sheet slides in from the left."})]})})]}),e.jsxs(r,{children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Open from Right"})}),e.jsx(a,{side:"right",children:e.jsxs(o,{children:[e.jsx(l,{children:"Right Sheet"}),e.jsx(d,{children:"This sheet slides in from the right (default)."})]})})]}),e.jsxs(r,{children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Open from Top"})}),e.jsx(a,{side:"top",children:e.jsxs(o,{children:[e.jsx(l,{children:"Top Sheet"}),e.jsx(d,{children:"This sheet slides in from the top."})]})})]}),e.jsxs(r,{children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Open from Bottom"})}),e.jsx(a,{side:"bottom",children:e.jsxs(o,{children:[e.jsx(l,{children:"Bottom Sheet"}),e.jsx(d,{children:"This sheet slides in from the bottom."})]})})]})]})},S={render:()=>e.jsxs(r,{children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{children:"Open First Sheet"})}),e.jsxs(a,{children:[e.jsxs(o,{children:[e.jsx(l,{children:"First Sheet"}),e.jsx(d,{children:"This is the first sheet. You can open another one."})]}),e.jsx("div",{className:"py-4",children:e.jsxs(r,{children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{children:"Open Nested Sheet"})}),e.jsx(a,{side:"left",children:e.jsxs(o,{children:[e.jsx(l,{children:"Nested Sheet"}),e.jsx(d,{children:"This is a nested sheet that appears from the opposite side."})]})})]})})]})]})},g={render:()=>e.jsxs(r,{children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{children:"Open Long Content"})}),e.jsxs(a,{className:"overflow-y-auto",children:[e.jsxs(o,{children:[e.jsx(l,{children:"Terms of Service"}),e.jsx(d,{children:"Please read our terms of service carefully."})]}),e.jsx("div",{className:"py-4 space-y-4",children:Array.from({length:20},(t,s)=>e.jsxs("div",{children:[e.jsxs("h3",{className:"font-medium",children:["Section ",s+1]}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."})]},s))}),e.jsxs(b,{children:[e.jsx(c,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Decline"})}),e.jsx(c,{asChild:!0,children:e.jsx(n,{children:"Accept"})})]})]})]})},f={render:()=>e.jsxs(r,{children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"secondary",children:"Open Custom Sheet"})}),e.jsxs(a,{className:"w-[400px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",children:[e.jsxs(o,{children:[e.jsx(l,{className:"text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",children:"Premium Features"}),e.jsx(d,{className:"text-purple-700 dark:text-purple-300",children:"Unlock exclusive features with our premium plan."})]}),e.jsxs("div",{className:"py-8 space-y-4",children:[e.jsxs("div",{className:"p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur",children:[e.jsx("h4",{className:"font-semibold text-purple-900 dark:text-purple-100",children:"🚀 Unlimited Projects"}),e.jsx("p",{className:"text-sm text-purple-700 dark:text-purple-300",children:"Create as many projects as you need."})]}),e.jsxs("div",{className:"p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur",children:[e.jsx("h4",{className:"font-semibold text-purple-900 dark:text-purple-100",children:"⚡ Priority Support"}),e.jsx("p",{className:"text-sm text-purple-700 dark:text-purple-300",children:"Get help when you need it most."})]}),e.jsxs("div",{className:"p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur",children:[e.jsx("h4",{className:"font-semibold text-purple-900 dark:text-purple-100",children:"🎨 Advanced Themes"}),e.jsx("p",{className:"text-sm text-purple-700 dark:text-purple-300",children:"Access exclusive design options."})]})]}),e.jsxs(b,{children:[e.jsx(c,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Maybe Later"})}),e.jsx(n,{className:"bg-gradient-to-r from-purple-600 to-pink-600 text-white",children:"Upgrade Now"})]})]})]})},j={render:()=>e.jsxs("div",{className:"relative h-[400px] w-full border rounded-lg overflow-hidden",children:[e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"text-lg font-semibold mb-2",children:"Page Content"}),e.jsx("p",{className:"mb-4",children:"This sheet doesn't use modal behavior, so you can still interact with the page content behind it."}),e.jsxs(r,{modal:!1,children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{children:"Open Non-Modal Sheet"})}),e.jsxs(a,{children:[e.jsxs(o,{children:[e.jsx(l,{children:"Non-Modal Sheet"}),e.jsx(d,{children:"You can still interact with the content behind this sheet."})]}),e.jsx("div",{className:"py-4",children:e.jsx("p",{children:"Try clicking on the buttons in the background!"})})]})]})]}),e.jsxs("div",{className:"absolute bottom-4 left-4 space-x-2",children:[e.jsx(n,{variant:"secondary",onClick:()=>alert("Background button clicked!"),children:"Background Button 1"}),e.jsx(n,{variant:"secondary",onClick:()=>alert("Background button clicked!"),children:"Background Button 2"})]})]})};var C,T,k;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a sheet description. Sheets are used for tasks that don&apos;t require the user
            to leave the current page.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>Sheet content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
}`,...(k=(T=m.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var y,B,w;u.parameters={...u.parameters,docs:{...(y=u.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...(w=(B=u.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};var D,O,H;x.parameters={...x.parameters,docs:{...(D=x.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open from Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the left.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open from Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the right (default).</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open from Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the top.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open from Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
}`,...(H=(O=x.parameters)==null?void 0:O.docs)==null?void 0:H.source}}};var F,_,P;S.parameters={...S.parameters,docs:{...(F=S.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button>Open First Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>First Sheet</SheetTitle>
          <SheetDescription>This is the first sheet. You can open another one.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button>Open Nested Sheet</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Nested Sheet</SheetTitle>
                <SheetDescription>
                  This is a nested sheet that appears from the opposite side.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </SheetContent>
    </Sheet>
}`,...(P=(_=S.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};var L,I,M;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button>Open Long Content</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Terms of Service</SheetTitle>
          <SheetDescription>Please read our terms of service carefully.</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          {Array.from({
          length: 20
        }, (_, i) => <div key={i}>
              <h3 className="font-medium">Section {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </p>
            </div>)}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Decline</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Accept</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...(M=(I=g.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var U,A,q;f.parameters={...f.parameters,docs:{...(U=f.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open Custom Sheet</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Premium Features
          </SheetTitle>
          <SheetDescription className="text-purple-700 dark:text-purple-300">
            Unlock exclusive features with our premium plan.
          </SheetDescription>
        </SheetHeader>
        <div className="py-8 space-y-4">
          <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100">
              🚀 Unlimited Projects
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Create as many projects as you need.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100">
              ⚡ Priority Support
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Get help when you need it most.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100">
              🎨 Advanced Themes
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Access exclusive design options.
            </p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Maybe Later</Button>
          </SheetClose>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            Upgrade Now
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...(q=(A=f.parameters)==null?void 0:A.docs)==null?void 0:q.source}}};var R,E,W;j.parameters={...j.parameters,docs:{...(R=j.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="relative h-[400px] w-full border rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Page Content</h2>
        <p className="mb-4">
          This sheet doesn&apos;t use modal behavior, so you can still interact with the page
          content behind it.
        </p>
        <Sheet modal={false}>
          <SheetTrigger asChild>
            <Button>Open Non-Modal Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Non-Modal Sheet</SheetTitle>
              <SheetDescription>
                You can still interact with the content behind this sheet.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p>Try clicking on the buttons in the background!</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="absolute bottom-4 left-4 space-x-2">
        <Button variant="secondary" onClick={() => alert("Background button clicked!")}>
          Background Button 1
        </Button>
        <Button variant="secondary" onClick={() => alert("Background button clicked!")}>
          Background Button 2
        </Button>
      </div>
    </div>
}`,...(W=(E=j.parameters)==null?void 0:E.docs)==null?void 0:W.source}}};const we=["Default","WithForm","Positions","NestedSheets","LongContent","CustomStyling","WithoutModal"];export{f as CustomStyling,m as Default,g as LongContent,S as NestedSheets,x as Positions,u as WithForm,j as WithoutModal,we as __namedExportsOrder,Be as default};
