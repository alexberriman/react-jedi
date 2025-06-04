"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Text } from "../../ui/text";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { 
  Search, 
  Star, 
  Leaf, 
  AlertTriangle,
  Clock,
  ChefHat
} from "lucide-react";

const restaurantMenuVariants = cva(
  "relative w-full py-8 md:py-12",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        light: "bg-gray-50 text-gray-900",
        dark: "bg-gray-900 text-gray-100",
        elegant: "bg-gradient-to-b from-amber-50 to-orange-50 text-gray-900",
        minimal: "bg-white text-gray-900",
      },
      spacing: {
        tight: "space-y-4",
        normal: "space-y-6", 
        relaxed: "space-y-8",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "normal",
    },
  }
);

type DietaryRestriction = 
  | "vegan" 
  | "vegetarian" 
  | "gluten-free" 
  | "dairy-free" 
  | "nut-free" 
  | "keto" 
  | "paleo"
  | "low-carb"
  | "organic";

type Allergen = 
  | "nuts" 
  | "dairy" 
  | "gluten" 
  | "shellfish" 
  | "eggs" 
  | "soy" 
  | "fish"
  | "sesame";

interface NutritionalInfo {
  calories?: number;
  protein?: string;
  carbs?: string;
  fat?: string;
  fiber?: string;
  sodium?: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For sale items
  image?: string;
  category: string;
  dietaryRestrictions?: DietaryRestriction[];
  allergens?: Allergen[];
  nutritionalInfo?: NutritionalInfo;
  isSpecial?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  spiceLevel?: 1 | 2 | 3 | 4 | 5;
  prepTime?: number; // minutes
  ingredients?: string[];
}

interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
  image?: string;
  availableTime?: string; // e.g., "All Day", "Lunch Only", "After 5pm"
}

interface RestaurantMenuBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof restaurantMenuVariants> {
  categories: MenuCategory[];
  layout?: "categorized" | "single-column" | "two-column" | "grid-cards" | "prix-fixe";
  showSearch?: boolean;
  showFilters?: boolean;
  showImages?: boolean;
  showNutrition?: boolean;
  showIngredients?: boolean;
  currency?: string;
  locale?: string;
  title?: string;
  description?: string;
  onItemSelect?: (item: MenuItem) => void;
  searchPlaceholder?: string;
  showPrepTime?: boolean;
  showSpiceLevel?: boolean;
  compactMode?: boolean;
  maxColumns?: 2 | 3 | 4;
}

const dietaryIcons: Record<DietaryRestriction, React.ReactNode> = {
  vegan: <Leaf className="h-3 w-3 text-green-600" />,
  vegetarian: <Leaf className="h-3 w-3 text-green-500" />,
  "gluten-free": <span className="text-orange-600 text-xs font-bold">GF</span>,
  "dairy-free": <span className="text-blue-600 text-xs font-bold">DF</span>,
  "nut-free": <span className="text-purple-600 text-xs font-bold">NF</span>,
  keto: <span className="text-red-600 text-xs font-bold">K</span>,
  paleo: <span className="text-amber-600 text-xs font-bold">P</span>,
  "low-carb": <span className="text-indigo-600 text-xs font-bold">LC</span>,
  organic: <Leaf className="h-3 w-3 text-emerald-600" />,
};

const dietaryLabels: Record<DietaryRestriction, string> = {
  vegan: "Vegan",
  vegetarian: "Vegetarian", 
  "gluten-free": "Gluten Free",
  "dairy-free": "Dairy Free",
  "nut-free": "Nut Free",
  keto: "Keto",
  paleo: "Paleo",
  "low-carb": "Low Carb",
  organic: "Organic",
};

const DietaryIndicators = ({ restrictions }: { restrictions: DietaryRestriction[] }) => (
  <div className="flex flex-wrap gap-1">
    {restrictions.map((restriction) => (
      <div
        key={restriction}
        className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs"
        title={dietaryLabels[restriction]}
      >
        {dietaryIcons[restriction]}
        <span className="sr-only">{dietaryLabels[restriction]}</span>
      </div>
    ))}
  </div>
);

