import React from "react";
import { motion, HTMLMotionProps, DragHandlers } from "framer-motion";
import {
  useDragAnimation,
  useDragPreset,
  DragAnimationConfig,
  DragPreset,
} from "./animation-hooks";

export interface DragProps {
  children: React.ReactNode;
  animation?: DragAnimationConfig;
  preset?: DragPreset;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onDragStart?: DragHandlers["onDragStart"];
  onDragEnd?: DragHandlers["onDragEnd"];
  onDrag?: DragHandlers["onDrag"];
  dragConstraints?: boolean | Partial<{ left: number; right: number; top: number; bottom: number }>;
  dragElastic?: boolean | number;
  dragSnapToOrigin?: boolean;
  dragMomentum?: boolean;
  axis?: "x" | "y" | false;
}

export const Drag: React.FC<DragProps> = ({
  children,
  animation,
  preset,
  disabled = false,
  className,
  style,
  onDragStart,
  onDragEnd,
  onDrag,
  dragConstraints = true,
  dragElastic = 0.2,
  dragSnapToOrigin = false,
  dragMomentum = true,
  axis = false,
}) => {
  const presetAnimation = useDragPreset(preset || "smooth");
  const customAnimation = useDragAnimation(disabled ? {} : animation);

  const dragAnimation = preset ? presetAnimation : customAnimation;

  const motionProps: HTMLMotionProps<"div"> = {
    ...dragAnimation,
    drag: !disabled,
    dragConstraints: typeof dragConstraints === "boolean" && dragConstraints
      ? { left: 0, right: 0, top: 0, bottom: 0 }
      : dragConstraints,
    dragElastic,
    dragSnapToOrigin,
    dragMomentum,
    dragPropagation: false,
    className,
    style: {
      ...style,
      cursor: disabled ? undefined : "grab",
    },
    onDragStart: disabled ? undefined : onDragStart,
    onDragEnd: disabled ? undefined : onDragEnd,
    onDrag: disabled ? undefined : onDrag,
  };

  if (axis) {
    motionProps.drag = axis;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
};

export interface DragCardProps extends Omit<DragProps, "children"> {
  children: React.ReactNode;
  variant?: "elevated" | "outlined" | "flat" | "interactive";
  size?: "sm" | "md" | "lg";
}

export const DragCard: React.FC<DragCardProps> = ({
  children,
  variant = "elevated",
  size = "md",
  animation,
  preset = "smooth",
  disabled = false,
  className = "",
  style,
  ...dragProps
}) => {
  const baseClasses = "bg-white rounded-lg cursor-grab active:cursor-grabbing transition-shadow";

  const variantClasses = {
    elevated: "shadow-lg hover:shadow-xl",
    outlined: "border-2 border-gray-200 hover:border-gray-300",
    flat: "bg-gray-50 hover:bg-gray-100",
    interactive: "shadow-md hover:shadow-lg transform-gpu",
  };

  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <Drag
      animation={animation}
      preset={preset}
      disabled={disabled}
      className={combinedClassName}
      style={style}
      {...dragProps}
    >
      {children}
    </Drag>
  );
};

export interface DragHandleProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const DragHandle: React.FC<DragHandleProps> = ({
  className = "",
  style,
  children,
}) => {
  const handleClasses = "cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded";

  const combinedClassName = `${handleClasses} ${className}`;

  return (
    <div className={combinedClassName} style={style}>
      {children || (
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </div>
  );
};

export interface DragListItemProps extends DragProps {
  children: React.ReactNode;
  index?: number;
  handle?: boolean;
}

export const DragListItem: React.FC<DragListItemProps> = ({
  children,
  index,
  handle = false,
  animation,
  preset = "smooth",
  disabled = false,
  className = "",
  style,
  ...dragProps
}) => {
  const baseClasses = "bg-white p-4 mb-2 rounded-md shadow-sm hover:shadow-md transition-shadow flex items-center";

  const combinedClassName = `${baseClasses} ${className}`;

  const content = handle ? (
    <>
      <DragHandle className="mr-3" />
      <div className="flex-1">{children}</div>
    </>
  ) : (
    children
  );

  return (
    <Drag
      animation={animation}
      preset={preset}
      disabled={disabled}
      className={combinedClassName}
      style={style}
      dragConstraints={false}
      {...dragProps}
    >
      {content}
    </Drag>
  );
};