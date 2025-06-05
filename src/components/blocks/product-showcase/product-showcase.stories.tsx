import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductShowcase, type Product } from "./product-showcase";

const meta = {
  title: "Blocks/ProductShowcase",
  component: ProductShowcase,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A versatile product showcase component for e-commerce displays with multiple layout variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["grid", "list", "featured", "comparison", "category"],
      description: "The display variant of the product showcase",
    },
    columns: {
      control: "select",
      options: [2, 3, 4],
      description: "Number of columns for grid layout",
    },
    animated: {
      control: "boolean",
      description: "Enable/disable animations",
    },
    showWishlist: {
      control: "boolean",
      description: "Show wishlist functionality",
    },
    showQuickAdd: {
      control: "boolean",
      description: "Show quick add to cart",
    },
    showFilters: {
      control: "boolean",
      description: "Show category filters",
    },
    showRatings: {
      control: "boolean",
      description: "Show product ratings",
    },
  },
} satisfies Meta<typeof ProductShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones Pro",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    price: 299.99,
    salePrice: 249.99,
    currency: "$",
    image: "https://picsum.photos/800/800?random=1",
    category: "Audio",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockCount: 15,
    badge: "Best Seller",
    badgeVariant: "default" as const,
    variants: {
      color: [
        { id: "black", name: "Black", value: "black", available: true },
        { id: "white", name: "White", value: "white", available: true },
        { id: "blue", name: "Navy Blue", value: "blue", available: false },
      ],
    },
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium comfort fit",
      "Multi-device connectivity",
    ],
    specifications: {
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
      Bluetooth: "5.0",
    },
  },
  {
    id: "2",
    name: "Smart Watch Ultra",
    description: "Advanced fitness tracking with GPS and heart rate monitoring",
    price: 399.99,
    image: "https://picsum.photos/800/800?random=2",
    category: "Wearables",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    badge: "New",
    badgeVariant: "secondary" as const,
    variants: {
      size: [
        { id: "small", name: "40mm", value: "40mm", available: true },
        { id: "large", name: "44mm", value: "44mm", available: true },
      ],
      band: [
        { id: "sport", name: "Sport Band", value: "sport", available: true },
        {
          id: "leather",
          name: "Leather Band",
          value: "leather",
          available: true,
          priceModifier: 50,
        },
      ],
    },
    features: ["GPS tracking", "Heart rate monitor", "Water resistant", "7-day battery life"],
    specifications: {
      Display: 'AMOLED 1.9"',
      "Battery Life": "7 days",
      "Water Resistance": "5ATM",
      Sensors: "Heart rate, GPS, Accelerometer",
    },
  },
  {
    id: "3",
    name: "Portable Speaker Max",
    description: "360° immersive sound with powerful bass and 20-hour playtime",
    price: 149.99,
    image: "https://picsum.photos/800/800?random=3",
    category: "Audio",
    rating: 4.3,
    reviewCount: 256,
    inStock: false,
    badge: "Limited Edition",
    badgeVariant: "outline" as const,
    variants: {
      color: [
        { id: "black", name: "Midnight Black", value: "black", available: false },
        { id: "red", name: "Ruby Red", value: "red", available: false },
      ],
    },
    features: ["360° sound", "20-hour battery", "IPX7 waterproof", "Dual pairing"],
    specifications: {
      Power: "30W",
      Battery: "20 hours",
      Connectivity: "Bluetooth 5.3",
      Weight: "750g",
    },
  },
  {
    id: "4",
    name: "Wireless Earbuds Pro",
    description: "True wireless earbuds with active noise cancellation",
    price: 199.99,
    salePrice: 159.99,
    image: "https://picsum.photos/800/800?random=4",
    category: "Audio",
    rating: 4.6,
    reviewCount: 342,
    inStock: true,
    variants: {
      color: [
        { id: "black", name: "Black", value: "black", available: true },
        { id: "white", name: "White", value: "white", available: true },
      ],
    },
    features: [
      "Active noise cancellation",
      "6-hour battery life",
      "Wireless charging case",
      "IPX4 water resistant",
    ],
    specifications: {
      "Battery (Earbuds)": "6 hours",
      "Battery (Case)": "24 hours",
      Charging: "USB-C, Wireless",
      ANC: "Yes",
    },
  },
  {
    id: "5",
    name: "4K Webcam Pro",
    description: "Professional 4K webcam with auto-framing and low-light correction",
    price: 249.99,
    image: "https://picsum.photos/800/800?random=5",
    category: "Accessories",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    badge: "Pro",
    features: ["4K resolution", "Auto-framing", "Low-light correction", "Dual microphones"],
    specifications: {
      Resolution: "4K 30fps",
      "Field of View": "90°",
      Focus: "Auto-focus",
      Compatibility: "Windows, Mac, Linux",
    },
  },
  {
    id: "6",
    name: "Fitness Tracker Band",
    description: "Slim fitness band with sleep tracking and smartphone notifications",
    price: 79.99,
    salePrice: 59.99,
    image: "https://picsum.photos/800/800?random=6",
    category: "Wearables",
    rating: 4.1,
    reviewCount: 523,
    inStock: true,
    badge: "Sale",
    badgeVariant: "destructive" as const,
    variants: {
      size: [
        { id: "small", name: 'Small (5.5"-7.1")', value: "small", available: true },
        { id: "large", name: 'Large (6.7"-8.5")', value: "large", available: true },
      ],
      color: [
        { id: "black", name: "Black", value: "black", available: true },
        { id: "pink", name: "Pink", value: "pink", available: true },
        { id: "blue", name: "Blue", value: "blue", available: true },
      ],
    },
    features: ["Sleep tracking", "Heart rate monitor", "10-day battery", "Water resistant"],
    specifications: {
      Display: 'OLED 0.96"',
      Battery: "10 days",
      "Water Resistance": "IP68",
      Connectivity: "Bluetooth 5.0",
    },
  },
];

