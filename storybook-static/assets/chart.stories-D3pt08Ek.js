import{C as Q}from"./chart-CdUgKCDI.js";import"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";import"./index-tvICUrOf.js";import"./utils-C3T1saKV.js";import"./tiny-invariant-CopsF_GD.js";const le={title:"Components/DataDisplay/Chart",component:Q,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{chartType:{control:"select",options:["line","bar","area","pie","radar","radialBar"]}}},e=[{name:"Jan",desktop:65,mobile:45},{name:"Feb",desktop:72,mobile:52},{name:"Mar",desktop:68,mobile:48},{name:"Apr",desktop:80,mobile:60},{name:"May",desktop:75,mobile:58},{name:"Jun",desktop:85,mobile:68}],h=[{name:"Page A",visitors:2400,unique:1398},{name:"Page B",visitors:1398,unique:800},{name:"Page C",visitors:9800,unique:4567},{name:"Page D",visitors:3908,unique:2345},{name:"Page E",visitors:4800,unique:3456},{name:"Page F",visitors:3800,unique:2567}],z=[{name:"Desktop",value:400,fill:"#0088FE"},{name:"Mobile",value:300,fill:"#00C49F"},{name:"Tablet",value:300,fill:"#FFBB28"},{name:"Other",value:200,fill:"#FF8042"}],Z=[{subject:"Math",A:120,B:110,fullMark:150},{subject:"Chinese",A:98,B:130,fullMark:150},{subject:"English",A:86,B:130,fullMark:150},{subject:"Geography",A:99,B:100,fullMark:150},{subject:"Physics",A:85,B:90,fullMark:150},{subject:"History",A:65,B:85,fullMark:150}],ee=[{name:"18-24",uv:31.47,pv:2400,fill:"#8884d8"},{name:"25-29",uv:26.69,pv:4567,fill:"#83a6ed"},{name:"30-34",uv:15.69,pv:1398,fill:"#8dd1e1"},{name:"35-39",uv:8.22,pv:9800,fill:"#82ca9d"},{name:"40-49",uv:8.63,pv:3908,fill:"#a4de6c"},{name:"50+",uv:2.63,pv:4800,fill:"#d0ed57"}],a={args:{chartType:"line",data:e,config:{desktop:{label:"Desktop",color:"#8884d8"},mobile:{label:"Mobile",color:"#82ca9d"}},dataKeys:["desktop","mobile"],xAxisDataKey:"name",showLegend:!0,height:400}},n={args:{chartType:"bar",data:h,config:{visitors:{label:"Total Visitors",color:"#8884d8"},unique:{label:"Unique Visitors",color:"#82ca9d"}},dataKeys:["visitors","unique"],xAxisDataKey:"name",showLegend:!0,height:400}},o={args:{chartType:"bar",data:h,config:{visitors:{label:"Total Visitors",color:"#8884d8"},unique:{label:"Unique Visitors",color:"#82ca9d"}},dataKeys:["visitors","unique"],xAxisDataKey:"name",showLegend:!0,stackId:"visitors",height:400}},r={args:{chartType:"area",data:e,config:{desktop:{label:"Desktop",color:"#8884d8"},mobile:{label:"Mobile",color:"#82ca9d"}},dataKeys:["desktop","mobile"],xAxisDataKey:"name",showLegend:!0,fillOpacity:.6,height:400}},t={args:{chartType:"pie",data:z,config:{Desktop:{label:"Desktop",color:"#0088FE"},Mobile:{label:"Mobile",color:"#00C49F"},Tablet:{label:"Tablet",color:"#FFBB28"},Other:{label:"Other",color:"#FF8042"}},dataKey:"value",showLegend:!0,height:400,label:!0}},s={args:{chartType:"pie",data:z,config:{Desktop:{label:"Desktop",color:"#0088FE"},Mobile:{label:"Mobile",color:"#00C49F"},Tablet:{label:"Tablet",color:"#FFBB28"},Other:{label:"Other",color:"#FF8042"}},dataKey:"value",innerRadius:50,outerRadius:100,showLegend:!0,height:400}},l={args:{chartType:"radar",data:Z,config:{A:{label:"Student A",color:"#8884d8"},B:{label:"Student B",color:"#82ca9d"}},dataKeys:["A","B"],xAxisDataKey:"subject",showLegend:!0,fillOpacity:.6,height:400}},i={args:{chartType:"radialBar",data:ee,config:{uv:{label:"UV Index",color:"#8884d8"}},dataKey:"uv",innerRadius:30,outerRadius:100,height:500,label:!0}},c={args:{chartType:"line",data:e,config:{desktop:{label:"Desktop",color:"#ff6b6b"},mobile:{label:"Mobile",color:"#4ecdc4"}},dataKeys:["desktop","mobile"],xAxisDataKey:"name",showLegend:!0,colors:["#ff6b6b","#4ecdc4"],height:400}},d={args:{chartType:"line",data:e,config:{desktop:{label:"Desktop",color:"#8884d8"},mobile:{label:"Mobile",color:"#82ca9d"}},dataKeys:["desktop","mobile"],xAxisDataKey:"name",showGrid:!1,showLegend:!0,height:400}},p={args:{chartType:"area",data:e,config:{desktop:{label:"Desktop",color:"#8884d8"},mobile:{label:"Mobile",color:"#82ca9d"}},dataKeys:["desktop","mobile"],xAxisDataKey:"name",showXAxis:!1,showYAxis:!1,showGrid:!1,showLegend:!0,height:400}},u={args:{chartType:"bar",data:h,config:{visitors:{label:"Total Visitors",color:"#8884d8"},unique:{label:"Unique Visitors",color:"#82ca9d"}},dataKeys:["visitors","unique"],xAxisDataKey:"name",showLegend:!0,height:400,onClick:b=>{console.log("Chart clicked:",b),alert(`Clicked on: ${JSON.stringify(b)}`)}}};var m,g,y;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    chartType: "line",
    data: lineChartData,
    config: {
      desktop: {
        label: "Desktop",
        color: "#8884d8"
      },
      mobile: {
        label: "Mobile",
        color: "#82ca9d"
      }
    },
    dataKeys: ["desktop", "mobile"],
    xAxisDataKey: "name",
    showLegend: true,
    height: 400
  }
}`,...(y=(g=a.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var f,k,D;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    chartType: "bar",
    data: barChartData,
    config: {
      visitors: {
        label: "Total Visitors",
        color: "#8884d8"
      },
      unique: {
        label: "Unique Visitors",
        color: "#82ca9d"
      }
    },
    dataKeys: ["visitors", "unique"],
    xAxisDataKey: "name",
    showLegend: true,
    height: 400
  }
}`,...(D=(k=n.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var x,C,v;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    chartType: "bar",
    data: barChartData,
    config: {
      visitors: {
        label: "Total Visitors",
        color: "#8884d8"
      },
      unique: {
        label: "Unique Visitors",
        color: "#82ca9d"
      }
    },
    dataKeys: ["visitors", "unique"],
    xAxisDataKey: "name",
    showLegend: true,
    stackId: "visitors",
    height: 400
  }
}`,...(v=(C=o.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var K,T,A;r.parameters={...r.parameters,docs:{...(K=r.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    chartType: "area",
    data: lineChartData,
    config: {
      desktop: {
        label: "Desktop",
        color: "#8884d8"
      },
      mobile: {
        label: "Mobile",
        color: "#82ca9d"
      }
    },
    dataKeys: ["desktop", "mobile"],
    xAxisDataKey: "name",
    showLegend: true,
    fillOpacity: 0.6,
    height: 400
  }
}`,...(A=(T=r.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var B,F,w;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    chartType: "pie",
    data: pieChartData,
    config: {
      Desktop: {
        label: "Desktop",
        color: "#0088FE"
      },
      Mobile: {
        label: "Mobile",
        color: "#00C49F"
      },
      Tablet: {
        label: "Tablet",
        color: "#FFBB28"
      },
      Other: {
        label: "Other",
        color: "#FF8042"
      }
    },
    dataKey: "value",
    showLegend: true,
    height: 400,
    label: true
  }
}`,...(w=(F=t.parameters)==null?void 0:F.docs)==null?void 0:w.source}}};var M,q,L;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    chartType: "pie",
    data: pieChartData,
    config: {
      Desktop: {
        label: "Desktop",
        color: "#0088FE"
      },
      Mobile: {
        label: "Mobile",
        color: "#00C49F"
      },
      Tablet: {
        label: "Tablet",
        color: "#FFBB28"
      },
      Other: {
        label: "Other",
        color: "#FF8042"
      }
    },
    dataKey: "value",
    innerRadius: 50,
    outerRadius: 100,
    showLegend: true,
    height: 400
  }
}`,...(L=(q=s.parameters)==null?void 0:q.docs)==null?void 0:L.source}}};var E,S,O;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    chartType: "radar",
    data: radarChartData,
    config: {
      A: {
        label: "Student A",
        color: "#8884d8"
      },
      B: {
        label: "Student B",
        color: "#82ca9d"
      }
    },
    dataKeys: ["A", "B"],
    xAxisDataKey: "subject",
    showLegend: true,
    fillOpacity: 0.6,
    height: 400
  }
}`,...(O=(S=l.parameters)==null?void 0:S.docs)==null?void 0:O.source}}};var V,R,P;i.parameters={...i.parameters,docs:{...(V=i.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    chartType: "radialBar",
    data: radialBarData,
    config: {
      uv: {
        label: "UV Index",
        color: "#8884d8"
      }
    },
    dataKey: "uv",
    innerRadius: 30,
    outerRadius: 100,
    height: 500,
    label: true
  }
}`,...(P=(R=i.parameters)==null?void 0:R.docs)==null?void 0:P.source}}};var j,U,G;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    chartType: "line",
    data: lineChartData,
    config: {
      desktop: {
        label: "Desktop",
        color: "#ff6b6b"
      },
      mobile: {
        label: "Mobile",
        color: "#4ecdc4"
      }
    },
    dataKeys: ["desktop", "mobile"],
    xAxisDataKey: "name",
    showLegend: true,
    colors: ["#ff6b6b", "#4ecdc4"],
    height: 400
  }
}`,...(G=(U=c.parameters)==null?void 0:U.docs)==null?void 0:G.source}}};var W,I,J;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    chartType: "line",
    data: lineChartData,
    config: {
      desktop: {
        label: "Desktop",
        color: "#8884d8"
      },
      mobile: {
        label: "Mobile",
        color: "#82ca9d"
      }
    },
    dataKeys: ["desktop", "mobile"],
    xAxisDataKey: "name",
    showGrid: false,
    showLegend: true,
    height: 400
  }
}`,...(J=(I=d.parameters)==null?void 0:I.docs)==null?void 0:J.source}}};var N,H,X;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    chartType: "area",
    data: lineChartData,
    config: {
      desktop: {
        label: "Desktop",
        color: "#8884d8"
      },
      mobile: {
        label: "Mobile",
        color: "#82ca9d"
      }
    },
    dataKeys: ["desktop", "mobile"],
    xAxisDataKey: "name",
    showXAxis: false,
    showYAxis: false,
    showGrid: false,
    showLegend: true,
    height: 400
  }
}`,...(X=(H=p.parameters)==null?void 0:H.docs)==null?void 0:X.source}}};var Y,_,$;u.parameters={...u.parameters,docs:{...(Y=u.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    chartType: "bar",
    data: barChartData,
    config: {
      visitors: {
        label: "Total Visitors",
        color: "#8884d8"
      },
      unique: {
        label: "Unique Visitors",
        color: "#82ca9d"
      }
    },
    dataKeys: ["visitors", "unique"],
    xAxisDataKey: "name",
    showLegend: true,
    height: 400,
    onClick: (data: unknown) => {
      console.log("Chart clicked:", data);
      alert(\`Clicked on: \${JSON.stringify(data)}\`);
    }
  }
}`,...($=(_=u.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};const ie=["LineChartExample","BarChartExample","StackedBarChart","AreaChartExample","PieChartExample","DonutChart","RadarChartExample","RadialBarChartExample","WithCustomColors","NoGrid","WithoutAxes","WithClickHandler"];export{r as AreaChartExample,n as BarChartExample,s as DonutChart,a as LineChartExample,d as NoGrid,t as PieChartExample,l as RadarChartExample,i as RadialBarChartExample,o as StackedBarChart,u as WithClickHandler,c as WithCustomColors,p as WithoutAxes,ie as __namedExportsOrder,le as default};
