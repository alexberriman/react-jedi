import { ComponentState } from "./state";

export type EventHandlerType =
  | "click"
  | "dblclick"
  | "mousedown"
  | "mouseup"
  | "mouseenter"
  | "mouseleave"
  | "mousemove"
  | "mouseover"
  | "mouseout"
  | "keydown"
  | "keyup"
  | "keypress"
  | "focus"
  | "blur"
  | "change"
  | "input"
  | "submit"
  | "reset"
  | "scroll"
  | "resize"
  | "load"
  | "unload"
  | "error";

export interface EventHandlerSpec {
  type: EventHandlerType;
  handler: ActionSpec | string;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
  debounce?: number;
  throttle?: number;
}

export interface ActionSpec {
  type: string;
  payload?: unknown;
  target?: string;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

export interface EventHandlerOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

export interface EventDebugInfo {
  timestamp: number;
  eventType: string;
  target: string;
  action: ActionSpec;
  state: ComponentState;
  propagationStopped: boolean;
  defaultPrevented: boolean;
}

export type EventListener = (event: Event) => void;

export interface EventRegistration {
  element: HTMLElement;
  type: EventHandlerType;
  listener: EventListener;
  options?: EventHandlerOptions;
}
