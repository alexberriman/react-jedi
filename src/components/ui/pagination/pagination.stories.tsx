import type { Meta, StoryObj } from "@storybook/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./pagination";
import { PaginationComponent } from "./pagination-component";
import React from "react";

const meta = {
  title: "Components/Navigation/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A pagination component that allows users to navigate through pages of content. Supports various configurations including page ranges, ellipsis, and navigation controls.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic shadcn pagination example
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

// JSON Specification Examples
export const JsonSimple: Story = {
  name: "JSON: Simple Pagination",
  render: () => (
    <PaginationComponent
      type="pagination"
      totalPages={5}
      currentPage={3}
      showPrevNext={true}
      showFirstLast={false}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `{
  "type": "pagination",
  "totalPages": 5,
  "currentPage": 3,
  "showPrevNext": true,
  "showFirstLast": false
}`,
        language: "json",
      },
    },
  },
};

export const JsonWithEllipsis: Story = {
  name: "JSON: With Ellipsis",
  render: () => (
    <PaginationComponent
      type="pagination"
      totalPages={20}
      currentPage={10}
      showPrevNext={true}
      showFirstLast={true}
      siblingCount={1}
      boundaryCount={1}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `{
  "type": "pagination",
  "totalPages": 20,
  "currentPage": 10,
  "showPrevNext": true,
  "showFirstLast": true,
  "siblingCount": 1,
  "boundaryCount": 1
}`,
        language: "json",
      },
    },
  },
};

export const JsonMinimal: Story = {
  name: "JSON: Minimal",
  render: () => (
    <PaginationComponent
      type="pagination"
      totalPages={3}
      currentPage={2}
      showPrevNext={false}
      showFirstLast={false}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `{
  "type": "pagination",
  "totalPages": 3,
  "currentPage": 2,
  "showPrevNext": false,
  "showFirstLast": false
}`,
        language: "json",
      },
    },
  },
};

export const JsonLargePagination: Story = {
  name: "JSON: Large Dataset",
  render: () => (
    <PaginationComponent
      type="pagination"
      totalPages={100}
      currentPage={50}
      showPrevNext={true}
      showFirstLast={true}
      siblingCount={2}
      boundaryCount={1}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `{
  "type": "pagination",
  "totalPages": 100,
  "currentPage": 50,
  "showPrevNext": true,
  "showFirstLast": true,
  "siblingCount": 2,
  "boundaryCount": 1
}`,
        language: "json",
      },
    },
  },
};

export const JsonFirstPage: Story = {
  name: "JSON: First Page",
  render: () => (
    <PaginationComponent
      type="pagination"
      totalPages={10}
      currentPage={1}
      showPrevNext={true}
      showFirstLast={true}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `{
  "type": "pagination",
  "totalPages": 10,
  "currentPage": 1,
  "showPrevNext": true,
  "showFirstLast": true
}`,
        language: "json",
      },
    },
  },
};

export const JsonLastPage: Story = {
  name: "JSON: Last Page",
  render: () => (
    <PaginationComponent
      type="pagination"
      totalPages={10}
      currentPage={10}
      showPrevNext={true}
      showFirstLast={true}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `{
  "type": "pagination",
  "totalPages": 10,
  "currentPage": 10,
  "showPrevNext": true,
  "showFirstLast": true
}`,
        language: "json",
      },
    },
  },
};

export const JsonWithCustomSiblings: Story = {
  name: "JSON: Custom Sibling Count",
  render: () => (
    <PaginationComponent
      type="pagination"
      totalPages={15}
      currentPage={8}
      showPrevNext={true}
      showFirstLast={true}
      siblingCount={3}
      boundaryCount={1}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `{
  "type": "pagination",
  "totalPages": 15,
  "currentPage": 8,
  "showPrevNext": true,
  "showFirstLast": true,
  "siblingCount": 3,
  "boundaryCount": 1
}`,
        language: "json",
      },
    },
  },
};

// Interactive Example with State
function InteractivePaginationExample() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 10;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Current page: {currentPage} of {totalPages}
        </p>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.max(1, currentPage - 1));
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.min(totalPages, currentPage + 1));
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export const InteractiveExample: Story = {
  render: InteractivePaginationExample,
  parameters: {
    docs: {
      description: {
        story: "An interactive example showing pagination with state management.",
      },
    },
  },
};
