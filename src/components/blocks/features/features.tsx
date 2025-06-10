import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'react-icons/fi';
import { IconType } from 'react-icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export type FeatureVariant = 'grid' | 'alternating' | 'tabbed' | 'icon-focused' | 'comparison';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string | IconType;
  image?: string;
  benefits?: string[];
  category?: string;
  status?: 'available' | 'coming-soon' | 'beta';
  badge?: string;
}

export interface FeaturesProperties {
  readonly features: Feature[];
  readonly variant?: FeatureVariant;
  readonly title?: string;
  readonly subtitle?: string;
  readonly categories?: string[];
  readonly comparisonPlans?: string[];
  readonly gridColumns?: 2 | 3 | 4;
  readonly showBenefits?: boolean;
  readonly animated?: boolean;
  readonly className?: string;
  readonly onFeatureClick?: (feature: Feature) => void;
}

function getIconComponent(icon: string | IconType | undefined): IconType | null {
  if (!icon) return null;
  if (typeof icon === 'function') return icon;
  if (typeof icon === 'string' && icon in Icons) {
    return Icons[icon as keyof typeof Icons] as IconType;
  }
  return null;
}

function FeatureCard({
  feature,
  variant,
  index,
  animated,
  showBenefits,
  onClick,
}: Readonly<{
  feature: Feature;
  variant: FeatureVariant;
  index: number;
  animated?: boolean;
  showBenefits?: boolean;
  onClick?: () => void;
}>) {
  const Icon = getIconComponent(feature.icon);
  const isAlternating = variant === 'alternating';
  const isIconFocused = variant === 'icon-focused';
  const isReversed = isAlternating && index % 2 === 1;

  const cardContent = (
    <>
      {isIconFocused && Icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 mb-4">
          <Icon className="h-8 w-8 text-primary" />
        </div>
      )}
      
      {!isIconFocused && Icon && !isAlternating && (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      )}

      <div>
        <h3 className={cn(
          "font-semibold mb-2",
          isIconFocused ? "text-lg" : "text-xl"
        )}>
          {feature.title}
          {feature.status === 'coming-soon' && (
            <Badge variant="outline" className="ml-2">
              <Clock className="mr-1 h-3 w-3" />
              Coming Soon
            </Badge>
          )}
          {feature.status === 'beta' && (
            <Badge variant="secondary" className="ml-2">Beta</Badge>
          )}
          {feature.badge && (
            <Badge variant="default" className="ml-2">{feature.badge}</Badge>
          )}
        </h3>
        
        <p className="text-muted-foreground mb-4">{feature.description}</p>
        
        {showBenefits && feature.benefits && feature.benefits.length > 0 && (
          <ul className="space-y-2">
            {feature.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  if (isAlternating) {
    return (
      <motion.div
        initial={animated ? { opacity: 0, y: 20 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: index * 0.1 }}
        className={cn(
          "grid gap-8 items-center",
          feature.image ? "md:grid-cols-2" : "grid-cols-1"
        )}
      >
        <div className={cn(feature.image && isReversed && "md:order-2")}>
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
          {cardContent}
        </div>
        
        {feature.image && (
          <div className={cn(
            "relative overflow-hidden rounded-lg",
            isReversed && "md:order-1"
          )}>
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </motion.div>
    );
  }

  const cardWrapper = (
    <Card
      className={cn(
        "h-full transition-all",
        onClick && "cursor-pointer hover:shadow-lg",
        isIconFocused && "text-center"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        {cardContent}
      </CardContent>
    </Card>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {cardWrapper}
      </motion.div>
    );
  }

  return cardWrapper;
}

function GridLayout({ features, gridColumns, animated, showBenefits, onFeatureClick }: Readonly<{
  features: Feature[];
  gridColumns: number;
  animated?: boolean;
  showBenefits?: boolean;
  onFeatureClick?: (feature: Feature) => void;
}>) {
  return (
    <div className={cn(
      "grid gap-6",
      gridColumns === 2 && "md:grid-cols-2",
      gridColumns === 3 && "md:grid-cols-3",
      gridColumns === 4 && "md:grid-cols-2 lg:grid-cols-4"
    )}>
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          variant="grid"
          index={index}
          animated={animated}
          showBenefits={showBenefits}
          onClick={() => onFeatureClick?.(feature)}
        />
      ))}
    </div>
  );
}

function AlternatingLayout({ features, animated, showBenefits, onFeatureClick }: Readonly<{
  features: Feature[];
  animated?: boolean;
  showBenefits?: boolean;
  onFeatureClick?: (feature: Feature) => void;
}>) {
  return (
    <div className="space-y-16">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          variant="alternating"
          index={index}
          animated={animated}
          showBenefits={showBenefits}
          onClick={() => onFeatureClick?.(feature)}
        />
      ))}
    </div>
  );
}

