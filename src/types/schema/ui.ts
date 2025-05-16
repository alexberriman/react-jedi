/**
 * UI Component Schemas
 *
 * This file defines the TypeScript interfaces for basic UI components in the Server-Driven UI system.
 * These components provide interactive elements and visual feedback for users.
 */

import type { BaseComponentSpec, ComponentChildren } from "./base";
import type { InputSpec } from "./input";
import type { ToggleSpec } from "@/types/components/toggle";
import type { ToggleGroupSpec, ToggleGroupItemSpec } from "@/types/components/toggle-group";
import type {
  TabsSpecification,
  TabsListSpecification,
  TabsTriggerSpecification,
  TabsContentSpecification,
} from "@/types/components/tabs";

/**
 * Button Component Specification
 *
 * A component for triggering actions or events.
 */
export interface ButtonSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Button" for this component.
   */
  type: "Button";

  /**
   * The variant style of the button.
   * @default "default"
   */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

  /**
   * The size of the button.
   * @default "default"
   */
  size?: "default" | "sm" | "lg" | "icon";

  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The content to be displayed inside the button.
   */
  children?: ComponentChildren;

  /**
   * Text content of the button (alternative to children).
   */
  label?: string;

  /**
   * The type attribute of the button element.
   * @default "button"
   */
  buttonType?: "button" | "submit" | "reset";

  /**
   * Custom CSS class names to add to the button.
   */
  className?: string;

  /**
   * ARIA label for accessibility.
   */
  ariaLabel?: string;

  /**
   * Whether the button is in a loading state.
   * @default false
   */
  loading?: boolean;

  /**
   * Icon component to display before text content.
   */
  leftIcon?: BaseComponentSpec;

  /**
   * Icon component to display after text content.
   */
  rightIcon?: BaseComponentSpec;

  /**
   * Whether the button should take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Card Component Specification
 *
 * A container component with a distinct visual style for grouping related content.
 */
export interface CardSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Card" for this component.
   */
  type: "Card";

  /**
   * Child content to render inside the card.
   */
  children?: ComponentChildren;

  /**
   * Custom CSS class names to add to the card.
   */
  className?: string;

  /**
   * Border radius of the card.
   * @default "md"
   */
  radius?: "none" | "sm" | "md" | "lg" | "xl";

  /**
   * Shadow size for the card.
   * @default "md"
   */
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Whether the card has a border.
   * @default true
   */
  bordered?: boolean;

  /**
   * Border color of the card when bordered is true.
   */
  borderColor?: string;

  /**
   * Background color of the card.
   * @default "white" or theme background
   */
  backgroundColor?: string;

  /**
   * Whether to apply hover effects to the card.
   * @default false
   */
  hoverable?: boolean;

  /**
   * Hover effect to apply when hoverable is true.
   * @default "shadow"
   */
  hoverEffect?: "shadow" | "border" | "scale" | "lift";

  /**
   * Whether the card is selectable (can be clicked).
   * @default false
   */
  selectable?: boolean;

  /**
   * Whether the card is currently selected.
   * @default false
   */
  selected?: boolean;

  /**
   * Padding inside the card.
   * @default "md"
   */
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * Badge Component Specification
 *
 * A small status indicator component.
 */
export interface BadgeSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Badge" for this component.
   */
  type: "Badge";

  /**
   * The text content of the badge.
   */
  text?: string;

  /**
   * The variant style of the badge.
   * @default "default"
   */
  variant?: "default" | "secondary" | "outline" | "destructive";

  /**
   * Custom CSS class names to add to the badge.
   */
  className?: string;

  /**
   * Whether the badge is visible.
   * @default true
   */
  visible?: boolean;

  /**
   * Custom color for the badge (overrides variant).
   */
  color?: string;

  /**
   * Size of the badge.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Icon to display in the badge.
   */
  icon?: BaseComponentSpec;

  /**
   * Border radius of the badge.
   * @default "full"
   */
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * Avatar Component Specification
 *
 * A component for displaying a user's profile picture or initials.
 */
