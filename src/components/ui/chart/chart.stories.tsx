import type { Meta, StoryObj } from "@storybook/react";
import { Chart } from "./chart";

const meta = {
  title: "Components/DataDisplay/Chart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    chartType: {
      control: "select",
      options: ["line", "bar", "area", "pie", "radar", "radialBar"],
    },
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

const lineChartData = [
  { name: "Jan", desktop: 65, mobile: 45 },
  { name: "Feb", desktop: 72, mobile: 52 },
  { name: "Mar", desktop: 68, mobile: 48 },
  { name: "Apr", desktop: 80, mobile: 60 },
  { name: "May", desktop: 75, mobile: 58 },
  { name: "Jun", desktop: 85, mobile: 68 },
];

const barChartData = [
  { name: "Page A", visitors: 2400, unique: 1398 },
  { name: "Page B", visitors: 1398, unique: 800 },
  { name: "Page C", visitors: 9800, unique: 4567 },
  { name: "Page D", visitors: 3908, unique: 2345 },
  { name: "Page E", visitors: 4800, unique: 3456 },
  { name: "Page F", visitors: 3800, unique: 2567 },
];

const pieChartData = [
  { name: "Desktop", value: 400, fill: "#0088FE" },
  { name: "Mobile", value: 300, fill: "#00C49F" },
  { name: "Tablet", value: 300, fill: "#FFBB28" },
  { name: "Other", value: 200, fill: "#FF8042" },
];

const radarChartData = [
  { subject: "Math", A: 120, B: 110, fullMark: 150 },
  { subject: "Chinese", A: 98, B: 130, fullMark: 150 },
  { subject: "English", A: 86, B: 130, fullMark: 150 },
  { subject: "Geography", A: 99, B: 100, fullMark: 150 },
  { subject: "Physics", A: 85, B: 90, fullMark: 150 },
  { subject: "History", A: 65, B: 85, fullMark: 150 },
];

const radialBarData = [
  { name: "18-24", uv: 31.47, pv: 2400, fill: "#8884d8" },
  { name: "25-29", uv: 26.69, pv: 4567, fill: "#83a6ed" },
  { name: "30-34", uv: 15.69, pv: 1398, fill: "#8dd1e1" },
  { name: "35-39", uv: 8.22, pv: 9800, fill: "#82ca9d" },
  { name: "40-49", uv: 8.63, pv: 3908, fill: "#a4de6c" },
  { name: "50+", uv: 2.63, pv: 4800, fill: "#d0ed57" },
];

export const LineChartExample: Story = {
  args: {
    chartType: "line",
    data: lineChartData,
    config: {
      desktop: {
        label: "Desktop",
        color: "#8884d8",
      },
      mobile: {
        label: "Mobile",
        color: "#82ca9d",
      },
    },
    dataKeys: ["desktop", "mobile"],
    xAxisDataKey: "name",
    showLegend: true,
    height: 400,
  },
};

export const BarChartExample: Story = {
  args: {
    chartType: "bar",
    data: barChartData,
    config: {
      visitors: {
        label: "Total Visitors",
        color: "#8884d8",
      },
      unique: {
        label: "Unique Visitors",
        color: "#82ca9d",
      },
    },
    dataKeys: ["visitors", "unique"],
    xAxisDataKey: "name",
    showLegend: true,
    height: 400,
  },
};

export const StackedBarChart: Story = {
  args: {
    chartType: "bar",
    data: barChartData,
    config: {
      visitors: {
        label: "Total Visitors",
        color: "#8884d8",
      },
      unique: {
        label: "Unique Visitors",
        color: "#82ca9d",
      },
    },
    dataKeys: ["visitors", "unique"],
    xAxisDataKey: "name",
    showLegend: true,
    stackId: "visitors",
    height: 400,
  },
};

export const AreaChartExample: Story = {
  args: {
    chartType: "area",
    data: lineChartData,
    config: {
      desktop: {
        label: "Desktop",
        color: "#8884d8",
      },
      mobile: {
        label: "Mobile",
        color: "#82ca9d",
      },
    },
    dataKeys: ["desktop", "mobile"],
    xAxisDataKey: "name",
    showLegend: true,
    fillOpacity: 0.6,
    height: 400,
  },
};

