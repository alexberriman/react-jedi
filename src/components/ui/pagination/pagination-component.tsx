import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./pagination";
import type { PaginationProps } from "../../../types/components/pagination";

// Helper function to add boundary pages
const addBoundaryPages = (pageNumbers: (number | string)[], start: number, end: number) => {
  for (let i = start; i <= end; i++) {
    if (!pageNumbers.includes(i)) {
      pageNumbers.push(i);
    }
  }
};

// Helper function to add ellipsis or single page gap
const addEllipsisOrPage = (pageNumbers: (number | string)[], gapStart: number, gapEnd: number) => {
  if (gapStart > gapEnd + 1) {
    pageNumbers.push("...");
  } else if (gapStart === gapEnd + 1 && !pageNumbers.includes(gapEnd)) {
    pageNumbers.push(gapEnd);
  }
};

/**
 * Pagination component for JSON specification rendering
 * Maps the JSON specification to the actual shadcn pagination component
 */
export function PaginationComponent(props: Readonly<Record<string, unknown>>) {
  const paginationProps = props as PaginationProps;
  const {
    totalPages,
    currentPage,
    showFirstLast = true,
    showPrevNext = true,
    siblingCount = 1,
    boundaryCount = 1,
    ariaLabel,
  } = paginationProps;

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const firstPage = 1;
    const lastPage = totalPages;
    const rangeStart = Math.max(firstPage, currentPage - siblingCount);
    const rangeEnd = Math.min(lastPage, currentPage + siblingCount);

    if (!showFirstLast || boundaryCount === 0) {
      // Simple case: just show the range around current page
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }

    // Add first boundary pages
    addBoundaryPages(pageNumbers, firstPage, Math.min(firstPage + boundaryCount - 1, lastPage));

    // Add ellipsis before range if there's a gap
    addEllipsisOrPage(pageNumbers, rangeStart, firstPage + boundaryCount);

    // Add range pages (avoiding duplicates with boundary)
    const rangeStartBounded = Math.max(rangeStart, firstPage + boundaryCount);
    const rangeEndBounded = Math.min(rangeEnd, lastPage - boundaryCount);
    addBoundaryPages(pageNumbers, rangeStartBounded, rangeEndBounded);

    // Add ellipsis after range if there's a gap
    addEllipsisOrPage(pageNumbers, lastPage - boundaryCount, rangeEnd);

    // Add last boundary pages
    const lastBoundaryStart = Math.max(lastPage - boundaryCount + 1, firstPage + 1);
    addBoundaryPages(pageNumbers, lastBoundaryStart, lastPage);

    return pageNumbers;
  };

  const pages = getPageNumbers();

  // Handler is reused for all pagination links
  const handleClick = React.useCallback(
    (page: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      // In a real implementation, this would trigger an action through the event system
      // For now, we'll just prevent default
    },
    []
  );

  return (
    <Pagination aria-label={ariaLabel}>
      <PaginationContent>
        {showPrevNext && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handleClick(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        )}

        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={handleClick(page as number)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {showPrevNext && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleClick(currentPage + 1)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

// Register the component for use in browser environments
declare global {
  interface Window {
    __JEDI_COMPONENTS__?: Record<string, React.ComponentType<Record<string, unknown>>>;
  }
}

if (typeof globalThis !== "undefined" && globalThis.window) {
  const win = globalThis.window;
  win.__JEDI_COMPONENTS__ = {
    ...win.__JEDI_COMPONENTS__,
    pagination: PaginationComponent,
  };
}
