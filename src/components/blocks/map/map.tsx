import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Skeleton } from "../../ui/skeleton";
import { Badge } from "../../ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../../ui/sheet";
import { 
  MapIcon, 
  PhoneIcon, 
  MailIcon, 
  ClockIcon, 
  NavigationIcon,
  SearchIcon,
  PlusIcon,
  MinusIcon,
  LayersIcon,
  MaximizeIcon,
  XIcon 
} from "lucide-react";

export interface MapMarker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title?: string;
  description?: string;
  icon?: "default" | "business" | "restaurant" | "hotel" | "shopping" | "custom";
  customIcon?: string;
  infoWindow?: {
    title?: string;
    content?: string;
    image?: string;
    actions?: Array<{
      label: string;
      href?: string;
      onClick?: () => void;
    }>;
  };
}

export interface MapLocation {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  hours?: string;
  description?: string;
  position: {
    lat: number;
    lng: number;
  };
  category?: string;
}

export interface MapProperties extends React.HTMLAttributes<HTMLDivElement> {
  readonly variant?: "embedded" | "fullscreen" | "with-sidebar" | "minimal" | "multi-location";
  readonly googleMapsApiKey?: string;
  readonly center?: {
    lat: number;
    lng: number;
  };
  readonly zoom?: number;
  readonly markers?: MapMarker[];
  readonly locations?: MapLocation[];
  readonly height?: string | number;
  readonly showSearch?: boolean;
  readonly showZoomControls?: boolean;
  readonly showMapTypeControls?: boolean;
  readonly showFullscreenButton?: boolean;
  readonly enableScrollZoom?: boolean;
  readonly enableDragging?: boolean;
  readonly mapStyle?: "roadmap" | "satellite" | "hybrid" | "terrain";
  readonly customMapStyles?: Record<string, unknown>[];
  readonly title?: string;
  readonly description?: string;
  readonly contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
  };
  readonly directionsBaseUrl?: string;
  readonly animated?: boolean;
  readonly className?: string;
  readonly onMarkerClick?: (marker: MapMarker) => void;
  readonly onLocationSelect?: (location: MapLocation) => void;
}

