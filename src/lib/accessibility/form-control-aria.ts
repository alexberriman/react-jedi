export interface FormControlAriaProps {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
  ariaErrorMessage?: string;
  ariaRequired?: boolean;
  ariaReadOnly?: boolean;
  ariaDisabled?: boolean;
}

export function getFormControlAriaProps(props: FormControlAriaProps) {
  const {
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaInvalid,
    ariaErrorMessage,
    ariaRequired,
    ariaReadOnly,
    ariaDisabled,
  } = props;

  return {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy || ariaErrorMessage,
    "aria-invalid": ariaInvalid,
    "aria-errormessage": ariaErrorMessage,
    "aria-required": ariaRequired,
    "aria-readonly": ariaReadOnly,
    "aria-disabled": ariaDisabled,
  };
}
