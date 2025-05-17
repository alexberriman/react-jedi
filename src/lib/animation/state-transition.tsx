import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { useComponentState, StateTransitionConfig, ComponentState } from "./state-transitions";

export interface StateTransitionProps {
  children: ReactNode;
  state: ComponentState;
  config: StateTransitionConfig;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

/**
 * Component that animates between different states based on the current state prop
 */
export const StateTransition: React.FC<StateTransitionProps> = ({
  children,
  state,
  config,
  className,
  style,
  onClick,
  onHoverStart,
  onHoverEnd,
  onFocus,
  onBlur,
  ...props
}) => {
  const motionProps = useComponentState(state, config);

  return (
    <motion.div
      className={className}
      style={style}
      {...motionProps}
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface InteractiveStateTransitionProps {
  children: ReactNode;
  initialState?: ComponentState;
  config: StateTransitionConfig;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (state: ComponentState) => void;
}

/**
 * Component that automatically manages state changes based on user interactions
 */
export const InteractiveStateTransition: React.FC<InteractiveStateTransitionProps> = ({
  children,
  initialState = "initial",
  config,
  disabled = false,
  className,
  style,
  onChange,
  ...props
}) => {
  const [currentState, setCurrentState] = useState<ComponentState>(initialState);

  const updateState = React.useCallback(
    (newState: ComponentState) => {
      setCurrentState(newState);
      if (onChange) {
        onChange(newState);
      }
    },
    [onChange]
  );

  const handleHoverStart = () => {
    if (!disabled && currentState !== "active") {
      updateState("hover");
    }
  };

  const handleHoverEnd = () => {
    if (!disabled && currentState === "hover") {
      updateState(initialState);
    }
  };

  const handleMouseDown = () => {
    if (!disabled) {
      updateState("active");
    }
  };

  const handleMouseUp = () => {
    if (!disabled) {
      updateState("hover");
    }
  };

  const handleFocus = () => {
    if (!disabled && currentState !== "active" && currentState !== "hover") {
      updateState("focus");
    }
  };

  const handleBlur = () => {
    if (!disabled && currentState === "focus") {
      updateState(initialState);
    }
  };

  // Handle enable/disable state transitions
  React.useEffect(() => {
    const handleDisabledStateChange = () => {
      if (disabled) {
        updateState("disabled");
      } else if (currentState === "disabled") {
        updateState(initialState);
      }
    };

    handleDisabledStateChange();
  }, [disabled, initialState, currentState, updateState]);

  return (
    <motion.div
      className={className}
      style={style}
      {...useComponentState(currentState, config)}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface TransitionSequenceProps {
  children: ReactNode;
  states: ComponentState[];
  config: StateTransitionConfig;
  autoPlay?: boolean;
  loop?: boolean;
  durationPerState?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Component that automatically transitions through a sequence of states
 */
export const TransitionSequence: React.FC<TransitionSequenceProps> = ({
  children,
  states,
  config,
  autoPlay = true,
  loop = false,
  durationPerState = 1,
  className,
  style,
  ...props
}) => {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const currentState = states[currentStateIndex];

  // Auto-advance through states if autoPlay is enabled
  React.useEffect(() => {
    if (!autoPlay || states.length <= 1) return;

    const timer = globalThis.setTimeout(() => {
      if (currentStateIndex < states.length - 1) {
        setCurrentStateIndex(currentStateIndex + 1);
      } else if (loop) {
        setCurrentStateIndex(0);
      }
    }, durationPerState * 1000);

    return () => globalThis.clearTimeout(timer);
  }, [autoPlay, currentStateIndex, states.length, durationPerState, loop]);

  return (
    <motion.div
      className={className}
      style={style}
      {...useComponentState(currentState, config)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
