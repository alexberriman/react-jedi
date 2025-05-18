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
import type { ComponentProps } from "../../../types/schema/components";
import { cn } from "../../../lib/utils";
import { render } from "../../../lib/render";

function getAlignmentClass(align?: TableCellAlign): string {
  if (!align || align === "left") return "";
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "";
}

function renderCellContent(content: any): React.ReactNode {
  if (typeof content === "string") {
    return content;
  }
  // If it's an object with a type property, it's a component spec
  if (content && typeof content === "object" && content.type) {
    return render(content);
  }
  return content;
}

export function TableComponent(props: Readonly<Record<string, unknown>>) {
  // Extract table props directly
  const tableProps = props as TableSpec;
  const { caption, head, body, footer, className } = tableProps;

  return (
    <Table className={className}>
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
