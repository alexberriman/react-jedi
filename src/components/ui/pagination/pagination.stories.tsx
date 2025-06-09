import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./pagination";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";
import { PaginationComponent } from "./pagination-component";
import React from "react";


const meta = {
  title: "Components/Pagination",
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
export const Default: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test pagination links are rendered
      const page1 = canvas.getByText("1");
      const page2 = canvas.getByText("2");
      const page3 = canvas.getByText("3");
      const page10 = canvas.getByText("10");
      const prevButton = canvas.getByLabelText("Go to previous page");
      const nextButton = canvas.getByLabelText("Go to next page");

      expect(page1).toBeInTheDocument();
      expect(page2).toBeInTheDocument();
      expect(page3).toBeInTheDocument();
      expect(page10).toBeInTheDocument();
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();

      // Test active state
      expect(page2).toHaveAttribute("aria-current", "page");

      // Test clicking on a page
      await user.click(page3);
    },
  },
  {
    renderSpec: {
      type: "pagination",
      totalPages: 10,
      currentPage: 2,
      showPrevNext: true,
      showFirstLast: true,
      siblingCount: 1,
      boundaryCount: 1,
    },
  }
);

// JSON Specification Examples
export const JsonSimple: Story = enhanceStoryForDualMode(
  {
    name: "JSON: Simple Pagination",
    render: () => (
      <PaginationComponent
        type="pagination"
        totalPages={5}
        currentPage={3}
        showPrevNext={true}
        showFirstLast={true}
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
  "showFirstLast": true
}`,
          language: "json",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all pages are rendered (1-5 with showFirstLast=true)
      for (let i = 1; i <= 5; i++) {
        const page = canvas.getByText(i.toString());
        expect(page).toBeInTheDocument();
      }

      // Test current page is active
      const page3 = canvas.getByText("3");
      expect(page3).toHaveAttribute("aria-current", "page");

      // Test prev/next buttons
      const prevButton = canvas.getByLabelText("Go to previous page");
      const nextButton = canvas.getByLabelText("Go to next page");
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "pagination",
      totalPages: 5,
      currentPage: 3,
      showPrevNext: true,
      showFirstLast: true,
    },
  }
);

export const JsonWithEllipsis: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test current page is active
      const page10 = canvas.getByText("10");
      expect(page10).toHaveAttribute("aria-current", "page");

      // Test ellipsis are present
      const ellipses = canvas.getAllByLabelText("More pages");
      expect(ellipses.length).toBeGreaterThan(0);

      // Test prev/next buttons
      const prevButton = canvas.getByLabelText("Go to previous page");
      const nextButton = canvas.getByLabelText("Go to next page");
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "pagination",
      totalPages: 20,
      currentPage: 10,
      showPrevNext: true,
      showFirstLast: true,
      siblingCount: 1,
      boundaryCount: 1,
    },
  }
);

export const JsonMinimal: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all pages are rendered (1-3)
      for (let i = 1; i <= 3; i++) {
        const page = canvas.getByText(i.toString());
        expect(page).toBeInTheDocument();
      }

      // Test current page is active
      const page2 = canvas.getByText("2");
      expect(page2).toHaveAttribute("aria-current", "page");

      // Test no prev/next buttons (showPrevNext=false)
      const prevButton = canvas.queryByLabelText("Go to previous page");
      const nextButton = canvas.queryByLabelText("Go to next page");
      expect(prevButton).not.toBeInTheDocument();
      expect(nextButton).not.toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "pagination",
      totalPages: 3,
      currentPage: 2,
      showPrevNext: false,
      showFirstLast: false,
    },
  }
);

export const JsonLargePagination: Story = enhanceStoryForDualMode(
  {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test current page is active
    const page50 = canvas.getByText("50");
    expect(page50).toHaveAttribute("aria-current", "page");

    // Test first and last pages are present (boundaryCount=1)
    const page1 = canvas.getByText("1");
    const page100 = canvas.getByText("100");
    expect(page1).toBeInTheDocument();
    expect(page100).toBeInTheDocument();

    // Test ellipsis are present
    const ellipses = canvas.getAllByLabelText("More pages");
    expect(ellipses.length).toBeGreaterThan(0);

    // Test prev/next buttons
    const prevButton = canvas.getByLabelText("Go to previous page");
    const nextButton = canvas.getByLabelText("Go to next page");
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  },
},
{
  renderSpec: {
    type: "pagination",
    totalPages: 100,
    currentPage: 50,
    showPrevNext: true,
    showFirstLast: true,
    siblingCount: 2,
    boundaryCount: 1,
  },
}
);

export const JsonFirstPage: Story = enhanceStoryForDualMode(
  {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test current page is active
    const page1 = canvas.getByText("1");
    expect(page1).toHaveAttribute("aria-current", "page");

    // Test prev button is disabled (first page)
    const prevButton = canvas.getByLabelText("Go to previous page");
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toHaveClass("opacity-50");

    // Test next button is enabled
    const nextButton = canvas.getByLabelText("Go to next page");
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toHaveClass("opacity-50");
  },
},
{
  renderSpec: {
    type: "pagination",
    totalPages: 10,
    currentPage: 1,
    showPrevNext: true,
    showFirstLast: true,
  },
}
);

export const JsonLastPage: Story = enhanceStoryForDualMode(
  {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test current page is active
    const page10 = canvas.getByText("10");
    expect(page10).toHaveAttribute("aria-current", "page");

    // Test prev button is enabled
    const prevButton = canvas.getByLabelText("Go to previous page");
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).not.toHaveClass("opacity-50");

    // Test next button is disabled (last page)
    const nextButton = canvas.getByLabelText("Go to next page");
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveClass("opacity-50");
  },
},
{
  renderSpec: {
    type: "pagination",
    totalPages: 10,
    currentPage: 10,
    showPrevNext: true,
    showFirstLast: true,
  },
}
);

export const JsonWithCustomSiblings: Story = enhanceStoryForDualMode(
  {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test current page is active
    const page8 = canvas.getByText("8");
    expect(page8).toHaveAttribute("aria-current", "page");

    // Test siblingCount=3 means pages 5, 6, 7, 8, 9, 10, 11 should be visible
    for (let i = 5; i <= 11; i++) {
      const page = canvas.getByText(i.toString());
      expect(page).toBeInTheDocument();
    }

    // Test first and last pages are present (boundaryCount=1)
    const page1 = canvas.getByText("1");
    const page15 = canvas.getByText("15");
    expect(page1).toBeInTheDocument();
    expect(page15).toBeInTheDocument();

    // Test prev/next buttons
    const prevButton = canvas.getByLabelText("Go to previous page");
    const nextButton = canvas.getByLabelText("Go to next page");
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  },
},
{
  renderSpec: {
    type: "pagination",
    totalPages: 15,
    currentPage: 8,
    showPrevNext: true,
    showFirstLast: true,
    siblingCount: 3,
    boundaryCount: 1,
  },
}
);

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

export const InteractiveExample: Story = enhanceStoryForDualMode(
  {
    render: InteractivePaginationExample,
    parameters: {
      docs: {
        description: {
          story: "An interactive example showing pagination with state management.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test initial state
      const currentPageText = canvas.getByText("Current page: 1 of 10");
      expect(currentPageText).toBeInTheDocument();

      // Test clicking next
      const nextButton = canvas.getByLabelText("Go to next page");
      await user.click(nextButton);
      await expect(canvas.getByText("Current page: 2 of 10")).toBeInTheDocument();

      // Test clicking specific page
      const page5 = canvas.getByText("5");
      await user.click(page5);
      await expect(canvas.getByText("Current page: 5 of 10")).toBeInTheDocument();

      // Test clicking previous
      const prevButton = canvas.getByLabelText("Go to previous page");
      await user.click(prevButton);
      await expect(canvas.getByText("Current page: 4 of 10")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Box",
          className: "text-center",
          children: {
            type: "Text",
            size: "sm",
            variant: "muted",
            children: "Current page: 1 of 10",
          },
        },
        {
          type: "pagination",
          totalPages: 10,
          currentPage: 1,
          showPrevNext: true,
          showFirstLast: true,
        },
      ],
    },
  }
);
