"use client";

import * as React from "react";
import type { ComponentProps } from "@/types/schema/components";
import type { InputOTPDef } from "@/types/components/input-otp";
// Event handlers will be implemented when the event system is ready
import {
  InputOTP as BaseInputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./input-otp";

/**
 * Wrapped InputOTP component that integrates with the SDUI system
 */
export function InputOTPComponent({ spec }: Readonly<ComponentProps>) {
  const { props = {} } = spec as InputOTPDef;

  const handleValueChange = React.useCallback(
    (value: string) => {
      if (props.onValueChange) {
        console.log("OTP value changed:", value);
        // Event handlers will be implemented when the event system is ready
      }
    },
    [props.onValueChange]
  );

  const handleComplete = React.useCallback(
    (value: string) => {
      if (props.onComplete) {
        console.log("OTP complete:", value);
        // Event handlers will be implemented when the event system is ready
      }
    },
    [props.onComplete]
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

      return parts.map((part: string, index: number) => (
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
        if (props.maxLength && value.length === props.maxLength) {
          handleComplete(value);
        }
      }}
      maxLength={props.maxLength || 6}
      pattern={props.pattern}
      disabled={props.disabled}
      className={props.className}
      containerClassName={props.containerClassName}
    >
      {renderOTPInput()}
    </BaseInputOTP>
  );
}
