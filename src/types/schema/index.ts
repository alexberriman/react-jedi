/**
 * Schema Types Index
 *
 * This file exports all component specification schema types.
 * Uses explicit re-exports to avoid naming conflicts.
 */

// Re-export everything except conflicting names
export type {
  ComponentChildren,
  EventHandler,
  AccessibilityProps,
} from "./base";

export type {
  SkeletonSpec,
} from "./skeleton";

export type {
  LabelSpec,
} from "./label";

export type {
  InputSpec,
} from "./input";

export type { 
  UISpecification,
  SpecificationMetadata,
  ThemeSpecification,
  ThemeColors,
  ColorScale,
  ThemeTypography,
  AnimationPreset,
  StateSpecification,
  DataSourceSpecification,
  RestDataSourceConfig,
  GraphQLDataSourceConfig,
  StaticDataSourceConfig,
  WebSocketDataSourceConfig,
  FunctionDataSourceConfig,
} from "./specification";

export type {
  ThemeMode,
  ThemePreset,
  ThemeVariant,
  ColorModeSettings,
  ThemeColorModePreset,
  ThemeExtension,
  ThemeToken,
  ThemeGeneratorConfig,
  EnhancedThemeSpecification,
} from "./theme";

export type {
  BoxSpec,
  ContainerSpec,
  GridSpec,
  FlexSpec,
  AspectRatioSpec,
  SeparatorSpec,
  LayoutComponentSpec,
} from "./layout";

export type {
  TextSpec,
  HeadingSpec, 
  BlockQuoteSpec,
  TypographyComponentSpec,
} from "./typography";

export type {
  ButtonSpec,
  CardSpec,
  BadgeSpec,
  AvatarSpec,
  ImageSpec,
  UIComponentSpec,
} from "./ui";

// Finally export the unified ComponentSpec from components
export type {
  ComponentSpec,
  ComponentType,
  ComponentResolver,
  ComponentProps,
  RenderOptions,
  ComponentTypes,
} from "./components";

// Export guard functions
export {
  isBox,
  isContainer,
  isGrid,
  isFlex,
  isAspectRatio,
  isSeparator,
  isText,
  isHeading,
  isBlockQuote,
  isButton,
  isCard,
  isBadge,
  isAvatar,
  isImage,
  isSkeleton,
  isLabel,
  isInput,
  isComponentSpec,
  isTextContent,
  isComponentSpecArray,
} from "./guards";

// Export the isComponentType function from guards, not components
export { isComponentType } from "./guards";
