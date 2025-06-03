import { ProductShowcase, Product } from "@alexberriman/react-jedi"
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper"
import { PageHeader } from "../../../../components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Switch } from "../../../../components/ui/switch"
import { Label } from "../../../../components/ui/label"

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality noise-cancelling wireless headphones with 30-hour battery life',
    price: 299.99,
    salePrice: 249.99,
    currency: '$',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    category: 'Audio',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockCount: 15,
    badge: 'Best Seller',
    badgeVariant: 'default',
    variants: {
      color: [
        { id: 'black', name: 'Black', value: 'black', available: true },
        { id: 'white', name: 'White', value: 'white', available: true },
        { id: 'blue', name: 'Navy Blue', value: 'blue', available: false }
      ]
    },
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium comfort fit',
      'Multi-device connectivity'
    ],
    specifications: {
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g',
      'Bluetooth': '5.0'
    }
  },
  {
    id: '2',
    name: 'Smart Watch Ultra',
    description: 'Advanced fitness tracking with GPS and heart rate monitoring',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    category: 'Wearables',
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    badge: 'New',
    badgeVariant: 'secondary',
    variants: {
      size: [
        { id: 'small', name: '40mm', value: '40mm', available: true },
        { id: 'large', name: '44mm', value: '44mm', available: true }
      ],
      band: [
        { id: 'sport', name: 'Sport Band', value: 'sport', available: true },
        { id: 'leather', name: 'Leather Band', value: 'leather', available: true, priceModifier: 50 }
      ]
    },
    features: [
      'GPS tracking',
      'Heart rate monitor',
      'Water resistant',
      '7-day battery life'
    ],
    specifications: {
      'Display': 'AMOLED 1.9"',
      'Battery Life': '7 days',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart rate, GPS, Accelerometer'
    }
  },
  {
    id: '3',
    name: 'Portable Speaker Max',
    description: '360° immersive sound with powerful bass and 20-hour playtime',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    category: 'Audio',
    rating: 4.3,
    reviewCount: 256,
    inStock: false,
    badge: 'Limited Edition',
    badgeVariant: 'outline',
    variants: {
      color: [
        { id: 'black', name: 'Midnight Black', value: 'black', available: false },
        { id: 'red', name: 'Ruby Red', value: 'red', available: false }
      ]
    },
    features: [
      '360° sound',
      '20-hour battery',
      'IPX7 waterproof',
      'Dual pairing'
    ],
    specifications: {
      'Power': '30W',
      'Battery': '20 hours',
      'Connectivity': 'Bluetooth 5.3',
      'Weight': '750g'
    }
  },
  {
    id: '4',
    name: 'Wireless Earbuds Pro',
    description: 'True wireless earbuds with active noise cancellation',
    price: 199.99,
    salePrice: 159.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    category: 'Audio',
    rating: 4.6,
    reviewCount: 342,
    inStock: true,
    variants: {
      color: [
        { id: 'black', name: 'Black', value: 'black', available: true },
        { id: 'white', name: 'White', value: 'white', available: true }
      ]
    },
    features: [
      'Active noise cancellation',
      '6-hour battery life',
      'Wireless charging case',
      'IPX4 water resistant'
    ],
    specifications: {
      'Battery (Earbuds)': '6 hours',
      'Battery (Case)': '24 hours',
      'Charging': 'USB-C, Wireless',
      'ANC': 'Yes'
    }
  },
  {
    id: '5',
    name: '4K Webcam Pro',
    description: 'Professional 4K webcam with auto-framing and low-light correction',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1598327105026-27c4e8b7b0e4?w=800&q=80',
    category: 'Accessories',
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    badge: 'Pro',
    features: [
      '4K resolution',
      'Auto-framing',
      'Low-light correction',
      'Dual microphones'
    ],
    specifications: {
      'Resolution': '4K 30fps',
      'Field of View': '90°',
      'Focus': 'Auto-focus',
      'Compatibility': 'Windows, Mac, Linux'
    }
  },
  {
    id: '6',
    name: 'Fitness Tracker Band',
    description: 'Slim fitness band with sleep tracking and smartphone notifications',
    price: 79.99,
    salePrice: 59.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80',
    category: 'Wearables',
    rating: 4.1,
    reviewCount: 523,
    inStock: true,
    badge: 'Sale',
    badgeVariant: 'destructive',
    variants: {
      size: [
        { id: 'small', name: 'Small (5.5"-7.1")', value: 'small', available: true },
        { id: 'large', name: 'Large (6.7"-8.5")', value: 'large', available: true }
      ],
      color: [
        { id: 'black', name: 'Black', value: 'black', available: true },
        { id: 'pink', name: 'Pink', value: 'pink', available: true },
        { id: 'blue', name: 'Blue', value: 'blue', available: true }
      ]
    },
    features: [
      'Sleep tracking',
      'Heart rate monitor',
      '10-day battery',
      'Water resistant'
    ],
    specifications: {
      'Display': 'OLED 0.96"',
      'Battery': '10 days',
      'Water Resistance': 'IP68',
      'Connectivity': 'Bluetooth 5.0'
    }
  },
  {
    id: '7',
    name: 'Laptop Stand Pro',
    description: 'Ergonomic aluminum laptop stand with adjustable height',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    category: 'Accessories',
    rating: 4.4,
    reviewCount: 234,
    inStock: true,
    features: [
      'Adjustable height',
      'Aluminum construction',
      'Foldable design',
      'Heat dissipation'
    ],
    specifications: {
      'Material': 'Aluminum alloy',
      'Weight': '1.2kg',
      'Compatibility': '10-17" laptops',
      'Max Load': '10kg'
    }
  },
  {
    id: '8',
    name: 'Gaming Mouse RGB',
    description: 'High-precision gaming mouse with customizable RGB lighting',
    price: 89.99,
    salePrice: 69.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80',
    category: 'Gaming',
    rating: 4.7,
    reviewCount: 412,
    inStock: true,
    badge: 'Gamer\'s Choice',
    variants: {
      color: [
        { id: 'black', name: 'Black', value: 'black', available: true },
        { id: 'white', name: 'White', value: 'white', available: true }
      ]
    },
    features: [
      '16,000 DPI sensor',
      'RGB lighting',
      '7 programmable buttons',
      'Ergonomic design'
    ],
    specifications: {
      'DPI': '16,000',
      'Polling Rate': '1000Hz',
      'Buttons': '7',
      'Weight': '95g'
    }
  }
]

