import * as React from 'react'
import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

// Format countdown time
const formatCountdown = (difference: number): string => {
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  parts.push(`${seconds}s`)

  return parts.join(' ')
}

// Get button variant
const getButtonVariant = (actionVariant?: 'primary' | 'secondary' | 'link'): 'default' | 'secondary' | 'link' => {
  if (actionVariant === 'primary') return 'default'
  if (actionVariant === 'secondary') return 'secondary'
  return 'link'
}

// Get Y animation value based on position
const getAnimationY = (position: 'top' | 'bottom'): number => {
  return position === 'top' ? -100 : 100
}

export interface AnnouncementBarAction {
  readonly label: string
  readonly onClick?: () => void
  readonly href?: string
  readonly variant?: 'primary' | 'secondary' | 'link'
}

export interface AnnouncementBarProperties {
  readonly variant?: 'top-banner' | 'floating' | 'slide-in' | 'countdown' | 'dismissible'
  readonly message: string | React.ReactNode
  readonly actions?: readonly AnnouncementBarAction[]
  readonly autoHide?: number
  readonly dismissible?: boolean
  readonly sticky?: boolean
  readonly position?: 'top' | 'bottom'
  readonly colorScheme?: 'default' | 'info' | 'success' | 'warning' | 'error' | 'custom'
  readonly customColors?: {
    readonly background?: string
    readonly text?: string
    readonly button?: string
  }
  readonly icon?: React.ReactNode
  readonly countdownTo?: Date
  readonly countdownMessage?: string
  readonly onDismiss?: () => void
  readonly onCountdownEnd?: () => void
  readonly animated?: boolean
  readonly className?: string
  readonly id?: string
}

