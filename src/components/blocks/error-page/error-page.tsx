import * as React from 'react'
import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { motion } from 'framer-motion'
import { Home, Search, Mail, Wrench, ServerCrash, Sparkles, FileQuestion } from 'lucide-react'

export interface ErrorPageLink {
  readonly label: string
  readonly href: string
  readonly description?: string
}

export interface ErrorPageSearchConfig {
  readonly enabled?: boolean
  readonly placeholder?: string
  readonly onSearch?: (query: string) => void
  readonly searchAction?: string
}

export interface ErrorPageProperties {
  readonly variant?: 'friendly-404' | 'technical-error' | 'maintenance' | 'coming-soon' | 'search-suggestions'
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

// Default configurations for each variant
const variantDefaults = {
  'friendly-404': {
    title: '404 - Page Not Found',
    description: "Oops! The page you're looking for seems to have wandered off. Don't worry, we'll help you find your way back.",
    icon: <FileQuestion className="h-20 w-20 text-muted-foreground" />,
  },
  'technical-error': {
    title: '500 - Server Error',
    description: 'Something went wrong on our end. Our team has been notified and is working to fix the issue. Please try again later.',
    icon: <ServerCrash className="h-20 w-20 text-destructive" />,
  },
  'maintenance': {
    title: 'Under Maintenance',
    description: "We're currently performing scheduled maintenance to improve your experience. We'll be back online shortly.",
    icon: <Wrench className="h-20 w-20 text-warning" />,
  },
  'coming-soon': {
    title: 'Coming Soon',
    description: "Something exciting is in the works! We're putting the finishing touches on this page.",
    icon: <Sparkles className="h-20 w-20 text-primary" />,
  },
  'search-suggestions': {
    title: "Can't Find What You're Looking For?",
    description: "No worries! Try searching for what you need or explore our popular pages below.",
    icon: <Search className="h-20 w-20 text-muted-foreground" />,
  },
}

export function ErrorPage({
  variant = 'friendly-404',
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

  const defaults = variantDefaults[variant]
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
        staggerChildren: animationDelay,
      },
    },
  }


  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  }

  const renderBreadcrumb = () => {
    if (!showBreadcrumb || breadcrumbItems.length === 0) return null

    return (
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <a href={homeLink} className="hover:text-foreground transition-colors">
              Home
            </a>
          </li>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <li className="select-none">/</li>
              <li>
                {item.href ? (
                  <a href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-foreground">{item.label}</span>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    )
  }

  const renderCountdown = () => {
    if (variant !== 'coming-soon' || !countdownDate) return null

    return (
      <div className="mt-8">
        <p className="text-muted-foreground mb-4">{countdownMessage}</p>
        {hasExpired ? (
          <p className="text-2xl font-bold">We&apos;re Live!</p>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl font-bold tabular-nums">{item.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderSearch = () => {
    if (!searchConfig.enabled) return null

    return (
      <form onSubmit={handleSearch} className="mt-8 max-w-md mx-auto">
        <div className="relative">
          <Input
            type="search"
            placeholder={searchConfig.placeholder || 'Search...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-md transition-colors"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>
    )
  }

  const renderPopularLinks = () => {
    if (popularLinks.length === 0) return null

    return (
      <div className="mt-12">
        <h3 className="text-lg font-semibold mb-4">Popular Pages</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="group block p-4 rounded-lg border border-border hover:border-foreground/20 hover:bg-accent transition-all"
            >
              <div className="font-medium group-hover:text-primary transition-colors">
                {link.label}
              </div>
              {link.description && (
                <div className="text-sm text-muted-foreground mt-1">{link.description}</div>
              )}
            </a>
          ))}
        </div>
      </div>
    )
  }

  const content = (
    <div className={cn('min-h-[60vh] w-full flex items-center justify-center p-4', className)} {...properties}>
      <div className="max-w-2xl w-full text-center">
        {renderBreadcrumb()}
        
        <div className="space-y-6">
          {finalIcon && (
            <div className="flex justify-center">
              {animated ? (
                <motion.div variants={iconVariants}>{finalIcon}</motion.div>
              ) : (
                finalIcon
              )}
            </div>
          )}

          {image && (
            <div className="flex justify-center">
              <img
                src={image}
                alt={finalTitle}
                className="max-w-full h-auto rounded-lg"
                style={{ maxHeight: '300px' }}
              />
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{finalTitle}</h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">{finalDescription}</p>
          </div>

          {renderCountdown()}
          {renderSearch()}

          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button asChild>
              <a href={homeLink}>
                <Home className="mr-2 h-4 w-4" />
                {homeLinkText}
              </a>
            </Button>

            {contactEmail && (
              <Button variant="outline" asChild>
                <a href={`mailto:${contactEmail}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  {contactText}
                </a>
              </Button>
            )}

            {customActions.map((action, index) => {
              const buttonProps = {
                variant: action.variant || 'outline' as const,
                onClick: action.onClick,
                ...(action.href ? { asChild: true } : {}),
              }

              return (
                <Button key={index} {...buttonProps}>
                  {action.href ? (
                    <a href={action.href}>{action.label}</a>
                  ) : (
                    action.label
                  )}
                </Button>
              )
            })}
          </div>

          {renderPopularLinks()}

          {children && <div className="mt-12">{children}</div>}
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