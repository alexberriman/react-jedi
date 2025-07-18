import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DayPicker,
  DayPickerDefaultProps,
  DayPickerSingleProps,
  DayPickerMultipleProps,
  DayPickerRangeProps,
} from "react-day-picker";
import "react-day-picker/dist/style.css";


import { cn, cleanDOMProps } from "../../../lib/utils";
import { buttonVariants } from "../button";

type CalendarProps =
  | DayPickerDefaultProps
  | DayPickerSingleProps
  | DayPickerMultipleProps
  | DayPickerRangeProps;

function Calendar(props: CalendarProps) {
  const { className, classNames, showOutsideDays = true, ...restProps } = props;

  const cleanedProps = cleanDOMProps(restProps);

  // Build the cell className dynamically based on mode
  const cellClassName = cn(
    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
    "mode" in props && props.mode === "range"
      ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
      : "[&:has([aria-selected])]:rounded-md"
  );

  // Ensure we have a valid month to display
  const { defaultMonth, month, numberOfMonths, ...otherCleanedProps } = cleanedProps;
  const displayMonth = month || defaultMonth || new Date();
  
  const dayPickerProps = {
    showOutsideDays,
    className: cn("rdp p-3", className),
    defaultMonth: displayMonth,
    numberOfMonths: numberOfMonths || 1, // Default to 1 month
    classNames: {
      months: "rdp-months flex flex-col sm:flex-row gap-2",
      month: "rdp-month flex flex-col gap-4",
      caption: "rdp-caption flex justify-center pt-1 relative items-center w-full",
      caption_label: "rdp-caption_label text-sm font-medium",
      nav: "rdp-nav flex items-center gap-1",
      nav_button: cn(
        "rdp-nav_button",
        buttonVariants({ variant: "outline" }),
        "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
      ),
      nav_button_previous: "rdp-nav_button_previous absolute left-1",
      nav_button_next: "rdp-nav_button_next absolute right-1",
      table: "rdp-table w-full border-collapse space-x-1",
      head_row: "rdp-head_row flex",
      head_cell: "rdp-head_cell text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
      row: "rdp-row flex w-full mt-2",
      cell: cn("rdp-cell", cellClassName),
      day: cn(
        "rdp-day",
        buttonVariants({ variant: "ghost" }),
        "size-8 p-0 font-normal aria-selected:opacity-100"
      ),
      day_range_start:
        "rdp-day_range_start day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
      day_range_end: "rdp-day_range_end day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
      day_selected:
        "rdp-day_selected bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
      day_today: "rdp-day_today bg-accent text-accent-foreground",
      day_outside: "rdp-day_outside day-outside text-muted-foreground aria-selected:text-muted-foreground",
      day_disabled: "rdp-day_disabled text-muted-foreground opacity-50",
      day_range_middle: "rdp-day_range_middle aria-selected:bg-accent aria-selected:text-accent-foreground",
      day_hidden: "rdp-day_hidden invisible",
      ...classNames,
    },
    components: {
      IconLeft: ({ className, ...props }: React.ComponentProps<"svg">) => (
        <ChevronLeft className={cn("size-4", className)} {...cleanDOMProps(props)} />
      ),
      IconRight: ({ className, ...props }: React.ComponentProps<"svg">) => (
        <ChevronRight className={cn("size-4", className)} {...cleanDOMProps(props)} />
      ),
    },
    ...otherCleanedProps,
  } as CalendarProps;

  return <DayPicker {...dayPickerProps} />;
}

export { Calendar };
