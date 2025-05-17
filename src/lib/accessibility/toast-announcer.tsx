import React from "react";
import { toast as sonnerToast, type ExternalToast } from "sonner";
import { useScreenReaderAnnouncement } from "./screen-reader-announcements";

type ToastId = string | number;

export const useToastWithAnnouncements = () => {
  const { announcePolite, announceAssertive } = useScreenReaderAnnouncement();

  // Note: The different return types are intentional and match the sonner toast library behavior
  const toast = (message: string | React.ReactNode, options?: ExternalToast): ToastId => {
    if (typeof message === "string") {
      announcePolite(message);
    }
    return sonnerToast(message, options);
  };

  toast.success = (message: string | React.ReactNode, options?: ExternalToast): ToastId => {
    if (typeof message === "string") {
      announcePolite(`Success: ${message}`);
    }
    return sonnerToast.success(message, options);
  };

  toast.error = (message: string | React.ReactNode, options?: ExternalToast): ToastId => {
    if (typeof message === "string") {
      announceAssertive(`Error: ${message}`);
    }
    return sonnerToast.error(message, options);
  };

  toast.warning = (message: string | React.ReactNode, options?: ExternalToast): ToastId => {
    if (typeof message === "string") {
      announceAssertive(`Warning: ${message}`);
    }
    return sonnerToast.warning(message, options);
  };

  toast.info = (message: string | React.ReactNode, options?: ExternalToast): ToastId => {
    if (typeof message === "string") {
      announcePolite(`Info: ${message}`);
    }
    return sonnerToast.info(message, options);
  };

  toast.loading = (message: string | React.ReactNode, options?: ExternalToast): ToastId => {
    if (typeof message === "string") {
      announcePolite(`Loading: ${message}`);
    }
    return sonnerToast.loading(message, options);
  };

  toast.promise = <T,>(
    promise: Promise<T>, 
    options: {
      loading: React.ReactNode;
      success: React.ReactNode | ((data: T) => React.ReactNode);
      error: React.ReactNode | ((error: unknown) => React.ReactNode);
    } & ExternalToast
  ): ToastId => {
    if (options.loading && typeof options.loading === "string") {
      announcePolite(`Loading: ${options.loading}`);
    }
    
    const originalSuccess = options.success;
    const originalError = options.error;
    
    const modifiedOptions = {
      ...options,
      success: (data: T): React.ReactNode => {
        const message = typeof originalSuccess === "function" ? originalSuccess(data) : originalSuccess;
        if (typeof message === "string") {
          announcePolite(`Success: ${message}`);
        }
        return message;
      },
      error: (error: unknown): React.ReactNode => {
        const message = typeof originalError === "function" ? originalError(error) : originalError;
        if (typeof message === "string") {
          announceAssertive(`Error: ${message}`);
        }
        return message;
      }
    };
    
    return sonnerToast.promise(promise, modifiedOptions);
  };

  // Pass through other methods
  toast.dismiss = sonnerToast.dismiss;
  toast.custom = sonnerToast.custom;

  return toast;
};