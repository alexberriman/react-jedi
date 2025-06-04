import { Link } from "react-router-dom";
import { useState } from "react";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import { PageHeader } from "../../../../components/ui/page-header";
import { CodeBlock } from "../../../../components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

export function RestaurantMenuShowcasePage() {
  usePageMetadata({
    title: "Restaurant Menu Block",
    description: "Comprehensive restaurant menu component with categories, dietary restrictions, search, and multiple layout variants",
  });

  const [activeExample, setActiveExample] = useState("categorized");

  const sampleMenuData = [
    {
      id: "appetizers",
      name: "Appetizers",
      description: "Start your meal with our delicious appetizers and small plates",
      availableTime: "All Day",
      items: [
        {
          id: "truffle-fries",
          name: "Truffle Parmesan Fries",
          description: "Crispy hand-cut fries tossed with truffle oil, fresh herbs, and aged parmesan cheese",
          price: 14.5,
          category: "appetizers",
          image: "https://picsum.photos/400/300?random=1",
          dietaryRestrictions: ["vegetarian"],
          isPopular: true,
          prepTime: 12,
          ingredients: ["Potatoes", "Truffle Oil", "Parmesan", "Fresh Herbs"],
          nutritionalInfo: {
            calories: 380,
            protein: "8g",
            carbs: "45g",
            fat: "18g",
          },
        },
        {
          id: "caesar-salad",
          name: "Classic Caesar Salad",
          description: "Crisp romaine lettuce, house-made croutons, and fresh parmesan with our signature Caesar dressing",
          price: 12,
          category: "appetizers",
          image: "https://picsum.photos/400/300?random=2",
          dietaryRestrictions: ["vegetarian"],
          allergens: ["dairy", "eggs"],
          prepTime: 8,
          ingredients: ["Romaine Lettuce", "Parmesan", "Croutons", "Caesar Dressing"],
          nutritionalInfo: {
            calories: 220,
            protein: "12g",
            carbs: "15g",
            fat: "14g",
          },
        },
        {
          id: "buffalo-cauliflower",
          name: "Buffalo Cauliflower Bites",
          description: "Crispy battered cauliflower tossed in spicy buffalo sauce, served with vegan ranch",
          price: 11,
          category: "appetizers",
          image: "https://picsum.photos/400/300?random=3",
          dietaryRestrictions: ["vegan", "dairy-free"],
          isNew: true,
          spiceLevel: 3,
          prepTime: 15,
          ingredients: ["Cauliflower", "Buffalo Sauce", "Vegan Ranch", "Celery"],
          nutritionalInfo: {
            calories: 180,
            protein: "6g",
            carbs: "22g",
            fat: "8g",
          },
        },
      ],
    },
    {
      id: "mains",
      name: "Main Courses",
      description: "Hearty and satisfying main dishes made with the finest ingredients",
      availableTime: "All Day",
      items: [
        {
          id: "grilled-salmon",
          name: "Herb-Crusted Salmon",
          description: "Fresh Atlantic salmon with herb crust, served with roasted vegetables and lemon butter sauce",
          price: 28,
          category: "mains",
          image: "https://picsum.photos/400/300?random=4",
          dietaryRestrictions: ["gluten-free", "keto"],
          allergens: ["fish", "dairy"],
          isSpecial: true,
          prepTime: 20,
          ingredients: ["Salmon", "Fresh Herbs", "Seasonal Vegetables", "Lemon Butter"],
          nutritionalInfo: {
            calories: 420,
            protein: "35g",
            carbs: "8g",
            fat: "28g",
          },
        },
        {
          id: "wagyu-burger",
          name: "Wagyu Beef Burger",
          description: "Premium wagyu beef patty with aged cheddar, caramelized onions, truffle aioli on brioche bun",
          price: 32,
          originalPrice: 36,
          category: "mains",
          image: "https://picsum.photos/400/300?random=5",
          allergens: ["dairy", "gluten", "eggs"],
          isPopular: true,
          prepTime: 18,
          ingredients: ["Wagyu Beef", "Aged Cheddar", "Truffle Aioli", "Brioche Bun"],
          nutritionalInfo: {
            calories: 680,
            protein: "42g",
            carbs: "38g",
            fat: "42g",
          },
        },
        {
          id: "thai-curry",
          name: "Thai Green Curry",
          description: "Coconut milk-based curry with vegetables, fresh basil, and your choice of protein",
          price: 22,
          category: "mains",
          image: "https://picsum.photos/400/300?random=7",
          dietaryRestrictions: ["vegan", "dairy-free", "gluten-free"],
          spiceLevel: 4,
          prepTime: 16,
          ingredients: ["Coconut Milk", "Green Curry Paste", "Mixed Vegetables", "Thai Basil"],
          nutritionalInfo: {
            calories: 320,
            protein: "12g",
            carbs: "28g",
            fat: "20g",
          },
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      description: "Sweet endings to complete your dining experience",
      availableTime: "All Day",
      items: [
        {
          id: "chocolate-lava",
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with molten center, served with vanilla ice cream and berry compote",
          price: 12,
          category: "desserts",
          image: "https://picsum.photos/400/300?random=8",
          dietaryRestrictions: ["vegetarian"],
          allergens: ["dairy", "eggs", "gluten"],
          isPopular: true,
          prepTime: 14,
          ingredients: ["Dark Chocolate", "Vanilla Ice Cream", "Mixed Berries", "Butter"],
          nutritionalInfo: {
            calories: 480,
            protein: "8g",
            carbs: "58g",
            fat: "24g",
          },
        },
      ],
    },
  ];

  const examples: Record<string, { spec: ComponentSpec; title: string; description: string }> = {
    categorized: {
      title: "Categorized Layout",
      description: "Grid layout organized by menu categories with full features",
      spec: {
        type: "RestaurantMenuBlock",
        props: {
          categories: sampleMenuData,
          layout: "categorized",
          showSearch: true,
          showFilters: true,
          showImages: true,
          showNutrition: true,
          showPrepTime: true,
          showSpiceLevel: true,
          title: "Our Restaurant Menu",
          description: "Discover our carefully crafted dishes made with the finest ingredients",
          maxColumns: 3,
        },
      },
    },
    singleColumn: {
      title: "Single Column",
      description: "Compact single-column layout perfect for mobile or sidebar menus",
      spec: {
        type: "RestaurantMenuBlock",
        props: {
          categories: sampleMenuData,
          layout: "single-column",
          showSearch: true,
          showFilters: false,
          showImages: false,
          compactMode: true,
          title: "Quick Menu",
          showPrepTime: true,
        },
      },
    },
    twoColumn: {
      title: "Two Column",
      description: "Two-column layout for balanced content display",
      spec: {
        type: "RestaurantMenuBlock",
        props: {
          categories: sampleMenuData,
          layout: "two-column",
          showSearch: false,
          showFilters: false,
          showImages: false,
          compactMode: true,
          title: "Restaurant Menu",
          showSpiceLevel: true,
        },
      },
    },
    gridCards: {
      title: "Grid Cards",
      description: "Card-based grid layout with rich visual presentation",
      spec: {
        type: "RestaurantMenuBlock",
        props: {
          categories: sampleMenuData,
          layout: "grid-cards",
          showSearch: true,
          showFilters: true,
          showImages: true,
          showNutrition: true,
          showIngredients: true,
          showPrepTime: true,
          showSpiceLevel: true,
          maxColumns: 2,
          title: "Gourmet Collection",
          description: "Explore our artisanal dishes with detailed information",
        },
      },
    },
    prixFixe: {
      title: "Prix Fixe",
      description: "Elegant fixed-price menu layout with simplified presentation",
      spec: {
        type: "RestaurantMenuBlock",
        props: {
          categories: sampleMenuData,
          layout: "prix-fixe",
          showSearch: false,
          showFilters: false,
          showImages: false,
          title: "Prix Fixe Menu",
          description: "Three-course dining experience",
        },
      },
    },
    veganTheme: {
      title: "Vegan Restaurant",
      description: "Specialized menu for plant-based cuisine with dietary focus",
      spec: {
        type: "RestaurantMenuBlock",
        props: {
          categories: [
            {
              id: "vegan-mains",
              name: "Plant-Based Mains",
              description: "Delicious vegan dishes bursting with flavor",
              items: [
                {
                  id: "quinoa-bowl",
                  name: "Rainbow Quinoa Bowl",
                  description: "Nutrient-packed quinoa with roasted vegetables, avocado, and tahini dressing",
                  price: 16,
                  category: "vegan-mains",
                  image: "https://picsum.photos/400/300?random=11",
                  dietaryRestrictions: ["vegan", "gluten-free", "organic"],
                  prepTime: 12,
                  nutritionalInfo: {
                    calories: 420,
                    protein: "18g",
                    carbs: "52g",
                    fat: "16g",
                  },
                },
                {
                  id: "jackfruit-tacos",
                  name: "BBQ Jackfruit Tacos",
                  description: "Smoky jackfruit with tangy slaw and avocado crema on corn tortillas",
                  price: 14,
                  category: "vegan-mains",
                  image: "https://picsum.photos/400/300?random=3",
                  dietaryRestrictions: ["vegan", "gluten-free"],
                  spiceLevel: 2,
                  prepTime: 10,
                  nutritionalInfo: {
                    calories: 380,
                    protein: "12g",
                    carbs: "58g",
                    fat: "14g",
                  },
                },
              ],
            },
          ],
          layout: "grid-cards",
          variant: "light",
          showSearch: true,
          showFilters: true,
          showImages: true,
          showNutrition: true,
          showSpiceLevel: true,
          title: "Green Garden Café",
          description: "100% plant-based, locally sourced, organic cuisine",
        },
      },
    },
    darkTheme: {
      title: "Dark Theme",
      description: "Elegant dark theme perfect for upscale dining experiences",
      spec: {
        type: "RestaurantMenuBlock",
        props: {
          categories: sampleMenuData.slice(0, 2), // Just appetizers and mains
          variant: "dark",
          layout: "grid-cards",
          showSearch: true,
          showFilters: true,
          showImages: true,
          maxColumns: 2,
          title: "Evening Menu",
          description: "Savor the night with our carefully selected dishes",
        },
      },
    },
    elegant: {
      title: "Elegant Theme",
      description: "Sophisticated elegant theme with warm tones",
      spec: {
        type: "RestaurantMenuBlock",
        props: {
          categories: sampleMenuData,
          variant: "elegant",
          layout: "categorized",
          showSearch: true,
          showFilters: true,
          showImages: true,
          showNutrition: true,
          showPrepTime: true,
          showSpiceLevel: true,
          title: "Fine Dining Menu",
          description: "An exquisite culinary journey awaits",
        },
      },
    },
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <nav className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <Link to="/showcase" className="hover:text-gray-900 dark:hover:text-gray-200">
            Showcase
          </Link>
          <span className="mx-2">/</span>
          <Link to="/showcase/blocks" className="hover:text-gray-900 dark:hover:text-gray-200">
            Blocks
          </Link>
          <span className="mx-2">/</span>
          <span>Restaurant Menu</span>
        </nav>

        <PageHeader 
          title="Restaurant Menu Block"
          description="A comprehensive restaurant menu component with multiple layout options, search functionality, dietary filters, and rich content display features"
        />
      </div>

      <Tabs value={activeExample} onValueChange={setActiveExample} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="categorized">Categorized</TabsTrigger>
          <TabsTrigger value="singleColumn">Single</TabsTrigger>
          <TabsTrigger value="twoColumn">Two Col</TabsTrigger>
          <TabsTrigger value="gridCards">Grid</TabsTrigger>
          <TabsTrigger value="prixFixe">Prix Fixe</TabsTrigger>
          <TabsTrigger value="veganTheme">Vegan</TabsTrigger>
          <TabsTrigger value="darkTheme">Dark</TabsTrigger>
          <TabsTrigger value="elegant">Elegant</TabsTrigger>
        </TabsList>

        {Object.entries(examples).map(([key, example]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{example.description}</p>
            </div>

            <ShowcaseWrapper>
              {render(example.spec)}
            </ShowcaseWrapper>

            <div className="space-y-4">
              <h4 className="text-md font-medium">Component Specification</h4>
              <CodeBlock language="json" code={JSON.stringify(example.spec, null, 2)} />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Layout Variants</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Categorized - Organized by menu sections</li>
                <li>• Single Column - Compact vertical layout</li>
                <li>• Two Column - Balanced side-by-side</li>
                <li>• Grid Cards - Visual card-based display</li>
                <li>• Prix Fixe - Elegant fixed-price format</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Interactive Features</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Search menu items and ingredients</li>
                <li>• Filter by category and dietary restrictions</li>
                <li>• Dietary indicators (vegan, gluten-free, etc.)</li>
                <li>• Spice level indicators</li>
                <li>• Preparation time display</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Content Display</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Item images with lazy loading</li>
                <li>• Nutritional information</li>
                <li>• Ingredient lists</li>
                <li>• Allergen warnings</li>
                <li>• Special item badges (Popular, New, Special)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Customization</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Multiple visual themes</li>
                <li>• Responsive grid columns</li>
                <li>• Compact vs full display modes</li>
                <li>• Currency and locale formatting</li>
                <li>• Custom spacing options</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2">Restaurant Websites</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete menu displays for restaurants, cafes, and food service businesses with categories and pricing.
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2">Food Delivery Apps</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mobile-optimized menu layouts with search, filters, and detailed item information for ordering platforms.
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2">Event Catering</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prix fixe and themed menus for special events, with dietary restriction information and elegant presentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}