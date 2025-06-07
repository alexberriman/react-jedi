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
  const inputOTPSpec = spec as InputOTPDef;
  
  // Handle both nested props and top-level props for backward compatibility
  const props = inputOTPSpec.props || {};
  const specAny = spec as Record<string, unknown>;
  
  const maxLength = props.maxLength ?? (specAny.maxLength as number | undefined);
  const pattern = props.pattern ?? (specAny.pattern as string | undefined);
  const disabled = props.disabled ?? (specAny.disabled as boolean | undefined);
  const className = props.className ?? (specAny.className as string | undefined);
  const containerClassName = props.containerClassName ?? (specAny.containerClassName as string | undefined);
  const render = props.render ?? (specAny.render as typeof props.render | undefined);
  const propValue = props.value ?? (specAny.value as string | undefined);
  const defaultValue = props.defaultValue ?? (specAny.defaultValue as string | undefined);
  
  // Handle controlled/uncontrolled state
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : internalValue;

  const handleValueChange = React.useCallback(
    (value: string) => {
      if (!isControlled) {
        setInternalValue(value);
      }
      if (props.onValueChange) {
        console.log("OTP value changed:", value);
        // Event handlers will be implemented when the event system is ready
      }
    },
    [props.onValueChange, isControlled]
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
    const renderType = render?.type || "grouped";
    const finalMaxLength = maxLength || 6;
    const renderPattern = render?.pattern;

    if (renderType === "custom" && renderPattern) {
      // Parse pattern like "abc-def" to create groups with separators
      const parts = renderPattern.split(/[-_\\s]/);
      const separators = renderPattern.match(/[-_\\s]/g) || [];

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
      return Array.from({ length: finalMaxLength }, (_, i) => <InputOTPSlot key={i} index={i} />);
    }

    // Default grouped rendering
    const groupSize = 3;
    const groups = Math.ceil(finalMaxLength / groupSize);

    return Array.from({ length: groups }, (_, groupIndex) => (
      <React.Fragment key={groupIndex}>
        {groupIndex > 0 && <InputOTPSeparator />}
        <InputOTPGroup>
          {Array.from({ length: groupSize }, (_, slotIndex) => {
            const index = groupIndex * groupSize + slotIndex;
            return index < finalMaxLength ? <InputOTPSlot key={index} index={index} /> : null;
          })}
        </InputOTPGroup>
      </React.Fragment>
    ));
  };

  return (
    <BaseInputOTP
      value={value}
      onChange={(newValue) => {
        handleValueChange(newValue);
        if (maxLength && newValue.length === maxLength) {
          handleComplete(newValue);
        }
      }}
      maxLength={maxLength || 6}
      pattern={pattern}
      disabled={disabled}
      className={className}
      containerClassName={containerClassName}
    >
      {renderOTPInput()}
    </BaseInputOTP>
  );
}