export const GridView: Story = {
  args: {
    variant: "grid",
    products: sampleProducts,
    columns: 3,
    animated: true,
    showWishlist: true,
    showQuickAdd: true,
    showFilters: true,
    showRatings: true,
    onAddToCart: (product, variants) => {
      console.log("Add to cart:", product.name, variants);
    },
    onToggleWishlist: (product) => {
      console.log("Toggle wishlist:", product.name);
    },
    onProductClick: (product) => {
      console.log("Product clicked:", product.name);
    },
  },
};

export const ListView: Story = {
  args: {
    ...GridView.args,
    variant: "list",
  },
};

export const FeaturedProduct: Story = {
  args: {
    ...GridView.args,
    variant: "featured",
    products: [sampleProducts[0]],
  },
};

export const ComparisonTable: Story = {
  args: {
    ...GridView.args,
    variant: "comparison",
    products: sampleProducts.slice(0, 3),
    showFilters: false,
  },
};

export const CategoryShowcase: Story = {
  args: {
    ...GridView.args,
    variant: "category",
    showFilters: false,
  },
};

export const TwoColumns: Story = {
  args: {
    ...GridView.args,
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    ...GridView.args,
    columns: 4,
  },
};

export const NoAnimations: Story = {
  args: {
    ...GridView.args,
    animated: false,
  },
};

export const MinimalFeatures: Story = {
  args: {
    ...GridView.args,
    showWishlist: false,
    showQuickAdd: false,
    showFilters: false,
    showRatings: false,
  },
};

export const OutOfStock: Story = {
  args: {
    ...GridView.args,
    products: sampleProducts.map((p) => ({ ...p, inStock: false })),
  },
};

export const NoSaleItems: Story = {
  args: {
    ...GridView.args,
    products: sampleProducts.map((p) => ({ ...p, salePrice: undefined })),
  },
};

export const SingleCategory: Story = {
  args: {
    ...GridView.args,
    products: sampleProducts.filter((p) => p.category === "Audio"),
    showFilters: false,
  },
};

export const WithCustomLabels: Story = {
  args: {
    ...GridView.args,
    filterLabel: "Filtrer par catégorie",
    allCategoriesLabel: "Toutes",
    addToCartLabel: "Ajouter au panier",
    quickAddLabel: "Ajout rapide",
    outOfStockLabel: "Rupture de stock",
    saleLabel: "Promo",
    compareLabel: "Comparer",
    featuredTitle: "Produit vedette",
    featuredDescription: "Découvrez notre choix",
  },
};
