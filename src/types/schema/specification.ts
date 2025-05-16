/**
 * Server-Driven UI Specification Schema
 *
 * This file defines the TypeScript interfaces for the core Server-Driven UI specification schema.
 * It establishes the foundation for the JSON-based UI definition system.
 */

import type { BaseComponentSpec } from "./base";

/**
 * Main UI Specification Interface
 * 
 * This is the top-level interface for a complete UI specification.
 * It defines the structure of a JSON object that can be rendered by the system.
 */
export interface UISpecification {
  /**
   * The version of the specification schema.
   * Used for compatibility checking and migrations.
   */
  version: string;

  /**
   * Metadata about the specification.
   */
  metadata?: SpecificationMetadata;

  /**
   * The root component of the UI tree.
   */
  root: ComponentSpec;

  /**
   * Optional theme configuration.
   */
  theme?: ThemeSpecification;

  /**
   * Optional global state definitions.
   */
  state?: StateSpecification;

  /**
   * Optional data sources for dynamic content.
   */
  dataSources?: DataSourceSpecification[];

  /**
   * Type property for compatibility with ComponentSpec.
   * Always undefined in UISpecification to distinguish from ComponentSpec.
   */
  type?: string;

  /**
   * Children property for compatibility with ComponentSpec.
   * Always undefined in UISpecification to distinguish from ComponentSpec.
   */
  children?: unknown;
}

/**
 * Metadata for a UI Specification
 * 
 * Contains information about the specification itself, not the UI.
 */
export interface SpecificationMetadata {
  /**
   * Title or name of the specification.
   */
  title?: string;

  /**
   * Description of what this specification creates.
   */
  description?: string;

  /**
   * Author of the specification.
   */
  author?: string;

  /**
   * Creation timestamp of the specification.
   */
  createdAt?: string;

  /**
   * Last modified timestamp of the specification.
   */
  updatedAt?: string;

  /**
   * Tags for categorization or filtering.
   */
  tags?: string[];

  /**
   * Additional custom metadata properties.
   */
  [key: string]: unknown;
}

/**
 * Theme Specification Interface
 * 
 * Defines the theme and styling configuration for the UI.
 */
export interface ThemeSpecification {
  /**
   * Base theme to extend or override.
   */
  base?: string;

  /**
   * Color palette configuration.
   */
  colors?: ThemeColors;

  /**
   * Typography configuration.
   */
  typography?: ThemeTypography;

  /**
   * Font families configuration.
   */
  fonts?: Record<string, string[]>;

  /**
   * Spacing scale configuration.
   */
  spacing?: Record<string, string>;

  /**
   * Border radius configuration.
   */
  borderRadius?: Record<string, string>;

  /**
   * Shadow configuration.
   */
  shadows?: Record<string, string>;

  /**
   * Breakpoints for responsive design.
   */
  breakpoints?: Record<string, string>;

  /**
   * Z-index scale.
   */
  zIndices?: Record<string, number>;

  /**
   * Animation and transition presets.
   */
  animations?: Record<string, AnimationPreset>;
  
  /**
   * Component style overrides for customizing appearance
   */
  components?: ComponentStyleOverrides;
  
  /**
   * Style extension configuration for inheritance and cascade
   */
  styleExtension?: StyleExtensionConfig;
}

/**
 * Component style overrides
 */
export interface ComponentStyleOverrides {
  /**
   * Component style overrides organized by component type
   */
  [componentType: string]: ComponentStyleOverride;
}

/**
 * Style extension configuration
 */
export interface StyleExtensionConfig {
  /**
   * Inheritance configuration
   */
  inheritance?: {
    /**
     * CSS properties that should inherit
     */
    inheritableProperties?: string[];
    
    /**
     * Component types that inherit styles
     */
    inheritingComponents?: string[];
    
    /**
     * Component types that create style boundaries
     */
    boundaryComponents?: string[];
  };
  
  /**
   * Style composition configuration
   */
  composition?: {
    /**
     * Precedence order for style sources
     */
    precedenceOrder?: string[];
    
    /**
     * Whether to merge array values
     */
    mergeArrays?: boolean;
  };
  
