import { RefObject } from "react";

export function createMockRef<T>(value: T): RefObject<T> {
  return {
    current: value,
  };
}
