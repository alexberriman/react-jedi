import { BaseComponentSpec } from "../schema/base";

export interface CommandItemSpec {
  id: string;
  label: string;
  value?: string;
  disabled?: boolean;
  icon?: string;
  shortcut?: string;
  onSelect?: string; // Action ID for select handler
}

export interface CommandGroupSpec {
  heading?: string;
  items: CommandItemSpec[];
}

export interface CommandDialogSpec extends BaseComponentSpec {
  type: "commandDialog";
  open?: boolean;
  onOpenChange?: string; // Action ID for open state change
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  groups?: CommandGroupSpec[];
  items?: CommandItemSpec[]; // For ungrouped items
}

export interface CommandSpec extends BaseComponentSpec {
  type: "command";
  searchPlaceholder?: string;
  emptyMessage?: string;
  value?: string;
  onValueChange?: string; // Action ID for value change
  groups?: CommandGroupSpec[];
  items?: CommandItemSpec[]; // For ungrouped items
}

export interface CommandInputSpec extends BaseComponentSpec {
  type: "commandInput";
  placeholder?: string;
  value?: string;
  onValueChange?: string; // Action ID for value change
}

export interface CommandListSpec extends BaseComponentSpec {
  type: "commandList";
  children?: BaseComponentSpec[];
}

export interface CommandEmptySpec extends BaseComponentSpec {
  type: "commandEmpty";
  message?: string;
  children?: BaseComponentSpec[];
}

export interface CommandGroupComponentSpec extends BaseComponentSpec {
  type: "commandGroup";
  heading?: string;
  children?: BaseComponentSpec[];
}

export interface CommandItemComponentSpec extends BaseComponentSpec {
  type: "commandItem";
  value?: string;
  keywords?: string[];
  disabled?: boolean;
  onSelect?: string; // Action ID for select handler
  children?: BaseComponentSpec[];
}

export interface CommandSeparatorSpec extends BaseComponentSpec {
  type: "commandSeparator";
}

export interface CommandShortcutSpec extends BaseComponentSpec {
  type: "commandShortcut";
  children?: BaseComponentSpec[];
}
