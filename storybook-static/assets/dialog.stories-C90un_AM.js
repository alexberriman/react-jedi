import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{R as q,T as U,C as V,b as z,a as W,D as L,P as Y,O as X}from"./index-CkJmUoDi.js";import{c}from"./utils-C3T1saKV.js";import{X as G}from"./x-CHgulcVy.js";import{B as n}from"./button-CrD3QBL2.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./index-DW48STyt.js";import"./index-CY5ieB2z.js";import"./index-C3cpMgHl.js";import"./index-C04s5Ipr.js";import"./index-DTQC5rKR.js";import"./index-ICJYJqR3.js";import"./index-CiwnS10a.js";import"./index-nFMdVv6h.js";import"./index-_r67kdfS.js";import"./index-fNjTmf9T.js";import"./index-w-R8y4gP.js";import"./index-CDNqlkCF.js";import"./index-BJG2KE18.js";import"./index-De5ZkDKQ.js";import"./createLucideIcon-CO2y_x_O.js";import"./index-Y0L-LdVC.js";function t({...a}){return e.jsx(q,{"data-slot":"dialog",...a})}function i({...a}){return e.jsx(U,{"data-slot":"dialog-trigger",...a})}function A({...a}){return e.jsx(Y,{"data-slot":"dialog-portal",...a})}function j({...a}){return e.jsx(z,{"data-slot":"dialog-close",...a})}function R({className:a,...o}){return e.jsx(X,{"data-slot":"dialog-overlay",className:c("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",a),...o})}function s({className:a,children:o,...g}){return e.jsxs(A,{"data-slot":"dialog-portal",children:[e.jsx(R,{}),e.jsxs(V,{"data-slot":"dialog-content",className:c("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",a),...g,children:[o,e.jsxs(z,{className:"ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",children:[e.jsx(G,{}),e.jsx("span",{className:"sr-only",children:"Close"})]})]})]})}function r({className:a,...o}){return e.jsx("div",{"data-slot":"dialog-header",className:c("flex flex-col gap-2 text-center sm:text-left",a),...o})}function f({className:a,...o}){return e.jsx("div",{"data-slot":"dialog-footer",className:c("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",a),...o})}function l({className:a,...o}){return e.jsx(W,{"data-slot":"dialog-title",className:c("text-lg leading-none font-semibold",a),...o})}function d({className:a,...o}){return e.jsx(L,{"data-slot":"dialog-description",className:c("text-muted-foreground text-sm",a),...o})}t.__docgenInfo={description:"",methods:[],displayName:"Dialog"};j.__docgenInfo={description:"",methods:[],displayName:"DialogClose"};s.__docgenInfo={description:"",methods:[],displayName:"DialogContent"};d.__docgenInfo={description:"",methods:[],displayName:"DialogDescription"};f.__docgenInfo={description:"",methods:[],displayName:"DialogFooter"};r.__docgenInfo={description:"",methods:[],displayName:"DialogHeader"};R.__docgenInfo={description:"",methods:[],displayName:"DialogOverlay"};A.__docgenInfo={description:"",methods:[],displayName:"DialogPortal"};l.__docgenInfo={description:"",methods:[],displayName:"DialogTitle"};i.__docgenInfo={description:"",methods:[],displayName:"DialogTrigger"};const fe={title:"Components/Overlay/Dialog",component:t,parameters:{layout:"centered"},argTypes:{defaultOpen:{control:"boolean",description:"Whether the dialog is initially open"},modal:{control:"boolean",description:"Whether the dialog should be modal"}}},m={args:{defaultOpen:!1},render:a=>e.jsxs(t,{...a,children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Open Dialog"})}),e.jsx(s,{children:e.jsxs(r,{children:[e.jsx(l,{children:"Are you absolutely sure?"}),e.jsx(d,{children:"This action cannot be undone. This will permanently delete your account and remove your data from our servers."})]})})]})},u={args:{defaultOpen:!1},render:a=>e.jsxs(t,{...a,children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Edit Profile"})}),e.jsxs(s,{className:"sm:max-w-[425px]",children:[e.jsxs(r,{children:[e.jsx(l,{children:"Edit profile"}),e.jsx(d,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx("label",{htmlFor:"name",className:"text-right",children:"Name"}),e.jsx("input",{id:"name",defaultValue:"Pedro Duarte",className:"col-span-3 px-3 py-1 border rounded"})]}),e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx("label",{htmlFor:"username",className:"text-right",children:"Username"}),e.jsx("input",{id:"username",defaultValue:"@peduarte",className:"col-span-3 px-3 py-1 border rounded"})]})]}),e.jsx(f,{children:e.jsx(n,{type:"submit",children:"Save changes"})})]})]})},p={args:{defaultOpen:!1},render:a=>e.jsxs(t,{...a,children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Custom Close Button"})}),e.jsxs(s,{className:"sm:max-w-[425px]",children:[e.jsxs(r,{children:[e.jsx(l,{children:"Custom Close Example"}),e.jsx(d,{children:"This dialog has a custom close button in the footer."})]}),e.jsx("div",{className:"py-4",children:e.jsx("p",{children:"Custom content goes here..."})}),e.jsxs(f,{children:[e.jsx(j,{asChild:!0,children:e.jsx(n,{type:"button",variant:"secondary",children:"Close"})}),e.jsx(n,{type:"submit",children:"Save"})]})]})]})},h={args:{defaultOpen:!1},render:a=>e.jsxs(t,{...a,children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Terms of Service"})}),e.jsxs(s,{className:"max-h-[80vh] overflow-y-auto",children:[e.jsxs(r,{children:[e.jsx(l,{children:"Terms of Service"}),e.jsx(d,{children:"Please read our terms of service carefully."})]}),e.jsx("div",{className:"space-y-4",children:Array.from({length:10}).map((o,g)=>e.jsxs("div",{children:[e.jsxs("h3",{className:"font-medium",children:["Section ",g+1]}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."})]},g))}),e.jsxs(f,{children:[e.jsx(j,{asChild:!0,children:e.jsx(n,{type:"button",variant:"outline",children:"Decline"})}),e.jsx(n,{type:"submit",children:"Accept"})]})]})]})},D={args:{defaultOpen:!1,modal:!1},render:a=>e.jsxs(t,{...a,children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Non-Modal Dialog"})}),e.jsxs(s,{children:[e.jsxs(r,{children:[e.jsx(l,{children:"Non-Modal Dialog"}),e.jsx(d,{children:"This dialog doesn't block interaction with the background content. You can still interact with other elements on the page."})]}),e.jsx("div",{className:"py-4",children:e.jsx("p",{children:"This is a non-modal dialog. Click outside and see!"})})]})]})},x={args:{defaultOpen:!0},render:a=>e.jsxs(t,{...a,children:[e.jsx(i,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Reopen Dialog"})}),e.jsx(s,{children:e.jsxs(r,{children:[e.jsx(l,{children:"Initially Open"}),e.jsx(d,{children:"This dialog is open by default when the story loads."})]})})]})};var y,v,C;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    defaultOpen: false
  },
  render: args => <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
}`,...(C=(v=m.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var N,b,T;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    defaultOpen: false
  },
  render: args => <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input id="name" defaultValue="Pedro Duarte" className="col-span-3 px-3 py-1 border rounded" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input id="username" defaultValue="@peduarte" className="col-span-3 px-3 py-1 border rounded" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(T=(b=u.parameters)==null?void 0:b.docs)==null?void 0:T.source}}};var B,_,O;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    defaultOpen: false
  },
  render: args => <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Custom Close Button</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Custom Close Example</DialogTitle>
          <DialogDescription>
            This dialog has a custom close button in the footer.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Custom content goes here...</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(O=(_=p.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var w,S,k;h.parameters={...h.parameters,docs:{...(w=h.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    defaultOpen: false
  },
  render: args => <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Terms of Service</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>Please read our terms of service carefully.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {Array.from({
          length: 10
        }).map((_, i) => <div key={i}>
              <h3 className="font-medium">Section {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </p>
            </div>)}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Decline
            </Button>
          </DialogClose>
          <Button type="submit">Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(k=(S=h.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var F,H,I;D.parameters={...D.parameters,docs:{...(F=D.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    defaultOpen: false,
    modal: false
  },
  render: args => <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Non-Modal Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Non-Modal Dialog</DialogTitle>
          <DialogDescription>
            This dialog doesn&apos;t block interaction with the background content. You can still
            interact with other elements on the page.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>This is a non-modal dialog. Click outside and see!</p>
        </div>
      </DialogContent>
    </Dialog>
}`,...(I=(H=D.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var P,E,M;x.parameters={...x.parameters,docs:{...(P=x.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    defaultOpen: true
  },
  render: args => <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Reopen Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Initially Open</DialogTitle>
          <DialogDescription>
            This dialog is open by default when the story loads.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
}`,...(M=(E=x.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};const je=["Basic","WithFooter","CustomClose","ScrollableContent","NonModal","InitiallyOpen"];export{m as Basic,p as CustomClose,x as InitiallyOpen,D as NonModal,h as ScrollableContent,u as WithFooter,je as __namedExportsOrder,fe as default};
