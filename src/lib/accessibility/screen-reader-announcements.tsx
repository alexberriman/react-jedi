import * as React from "react";

interface AnnouncementOptions {
  priority?: "polite" | "assertive";
  persistent?: boolean;
  delay?: number;
}

interface Announcement {
  id: string;
  message: string;
  priority: "polite" | "assertive";
  timestamp: number;
}

interface ScreenReaderContextValue {
  announce: (message: string, options?: AnnouncementOptions) => void;
  announcePolite: (message: string) => void;
  announceAssertive: (message: string) => void;
  clear: () => void;
}

const ScreenReaderContext = React.createContext<ScreenReaderContextValue | undefined>(undefined);

export const useScreenReaderAnnouncement = () => {
  const context = React.useContext(ScreenReaderContext);
  if (!context) {
    throw new Error("useScreenReaderAnnouncement must be used within a ScreenReaderProvider");
  }
  return context;
};

// Helper function to create an announcement filter
const createAnnouncementFilter = (announcementId: string) => (prev: Announcement[]) =>
  prev.filter((a) => a.id !== announcementId);

export const ScreenReaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [politeAnnouncements, setPoliteAnnouncements] = React.useState<Announcement[]>([]);
  const [assertiveAnnouncements, setAssertiveAnnouncements] = React.useState<Announcement[]>([]);

  const announce = React.useCallback((message: string, options: AnnouncementOptions = {}) => {
    const { priority = "polite", delay = 0 } = options;

    const announcement: Announcement = {
      id: Date.now().toString(),
      message,
      priority,
      timestamp: Date.now(),
    };

    const performAnnouncement = () => {
      if (priority === "assertive") {
        setAssertiveAnnouncements((prev) => [...prev, announcement]);
      } else {
        setPoliteAnnouncements((prev) => [...prev, announcement]);
      }

      // Clear announcement after 1 second to allow re-announcement of same message
      globalThis.setTimeout(() => {
        const clearAnnouncement = createAnnouncementFilter(announcement.id);

        if (priority === "assertive") {
          setAssertiveAnnouncements(clearAnnouncement);
        } else {
          setPoliteAnnouncements(clearAnnouncement);
        }
      }, 1000);
    };

    if (delay > 0) {
      globalThis.setTimeout(performAnnouncement, delay);
    } else {
      performAnnouncement();
    }
  }, []);

  const announcePolite = React.useCallback(
    (message: string) => {
      announce(message, { priority: "polite" });
    },
    [announce]
  );

  const announceAssertive = React.useCallback(
    (message: string) => {
      announce(message, { priority: "assertive" });
    },
    [announce]
  );

  const clear = React.useCallback(() => {
    setPoliteAnnouncements([]);
    setAssertiveAnnouncements([]);
  }, []);

  const value: ScreenReaderContextValue = {
    announce,
    announcePolite,
    announceAssertive,
    clear,
  };

  return (
    <ScreenReaderContext.Provider value={value}>
      {children}
      {/* ARIA Live Regions */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {politeAnnouncements.map((announcement) => (
          <div key={announcement.id}>{announcement.message}</div>
        ))}
      </div>
      <div role="alert" aria-live="assertive" aria-atomic="true" className="sr-only">
        {assertiveAnnouncements.map((announcement) => (
          <div key={announcement.id}>{announcement.message}</div>
        ))}
      </div>
    </ScreenReaderContext.Provider>
  );
};

// Utility hooks for common announcement patterns (must be called within components)
export const useAnnounceRouteChange = () => {
  const { announcePolite } = useScreenReaderAnnouncement();
  return (routeName: string) => announcePolite(`Navigated to ${routeName}`);
};

export const useAnnounceFormError = () => {
  const { announceAssertive } = useScreenReaderAnnouncement();
  return (error: string) => announceAssertive(`Form error: ${error}`);
};

export const useAnnounceFormSuccess = () => {
  const { announcePolite } = useScreenReaderAnnouncement();
  return (message: string) => announcePolite(`Success: ${message}`);
};

export const useAnnounceLoading = () => {
  const { announcePolite } = useScreenReaderAnnouncement();
  return (resource: string) => announcePolite(`Loading ${resource}`);
};

export const useAnnounceDataLoaded = () => {
  const { announcePolite } = useScreenReaderAnnouncement();
  return (resource: string, count?: number) => {
    if (count === undefined) {
      announcePolite(`${resource} loaded.`);
    } else {
      announcePolite(`${resource} loaded. ${count} items found.`);
    }
  };
};

export const useAnnounceNotification = () => {
  const { announce } = useScreenReaderAnnouncement();
  return (message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    const priority = type === "error" || type === "warning" ? "assertive" : "polite";
    announce(`${type}: ${message}`, { priority });
  };
};

// HOC for components that need announcement capabilities
export const withScreenReaderAnnouncements = <P extends object>(
  Component: React.ComponentType<P & { announce: (message: string) => void }>
) => {
  const WithAnnouncements = React.forwardRef<unknown, P>((props, ref) => {
    const { announcePolite } = useScreenReaderAnnouncement();
    const componentProps = {
      ...props,
      announce: announcePolite,
    } as P & { announce: (message: string) => void };
    return <Component {...componentProps} ref={ref} />;
  });
  WithAnnouncements.displayName = `withScreenReaderAnnouncements(${Component.displayName || Component.name || "Component"})`;
  return WithAnnouncements;
};
