import { EventHandlerSpec, EventHandlerType } from "../../types/events";

export interface DOMEventMap {
  // Mouse Events
  onClick?: EventHandlerSpec;
  onDoubleClick?: EventHandlerSpec;
  onMouseDown?: EventHandlerSpec;
  onMouseUp?: EventHandlerSpec;
  onMouseEnter?: EventHandlerSpec;
  onMouseLeave?: EventHandlerSpec;
  onMouseMove?: EventHandlerSpec;
  onMouseOver?: EventHandlerSpec;
  onMouseOut?: EventHandlerSpec;

  // Keyboard Events
  onKeyDown?: EventHandlerSpec;
  onKeyUp?: EventHandlerSpec;
  onKeyPress?: EventHandlerSpec;

  // Focus Events
  onFocus?: EventHandlerSpec;
  onBlur?: EventHandlerSpec;

  // Form Events
  onChange?: EventHandlerSpec;
  onInput?: EventHandlerSpec;
  onSubmit?: EventHandlerSpec;
  onReset?: EventHandlerSpec;

  // UI Events
  onScroll?: EventHandlerSpec;
  onResize?: EventHandlerSpec;

  // Document Events
  onLoad?: EventHandlerSpec;
  onUnload?: EventHandlerSpec;
  onError?: EventHandlerSpec;

  // Touch Events
  onTouchStart?: EventHandlerSpec;
  onTouchMove?: EventHandlerSpec;
  onTouchEnd?: EventHandlerSpec;
  onTouchCancel?: EventHandlerSpec;

  // Pointer Events
  onPointerDown?: EventHandlerSpec;
  onPointerMove?: EventHandlerSpec;
  onPointerUp?: EventHandlerSpec;
  onPointerCancel?: EventHandlerSpec;
  onPointerEnter?: EventHandlerSpec;
  onPointerLeave?: EventHandlerSpec;
  onPointerOver?: EventHandlerSpec;
  onPointerOut?: EventHandlerSpec;

  // Animation Events
  onAnimationStart?: EventHandlerSpec;
  onAnimationEnd?: EventHandlerSpec;
  onAnimationIteration?: EventHandlerSpec;

  // Transition Events
  onTransitionEnd?: EventHandlerSpec;

  // Clipboard Events
  onCut?: EventHandlerSpec;
  onCopy?: EventHandlerSpec;
  onPaste?: EventHandlerSpec;

  // Drag Events
  onDrag?: EventHandlerSpec;
  onDragEnd?: EventHandlerSpec;
  onDragEnter?: EventHandlerSpec;
  onDragExit?: EventHandlerSpec;
  onDragLeave?: EventHandlerSpec;
  onDragOver?: EventHandlerSpec;
  onDragStart?: EventHandlerSpec;
  onDrop?: EventHandlerSpec;

  // Media Events
  onPlay?: EventHandlerSpec;
  onPause?: EventHandlerSpec;
  onEnded?: EventHandlerSpec;
  onLoadStart?: EventHandlerSpec;
  onCanPlay?: EventHandlerSpec;
  onCanPlayThrough?: EventHandlerSpec;
  onDurationChange?: EventHandlerSpec;
  onEmptied?: EventHandlerSpec;
  onLoadedData?: EventHandlerSpec;
  onLoadedMetadata?: EventHandlerSpec;
  onSeeked?: EventHandlerSpec;
  onSeeking?: EventHandlerSpec;
  onStalled?: EventHandlerSpec;
  onSuspend?: EventHandlerSpec;
  onTimeUpdate?: EventHandlerSpec;
  onVolumeChange?: EventHandlerSpec;
  onWaiting?: EventHandlerSpec;

  // Wheel Events
  onWheel?: EventHandlerSpec;

  // Context Menu
  onContextMenu?: EventHandlerSpec;

  // Selection Events
  onSelect?: EventHandlerSpec;

  // Other Events
  onToggle?: EventHandlerSpec;
}

const EVENT_NAME_MAP: Record<keyof DOMEventMap, string> = {
  onClick: "click",
  onDoubleClick: "dblclick",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
  onMouseEnter: "mouseenter",
  onMouseLeave: "mouseleave",
  onMouseMove: "mousemove",
  onMouseOver: "mouseover",
  onMouseOut: "mouseout",
  onKeyDown: "keydown",
  onKeyUp: "keyup",
  onKeyPress: "keypress",
  onFocus: "focus",
  onBlur: "blur",
  onChange: "change",
  onInput: "input",
  onSubmit: "submit",
  onReset: "reset",
  onScroll: "scroll",
  onResize: "resize",
  onLoad: "load",
  onUnload: "unload",
  onError: "error",
  onTouchStart: "touchstart",
  onTouchMove: "touchmove",
  onTouchEnd: "touchend",
  onTouchCancel: "touchcancel",
  onPointerDown: "pointerdown",
  onPointerMove: "pointermove",
  onPointerUp: "pointerup",
  onPointerCancel: "pointercancel",
  onPointerEnter: "pointerenter",
  onPointerLeave: "pointerleave",
  onPointerOver: "pointerover",
  onPointerOut: "pointerout",
  onAnimationStart: "animationstart",
  onAnimationEnd: "animationend",
  onAnimationIteration: "animationiteration",
  onTransitionEnd: "transitionend",
  onCut: "cut",
  onCopy: "copy",
  onPaste: "paste",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragEnter: "dragenter",
  onDragExit: "dragexit",
  onDragLeave: "dragleave",
  onDragOver: "dragover",
  onDragStart: "dragstart",
  onDrop: "drop",
  onPlay: "play",
  onPause: "pause",
  onEnded: "ended",
  onLoadStart: "loadstart",
  onCanPlay: "canplay",
  onCanPlayThrough: "canplaythrough",
  onDurationChange: "durationchange",
  onEmptied: "emptied",
  onLoadedData: "loadeddata",
  onLoadedMetadata: "loadedmetadata",
  onSeeked: "seeked",
  onSeeking: "seeking",
  onStalled: "stalled",
  onSuspend: "suspend",
  onTimeUpdate: "timeupdate",
  onVolumeChange: "volumechange",
  onWaiting: "waiting",
  onWheel: "wheel",
  onContextMenu: "contextmenu",
  onSelect: "select",
  onToggle: "toggle",
};

export function mapDOMEventsToSpecs(events: DOMEventMap): Record<string, EventHandlerSpec> {
  const specs: Record<string, EventHandlerSpec> = {};

  for (const [key, spec] of Object.entries(events)) {
    const eventType = EVENT_NAME_MAP[key as keyof DOMEventMap];
    if (eventType && spec) {
      specs[eventType] = {
        ...spec,
        type: eventType as EventHandlerType,
      };
    }
  }

  return specs;
}

export function extractEventHandlers(props: Record<string, unknown>): {
  eventHandlers: Record<string, EventHandlerSpec>;
  remainingProps: Record<string, unknown>;
} {
  const eventHandlers: Record<string, EventHandlerSpec> = {};
  const remainingProps: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("on") && key in EVENT_NAME_MAP) {
      const eventType = EVENT_NAME_MAP[key as keyof DOMEventMap];
      if (eventType && value) {
        eventHandlers[eventType] = value as EventHandlerSpec;
      }
    } else {
      remainingProps[key] = value;
    }
  }

  return { eventHandlers, remainingProps };
}
