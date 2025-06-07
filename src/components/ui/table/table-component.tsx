import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import type { TableSpec, TableCellAlign } from "../../../types/components/table";
import type { BaseComponentSpec } from "../../../types/schema/base";
import { isComponentSpec } from "../../../types/schema/guards";
import { cn } from "../../../lib/utils";
import { render } from "../../../lib/render";

function getAlignmentClass(align?: TableCellAlign): string {
  if (!align || align === "left") return "";
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "";
}

function renderCellContent(
  content: string | BaseComponentSpec | React.ReactNode
): React.ReactElement {
  // Use type guard to check if it's a component spec
  if (isComponentSpec(content)) {
    return <>{render(content)}</>;
  }

  // Wrap all content in a fragment to ensure consistent return type
  return <>{content}</>;
}

export function TableComponent(props: Readonly<Record<string, unknown>>): React.ReactElement {
  // Extract table props directly
  const tableProps = props as TableSpec;
  const { caption, head, body, footer, className, variant, stickyHeader, hoverable } = tableProps;

  return (
    <Table className={className} variant={variant} stickyHeader={stickyHeader} hoverable={hoverable}>
      {caption && <TableCaption>{caption}</TableCaption>}

      {head && (
        <TableHeader>
          {head.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={row.className}>
              {row.cells.map((cell, cellIndex) => (
                <TableHead
                  key={cellIndex}
                  className={cn(getAlignmentClass(cell.align), cell.className)}
                  colSpan={cell.colSpan}
                >
                  {renderCellContent(cell.content)}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      )}

      <TableBody>
        {body.rows.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className={row.className}
            data-state={row.selected ? "selected" : undefined}
          >
            {row.cells.map((cell, cellIndex) => (
              <TableCell
                key={cellIndex}
                className={cn(getAlignmentClass(cell.align), cell.className)}
                colSpan={cell.colSpan}
              >
                {renderCellContent(cell.content)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>

      {footer && (
        <TableFooter>
          {footer.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={row.className}>
              {row.cells.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className={cn(getAlignmentClass(cell.align), cell.className)}
                  colSpan={cell.colSpan}
                >
                  {renderCellContent(cell.content)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      )}
    </Table>
  );
}
