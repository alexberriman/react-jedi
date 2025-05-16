import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as d}from"./index-tvICUrOf.js";import{t as ne,C as r,a as y}from"./calendar-Dm7ZjOTA.js";import"./index-yBjzXJbu.js";import"./utils-C3T1saKV.js";import"./button-CrD3QBL2.js";import"./index-CY5ieB2z.js";import"./index-Y0L-LdVC.js";import"./chevron-right-CXqqwl8R.js";import"./createLucideIcon-CO2y_x_O.js";import"./chevron-left-DomjNo0l.js";function se(a){return ne(a).getDay()===6}function re(a){return ne(a).getDay()===0}const ge={title:"Components/UI/Calendar",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{mode:{control:{type:"select"},options:["single","multiple","range"],description:"The selection mode for the calendar",defaultValue:"single"},showOutsideDays:{control:{type:"boolean"},description:"Whether to show days outside the current month",defaultValue:!0},fixedWeeks:{control:{type:"boolean"},description:"Display fixed weeks to avoid layout shifts",defaultValue:!1},numberOfMonths:{control:{type:"number",min:1,max:12},description:"The number of months to display",defaultValue:1},initialFocus:{control:{type:"boolean"},description:"Whether the calendar should have focus when mounted",defaultValue:!1}}},l={args:{mode:"single",showOutsideDays:!0}},c={render:()=>{const a=()=>{const[t,n]=d.useState(new Date);return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{mode:"single",selected:t,onSelect:n}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Selected date: ",(t==null?void 0:t.toDateString())||"None"]})]})};return e.jsx(a,{})}},i={render:()=>{const a=()=>{const[t,n]=d.useState([]);return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{mode:"multiple",selected:t,onSelect:n}),e.jsxs("div",{className:"text-sm text-muted-foreground",children:[e.jsx("p",{children:"Selected dates:"}),e.jsx("ul",{children:t==null?void 0:t.map((s,o)=>e.jsx("li",{children:s.toDateString()},o))})]})]})};return e.jsx(a,{})}},m={render:()=>{const a=()=>{var s,o;const[t,n]=d.useState({from:new Date,to:y(new Date,7)});return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{mode:"range",selected:t,onSelect:n,numberOfMonths:2}),e.jsx("div",{className:"text-sm text-muted-foreground",children:e.jsxs("p",{children:["From: ",((s=t==null?void 0:t.from)==null?void 0:s.toDateString())||"Not selected",e.jsx("br",{}),"To: ",((o=t==null?void 0:t.to)==null?void 0:o.toDateString())||"Not selected"]})})]})};return e.jsx(a,{})}},u={render:()=>{const a=()=>{const[t,n]=d.useState(new Date),s=o=>se(o)||re(o);return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{mode:"single",selected:t,onSelect:n,disabled:s}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Weekends are disabled. Selected: ",(t==null?void 0:t.toDateString())||"None"]})]})};return e.jsx(a,{})}},p={render:()=>{const a=()=>{const[t,n]=d.useState(new Date),s=[new Date,y(new Date,1),y(new Date,2)];return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{mode:"single",selected:t,onSelect:n,disabled:s}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Today and next 2 days are disabled"})]})};return e.jsx(a,{})}},x={render:()=>{const a=()=>{const[t,n]=d.useState(new Date);return e.jsx(r,{mode:"single",selected:t,onSelect:n,numberOfMonths:3})};return e.jsx(a,{})}},D={render:()=>{const a=()=>{const[t,n]=d.useState(new Date),s=new Date,o=y(new Date,30);return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{mode:"single",selected:t,onSelect:n,fromDate:s,toDate:o}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"You can only select dates within the next 30 days"})]})};return e.jsx(a,{})}},f={render:()=>{const a=()=>{const[t,n]=d.useState(new Date),s=new Date().getFullYear();return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{mode:"single",selected:t,onSelect:n,fromYear:s-5,toYear:s+5}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Years are limited to ±5 years from current year"})]})};return e.jsx(a,{})}},g={args:{mode:"single",showOutsideDays:!1}},S={args:{mode:"single",fixedWeeks:!0}},h={render:()=>{const a=()=>{const[t,n]=d.useState(new Date),s={type:"calendar",mode:"single",selected:t==null?void 0:t.toISOString(),showOutsideDays:!0,numberOfMonths:1,onSelect:"handleDateSelect"};return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"p-4 bg-muted rounded-lg",children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"JSON Specification:"}),e.jsx("pre",{className:"text-xs",children:JSON.stringify(s,null,2)})]}),e.jsx(r,{mode:"single",selected:t,onSelect:n})]})};return e.jsx(a,{})}};var N,w,j;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    mode: "single",
    showOutsideDays: true
  }
}`,...(j=(w=l.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var b,v,E;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const SingleDateExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());
      return <div className="flex flex-col gap-4">
          <Calendar mode="single" selected={date} onSelect={setDate} />
          <p className="text-sm text-muted-foreground">
            Selected date: {date?.toDateString() || "None"}
          </p>
        </div>;
    };
    return <SingleDateExample />;
  }
}`,...(E=(v=c.parameters)==null?void 0:v.docs)==null?void 0:E.source}}};var O,C,M;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const MultipleDateExample = () => {
      const [dates, setDates] = useState<Date[] | undefined>([]);
      return <div className="flex flex-col gap-4">
          <Calendar mode="multiple" selected={dates} onSelect={setDates} />
          <div className="text-sm text-muted-foreground">
            <p>Selected dates:</p>
            <ul>{dates?.map((date, index) => <li key={index}>{date.toDateString()}</li>)}</ul>
          </div>
        </div>;
    };
    return <MultipleDateExample />;
  }
}`,...(M=(C=i.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var W,Y,k;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => {
    const DateRangeExample = () => {
      const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7)
      });
      return <div className="flex flex-col gap-4">
          <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
          <div className="text-sm text-muted-foreground">
            <p>
              From: {dateRange?.from?.toDateString() || "Not selected"}
              <br />
              To: {dateRange?.to?.toDateString() || "Not selected"}
            </p>
          </div>
        </div>;
    };
    return <DateRangeExample />;
  }
}`,...(k=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:k.source}}};var R,J,F;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => {
    const DisabledDatesExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());

      // Disable weekends
      const isWeekend = (date: Date) => {
        return isSaturday(date) || isSunday(date);
      };
      return <div className="flex flex-col gap-4">
          <Calendar mode="single" selected={date} onSelect={setDate} disabled={isWeekend} />
          <p className="text-sm text-muted-foreground">
            Weekends are disabled. Selected: {date?.toDateString() || "None"}
          </p>
        </div>;
    };
    return <DisabledDatesExample />;
  }
}`,...(F=(J=u.parameters)==null?void 0:J.docs)==null?void 0:F.source}}};var T,V,I;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    const SpecificDisabledDatesExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());
      const disabledDates = [new Date(), addDays(new Date(), 1), addDays(new Date(), 2)];
      return <div className="flex flex-col gap-4">
          <Calendar mode="single" selected={date} onSelect={setDate} disabled={disabledDates} />
          <p className="text-sm text-muted-foreground">Today and next 2 days are disabled</p>
        </div>;
    };
    return <SpecificDisabledDatesExample />;
  }
}`,...(I=(V=p.parameters)==null?void 0:V.docs)==null?void 0:I.source}}};var L,_,U;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    const MultipleMonthsExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());
      return <Calendar mode="single" selected={date} onSelect={setDate} numberOfMonths={3} />;
    };
    return <MultipleMonthsExample />;
  }
}`,...(U=(_=x.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};var q,z,A;D.parameters={...D.parameters,docs:{...(q=D.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    const DateConstraintsExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());
      const fromDate = new Date();
      const toDate = addDays(new Date(), 30);
      return <div className="flex flex-col gap-4">
          <Calendar mode="single" selected={date} onSelect={setDate} fromDate={fromDate} toDate={toDate} />
          <p className="text-sm text-muted-foreground">
            You can only select dates within the next 30 days
          </p>
        </div>;
    };
    return <DateConstraintsExample />;
  }
}`,...(A=(z=D.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var B,G,H;f.parameters={...f.parameters,docs:{...(B=f.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const YearConstraintsExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());
      const currentYear = new Date().getFullYear();
      return <div className="flex flex-col gap-4">
          <Calendar mode="single" selected={date} onSelect={setDate} fromYear={currentYear - 5} toYear={currentYear + 5} />
          <p className="text-sm text-muted-foreground">
            Years are limited to ±5 years from current year
          </p>
        </div>;
    };
    return <YearConstraintsExample />;
  }
}`,...(H=(G=f.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var K,P,Q;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    mode: "single",
    showOutsideDays: false
  }
}`,...(Q=(P=g.parameters)==null?void 0:P.docs)==null?void 0:Q.source}}};var X,Z,$;S.parameters={...S.parameters,docs:{...(X=S.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    mode: "single",
    fixedWeeks: true
  }
}`,...($=(Z=S.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,te,ae;h.parameters={...h.parameters,docs:{...(ee=h.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => {
    const JsonSpecificationExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());

      // Example of how it would work with JSON specification
      const specification = {
        type: "calendar",
        mode: "single",
        selected: date?.toISOString(),
        showOutsideDays: true,
        numberOfMonths: 1,
        onSelect: "handleDateSelect"
      };
      return <div className="flex flex-col gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">JSON Specification:</p>
            <pre className="text-xs">{JSON.stringify(specification, null, 2)}</pre>
          </div>
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>;
    };
    return <JsonSpecificationExample />;
  }
}`,...(ae=(te=h.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};const Se=["Default","SingleDateSelection","MultipleDateSelection","DateRangeSelection","WithDisabledDates","WithSpecificDisabledDates","MultipleMonths","WithDateConstraints","WithYearConstraints","WithoutOutsideDays","FixedWeeksLayout","FromJsonSpecification"];export{m as DateRangeSelection,l as Default,S as FixedWeeksLayout,h as FromJsonSpecification,i as MultipleDateSelection,x as MultipleMonths,c as SingleDateSelection,D as WithDateConstraints,u as WithDisabledDates,p as WithSpecificDisabledDates,f as WithYearConstraints,g as WithoutOutsideDays,Se as __namedExportsOrder,ge as default};
