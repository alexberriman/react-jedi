import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
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

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon issue with Webpack
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Define custom icons for different marker types
const createCustomIcon = (type: string) => {
  const iconMap = {
    default: "📍",
    business: "🏢",
    restaurant: "🍴",
    hotel: "🏨",
    shopping: "🛍️",
  };

  const emoji = iconMap[type as keyof typeof iconMap] || iconMap.default;

  return L.divIcon({
    html: `<div style="
      background-color: white;
      border: 2px solid #3B82F6;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    ">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
    className: "custom-div-icon",
  });
};

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
  readonly mapStyle?: "flat" | "streets" | "outdoors" | "satellite" | "custom";
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

// Map control component for zoom buttons
function MapControls({ 
  showZoomControls, 
  showMapTypeControls, 
  showFullscreenButton,
  onFullscreen,
  currentStyle,
  onStyleChange,
  variant 
}: {
  readonly showZoomControls?: boolean;
  readonly showMapTypeControls?: boolean;
  readonly showFullscreenButton?: boolean;
  readonly onFullscreen?: () => void;
  readonly currentStyle?: string;
  readonly onStyleChange?: (style: "flat" | "streets" | "outdoors" | "satellite" | "custom") => void;
  readonly variant?: string;
}) {
  const map = useMap();

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
      {showZoomControls && (
        <div className="bg-white rounded-lg shadow-lg p-1 flex flex-col">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8"
            aria-label="Zoom in"
            onClick={() => map.zoomIn()}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8"
            aria-label="Zoom out"
            onClick={() => map.zoomOut()}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {showMapTypeControls && onStyleChange && (
        <Button 
          size="icon" 
          variant="outline" 
          className="bg-white shadow-lg"
          onClick={() => onStyleChange(
            currentStyle === "flat" ? "streets" : "flat"
          )}
          aria-label="Toggle map type"
        >
          <LayersIcon className="h-4 w-4" />
        </Button>
      )}
      
      {showFullscreenButton && variant !== "fullscreen" && onFullscreen && (
        <Button 
          size="icon" 
          variant="outline" 
          className="bg-white shadow-lg"
          onClick={onFullscreen}
          aria-label="View fullscreen"
        >
          <MaximizeIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

// Map search component
function MapSearch({ searchQuery, onSearchChange, onSearchSubmit }: {
  readonly searchQuery: string;
  readonly onSearchChange: (value: string) => void;
  readonly onSearchSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSearchSubmit} className="absolute top-4 left-4 z-[1000]">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-64 pl-10 pr-4 bg-white shadow-lg"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </form>
  );
}

// Get tile layer URL based on map style
function getTileLayerUrl(style: string): string {
  const tileProviders = {
    flat: {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
    streets: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    outdoors: {
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    },
  };

  return tileProviders[style as keyof typeof tileProviders]?.url || tileProviders.flat.url;
}

function getTileLayerAttribution(style: string): string {
  const tileProviders = {
    flat: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    streets: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    outdoors: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  };

  return tileProviders[style as keyof typeof tileProviders] || tileProviders.flat;
}

function MapBlock({
  variant = "embedded",
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
  mapStyle = "flat",
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
    const timer = globalThis.setTimeout(() => setIsLoading(false), 500);
    return () => globalThis.clearTimeout(timer);
  }, []);

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

    return (
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={enableScrollZoom}
        dragging={enableDragging}
        className="w-full h-full"
        zoomControl={false} // We'll use custom controls
      >
        <TileLayer
          url={getTileLayerUrl(currentMapStyle)}
          attribution={getTileLayerAttribution(currentMapStyle)}
        />
        
        {/* Render markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.position.lat, marker.position.lng]}
            icon={createCustomIcon(marker.icon || "default")}
            eventHandlers={{
              click: () => onMarkerClick?.(marker),
            }}
          >
            {(marker.title || marker.infoWindow) && (
              <Popup>
                <div className="p-2 min-w-[200px]">
                  {marker.infoWindow?.image && (
                    <img 
                      src={marker.infoWindow.image} 
                      alt={marker.infoWindow.title || marker.title}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-sm mb-1">
                    {marker.infoWindow?.title || marker.title}
                  </h3>
                  {(marker.infoWindow?.content || marker.description) && (
                    <p className="text-xs text-muted-foreground mb-2">
                      {marker.infoWindow?.content || marker.description}
                    </p>
                  )}
                  {marker.infoWindow?.actions && (
                    <div className="flex gap-2">
                      {marker.infoWindow.actions.map((action, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={index === 0 ? "default" : "outline"}
                          className="text-xs"
                          onClick={action.onClick}
                          asChild={!!action.href}
                        >
                          {action.href ? (
                            <a href={action.href} target="_blank" rel="noopener noreferrer">
                              {action.label}
                            </a>
                          ) : (
                            action.label
                          )}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
        
        {/* Render location markers */}
        {locations.map((location, index) => (
          <Marker
            key={`location-${index}`}
            position={[location.position.lat, location.position.lng]}
            icon={createCustomIcon("business")}
            eventHandlers={{
              click: () => handleLocationSelect(location),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-sm mb-1">{location.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">{location.address}</p>
                {location.phone && (
                  <p className="text-xs mb-2">
                    <PhoneIcon className="inline h-3 w-3 mr-1" />
                    {location.phone}
                  </p>
                )}
                <Button size="sm" variant="default" className="w-full text-xs" asChild>
                  <a 
                    href={getDirectionsUrl(location)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Custom controls */}
        <MapControls
          showZoomControls={showZoomControls}
          showMapTypeControls={showMapTypeControls}
          showFullscreenButton={showFullscreenButton}
          onFullscreen={() => setIsFullscreen(true)}
          currentStyle={currentMapStyle}
          onStyleChange={setCurrentMapStyle}
          variant={variant}
        />
        
        {/* Search bar */}
        {showSearch && (
          <MapSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearch}
          />
        )}
      </MapContainer>
    );
  };

  // Render based on variant
  const renderMap = () => {
    switch (variant) {
      case "fullscreen": {
        return (
          <div className="fixed inset-0 z-50 bg-background">
            <div className="relative w-full h-full">
              <Button
                size="icon"
                variant="outline"
                className="absolute top-4 right-4 z-[1001] bg-white shadow-lg"
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
            {renderMapContent()}
          </div>
        );
      }
    }
  };

  // Handle fullscreen mode
  if (isFullscreen && variant !== "fullscreen") {
    return (
      <>
        {renderMap()}
        <Sheet open={isFullscreen} onOpenChange={setIsFullscreen}>
          <SheetContent side="right" className="w-full sm:max-w-full p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Map View</SheetTitle>
              <SheetDescription>Interactive map display</SheetDescription>
            </SheetHeader>
            <div className="h-full">
              <div className="fixed inset-0 z-50 bg-background">
                <div className="relative w-full h-full">
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute top-4 right-4 z-[1001] bg-white shadow-lg"
                    onClick={() => setIsFullscreen(false)}
                    aria-label="Exit fullscreen"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                  {renderMapContent()}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return renderMap();
}

MapBlock.displayName = "Map";

export { MapBlock as Map };