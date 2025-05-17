import * as React from "react";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Input } from "./input";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Column<T> {
  id: string;
  header: string;
  accessorKey?: string;
  enableSorting?: boolean;
  cell?: (props: { row: { original: T } }) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  filterColumn?: string;
  filterPlaceholder?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  className,
  filterColumn,
  filterPlaceholder = "Filter...",
}: Readonly<DataTableProps<T>>) {
  const [sorting, setSorting] = React.useState<{
    column: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [filter, setFilter] = React.useState("");

  const sortedAndFilteredData = React.useMemo(() => {
    let result = [...data];

    // Apply filter
    if (filter && filterColumn) {
      result = result.filter((item) => {
        const value = String(item[filterColumn] || "");
        return value.toLowerCase().includes(filter.toLowerCase());
      });
    }

    // Apply sorting
    if (sorting) {
      result.sort((a, b) => {
        const column = columns.find((col) => col.id === sorting.column);
        const key = column?.accessorKey || column?.id || "";

        const aValue = a[key];
        const bValue = b[key];

        if (aValue === bValue) return 0;

        if (sorting.direction === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return result;
  }, [data, columns, sorting, filter, filterColumn]);

  const handleSort = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column?.enableSorting) return;

    setSorting((prev) => {
      if (prev?.column === columnId) {
        return prev.direction === "asc" ? { column: columnId, direction: "desc" } : null;
      }
      return { column: columnId, direction: "asc" };
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {filterColumn && (
        <Input
          placeholder={filterPlaceholder}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm bg-white/10 border-white/20 text-white placeholder-gray-400"
        />
      )}

      <div className="rounded-lg border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={cn(
                    "text-gray-300",
                    column.enableSorting && "cursor-pointer hover:text-white"
                  )}
                  onClick={() => handleSort(column.id)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.enableSorting && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={cn(
                            "h-3 w-3",
                            sorting?.column === column.id && sorting.direction === "asc"
                              ? "text-white"
                              : "text-gray-600"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 -mt-1",
                            sorting?.column === column.id && sorting.direction === "desc"
                              ? "text-white"
                              : "text-gray-600"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredData.map((row, index) => (
              <TableRow key={index} className="border-white/10 hover:bg-white/5">
                {columns.map((column) => (
                  <TableCell key={column.id} className="text-white">
                    {column.cell
                      ? column.cell({ row: { original: row } })
                      : row[column.accessorKey || column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