function TabbedLayout({ features, categories, animated, showBenefits, onFeatureClick }: Readonly<{
  features: Feature[];
  categories: string[];
  animated?: boolean;
  showBenefits?: boolean;
  onFeatureClick?: (feature: Feature) => void;
}>) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(f => f.category === activeCategory);

  return (
    <Tabs value={activeCategory} onValueChange={setActiveCategory}>
      <TabsList className="mb-8">
        <TabsTrigger value="all">All Features</TabsTrigger>
        {categories.map(category => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {animated ? (
        <AnimatePresence mode="wait">
          <TabsContent key={activeCategory} value={activeCategory}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <GridLayout 
                features={filteredFeatures} 
                gridColumns={3}
                animated={false}
                showBenefits={showBenefits}
                onFeatureClick={onFeatureClick}
              />
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      ) : (
        <TabsContent value={activeCategory}>
          <GridLayout 
            features={filteredFeatures} 
            gridColumns={3}
            animated={false}
            showBenefits={showBenefits}
            onFeatureClick={onFeatureClick}
          />
        </TabsContent>
      )}
    </Tabs>
  );
}

function IconFocusedLayout({ features, gridColumns, animated, onFeatureClick }: Readonly<{
  features: Feature[];
  gridColumns: number;
  animated?: boolean;
  onFeatureClick?: (feature: Feature) => void;
}>) {
  return (
    <div className={cn(
      "grid gap-6",
      gridColumns === 2 && "md:grid-cols-2",
      gridColumns === 3 && "md:grid-cols-3",
      gridColumns === 4 && "md:grid-cols-2 lg:grid-cols-4"
    )}>
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          variant="icon-focused"
          index={index}
          animated={animated}
          onClick={() => onFeatureClick?.(feature)}
        />
      ))}
    </div>
  );
}

function ComparisonLayout({ features, comparisonPlans }: Readonly<{
  features: Feature[];
  comparisonPlans?: string[];
}>) {
  const plans = comparisonPlans || ['Basic', 'Pro', 'Enterprise'];
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Features</TableHead>
            {plans.map(plan => (
              <TableHead key={plan} className="text-center">{plan}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  {getIconComponent(feature.icon) && (
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                      {React.createElement(getIconComponent(feature.icon)!, {
                        className: "h-4 w-4 text-primary"
                      })}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              </TableCell>
              {plans.map((plan, idx) => (
                <TableCell key={plan} className="text-center">
                  {idx === 0 ? (
                    <Circle className="h-5 w-5 mx-auto text-muted-foreground" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 mx-auto text-primary" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function Features({
  features,
  variant = 'grid',
  title,
  subtitle,
  categories = [],
  comparisonPlans,
  gridColumns = 3,
  showBenefits = true,
  animated = true,
  className,
  onFeatureClick,
}: FeaturesProperties) {
  return (
    <div className={cn("w-full", className)}>
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}

      {variant === 'grid' && (
        <GridLayout
          features={features}
          gridColumns={gridColumns}
          animated={animated}
          showBenefits={showBenefits}
          onFeatureClick={onFeatureClick}
        />
      )}

      {variant === 'alternating' && (
        <AlternatingLayout
          features={features}
          animated={animated}
          showBenefits={showBenefits}
          onFeatureClick={onFeatureClick}
        />
      )}

      {variant === 'tabbed' && (
        <TabbedLayout
          features={features}
          categories={categories}
          animated={animated}
          showBenefits={showBenefits}
          onFeatureClick={onFeatureClick}
        />
      )}

      {variant === 'icon-focused' && (
        <IconFocusedLayout
          features={features}
          gridColumns={gridColumns}
          animated={animated}
          onFeatureClick={onFeatureClick}
        />
      )}

      {variant === 'comparison' && (
        <ComparisonLayout
          features={features}
          comparisonPlans={comparisonPlans}
        />
      )}
    </div>
  );
}