import React, { useState, useMemo } from 'react'
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaReddit,
  FaEnvelope,
  FaLink,
  FaTimes,
  FaShare
} from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../../lib/utils'

export interface SocialShareBarProperties {
  /**
   * The URL to share. Defaults to current page URL.
   */
  readonly url?: string
  /**
   * The title/text to share.
   */
  readonly title?: string
  /**
   * Additional description for the share.
   */
  readonly description?: string
  /**
   * The variant of the share bar.
   * @default 'horizontal'
   */
  readonly variant?: 'horizontal' | 'vertical' | 'floating' | 'modal' | 'minimal'
  /**
   * Position when using floating variant.
   * @default 'bottom-right'
   */
  readonly position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right'
  /**
   * Whether to show share counts (requires API integration).
   * @default false
   */
  readonly showCounts?: boolean
  /**
   * Whether to animate the component.
   * @default true
   */
  readonly animated?: boolean
  /**
   * Platforms to include in the share bar.
   * @default ['twitter', 'facebook', 'linkedin', 'reddit', 'email', 'copy']
   */
  readonly platforms?: ReadonlyArray<'twitter' | 'facebook' | 'linkedin' | 'reddit' | 'email' | 'copy'>
  /**
   * Whether the floating variant should be sticky.
   * @default true
   */
  readonly sticky?: boolean
  /**
   * Additional CSS classes.
   */
  readonly className?: string
  /**
   * Callback when a platform is shared.
   */
  readonly onShare?: (platform: string) => void
  /**
   * Custom share counts object.
   */
  readonly counts?: Readonly<Record<string, number>>
  /**
   * Size of the share buttons.
   * @default 'md'
   */
  readonly size?: 'sm' | 'md' | 'lg'
  /**
   * Whether to show labels with icons.
   * @default true for horizontal, false for others
   */
  readonly showLabels?: boolean
  /**
   * Custom color scheme.
   * @default 'default'
   */
  readonly colorScheme?: 'default' | 'brand' | 'monochrome' | 'gradient'
}

const platformConfig = {
  twitter: {
    name: 'Twitter',
    icon: FaTwitter,
    color: '#1DA1F2',
    shareUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  },
  facebook: {
    name: 'Facebook',
    icon: FaFacebook,
    color: '#1877F2',
    shareUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  linkedin: {
    name: 'LinkedIn',
    icon: FaLinkedin,
    color: '#0A66C2',
    shareUrl: (url: string, title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  },
  reddit: {
    name: 'Reddit',
    icon: FaReddit,
    color: '#FF4500',
    shareUrl: (url: string, title: string) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  },
  email: {
    name: 'Email',
    icon: FaEnvelope,
    color: '#6B7280',
    shareUrl: (url: string, title: string, description?: string) => {
      const subject = encodeURIComponent(title)
      const body = encodeURIComponent(`${description || title}\n\n${url}`)
      return `mailto:?subject=${subject}&body=${body}`
    }
  },
  copy: {
    name: 'Copy Link',
    icon: FaLink,
    color: '#6B7280',
    shareUrl: () => ''
  }
}

type ShareButtonProps = {
  readonly platform: string
  readonly url: string
  readonly title: string
  readonly description?: string
  readonly onShare?: (platform: string) => void
  readonly showCounts: boolean
  readonly counts?: Readonly<Record<string, number>>
  readonly size: 'sm' | 'md' | 'lg'
  readonly showLabels: boolean
  readonly colorScheme: 'default' | 'brand' | 'monochrome' | 'gradient'
  readonly animated: boolean
  readonly copiedLink: boolean
  readonly setCopiedLink: (value: boolean) => void
}

const sizeClasses = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg'
}

const labelSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base'
}

function getButtonColorClasses(platform: string, colorScheme: string) {
  if (colorScheme === 'monochrome') {
    return 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
  }
  if (colorScheme === 'gradient') {
    return 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
  }
  if (colorScheme === 'brand') {
    return `text-white hover:opacity-90`
  }
  return 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
}

function ShareButton({
  platform,
  url,
  title,
  description,
  onShare,
  showCounts,
  counts,
  size,
  showLabels,
  colorScheme,
  animated,
  copiedLink,
  setCopiedLink
}: ShareButtonProps) {
  const platformConfigItem = platformConfig[platform as keyof typeof platformConfig]
  if (!platformConfigItem) return null

  const Icon = platformConfigItem.icon
  const isCopied = platform === 'copy' && copiedLink

  const handleClick = async () => {
    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url)
        setCopiedLink(true)
        globalThis.setTimeout(() => setCopiedLink(false), 2000)
      } catch (error) {
        console.error('Failed to copy link:', error)
      }
    } else {
      const shareUrl = platform === 'email' 
        ? platformConfigItem.shareUrl(url, title, description)
        : platformConfigItem.shareUrl(url, title)
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
    
    onShare?.(platform)
  }

  return (
    <motion.button
      whileHover={animated ? { scale: 1.05 } : undefined}
      whileTap={animated ? { scale: 0.95 } : undefined}
      onClick={handleClick}
      className={cn(
        'relative flex items-center justify-center rounded-lg transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        sizeClasses[size],
        getButtonColorClasses(platform, colorScheme),
        showLabels && 'w-auto gap-2 px-4'
      )}
      style={
        colorScheme === 'brand' && platformConfigItem?.color
          ? { backgroundColor: platformConfigItem.color }
          : undefined
      }
      aria-label={`Share on ${platformConfigItem.name}`}
    >
      <Icon className={cn('flex-shrink-0', showLabels && 'mr-1')} />
      {showLabels && (
        <span className={cn('font-medium', labelSizeClasses[size])}>
          {isCopied ? 'Copied!' : platformConfigItem.name}
        </span>
      )}
      {showCounts && counts?.[platform] ? (
        <span className={cn(
          'absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white',
          size === 'sm' && 'h-4 w-4 text-[8px]',
          size === 'lg' && 'h-6 w-6 text-xs'
        )}>
          {counts[platform] > 999 ? '999+' : counts[platform]}
        </span>
      ) : null}
    </motion.button>
  )
}

