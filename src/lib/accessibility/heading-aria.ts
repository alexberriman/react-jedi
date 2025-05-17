export interface HeadingAriaProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  ariaLabel?: string;
}

export function getHeadingAriaProps(props: HeadingAriaProps) {
  const { level = 2, ariaLabel } = props;

  return {
    role: "heading",
    "aria-level": level,
    "aria-label": ariaLabel,
  };
}
