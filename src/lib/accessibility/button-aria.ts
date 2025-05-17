export interface ButtonAriaProps {
  role?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaDisabled?: boolean;
}

export function getButtonAriaProps(props: ButtonAriaProps) {
  const {
    role = "button",
    ariaLabel,
    ariaDescribedby,
    ariaPressed,
    ariaExpanded,
    ariaDisabled,
  } = props;

  return {
    role,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    "aria-pressed": ariaPressed,
    "aria-expanded": ariaExpanded,
    "aria-disabled": ariaDisabled,
  };
}
