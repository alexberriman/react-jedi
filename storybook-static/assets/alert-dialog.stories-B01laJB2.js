import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{A as r,a as d,b as o,c as n,d as i,e as l,f as a,g as s,h as t}from"./alert-dialog-DVinA_QI.js";import{B as c}from"./button-CrD3QBL2.js";import{R as z}from"./index-tvICUrOf.js";import"./index-yBjzXJbu.js";import"./index-C3cpMgHl.js";import"./index-CY5ieB2z.js";import"./index-CkJmUoDi.js";import"./index-DW48STyt.js";import"./index-C04s5Ipr.js";import"./index-DTQC5rKR.js";import"./index-ICJYJqR3.js";import"./index-CiwnS10a.js";import"./index-nFMdVv6h.js";import"./index-_r67kdfS.js";import"./index-fNjTmf9T.js";import"./index-w-R8y4gP.js";import"./index-CDNqlkCF.js";import"./index-BJG2KE18.js";import"./index-De5ZkDKQ.js";import"./utils-C3T1saKV.js";import"./index-Y0L-LdVC.js";const ae={title:"Components/Overlay/AlertDialog",component:r,parameters:{layout:"centered",docs:{description:{component:"Alert dialog component for confirming destructive actions. Used to interrupt users and ask them to confirm an action, especially for irreversible operations."}}},tags:["autodocs"],argTypes:{open:{control:"boolean",description:"Controlled open state of the dialog"},defaultOpen:{control:"boolean",description:"Default open state when uncontrolled"}}},u={render:()=>e.jsxs(r,{children:[e.jsx(d,{asChild:!0,children:e.jsx(c,{variant:"outline",children:"Show Dialog"})}),e.jsxs(o,{children:[e.jsxs(n,{children:[e.jsx(i,{children:"Are you absolutely sure?"}),e.jsx(l,{children:"This action cannot be undone. This will permanently delete your account and remove your data from our servers."})]}),e.jsxs(a,{children:[e.jsx(s,{children:"Cancel"}),e.jsx(t,{children:"Continue"})]})]})]})},g={render:()=>e.jsxs(r,{children:[e.jsx(d,{asChild:!0,children:e.jsx(c,{variant:"destructive",children:"Delete Account"})}),e.jsxs(o,{children:[e.jsxs(n,{children:[e.jsx(i,{children:"Are you absolutely sure?"}),e.jsx(l,{children:"This action cannot be undone. This will permanently delete your account and remove your data from our servers."})]}),e.jsxs(a,{children:[e.jsx(s,{children:"Cancel"}),e.jsx(t,{className:"bg-destructive text-destructive-foreground hover:bg-destructive/90",children:"Yes, delete account"})]})]})]})},m={render:()=>e.jsxs(r,{children:[e.jsx(d,{asChild:!0,children:e.jsx(c,{children:"Show Custom Dialog"})}),e.jsxs(o,{children:[e.jsxs(n,{children:[e.jsx(i,{children:"Save Changes?"}),e.jsx(l,{children:"You have unsaved changes. Do you want to save them before leaving?"})]}),e.jsxs(a,{children:[e.jsx(s,{children:"Don't Save"}),e.jsx(t,{variant:"outline",children:"Cancel"}),e.jsx(t,{children:"Save Changes"})]})]})]})},D={render:function(){const[N,h]=z.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(c,{onClick:()=>h(!0),children:"Open Dialog"}),e.jsx(r,{open:N,onOpenChange:h,children:e.jsxs(o,{children:[e.jsxs(n,{children:[e.jsx(i,{children:"Controlled Dialog"}),e.jsx(l,{children:"This dialog is controlled via external state."})]}),e.jsxs(a,{children:[e.jsx(s,{children:"Cancel"}),e.jsx(t,{children:"Confirm"})]})]})})]})}},p={render:()=>e.jsxs(r,{children:[e.jsx(d,{asChild:!0,children:e.jsx(c,{variant:"outline",children:"Show Long Content"})}),e.jsxs(o,{children:[e.jsxs(n,{children:[e.jsx(i,{children:"Terms of Service"}),e.jsx(l,{className:"max-h-[200px] overflow-y-auto",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."})]}),e.jsxs(a,{children:[e.jsx(s,{children:"Decline"}),e.jsx(t,{children:"Accept"})]})]})]})},A={render:()=>e.jsxs(r,{children:[e.jsx(d,{asChild:!0,children:e.jsxs(c,{variant:"outline",children:[e.jsx("svg",{className:"mr-2 h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),"Warning Action"]})}),e.jsxs(o,{children:[e.jsxs(n,{children:[e.jsx(i,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("svg",{className:"h-5 w-5 text-destructive",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),"Warning"]})}),e.jsx(l,{children:"This is a potentially dangerous action. Are you sure you want to proceed?"})]}),e.jsxs(a,{children:[e.jsx(s,{children:"Cancel"}),e.jsx(t,{variant:"destructive",children:"Proceed"})]})]})]})};var x,v,C;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...(C=(v=u.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var j,f,w;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Yes, delete account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...(w=(f=g.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var T,y,b;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Show Custom Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save Changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Do you want to save them before leaving?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Don&apos;t Save</AlertDialogCancel>
          <AlertDialogAction variant="outline">Cancel</AlertDialogAction>
          <AlertDialogAction>Save Changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...(b=(y=m.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var S,L,k;D.parameters={...D.parameters,docs:{...(S=D.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function ControlledDialog() {
    const [open, setOpen] = React.useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
              <AlertDialogDescription>
                This dialog is controlled via external state.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>;
  }
}`,...(k=(L=D.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};var q,B,F;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Long Content</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Terms of Service</AlertDialogTitle>
          <AlertDialogDescription className="max-h-[200px] overflow-y-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Decline</AlertDialogCancel>
          <AlertDialogAction>Accept</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...(F=(B=p.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var H,W,O;A.parameters={...A.parameters,docs:{...(H=A.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Warning Action
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Warning
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            This is a potentially dangerous action. Are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Proceed</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...(O=(W=A.parameters)==null?void 0:W.docs)==null?void 0:O.source}}};const se=["Default","DestructiveAction","WithCustomContent","ControlledState","LongContent","WithIcon"];export{D as ControlledState,u as Default,g as DestructiveAction,p as LongContent,m as WithCustomContent,A as WithIcon,se as __namedExportsOrder,ae as default};
