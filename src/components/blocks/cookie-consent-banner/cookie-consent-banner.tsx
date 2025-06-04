import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Cookie, Settings, Check } from 'lucide-react'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { Switch } from '../../ui/switch'
import { Label } from '../../ui/label'
import { cn } from '../../../lib/utils'

export interface CookieCategory {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly required?: boolean
}

export interface CookieConsentBannerProperties {
  readonly variant?: 'bottom-banner' | 'top-bar' | 'modal' | 'corner-popup' | 'minimal'
  readonly title?: string
  readonly description?: string
  readonly categories?: ReadonlyArray<CookieCategory>
  readonly onAcceptAll?: () => void
  readonly onRejectAll?: () => void
  readonly onSavePreferences?: (preferences: Record<string, boolean>) => void
  readonly onSettingsOpen?: () => void
  readonly animated?: boolean
  readonly className?: string
  readonly cookiePolicyUrl?: string
  readonly privacyPolicyUrl?: string
  readonly storageKey?: string
  readonly children?: React.ReactNode
}

const defaultCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Necessary',
    description: 'Essential cookies for the website to function properly',
    required: true,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Help us understand how visitors interact with the website',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Used to track visitors across websites for marketing purposes',
  },
  {
    id: 'preferences',
    name: 'Preferences',
    description: 'Remember your preferences and settings',
  },
]

function getPositionClasses(variant: CookieConsentBannerProperties['variant']) {
  switch (variant) {
    case 'bottom-banner': {
      return 'bottom-0 left-0 right-0 w-full'
    }
    case 'top-bar': {
      return 'top-0 left-0 right-0 w-full'
    }
    case 'modal': {
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl w-[90vw]'
    }
    case 'corner-popup': {
      return 'bottom-4 right-4 max-w-md'
    }
    case 'minimal': {
      return 'bottom-4 left-4 max-w-sm'
    }
    default: {
      return 'bottom-0 left-0 right-0 w-full'
    }
  }
}

function getAnimationVariants(variant: CookieConsentBannerProperties['variant']) {
  switch (variant) {
    case 'bottom-banner': {
      return {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 },
      }
    }
    case 'top-bar': {
      return {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 },
      }
    }
    case 'modal': {
      return {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.9, opacity: 0 },
      }
    }
    case 'corner-popup':
    case 'minimal': {
      return {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 },
      }
    }
    default: {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    }
  }
}

interface SettingsPanelProperties {
  readonly categories: ReadonlyArray<CookieCategory>
  readonly preferences: Record<string, boolean>
  readonly onToggleCategory: (categoryId: string, checked: boolean) => void
  readonly onSave: () => void
  readonly onCancel: () => void
}