  /**
   * Cascade resolution configuration
   */
  cascade?: {
    /**
     * Enable specificity calculation
     */
    useSpecificity?: boolean;
    
    /**
     * Handle !important declarations
     */
    handleImportant?: boolean;
  };
}

/**
 * Individual component style override configuration
 */
export interface ComponentStyleOverride {
  /**
   * Global overrides for all instances of this component
   */
  global?: StyleOverride;
  
  /**
   * Variant-specific overrides
   */
  variants?: Record<string, StyleOverride>;
  
  /**
   * Size-specific overrides
   */
  sizes?: Record<string, StyleOverride>;
  
  /**
   * State-specific overrides
   */
  states?: Record<string, StyleOverride>;
  
  /**
   * Combination overrides (variant + size + state)
   */
  combinations?: StyleOverride[];
}

/**
 * Style override configuration
 */
export interface StyleOverride {
  /**
   * Variant to match (used in combinations)
   */
  variant?: string;
  
  /**
   * Size to match (used in combinations)
   */
  size?: string;
  
  /**
   * State to match (used in combinations)
   */
  state?: string;
  
  /**
   * CSS classes to apply
   */
  className?: string;
  
  /**
   * Style object to apply
   */
  styles?: React.CSSProperties;
  
  /**
   * Theme tokens to apply (resolved to CSS properties)
   */
  tokens?: Record<string, string>;
}

/**
 * Color palette configuration for a theme.
 */
export interface ThemeColors {
  /**
   * Primary color and its variations.
   */
  primary?: ColorScale;

  /**
   * Secondary color and its variations.
   */
  secondary?: ColorScale;

  /**
   * Accent color and its variations.
   */
  accent?: ColorScale;

  /**
   * Neutral/gray colors.
   */
  neutral?: ColorScale;

  /**
   * Success state colors.
   */
  success?: ColorScale;

  /**
   * Warning state colors.
   */
  warning?: ColorScale;

  /**
   * Error state colors.
   */
  error?: ColorScale;

  /**
   * Info state colors.
   */
  info?: ColorScale;

  /**
   * Background colors.
   */
  background?: Record<string, string>;

  /**
   * Text colors.
   */
  text?: Record<string, string>;

  /**
   * Border colors.
   */
  border?: Record<string, string>;

  /**
   * Custom named colors.
   */
  [key: string]: ColorScale | Record<string, string> | undefined;
}

/**
 * A color scale with different shades/intensities.
 */
export interface ColorScale {
  /**
   * Ultra-light shade (50).
   */
  "50"?: string;

  /**
   * Lightest shade (100).
   */
  "100"?: string;

  /**
   * Very light shade (200).
   */
  "200"?: string;

  /**
   * Light shade (300).
   */
  "300"?: string;

  /**
   * Medium-light shade (400).
   */
  "400"?: string;

  /**
   * Medium shade (500) - typically the "main" color.
   */
  "500"?: string;

  /**
   * Medium-dark shade (600).
   */
  "600"?: string;

  /**
   * Dark shade (700).
   */
  "700"?: string;

  /**
   * Very dark shade (800).
   */
  "800"?: string;

  /**
   * Darkest shade (900).
   */
  "900"?: string;

  /**
   * Index signature for additional number-string shade values.
   */
  [key: string]: string | undefined;
}

/**
 * Typography configuration for a theme.
 */
export interface ThemeTypography {
  /**
   * Font families by category.
   */
  fontFamilies?: {
    /**
     * Sans-serif font family.
     */
    sans?: string[];

    /**
     * Serif font family.
     */
    serif?: string[];

    /**
     * Monospace font family.
     */
    mono?: string[];

    /**
     * Display font family for headings.
     */
    display?: string[];

    /**
     * Custom font family categories.
     */
    [key: string]: string[] | undefined;
  };

  /**
   * Font size scale.
   */
  fontSizes?: Record<string, string>;

  /**
   * Font weight scale.
   */
  fontWeights?: Record<string, number>;

  /**
   * Line height scale.
   */
  lineHeights?: Record<string, string | number>;

  /**
   * Letter spacing scale.
   */
  letterSpacings?: Record<string, string>;
}

/**
 * Animation preset configuration.
 */
export interface AnimationPreset {
  /**
   * Duration of the animation.
   */
  duration: string;

  /**
   * Timing function (easing) of the animation.
   */
  easing: string;