const SpiceIndicator = ({ level }: { level: number }) => (
  <div className="flex items-center gap-0.5" title={`Spice level: ${level}/5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={cn(
          "h-2 w-2 rounded-full",
          i < level ? "bg-red-500" : "bg-gray-200 dark:bg-gray-700"
        )}
      />
    ))}
  </div>
);

const PriceDisplay = ({ 
  price, 
  originalPrice, 
  currency = "$", 
  locale = "en-US" 
}: { 
  price: number; 
  originalPrice?: number; 
  currency?: string; 
  locale?: string; 
}) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency === "$" ? "USD" : currency,
    }).format(amount);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-lg">{formatPrice(price)}</span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-gray-500 line-through">
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
};

const MenuItemCard = ({
  item,
  showImage = true,
  showNutrition = false,
  showIngredients = false,
  showPrepTime = false,
  showSpiceLevel = false,
  currency,
  locale,
  onSelect,
  compact = false,
}: {
  item: MenuItem;
  showImage?: boolean;
  showNutrition?: boolean;
  showIngredients?: boolean;
  showPrepTime?: boolean;
  showSpiceLevel?: boolean;
  currency?: string;
  locale?: string;
  onSelect?: (item: MenuItem) => void;
  compact?: boolean;
}) => {
  const handleClick = () => {
    onSelect?.(item);
  };

  if (compact) {
    const Component = onSelect ? "button" : "div";
    return (
      <Component 
        className={cn(
          "flex items-start justify-between gap-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 w-full text-left",
          onSelect && "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        )}
        onClick={handleClick}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            <h3 className="font-medium text-sm leading-snug">{item.name}</h3>
            {item.isSpecial && (
              <Badge variant="secondary" className="text-xs">Special</Badge>
            )}
            {item.isPopular && (
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
            )}
            {item.isNew && (
              <Badge variant="outline" className="text-xs">New</Badge>
            )}
          </div>
          <Text className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {item.description}
          </Text>
          <div className="flex items-center gap-3 mt-2">
            {item.dietaryRestrictions && item.dietaryRestrictions.length > 0 && (
              <DietaryIndicators restrictions={item.dietaryRestrictions} />
            )}
            {showSpiceLevel && item.spiceLevel && (
              <SpiceIndicator level={item.spiceLevel} />
            )}
            {showPrepTime && item.prepTime && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {item.prepTime}min
              </div>
            )}
          </div>
        </div>
        <div className="flex-shrink-0">
          <PriceDisplay 
            price={item.price} 
            originalPrice={item.originalPrice}
            currency={currency}
            locale={locale}
          />
        </div>
      </Component>
    );
  }

  return (
    <Card 
      className={cn(
        "group transition-all duration-200",
        onSelect && "cursor-pointer hover:shadow-md"
      )}
      onClick={handleClick}
    >
      {showImage && item.image && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
              {item.isSpecial && (
                <Badge variant="secondary">Special</Badge>
              )}
              {item.isPopular && (
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              )}
              {item.isNew && (
                <Badge variant="outline">New</Badge>
              )}
            </div>
            
            <CardDescription className="text-sm leading-relaxed">
              {item.description}
            </CardDescription>
          </div>
          
          <PriceDisplay 
            price={item.price} 
            originalPrice={item.originalPrice}
            currency={currency}
            locale={locale}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center flex-wrap gap-3">
            {item.dietaryRestrictions && item.dietaryRestrictions.length > 0 && (
              <DietaryIndicators restrictions={item.dietaryRestrictions} />
            )}
            
            {showSpiceLevel && item.spiceLevel && (
              <SpiceIndicator level={item.spiceLevel} />
            )}
            
            {showPrepTime && item.prepTime && (
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                {item.prepTime} min
              </div>
            )}
          </div>

          {item.allergens && item.allergens.length > 0 && (
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <Text className="text-xs text-gray-600 dark:text-gray-400">
                Contains: {item.allergens.join(", ")}
              </Text>
            </div>
          )}

          {showIngredients && item.ingredients && (
            <div>
              <Text className="text-sm font-medium mb-1">Ingredients:</Text>
              <Text className="text-xs text-gray-600 dark:text-gray-400">
                {item.ingredients.join(", ")}
              </Text>
            </div>
          )}

          {showNutrition && item.nutritionalInfo && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              {item.nutritionalInfo.calories && (
                <div>Calories: {item.nutritionalInfo.calories}</div>
              )}
              {item.nutritionalInfo.protein && (
                <div>Protein: {item.nutritionalInfo.protein}</div>
              )}
              {item.nutritionalInfo.carbs && (
                <div>Carbs: {item.nutritionalInfo.carbs}</div>
              )}
              {item.nutritionalInfo.fat && (
                <div>Fat: {item.nutritionalInfo.fat}</div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const CategoryHeader = ({ 
  category, 
  showImage = false 
}: { 
  category: MenuCategory; 
  showImage?: boolean; 
}) => (
  <div className="mb-6">
    {showImage && category.image && (
      <div className="aspect-[3/1] w-full overflow-hidden rounded-lg mb-4">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover"
        />
      </div>
    )}
    <div className="text-center md:text-left">
      <h2 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
        <ChefHat className="h-5 w-5 text-primary" />
        {category.name}
      </h2>
      {category.description && (
        <Text className="text-gray-600 dark:text-gray-400 mb-2">
          {category.description}
        </Text>
      )}
      {category.availableTime && (
        <Badge variant="outline" className="text-xs">
          <Clock className="h-3 w-3 mr-1" />
          {category.availableTime}
        </Badge>
      )}
    </div>
  </div>
);

const RestaurantMenuBlock = React.forwardRef<HTMLDivElement, RestaurantMenuBlockProps>(
  (
    {
      className,
      variant,
      spacing,
      categories,
      layout = "categorized",
      showSearch = true,
      showFilters = true,
      showImages = true,
      showNutrition = false,
      showIngredients = false,
      currency = "$",
      locale = "en-US",
      title = "Our Menu",
      description,
      onItemSelect,
      searchPlaceholder = "Search menu items...",
      showPrepTime = false,
      showSpiceLevel = false,
      compactMode = false,
      maxColumns = 3,
      children,
      ...props
    },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
    const [selectedDietary, setSelectedDietary] = React.useState<DietaryRestriction[]>([]);

    // Get all unique dietary restrictions from all items
    const allDietaryRestrictions = React.useMemo(() => {
      const restrictions = new Set<DietaryRestriction>();
      for (const category of categories) {
        for (const item of category.items) {
          if (item.dietaryRestrictions) for (const restriction of item.dietaryRestrictions) {
            restrictions.add(restriction);
          }
        }
      }
      return [...restrictions];
    }, [categories]);

    // Helper functions for filtering
    const matchesSearchTerm = React.useCallback((item: MenuItem) => {
      if (searchTerm === "") return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        (item.ingredients?.some(ingredient => 
          ingredient.toLowerCase().includes(searchLower)
        ) ?? false)
      );
    }, [searchTerm]);

    const matchesCategoryFilter = React.useCallback((categoryId: string) => {
      return selectedCategory === "all" || categoryId === selectedCategory;
    }, [selectedCategory]);

    const matchesDietaryFilter = React.useCallback((item: MenuItem) => {
      if (selectedDietary.length === 0) return true;
      return selectedDietary.every(dietary => 
        item.dietaryRestrictions?.includes(dietary) ?? false
      );
    }, [selectedDietary]);

    const toggleDietaryRestriction = React.useCallback((restriction: DietaryRestriction) => {
      setSelectedDietary(prev => 
        prev.includes(restriction)
          ? prev.filter(d => d !== restriction)
          : [...prev, restriction]
      );
    }, []);

    // Filter items based on search and filters
    const filteredCategories = React.useMemo(() => {
      return categories.map(category => ({
        ...category,
        items: category.items.filter(item => 
          matchesSearchTerm(item) && 
          matchesCategoryFilter(category.id) && 
          matchesDietaryFilter(item)
        )
      })).filter(category => category.items.length > 0);
    }, [categories, matchesSearchTerm, matchesCategoryFilter, matchesDietaryFilter]);

    const getGridColumns = () => {
      switch (maxColumns) {
        case 2: { return "grid-cols-1 md:grid-cols-2";
        }
        case 3: { return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        }
        case 4: { return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
        }
        default: { return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        }
      }
    };

    const renderSearch = () => (
      <div className="mb-6 w-full flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>
    );

    const renderFilters = () => (
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All Categories
          </Button>
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {allDietaryRestrictions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {allDietaryRestrictions.map(restriction => (
              <Button
                key={restriction}
                variant={selectedDietary.includes(restriction) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleDietaryRestriction(restriction)}
                className="flex items-center gap-1"
              >
                {dietaryIcons[restriction]}
                {dietaryLabels[restriction]}
              </Button>
            ))}
          </div>
        )}
      </div>
    );

    const renderCategorizedLayout = () => (
      <div className={cn(restaurantMenuVariants({ spacing }))}>
        {filteredCategories.map(category => (
          <div key={category.id} className="mb-12 last:mb-0">
            <CategoryHeader category={category} showImage={showImages} />
            <div className={cn("grid gap-6", getGridColumns())}>
              {category.items.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  showImage={showImages}
                  showNutrition={showNutrition}
                  showIngredients={showIngredients}
                  showPrepTime={showPrepTime}
                  showSpiceLevel={showSpiceLevel}
                  currency={currency}
                  locale={locale}
                  onSelect={onItemSelect}
                  compact={compactMode}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );

    const renderSingleColumnLayout = () => (
      <div className={cn(restaurantMenuVariants({ spacing }))}>
        {filteredCategories.map(category => (
          <div key={category.id} className="mb-8 last:mb-0">
            <CategoryHeader category={category} />
            <div className="space-y-4">
              {category.items.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  showImage={false}
                  showNutrition={showNutrition}
                  showIngredients={showIngredients}
                  showPrepTime={showPrepTime}
                  showSpiceLevel={showSpiceLevel}
                  currency={currency}
                  locale={locale}
                  onSelect={onItemSelect}
                  compact={true}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );

    const renderTwoColumnLayout = () => (
      <div className={cn(restaurantMenuVariants({ spacing }))}>
        {filteredCategories.map(category => (
          <div key={category.id} className="mb-10 last:mb-0">
            <CategoryHeader category={category} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
              {category.items.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  showImage={false}
                  showNutrition={showNutrition}
                  showIngredients={showIngredients}
                  showPrepTime={showPrepTime}
                  showSpiceLevel={showSpiceLevel}
                  currency={currency}
                  locale={locale}
                  onSelect={onItemSelect}
                  compact={true}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );

    const renderGridCardsLayout = () => (
      <div className={cn(restaurantMenuVariants({ spacing }))}>
        {filteredCategories.map(category => (
          <div key={category.id} className="mb-12 last:mb-0">
            <CategoryHeader category={category} showImage={showImages} />
            <div className={cn("grid gap-6", getGridColumns())}>
              {category.items.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  showImage={showImages}
                  showNutrition={showNutrition}
                  showIngredients={showIngredients}
                  showPrepTime={showPrepTime}
                  showSpiceLevel={showSpiceLevel}
                  currency={currency}
                  locale={locale}
                  onSelect={onItemSelect}
                  compact={false}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );

    const renderPrixFixeLayout = () => (
      <div className={cn(restaurantMenuVariants({ spacing }))}>
        {filteredCategories.map(category => (
          <Card key={category.id} className="mb-6 last:mb-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-primary" />
                {category.name}
              </CardTitle>
              {category.description && (
                <CardDescription>{category.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium flex items-center gap-2">
                          {item.name}
                          {item.dietaryRestrictions && item.dietaryRestrictions.length > 0 && (
                            <DietaryIndicators restrictions={item.dietaryRestrictions} />
                          )}
                        </h3>
                        <Text className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </Text>
                      </div>
                      <PriceDisplay 
                        price={item.price} 
                        originalPrice={item.originalPrice}
                        currency={currency}
                        locale={locale}
                      />
                    </div>
                    {index < category.items.length - 1 && (
                      <Separator className="mt-3" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );

    const layoutRenderers = {
      categorized: renderCategorizedLayout,
      "single-column": renderSingleColumnLayout,
      "two-column": renderTwoColumnLayout,
      "grid-cards": renderGridCardsLayout,
      "prix-fixe": renderPrixFixeLayout,
    };

    return (
      <div
        ref={ref}
        className={cn(restaurantMenuVariants({ variant }), className)}
        {...props}
      >
        <Container>
          {/* Header */}
          <div className="text-center mb-8 w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 w-full">{title}</h1>
            {description && (
              <Text className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {description}
              </Text>
            )}
          </div>

          {/* Search */}
          {showSearch && renderSearch()}

          {/* Filters */}
          {showFilters && renderFilters()}

          {/* Menu Content */}
          {layoutRenderers[layout]()}

          {/* No results */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <Text className="text-gray-500 dark:text-gray-400">
                No menu items found matching your criteria.
              </Text>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedDietary([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {children}
        </Container>
      </div>
    );
  }
);

RestaurantMenuBlock.displayName = "RestaurantMenuBlock";

export { 
  RestaurantMenuBlock, 
  type RestaurantMenuBlockProps, 
  type MenuItem, 
  type MenuCategory,
  type DietaryRestriction,
  type Allergen,
  type NutritionalInfo
};