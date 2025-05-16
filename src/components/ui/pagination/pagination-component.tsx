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

    // Always show first page
    if (showFirstLast) {
      pageNumbers.push(firstPage);
    }

    // Calculate range around current page
    const rangeStart = Math.max(firstPage + boundaryCount + 1, currentPage - siblingCount);
    const rangeEnd = Math.min(lastPage - boundaryCount - 1, currentPage + siblingCount);

    // Add ellipsis before range if needed
    if (rangeStart > firstPage + boundaryCount + 1) {
      pageNumbers.push("...");
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis after range if needed
    if (rangeEnd < lastPage - boundaryCount - 1) {
      pageNumbers.push("...");
    }

    // Always show last page
    if (showFirstLast && lastPage > 1) {
      pageNumbers.push(lastPage);
    }

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