export function AnnouncementBar({
  variant = 'top-banner',
  message,
  actions = [],
  autoHide,
  dismissible = true,
  sticky = true,
  position = 'top',
  colorScheme = 'default',
  customColors,
  icon,
  countdownTo,
  countdownMessage,
  onDismiss,
  onCountdownEnd,
  animated = true,
  className,
  id = 'announcement-bar',
  ...properties
}: AnnouncementBarProperties) {
  const [isVisible, setIsVisible] = React.useState(true)
  const [timeLeft, setTimeLeft] = React.useState<string>('')
  const [hasExpired, setHasExpired] = React.useState(false)

  const handleDismiss = React.useCallback(() => {
    setIsVisible(false)
    onDismiss?.()
    
    // Save to localStorage
    const dismissedBars = localStorage.getItem('dismissedAnnouncementBars')
    const parsed = dismissedBars ? JSON.parse(dismissedBars) : {}
    parsed[id] = true
    localStorage.setItem('dismissedAnnouncementBars', JSON.stringify(parsed))
  }, [id, onDismiss])

  // Check localStorage for dismissed state
  React.useEffect(() => {
    const dismissedBars = localStorage.getItem('dismissedAnnouncementBars')
    if (dismissedBars) {
      const parsed = JSON.parse(dismissedBars)
      if (parsed[id]) {
        setIsVisible(false)
      }
    }
  }, [id])

  // Auto-hide timer
  React.useEffect(() => {
    if (autoHide && isVisible) {
      const timer = globalThis.setTimeout(() => {
        handleDismiss()
      }, autoHide)
      return () => globalThis.clearTimeout(timer)
    }
  }, [autoHide, isVisible, handleDismiss])

  // Countdown timer
  React.useEffect(() => {
    if (variant === 'countdown' && countdownTo && !hasExpired) {
      const interval = globalThis.setInterval(() => {
        const now = Date.now()
        const target = countdownTo.getTime()
        const difference = target - now

        if (difference > 0) {
          setTimeLeft(formatCountdown(difference))
        } else {
          setHasExpired(true)
          setTimeLeft('Expired')
          onCountdownEnd?.()
          globalThis.clearInterval(interval)
        }
      }, 1000)

      return () => globalThis.clearInterval(interval)
    }
  }, [variant, countdownTo, hasExpired, onCountdownEnd])

  const getIcon = () => {
    if (icon) return icon
    
    switch (colorScheme) {
      case 'info': {
        return <Info className="h-5 w-5" />
      }
      case 'success': {
        return <CheckCircle className="h-5 w-5" />
      }
      case 'warning': {
        return <AlertTriangle className="h-5 w-5" />
      }
      case 'error': {
        return <AlertCircle className="h-5 w-5" />
      }
      default: {
        return null
      }
    }
  }

  const colorSchemeClasses = {
    default: 'bg-slate-900 text-white dark:bg-white dark:text-slate-900',
    info: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
    custom: ''
  }

  const variantClasses = {
    'top-banner': cn(
      'w-full py-3 px-4',
      sticky && position === 'top' && 'fixed top-0 left-0 right-0 z-50',
      sticky && position === 'bottom' && 'fixed bottom-0 left-0 right-0 z-50'
    ),
    'floating': cn(
      'mx-auto max-w-2xl rounded-lg shadow-lg py-3 px-4',
      position === 'top' ? 'fixed top-4 left-1/2 -translate-x-1/2 z-50' : 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50'
    ),
    'slide-in': cn(
      'fixed z-50 max-w-md rounded-lg shadow-xl py-4 px-6',
      position === 'top' ? 'top-4 right-4' : 'bottom-4 right-4'
    ),
    'countdown': cn(
      'w-full py-4 px-4 text-center',
      sticky && position === 'top' && 'fixed top-0 left-0 right-0 z-50',
      sticky && position === 'bottom' && 'fixed bottom-0 left-0 right-0 z-50'
    ),
    'dismissible': cn(
      'w-full py-3 px-4',
      sticky && position === 'top' && 'fixed top-0 left-0 right-0 z-50',
      sticky && position === 'bottom' && 'fixed bottom-0 left-0 right-0 z-50'
    )
  }

  const animationVariants = {
    'top-banner': {
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -100, opacity: 0 }
    },
    'floating': {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 }
    },
    'slide-in': {
      initial: { x: 400, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 400, opacity: 0 }
    },
    'countdown': {
      initial: { y: getAnimationY(position), opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: getAnimationY(position), opacity: 0 }
    },
    'dismissible': {
      initial: { y: getAnimationY(position), opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: getAnimationY(position), opacity: 0 }
    }
  }

  const customStyle = customColors ? {
    backgroundColor: customColors.background,
    color: customColors.text
  } : {}

  const renderContent = () => (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1">
        {getIcon()}
        <div className="flex-1">
          {variant === 'countdown' && countdownTo && (
            <div className="space-y-1">
              <div className="font-medium">{countdownMessage || message}</div>
              <div className="text-2xl font-bold tabular-nums">
                {hasExpired ? 'Expired' : timeLeft}
              </div>
            </div>
          )}
          {(!variant || variant !== 'countdown' || !countdownTo) && (
            <div>{message}</div>
          )}
        </div>
      </div>
      
      {actions.length > 0 && (
        <div className="flex items-center gap-2">
          {actions.map((action, index) => {
            const buttonProps = {
              variant: getButtonVariant(action.variant),
              size: (variant === 'slide-in' ? 'default' : 'sm') as 'default' | 'sm',
              className: cn(
                action.variant === 'link' && 'underline-offset-4 hover:underline',
                customColors?.button && `hover:opacity-90`
              ),
              style: customColors?.button ? { backgroundColor: customColors.button } : {},
              onClick: action.onClick,
              ...(action.href ? { as: 'a' as const, href: action.href } : {})
            }

            return <Button key={index} {...buttonProps}>{action.label}</Button>
          })}
        </div>
      )}
      
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="ml-2 inline-flex rounded-md p-1.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )

  const barElement = (
    <div
      className={cn(
        variantClasses[variant],
        colorScheme !== 'custom' && colorSchemeClasses[colorScheme],
        className
      )}
      style={customStyle}
      {...properties}
    >
      {renderContent()}
    </div>
  )

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        animated ? (
          <motion.div
            initial={animationVariants[variant].initial}
            animate={animationVariants[variant].animate}
            exit={animationVariants[variant].exit}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {barElement}
          </motion.div>
        ) : (
          barElement
        )
      )}
    </AnimatePresence>
  )
}