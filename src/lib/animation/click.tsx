import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import {
  useClickAnimation,
  useClickPreset,
  ClickAnimationConfig,
  ClickPreset,
} from "./animation-hooks";

export interface ClickProps {
  children: React.ReactNode;
  animation?: ClickAnimationConfig;
  preset?: ClickPreset;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Click: React.FC<ClickProps> = ({
  children,
  animation,
  preset,
  disabled = false,
  className,
  style,
  onClick,
}) => {
  const presetAnimation = useClickPreset(preset || "press");
  const customAnimation = useClickAnimation(disabled ? { scale: 1, brightness: 1 } : animation);

  const clickAnimation = preset ? presetAnimation : customAnimation;

  const motionProps: HTMLMotionProps<"div"> = {
    ...clickAnimation,
    className,
    style,
    onClick: disabled ? undefined : onClick,
  };

  return <motion.div {...motionProps}>{children}</motion.div>;
};

export interface ClickButtonProps extends Omit<ClickProps, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const ClickButton: React.FC<ClickButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  animation,
  preset = "press",
  disabled = false,
  className = "",
  style,
  onClick,
}) => {
  const baseClasses = "font-semibold rounded-lg cursor-pointer transition-colors";

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
    <Click
      animation={animation}
      preset={preset}
      disabled={disabled}
      className={combinedClassName}
      style={style}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </Click>
  );
};

export interface ClickCardProps extends ClickProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const ClickCard: React.FC<ClickCardProps> = ({
  children,
  header,
  footer,
  animation,
  preset = "bounce",
  disabled = false,
  className = "",
  style,
  onClick,
}) => {
  const baseClasses = "rounded-lg shadow-md p-6 cursor-pointer bg-white dark:bg-gray-800";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg";

  const combinedClassName = `${baseClasses} ${disabledClasses} ${className}`;

  return (
    <Click
      animation={animation}
      preset={preset}
      disabled={disabled}
      className={combinedClassName}
      style={style}
      onClick={disabled ? undefined : onClick}
    >
      {header && <div className="mb-4">{header}</div>}
      <div>{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </Click>
  );
};

export interface ClickIconProps extends ClickProps {
  icon: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const ClickIcon: React.FC<ClickIconProps> = ({
  icon,
  size = "md",
  animation,
  preset = "jelly",
  disabled = false,
  className = "",
  style,
  onClick,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const baseClasses = "flex items-center justify-center rounded-full cursor-pointer";
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "hover:bg-gray-100 dark:hover:bg-gray-700";

  const combinedClassName = `${baseClasses} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <Click
      animation={animation}
      preset={preset}
      disabled={disabled}
      className={combinedClassName}
      style={style}
      onClick={disabled ? undefined : onClick}
    >
      {icon}
    </Click>
  );
};
