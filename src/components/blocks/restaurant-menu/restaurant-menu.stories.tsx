import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantMenuBlock, type MenuCategory } from "./restaurant-menu";

const meta = {
  title: "Blocks/RestaurantMenuBlock",
  component: RestaurantMenuBlock,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "light", "dark", "elegant", "minimal"],
    },
    spacing: {
      control: "select", 
      options: ["tight", "normal", "relaxed"],
    },
    layout: {
      control: "select",
      options: ["categorized", "single-column", "two-column", "grid-cards", "prix-fixe"],
    },
    maxColumns: {
      control: "select",
      options: [2, 3, 4],
    },
  },
} satisfies Meta<typeof RestaurantMenuBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMenuData: MenuCategory[] = [
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
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
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
        id: "mushroom-risotto",
        name: "Wild Mushroom Risotto",
        description: "Creamy arborio rice with mixed wild mushrooms, fresh herbs, and aged parmesan",
        price: 24,
        category: "mains",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
        dietaryRestrictions: ["vegetarian", "gluten-free"],
        allergens: ["dairy"],
        prepTime: 25,
        ingredients: ["Arborio Rice", "Wild Mushrooms", "Parmesan", "White Wine"],
        nutritionalInfo: {
          calories: 450,
          protein: "18g",
          carbs: "52g",
          fat: "18g",
        },
      },
      {
        id: "thai-curry",
        name: "Thai Green Curry",
        description: "Coconut milk-based curry with vegetables, fresh basil, and your choice of protein",
        price: 22,
        category: "mains",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
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
      {
        id: "tiramisu",
        name: "Classic Tiramisu",
        description: "Traditional Italian dessert with espresso-soaked ladyfingers and mascarpone cream",
        price: 10,
        category: "desserts",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
        dietaryRestrictions: ["vegetarian"],
        allergens: ["dairy", "eggs", "gluten"],
        prepTime: 5,
        ingredients: ["Mascarpone", "Espresso", "Ladyfingers", "Cocoa Powder"],
        nutritionalInfo: {
          calories: 380,
          protein: "6g",
          carbs: "32g",
          fat: "24g",
        },
      },
      {
        id: "vegan-cheesecake",
        name: "Vegan Raspberry Cheesecake",
        description: "Creamy cashew-based cheesecake with fresh raspberry topping and almond crust",
        price: 11,
        category: "desserts",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
        dietaryRestrictions: ["vegan", "dairy-free"],
        allergens: ["nuts"],
        isNew: true,
        prepTime: 8,
        ingredients: ["Cashews", "Fresh Raspberries", "Almond Flour", "Coconut Oil"],
        nutritionalInfo: {
          calories: 320,
          protein: "8g",
          carbs: "28g",
          fat: "20g",
        },
      },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Refreshing drinks to complement your meal",
    availableTime: "All Day",
    items: [
      {
        id: "craft-cocktail",
        name: "Signature Old Fashioned",
        description: "Premium bourbon with house-made simple syrup, orange bitters, and fresh orange peel",
        price: 16,
        category: "beverages",
        prepTime: 5,
        ingredients: ["Bourbon", "Simple Syrup", "Orange Bitters", "Orange Peel"],
      },
      {
        id: "kombucha",
        name: "House Kombucha",
        description: "Locally brewed probiotic kombucha with seasonal fruit flavors",
        price: 6,
        category: "beverages",
        dietaryRestrictions: ["vegan", "organic"],
        prepTime: 2,
        ingredients: ["Fermented Tea", "Seasonal Fruits", "Live Cultures"],
      },
      {
        id: "cold-brew",
        name: "Nitro Cold Brew",
        description: "Smooth, creamy cold brew coffee infused with nitrogen for extra richness",
        price: 5,
        category: "beverages",
        dietaryRestrictions: ["vegan"],
        prepTime: 3,
        ingredients: ["Cold Brew Coffee", "Nitrogen"],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    categories: sampleMenuData,
    layout: "categorized",
    showSearch: true,
    showFilters: true,
    showImages: true,
    title: "Our Restaurant Menu",
    description: "Discover our carefully crafted dishes made with the finest ingredients",
  },
};

export const SingleColumn: Story = {
  args: {
    categories: sampleMenuData,
    layout: "single-column",
    showSearch: true,
    showFilters: true,
    showImages: false,
    compactMode: true,
    title: "Menu",
    description: "Browse our delicious offerings",
  },
};

export const TwoColumn: Story = {
  args: {
    categories: sampleMenuData,
    layout: "two-column",
    showSearch: false,
    showFilters: false,
    showImages: false,
    compactMode: true,
    title: "Restaurant Menu",
  },
};

export const GridCards: Story = {
  args: {
    categories: sampleMenuData,
    layout: "grid-cards",
    showSearch: true,
    showFilters: true,
    showImages: true,
    showNutrition: true,
    showIngredients: true,
    showPrepTime: true,
    showSpiceLevel: true,
    maxColumns: 3,
    title: "Gourmet Menu",
    description: "Explore our collection of artisanal dishes",
  },
};

export const PrixFixe: Story = {
  args: {
    categories: sampleMenuData,
    layout: "prix-fixe",
    showSearch: false,
    showFilters: false,
    showImages: false,
    title: "Prix Fixe Menu",
    description: "Three-course dining experience",
  },
};

export const ElegantTheme: Story = {
  args: {
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
};

export const DarkTheme: Story = {
  args: {
    categories: sampleMenuData,
    variant: "dark",
    layout: "grid-cards",
    showSearch: true,
    showFilters: true,
    showImages: true,
    maxColumns: 2,
    title: "Evening Menu",
    description: "Savor the night with our carefully selected dishes",
  },
};

export const MinimalTheme: Story = {
  args: {
    categories: sampleMenuData,
    variant: "minimal",
    layout: "single-column",
    showSearch: false,
    showFilters: false,
    showImages: false,
    compactMode: true,
    title: "Simple Menu",
  },
};

export const CompactWithAllFeatures: Story = {
  args: {
    categories: sampleMenuData,
    layout: "categorized",
    showSearch: true,
    showFilters: true,
    showImages: true,
    showNutrition: true,
    showIngredients: true,
    showPrepTime: true,
    showSpiceLevel: true,
    compactMode: false,
    maxColumns: 3,
    spacing: "relaxed",
    title: "Complete Menu Experience",
    description: "Full-featured menu with all information displayed",
  },
};

export const VeganRestaurant: Story = {
  args: {
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
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
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
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
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
};