export interface AvatarSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Avatar" for this component.
   */
  type: "Avatar";

  /**
   * The image source URL.
   */
  src?: string;

  /**
   * Alternative text for the avatar image.
   */
  alt?: string;

  /**
   * Fallback text to display when image is unavailable (usually initials).
   */
  fallback?: string;

  /**
   * Size of the avatar.
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Custom pixel size (overrides size prop).
   * @example "32px", "48px"
   */
  customSize?: string;

  /**
   * Shape of the avatar.
   * @default "circle"
   */
  shape?: "circle" | "square" | "rounded";

  /**
   * Border color around the avatar.
   */
  borderColor?: string;

  /**
   * Border width around the avatar.
   */
  borderWidth?: string;

  /**
   * Status indicator to show on the avatar.
   */
  status?: "online" | "offline" | "away" | "busy" | "none";

  /**
   * Position of the status indicator.
   * @default "bottom-right"
   */
  statusPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";

  /**
   * Custom color for the status indicator.
   */
  statusColor?: string;

  /**
   * Background color for the fallback state.
   */
  fallbackBgColor?: string;

  /**
   * Text color for the fallback state.
   */
  fallbackTextColor?: string;

  /**
   * Custom CSS class names to add to the avatar.
   */
  className?: string;
}

/**
 * Image Component Specification
 *
 * A component for displaying images with various styling options.
 */
export interface ImageSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Image" for this component.
   */
  type: "Image";

  /**
   * The source URL of the image.
   */
  src: string;

  /**
   * Alternative text for the image for accessibility.
   */
  alt?: string;

  /**
   * How the image should be fitted inside its container.
   * @default "cover"
   */
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";

  /**
   * Position of the image within its container when using objectFit.
   * @default "center"
   */
  objectPosition?: string;

  /**
   * Border radius of the image.
   * @default "none"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

  /**
   * Shadow size around the image.
   * @default "none"
   */
  shadow?: "none" | "sm" | "md" | "lg" | "xl";

  /**
   * Visual filter to apply to the image.
   * @default "none"
   */
  filter?: "none" | "grayscale" | "sepia" | "blur" | "invert";

  /**
   * Effect to apply on hover.
   * @default "none"
   */
  hover?: "none" | "grow" | "shrink" | "rotate" | "shine" | "glow" | "pulse";

  /**
   * Loading behavior of the image.
   * @default "lazy"
   */
  loading?: "eager" | "lazy";

  /**
   * Fallback image URL if the main image fails to load.
   */
  fallback?: string;

  /**
   * Aspect ratio of the image container (e.g., "16/9", "1/1").
   */
  aspectRatio?: string;

  /**
   * Width of the image container.
   */
  width?: string | number;

  /**
   * Height of the image container.
   */
  height?: string | number;

  /**
   * Maximum width of the image.
   */
  maxWidth?: string | number;

  /**
   * Maximum height of the image.
   */
  maxHeight?: string | number;

  /**
   * Whether to show a blur-up placeholder while the image loads.
   * @default false
   */
  withBlurredPlaceholder?: boolean;

  /**
   * Whether to enable high-quality image optimization.
   * @default true
   */
  optimize?: boolean;

  /**
   * Custom CSS class names to add to the image.
   */
  className?: string;
}

/**
 * Skeleton Component Specification
 *
 * A placeholder component for showing content loading states.
 */
export interface SkeletonSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Skeleton" for this component.
   */
  type: "Skeleton";

  /**
   * The width of the skeleton.
   * @example "100px", "50%", "full"
   * @default "100%"
   */
  width?: string;

  /**
   * The height of the skeleton.
   * @example "20px", "h-4", "h-full"
   * @default "20px"
   */
  height?: string;

  /**
   * Border radius of the skeleton.
   * @default "md"
   */
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

  /**
   * Whether the skeleton should display a pulse animation.
   * @default true
   */
  animate?: boolean;

  /**
   * Custom animation duration in milliseconds.
   * @default 1500
   */
  animationDuration?: number;

  /**
   * Custom CSS class names to add to the component.
   */
  className?: string;
}

