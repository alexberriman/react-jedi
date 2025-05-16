"use client";

import * as React from "react";
import type { ComponentProps } from "@/types/schema/components";
import type { InputOTPDef } from "@/types/components/input-otp";
import { useEventHandlers } from "@/lib/events/use-event-handlers";
import {
  InputOTP as BaseInputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./input-otp/input-otp";

/**
 * Wrapped InputOTP component that integrates with the SDUI system
 */
export function InputOTPComponent({ spec }: Readonly<ComponentProps>) {
  const { props = {} } = spec as InputOTPDef;
  const { registerHandler } = useEventHandlers({ spec, value: props.value || "" });

  const handleValueChange = React.useCallback(
    (value: string) => {
      if (props.onValueChange) {
        registerHandler({
          eventType: "otp-change",
          handler: () => ({ action: props.onValueChange!.action, value }),
        });
      }
    },
    [props.onValueChange, registerHandler]
  );

  const handleComplete = React.useCallback(
    (value: string) => {
      if (props.onComplete) {
        registerHandler({
          eventType: "otp-complete",
          handler: () => ({ action: props.onComplete!.action, value }),
        });
      }
    },
    [props.onComplete, registerHandler]
  );

  // Render the OTP input based on render type
  const renderOTPInput = (): React.ReactElement[] => {
    const renderType = props.render?.type || "grouped";
    const maxLength = props.maxLength || 6;
    const pattern = props.render?.pattern;

    if (renderType === "custom" && pattern) {
      // Parse pattern like "abc-def" to create groups with separators
      const parts = pattern.split(/[-_\\s]/);
      const separators = pattern.match(/[-_\\s]/g) || [];

      return parts.map((part, index) => (
        <React.Fragment key={index}>
          <InputOTPGroup>
            {Array.from({ length: part.length }, (_, i) => (
              <InputOTPSlot
                key={`${index}-${i}`}
                index={parts.slice(0, index).join("").length + i}
              />
            ))}
          </InputOTPGroup>
          {index < separators.length && <InputOTPSeparator />}
        </React.Fragment>
      ));
    }

    if (renderType === "segmented") {
      // Create individual slots without groups
      return Array.from({ length: maxLength }, (_, i) => <InputOTPSlot key={i} index={i} />);
    }

    // Default grouped rendering
    const groupSize = 3;
    const groups = Math.ceil(maxLength / groupSize);

    return Array.from({ length: groups }, (_, groupIndex) => (
      <React.Fragment key={groupIndex}>
        {groupIndex > 0 && <InputOTPSeparator />}
        <InputOTPGroup>
          {Array.from({ length: groupSize }, (_, slotIndex) => {
            const index = groupIndex * groupSize + slotIndex;
            return index < maxLength ? <InputOTPSlot key={index} index={index} /> : null;
          })}
        </InputOTPGroup>
      </React.Fragment>
    ));
  };

  return (
    <BaseInputOTP
      value={props.value}
      onChange={(value) => {
        handleValueChange(value);
        if (value.length === props.maxLength) {
          handleComplete(value);
        }
      }}
      maxLength={props.maxLength}
      pattern={props.pattern}
      disabled={props.disabled}
      className={props.className}
      containerClassName={props.containerClassName}
    >
      {renderOTPInput()}
    </BaseInputOTP>
  );
}

// Export the base InputOTP component from the sub-module
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./input-otp/input-otp";
