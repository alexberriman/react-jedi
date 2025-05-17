import React from "react";
import { toast as sonnerToast, type ExternalToast } from "sonner";
import { useScreenReaderAnnouncement } from "./screen-reader-announcements";

type ToastId = string | number;

interface ToastOptions {
  loading: React.ReactNode;
  success: React.ReactNode | ((data: unknown) => React.ReactNode);
  error: React.ReactNode | ((error: unknown) => React.ReactNode);
}

type ToastFunction = (message: string | React.ReactNode, options?: ExternalToast) => ToastId;

export const useToastWithAnnouncements = () => {
  const { announcePolite, announceAssertive } = useScreenReaderAnnouncement();

  const announceIfString = React.useCallback(
    (message: React.ReactNode, prefix: string, assertive: boolean): void => {
      if (typeof message === "string") {
        const fullMessage = prefix ? `${prefix}: ${message}` : message;
        if (assertive) {
          announceAssertive(fullMessage);
        } else {
          announcePolite(fullMessage);
        }
      }
    },
    [announcePolite, announceAssertive]
  );

  const createToast = React.useCallback(
    (
      toastFn: ToastFunction,
      prefix: string,
      assertive: boolean
    ): ToastFunction => {
      // eslint-disable-next-line sonarjs/function-return-type
      const wrappedToast: ToastFunction = (message, options) => {
        announceIfString(message, prefix, assertive);
        return toastFn(message, options);
      };
      return wrappedToast;
    },
    [announceIfString]
  );

  const promiseHandler = React.useCallback(
    <T = unknown>(
      promise: Promise<T>,
      options: ToastOptions & ExternalToast
    // eslint-disable-next-line sonarjs/function-return-type
    ): ToastId => {
      announceIfString(options.loading, "Loading", false);

      // eslint-disable-next-line sonarjs/function-return-type
      const successHandler = (data: T): React.ReactNode => {
        const result = typeof options.success === "function"
          ? options.success(data)
          : options.success;
        announceIfString(result, "Success", false);
        return result;
      };

      // eslint-disable-next-line sonarjs/function-return-type
      const errorHandler = (error: unknown): React.ReactNode => {
        const result = typeof options.error === "function"
          ? options.error(error)
          : options.error;
        announceIfString(result, "Error", true);
        return result;
      };

      const wrappedOptions = {
        ...options,
        success: successHandler,
        error: errorHandler
      };

      return sonnerToast.promise(promise, wrappedOptions);
    },
    [announceIfString]
  );

  const toast = React.useMemo(() => {
    const base = createToast(sonnerToast, "", false);
    
    return Object.assign(base, {
      success: createToast(sonnerToast.success, "Success", false),
      error: createToast(sonnerToast.error, "Error", true),
      warning: createToast(sonnerToast.warning, "Warning", true),
      info: createToast(sonnerToast.info, "Info", false),
      loading: createToast(sonnerToast.loading, "Loading", false),
      promise: promiseHandler,
      dismiss: sonnerToast.dismiss,
      custom: sonnerToast.custom
    });
  }, [createToast, promiseHandler]);

  return toast;
};