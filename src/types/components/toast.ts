/**
 * Toast Component Specifications
 *
 * Type definitions for toast notification components in the React JEDI UI system.
 * Toast components provide transient feedback to users about actions or events.
 */

import type { BaseComponentSpec } from "../schema/base";

/**
 * Toast position options
 */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Toast theme options
 */
export type ToastTheme = "light" | "dark" | "system";

/**
 * Toast message type options
 */
export type ToastType = "default" | "success" | "error" | "warning" | "info" | "loading";

/**
 * Toast text direction
 */
export type ToastDirection = "ltr" | "rtl" | "auto";

/**
 * Toast action definition
 */
export interface ToastAction {
  /**
   * Action button label
   */
  label: string;

  /**
   * Event handler reference
   */
  onClick: string;
}

/**
 * Toast options for individual messages
 */
export interface ToastOptions {
  /**
   * Duration in milliseconds before toast disappears
   */
  duration?: number;

  /**
   * Remove all default styling
   */
  unstyled?: boolean;

  /**
   * Custom class names for toast elements
   */
  classNames?: {
    toast?: string;
    title?: string;
    description?: string;
    actionButton?: string;
    cancelButton?: string;
    closeButton?: string;
  };

  /**
   * Custom styles
   */
  style?: Record<string, string | number>;
}

/**
 * Toast show action properties
 */
export interface ToastShowAction {
  /**
   * Toast message
   */
  message: string;

  /**
   * Type of toast
   */
  type?: ToastType;

  /**
   * Additional description
   */
  description?: string;

  /**
   * Duration in milliseconds
   */
  duration?: number;

  /**
   * Action button configuration
   */
  action?: ToastAction;

  /**
   * Cancel button configuration
   */
  cancel?: ToastAction;
}

/**
 * Toast promise action properties
 */
export interface ToastPromiseAction {
  /**
   * Promise reference to track
   */
  promise: string;

  /**
   * Loading message
   */
  loading: string;

  /**
   * Success message
   */
  success: string;

  /**
   * Error message
   */
  error: string;
}

/**
 * Toast dismiss action properties
 */
export interface ToastDismissAction {
  /**
   * ID of toast to dismiss (optional, dismisses all if not provided)
   */
  toastId?: string;
}

/**
 * Toast Component Specification
 *
 * A component for displaying transient notification messages.
 * Based on the Sonner toast library.
 */
export interface ToastSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Toast" for this component.
   */
  type: "Toast";

  /**
   * Position of the toast notifications
   * @default "bottom-right"
   */
  position?: ToastPosition;

  /**
   * Theme for the toast notifications
   * @default "system"
   */
  theme?: ToastTheme;

  /**
   * Use rich colors for different toast types
   * @default true
   */
  richColors?: boolean;

  /**
   * Show close button on toasts
   * @default false
   */
  closeButton?: boolean;

  /**
   * Expand toasts by default
   * @default false
   */
  expand?: boolean;

  /**
   * Default duration in milliseconds before toast disappears
   * @default 4000
   */
  duration?: number;

  /**
   * Gap between toasts in pixels
   * @default 14
   */
  gap?: number;

  /**
   * Maximum number of toasts visible at once
   * @default 3
   */
  visibleToasts?: number;

  /**
   * Offset from the edge of the screen
   * @example "32px"
   */
  offset?: string;

  /**
   * Text direction
   * @default "auto"
   */
  dir?: ToastDirection;

  /**
   * Additional CSS styles
   */
  style?: Record<string, string | number>;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Default options for all toasts
   */
  toastOptions?: ToastOptions;

  /**
   * Toast actions that can be triggered
   */
  actions?: {
    /**
     * Show a toast notification
     */
    show?: ToastShowAction;

    /**
     * Show a toast for a promise
     */
    promise?: ToastPromiseAction;

    /**
     * Dismiss one or all toasts
     */
    dismiss?: ToastDismissAction;
  };
}

/**
 * Type alias for all toast component specifications
 */
export type ToastComponentSpec = ToastSpec;
