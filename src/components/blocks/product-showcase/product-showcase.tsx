import * as React from 'react'
import { Button } from '../../ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { cn } from '../../../lib/utils'
import { FiHeart, FiShoppingCart, FiStar, FiCheck, FiX } from 'react-icons/fi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { motion, AnimatePresence } from 'framer-motion'

export interface ProductVariant {
  id: string
  name: string
  value: string
  available?: boolean
  priceModifier?: number
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  salePrice?: number
  currency?: string
  image: string
  images?: string[]
  category?: string
  rating?: number
  reviewCount?: number
  inStock?: boolean
  stockCount?: number
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  variants?: {
    size?: ProductVariant[]
    color?: ProductVariant[]
    [key: string]: ProductVariant[] | undefined
  }
  features?: string[]
  specifications?: Record<string, string>
}

export interface ProductShowcaseProperties {
  readonly variant?: 'grid' | 'list' | 'featured' | 'comparison' | 'category'
  readonly products: Product[]
  readonly columns?: 2 | 3 | 4
  readonly animated?: boolean
  readonly showWishlist?: boolean
  readonly showQuickAdd?: boolean
  readonly showFilters?: boolean
  readonly showRatings?: boolean
  readonly onAddToCart?: (product: Product, variant?: Record<string, string>) => void
  readonly onToggleWishlist?: (product: Product) => void
  readonly onProductClick?: (product: Product) => void
  readonly className?: string
  readonly categories?: string[]
  readonly filterLabel?: string
  readonly allCategoriesLabel?: string
  readonly addToCartLabel?: string
  readonly quickAddLabel?: string
  readonly outOfStockLabel?: string
  readonly saleLabel?: string
  readonly compareLabel?: string
  readonly featuredTitle?: string
  readonly featuredDescription?: string
}

const formatPrice = (price: number, currency = '$') => {
  return `${currency}${price.toFixed(2)}`
}

