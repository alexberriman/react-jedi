import type { BaseComponentSpec, ComponentChildren } from "../schema/base";

export interface CollapsibleSpec extends BaseComponentSpec {
  type: "Collapsible";

  /**
   * The controlled open state of the collapsible.
   */
  open?: boolean;

  /**
   * Default open state for uncontrolled mode.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Whether the collapsible is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Action to dispatch when the open state changes.
   */
  onOpenChangeAction?: string;

  /**
   * Custom CSS class names to add to the component.
   */
  className?: string;

  /**
   * Child components (CollapsibleTrigger, CollapsibleContent).
   */
  children?: ComponentChildren;
}

export interface CollapsibleTriggerSpec extends BaseComponentSpec {
  type: "CollapsibleTrigger";

  /**
   * Whether to render as a child of the trigger element.
   * @default false
   */
  asChild?: boolean;

  /**
   * Custom CSS class names to add to the trigger.
   */
  className?: string;

  /**
   * Child components or content.
   */
  children?: ComponentChildren;
}

export interface CollapsibleContentSpec extends BaseComponentSpec {
  type: "CollapsibleContent";

  /**
   * Custom CSS class names to add to the content.
   */
  className?: string;

  /**
   * Child components or content.
   */
  children?: ComponentChildren;
}
