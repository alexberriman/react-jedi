/**
 * Component Type Helpers
 *
 * This file provides advanced type helpers for React components
 * in the Server-Driven UI architecture.
 */

import type { ReactElement, ComponentType, ReactNode } from "react";
import type { ComponentSpec, ComponentProps } from "./schema/components";

/**
 * A utility type that makes all properties of a component required.
 */
export type RequiredProps<T> = { [P in keyof T]-?: T[P] };

/**
 * A utility type that makes specific properties of a component required.
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * A utility type that makes specific properties of a component optional.
 */
export type WithOptional<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] };

/**
 * A utility type that removes specific properties from a component.
 */
export type Without<T, K extends keyof T> = Omit<T, K>;

/**
 * A utility type for component that can accept a ref.
 */
export type WithRef<T, R> = T & { ref?: React.Ref<R> };

/**
 * A utility type for polymorphic components that can render as different HTML elements.
 */
export type PolymorphicComponent<Props, DefaultElement extends React.ElementType> = {
  <Element extends React.ElementType = DefaultElement>(
    props: Props & { as?: Element } & Omit<
      React.ComponentPropsWithoutRef<Element>,
      keyof Props | "as"
    >
  ): ReactElement;
  displayName?: string;
};

/**
 * A utility type for polymorphic components that can render as different HTML elements and accept a ref.
 */
export type PolymorphicComponentWithRef<
  Props,
  DefaultElement extends React.ElementType
> = {
  <Element extends React.ElementType = DefaultElement>(
    props: Props & { as?: Element } & Omit<
      React.ComponentPropsWithRef<Element>,
      keyof Props | "as"
    >
  ): ReactElement;
  displayName?: string;
};

/**
 * A utility type for component that are lazily loaded.
 */
export type LazyComponent<T extends ComponentType<unknown>> = React.LazyExoticComponent<T>;

/**
 * A utility type for responsive props that can take different values at different breakpoints.
 */
export type ResponsiveValue<T> =
  | T
  | {
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
      base?: T;
    };

/**
 * A utility type for component variants.
 */
export type VariantProps<Component extends React.ComponentType<unknown>> = Omit<
  React.ComponentPropsWithoutRef<Component>,
  "as" | "children" | "className" | "style"
>;

/**
 * A utility type for component that renders children.
 */
export type WithChildren<P = object> = P & { children?: ReactNode };

/**
 * A utility type for component that renders a component specification.
 */
export type WithSpec<P = object> = P & { spec: ComponentSpec };

/**
 * A utility type for component factories that create components from specifications.
 */
export type ComponentFactory<
  TInput extends ComponentSpec,
  TOutput extends ComponentType<unknown>
> = (spec: TInput) => TOutput;

/**
 * A utility type for component renderers that render specifications.
 */
export type ComponentRenderer<P extends ComponentProps = ComponentProps> = ComponentType<P>;

/**
 * A utility type for component that can be conditionally rendered.
 */
export type ConditionalComponent<P = object> = P & {
  /**
   * A condition that determines whether the component should be rendered.
   * If the condition is false, the component will not be rendered.
   */
  when?: boolean | (() => boolean);
};

/**
 * A utility type for component with a server-driven theme.
 */
export type WithTheme<P = object> = P & {
  /**
   * The theme to apply to the component.
   */
  theme?: Record<string, unknown>;
};

/**
 * A utility type for component with style overrides.
 */
export type WithStyleOverrides<P = object, StyleKeys extends string = string> = P & {
  /**
   * Style overrides for specific parts of the component.
   */
  styleOverrides?: Partial<Record<StyleKeys, string>>;
};

/**
 * A utility type for component with style variants.
 */
export type WithVariants<
  P = object,
  Variant extends string = string,
  Size extends string = string
> = P & {
  /**
   * The visual variant of the component.
   */
  variant?: Variant;
  
  /**
   * The size of the component.
   */
  size?: Size;
};

