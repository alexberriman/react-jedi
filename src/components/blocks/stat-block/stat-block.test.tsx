import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatBlock } from "./stat-block";
import type { StatBlockDef } from "../../../types/components/stat-block";

describe("StatBlock", () => {
  const basicStats: StatBlockDef["stats"] = [
    {
      id: "stat1",
      label: "Total Users",
      value: 1234,
      icon: "users",
    },
    {
      id: "stat2",
      label: "Revenue",
      value: 5678,
      prefix: "$",
      icon: "dollar",
    },
  ];

  const createSpec = (overrides?: Partial<StatBlockDef>): StatBlockDef => ({
    type: "StatBlock",
    stats: basicStats,
    ...overrides,
  });

  it("renders basic stats", () => {
    render(<StatBlock spec={createSpec()} />);
    
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText(/1,234/)).toBeInTheDocument();
    expect(screen.getByText("5,678")).toBeInTheDocument();
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("renders with different variants", () => {
    const { rerender } = render(<StatBlock spec={createSpec({ variant: "grid" })} />);
    expect(screen.getByText("Total Users")).toBeInTheDocument();

    rerender(<StatBlock spec={createSpec({ variant: "horizontal" })} />);
    expect(screen.getByText("Total Users")).toBeInTheDocument();

    rerender(<StatBlock spec={createSpec({ variant: "vertical" })} />);
    expect(screen.getByText("Total Users")).toBeInTheDocument();

    rerender(<StatBlock spec={createSpec({ variant: "card" })} />);
    expect(screen.getByText("Total Users")).toBeInTheDocument();
  });

  it("renders trends correctly", () => {
    const statsWithTrends: StatBlockDef["stats"] = [
      {
        label: "Growth",
        value: 100,
        trend: { value: 12.5, direction: "up", label: "vs last month" },
      },
      {
        label: "Decline",
        value: 50,
        trend: { value: -5.2, direction: "down" },
      },
    ];

    render(<StatBlock spec={createSpec({ stats: statsWithTrends, showTrend: true })} />);
    
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
    expect(screen.getByText("vs last month")).toBeInTheDocument();
    expect(screen.getByText("-5.2%")).toBeInTheDocument();
  });

  it("renders string values correctly", () => {
    const stringStats: StatBlockDef["stats"] = [
      {
        label: "Status",
        value: "Active",
      },
      {
        label: "Grade",
        value: "A+",
      },
    ];

    render(<StatBlock spec={createSpec({ stats: stringStats })} />);
    
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("A+")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatBlock 
        spec={createSpec({ 
          className: "custom-class"
        })} 
      />
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("custom-class");
  });

  it("respects showIcon prop", () => {
    const { container } = render(
      <StatBlock spec={createSpec({ showIcon: false })} />
    );
    
    // Icons should not be rendered when showIcon is false
    const icons = container.querySelectorAll("svg");
    expect(icons).toHaveLength(0);
  });

  it("respects showDescription prop", () => {
    const statsWithDesc: StatBlockDef["stats"] = [
      {
        label: "Users",
        value: 100,
        description: "Total active users",
      },
    ];

    const { rerender } = render(
      <StatBlock spec={createSpec({ stats: statsWithDesc, showDescription: true })} />
    );
    expect(screen.getByText("Total active users")).toBeInTheDocument();

    rerender(
      <StatBlock spec={createSpec({ stats: statsWithDesc, showDescription: false })} />
    );
    expect(screen.queryByText("Total active users")).not.toBeInTheDocument();
  });

  it("handles minimal variant correctly", () => {
    render(
      <StatBlock 
        spec={createSpec({ 
          variant: "minimal",
          showIcon: false,
          showTrend: false,
          showDescription: false 
        })} 
      />
    );
    
    // Should still show labels and values
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText(/1,234/)).toBeInTheDocument();
  });

  it("disables animations when animated is false", () => {
    // Mock framer-motion to check if animations are disabled
    const { container } = render(
      <StatBlock spec={createSpec({ animated: false })} />
    );
    
    // When animated is false, motion divs should not have initial/animate props
    const motionDivs = container.querySelectorAll("[data-framer-motion]");
    expect(motionDivs.length).toBe(0);
  });
});