export const PieChartExample: Story = {
  args: {
    chartType: "pie",
    data: pieChartData,
    config: {
      Desktop: {
        label: "Desktop",
        color: "#0088FE",
      },
      Mobile: {
        label: "Mobile",
        color: "#00C49F",
      },
      Tablet: {
        label: "Tablet",
        color: "#FFBB28",
      },
      Other: {
        label: "Other",
        color: "#FF8042",
      },
    },
    dataKey: "value",
    showLegend: true,
    height: 400,
    label: true,
  },
};

export const DonutChart: Story = {
  args: {
    chartType: "pie",
    data: pieChartData,
    config: {
      Desktop: {
        label: "Desktop",
        color: "#0088FE",
      },
      Mobile: {
        label: "Mobile",
        color: "#00C49F",
      },
      Tablet: {
        label: "Tablet",
        color: "#FFBB28",
      },
      Other: {
        label: "Other",
        color: "#FF8042",
      },
    },
    dataKey: "value",
    innerRadius: 50,
    outerRadius: 100,
    showLegend: true,
    height: 400,
  },
};

export const RadarChartExample: Story = {
  args: {
    chartType: "radar",
    data: radarChartData,
    config: {
      A: {
        label: "Student A",
        color: "#8884d8",
      },
      B: {
        label: "Student B",
        color: "#82ca9d",
      },
    },
    dataKeys: ["A", "B"],
    xAxisDataKey: "subject",
    showLegend: true,
    fillOpacity: 0.6,
    height: 400,
  },
};

export const RadialBarChartExample: Story = {
  args: {
    chartType: "radialBar",
    data: radialBarData,
    config: {
      uv: {
        label: "UV Index",
        color: "#8884d8",
      },
    },
    dataKey: "uv",
    innerRadius: 30,
    outerRadius: 100,
    height: 500,
    label: true,
  },
};

export const WithCustomColors: Story = {
  args: {
    chartType: "line",
    data: lineChartData,
    config: {
      desktop: {
        label: "Desktop",
        color: "#ff6b6b",
      },
      mobile: {
        label: "Mobile",
        color: "#4ecdc4",
      },
    },
    dataKeys: ["desktop", "mobile"],
    xAxisDataKey: "name",
    showLegend: true,
    colors: ["#ff6b6b", "#4ecdc4"],
    height: 400,
  },
};

export const NoGrid: Story = {
  args: {
    chartType: "line",
    data: lineChartData,
    config: {
      desktop: {
        label: "Desktop",
        color: "#8884d8",
      },
      mobile: {
        label: "Mobile",
        color: "#82ca9d",
      },
    },
    dataKeys: ["desktop", "mobile"],
    xAxisDataKey: "name",
    showGrid: false,
    showLegend: true,
    height: 400,
  },
};

export const WithoutAxes: Story = {
  args: {
    chartType: "area",
    data: lineChartData,
    config: {
      desktop: {
        label: "Desktop",
        color: "#8884d8",
      },
      mobile: {
        label: "Mobile",
        color: "#82ca9d",
      },
    },
    dataKeys: ["desktop", "mobile"],
    xAxisDataKey: "name",
    showXAxis: false,
    showYAxis: false,
    showGrid: false,
    showLegend: true,
    height: 400,
  },
};

export const WithClickHandler: Story = {
  args: {
    chartType: "bar",
    data: barChartData,
    config: {
      visitors: {
        label: "Total Visitors",
        color: "#8884d8",
      },
      unique: {
        label: "Unique Visitors",
        color: "#82ca9d",
      },
    },
    dataKeys: ["visitors", "unique"],
    xAxisDataKey: "name",
    showLegend: true,
    height: 400,
    onClick: (data: unknown) => {
      console.log("Chart clicked:", data);
      alert(`Clicked on: ${JSON.stringify(data)}`);
    },
  },
};
