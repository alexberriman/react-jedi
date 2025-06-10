import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";
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
        description:
          "Crispy hand-cut fries tossed with truffle oil, fresh herbs, and aged parmesan cheese",
        price: 14.5,
        category: "appetizers",
        image: "https://placehold.co/400x300/EEE/31343C?random=1",
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
        description:
          "Crisp romaine lettuce, house-made croutons, and fresh parmesan with our signature Caesar dressing",
        price: 12,
        category: "appetizers",
        image: "https://placehold.co/400x300/EEE/31343C?random=2",
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
        description:
          "Crispy battered cauliflower tossed in spicy buffalo sauce, served with vegan ranch",
        price: 11,
        category: "appetizers",
        image: "https://placehold.co/400x300/EEE/31343C?random=3",
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
        description:
          "Fresh Atlantic salmon with herb crust, served with roasted vegetables and lemon butter sauce",
        price: 28,
        category: "mains",
        image: "https://placehold.co/400x300/EEE/31343C?random=4",
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
        description:
          "Premium wagyu beef patty with aged cheddar, caramelized onions, truffle aioli on brioche bun",
        price: 32,
        originalPrice: 36,
        category: "mains",
        image: "https://placehold.co/400x300/EEE/31343C?random=5",
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
        description:
          "Creamy arborio rice with mixed wild mushrooms, fresh herbs, and aged parmesan",
        price: 24,
        category: "mains",
        image: "https://placehold.co/400x300/EEE/31343C?random=6",
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
        description:
          "Coconut milk-based curry with vegetables, fresh basil, and your choice of protein",
        price: 22,
        category: "mains",
        image: "https://placehold.co/400x300/EEE/31343C?random=7",
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
        description:
          "Warm chocolate cake with molten center, served with vanilla ice cream and berry compote",
        price: 12,
        category: "desserts",
        image: "https://placehold.co/400x300/EEE/31343C?random=8",
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
        description:
          "Traditional Italian dessert with espresso-soaked ladyfingers and mascarpone cream",
        price: 10,
        category: "desserts",
        image: "https://placehold.co/400x300/EEE/31343C?random=9",
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
        image: "https://placehold.co/400x300/EEE/31343C?random=10",
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
        description:
          "Premium bourbon with house-made simple syrup, orange bitters, and fresh orange peel",
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

export const Default: Story = enhanceStoryForDualMode({
  args: {
    categories: sampleMenuData,
    layout: "categorized",
    showSearch: true,
    showFilters: true,
    showImages: true,
    title: "Our Restaurant Menu",
    description: "Discover our carefully crafted dishes made with the finest ingredients",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title renders
    const title = canvas.getByRole("heading", { name: "Our Restaurant Menu" });
    expect(title).toBeInTheDocument();
    
    // Verify description renders
    const description = canvas.getByText("Discover our carefully crafted dishes made with the finest ingredients");
    expect(description).toBeInTheDocument();
    
    // Verify search input is present
    const searchInput = canvas.getByPlaceholderText("Search menu items...");
    expect(searchInput).toBeInTheDocument();
    
    // Verify menu categories render
    // Check that category sections are rendered
    // Look for the h2 element specifically, not the filter button
    const appetizersSection = within(canvasElement).getAllByText("Appetizers").find(
      el => el.tagName === "H2"
    );
    expect(appetizersSection).toBeInTheDocument();
    
    const mainCoursesSection = within(canvasElement).getAllByText("Main Courses").find(
      el => el.tagName === "H2"
    );
    expect(mainCoursesSection).toBeInTheDocument();
    
    // Verify specific menu items render
    const truffleFries = canvas.getByText("Truffle Parmesan Fries");
    expect(truffleFries).toBeInTheDocument();
    
    const wagyuBurger = canvas.getByText("Wagyu Beef Burger");
    expect(wagyuBurger).toBeInTheDocument();
    
    // Verify prices are displayed
    const friesPrice = canvas.getByText("$14.50");
    expect(friesPrice).toBeInTheDocument();
    
    // Test search functionality
    await userEvent.type(searchInput, "salmon");
    const salmonDish = canvas.getByText("Herb-Crusted Salmon");
    expect(salmonDish).toBeInTheDocument();
  },
}) as Story;

