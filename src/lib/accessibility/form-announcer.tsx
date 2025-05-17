import React from "react";
import { useScreenReaderAnnouncement } from "./screen-reader-announcements";

interface UseFormAnnouncementsOptions {
  formName?: string;
}

export const useFormAnnouncements = (options: UseFormAnnouncementsOptions = {}) => {
  const { announcePolite, announceAssertive } = useScreenReaderAnnouncement();
  const { formName = "form" } = options;

  const announceFieldError = React.useCallback((fieldName: string, error: string) => {
    announceAssertive(`${fieldName} error: ${error}`);
  }, [announceAssertive]);

  const announceFieldValid = React.useCallback((fieldName: string) => {
    announcePolite(`${fieldName} is valid`);
  }, [announcePolite]);

  const announceFormSubmitting = React.useCallback(() => {
    announcePolite(`Submitting ${formName}...`);
  }, [announcePolite, formName]);

  const announceFormSuccess = React.useCallback((message?: string) => {
    announcePolite(message || `${formName} submitted successfully`);
  }, [announcePolite, formName]);

  const announceFormError = React.useCallback((error: string) => {
    announceAssertive(`${formName} error: ${error}`);
  }, [announceAssertive, formName]);

  const announceValidationSummary = React.useCallback((errorCount: number) => {
    if (errorCount === 0) {
      announcePolite(`${formName} is valid and ready to submit`);
    } else {
      const plural = errorCount === 1 ? "error" : "errors";
      announceAssertive(`${formName} has ${errorCount} ${plural}. Please review and correct.`);
    }
  }, [announcePolite, announceAssertive, formName]);

  return {
    announceFieldError,
    announceFieldValid,
    announceFormSubmitting,
    announceFormSuccess,
    announceFormError,
    announceValidationSummary,
  };
};

// Higher-order component for form components to inject announcements
export const withFormAnnouncements = <P extends object>(
  Component: React.ComponentType<P & { formAnnounce: ReturnType<typeof useFormAnnouncements> }>
) => {
  const WithFormAnnouncements = React.forwardRef<unknown, P & { formName?: string }>((props, ref) => {
    const { formName, ...restProps } = props;
    const formAnnounce = useFormAnnouncements({ formName });
    
    return <Component {...(restProps as P)} ref={ref} formAnnounce={formAnnounce} />;
  });
  WithFormAnnouncements.displayName = `withFormAnnouncements(${Component.displayName || Component.name || 'Component'})`;
  return WithFormAnnouncements;
};