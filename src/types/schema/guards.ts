/**
 * Type Guards for Component Specifications
 *
 * This file provides type guard functions for safely narrowing component specification types.
 * These guards help with type safety when working with the generic ComponentSpec type.
 */

import type { 
  ComponentSpec, 
  ComponentType 
} from "./components";

import type {
  BoxSpec,
  ContainerSpec,
  GridSpec,
  FlexSpec,
  AspectRatioSpec,
  SeparatorSpec
} from "./layout";

import type {
  TextSpec,
  HeadingSpec,
  BlockQuoteSpec
} from "./typography";

import type {
  ButtonSpec,
  CardSpec,
  BadgeSpec,
  AvatarSpec,
  ImageSpec,
  SkeletonSpec,
  LabelSpec
} from "./ui";

/**
 * General type guard to check if a component is of a specific type.
 * 
 * @param spec The component specification to check
 * @param type The component type to check for
 * @returns True if the component is of the specified type
 */
export function isComponentType<T extends ComponentSpec>(
  spec: ComponentSpec,
  type: ComponentType
): spec is T {
  return spec && spec.type === type;
}

// Layout Component Type Guards

/**
 * Type guard for Box component.
 */
export function isBox(spec: ComponentSpec): spec is BoxSpec {
  return isComponentType<BoxSpec>(spec, "Box");
}

/**
 * Type guard for Container component.
 */
export function isContainer(spec: ComponentSpec): spec is ContainerSpec {
  return isComponentType<ContainerSpec>(spec, "Container");
}

/**
 * Type guard for Grid component.
 */
export function isGrid(spec: ComponentSpec): spec is GridSpec {
  return isComponentType<GridSpec>(spec, "Grid");
}

/**
 * Type guard for Flex component.
 */
export function isFlex(spec: ComponentSpec): spec is FlexSpec {
  return isComponentType<FlexSpec>(spec, "Flex");
}

/**
 * Type guard for AspectRatio component.
 */
export function isAspectRatio(spec: ComponentSpec): spec is AspectRatioSpec {
  return isComponentType<AspectRatioSpec>(spec, "AspectRatio");
}

/**
 * Type guard for Separator component.
 */
export function isSeparator(spec: ComponentSpec): spec is SeparatorSpec {
  return isComponentType<SeparatorSpec>(spec, "Separator");
}

// Typography Component Type Guards

/**
 * Type guard for Text component.
 */
export function isText(spec: ComponentSpec): spec is TextSpec {
  return isComponentType<TextSpec>(spec, "Text");
}

/**
 * Type guard for Heading component.
 */
export function isHeading(spec: ComponentSpec): spec is HeadingSpec {
  return isComponentType<HeadingSpec>(spec, "Heading");
}

/**
 * Type guard for BlockQuote component.
 */
export function isBlockQuote(spec: ComponentSpec): spec is BlockQuoteSpec {
  return isComponentType<BlockQuoteSpec>(spec, "BlockQuote");
}

// UI Component Type Guards

/**
 * Type guard for Button component.
 */
export function isButton(spec: ComponentSpec): spec is ButtonSpec {
  return isComponentType<ButtonSpec>(spec, "Button");
}

/**
 * Type guard for Card component.
 */
export function isCard(spec: ComponentSpec): spec is CardSpec {
  return isComponentType<CardSpec>(spec, "Card");
}

/**
 * Type guard for Badge component.
 */
export function isBadge(spec: ComponentSpec): spec is BadgeSpec {
  return isComponentType<BadgeSpec>(spec, "Badge");
}

/**
 * Type guard for Avatar component.
 */
export function isAvatar(spec: ComponentSpec): spec is AvatarSpec {
  return isComponentType<AvatarSpec>(spec, "Avatar");
}

/**
 * Type guard for Image component.
 */
export function isImage(spec: ComponentSpec): spec is ImageSpec {
  return isComponentType<ImageSpec>(spec, "Image");
}

/**
 * Type guard for Skeleton component.
 */
export function isSkeleton(spec: ComponentSpec): spec is SkeletonSpec {
  return isComponentType<SkeletonSpec>(spec, "Skeleton");
}

/**
 * Type guard for Label component.
 */
export function isLabel(spec: ComponentSpec): spec is LabelSpec {
  return isComponentType<LabelSpec>(spec, "Label");
}

/**
 * Type guard to check if a value is a valid component specification.
 */
export function isComponentSpec(value: unknown): value is ComponentSpec {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    typeof (value as ComponentSpec).type === "string"
  );
}

/**
 * Type guard to check if a value is a string (for text content).
 */
export function isTextContent(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Type guard to check if children is an array of component specs.
 */
export function isComponentSpecArray(
  children: unknown
): children is ComponentSpec[] {
  return (
    Array.isArray(children) &&
    children.every((child) => isComponentSpec(child))
  );
}