function MapBlock({
  variant = "embedded",
  googleMapsApiKey,
  center = { lat: 40.7128, lng: -74.006 }, // Default to NYC
  zoom = 14,
  markers = [],
  locations = [],
  height = 400,
  showSearch = true,
  showZoomControls = true,
  showMapTypeControls = false,
  showFullscreenButton = true,
  enableScrollZoom = true,
  enableDragging = true,
  mapStyle = "roadmap",
  customMapStyles,
  title,
  description,
  contactInfo,
  directionsBaseUrl = "https://www.google.com/maps/dir/",
  animated = true,
  className,
  onMarkerClick,
  onLocationSelect,
  ...props
}: MapProperties) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<MapLocation | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentMapStyle, setCurrentMapStyle] = React.useState(mapStyle);
  
  // Simulated loading effect
  React.useEffect(() => {
    const timer = globalThis.setTimeout(() => setIsLoading(false), 1000);
    return () => globalThis.clearTimeout(timer);
  }, []);

  // Generate Google Maps iframe URL
  const generateMapUrl = React.useCallback(() => {
    const baseUrl = "https://www.google.com/maps/embed/v1/place";
    const params = new URLSearchParams({
      key: googleMapsApiKey || "",
      q: `${center.lat},${center.lng}`,
      zoom: zoom.toString(),
      maptype: currentMapStyle
    });
    
    return `${baseUrl}?${params.toString()}`;
  }, [googleMapsApiKey, center, zoom, currentMapStyle]);

  // Handle location selection
  const handleLocationSelect = (location: MapLocation) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would search for locations
    console.log("Searching for:", searchQuery);
  };

  // Get directions URL
  const getDirectionsUrl = (location: MapLocation) => {
    const destination = `${location.position.lat},${location.position.lng}`;
    return `${directionsBaseUrl}?api=1&destination=${destination}`;
  };

  // Render map controls
  const renderControls = () => (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
      {showZoomControls && (
        <div className="bg-white rounded-lg shadow-lg p-1 flex flex-col">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8"
            aria-label="Zoom in"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8"
            aria-label="Zoom out"
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {showMapTypeControls && (
        <Button 
          size="icon" 
          variant="outline" 
          className="bg-white shadow-lg"
          onClick={() => setCurrentMapStyle(
            currentMapStyle === "roadmap" ? "satellite" : "roadmap"
          )}
          aria-label="Toggle map type"
        >
          <LayersIcon className="h-4 w-4" />
        </Button>
      )}
      
      {showFullscreenButton && variant !== "fullscreen" && (
        <Button 
          size="icon" 
          variant="outline" 
          className="bg-white shadow-lg"
          onClick={() => setIsFullscreen(true)}
          aria-label="View fullscreen"
        >
          <MaximizeIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  // Render search bar
  const renderSearchBar = () => (
    <form onSubmit={handleSearch} className="absolute top-4 left-4 z-10">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 pl-10 pr-4 bg-white shadow-lg"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </form>
  );

  // Render sidebar content
  const renderSidebar = () => (
    <div className="w-full lg:w-96 p-6 overflow-y-auto">
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {contactInfo && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contactInfo.address && (
              <div className="flex items-start gap-3">
                <MapIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-sm">{contactInfo.address}</span>
              </div>
            )}
            {contactInfo.phone && (
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${contactInfo.phone}`} className="text-sm hover:underline">
                  {contactInfo.phone}
                </a>
              </div>
            )}
            {contactInfo.email && (
              <div className="flex items-center gap-3">
                <MailIcon className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${contactInfo.email}`} className="text-sm hover:underline">
                  {contactInfo.email}
                </a>
              </div>
            )}
            {contactInfo.hours && (
              <div className="flex items-start gap-3">
                <ClockIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-sm">{contactInfo.hours}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {locations.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Locations</h3>
          {locations.map((location) => (
            <Card 
              key={location.name} 
              className={cn(
                "cursor-pointer transition-all",
                animated && "hover:shadow-md hover:-translate-y-0.5",
                selectedLocation?.name === location.name && "ring-2 ring-primary"
              )}
              onClick={() => handleLocationSelect(location)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{location.name}</CardTitle>
                {location.category && (
                  <Badge variant="secondary" className="w-fit">
                    {location.category}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">{location.address}</p>
                {location.phone && (
                  <a href={`tel:${location.phone}`} className="flex items-center gap-2 hover:underline">
                    <PhoneIcon className="h-3 w-3" />
                    {location.phone}
                  </a>
                )}
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full" 
                  asChild
                >
                  <a 
                    href={getDirectionsUrl(location)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <NavigationIcon className="h-3 w-3 mr-2" />
                    Get Directions
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  // Render map content
  const renderMapContent = () => {
    if (isLoading) {
      return <Skeleton className="w-full h-full" />;
    }

    // In a real implementation, this would render the actual Google Maps
    // For now, we'll use an iframe as a fallback
    return (
      <iframe
        src={generateMapUrl()}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Interactive Map"
        aria-label="Google Maps"
        className="w-full h-full"
      />
    );
  };

  // Render based on variant
  const renderMap = () => {
    switch (variant) {
      case "fullscreen": {
        return (
          <div className="fixed inset-0 z-50 bg-background">
            <div className="relative w-full h-full">
              {showSearch && renderSearchBar()}
              {renderControls()}
              <Button
                size="icon"
                variant="outline"
                className="absolute top-4 right-4 z-10 bg-white shadow-lg"
                onClick={() => setIsFullscreen(false)}
                aria-label="Exit fullscreen"
              >
                <XIcon className="h-4 w-4" />
              </Button>
              {renderMapContent()}
            </div>
          </div>
        );
      }

      case "with-sidebar": {
        return (
          <div className="flex flex-col lg:flex-row h-full bg-background rounded-lg overflow-hidden shadow-lg">
            {renderSidebar()}
            <div className="relative flex-1 min-h-[400px]">
              {showSearch && renderSearchBar()}
              {renderControls()}
              {renderMapContent()}
            </div>
          </div>
        );
      }

      case "minimal": {
        return (
          <div className="relative w-full rounded-lg overflow-hidden shadow-md">
            {renderMapContent()}
          </div>
        );
      }

      case "multi-location": {
        return (
          <div className="space-y-6">
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ height }}>
              {showSearch && renderSearchBar()}
              {renderControls()}
              {renderMapContent()}
            </div>
            {locations.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {locations.map((location) => (
                  <Card 
                    key={location.name}
                    className={cn(
                      "cursor-pointer",
                      animated && "transition-all hover:shadow-md hover:-translate-y-0.5"
                    )}
                    onClick={() => handleLocationSelect(location)}
                  >
                    <CardHeader>
                      <CardTitle className="text-base">{location.name}</CardTitle>
                      <CardDescription>{location.address}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <a 
                          href={getDirectionsUrl(location)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <NavigationIcon className="h-3 w-3 mr-2" />
                          Get Directions
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );
      }

      default: { // embedded
        return (
          <div 
            className={cn("relative rounded-lg overflow-hidden shadow-lg", className)}
            style={{ height }}
            {...props}
          >
            {showSearch && renderSearchBar()}
            {renderControls()}
            {renderMapContent()}
          </div>
        );
      }
    }
  };

  // Handle fullscreen mode
  if (isFullscreen && variant !== "fullscreen") {
    return (
      <Sheet open={isFullscreen} onOpenChange={setIsFullscreen}>
        <SheetContent side="right" className="w-full sm:max-w-full p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Map View</SheetTitle>
            <SheetDescription>Interactive map display</SheetDescription>
          </SheetHeader>
          <div className="h-full">
            {renderMap()}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return renderMap();
}

MapBlock.displayName = "Map";

export { MapBlock as Map };