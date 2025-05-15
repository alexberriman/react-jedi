/**
 * Schema Types Index
 *
 * This file exports all component specification schema types.
 * Uses explicit re-exports to avoid naming conflicts.
 */

// Re-export everything except conflicting names
export {
  ComponentChildren,
  EventHandler,
  AccessibilityProps,
} from "./base";

export {
  SkeletonSpec,
} from "./skeleton";

export {
  LabelSpec,
} from "./label";

export {
  InputSpec,
} from "./input";

export { 
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

export {
  BoxSpec,
  ContainerSpec,
  GridSpec,
  FlexSpec,
  AspectRatioSpec,
  SeparatorSpec,
  LayoutComponentSpec,
} from "./layout";

export {
  TextSpec,
  HeadingSpec, 
  BlockQuoteSpec,
  TypographyComponentSpec,
} from "./typography";

export {
  ButtonSpec,
  CardSpec,
  BadgeSpec,
  AvatarSpec,
  ImageSpec,
  UIComponentSpec,
} from "./ui";

// Finally export the unified ComponentSpec from components
export {
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