/**
 * A utility type for extracting the props type from a component.
 */
export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : never;

/**
 * A utility type for extracting the type of a component's children.
 */
export type ChildrenType<P> = P extends { children: infer C } ? C : never;

/**
 * A utility type for extracting the type from a Union of components.
 */
export type ExtractComponentProps<
  Components extends Record<string, React.ComponentType<unknown>>
> = {
  [K in keyof Components]: ExtractProps<Components[K]>;
};

/**
 * A utility type for defining a component with a specific type and base props.
 */
export type ComponentWithType<Type extends string, BaseProps = object> = BaseProps & {
  type: Type;
};

/**
 * A utility type for a component that can be disabled.
 */
export type Disableable<P = object> = P & {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
};

/**
 * A utility type for a component with ARIA attributes.
 */
export type WithAriaAttributes<P = object> = P & {
  /**
   * ARIA attributes for accessibility.
   */
  ariaAttributes?: Record<string, string>;
};

/**
 * A utility type for a component with data attributes.
 */
export type WithDataAttributes<P = object> = P & {
  /**
   * Data attributes for the component.
   */
  dataAttributes?: Record<string, string>;
};

/**
 * A utility type for server-driven components that can render either
 * a specification or children.
 */
export type ServerDrivenComponent<P = object> = P & {
  /**
   * The specification to render.
   */
  spec?: ComponentSpec;
  
  /**
   * Children to render inside the component.
   */
  children?: ReactNode;
};

/**
 * A utility type for a component with a callback.
 */
export type WithCallback<P = object, T = void> = P & {
  /**
   * A callback that is called when the component is triggered.
   */
  onCallback?: (value: T) => void;
};

/**
 * A utility type for a component with event handlers.
 */
export type WithEvents<P = object> = P & {
  /**
   * Event handlers for the component.
   */
  events?: Record<string, (...args: unknown[]) => void>;
};

/**
 * A utility type for a component with test identifiers.
 */
export type WithTestProps<P = object> = P & {
  /**
   * A data-testid attribute for testing.
   */
  testId?: string;
};

/**
 * A utility type that makes all nested properties of an object readonly.
 */
export type DeepReadonly<T> = T extends (infer R)[]
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends (...args: unknown[]) => unknown
  ? T
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

/**
 * A utility type that makes all nested properties of an object partial.
 */
export type DeepPartial<T> = T extends (infer R)[]
  ? DeepPartial<R>[]
  : T extends (...args: unknown[]) => unknown
  ? T
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

/**
 * A utility type for responsive style props with Tailwind CSS breakpoints.
 */
export type TailwindResponsiveValue<T> =
  | T
  | {
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
      base?: T;
    };

/**
 * A utility type for Tailwind CSS spacing values.
 */
export type TailwindSpacing =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96
  | "px"
  | "auto";

/**
 * A utility type for Tailwind CSS font size values.
 */
export type TailwindFontSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

/**
 * A utility type for Tailwind CSS font weight values.
 */
export type TailwindFontWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

/**
 * A utility type for Tailwind CSS line height values.
 */
export type TailwindLineHeight =
  | "none"
  | "tight"
  | "snug"
  | "normal"
  | "relaxed"
  | "loose"
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10;

/**
 * A utility type for creating custom variants for a component.
 */
export type CreateVariants<
  Component extends React.ComponentType<unknown>,
  Variants extends string,
  VariantProps
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.ComponentPropsWithoutRef<Component> & { variant?: Variants } & VariantProps> &
    React.RefAttributes<HTMLElement>
>;

/**
 * A utility type for component composition.
 */
export type ComposedComponent<
  BaseProps,
  SubComponents extends Record<string, React.ComponentType<unknown>>
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<BaseProps> & React.RefAttributes<HTMLElement>
> & {
  [K in keyof SubComponents]: SubComponents[K];
};