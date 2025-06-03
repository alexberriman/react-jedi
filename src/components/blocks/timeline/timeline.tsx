import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface TimelineItem {
  id: string;
  date: string | Date;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  isMilestone?: boolean;
  isPast?: boolean;
  badge?: string;
  content?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  variant?: "vertical-centered" | "vertical-alternating" | "horizontal" | "minimal" | "with-images";
  lineStyle?: "solid" | "dashed";
  animated?: boolean;
  className?: string;
}

function formatDate(date: string | Date): string {
  if (typeof date === "string") return date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

const timelineItemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const lineAnimation = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export function Timeline({
  items,
  variant = "vertical-centered",
  lineStyle = "solid",
  animated = true,
  className,
}: TimelineProps) {
  const ItemComponent = animated ? motion.li : "li";

  const renderVerticalCentered = () => (
    <ol className={cn("relative", className)}>
      {animated && (
        <motion.div
          className={cn(
            "absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border",
            lineStyle === "dashed" && "bg-gradient-to-b from-border via-transparent to-border"
          )}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineAnimation}
          style={{ originY: 0 }}
        />
      )}
      {!animated && (
        <div
          className={cn(
            "absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border",
            lineStyle === "dashed" && "bg-gradient-to-b from-border via-transparent to-border"
          )}
        />
      )}
      {items.map((item, index) => (
        <ItemComponent
          key={item.id}
          className="relative flex items-center justify-center pb-10 last:pb-0"
          initial={animated ? "hidden" : undefined}
          whileInView={animated ? "visible" : undefined}
          viewport={animated ? { once: true } : undefined}
          variants={animated ? timelineItemAnimation : undefined}
          transition={animated ? { delay: index * 0.1 } : undefined}
        >
          <div className={cn(
            "absolute left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background",
            {
              "bg-primary": item.isMilestone,
              "bg-muted": !item.isMilestone && item.isPast,
              "bg-background": !item.isMilestone && !item.isPast,
            }
          )}>
            {item.icon || (
              <div className={cn(
                "h-3 w-3 rounded-full",
                item.isMilestone ? "bg-primary-foreground" : "bg-primary"
              )} />
            )}
          </div>
          <div className="w-full max-w-3xl px-4 md:px-10">
            <Card className={cn(
              "p-6",
              index % 2 === 0 ? "md:mr-auto md:pr-1/2" : "md:ml-auto md:pl-1/2"
            )}>
              <div className="mb-2 flex items-center gap-2">
                <time className="text-sm text-muted-foreground">{formatDate(item.date)}</time>
                {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              {item.description && (
                <p className="text-muted-foreground">{item.description}</p>
              )}
              {item.content && <div className="mt-4">{item.content}</div>}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="mt-4 rounded-lg object-cover"
                />
              )}
            </Card>
          </div>
        </ItemComponent>
      ))}
    </ol>
  );

  const renderVerticalAlternating = () => (
    <ol className={cn("relative", className)}>
      {animated && (
        <motion.div
          className={cn(
            "absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2",
            lineStyle === "dashed" && "bg-gradient-to-b from-border via-transparent to-border"
          )}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineAnimation}
          style={{ originY: 0 }}
        />
      )}
      {!animated && (
        <div
          className={cn(
            "absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2",
            lineStyle === "dashed" && "bg-gradient-to-b from-border via-transparent to-border"
          )}
        />
      )}
      {items.map((item, index) => (
        <ItemComponent
          key={item.id}
          className="relative mb-10 flex last:mb-0"
          initial={animated ? "hidden" : undefined}
          whileInView={animated ? "visible" : undefined}
          viewport={animated ? { once: true } : undefined}
          variants={animated ? timelineItemAnimation : undefined}
          transition={animated ? { delay: index * 0.1 } : undefined}
        >
          <div className={cn(
            "absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background md:left-1/2 md:-translate-x-1/2",
            {
              "bg-primary": item.isMilestone,
              "bg-muted": !item.isMilestone && item.isPast,
              "bg-background": !item.isMilestone && !item.isPast,
            }
          )}>
            {item.icon || (
              <div className={cn(
                "h-2.5 w-2.5 rounded-full",
                item.isMilestone ? "bg-primary-foreground" : "bg-primary"
              )} />
            )}
          </div>
          <div className={cn(
            "ml-12 w-full md:ml-0 md:w-1/2",
            index % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
          )}>
            <div className={cn(
              "mb-2 flex items-center gap-2",
              index % 2 === 0 && "md:justify-end"
            )}>
              <time className="text-sm text-muted-foreground">{formatDate(item.date)}</time>
              {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
            </div>
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            {item.description && (
              <p className="text-muted-foreground">{item.description}</p>
            )}
            {item.content && <div className="mt-4">{item.content}</div>}
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="mt-4 rounded-lg object-cover"
              />
            )}
          </div>
        </ItemComponent>
      ))}
    </ol>
  );

  const renderHorizontal = () => (
    <div className={cn("hidden md:block", className)}>
      <ol className="relative flex items-center">
        {animated && (
          <motion.div
            className={cn(
              "absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-border",
              lineStyle === "dashed" && "bg-gradient-to-r from-border via-transparent to-border"
            )}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ originX: 0 }}
          />
        )}
        {!animated && (
          <div
            className={cn(
              "absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-border",
              lineStyle === "dashed" && "bg-gradient-to-r from-border via-transparent to-border"
            )}
          />
        )}
        {items.map((item, index) => (
          <ItemComponent
            key={item.id}
            className="relative flex-1"
            initial={animated ? "hidden" : undefined}
            whileInView={animated ? "visible" : undefined}
            viewport={animated ? { once: true } : undefined}
            variants={animated ? timelineItemAnimation : undefined}
            transition={animated ? { delay: index * 0.1 } : undefined}
          >
            <div className="flex flex-col items-center">
              <div className={cn(
                "mb-4 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background",
                {
                  "bg-primary": item.isMilestone,
                  "bg-muted": !item.isMilestone && item.isPast,
                  "bg-background": !item.isMilestone && !item.isPast,
                }
              )}>
                {item.icon || (
                  <div className={cn(
                    "h-3 w-3 rounded-full",
                    item.isMilestone ? "bg-primary-foreground" : "bg-primary"
                  )} />
                )}
              </div>
              <time className="mb-2 text-sm text-muted-foreground">{formatDate(item.date)}</time>
              <h3 className="mb-1 text-center text-lg font-semibold">{item.title}</h3>
              {item.badge && (
                <Badge variant="secondary" className="mb-2">{item.badge}</Badge>
              )}
              {item.description && (
                <p className="max-w-xs text-center text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
          </ItemComponent>
        ))}
      </ol>
      <div className="mt-4 text-center text-sm text-muted-foreground md:hidden">
        (Timeline is best viewed on desktop)
      </div>
    </div>
  );

  const renderMinimal = () => (
    <ol className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <ItemComponent
          key={item.id}
          className="flex items-start gap-4"
          initial={animated ? "hidden" : undefined}
          whileInView={animated ? "visible" : undefined}
          viewport={animated ? { once: true } : undefined}
          variants={animated ? timelineItemAnimation : undefined}
          transition={animated ? { delay: index * 0.1 } : undefined}
        >
          <div className={cn(
            "mt-1 h-2 w-2 rounded-full",
            {
              "bg-primary": item.isMilestone,
              "bg-muted": !item.isMilestone && item.isPast,
              "bg-primary/50": !item.isMilestone && !item.isPast,
            }
          )} />
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <time className="text-sm text-muted-foreground">{formatDate(item.date)}</time>
              {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
            </div>
            <h3 className="font-semibold">{item.title}</h3>
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            )}
          </div>
        </ItemComponent>
      ))}
    </ol>
  );

  const renderWithImages = () => (
    <ol className={cn("space-y-8", className)}>
      {items.map((item, index) => (
        <ItemComponent
          key={item.id}
          className="group"
          initial={animated ? "hidden" : undefined}
          whileInView={animated ? "visible" : undefined}
          viewport={animated ? { once: true } : undefined}
          variants={animated ? timelineItemAnimation : undefined}
          transition={animated ? { delay: index * 0.1 } : undefined}
        >
          <Card className="overflow-hidden">
            <div className="grid gap-6 md:grid-cols-2">
              {item.image && (
                <div className="relative h-48 md:h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  {item.isMilestone && (
                    <Badge className="absolute right-4 top-4">Milestone</Badge>
                  )}
                </div>
              )}
              <div className={cn("p-6", !item.image && "md:col-span-2")}>
                <div className="mb-4 flex items-center gap-4">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    item.isMilestone ? "bg-primary" : "bg-muted"
                  )}>
                    {item.icon || (
                      <div className={cn(
                        "h-3 w-3 rounded-full",
                        item.isMilestone ? "bg-primary-foreground" : "bg-primary"
                      )} />
                    )}
                  </div>
                  <div>
                    <time className="text-sm text-muted-foreground">{formatDate(item.date)}</time>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2">{item.badge}</Badge>
                    )}
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="text-muted-foreground">{item.description}</p>
                )}
                {item.content && <div className="mt-4">{item.content}</div>}
              </div>
            </div>
          </Card>
        </ItemComponent>
      ))}
    </ol>
  );

  switch (variant) {
    case "vertical-alternating": {
      return renderVerticalAlternating();
    }
    case "horizontal": {
      return renderHorizontal();
    }
    case "minimal": {
      return renderMinimal();
    }
    case "with-images": {
      return renderWithImages();
    }
    default: {
      return renderVerticalCentered();
    }
  }
}