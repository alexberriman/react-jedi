/**
 * Toast Manager for SDUI
 * 
 * This module provides a centralized way to manage toast notifications in SDUI mode.
 * It exposes the toast function from sonner globally and provides a registry
 * for imperative APIs that need to be available in SDUI event handlers.
 */

import { toast as sonnerToast } from "sonner";

export interface ToastManager {
  toast: typeof sonnerToast;
  isInitialized: boolean;
}

// Create a singleton toast manager
class ToastManagerImpl implements ToastManager {
  private _isInitialized = false;

  get toast(): typeof sonnerToast {
    return sonnerToast;
  }

  get isInitialized() {
    return this._isInitialized;
  }

  /**
   * Initialize the toast manager and expose toast function globally
   */
  initialize(): void {
    if (this._isInitialized) {
      return;
    }

    // Expose toast function to global scope for SDUI event handlers
    (globalThis as Record<string, unknown>).toast = sonnerToast;
    
    // Also expose specific toast methods
    (globalThis as Record<string, unknown>).toastSuccess = sonnerToast.success;
    (globalThis as Record<string, unknown>).toastError = sonnerToast.error;
    (globalThis as Record<string, unknown>).toastWarning = sonnerToast.warning;
    (globalThis as Record<string, unknown>).toastInfo = sonnerToast.info;
    (globalThis as Record<string, unknown>).toastLoading = sonnerToast.loading;
    (globalThis as Record<string, unknown>).toastPromise = sonnerToast.promise;
    (globalThis as Record<string, unknown>).toastDismiss = sonnerToast.dismiss;

    this._isInitialized = true;
  }

  /**
   * Cleanup and remove global references
   */
  cleanup(): void {
    if (!this._isInitialized) {
      return;
    }

    delete (globalThis as Record<string, unknown>).toast;
    delete (globalThis as Record<string, unknown>).toastSuccess;
    delete (globalThis as Record<string, unknown>).toastError;
    delete (globalThis as Record<string, unknown>).toastWarning;
    delete (globalThis as Record<string, unknown>).toastInfo;
    delete (globalThis as Record<string, unknown>).toastLoading;
    delete (globalThis as Record<string, unknown>).toastPromise;
    delete (globalThis as Record<string, unknown>).toastDismiss;

    this._isInitialized = false;
  }
}

// Export singleton instance
export const toastManager = new ToastManagerImpl();

/**
 * Registry for imperative APIs that need to be available in SDUI
 */
export interface ImperativeAPIRegistry {
  register(name: string, api: unknown): void;
  unregister(name: string): void;
  get(name: string): unknown;
  getAll(): Record<string, unknown>;
}

class ImperativeAPIRegistryImpl implements ImperativeAPIRegistry {
  private apis: Map<string, unknown> = new Map();

  register(name: string, api: unknown): void {
    this.apis.set(name, api);
    (globalThis as Record<string, unknown>)[name] = api;
  }

  unregister(name: string): void {
    this.apis.delete(name);
    delete (globalThis as Record<string, unknown>)[name];
  }

  get(name: string): unknown {
    return this.apis.get(name);
  }

  getAll(): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of this.apis) {
      result[key] = value;
    }
    return result;
  }
}

// Export singleton registry
export const imperativeAPIRegistry = new ImperativeAPIRegistryImpl();

// Initialize toast manager and register toast API (skip in test environment)
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") {
  toastManager.initialize();
  imperativeAPIRegistry.register("toast", sonnerToast);
}