import React from "react";
import { useLocation } from "react-router-dom";
import { useScreenReaderAnnouncement } from "./screen-reader-announcements";

interface RouteAnnouncerProps {
  getPageTitle?: (pathname: string) => string;
}

export const RouteAnnouncer: React.FC<RouteAnnouncerProps> = ({ getPageTitle }) => {
  const location = useLocation();
  const { announcePolite } = useScreenReaderAnnouncement();
  const previousLocation = React.useRef(location.pathname);

  React.useEffect(() => {
    // Only announce if the route actually changed
    if (location.pathname !== previousLocation.current) {
      const title = getPageTitle ? getPageTitle(location.pathname) : getDefaultPageTitle(location.pathname);
      announcePolite(`Navigated to ${title}`);
      previousLocation.current = location.pathname;
    }
  }, [location.pathname, getPageTitle, announcePolite]);

  return null;
};

// Default function to derive page title from pathname
const getDefaultPageTitle = (pathname: string): string => {
  if (pathname === "/") return "Home";
  
  // Remove leading slash and split by remaining slashes
  const segments = pathname.slice(1).split("/");
  
  // Capitalize each segment and join with spaces
  const title = segments
    .map(segment => segment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    )
    .join(" - ");
  
  return title;
};