import * as React from "react";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./command";
import type {
  CommandSpec,
  CommandDialogSpec,
  CommandInputSpec,
  CommandListSpec,
  CommandEmptySpec,
  CommandGroupComponentSpec,
  CommandItemComponentSpec,
  CommandShortcutSpec,
} from "@/types/components/command";

/**
 * Command component for JSON specification rendering
 * Maps JSON specifications to shadcn command components
 */
export function CommandComponent(props: Readonly<Record<string, unknown>>) {
  const commandProps = props as CommandSpec;
  const {
    searchPlaceholder = "Search commands...",
    emptyMessage = "No results found.",
    value,
    groups,
    items,
  } = commandProps;

  return (
    <Command value={value}>
      <CommandInput placeholder={searchPlaceholder} />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>

        {groups?.map((group, index) => (
          <React.Fragment key={index}>
            <CommandGroup heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem key={item.id} value={item.value || item.id}>
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                  {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
            {index < groups.length - 1 && <CommandSeparator />}
          </React.Fragment>
        ))}

        {items?.map((item) => (
          <CommandItem key={item.id} value={item.value || item.id}>
            {item.icon && <span>{item.icon}</span>}
            {item.label}
            {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}

/**
 * Command Dialog component for JSON specification rendering
 */
export function CommandDialogComponent(props: Readonly<Record<string, unknown>>) {
  const dialogProps = props as CommandDialogSpec;
  const {
    open,
    title = "Command Palette",
    description = "Search for a command to run...",
    searchPlaceholder = "Type a command or search...",
    emptyMessage = "No results found.",
    groups,
    items,
  } = dialogProps;

  return (
    <CommandDialog open={open} title={title} description={description}>
      <CommandInput placeholder={searchPlaceholder} />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>

        {groups?.map((group, index) => (
          <React.Fragment key={index}>
            <CommandGroup heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem key={item.id} value={item.value || item.id}>
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                  {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
            {index < groups.length - 1 && <CommandSeparator />}
          </React.Fragment>
        ))}

        {items?.map((item) => (
          <CommandItem key={item.id} value={item.value || item.id}>
            {item.icon && <span>{item.icon}</span>}
            {item.label}
            {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
          </CommandItem>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

/**
 * Individual component wrappers for granular control
 */
export function CommandInputComponent(props: Readonly<Record<string, unknown>>) {
  const inputProps = props as CommandInputSpec;
  return <CommandInput placeholder={inputProps.placeholder} value={inputProps.value} />;
}

export function CommandListComponent(props: Readonly<Record<string, unknown>>) {
  const listProps = props as CommandListSpec;
  return <CommandList>{listProps.children}</CommandList>;
}

export function CommandEmptyComponent(props: Readonly<Record<string, unknown>>) {
  const emptyProps = props as CommandEmptySpec;
  return <CommandEmpty>{emptyProps.message || emptyProps.children}</CommandEmpty>;
}

export function CommandGroupComponent(props: Readonly<Record<string, unknown>>) {
  const groupProps = props as CommandGroupComponentSpec;
  return <CommandGroup heading={groupProps.heading}>{groupProps.children}</CommandGroup>;
}

export function CommandItemComponent(props: Readonly<Record<string, unknown>>) {
  const itemProps = props as CommandItemComponentSpec;
  return (
    <CommandItem value={itemProps.value} disabled={itemProps.disabled}>
      {itemProps.children}
    </CommandItem>
  );
}

export function CommandSeparatorComponent(props: Readonly<Record<string, unknown>>) {
  return <CommandSeparator />;
}

export function CommandShortcutComponent(props: Readonly<Record<string, unknown>>) {
  const shortcutProps = props as CommandShortcutSpec;
  return <CommandShortcut>{shortcutProps.children}</CommandShortcut>;
}

// Register components
declare global {
  interface Window {
    __JEDI_COMPONENTS__?: Record<string, React.ComponentType<Record<string, unknown>>>;
  }
}

if (typeof globalThis !== "undefined" && globalThis.window) {
  const win = globalThis.window;
  win.__JEDI_COMPONENTS__ = {
    ...win.__JEDI_COMPONENTS__,
    command: CommandComponent,
    commandDialog: CommandDialogComponent,
    commandInput: CommandInputComponent,
    commandList: CommandListComponent,
    commandEmpty: CommandEmptyComponent,
    commandGroup: CommandGroupComponent,
    commandItem: CommandItemComponent,
    commandSeparator: CommandSeparatorComponent,
    commandShortcut: CommandShortcutComponent,
  };
}