  /**
   * Delay before the animation starts.
   */
  delay?: string;

  /**
   * Number of times the animation repeats.
   */
  iterations?: number;

  /**
   * Direction of the animation.
   */
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";

  /**
   * Fill mode of the animation.
   */
  fillMode?: "none" | "forwards" | "backwards" | "both";
}

/**
 * State Specification Interface
 * 
 * Defines the global state structure for the UI.
 */
export interface StateSpecification {
  /**
   * The initial state values.
   */
  initial: Record<string, unknown>;

  /**
   * State persistence configuration.
   */
  persistence?: {
    /**
     * Which storage mechanism to use.
     */
    type: "local" | "session" | "memory";

    /**
     * Key to use for storage.
     */
    key: string;

    /**
     * Which state properties to persist.
     */
    include?: string[];

    /**
     * Which state properties to exclude from persistence.
     */
    exclude?: string[];
  };

  /**
   * Computed state definitions.
   */
  computed?: Record<string, {
    /**
     * Dependencies for this computed value.
     */
    dependencies: string[];

    /**
     * Expression to evaluate.
     */
    expression: string;
  }>;
}

/**
 * Data Source Specification Interface
 * 
 * Defines a source of data for the UI.
 */
export interface DataSourceSpecification {
  /**
   * Unique identifier for the data source.
   */
  id: string;

  /**
   * Type of data source.
   */
  type: "rest" | "graphql" | "static" | "websocket" | "function";

  /**
   * Configuration specific to the data source type.
   */
  config: RestDataSourceConfig | GraphQLDataSourceConfig | StaticDataSourceConfig | WebSocketDataSourceConfig | FunctionDataSourceConfig;

  /**
   * Caching configuration.
   */
  cache?: {
    /**
     * Time-to-live for cached data in seconds.
     */
    ttl: number;

    /**
     * Stale-while-revalidate time in seconds.
     */
    staleWhileRevalidate?: number;
  };

  /**
   * Polling configuration for automatic refresh.
   */
  polling?: {
    /**
     * Interval in seconds.
     */
    interval: number;

    /**
     * Whether to stop polling when the component is not visible.
     */
    pauseWhenHidden?: boolean;
  };

  /**
   * Data transformation steps to apply to the response.
   */
  transforms?: Array<{
    /**
     * Type of transformation.
     */
    type: "map" | "filter" | "sort" | "slice" | "custom";

    /**
     * Configuration for the transformation.
     */
    config: Record<string, unknown>;
  }>;
}

/**
 * REST API Data Source Configuration
 */
export interface RestDataSourceConfig {
  /**
   * The URL of the REST endpoint.
   */
  url: string;

  /**
   * HTTP method to use.
   */
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

  /**
   * Headers to include in the request.
   */
  headers?: Record<string, string>;

  /**
   * Query parameters to include in the URL.
   */
  params?: Record<string, string>;

  /**
   * Body content for POST/PUT/PATCH requests.
   */
  body?: unknown;
}

/**
 * GraphQL Data Source Configuration
 */
export interface GraphQLDataSourceConfig {
  /**
   * The URL of the GraphQL endpoint.
   */
  url: string;

  /**
   * The GraphQL query string.
   */
  query: string;

  /**
   * Variables for the GraphQL query.
   */
  variables?: Record<string, unknown>;

  /**
   * Headers to include in the request.
   */
  headers?: Record<string, string>;
}

/**
 * Static Data Source Configuration
 */
export interface StaticDataSourceConfig {
  /**
   * The static data to use.
   */
  data: unknown;
}

/**
 * WebSocket Data Source Configuration
 */
export interface WebSocketDataSourceConfig {
  /**
   * The WebSocket URL.
   */
  url: string;

  /**
   * Initial message to send on connection.
   */
  initialMessage?: unknown;

  /**
   * Protocol to use.
   */
  protocol?: string;
}

/**
 * Function Data Source Configuration
 */
export interface FunctionDataSourceConfig {
  /**
   * Name of the function to execute.
   */
  name: string;

  /**
   * Arguments to pass to the function.
   */
  args?: Record<string, unknown>;
}

/**
 * Type alias for any component specification.
 * This represents any UI component that can be rendered.
 */
export type ComponentSpec = BaseComponentSpec;