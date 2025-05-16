import{j as l}from"./jsx-runtime-Cf8x2fCZ.js";import{r as s}from"./index-tvICUrOf.js";import{c as t}from"./utils-C3T1saKV.js";const d=s.forwardRef(({className:e,children:a,...o},T)=>l.jsx("div",{className:"relative w-full overflow-x-auto",children:l.jsx("table",{ref:T,className:t("w-full caption-bottom text-sm",e),...o,children:a})}));d.displayName="Table";const r=s.forwardRef(({className:e,...a},o)=>l.jsx("thead",{ref:o,className:t("[&_tr]:border-b",e),...a}));r.displayName="TableHeader";const n=s.forwardRef(({className:e,...a},o)=>l.jsx("tbody",{ref:o,className:t("[&_tr:last-child]:border-0",e),...a}));n.displayName="TableBody";const b=s.forwardRef(({className:e,...a},o)=>l.jsx("tfoot",{ref:o,className:t("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",e),...a}));b.displayName="TableFooter";const c=s.forwardRef(({className:e,...a},o)=>l.jsx("tr",{ref:o,className:t("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",e),...a}));c.displayName="TableRow";const m=s.forwardRef(({className:e,...a},o)=>l.jsx("th",{ref:o,className:t("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...a}));m.displayName="TableHead";const i=s.forwardRef(({className:e,...a},o)=>l.jsx("td",{ref:o,className:t("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...a}));i.displayName="TableCell";const p=s.forwardRef(({className:e,...a},o)=>l.jsx("caption",{ref:o,className:t("text-muted-foreground mt-4 text-sm",e),...a}));p.displayName="TableCaption";d.__docgenInfo={description:`Table component that serves as a container for table elements.
This is a composable component where headers are added through
TableHeader and TableHead components.

Usage example:
\`\`\`tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
\`\`\``,methods:[],displayName:"Table",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};r.__docgenInfo={description:"",methods:[],displayName:"TableHeader"};n.__docgenInfo={description:"",methods:[],displayName:"TableBody"};b.__docgenInfo={description:"",methods:[],displayName:"TableFooter"};m.__docgenInfo={description:"",methods:[],displayName:"TableHead"};c.__docgenInfo={description:"",methods:[],displayName:"TableRow"};i.__docgenInfo={description:"",methods:[],displayName:"TableCell"};p.__docgenInfo={description:"",methods:[],displayName:"TableCaption"};export{d as T,p as a,r as b,c,m as d,n as e,i as f,b as g};