type VariantProps = SocialShareBarProperties & {
  readonly ShareButtons: React.FC
}

function HorizontalVariant({ sticky, className, ShareButtons, animated, size, position, ...rest }: VariantProps) {
  // Extract non-DOM props
  const { url, title, description, variant, showCounts, platforms, onShare, counts, showLabels, colorScheme, ...domProps } = rest
  
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        sticky && 'sticky top-4 z-40',
        className
      )}
      {...domProps}
    >
      <ShareButtons />
    </div>
  )
}

function VerticalVariant({ sticky, className, ShareButtons, animated, size, position, ...rest }: VariantProps) {
  // Extract non-DOM props
  const { url, title, description, variant, showCounts, platforms, onShare, counts, showLabels, colorScheme, ...domProps } = rest
  
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        sticky && 'sticky top-20 z-40',
        className
      )}
      {...domProps}
    >
      <ShareButtons />
    </div>
  )
}

function FloatingVariant({ 
  position = 'bottom-right', 
  className, 
  ShareButtons, 
  animated,
  size,
  sticky,
  ...rest 
}: VariantProps) {
  const [isFloatingExpanded, setIsFloatingExpanded] = useState(false)

  // Extract non-DOM props
  const { url, title, description, variant, showCounts, platforms, onShare, counts, showLabels, colorScheme, ...domProps } = rest

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'center-left': 'top-1/2 left-4 -translate-y-1/2',
    'center-right': 'top-1/2 right-4 -translate-y-1/2'
  }

  return (
    <div
      className={cn('fixed z-50', positionClasses[position], className)}
      {...domProps}
    >
      <AnimatePresence>
        {isFloatingExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col gap-2 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800"
          >
            <button
              onClick={() => setIsFloatingExpanded(false)}
              className="self-end rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close share menu"
            >
              <FaTimes className="h-4 w-4" />
            </button>
            <ShareButtons />
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={animated ? { scale: 1.1 } : undefined}
            whileTap={animated ? { scale: 0.9 } : undefined}
            onClick={() => setIsFloatingExpanded(true)}
            className={cn(
              'flex items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              size === 'sm' ? sizeClasses.md : sizeClasses.lg
            )}
            aria-label="Open share menu"
          >
            <FaShare />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

function ModalVariant({ className, ShareButtons, animated, size, position, sticky, ...rest }: VariantProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Extract non-DOM props
  const { url, title, description, variant, showCounts, platforms, onShare, counts, showLabels, colorScheme, ...domProps } = rest

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          'flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          className
        )}
        {...domProps}
      >
        <FaShare />
        Share
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-50 bg-black bg-opacity-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Share this content
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Close modal"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <ShareButtons />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function MinimalVariant({ className, ShareButtons, animated, size, position, sticky, ...rest }: VariantProps) {
  // Extract non-DOM props
  const { url, title, description, variant, showCounts, platforms, onShare, counts, showLabels, colorScheme, ...domProps } = rest
  
  return (
    <div
      className={cn('flex items-center gap-1', className)}
      {...domProps}
    >
      <ShareButtons />
    </div>
  )
}

export function SocialShareBar({
  url = globalThis.window === undefined ? '' : globalThis.location.href,
  title = globalThis.window === undefined ? '' : document.title,
  description,
  variant = 'horizontal',
  position = 'bottom-right',
  showCounts = false,
  animated = true,
  platforms = ['twitter', 'facebook', 'linkedin', 'reddit', 'email', 'copy'],
  sticky = true,
  className,
  onShare,
  counts = {},
  size = 'md',
  showLabels,
  colorScheme = 'default',
  ...properties
}: SocialShareBarProperties) {
  const [copiedLink, setCopiedLink] = useState(false)
  const shouldShowLabels = showLabels ?? variant === 'horizontal'

  const ShareButtons = useMemo(() => {
    const ButtonsComponent = () => (
      <>
        {platforms.map((platform) => (
          <ShareButton
            key={platform}
            platform={platform}
            url={url}
            title={title}
            description={description}
            onShare={onShare}
            showCounts={showCounts}
            counts={counts}
            size={size}
            showLabels={shouldShowLabels}
            colorScheme={colorScheme}
            animated={animated}
            copiedLink={copiedLink}
            setCopiedLink={setCopiedLink}
          />
        ))}
      </>
    )
    ButtonsComponent.displayName = 'ShareButtons'
    return ButtonsComponent
  }, [platforms, url, title, description, onShare, showCounts, counts, size, shouldShowLabels, colorScheme, animated, copiedLink])

  const variantProps = {
    ...properties,
    position,
    sticky,
    className,
    ShareButtons,
    animated,
    size
  }

  switch (variant) {
    case 'horizontal': {
      return <HorizontalVariant {...variantProps} />
    }
    case 'vertical': {
      return <VerticalVariant {...variantProps} />
    }
    case 'floating': {
      return <FloatingVariant {...variantProps} />
    }
    case 'modal': {
      return <ModalVariant {...variantProps} />
    }
    case 'minimal': {
      return <MinimalVariant {...variantProps} />
    }
    default: {
      return null
    }
  }
}
