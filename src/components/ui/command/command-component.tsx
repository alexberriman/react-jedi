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
} from "../../../types/components/command";
import { render } from "../../../lib/render";
import { isComponentSpecArray } from "../../../types/schema/guards";
import { SDUIIcon } from "../../../lib/icons";

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
                  {item.icon && (
                    <SDUIIcon
                      name={item.icon}
                      size={16}
                      className="mr-2"
                    />
                  )}
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
            {item.icon && (
              <SDUIIcon
                name={item.icon}
                size={16}
                className="mr-2"
              />
            )}
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
                  {item.icon && (
                    <SDUIIcon
                      name={item.icon}
                      size={16}
                      className="mr-2"
                    />
                  )}
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
            {item.icon && (
              <SDUIIcon
                name={item.icon}
                size={16}
                className="mr-2"
              />
            )}
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
  const children = listProps.children;

  if (!children) {
    return <CommandList />;
  }

  // Render the children using the render function
  const renderedChildren = isComponentSpecArray(children)
    ? children.map((child, index) => (
        <React.Fragment key={child.id || `command-child-${index}`}>{render(child)}</React.Fragment>
      ))
    : render(children);

  return <CommandList>{renderedChildren}</CommandList>;
}

export function CommandEmptyComponent(props: Readonly<Record<string, unknown>>) {
  const emptyProps = props as CommandEmptySpec;

  if (emptyProps.message) {
    return <CommandEmpty>{emptyProps.message}</CommandEmpty>;
  }

  if (!emptyProps.children) {
    return <CommandEmpty />;
  }

  // Render the children using the render function
  const renderedChildren = isComponentSpecArray(emptyProps.children)
    ? emptyProps.children.map((child, index) => (
        <React.Fragment key={child.id || `empty-child-${index}`}>{render(child)}</React.Fragment>
      ))
    : render(emptyProps.children);

  return <CommandEmpty>{renderedChildren}</CommandEmpty>;
}

export function CommandGroupComponent(props: Readonly<Record<string, unknown>>) {
  const groupProps = props as CommandGroupComponentSpec;

  if (!groupProps.children) {
    return <CommandGroup heading={groupProps.heading} />;
  }

  // Render the children using the render function
  const renderedChildren = isComponentSpecArray(groupProps.children)
    ? groupProps.children.map((child, index) => (
        <React.Fragment key={child.id || `group-child-${index}`}>{render(child)}</React.Fragment>
      ))
    : render(groupProps.children);

  return <CommandGroup heading={groupProps.heading}>{renderedChildren}</CommandGroup>;
}

export function CommandItemComponent(props: Readonly<Record<string, unknown>>) {
  const itemProps = props as CommandItemComponentSpec;

  if (!itemProps.children) {
    return <CommandItem value={itemProps.value} disabled={itemProps.disabled} />;
  }

  // Render the children using the render function
  const renderedChildren = isComponentSpecArray(itemProps.children)
    ? itemProps.children.map((child, index) => (
        <React.Fragment key={child.id || `item-child-${index}`}>{render(child)}</React.Fragment>
      ))
    : render(itemProps.children);

  return (
    <CommandItem value={itemProps.value} disabled={itemProps.disabled}>
      {renderedChildren}
    </CommandItem>
  );
}

export function CommandSeparatorComponent(props: Readonly<Record<string, unknown>>) {
  return <CommandSeparator />;
}

export function CommandShortcutComponent(props: Readonly<Record<string, unknown>>) {
  const shortcutProps = props as CommandShortcutSpec;

  if (!shortcutProps.children) {
    return <CommandShortcut />;
  }

  // Render the children using the render function
  const renderedChildren = isComponentSpecArray(shortcutProps.children)
    ? shortcutProps.children.map((child, index) => (
        <React.Fragment key={child.id || `shortcut-child-${index}`}>{render(child)}</React.Fragment>
      ))
    : render(shortcutProps.children);

  return <CommandShortcut>{renderedChildren}</CommandShortcut>;
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
