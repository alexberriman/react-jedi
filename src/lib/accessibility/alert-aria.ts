export interface AlertAriaProps {
  role?: "alert" | "status";
  ariaLive?: "polite" | "assertive" | "off";
  ariaAtomic?: boolean;
  ariaRelevant?: "additions" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals";
}

export function getAlertAriaProps(props: AlertAriaProps) {
  const {
    role = "alert",
    ariaLive = "polite",
    ariaAtomic = true,
    ariaRelevant = "additions text",
  } = props;

  return {
    role,
    "aria-live": ariaLive,
    "aria-atomic": ariaAtomic,
    "aria-relevant": ariaRelevant,
  };
}
