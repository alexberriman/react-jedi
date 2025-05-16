import type { BaseComponentSpec } from "@/types/schema/base";

export interface InputOTPDef extends BaseComponentSpec {
  type: "inputOTP";
  props?: {
    maxLength?: number;
    pattern?: string;
    value?: string;
    onValueChange?: {
      type: "action";
      action: string;
    };
    onComplete?: {
      type: "action";
      action: string;
    };
    placeholder?: string;
    render?: {
      type: "grouped" | "segmented" | "custom";
      pattern?: string; // e.g., "abc-def" for custom separators
    };
    disabled?: boolean;
    className?: string;
    containerClassName?: string;
  };
}
