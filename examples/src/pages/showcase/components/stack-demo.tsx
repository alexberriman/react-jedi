import React from "react";
import { render, Card, CardContent } from "@alexberriman/react-jedi";
import { CodeBlock } from "@/components/ui/code-block";

const stackExamples = {
  basic: {
    type: "Stack",
    spacing: "md",
    children: [
      { type: "Text", children: "First Item" },
      { type: "Text", children: "Second Item" },
      { type: "Text", children: "Third Item" },
    ],
  },
  horizontal: {
    type: "Stack",
    orientation: "horizontal",
    spacing: "lg",
    children: [
      { type: "Button", children: "Button 1", variant: "default" },
      { type: "Button", children: "Button 2", variant: "secondary" },
      { type: "Button", children: "Button 3", variant: "outline" },
    ],
  },
  withDivider: {
    type: "Stack",
    spacing: "md",
    divider: { type: "Separator" },
    children: [
      {
        type: "Box",
        padding: "4",
        children: { type: "Text", children: "Section 1" },
      },
      {
        type: "Box",
        padding: "4",
        children: { type: "Text", children: "Section 2" },
      },
      {
        type: "Box",
        padding: "4",
        children: { type: "Text", children: "Section 3" },
      },
    ],
  },
  complexLayout: {
    type: "Stack",
    spacing: "lg",
    align: "center",
    children: [
      { type: "Heading", level: 2, children: "Dashboard" },
      {
        type: "Stack",
        orientation: "horizontal",
        spacing: "md",
        justify: "between",
        className: "w-full",
        children: [
          {
            type: "Card",
            className: "flex-1",
            children: {
              type: "CardContent",
              className: "p-6",
              children: {
                type: "Stack",
                spacing: "sm",
                children: [
                  { type: "Text", children: "Total Users", className: "font-semibold" },
                  { type: "Text", children: "2,845", className: "text-2xl font-bold" },
                  {
                    type: "Text",
                    children: "+12% from last month",
                    className: "text-sm text-muted-foreground",
                  },
                ],
              },
            },
          },
          {
            type: "Card",
            className: "flex-1",
            children: {
              type: "CardContent",
              className: "p-6",
              children: {
                type: "Stack",
                spacing: "sm",
                children: [
                  { type: "Text", children: "Revenue", className: "font-semibold" },
                  { type: "Text", children: "$45,231", className: "text-2xl font-bold" },
                  {
                    type: "Text",
                    children: "+20% from last month",
                    className: "text-sm text-muted-foreground",
                  },
                ],
              },
            },
          },
          {
            type: "Card",
            className: "flex-1",
            children: {
              type: "CardContent",
              className: "p-6",
              children: {
                type: "Stack",
                spacing: "sm",
                children: [
                  { type: "Text", children: "Active Plans", className: "font-semibold" },
                  { type: "Text", children: "1,234", className: "text-2xl font-bold" },
                  {
                    type: "Text",
                    children: "+9% from last month",
                    className: "text-sm text-muted-foreground",
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
};

export function StackDemo() {
  return (
    <div className="space-y-12">
      <section>
        <h3 className="text-xl font-semibold mb-4">Basic Vertical Stack</h3>
        <Card>
          <CardContent className="p-6">{render(stackExamples.basic)}</CardContent>
        </Card>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Horizontal Stack</h3>
        <Card>
          <CardContent className="p-6">{render(stackExamples.horizontal)}</CardContent>
        </Card>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Stack with Dividers</h3>
        <Card>
          <CardContent className="p-6">{render(stackExamples.withDivider)}</CardContent>
        </Card>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Complex Layout</h3>
        {render(stackExamples.complexLayout)}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">JSON Specifications</h3>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Below are the JSON specifications used to create the Stack examples:
            </p>
            <CodeBlock language="json">
{JSON.stringify(stackExamples, null, 2)}
            </CodeBlock>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
