import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { toastManager, imperativeAPIRegistry } from "./toast-manager";
import { toast } from "sonner";

describe("ToastManager", () => {
  beforeEach(() => {
    // Clean up before each test
    toastManager.cleanup();
  });

  afterEach(() => {
    // Clean up after each test
    toastManager.cleanup();
  });

  describe("initialization", () => {
    it("should expose toast functions globally when initialized", () => {
      expect((globalThis as Record<string, unknown>).toast).toBeUndefined();
      
      toastManager.initialize();
      
      expect((globalThis as Record<string, unknown>).toast).toBe(toast);
      expect((globalThis as Record<string, unknown>).toastSuccess).toBe(toast.success);
      expect((globalThis as Record<string, unknown>).toastError).toBe(toast.error);
      expect((globalThis as Record<string, unknown>).toastWarning).toBe(toast.warning);
      expect((globalThis as Record<string, unknown>).toastInfo).toBe(toast.info);
      expect((globalThis as Record<string, unknown>).toastLoading).toBe(toast.loading);
      expect((globalThis as Record<string, unknown>).toastPromise).toBe(toast.promise);
      expect((globalThis as Record<string, unknown>).toastDismiss).toBe(toast.dismiss);
    });

    it("should not initialize twice", () => {
      toastManager.initialize();
      const firstToast = (globalThis as Record<string, unknown>).toast;
      
      toastManager.initialize();
      const secondToast = (globalThis as Record<string, unknown>).toast;
      
      expect(firstToast).toBe(secondToast);
      expect(toastManager.isInitialized).toBe(true);
    });
  });

  describe("cleanup", () => {
    it("should remove global references when cleaned up", () => {
      toastManager.initialize();
      expect((globalThis as Record<string, unknown>).toast).toBeDefined();
      
      toastManager.cleanup();
      
      expect((globalThis as Record<string, unknown>).toast).toBeUndefined();
      expect((globalThis as Record<string, unknown>).toastSuccess).toBeUndefined();
      expect((globalThis as Record<string, unknown>).toastError).toBeUndefined();
      expect((globalThis as Record<string, unknown>).toastWarning).toBeUndefined();
      expect((globalThis as Record<string, unknown>).toastInfo).toBeUndefined();
      expect((globalThis as Record<string, unknown>).toastLoading).toBeUndefined();
      expect((globalThis as Record<string, unknown>).toastPromise).toBeUndefined();
      expect((globalThis as Record<string, unknown>).toastDismiss).toBeUndefined();
      expect(toastManager.isInitialized).toBe(false);
    });
  });

  describe("toast property", () => {
    it("should return the sonner toast function", () => {
      expect(toastManager.toast).toBe(toast);
    });
  });
});

describe("ImperativeAPIRegistry", () => {
  beforeEach(() => {
    // Clean up all APIs including toast
    const allAPIs = imperativeAPIRegistry.getAll();
    for (const name of Object.keys(allAPIs)) {
      imperativeAPIRegistry.unregister(name);
    }
  });
  
  afterEach(() => {
    // Clean up registered APIs
    const allAPIs = imperativeAPIRegistry.getAll();
    for (const name of Object.keys(allAPIs)) {
      imperativeAPIRegistry.unregister(name);
    }
  });

  describe("register", () => {
    it("should register an API and expose it globally", () => {
      const mockAPI = { test: true };
      
      imperativeAPIRegistry.register("testAPI", mockAPI);
      
      expect(imperativeAPIRegistry.get("testAPI")).toBe(mockAPI);
      expect((globalThis as Record<string, unknown>).testAPI).toBe(mockAPI);
    });
  });

  describe("unregister", () => {
    it("should unregister an API and remove it from global scope", () => {
      const mockAPI = { test: true };
      imperativeAPIRegistry.register("testAPI", mockAPI);
      
      imperativeAPIRegistry.unregister("testAPI");
      
      expect(imperativeAPIRegistry.get("testAPI")).toBeUndefined();
      expect((globalThis as Record<string, unknown>).testAPI).toBeUndefined();
    });
  });

  describe("getAll", () => {
    it("should return all registered APIs", () => {
      const api1 = { name: "api1" };
      const api2 = { name: "api2" };
      
      imperativeAPIRegistry.register("api1", api1);
      imperativeAPIRegistry.register("api2", api2);
      
      const allAPIs = imperativeAPIRegistry.getAll();
      
      expect(allAPIs).toHaveProperty("api1", api1);
      expect(allAPIs).toHaveProperty("api2", api2);
      expect(Object.keys(allAPIs)).toHaveLength(2);
    });
  });
});