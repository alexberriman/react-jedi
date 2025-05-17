import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import {
  useFocusAnimation,
  useFocusPreset,
  FocusAnimationConfig,
  FocusPreset,
} from "./animation-hooks";

export interface FocusProps {
  children: React.ReactNode;
  animation?: FocusAnimationConfig;
  preset?: FocusPreset;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  tabIndex?: number;
}

export const Focus: React.FC<FocusProps> = ({
  children,
  animation,
  preset,
  disabled = false,
  className,
  style,
  onFocus,
  onBlur,
  tabIndex = 0,
}) => {
  const presetAnimation = useFocusPreset(preset || "ring");
  const customAnimation = useFocusAnimation(disabled ? {} : animation);

  const focusAnimation = preset ? presetAnimation : customAnimation;

  const motionProps: HTMLMotionProps<"div"> = {
    ...focusAnimation,
    className,
    style,
    tabIndex: disabled ? -1 : tabIndex,
    onFocus: disabled ? undefined : onFocus,
    onBlur: disabled ? undefined : onBlur,
  };

  return <motion.div {...motionProps}>{children}</motion.div>;
};

export interface FocusButtonProps extends Omit<FocusProps, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const FocusButton: React.FC<FocusButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  animation,
  preset = "ring",
  disabled = false,
  className = "",
  style,
  onFocus,
  onBlur,
  tabIndex = 0,
}) => {
  const baseClasses = "font-semibold rounded-lg transition-colors outline-none";

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <Focus
      animation={animation}
      preset={preset}
      disabled={disabled}
      className={combinedClassName}
      style={style}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={tabIndex}
    >
      {children}
    </Focus>
  );
};

export interface FocusInputProps extends Omit<FocusProps, "children"> {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
}

export const FocusInput: React.FC<FocusInputProps> = ({
  id,
  placeholder,
  value,
  onChange,
  type = "text",
  animation,
  preset = "border",
  disabled = false,
  className = "",
  style,
  onFocus,
  onBlur,
  tabIndex = 0,
}) => {
  const baseClasses = "px-4 py-2 rounded-lg border border-gray-300 outline-none";
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed bg-gray-100"
    : "bg-white dark:bg-gray-900";

  const combinedClassName = `${baseClasses} ${disabledClasses} ${className}`;

  return (
    <Focus
      animation={animation}
      preset={preset}
      disabled={disabled}
      style={style}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={-1} // Let the input handle focus
    >
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={combinedClassName}
        tabIndex={tabIndex}
      />
    </Focus>
  );
};

export interface FocusTextareaProps extends Omit<FocusProps, "children"> {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

export const FocusTextarea: React.FC<FocusTextareaProps> = ({
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
  resize = "vertical",
  animation,
  preset = "border",
  disabled = false,
  className = "",
  style,
  onFocus,
  onBlur,
  tabIndex = 0,
}) => {
  const baseClasses = "px-4 py-2 rounded-lg border border-gray-300 outline-none";
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed bg-gray-100"
    : "bg-white dark:bg-gray-900";

  const resizeClass = resize === "none" ? "resize-none" : `resize-${resize}`;

  const combinedClassName = `${baseClasses} ${disabledClasses} ${resizeClass} ${className}`;

  return (
    <Focus
      animation={animation}
      preset={preset}
      disabled={disabled}
      style={style}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={-1} // Let the textarea handle focus
    >
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={combinedClassName}
        tabIndex={tabIndex}
      />
    </Focus>
  );
};

export interface FocusCardProps extends FocusProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const FocusCard: React.FC<FocusCardProps> = ({
  children,
  header,
  footer,
  animation,
  preset = "lift",
  disabled = false,
  className = "",
  style,
  onFocus,
  onBlur,
  tabIndex = 0,
}) => {
  const baseClasses = "rounded-lg shadow-md p-6 bg-white dark:bg-gray-800 outline-none";
  const disabledClasses = disabled ? "opacity-50" : "cursor-pointer";

  const combinedClassName = `${baseClasses} ${disabledClasses} ${className}`;

  return (
    <Focus
      animation={animation}
      preset={preset}
      disabled={disabled}
      className={combinedClassName}
      style={style}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={tabIndex}
    >
      {header && <div className="mb-4">{header}</div>}
      <div>{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </Focus>
  );
};

export interface FocusLinkProps extends Omit<FocusProps, "children"> {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export const FocusLink: React.FC<FocusLinkProps> = ({
  href,
  children,
  external = false,
  animation,
  preset = "underline",
  disabled = false,
  className = "",
  style,
  onFocus,
  onBlur,
  tabIndex = 0,
}) => {
  const baseClasses = "inline-block text-blue-600 hover:text-blue-800 outline-none";
  const disabledClasses = disabled ? "opacity-50 pointer-events-none" : "";

  const combinedClassName = `${baseClasses} ${disabledClasses} ${className}`;

  const linkProps = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };

  return (
    <Focus
      animation={animation}
      preset={preset}
      disabled={disabled}
      style={style}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={-1} // Let the link handle focus
    >
      <a {...linkProps} className={combinedClassName} tabIndex={disabled ? -1 : tabIndex}>
        {children}
      </a>
    </Focus>
  );
};
