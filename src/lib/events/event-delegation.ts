import { EventHandlerSpec, ActionSpec } from "../../types/events";
import { ComponentState } from "../../types/state";

interface CustomEvent extends Event {
  _propagationStopped?: boolean;
}

export interface EventNode {
  element: HTMLElement;
  handlers: Map<string, EventHandlerSpec[]>;
  state?: ComponentState;
  parent?: EventNode;
  children: EventNode[];
}

export class EventDelegation {
  private root: EventNode | null = null;
  private elementMap: WeakMap<HTMLElement, EventNode> = new WeakMap();
  private globalListeners: Map<string, (event: Event) => void> = new Map();

  constructor(private dispatch: (action: ActionSpec, state?: ComponentState) => void) {}

  registerElement(
    element: HTMLElement,
    handlers: Record<string, EventHandlerSpec>,
    state?: ComponentState,
    parent?: HTMLElement
  ): void {
    const node: EventNode = {
      element,
      handlers: new Map(),
      state,
      children: [],
    };

    // Convert handlers record to Map
    for (const [eventType, spec] of Object.entries(handlers)) {
      const existing = node.handlers.get(eventType) || [];
      node.handlers.set(eventType, [...existing, spec]);
    }

    // Set parent if provided
    if (parent) {
      const parentNode = this.elementMap.get(parent);
      if (parentNode) {
        node.parent = parentNode;
        parentNode.children.push(node);
      }
    }

    // Store in map
    this.elementMap.set(element, node);

    // Set as root if no root exists
    if (!this.root) {
      this.root = node;
    }

    // Setup global listeners for each event type
    for (const [eventType] of node.handlers) {
      if (!this.globalListeners.has(eventType)) {
        const listener = (event: Event) => this.handleEvent(event, eventType);
        document.addEventListener(eventType, listener, true);
        this.globalListeners.set(eventType, listener);
      }
    }
  }

  unregisterElement(element: HTMLElement): void {
    const node = this.elementMap.get(element);
    if (!node) return;

    // Remove from parent's children
    if (node.parent) {
      const index = node.parent.children.indexOf(node);
      if (index !== -1) {
        node.parent.children.splice(index, 1);
      }
    }

    // Reassign children to parent
    for (const child of node.children) {
      child.parent = node.parent;
      if (node.parent) {
        node.parent.children.push(child);
      }
    }

    // Remove from map
    this.elementMap.delete(element);

    // Update root if necessary
    if (this.root === node) {
      this.root = node.children[0] || null;
    }
  }

  private handleEvent(event: Event, eventType: string): void {
    const target = event.target as HTMLElement;
    if (!target) return;

    // Find all nodes in the path from target to root
    const path = this.getEventPath(target);

    // Capture phase
    this.processCapturePhase(path, eventType, event);

    // Bubble phase
    this.processBubblePhase(path, eventType, event);
  }

  private processCapturePhase(path: EventNode[], eventType: string, event: Event): void {
    for (let i = path.length - 1; i >= 0; i--) {
      const node = path[i];
      const handlers = node.handlers.get(eventType);

      if (handlers) {
        for (const handler of handlers) {
          if (handler.capture && !(event as CustomEvent)._propagationStopped) {
            this.executeHandler(event, handler, node);
          }
        }
      }
    }
  }

  private processBubblePhase(path: EventNode[], eventType: string, event: Event): void {
    for (const node of path) {
      const handlers = node.handlers.get(eventType);

      if (handlers) {
        for (const handler of handlers) {
          if (!handler.capture && !(event as CustomEvent)._propagationStopped) {
            this.executeHandler(event, handler, node);
          }
        }
      }

      // Stop if propagation was stopped
      if ((event as CustomEvent)._propagationStopped) break;
    }
  }

  private getEventPath(target: HTMLElement): EventNode[] {
    const path: EventNode[] = [];
    let current: HTMLElement | null = target;

    while (current) {
      const node = this.elementMap.get(current);
      if (node) {
        path.push(node);
      }
      current = current.parentElement;
    }

    return path;
  }

  private executeHandler(event: Event, handler: EventHandlerSpec, node: EventNode): void {
    // Handle preventDefault and stopPropagation
    if (handler.preventDefault) {
      event.preventDefault();
    }

    if (handler.stopPropagation) {
      event.stopPropagation();
      (event as CustomEvent)._propagationStopped = true;
    }

    // Get the action from handler
    const action =
      typeof handler.handler === "string" ? { type: handler.handler } : handler.handler;

    // Dispatch action with node's state
    this.dispatch(action, node.state);
  }

  clear(): void {
    // Remove all global listeners
    for (const [eventType, listener] of this.globalListeners) {
      document.removeEventListener(eventType, listener, true);
    }

    this.globalListeners.clear();
    this.elementMap = new WeakMap();
    this.root = null;
  }
}
