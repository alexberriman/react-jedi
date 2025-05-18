import React from "react";
import { toast as sonnerToast, type ExternalToast } from "sonner";
import { useScreenReaderAnnouncement } from "./screen-reader-announcements";

type ToastId = string | number;
type ToastFunction = (message: string | React.ReactNode, options?: ExternalToast) => ToastId;
type PromiseResult = ReturnType<typeof sonnerToast.promise>;

interface ToastOptions {
  loading: React.ReactNode;
  success: React.ReactNode | ((data: unknown) => React.ReactNode);
  error: React.ReactNode | ((error: unknown) => React.ReactNode);
}

/**
 * @returns {React.ReactNode}
 */
function getNodeFromOption(
  option: React.ReactNode | ((data: unknown) => React.ReactNode),
  data: unknown
): React.ReactNode {
  if (typeof option === "function") {
    return option(data);
  }
  return option;
}

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
    (toastFn: ToastFunction, prefix: string, assertive: boolean): ToastFunction => {
      /**
       * @returns {ToastId}
       */
      function wrappedToast(message: string | React.ReactNode, options?: ExternalToast): ToastId {
        announceIfString(message, prefix, assertive);
        return toastFn(message, options);
      }
      return wrappedToast;
    },
    [announceIfString]
  );

  const promiseHandler = React.useCallback(
    /**
     * @returns {PromiseResult}
     */
    function handlePromise<T = unknown>(
      promise: Promise<T>,
      options: ToastOptions & ExternalToast
    ): PromiseResult {
      announceIfString(options.loading, "Loading", false);

      /**
       * @returns {React.ReactNode}
       */
      function successHandler(data: T): React.ReactNode {
        const result = getNodeFromOption(options.success, data);
        announceIfString(result, "Success", false);
        return result;
      }

      /**
       * @returns {React.ReactNode}
       */
      function errorHandler(error: unknown): React.ReactNode {
        const result = getNodeFromOption(options.error, error);
        announceIfString(result, "Error", true);
        return result;
      }

      const wrappedOptions = {
        ...options,
        success: successHandler,
        error: errorHandler,
      };

      return sonnerToast.promise(promise, wrappedOptions);
    },
    [announceIfString]
  );

  const toast = React.useMemo(() => {
    const base = createToast(sonnerToast as ToastFunction, "", false);

    return Object.assign(base, {
      success: createToast(sonnerToast.success as ToastFunction, "Success", false),
      error: createToast(sonnerToast.error as ToastFunction, "Error", true),
      warning: createToast(sonnerToast.warning as ToastFunction, "Warning", true),
      info: createToast(sonnerToast.info as ToastFunction, "Info", false),
      loading: createToast(sonnerToast.loading as ToastFunction, "Loading", false),
      promise: promiseHandler,
      dismiss: sonnerToast.dismiss,
      custom: sonnerToast.custom,
    });
  }, [createToast, promiseHandler]);

  return toast;
};