function SettingsPanel({ categories, preferences, onToggleCategory, onSave, onCancel }: SettingsPanelProperties) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Cookie Preferences</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-start space-x-3 py-3 border-b last:border-0"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center">
                <Label
                  htmlFor={`cookie-${category.id}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  {category.name}
                  {category.required && (
                    <span className="text-xs text-muted-foreground ml-2">(Required)</span>
                  )}
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                {category.description}
              </p>
            </div>
            <Switch
              id={`cookie-${category.id}`}
              checked={preferences[category.id] || false}
              onCheckedChange={(checked) => onToggleCategory(category.id, checked)}
              disabled={category.required}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={onSave}>
          <Check className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

interface BannerContentProperties {
  readonly variant: CookieConsentBannerProperties['variant']
  readonly title: string
  readonly description: string
  readonly cookiePolicyUrl?: string
  readonly privacyPolicyUrl?: string
  readonly onAcceptAll: () => void
  readonly onRejectAll: () => void
  readonly onOpenSettings: () => void
  readonly onClose: () => void
}

function BannerContent({ 
  variant, 
  title, 
  description, 
  cookiePolicyUrl, 
  privacyPolicyUrl,
  onAcceptAll,
  onRejectAll,
  onOpenSettings,
  onClose
}: BannerContentProperties) {
  return (
    <div className={cn(
      'space-y-4',
      variant === 'minimal' && 'space-y-3'
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Cookie className={cn(
            'text-primary mt-0.5',
            variant === 'minimal' ? 'w-4 h-4' : 'w-5 h-5'
          )} />
          <div className="space-y-1">
            <h3 className={cn(
              'font-semibold',
              variant === 'minimal' ? 'text-sm' : 'text-base'
            )}>
              {title}
            </h3>
            <p className={cn(
              'text-muted-foreground',
              variant === 'minimal' ? 'text-xs' : 'text-sm'
            )}>
              {description}
              {(cookiePolicyUrl || privacyPolicyUrl) && (
                <span className="block mt-1">
                  {cookiePolicyUrl && (
                    <a
                      href={cookiePolicyUrl}
                      className="underline hover:no-underline mr-3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cookie Policy
                    </a>
                  )}
                  {privacyPolicyUrl && (
                    <a
                      href={privacyPolicyUrl}
                      className="underline hover:no-underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                  )}
                </span>
              )}
            </p>
          </div>
        </div>
        {variant !== 'minimal' && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 -mt-2 -mr-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className={cn(
        'flex flex-wrap gap-2',
        variant === 'minimal' && 'gap-1.5'
      )}>
        <Button
          size={variant === 'minimal' ? 'sm' : 'default'}
          onClick={onAcceptAll}
        >
          Accept All
        </Button>
        {variant !== 'minimal' && (
          <>
            <Button
              variant="outline"
              size="default"
              onClick={onRejectAll}
            >
              Reject All
            </Button>
            <Button
              variant="ghost"
              size="default"
              onClick={onOpenSettings}
            >
              <Settings className="h-4 w-4 mr-2" />
              Manage Preferences
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export function CookieConsentBanner({
  variant = 'bottom-banner',
  title = 'We use cookies',
  description = 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.',
  categories = defaultCategories,
  onAcceptAll,
  onRejectAll,
  onSavePreferences,
  onSettingsOpen,
  animated = true,
  className,
  cookiePolicyUrl,
  privacyPolicyUrl,
  storageKey = 'cookie-consent',
  children,
  ...properties
}: CookieConsentBannerProperties) {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const storedConsent = localStorage.getItem(storageKey)
    if (!storedConsent) {
      setIsVisible(true)
      const initialPreferences: Record<string, boolean> = {}
      for (const category of categories) {
        initialPreferences[category.id] = category.required || false
      }
      setPreferences(initialPreferences)
    }
  }, [categories, storageKey])

  const handleAcceptAll = () => {
    const allAccepted: Record<string, boolean> = {}
    for (const category of categories) {
      allAccepted[category.id] = true
    }
    localStorage.setItem(storageKey, JSON.stringify({ preferences: allAccepted, timestamp: Date.now() }))
    setIsVisible(false)
    onAcceptAll?.()
  }

  const handleRejectAll = () => {
    const allRejected: Record<string, boolean> = {}
    for (const category of categories) {
      allRejected[category.id] = category.required || false
    }
    localStorage.setItem(storageKey, JSON.stringify({ preferences: allRejected, timestamp: Date.now() }))
    setIsVisible(false)
    onRejectAll?.()
  }

  const handleSavePreferences = () => {
    localStorage.setItem(storageKey, JSON.stringify({ preferences, timestamp: Date.now() }))
    setIsVisible(false)
    setShowSettings(false)
    onSavePreferences?.(preferences)
  }

  const handleToggleCategory = (categoryId: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [categoryId]: checked,
    }))
  }

  const MotionWrapper = animated ? motion.div : 'div'
  const animationProps = animated ? getAnimationVariants(variant) : {}

  if (!isVisible) return null

  return (
    <>
      {variant === 'modal' && (
        <AnimatePresence>
          {animated ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsVisible(false)}
            />
          ) : (
            <button
              type="button"
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsVisible(false)}
              aria-label="Close cookie consent modal"
            />
          )}
        </AnimatePresence>
      )}
      
      <AnimatePresence>
        <MotionWrapper
          {...animationProps}
          className={cn(
            'fixed z-50',
            getPositionClasses(variant),
            className
          )}
          {...properties}
        >
          <Card className={cn(
            'p-6',
            variant === 'minimal' && 'p-4',
            variant === 'top-bar' && 'rounded-none border-t-0 border-x-0',
            variant === 'bottom-banner' && 'rounded-none border-b-0 border-x-0'
          )}>
            {showSettings ? (
              <SettingsPanel
                categories={categories}
                preferences={preferences}
                onToggleCategory={handleToggleCategory}
                onSave={handleSavePreferences}
                onCancel={() => setShowSettings(false)}
              />
            ) : (
              <BannerContent
                variant={variant}
                title={title}
                description={description}
                cookiePolicyUrl={cookiePolicyUrl}
                privacyPolicyUrl={privacyPolicyUrl}
                onAcceptAll={handleAcceptAll}
                onRejectAll={handleRejectAll}
                onOpenSettings={() => {
                  setShowSettings(true)
                  onSettingsOpen?.()
                }}
                onClose={() => setIsVisible(false)}
              />
            )}

            {children}
          </Card>
        </MotionWrapper>
      </AnimatePresence>
    </>
  )
}