/**
 * Label Component Specification
 *
 * A component for rendering form labels with accessibility support.
 */
export interface LabelSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Label" for this component.
   */
  type: "Label";

  /**
   * The text content of the label.
   */
  text: string;

  /**
   * The ID of the form element this label is associated with.
   */
  htmlFor?: string;

  /**
   * Whether the associated form field is required.
   * @default false
   */
  required?: boolean;

  /**
   * Whether to show a visual indicator when required is true.
   * @default true
   */
  showRequiredIndicator?: boolean;

  /**
   * Optional helper text to display beneath the label.
   */
  helperText?: string;

  /**
   * Whether the label should be hidden visually but still accessible to screen readers.
   * @default false
   */
  visuallyHidden?: boolean;

  /**
   * Text color of the label.
   */
  color?: string;

  /**
   * Font size of the label.
   * @default "sm"
   */
  size?: "xs" | "sm" | "md" | "lg";

  /**
   * Font weight of the label.
   * @default "medium"
   */
  weight?: "normal" | "medium" | "semibold" | "bold";

  /**
   * Custom CSS class names to add to the label.
   */
  className?: string;
}

/**
 * Textarea Component Specification
 *
 * A multi-line text input component for longer text content.
 */
export interface TextareaSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Textarea" for this component.
   */
  type: "Textarea";

  /**
   * The name attribute for form submission.
   */
  name?: string;

  /**
   * Placeholder text when textarea is empty.
   */
  placeholder?: string;

  /**
   * Default text content.
   */
  defaultValue?: string;

  /**
   * Number of visible text rows.
   * @default 4
   */
  rows?: number;

  /**
   * Maximum character limit.
   */
  maxLength?: number;

  /**
   * Whether the textarea is required.
   * @default false
   */
  required?: boolean;

  /**
   * Whether the textarea is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the textarea is read-only.
   * @default false
   */
  readonly?: boolean;

  /**
   * Whether to focus on mount.
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Resize behavior of the textarea.
   * @default "auto"
   */
  resize?: "none" | "both" | "horizontal" | "vertical" | "auto";

  /**
   * HTML autocomplete attribute.
   */
  autoComplete?: string;

  /**
   * Whether to enable spell checking.
   */
  spellCheck?: boolean;

  /**
   * Text wrapping behavior.
   */
  wrap?: "hard" | "soft" | "off";

  /**
   * Custom CSS class names to add to the textarea.
   */
  className?: string;

  /**
   * Action to dispatch on text change.
   */
  onChangeAction?: string;

  /**
   * Action to dispatch on focus.
   */
  onFocusAction?: string;

  /**
   * Action to dispatch on blur.
   */
  onBlurAction?: string;
}

/**
 * Checkbox Component Specification
 *
 * A checkable input component for binary choices.
 */
export interface CheckboxSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Checkbox" for this component.
   */
  type: "Checkbox";

  /**
   * Controlled checked state.
   */
  checked?: boolean;

  /**
   * Default checked state for uncontrolled mode.
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Name attribute for form submission.
   */
  name?: string;

  /**
   * Value attribute for form submission.
   */
  value?: string;

  /**
   * Action to dispatch on checked state change.
   */
  onCheckedChangeAction?: string;

  /**
   * Whether the checkbox is required in a form.
   * @default false
   */
  required?: boolean;

  /**
   * ID for label association.
   */
  id?: string;

  /**
   * Accessible label for screen readers.
   */
  ariaLabel?: string;

  /**
   * ID of element that labels this checkbox.
   */
  ariaLabelledby?: string;

  /**
   * ID of element that describes this checkbox.
   */
  ariaDescribedby?: string;

  /**
   * Custom CSS class names to add to the checkbox.
   */
  className?: string;
}

/**
 * RadioGroup Component Specification
 *
 * A group of radio buttons for single selection.
 */
