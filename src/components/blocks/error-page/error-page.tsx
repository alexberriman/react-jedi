import * as React from 'react'
import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { motion } from 'framer-motion'
import { 
  Home, Search, Mail, Wrench, ServerCrash, Sparkles, FileQuestion,
  ShoppingBag, BookOpen, Newspaper, UtensilsCrossed, Monitor,
  Building2, ArrowRight, Palette
} from 'lucide-react'

export interface ErrorPageLink {
  readonly label: string
  readonly href: string
  readonly description?: string
  readonly icon?: React.ReactNode
}

export interface ErrorPageSearchConfig {
  readonly enabled?: boolean
  readonly placeholder?: string
  readonly onSearch?: (query: string) => void
  readonly searchAction?: string
}

export type ErrorPageVariant = 
  | 'friendly-404' 
  | 'technical-error' 
  | 'maintenance' 
  | 'coming-soon' 
  | 'search-suggestions'
  | 'blog'
  | 'ecommerce'
  | 'magazine'
  | 'restaurant'
  | 'saas'
  | 'portfolio'
  | 'corporate'

export interface ErrorPageProperties {
  readonly variant?: ErrorPageVariant
  readonly siteType?: 'blog' | 'ecommerce' | 'magazine' | 'restaurant' | 'saas' | 'portfolio' | 'corporate'
  readonly title?: string
  readonly description?: string
  readonly image?: string
  readonly showIcon?: boolean
  readonly customIcon?: React.ReactNode
  readonly homeLink?: string
  readonly homeLinkText?: string
  readonly showBreadcrumb?: boolean
  readonly breadcrumbItems?: readonly { label: string; href?: string }[]
  readonly popularLinks?: readonly ErrorPageLink[]
  readonly contactEmail?: string
  readonly contactText?: string
  readonly searchConfig?: ErrorPageSearchConfig
  readonly countdownDate?: Date
  readonly countdownMessage?: string
  readonly animated?: boolean
  readonly animationDelay?: number
  readonly customActions?: readonly { label: string; onClick?: () => void; href?: string; variant?: 'default' | 'outline' | 'ghost' }[]
  readonly className?: string
  readonly children?: React.ReactNode
}

// Format countdown time
const formatCountdown = (difference: number): { days: number; hours: number; minutes: number; seconds: number } => {
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)
  
  return { days, hours, minutes, seconds }
}

// Enhanced configurations for each variant with modern styling
const variantDefaults = {
  'friendly-404': {
    title: '404 - Page Not Found',
    description: "Oops! The page you're looking for seems to have wandered off. Don't worry, we'll help you find your way back.",
    icon: <FileQuestion className="h-24 w-24 text-blue-500" />,
    gradient: 'from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900',
    accentColor: 'blue',
  },
  'technical-error': {
    title: '500 - Server Error',
    description: 'Something went wrong on our end. Our team has been notified and is working to fix the issue. Please try again later.',
    icon: <ServerCrash className="h-24 w-24 text-red-500" />,
    gradient: 'from-red-50 to-orange-100 dark:from-red-950 dark:to-orange-900',
    accentColor: 'red',
  },
  'maintenance': {
    title: 'Under Maintenance',
    description: "We're currently performing scheduled maintenance to improve your experience. We'll be back online shortly.",
    icon: <Wrench className="h-24 w-24 text-amber-500" />,
    gradient: 'from-amber-50 to-yellow-100 dark:from-amber-950 dark:to-yellow-900',
    accentColor: 'amber',
  },
  'coming-soon': {
    title: 'Coming Soon',
    description: "Something exciting is in the works! We're putting the finishing touches on this page.",
    icon: <Sparkles className="h-24 w-24 text-purple-500" />,
    gradient: 'from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900',
    accentColor: 'purple',
  },
  'search-suggestions': {
    title: "Can't Find What You're Looking For?",
    description: "No worries! Try searching for what you need or explore our popular pages below.",
    icon: <Search className="h-24 w-24 text-green-500" />,
    gradient: 'from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900',
    accentColor: 'green',
  },
  'blog': {
    title: 'Article Not Found',
    description: "The article you're looking for might have been moved or doesn't exist. Explore our latest posts or search for specific topics.",
    icon: <BookOpen className="h-24 w-24 text-indigo-500" />,
    gradient: 'from-indigo-50 to-purple-100 dark:from-indigo-950 dark:to-purple-900',
    accentColor: 'indigo',
  },
  'ecommerce': {
    title: 'Product Not Found',
    description: "Sorry, the product you're looking for is currently unavailable. Check out our featured items or browse by category.",
    icon: <ShoppingBag className="h-24 w-24 text-emerald-500" />,
    gradient: 'from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900',
    accentColor: 'emerald',
  },
  'magazine': {
    title: 'Story Not Found',
    description: "The story you're seeking isn't here, but our latest articles are waiting to captivate you. Discover trending topics below.",
    icon: <Newspaper className="h-24 w-24 text-rose-500" />,
    gradient: 'from-rose-50 to-pink-100 dark:from-rose-950 dark:to-pink-900',
    accentColor: 'rose',
  },
  'restaurant': {
    title: 'Page Not Found',
    description: "Looks like this page is off the menu! But don't worry, we have plenty of delicious options waiting for you.",
    icon: <UtensilsCrossed className="h-24 w-24 text-orange-500" />,
    gradient: 'from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-900',
    accentColor: 'orange',
  },
  'saas': {
    title: 'Feature Not Available',
    description: "This feature might be in development or restricted. Explore our dashboard or contact support for assistance.",
    icon: <Monitor className="h-24 w-24 text-cyan-500" />,
    gradient: 'from-cyan-50 to-blue-100 dark:from-cyan-950 dark:to-blue-900',
    accentColor: 'cyan',
  },
  'portfolio': {
    title: 'Project Not Found',
    description: "The project you're looking for might have been archived. Check out my featured work or get in touch to discuss your ideas.",
    icon: <Palette className="h-24 w-24 text-violet-500" />,
    gradient: 'from-violet-50 to-purple-100 dark:from-violet-950 dark:to-purple-900',
    accentColor: 'violet',
  },
  'corporate': {
    title: 'Page Unavailable',
    description: "The requested page is currently unavailable. Navigate to our main sections or contact our team for assistance.",
    icon: <Building2 className="h-24 w-24 text-slate-500" />,
    gradient: 'from-slate-50 to-gray-100 dark:from-slate-950 dark:to-gray-900',
    accentColor: 'slate',
  },
}

