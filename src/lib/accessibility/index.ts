// Existing accessibility utilities
export * from "./keyboard-navigation";
export * from "./button-aria";
export * from "./form-control-aria";
export * from "./alert-aria";
export * from "./heading-aria";

// Screen reader announcements
export {
  ScreenReaderProvider,
  useScreenReaderAnnouncement,
  useAnnounceRouteChange,
  useAnnounceFormError,
  useAnnounceFormSuccess,
  useAnnounceLoading,
  useAnnounceDataLoaded,
  useAnnounceNotification,
  withScreenReaderAnnouncements,
} from "./screen-reader-announcements";

export { useToastWithAnnouncements } from "./toast-announcer";
export { RouteAnnouncer } from "./route-announcer";
export { useFormAnnouncements, withFormAnnouncements } from "./form-announcer";