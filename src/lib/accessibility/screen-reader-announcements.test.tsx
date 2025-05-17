import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act, cleanup } from "@testing-library/react";
import React from "react";
import { ScreenReaderProvider, useScreenReaderAnnouncement } from "./screen-reader-announcements";

describe("Screen Reader Announcements", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    cleanup();
  });

  it("should announce polite messages", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ScreenReaderProvider>{children}</ScreenReaderProvider>
    );
    
    const { result } = renderHook(() => useScreenReaderAnnouncement(), { wrapper });

    act(() => {
      result.current.announcePolite("Hello world");
    });

    // Get the live region
    const politeRegion = document.querySelector('[role="status"][aria-live="polite"]');
    expect(politeRegion?.textContent).toContain("Hello world");

    // Advance timer to clear announcement
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(politeRegion?.textContent).toBe("");
  });

  it("should announce assertive messages", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ScreenReaderProvider>{children}</ScreenReaderProvider>
    );
    
    const { result } = renderHook(() => useScreenReaderAnnouncement(), { wrapper });

    act(() => {
      result.current.announceAssertive("Critical error");
    });

    // Get the live region
    const assertiveRegion = document.querySelector('[role="alert"][aria-live="assertive"]');
    expect(assertiveRegion?.textContent).toContain("Critical error");

    // Advance timer to clear announcement
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(assertiveRegion?.textContent).toBe("");
  });

  it("should handle delayed announcements", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ScreenReaderProvider>{children}</ScreenReaderProvider>
    );
    
    const { result } = renderHook(() => useScreenReaderAnnouncement(), { wrapper });

    act(() => {
      result.current.announce("Delayed message", { delay: 500 });
    });

    const politeRegion = document.querySelector('[role="status"][aria-live="polite"]');
    
    // Should not be announced immediately
    expect(politeRegion?.textContent).toBe("");

    // Advance timer to trigger delayed announcement
    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(politeRegion?.textContent).toContain("Delayed message");
  });

  it("should clear all announcements", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ScreenReaderProvider>{children}</ScreenReaderProvider>
    );
    
    const { result } = renderHook(() => useScreenReaderAnnouncement(), { wrapper });

    act(() => {
      result.current.announcePolite("Message 1");
      result.current.announceAssertive("Message 2");
    });

    const politeRegion = document.querySelector('[role="status"][aria-live="polite"]');
    const assertiveRegion = document.querySelector('[role="alert"][aria-live="assertive"]');
    
    expect(politeRegion?.textContent).toContain("Message 1");
    expect(assertiveRegion?.textContent).toContain("Message 2");

    act(() => {
      result.current.clear();
    });

    expect(politeRegion?.textContent).toBe("");
    expect(assertiveRegion?.textContent).toBe("");
  });

  it("should handle multiple announcements", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ScreenReaderProvider>{children}</ScreenReaderProvider>
    );
    
    const { result } = renderHook(() => useScreenReaderAnnouncement(), { wrapper });

    act(() => {
      result.current.announcePolite("Message 1");
      result.current.announcePolite("Message 2");
      result.current.announcePolite("Message 3");
    });

    const politeRegion = document.querySelector('[role="status"][aria-live="polite"]');
    expect(politeRegion?.textContent).toContain("Message 1");
    expect(politeRegion?.textContent).toContain("Message 2");
    expect(politeRegion?.textContent).toContain("Message 3");
  });

  it("should throw error when used outside provider", () => {
    expect(() => {
      renderHook(() => useScreenReaderAnnouncement());
    }).toThrow("useScreenReaderAnnouncement must be used within a ScreenReaderProvider");
  });
});