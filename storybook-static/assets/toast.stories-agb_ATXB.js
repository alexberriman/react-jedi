import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{B as n}from"./button-MXz0hby-.js";import{T as g,t as o}from"./toast-BzGKN9ud.js";import"./index-yBjzXJbu.js";import"./index-CtJ-PWby.js";import"./index-BlmOqGMO.js";import"./index-Y0L-LdVC.js";import"./utils-C3T1saKV.js";import"./index-C4bLmoCR.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";const ee={title:"Components/UI/Toast",component:g,decorators:[s=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsx(g,{})]})],parameters:{layout:"centered",docs:{description:{component:"Beautiful, modern toast notifications for React. Built with Sonner."}}}},t={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(n,{onClick:()=>o("This is a basic toast notification"),children:"Show Basic Toast"}),e.jsx(n,{onClick:()=>o.success("Success! Operation completed."),children:"Show Success Toast"}),e.jsx(n,{onClick:()=>o.error("Error! Something went wrong."),children:"Show Error Toast"}),e.jsx(n,{onClick:()=>o.warning("Warning! Please check your input."),children:"Show Warning Toast"}),e.jsx(n,{onClick:()=>o.info("Info: Here is some information."),children:"Show Info Toast"})]})},i={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(n,{onClick:()=>o("New message received",{description:"Your friend John sent you a message."}),children:"Toast with Description"}),e.jsx(n,{onClick:()=>o.success("Payment completed",{description:"Your payment has been processed successfully.",duration:5e3}),children:"Success with Details"})]})},r={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(n,{onClick:()=>o("Quick message",{duration:1e3}),children:"Short Duration (1s)"}),e.jsx(n,{onClick:()=>o("Important message",{duration:1e4}),children:"Long Duration (10s)"})]})},a={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(n,{onClick:()=>o("File uploaded",{action:{label:"Undo",onClick:()=>o("Upload cancelled")}}),children:"Toast with Action Button"}),e.jsx(n,{onClick:()=>o.success("Settings saved",{description:"Your preferences have been updated.",action:{label:"View",onClick:()=>globalThis.alert("Viewing settings...")}}),children:"Success with Action"})]})},c={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(n,{onClick:()=>{o("Top-left position")},children:"Default Position (Bottom-right)"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Position is controlled by the Toaster component style prop"})]})},l={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(n,{onClick:()=>{const s=new Promise(p=>globalThis.setTimeout(p,2e3));o.promise(s,{loading:"Loading...",success:"Operation completed!",error:"Failed to complete operation"})},children:"Promise Toast"}),e.jsx(n,{onClick:()=>{const s=new Promise((p,J)=>globalThis.setTimeout(J,2e3));o.promise(s,{loading:"Processing...",success:"Should not show",error:"Operation failed as expected"})},children:"Failed Promise"})]})},d={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(n,{onClick:()=>o("Custom styled toast",{style:{background:"#8B5CF6",color:"#FFFFFF",border:"none"}}),children:"Purple Toast"}),e.jsx(n,{onClick:()=>o("Gradient background",{style:{background:"linear-gradient(to right, #EC4899, #8B5CF6)",color:"#FFFFFF",border:"none"}}),children:"Gradient Toast"})]})},m={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(n,{onClick:()=>{const s=o.loading("Uploading file...");globalThis.setTimeout(()=>{o.success("File uploaded successfully",{id:s})},3e3)},children:"Loading to Success"}),e.jsx(n,{onClick:()=>{const s=o.loading("Processing payment...");globalThis.setTimeout(()=>{o.error("Payment failed",{id:s,description:"Your card was declined."})},2e3)},children:"Loading to Error"})]})},u={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(n,{onClick:()=>o(e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx("span",{className:"text-primary",children:"🎉"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold",children:"Welcome aboard!"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Your account is ready"})]})]})),children:"Custom JSX Content"}),e.jsx(n,{onClick:()=>o.custom(s=>e.jsxs("div",{className:"bg-card border rounded-lg p-4 shadow-lg",children:[e.jsx("h4",{className:"font-semibold mb-2",children:"Custom Toast Component"}),e.jsx("p",{className:"text-sm text-muted-foreground mb-3",children:"This is a completely custom toast design."}),e.jsx(n,{size:"sm",onClick:()=>o.dismiss(s),children:"Dismiss"})]})),children:"Fully Custom Toast"})]})};var h,x,f;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Button onClick={() => toast("This is a basic toast notification")}>Show Basic Toast</Button>
      <Button onClick={() => toast.success("Success! Operation completed.")}>
        Show Success Toast
      </Button>
      <Button onClick={() => toast.error("Error! Something went wrong.")}>Show Error Toast</Button>
      <Button onClick={() => toast.warning("Warning! Please check your input.")}>
        Show Warning Toast
      </Button>
      <Button onClick={() => toast.info("Info: Here is some information.")}>Show Info Toast</Button>
    </div>
}`,...(f=(x=t.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var C,B,k;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Button onClick={() => toast("New message received", {
      description: "Your friend John sent you a message."
    })}>
        Toast with Description
      </Button>
      <Button onClick={() => toast.success("Payment completed", {
      description: "Your payment has been processed successfully.",
      duration: 5000
    })}>
        Success with Details
      </Button>
    </div>
}`,...(k=(B=i.parameters)==null?void 0:B.docs)==null?void 0:k.source}}};var T,j,b;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Button onClick={() => toast("Quick message", {
      duration: 1000
    })}>
        Short Duration (1s)
      </Button>
      <Button onClick={() => toast("Important message", {
      duration: 10_000
    })}>
        Long Duration (10s)
      </Button>
    </div>
}`,...(b=(j=r.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var v,F,S;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Button onClick={() => toast("File uploaded", {
      action: {
        label: "Undo",
        onClick: () => toast("Upload cancelled")
      }
    })}>
        Toast with Action Button
      </Button>
      <Button onClick={() => toast.success("Settings saved", {
      description: "Your preferences have been updated.",
      action: {
        label: "View",
        onClick: () => globalThis.alert("Viewing settings...")
      }
    })}>
        Success with Action
      </Button>
    </div>
}`,...(S=(F=a.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};var w,y,N;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Button onClick={() => {
      toast("Top-left position");
    }}>
        Default Position (Bottom-right)
      </Button>
      <p className="text-sm text-muted-foreground">
        Position is controlled by the Toaster component style prop
      </p>
    </div>
}`,...(N=(y=c.parameters)==null?void 0:y.docs)==null?void 0:N.source}}};var P,D,I;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Button onClick={() => {
      const promiseFunction = new Promise(resolve => globalThis.setTimeout(resolve, 2000));
      toast.promise(promiseFunction, {
        loading: "Loading...",
        success: "Operation completed!",
        error: "Failed to complete operation"
      });
    }}>
        Promise Toast
      </Button>
      <Button onClick={() => {
      const promiseFunction = new Promise((_, reject) => globalThis.setTimeout(reject, 2000));
      toast.promise(promiseFunction, {
        loading: "Processing...",
        success: "Should not show",
        error: "Operation failed as expected"
      });
    }}>
        Failed Promise
      </Button>
    </div>
}`,...(I=(D=l.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var E,L,W;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Button onClick={() => toast("Custom styled toast", {
      style: {
        background: "#8B5CF6",
        color: "#FFFFFF",
        border: "none"
      }
    })}>
        Purple Toast
      </Button>
      <Button onClick={() => toast("Gradient background", {
      style: {
        background: "linear-gradient(to right, #EC4899, #8B5CF6)",
        color: "#FFFFFF",
        border: "none"
      }
    })}>
        Gradient Toast
      </Button>
    </div>
}`,...(W=(L=d.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var Y,O,A;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Button onClick={() => {
      const toastId = toast.loading("Uploading file...");
      globalThis.setTimeout(() => {
        toast.success("File uploaded successfully", {
          id: toastId
        });
      }, 3000);
    }}>
        Loading to Success
      </Button>
      <Button onClick={() => {
      const toastId = toast.loading("Processing payment...");
      globalThis.setTimeout(() => {
        toast.error("Payment failed", {
          id: toastId,
          description: "Your card was declined."
        });
      }, 2000);
    }}>
        Loading to Error
      </Button>
    </div>
}`,...(A=(O=m.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var U,_,G;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Button onClick={() => toast(<div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary">🎉</span>
              </div>
              <div>
                <p className="font-semibold">Welcome aboard!</p>
                <p className="text-sm text-muted-foreground">Your account is ready</p>
              </div>
            </div>)}>
        Custom JSX Content
      </Button>
      <Button onClick={() => toast.custom(t => <div className="bg-card border rounded-lg p-4 shadow-lg">
              <h4 className="font-semibold mb-2">Custom Toast Component</h4>
              <p className="text-sm text-muted-foreground mb-3">
                This is a completely custom toast design.
              </p>
              <Button size="sm" onClick={() => toast.dismiss(t)}>
                Dismiss
              </Button>
            </div>)}>
        Fully Custom Toast
      </Button>
    </div>
}`,...(G=(_=u.parameters)==null?void 0:_.docs)==null?void 0:G.source}}};const oe=["Basic","WithDescription","CustomDuration","WithAction","Positioning","AsyncOperations","CustomStyling","LoadingStates","RichContent"];export{l as AsyncOperations,t as Basic,r as CustomDuration,d as CustomStyling,m as LoadingStates,c as Positioning,u as RichContent,a as WithAction,i as WithDescription,oe as __namedExportsOrder,ee as default};