export const SingleColumn: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title renders
    const title = canvas.getByRole("heading", { name: "Menu" });
    expect(title).toBeInTheDocument();
    
    // Verify compact mode layout
    const menuItems = canvas.getAllByText(/Truffle Parmesan Fries|Caesar Salad|Buffalo Cauliflower/);
    expect(menuItems.length).toBeGreaterThan(0);
    
    // Verify no images in single column compact mode
    const images = canvas.queryAllByRole("img");
    expect(images.length).toBe(0);
    
    // Verify filter buttons
    const allCategoriesButton = canvas.getByRole("button", { name: "All Categories" });
    expect(allCategoriesButton).toBeInTheDocument();
  },
}) as Story;

export const TwoColumn: Story = enhanceStoryForDualMode({
  args: {
    categories: sampleMenuData,
    layout: "two-column",
    showSearch: false,
    showFilters: false,
    showImages: false,
    compactMode: true,
    title: "Restaurant Menu",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title renders
    const title = canvas.getByRole("heading", { name: "Restaurant Menu" });
    expect(title).toBeInTheDocument();
    
    // Verify menu items render in two-column layout
    const menuItems = canvas.getAllByText(/Truffle Parmesan Fries|Wagyu Beef Burger/);
    expect(menuItems.length).toBeGreaterThan(0);
    
    // Verify no search (showSearch: false)
    const searchInput = canvas.queryByPlaceholderText("Search menu items...");
    expect(searchInput).not.toBeInTheDocument();
    
    // Verify no filter buttons (showFilters: false)
    const filterButton = canvas.queryByRole("button", { name: "All Categories" });
    expect(filterButton).not.toBeInTheDocument();
  },
}) as Story;

export const GridCards: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title renders
    const title = canvas.getByRole("heading", { name: "Gourmet Menu" });
    expect(title).toBeInTheDocument();
    
    // Verify nutrition info is shown
    const caloriesTexts = canvas.getAllByText(/Calories: 380/);
    expect(caloriesTexts.length).toBeGreaterThan(0);
    
    // Verify ingredients are shown
    const ingredientsTexts = canvas.getAllByText(/Ingredients:/);
    expect(ingredientsTexts.length).toBeGreaterThan(0);
    
    // Verify prep time is shown (check for any prep time with "min")
    const prepTimeTexts = canvas.getAllByText((content, element) => {
      return element?.textContent?.match(/^\d{1,2} min$/) !== null;
    });
    expect(prepTimeTexts.length).toBeGreaterThan(0);
    
    // Verify spice level indicators for spicy items
    const spiceIndicators = canvas.getAllByTitle(/Spice level:/);
    expect(spiceIndicators.length).toBeGreaterThan(0);
  },
}) as Story;

export const PrixFixe: Story = enhanceStoryForDualMode({
  args: {
    categories: sampleMenuData,
    layout: "prix-fixe",
    showSearch: false,
    showFilters: false,
    showImages: false,
    title: "Prix Fixe Menu",
    description: "Three-course dining experience",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title renders
    const title = canvas.getByRole("heading", { name: "Prix Fixe Menu" });
    expect(title).toBeInTheDocument();
    
    // Verify description renders
    const description = canvas.getByText("Three-course dining experience");
    expect(description).toBeInTheDocument();
    
    // Verify prix-fixe layout shows category cards
    const categoryCards = canvas.getAllByText(/Appetizers|Main Courses|Desserts/);
    expect(categoryCards.length).toBeGreaterThan(0);
    
    // Verify menu items are in card format
    const menuItemPrices = canvas.getAllByText(/\$\d+\.\d{2}/);
    expect(menuItemPrices.length).toBeGreaterThan(0);
  },
}) as Story;

export const ElegantTheme: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title renders
    const title = canvas.getByRole("heading", { name: "Fine Dining Menu" });
    expect(title).toBeInTheDocument();
    
    // Verify elegant theme description
    const description = canvas.getByText("An exquisite culinary journey awaits");
    expect(description).toBeInTheDocument();
    
    // Verify special menu items are marked
    const specialBadge = canvas.getByText("Special");
    expect(specialBadge).toBeInTheDocument();
    
    // Verify popular items have star indicators (look for the star svg)
    const popularItems = canvasElement.querySelectorAll("svg.lucide-star");
    expect(popularItems.length).toBeGreaterThan(0);
  },
}) as Story;

