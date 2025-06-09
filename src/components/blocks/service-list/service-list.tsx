import { motion } from "framer-motion"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { cn } from "../../../lib/utils"
import { SDUIIcon } from "../../../lib/icons/sdui-icon"

export interface ServiceItem {
  id: string
  icon?: React.ReactNode | string
  image?: string
  title: string
  description: string
  features?: string[]
  pricing?: {
    price: string
    period?: string
    currency?: string
  }
  badge?: "popular" | "new" | "recommended"
  ctaText?: string
  ctaLink?: string
  highlighted?: boolean
}

export interface ServiceListProperties {
  services: ServiceItem[]
  variant?: "cards" | "list" | "alternating" | "tabs" | "accordion"
  columns?: 2 | 3 | 4
  animated?: boolean
  showComparison?: boolean
  className?: string
}

export function ServiceList({
  services,
  variant = "cards",
  columns = 3,
  animated = true,
  showComparison = false,
  className,
}: Readonly<ServiceListProperties>) {
  const [expandedServices, setExpandedServices] = useState<string[]>([])

  const toggleExpanded = (serviceId: string) => {
    setExpandedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const renderIcon = (icon?: React.ReactNode | string, size?: string) => {
    if (!icon) return null
    
    if (typeof icon === "string") {
      return <SDUIIcon name={icon} size={size === "large" ? 32 : 24} />
    }
    
    return icon
  }

  const renderBadge = (badge?: ServiceItem["badge"]) => {
    if (!badge) return null

    const badgeVariants = {
      popular: { label: "Popular", variant: "default" as const },
      new: { label: "New", variant: "secondary" as const },
      recommended: { label: "Recommended", variant: "default" as const },
    }

    const { label, variant } = badgeVariants[badge]
    return <Badge variant={variant}>{label}</Badge>
  }

  switch (variant) {
    case "cards": {
      return (
        <div className={cn("w-full", className)}>
          <div
            className={cn(
              "grid gap-6",
              columns === 2 && "grid-cols-1 md:grid-cols-2",
              columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
              columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            )}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={animated ? { opacity: 0, y: 20 } : undefined}
                animate={animated ? { opacity: 1, y: 0 } : undefined}
                transition={animated ? { delay: index * 0.1 } : undefined}
              >
                <Card
                  className={cn(
                    "h-full transition-all hover:shadow-lg",
                    service.highlighted && "ring-2 ring-primary"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {service.icon && (
                          <div className="text-primary">{renderIcon(service.icon)}</div>
                        )}
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                      {renderBadge(service.badge)}
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {service.features && (
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {service.pricing && (
                      <div className="pt-4 border-t">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold">
                            {service.pricing.currency || "$"}
                            {service.pricing.price}
                          </span>
                          {service.pricing.period && (
                            <span className="text-muted-foreground">
                              /{service.pricing.period}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  {service.ctaText && (
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={service.highlighted ? "default" : "outline"}
                        asChild
                      >
                        <a href={service.ctaLink || "#"}>{service.ctaText}</a>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )
    }

    case "list": {
      return (
        <div className={cn("w-full space-y-4", className)}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={animated ? { opacity: 0, x: -20 } : undefined}
              animate={animated ? { opacity: 1, x: 0 } : undefined}
              transition={animated ? { delay: index * 0.05 } : undefined}
            >
              <Card className="transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {service.icon && (
                      <div className="text-primary flex-shrink-0">{renderIcon(service.icon)}</div>
                    )}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{service.title}</h3>
                          <p className="text-muted-foreground mt-1">{service.description}</p>
                        </div>
                        {renderBadge(service.badge)}
                      </div>
                      {service.features && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                          {service.features.length > 3 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpanded(service.id)}
                            >
                              {expandedServices.includes(service.id) ? (
                                <>
                                  <ChevronUp className="h-4 w-4 mr-1" />
                                  Show less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4 mr-1" />
                                  +{service.features.length - 3} more
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      )}
                      {expandedServices.includes(service.id) && service.features && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {service.features.slice(3).map((feature, idx) => (
                            <Badge key={idx + 3} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-3">
                        {service.pricing && (
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold">
                              {service.pricing.currency || "$"}
                              {service.pricing.price}
                            </span>
                            {service.pricing.period && (
                              <span className="text-muted-foreground text-sm">
                                /{service.pricing.period}
                              </span>
                            )}
                          </div>
                        )}
                        {service.ctaText && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={service.ctaLink || "#"}>{service.ctaText}</a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )
    }

    case "alternating": {
      return (
        <div className={cn("w-full space-y-16", className)}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={animated ? { opacity: 0, y: 30 } : undefined}
              animate={animated ? { opacity: 1, y: 0 } : undefined}
              transition={animated ? { delay: index * 0.1 } : undefined}
              className={cn(
                "flex flex-col lg:flex-row items-center gap-8 lg:gap-12",
                index % 2 === 1 && "lg:flex-row-reverse"
              )}
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  {service.icon && <div className="text-primary">{renderIcon(service.icon, "large")}</div>}
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  {renderBadge(service.badge)}
                </div>
                <p className="text-lg text-muted-foreground">{service.description}</p>
                {service.features && (
                  <ul className="space-y-2 pt-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex items-center gap-4 pt-4">
                  {service.pricing && (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">
                        {service.pricing.currency || "$"}
                        {service.pricing.price}
                      </span>
                      {service.pricing.period && (
                        <span className="text-muted-foreground">
                          /{service.pricing.period}
                        </span>
                      )}
                    </div>
                  )}
                  {service.ctaText && (
                    <Button size="lg" asChild>
                      <a href={service.ctaLink || "#"}>{service.ctaText}</a>
                    </Button>
                  )}
                </div>
              </div>
              {service.image && (
                <div className="flex-1">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )
    }

    case "tabs": {
      return (
        <div className={cn("w-full", className)}>
          <Tabs defaultValue={services[0]?.id} className="w-full">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${services.length}, 1fr)` }}>
              {services.map((service) => (
                <TabsTrigger key={service.id} value={service.id}>
                  <div className="flex items-center gap-2">
                    {service.icon && <span className="hidden sm:inline">{renderIcon(service.icon)}</span>}
                    <span>{service.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {services.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                        <CardDescription className="text-base mt-2">
                          {service.description}
                        </CardDescription>
                      </div>
                      {renderBadge(service.badge)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {service.features && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t">
                      {service.pricing && (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">
                            {service.pricing.currency || "$"}
                            {service.pricing.price}
                          </span>
                          {service.pricing.period && (
                            <span className="text-muted-foreground">
                              /{service.pricing.period}
                            </span>
                          )}
                        </div>
                      )}
                      {service.ctaText && (
                        <Button size="lg" asChild>
                          <a href={service.ctaLink || "#"}>{service.ctaText}</a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )
    }

    case "accordion": {
      return (
        <div className={cn("w-full", className)}>
          <Accordion type="single" collapsible className="w-full">
            {services.map((service, index) => (
              <AccordionItem key={service.id} value={service.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      {service.icon && <span>{renderIcon(service.icon)}</span>}
                      <span className="font-semibold text-lg">{service.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderBadge(service.badge)}
                      {service.pricing && (
                        <span className="text-sm font-medium text-muted-foreground">
                          {service.pricing.currency || "$"}
                          {service.pricing.price}
                          {service.pricing.period && `/${service.pricing.period}`}
                        </span>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 space-y-4">
                    <p className="text-muted-foreground">{service.description}</p>
                    {service.features && (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {service.ctaText && (
                      <div className="pt-4">
                        <Button variant="outline" asChild>
                          <a href={service.ctaLink || "#"}>{service.ctaText}</a>
                        </Button>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )
    }

    default: {
      return null
    }
  }
}