// Event handler functions moved to outer scope
const handleAddToCart = (product: Product, variants?: Record<string, string>) => {
  console.log('Add to cart:', product.name, variants)
  // In a real app, this would add the product to the cart
}

const handleToggleWishlist = (product: Product) => {
  console.log('Toggle wishlist:', product.name)
  // In a real app, this would add/remove from wishlist
}

const handleProductClick = (product: Product) => {
  console.log('Product clicked:', product.name)
  // In a real app, this would navigate to product details
}

export function ProductShowcaseShowcase() {
  const [variant, setVariant] = useState<'grid' | 'list' | 'featured' | 'comparison' | 'category'>('grid')
  const [columns, setColumns] = useState<2 | 3 | 4>(3)
  const [animated, setAnimated] = useState(true)
  const [showWishlist, setShowWishlist] = useState(true)
  const [showQuickAdd, setShowQuickAdd] = useState(true)
  const [showFilters, setShowFilters] = useState(true)
  const [showRatings, setShowRatings] = useState(true)

  // Determine which products to display based on variant
  const getDisplayProducts = () => {
    if (variant === 'featured') {
      return [sampleProducts[0]]
    }
    if (variant === 'comparison') {
      return sampleProducts.slice(0, 3)
    }
    return sampleProducts
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Product Showcase"
        description="A versatile product showcase component for e-commerce displays with multiple layout variants"
      />

      <ShowcaseWrapper>
        <Card>
          <CardHeader>
            <CardTitle>Component Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="variant">Variant</Label>
                <Select value={variant} onValueChange={(value) => setVariant(value as 'grid' | 'list' | 'featured' | 'comparison' | 'category')}>
                  <SelectTrigger id="variant">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="comparison">Comparison</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {variant === 'grid' && (
                <div className="space-y-2">
                  <Label htmlFor="columns">Columns</Label>
                  <Select value={columns.toString()} onValueChange={(value) => setColumns(Number.parseInt(value) as 2 | 3 | 4)}>
                    <SelectTrigger id="columns">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Columns</SelectItem>
                      <SelectItem value="3">3 Columns</SelectItem>
                      <SelectItem value="4">4 Columns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch id="animated" checked={animated} onCheckedChange={setAnimated} />
                <Label htmlFor="animated">Animations</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="wishlist" checked={showWishlist} onCheckedChange={setShowWishlist} />
                <Label htmlFor="wishlist">Show Wishlist</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="quickAdd" checked={showQuickAdd} onCheckedChange={setShowQuickAdd} />
                <Label htmlFor="quickAdd">Quick Add</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="filters" checked={showFilters} onCheckedChange={setShowFilters} />
                <Label htmlFor="filters">Show Filters</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="ratings" checked={showRatings} onCheckedChange={setShowRatings} />
                <Label htmlFor="ratings">Show Ratings</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </ShowcaseWrapper>

      <ShowcaseWrapper className="pb-12">
        <ProductShowcase
          variant={variant}
          products={getDisplayProducts()}
          columns={columns}
          animated={animated}
          showWishlist={showWishlist}
          showQuickAdd={showQuickAdd}
          showFilters={showFilters}
          showRatings={showRatings}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onProductClick={handleProductClick}
        />
      </ShowcaseWrapper>

      <ShowcaseWrapper>
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="code">Code Example</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Multiple Variants:</strong> Grid, List, Featured, Comparison Table, and Category showcase layouts</li>
                  <li><strong>Product Information:</strong> Images, pricing, variants (size/color), ratings, and stock status</li>
                  <li><strong>Interactive Features:</strong> Add to cart, wishlist toggle, product click handling</li>
                  <li><strong>Sale Support:</strong> Display sale prices with original price strikethrough</li>
                  <li><strong>Product Badges:</strong> Custom badges with different variants (Best Seller, New, Sale, etc.)</li>
                  <li><strong>Filtering:</strong> Category filtering with dropdown selection</li>
                  <li><strong>Responsive Design:</strong> Mobile-optimized layouts for all variants</li>
                  <li><strong>Animations:</strong> Smooth hover effects and entrance animations</li>
                  <li><strong>Comparison Mode:</strong> Side-by-side product comparison with features table</li>
                  <li><strong>Customizable Labels:</strong> All text labels can be customized for i18n</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Basic Usage</h4>
                  <p className="text-muted-foreground">
                    The ProductShowcase component requires a products array with product data. Each product should include basic information like id, name, price, and image.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Product Variants</h4>
                  <p className="text-muted-foreground">
                    Products can have variants like size and color. Each variant can have an availability status and optional price modifier.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Event Handlers</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li><code>onAddToCart</code>: Called when user clicks add to cart with product and selected variants</li>
                    <li><code>onToggleWishlist</code>: Called when user toggles wishlist status</li>
                    <li><code>onProductClick</code>: Called when user clicks on product image or title</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Comparison Mode</h4>
                  <p className="text-muted-foreground">
                    The comparison variant automatically generates a feature comparison table based on product features and specifications.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="code" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Example Code</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`import { ProductShowcase } from '@/components/blocks/product-showcase'

const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 299.99,
    salePrice: 249.99,
    image: '/product-image.jpg',
    category: 'Audio',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    badge: 'Best Seller',
    variants: {
      color: [
        { id: 'black', name: 'Black', value: 'black', available: true },
        { id: 'white', name: 'White', value: 'white', available: true }
      ]
    }
  }
  // ... more products
]

function MyEcommerceSection() {
  return (
    <ProductShowcase
      variant="grid"
      products={products}
      columns={3}
      showFilters={true}
      onAddToCart={(product, variants) => {
        // Handle add to cart
        console.log('Adding to cart:', product, variants)
      }}
      onProductClick={(product) => {
        // Navigate to product page
        router.push(\`/products/\${product.id}\`)
      }}
    />
  )
}`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ShowcaseWrapper>
    </div>
  )
}