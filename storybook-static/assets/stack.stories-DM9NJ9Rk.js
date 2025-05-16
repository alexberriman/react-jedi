import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{S as r}from"./stack-Cr87zm11.js";import{C as s,a as n}from"./card-DI9eU4No.js";import{B as o}from"./button-CrD3QBL2.js";import{B as u}from"./badge-Dv-F_FtT.js";import{T as t}from"./text-BVNhesrM.js";import{S as G}from"./separator-DHobxHAc.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./index-Y0L-LdVC.js";import"./utils-C3T1saKV.js";import"./index-CY5ieB2z.js";import"./index-DkqaS01M.js";import"./index-nFMdVv6h.js";import"./index-_r67kdfS.js";import"./index-fNjTmf9T.js";const ne={title:"Components/Layout/Stack",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{orientation:{options:["horizontal","vertical"],control:{type:"radio"}},spacing:{options:["none","xs","sm","md","lg","xl","2xl","3xl"],control:{type:"select"}},align:{options:["start","center","end","stretch","baseline"],control:{type:"select"}},justify:{options:["start","center","end","between","around","evenly"],control:{type:"select"}},wrap:{options:["wrap","nowrap","wrap-reverse"],control:{type:"select"}}}},c={args:{children:e.jsxs(e.Fragment,{children:[e.jsx(s,{className:"w-48",children:e.jsx(n,{className:"p-4",children:e.jsx(t,{children:"First Item"})})}),e.jsx(s,{className:"w-48",children:e.jsx(n,{className:"p-4",children:e.jsx(t,{children:"Second Item"})})}),e.jsx(s,{className:"w-48",children:e.jsx(n,{className:"p-4",children:e.jsx(t,{children:"Third Item"})})})]})}},l={args:{orientation:"horizontal",spacing:"md",children:e.jsxs(e.Fragment,{children:[e.jsx(o,{variant:"default",children:"Button 1"}),e.jsx(o,{variant:"secondary",children:"Button 2"}),e.jsx(o,{variant:"outline",children:"Button 3"})]})}},i={args:{orientation:"vertical",align:"center",spacing:"lg",children:e.jsxs(e.Fragment,{children:[e.jsx(t,{className:"text-2xl font-bold",children:"Centered Title"}),e.jsx(t,{className:"text-muted-foreground max-w-md text-center",children:"This is a subtitle with more information about the content below."}),e.jsx(o,{children:"Get Started"})]})}},d={render:()=>e.jsx("div",{className:"space-y-8",children:["xs","sm","md","lg","xl","2xl"].map(a=>e.jsxs("div",{children:[e.jsxs(t,{className:"mb-2 font-semibold",children:["Spacing: ",a]}),e.jsxs(r,{orientation:"horizontal",spacing:a,children:[e.jsx(u,{children:"Badge 1"}),e.jsx(u,{variant:"secondary",children:"Badge 2"}),e.jsx(u,{variant:"outline",children:"Badge 3"})]})]},a))})},m={args:{orientation:"vertical",spacing:"md",divider:e.jsx(G,{className:"my-2"}),children:e.jsxs(e.Fragment,{children:[e.jsx(s,{children:e.jsxs(n,{className:"p-4",children:[e.jsx(t,{className:"font-semibold",children:"Section 1"}),e.jsx(t,{className:"text-sm text-muted-foreground",children:"This is the first section"})]})}),e.jsx(s,{children:e.jsxs(n,{className:"p-4",children:[e.jsx(t,{className:"font-semibold",children:"Section 2"}),e.jsx(t,{className:"text-sm text-muted-foreground",children:"This is the second section"})]})}),e.jsx(s,{children:e.jsxs(n,{className:"p-4",children:[e.jsx(t,{className:"font-semibold",children:"Section 3"}),e.jsx(t,{className:"text-sm text-muted-foreground",children:"This is the third section"})]})})]})}},x={args:{orientation:"horizontal",spacing:"md",wrap:"wrap",children:e.jsx(e.Fragment,{children:[1,2,3,4,5,6].map(a=>e.jsx(s,{className:"w-48",children:e.jsx(n,{className:"p-4",children:e.jsxs(t,{children:["Item ",a]})})},a))})}},p={render:()=>e.jsx("div",{className:"space-y-8 w-full",children:["start","center","end","between","around","evenly"].map(a=>e.jsxs("div",{className:"w-full",children:[e.jsxs(t,{className:"mb-2 font-semibold",children:["Justify: ",a]}),e.jsx("div",{className:"w-full border rounded-lg p-2",children:e.jsxs(r,{orientation:"horizontal",justify:a,className:"w-full",children:[e.jsx(o,{size:"sm",children:"A"}),e.jsx(o,{size:"sm",children:"B"}),e.jsx(o,{size:"sm",children:"C"})]})})]},a))})},h={args:{orientation:"vertical",spacing:"lg",align:"center",className:"w-full max-w-4xl",children:e.jsxs(e.Fragment,{children:[e.jsx(t,{className:"text-3xl font-bold",children:"Dashboard"}),e.jsxs(r,{orientation:"horizontal",spacing:"md",className:"w-full",children:[e.jsx(s,{className:"flex-1",children:e.jsx(n,{className:"p-6",children:e.jsxs(r,{spacing:"sm",children:[e.jsx(t,{className:"text-lg font-semibold",children:"Analytics"}),e.jsx(t,{className:"text-2xl font-bold",children:"24,543"}),e.jsx(t,{className:"text-sm text-muted-foreground",children:"+12% from last month"})]})})}),e.jsx(s,{className:"flex-1",children:e.jsx(n,{className:"p-6",children:e.jsxs(r,{spacing:"sm",children:[e.jsx(t,{className:"text-lg font-semibold",children:"Revenue"}),e.jsx(t,{className:"text-2xl font-bold",children:"$54,239"}),e.jsx(t,{className:"text-sm text-muted-foreground",children:"+24% from last month"})]})})}),e.jsx(s,{className:"flex-1",children:e.jsx(n,{className:"p-6",children:e.jsxs(r,{spacing:"sm",children:[e.jsx(t,{className:"text-lg font-semibold",children:"Users"}),e.jsx(t,{className:"text-2xl font-bold",children:"3,287"}),e.jsx(t,{className:"text-sm text-muted-foreground",children:"+18% from last month"})]})})})]}),e.jsx(s,{className:"w-full",children:e.jsx(n,{className:"p-6",children:e.jsxs(r,{spacing:"md",children:[e.jsx(t,{className:"text-xl font-semibold",children:"Recent Activity"}),e.jsxs(r,{spacing:"sm",children:[e.jsx(t,{className:"text-sm",children:"User john@example.com signed up"}),e.jsx(t,{className:"text-sm",children:"New order #1234 received"}),e.jsx(t,{className:"text-sm",children:"Payment processed for $99.99"})]})]})})})]})}};var g,N,f;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: <>
        <Card className="w-48">
          <CardContent className="p-4">
            <Text>First Item</Text>
          </CardContent>
        </Card>
        <Card className="w-48">
          <CardContent className="p-4">
            <Text>Second Item</Text>
          </CardContent>
        </Card>
        <Card className="w-48">
          <CardContent className="p-4">
            <Text>Third Item</Text>
          </CardContent>
        </Card>
      </>
  }
}`,...(f=(N=c.parameters)==null?void 0:N.docs)==null?void 0:f.source}}};var j,C,T;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal",
    spacing: "md",
    children: <>
        <Button variant="default">Button 1</Button>
        <Button variant="secondary">Button 2</Button>
        <Button variant="outline">Button 3</Button>
      </>
  }
}`,...(T=(C=l.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var v,S,w;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    orientation: "vertical",
    align: "center",
    spacing: "lg",
    children: <>
        <Text className="text-2xl font-bold">Centered Title</Text>
        <Text className="text-muted-foreground max-w-md text-center">
          This is a subtitle with more information about the content below.
        </Text>
        <Button>Get Started</Button>
      </>
  }
}`,...(w=(S=i.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var b,y,B;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map(spacing => <div key={spacing}>
          <Text className="mb-2 font-semibold">Spacing: {spacing}</Text>
          <Stack orientation="horizontal" spacing={spacing}>
            <Badge>Badge 1</Badge>
            <Badge variant="secondary">Badge 2</Badge>
            <Badge variant="outline">Badge 3</Badge>
          </Stack>
        </div>)}
    </div>
}`,...(B=(y=d.parameters)==null?void 0:y.docs)==null?void 0:B.source}}};var k,z,F;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    orientation: "vertical",
    spacing: "md",
    divider: <Separator className="my-2" />,
    children: <>
        <Card>
          <CardContent className="p-4">
            <Text className="font-semibold">Section 1</Text>
            <Text className="text-sm text-muted-foreground">This is the first section</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text className="font-semibold">Section 2</Text>
            <Text className="text-sm text-muted-foreground">This is the second section</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text className="font-semibold">Section 3</Text>
            <Text className="text-sm text-muted-foreground">This is the third section</Text>
          </CardContent>
        </Card>
      </>
  }
}`,...(F=(z=m.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};var I,R,A;x.parameters={...x.parameters,docs:{...(I=x.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal",
    spacing: "md",
    wrap: "wrap",
    children: <>
        {[1, 2, 3, 4, 5, 6].map(i => <Card key={i} className="w-48">
            <CardContent className="p-4">
              <Text>Item {i}</Text>
            </CardContent>
          </Card>)}
      </>
  }
}`,...(A=(R=x.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var D,J,U;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 w-full">
      {(["start", "center", "end", "between", "around", "evenly"] as const).map(justify => <div key={justify} className="w-full">
          <Text className="mb-2 font-semibold">Justify: {justify}</Text>
          <div className="w-full border rounded-lg p-2">
            <Stack orientation="horizontal" justify={justify} className="w-full">
              <Button size="sm">A</Button>
              <Button size="sm">B</Button>
              <Button size="sm">C</Button>
            </Stack>
          </div>
        </div>)}
    </div>
}`,...(U=(J=p.parameters)==null?void 0:J.docs)==null?void 0:U.source}}};var $,L,E;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    orientation: "vertical",
    spacing: "lg",
    align: "center",
    className: "w-full max-w-4xl",
    children: <>
        <Text className="text-3xl font-bold">Dashboard</Text>
        <Stack orientation="horizontal" spacing="md" className="w-full">
          <Card className="flex-1">
            <CardContent className="p-6">
              <Stack spacing="sm">
                <Text className="text-lg font-semibold">Analytics</Text>
                <Text className="text-2xl font-bold">24,543</Text>
                <Text className="text-sm text-muted-foreground">+12% from last month</Text>
              </Stack>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="p-6">
              <Stack spacing="sm">
                <Text className="text-lg font-semibold">Revenue</Text>
                <Text className="text-2xl font-bold">$54,239</Text>
                <Text className="text-sm text-muted-foreground">+24% from last month</Text>
              </Stack>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="p-6">
              <Stack spacing="sm">
                <Text className="text-lg font-semibold">Users</Text>
                <Text className="text-2xl font-bold">3,287</Text>
                <Text className="text-sm text-muted-foreground">+18% from last month</Text>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
        <Card className="w-full">
          <CardContent className="p-6">
            <Stack spacing="md">
              <Text className="text-xl font-semibold">Recent Activity</Text>
              <Stack spacing="sm">
                <Text className="text-sm">User john@example.com signed up</Text>
                <Text className="text-sm">New order #1234 received</Text>
                <Text className="text-sm">Payment processed for $99.99</Text>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </>
  }
}`,...(E=(L=h.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};const ae=["Default","Horizontal","VerticalCentered","SpacingShowcase","WithDivider","Responsive","JustifyShowcase","ComplexLayout"];export{h as ComplexLayout,c as Default,l as Horizontal,p as JustifyShowcase,x as Responsive,d as SpacingShowcase,i as VerticalCentered,m as WithDivider,ae as __namedExportsOrder,ne as default};