export function ErrorPage({
  variant = 'friendly-404',
  siteType,
  title,
  description,
  image,
  showIcon = true,
  customIcon,
  homeLink = '/',
  homeLinkText = 'Go to Homepage',
  showBreadcrumb = false,
  breadcrumbItems = [],
  popularLinks = [],
  contactEmail,
  contactText = 'Contact Support',
  searchConfig = { enabled: false },
  countdownDate,
  countdownMessage = 'Launching in:',
  animated = true,
  animationDelay = 0.1,
  customActions = [],
  className,
  children,
  ...properties
}: ErrorPageProperties) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [countdown, setCountdown] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [hasExpired, setHasExpired] = React.useState(false)

  // Use siteType to override variant if provided
  const effectiveVariant = siteType || variant
  const defaults = variantDefaults[effectiveVariant]
  const finalTitle = title || defaults.title
  const finalDescription = description || defaults.description
  const finalIcon = customIcon || (showIcon && defaults.icon)

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchConfig.onSearch && searchQuery.trim()) {
      searchConfig.onSearch(searchQuery)
    } else if (searchConfig.searchAction) {
      globalThis.location.href = `${searchConfig.searchAction}?q=${encodeURIComponent(searchQuery)}`
    }
  }

  // Countdown timer for coming soon variant
  React.useEffect(() => {
    if (variant === 'coming-soon' && countdownDate && !hasExpired) {
      const interval = globalThis.setInterval(() => {
        const now = Date.now()
        const target = countdownDate.getTime()
        const difference = target - now

        if (difference > 0) {
          setCountdown(formatCountdown(difference))
        } else {
          setHasExpired(true)
          globalThis.clearInterval(interval)
        }
      }, 1000)

      return () => globalThis.clearInterval(interval)
    }
  }, [variant, countdownDate, hasExpired])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: animationDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 25,
        duration: 0.8,
      },
    },
  }

  const floatingVariants = {
    float: {
      y: [-4, 4, -4],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const renderBreadcrumb = () => {
    if (!showBreadcrumb || breadcrumbItems.length === 0) return null

    return (
      <motion.nav 
        aria-label="Breadcrumb" 
        className="mb-12"
        variants={animated ? itemVariants : {}}
      >
        <ol className="flex items-center justify-center space-x-3 text-sm">
          <li>
            <a 
              href={homeLink} 
              className="px-3 py-2 rounded-lg bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
            >
              Home
            </a>
          </li>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <li className="text-gray-400">
                <ArrowRight className="h-4 w-4" />
              </li>
              <li>
                {item.href ? (
                  <a 
                    href={item.href} 
                    className="px-3 py-2 rounded-lg bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="px-3 py-2 rounded-lg bg-white/70 dark:bg-white/20 text-gray-900 dark:text-white font-medium">
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </motion.nav>
    )
  }

  const renderCountdown = () => {
    if (effectiveVariant !== 'coming-soon' || !countdownDate) return null

    return (
      <div className="mt-12">
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 font-medium">{countdownMessage}</p>
        {hasExpired ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <p className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              🎉 We&apos;re Live!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map((item) => (
              <motion.div 
                key={item.label} 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-6 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                  <div className="text-4xl md:text-5xl font-bold tabular-nums bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider mt-2 font-medium">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderSearch = () => {
    if (!searchConfig.enabled) return null

    return (
      <form onSubmit={handleSearch} className="mt-12 max-w-lg mx-auto">
        <div className="relative">
          <Input
            type="search"
            placeholder={searchConfig.placeholder || 'Search...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pr-14 text-lg bg-white/70 dark:bg-white/10 backdrop-blur-sm border-white/30 shadow-lg focus:shadow-xl transition-all duration-300 rounded-2xl"
          />
          <motion.button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Search"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="h-5 w-5" />
          </motion.button>
        </div>
      </form>
    )
  }

  const renderPopularLinks = () => {
    if (popularLinks.length === 0) return null

    return (
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Popular Pages
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={link.href}
                className="group block p-6 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  {link.icon && (
                    <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {link.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {link.label}
                    </div>
                    {link.description && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                        {link.description}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors transform group-hover:translate-x-1" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  const content = (
    <div 
      className={cn(
        'min-h-screen w-full relative overflow-hidden',
        'bg-gradient-to-br',
        defaults.gradient,
        className
      )} 
      {...properties}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-16">
        <div className="max-w-4xl w-full text-center">
          {renderBreadcrumb()}
          
          <div className="space-y-8">
            {/* Icon Section */}
            {finalIcon && (
              <motion.div 
                className="flex justify-center relative"
                variants={animated ? itemVariants : {}}
              >
                <div className="relative">
                  {animated ? (
                    <motion.div 
                      variants={iconVariants}
                      animate="visible"
                      initial="hidden"
                    >
                      <motion.div
                        variants={floatingVariants}
                        animate="float"
                        className="p-6 rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl"
                      >
                        {finalIcon}
                      </motion.div>
                    </motion.div>
                  ) : (
                    <div className="p-6 rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
                      {finalIcon}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Image Section */}
            {image && (
              <motion.div 
                className="flex justify-center"
                variants={animated ? itemVariants : {}}
              >
                <div className="relative">
                  <img
                    src={image}
                    alt={finalTitle}
                    className="max-w-full h-auto rounded-2xl shadow-2xl border border-white/20"
                    style={{ maxHeight: '400px' }}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </motion.div>
            )}

            {/* Title and Description */}
            <motion.div 
              className="space-y-6"
              variants={animated ? itemVariants : {}}
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {finalTitle}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {finalDescription}
              </p>
            </motion.div>

            {/* Additional Components */}
            <motion.div variants={animated ? itemVariants : {}}>
              {renderCountdown()}
            </motion.div>
            
            <motion.div variants={animated ? itemVariants : {}}>
              {renderSearch()}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 justify-center mt-12"
              variants={animated ? itemVariants : {}}
            >
              <Button 
                asChild 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <a href={homeLink} className="inline-flex items-center">
                  <Home className="mr-3 h-5 w-5" />
                  {homeLinkText}
                </a>
              </Button>

              {contactEmail && (
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild 
                  className="px-8 py-4 text-lg font-semibold bg-white/70 dark:bg-white/10 backdrop-blur-sm border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <a href={`mailto:${contactEmail}`} className="inline-flex items-center">
                    <Mail className="mr-3 h-5 w-5" />
                    {contactText}
                  </a>
                </Button>
              )}

              {customActions.map((action, index) => {
                const buttonProps = {
                  variant: action.variant || 'outline' as const,
                  size: 'lg' as const,
                  onClick: action.onClick,
                  className: "px-8 py-4 text-lg font-semibold bg-white/70 dark:bg-white/10 backdrop-blur-sm border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
                  ...(action.href ? { asChild: true } : {}),
                }

                return (
                  <Button key={index} {...buttonProps}>
                    {action.href ? (
                      <a href={action.href} className="inline-flex items-center">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        {action.label}
                      </a>
                    ) : (
                      <span className="inline-flex items-center">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        {action.label}
                      </span>
                    )}
                  </Button>
                )
              })}
            </motion.div>

            {/* Popular Links */}
            <motion.div variants={animated ? itemVariants : {}}>
              {renderPopularLinks()}
            </motion.div>

            {/* Custom Children */}
            {children && (
              <motion.div 
                className="mt-16"
                variants={animated ? itemVariants : {}}
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  if (!animated) {
    return content
  }

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {content}
    </motion.div>
  )
}