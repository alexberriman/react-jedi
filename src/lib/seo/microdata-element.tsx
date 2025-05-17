import React from "react";
import { generateMicrodataAttributes, type MicrodataSchema } from "./microdata";

export interface MicrodataElementProps {
  schema: MicrodataSchema;
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Component to wrap content with microdata attributes
 */
export function MicrodataElement({
  schema,
  as: Component = "div",
  children,
  className,
  style,
}: Readonly<MicrodataElementProps>): React.JSX.Element {
  const microdataAttrs = generateMicrodataAttributes(schema);

  return (
    <Component
      itemScope={microdataAttrs.itemScope}
      itemType={microdataAttrs.itemType}
      itemID={microdataAttrs.itemId}
      itemRef={microdataAttrs.itemRef}
      className={className}
      style={style}
    >
      {renderMicrodataContent(schema.properties, children)}
    </Component>
  );
}

/**
 * Property wrapper for microdata properties
 */
export interface MicrodataPropertyProps {
  name: string;
  as?: React.ElementType;
  children?: React.ReactNode;
  content?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function MicrodataProperty({
  name,
  as: Component = "span",
  children,
  content,
  className,
  style,
}: Readonly<MicrodataPropertyProps>): React.JSX.Element {
  if (content && !children) {
    return <meta itemProp={name} content={content} />;
  }

  return (
    <Component itemProp={name} className={className} style={style}>
      {children}
    </Component>
  );
}

/**
 * Render microdata content recursively
 */
function renderMicrodataContent(
  properties: Record<string, unknown>,
  children?: React.ReactNode
): React.ReactElement {
  if (children) return <>{children}</>;

  const elements: React.ReactNode[] = [];

  for (const [key, value] of Object.entries(properties)) {
    if (isMicrodataSchema(value)) {
      elements.push(
        <MicrodataElement key={key} schema={value} as="div" className={`microdata-${key}`} />
      );
    } else if (Array.isArray(value)) {
      for (const [index, item] of value.entries()) {
        if (isMicrodataSchema(item)) {
          elements.push(
            <MicrodataElement
              key={`${key}-${index}`}
              schema={item}
              as="div"
              className={`microdata-${key}`}
            />
          );
        } else {
          elements.push(
            <MicrodataProperty key={`${key}-${index}`} name={key}>
              {String(item)}
            </MicrodataProperty>
          );
        }
      }
    } else if (typeof value === "string" || typeof value === "number") {
      elements.push(
        <MicrodataProperty key={key} name={key}>
          {String(value)}
        </MicrodataProperty>
      );
    }
  }

  return <>{elements}</>;
}

/**
 * Type guard to check if value is a MicrodataSchema
 */
function isMicrodataSchema(value: unknown): value is MicrodataSchema {
  return value !== null && typeof value === "object" && "type" in value && "properties" in value;
}

/**
 * Breadcrumb microdata component
 */
export interface BreadcrumbMicrodataProps {
  items: Array<{ name: string; url?: string }>;
  className?: string;
}

export function BreadcrumbMicrodata({
  items,
  className,
}: Readonly<BreadcrumbMicrodataProps>): React.JSX.Element {
  return (
    <ol itemScope itemType="https://schema.org/BreadcrumbList" className={className}>
      {items.map((item, index) => (
        <li
          key={`${item.name}-${index}`}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          {item.url ? (
            <a
              itemScope
              itemType="https://schema.org/Thing"
              itemProp="item"
              itemID={item.url}
              href={item.url}
            >
              <span itemProp="name">{item.name}</span>
            </a>
          ) : (
            <span itemProp="name">{item.name}</span>
          )}
          <meta itemProp="position" content={String(index + 1)} />
        </li>
      ))}
    </ol>
  );
}

/**
 * FAQ microdata component
 */
export interface FAQMicrodataProps {
  questions: Array<{ question: string; answer: string }>;
  className?: string;
}

export function FAQMicrodata({
  questions,
  className,
}: Readonly<FAQMicrodataProps>): React.JSX.Element {
  return (
    <div itemScope itemType="https://schema.org/FAQPage" className={className}>
      {questions.map((item, index) => (
        <div
          key={`faq-${index}`}
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
        >
          <h3 itemProp="name">{item.question}</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