export interface RadioGroupSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "RadioGroup" for this component.
   */
  type: "RadioGroup";

  /**
   * Controlled selected value.
   */
  value?: string;

  /**
   * Default selected value for uncontrolled mode.
   */
  defaultValue?: string;

  /**
   * Whether the radio group is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Action to dispatch on value change.
   */
  onValueChangeAction?: string;

  /**
   * The orientation of the radio group.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Custom CSS class names to add to the radio group.
   */
  className?: string;

  /**
   * Child components (RadioGroupItem elements).
   */
  children?: ComponentChildren;
}

/**
 * RadioGroupItem Component Specification
 *
 * An individual radio button within a RadioGroup.
 */
export interface RadioGroupItemSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "RadioGroupItem" for this component.
   */
  type: "RadioGroupItem";

  /**
   * The value of the radio item.
   */
  value: string;

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * ID for label association.
   */
  id?: string;

  /**
   * Accessible label for screen readers.
   */
  ariaLabel?: string;

  /**
   * ID of element that labels this radio item.
   */
  ariaLabelledby?: string;

  /**
   * ID of element that describes this radio item.
   */
  ariaDescribedby?: string;

  /**
   * Custom CSS class names to add to the radio item.
   */
  className?: string;
}

/**
 * Select Component Specification
 *
 * A dropdown select component for choosing from a list of options.
 */
export interface SelectSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Select" for this component.
   */
  type: "Select";

  /**
   * Controlled selected value.
   */
  value?: string;

  /**
   * Default selected value for uncontrolled mode.
   */
  defaultValue?: string;

  /**
   * Whether the select is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Action to dispatch on value change.
   */
  onValueChangeAction?: string;

  /**
   * The name attribute for form submission.
   */
  name?: string;

  /**
   * Custom CSS class names.
   */
  className?: string;

  /**
   * Child components (SelectTrigger and SelectContent).
   */
  children?: ComponentChildren;
}

/**
 * SelectTrigger Component Specification
 */
export interface SelectTriggerSpec extends BaseComponentSpec {
  type: "SelectTrigger";
  size?: "sm" | "default";
  className?: string;
  children?: ComponentChildren;
}

/**
 * SelectValue Component Specification
 */
export interface SelectValueSpec extends BaseComponentSpec {
  type: "SelectValue";
  placeholder?: string;
}

/**
 * SelectContent Component Specification
 */
export interface SelectContentSpec extends BaseComponentSpec {
  type: "SelectContent";
  position?: "item-aligned" | "popper";
  className?: string;
  children?: ComponentChildren;
}

/**
 * SelectItem Component Specification
 */
export interface SelectItemSpec extends BaseComponentSpec {
  type: "SelectItem";
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ComponentChildren;
}

/**
 * SelectGroup Component Specification
 */
export interface SelectGroupSpec extends BaseComponentSpec {
  type: "SelectGroup";
  className?: string;
  children?: ComponentChildren;
}

/**
 * SelectLabel Component Specification
 */
export interface SelectLabelSpec extends BaseComponentSpec {
  type: "SelectLabel";
  className?: string;
  children?: ComponentChildren;
}

/**
 * SelectSeparator Component Specification
 */
export interface SelectSeparatorSpec extends BaseComponentSpec {
  type: "SelectSeparator";
  className?: string;
}

/**
 * Type alias for all UI component specifications.
 */
export type UIComponentSpec =
  | ButtonSpec
  | CardSpec
  | BadgeSpec
  | AvatarSpec
  | ImageSpec
  | SkeletonSpec
  | LabelSpec
  | InputSpec
  | TextareaSpec
  | CheckboxSpec
  | RadioGroupSpec
  | RadioGroupItemSpec
  | SelectSpec
  | SelectTriggerSpec
  | SelectValueSpec
  | SelectContentSpec
  | SelectItemSpec
  | SelectGroupSpec
  | SelectLabelSpec
  | SelectSeparatorSpec
  | ToggleSpec
  | ToggleGroupSpec
  | ToggleGroupItemSpec
  | TabsSpecification
  | TabsListSpecification
  | TabsTriggerSpecification
  | TabsContentSpecification;