function ProductShowcase({
  variant = 'grid',
  products,
  columns = 3,
  animated = true,
  showWishlist = true,
  showQuickAdd = true,
  showFilters = false,
  showRatings = true,
  onAddToCart,
  onToggleWishlist,
  onProductClick,
  className,
  categories = [],
  filterLabel = 'Filter by category',
  allCategoriesLabel = 'All',
  addToCartLabel = 'Add to Cart',
  quickAddLabel = 'Quick Add',
  outOfStockLabel = 'Out of Stock',
  saleLabel = 'Sale',
  compareLabel = 'Compare',
  featuredTitle = 'Featured Product',
  featuredDescription = 'Check out our top pick'
}: ProductShowcaseProperties) {
  const [wishlist, setWishlist] = React.useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')
  const [selectedVariants, setSelectedVariants] = React.useState<Record<string, Record<string, string>>>({})
  const [hoveredProduct, setHoveredProduct] = React.useState<string | null>(null)

  const handleWishlistToggle = (product: Product) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(product.id)) {
      newWishlist.delete(product.id)
    } else {
      newWishlist.add(product.id)
    }
    setWishlist(newWishlist)
    onToggleWishlist?.(product)
  }

  const handleAddToCart = (product: Product) => {
    const variants = selectedVariants[product.id] || {}
    onAddToCart?.(product, variants)
  }

  const handleVariantChange = (productId: string, variantType: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [variantType]: value
      }
    }))
  }

  const renderRating = (rating: number, reviewCount?: number) => {
    if (!showRatings || !rating) return null
    
    return (
      <div className="flex items-center gap-1">
        <div className="flex">
          {Array.from({length: 5}).map((_, i) => (
            <FiStar
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              )}
            />
          ))}
        </div>
        {reviewCount && (
          <span className="text-sm text-muted-foreground">({reviewCount})</span>
        )}
      </div>
    )
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const allCategories = [...new Set(products.map(p => p.category).filter(Boolean))] as string[]

  const ProductCard = ({ product }: { product: Product }) => {
    const isInWishlist = wishlist.has(product.id)
    const isOnSale = product.salePrice && product.salePrice < product.price
    const isHovered = hoveredProduct === product.id

    return (
      <motion.div
        initial={animated ? { opacity: 0, y: 20 } : false}
        animate={animated ? { opacity: 1, y: 0 } : false}
        whileHover={animated ? { y: -4 } : undefined}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        <Card className={cn("overflow-hidden h-full", className)}>
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <button
              type="button"
              className="w-full h-full cursor-pointer"
              onClick={() => onProductClick?.(product)}
              aria-label={`View details for ${product.name}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className={cn(
                  "h-full w-full object-cover transition-transform duration-300",
                  isHovered && "scale-110"
                )}
              />
            </button>
            {product.badge && (
              <Badge 
                className="absolute top-2 left-2" 
                variant={product.badgeVariant}
              >
                {product.badge}
              </Badge>
            )}
            {isOnSale && (
              <Badge className="absolute top-2 right-2" variant="destructive">
                {saleLabel}
              </Badge>
            )}
            {showWishlist && (
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white",
                  isOnSale && "right-16"
                )}
                onClick={() => handleWishlistToggle(product)}
              >
                <FiHeart className={cn("h-4 w-4", isInWishlist && "fill-red-500 text-red-500")} />
              </Button>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" className="bg-white/90">
                  {outOfStockLabel}
                </Badge>
              </div>
            )}
          </div>
          <CardHeader className="pb-3 pt-0">
            <div className="space-y-1">
              {product.category && (
                <p className="text-sm text-muted-foreground">{product.category}</p>
              )}
              <CardTitle 
                className="text-lg cursor-pointer hover:underline" 
                onClick={() => onProductClick?.(product)}
              >
                {product.name}
              </CardTitle>
            </div>
            {renderRating(product.rating || 0, product.reviewCount)}
          </CardHeader>
          <CardContent className="pb-3">
            {product.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
            )}
            <div className="flex items-baseline gap-2 mb-3">
              <span className={cn("text-lg font-semibold", isOnSale && "text-destructive")}>
                {formatPrice(product.salePrice || product.price, product.currency)}
              </span>
              {isOnSale && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price, product.currency)}
                </span>
              )}
            </div>
            {product.variants && Object.keys(product.variants).length > 0 && (
              <div className="space-y-2">
                {Object.entries(product.variants).map(([type, options]) => (
                  options && options.length > 0 && (
                    <Select
                      key={type}
                      value={selectedVariants[product.id]?.[type] || ''}
                      onValueChange={(value) => handleVariantChange(product.id, type, value)}
                    >
                      <SelectTrigger className="w-full h-8 text-sm">
                        <SelectValue placeholder={`Select ${type}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem 
                            key={option.id} 
                            value={option.value}
                            disabled={!option.available}
                          >
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              className="w-full"
              disabled={!product.inStock}
              onClick={() => handleAddToCart(product)}
            >
              <FiShoppingCart className="mr-2 h-4 w-4" />
              {showQuickAdd ? quickAddLabel : addToCartLabel}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  const ListView = ({ product }: { product: Product }) => {
    const isInWishlist = wishlist.has(product.id)
    const isOnSale = product.salePrice && product.salePrice < product.price

    return (
      <motion.div
        initial={animated ? { opacity: 0, x: -20 } : false}
        animate={animated ? { opacity: 1, x: 0 } : false}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-48 h-48 overflow-hidden bg-gray-100">
              <button
                type="button"
                className="w-full h-full cursor-pointer"
                onClick={() => onProductClick?.(product)}
                aria-label={`View details for ${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </button>
              {product.badge && (
                <Badge 
                  className="absolute top-2 left-2" 
                  variant={product.badgeVariant}
                >
                  {product.badge}
                </Badge>
              )}
            </div>
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {product.category && (
                      <Badge variant="secondary">{product.category}</Badge>
                    )}
                    {isOnSale && (
                      <Badge variant="destructive">{saleLabel}</Badge>
                    )}
                  </div>
                  <button
                    type="button"
                    className="text-xl font-semibold mb-1 cursor-pointer hover:underline text-left"
                    onClick={() => onProductClick?.(product)}
                  >
                    {product.name}
                  </button>
                  {renderRating(product.rating || 0, product.reviewCount)}
                </div>
                {showWishlist && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleWishlistToggle(product)}
                  >
                    <FiHeart className={cn("h-4 w-4", isInWishlist && "fill-red-500 text-red-500")} />
                  </Button>
                )}
              </div>
              {product.description && (
                <p className="text-muted-foreground mb-4">{product.description}</p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className={cn("text-2xl font-bold", isOnSale && "text-destructive")}>
                    {formatPrice(product.salePrice || product.price, product.currency)}
                  </span>
                  {isOnSale && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {product.inStock ? (
                    <>
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <FiCheck className="h-4 w-4" />
                        In Stock
                      </span>
                      <Button onClick={() => handleAddToCart(product)}>
                        <FiShoppingCart className="mr-2 h-4 w-4" />
                        {addToCartLabel}
                      </Button>
                    </>
                  ) : (
                    <span className="text-sm text-destructive flex items-center gap-1">
                      <FiX className="h-4 w-4" />
                      {outOfStockLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  const FeaturedProduct = ({ product }: { product: Product }) => {
    const isInWishlist = wishlist.has(product.id)
    const isOnSale = product.salePrice && product.salePrice < product.price

    return (
      <motion.div
        initial={animated ? { opacity: 0, scale: 0.95 } : false}
        animate={animated ? { opacity: 1, scale: 1 } : false}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <button
                type="button"
                className="w-full h-full cursor-pointer"
                onClick={() => onProductClick?.(product)}
                aria-label={`View details for ${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </button>
              {product.badge && (
                <Badge 
                  className="absolute top-4 left-4" 
                  variant={product.badgeVariant}
                >
                  {product.badge}
                </Badge>
              )}
            </div>
            <div className="p-6 lg:p-8">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">{featuredTitle}</p>
                <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                {product.category && (
                  <Badge variant="secondary" className="mb-3">{product.category}</Badge>
                )}
                {renderRating(product.rating || 0, product.reviewCount)}
              </div>
              <p className="text-muted-foreground mb-6">{product.description}</p>
              <div className="flex items-baseline gap-3 mb-6">
                <span className={cn("text-3xl font-bold", isOnSale && "text-destructive")}>
                  {formatPrice(product.salePrice || product.price, product.currency)}
                </span>
                {isOnSale && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price, product.currency)}
                  </span>
                )}
              </div>
              {product.features && product.features.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <FiCheck className="h-4 w-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product)}
                >
                  <FiShoppingCart className="mr-2 h-5 w-5" />
                  {addToCartLabel}
                </Button>
                {showWishlist && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleWishlistToggle(product)}
                  >
                    <FiHeart className={cn("h-5 w-5", isInWishlist && "fill-red-500 text-red-500")} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  const ComparisonTable = () => {
    const features = new Set<string>()
    const specifications = new Set<string>()
    
    for (const product of filteredProducts) {
      if (product.features) for (const f of product.features) features.add(f)
      if (product.specifications) {
        for (const s of Object.keys(product.specifications)) specifications.add(s)
      }
    }

    return (
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48">Product</TableHead>
              {filteredProducts.map(product => (
                <TableHead key={product.id} className="text-center min-w-[200px]">
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="cursor-pointer mx-auto"
                      onClick={() => onProductClick?.(product)}
                      aria-label={`View details for ${product.name}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-24 w-24 object-cover rounded"
                      />
                    </button>
                    <h4 className="font-semibold">{product.name}</h4>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Price</TableCell>
              {filteredProducts.map(product => {
                const isOnSale = product.salePrice && product.salePrice < product.price
                return (
                  <TableCell key={product.id} className="text-center">
                    <div>
                      <span className={cn("font-semibold", isOnSale && "text-destructive")}>
                        {formatPrice(product.salePrice || product.price, product.currency)}
                      </span>
                      {isOnSale && (
                        <span className="text-sm text-muted-foreground line-through block">
                          {formatPrice(product.price, product.currency)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                )
              })}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Rating</TableCell>
              {filteredProducts.map(product => (
                <TableCell key={product.id} className="text-center">
                  {renderRating(product.rating || 0, product.reviewCount)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Availability</TableCell>
              {filteredProducts.map(product => (
                <TableCell key={product.id} className="text-center">
                  {product.inStock ? (
                    <Badge variant="outline" className="text-green-600">In Stock</Badge>
                  ) : (
                    <Badge variant="outline" className="text-destructive">Out of Stock</Badge>
                  )}
                </TableCell>
              ))}
            </TableRow>
            {[...features].map(feature => (
              <TableRow key={feature}>
                <TableCell className="font-medium">{feature}</TableCell>
                {filteredProducts.map(product => (
                  <TableCell key={product.id} className="text-center">
                    {product.features?.includes(feature) ? (
                      <FiCheck className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <FiX className="h-5 w-5 text-gray-300 mx-auto" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {[...specifications].map(spec => (
              <TableRow key={spec}>
                <TableCell className="font-medium">{spec}</TableCell>
                {filteredProducts.map(product => (
                  <TableCell key={product.id} className="text-center">
                    {product.specifications?.[spec] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-medium">Action</TableCell>
              {filteredProducts.map(product => (
                <TableCell key={product.id} className="text-center">
                  <Button
                    size="sm"
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product)}
                  >
                    <FiShoppingCart className="mr-2 h-4 w-4" />
                    {addToCartLabel}
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  const CategoryShowcase = () => {
    const categorizedProducts: Record<string, Product[]> = {}
    for (const category of allCategories) {
      categorizedProducts[category] = products.filter(p => p.category === category)
    }

    return (
      <Tabs defaultValue={allCategories[0]} className="w-full">
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${allCategories.length}, 1fr)` }}>
          {allCategories.map(category => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {allCategories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className={cn(
              "grid gap-6",
              `grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`
            )}>
              {categorizedProducts[category].map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      {showFilters && allCategories.length > 0 && variant !== 'category' && (
        <div className="mb-6">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder={filterLabel} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{allCategoriesLabel}</SelectItem>
              {allCategories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <AnimatePresence mode="wait">
        {variant === 'grid' && (
          <motion.div
            key="grid"
            className={cn(
              "grid gap-6",
              `grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`
            )}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}

        {variant === 'list' && (
          <motion.div key="list" className="space-y-4">
            {filteredProducts.map((product) => (
              <ListView key={product.id} product={product} />
            ))}
          </motion.div>
        )}

        {variant === 'featured' && filteredProducts.length > 0 && (
          <FeaturedProduct product={filteredProducts[0]} />
        )}

        {variant === 'comparison' && (
          <ComparisonTable />
        )}

        {variant === 'category' && (
          <CategoryShowcase />
        )}
      </AnimatePresence>
    </div>
  )
}

ProductShowcase.displayName = 'ProductShowcase'

export { ProductShowcase }