export const DarkTheme: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title renders
    const title = canvas.getByRole("heading", { name: "Evening Menu" });
    expect(title).toBeInTheDocument();
    
    // Verify dark theme description
    const description = canvas.getByText("Savor the night with our carefully selected dishes");
    expect(description).toBeInTheDocument();
    
    // Verify images are shown in grid layout
    const images = canvas.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    
    // Verify filter functionality
    const dietaryButtons = canvas.getAllByRole("button", { name: /Vegan|Vegetarian|Gluten Free/ });
    expect(dietaryButtons.length).toBeGreaterThan(0);
  },
}) as Story;

export const MinimalTheme: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title renders
    const title = canvas.getByRole("heading", { name: "Simple Menu" });
    expect(title).toBeInTheDocument();
    
    // Verify minimal layout - no search
    const searchInput = canvas.queryByPlaceholderText("Search menu items...");
    expect(searchInput).not.toBeInTheDocument();
    
    // Verify minimal layout - no filters
    const filterButtons = canvas.queryByRole("button", { name: "All Categories" });
    expect(filterButtons).not.toBeInTheDocument();
    
    // Verify minimal layout - no images
    const images = canvas.queryAllByRole("img");
    expect(images.length).toBe(0);
    
    // Verify menu items still render
    const menuItems = canvas.getAllByText(/Truffle Parmesan Fries|Wagyu Beef Burger/);
    expect(menuItems.length).toBeGreaterThan(0);
  },
}) as Story;

export const CompactWithAllFeatures: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title renders
    const title = canvas.getByRole("heading", { name: "Complete Menu Experience" });
    expect(title).toBeInTheDocument();
    
    // Verify all features are enabled
    const searchInput = canvas.getByPlaceholderText("Search menu items...");
    expect(searchInput).toBeInTheDocument();
    
    // Verify nutrition info
    const nutritionInfo = canvas.getAllByText(/Calories: 380/);
    expect(nutritionInfo.length).toBeGreaterThan(0);
    
    // Verify ingredients
    const ingredients = canvas.getAllByText(/Ingredients:/);
    expect(ingredients.length).toBeGreaterThan(0);
    
    // Verify prep time
    const prepTimes = canvas.getAllByText(/12 min/);
    expect(prepTimes.length).toBeGreaterThan(0);
    
    // Verify allergen information
    const allergenInfo = canvas.getAllByText(/Contains:/);
    expect(allergenInfo.length).toBeGreaterThan(0);
  },
}) as Story;

export const VeganRestaurant: Story = enhanceStoryForDualMode({
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
            description:
              "Nutrient-packed quinoa with roasted vegetables, avocado, and tahini dressing",
            price: 16,
            category: "vegan-mains",
            image: "https://placehold.co/400x300/EEE/31343C?random=11",
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
            image: "https://placehold.co/400x300/EEE/31343C?random=3",
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title renders
    const title = canvas.getByRole("heading", { name: "Green Garden Café" });
    expect(title).toBeInTheDocument();
    
    // Verify vegan-specific description
    const description = canvas.getByText("100% plant-based, locally sourced, organic cuisine");
    expect(description).toBeInTheDocument();
    
    // Verify vegan menu items
    const quinoaBowl = canvas.getByText("Rainbow Quinoa Bowl");
    expect(quinoaBowl).toBeInTheDocument();
    
    const jackfruitTacos = canvas.getByText("BBQ Jackfruit Tacos");
    expect(jackfruitTacos).toBeInTheDocument();
    
    // Verify dietary restriction indicators for vegan items
    const veganIndicators = canvas.getAllByTitle("Vegan");
    expect(veganIndicators.length).toBeGreaterThan(0);
    
    // Verify spice level for jackfruit tacos
    const spiceLevel = canvas.getByTitle("Spice level: 2/5");
    expect(spiceLevel).toBeInTheDocument();
    
    // Verify nutrition info is displayed
    const nutritionCalories = canvas.getByText(/Calories: 420/);
    expect(nutritionCalories).toBeInTheDocument();
  },
}) as Story;
