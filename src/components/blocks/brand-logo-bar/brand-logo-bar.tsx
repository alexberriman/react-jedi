import React, { useState, useEffect } from 'react'
import { cn } from '../../../lib/utils'
import { Image } from '../../ui/image'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import { motion } from 'framer-motion'

export interface Logo {
  id: string
  name: string
  lightSrc: string
  darkSrc?: string
  href?: string
  width?: number
  height?: number
}

export interface BrandLogoBarProperties {
  readonly logos: Logo[]
  readonly variant?: 'scrolling' | 'grid' | 'withHeading' | 'grayscale' | 'compact'
  readonly heading?: string
  readonly headingPosition?: 'above' | 'left'
  readonly size?: 'small' | 'medium' | 'large'
  readonly spacing?: 'tight' | 'normal' | 'loose'
  readonly pauseOnHover?: boolean
  readonly scrollSpeed?: number
  readonly columns?: 2 | 3 | 4 | 5 | 6
  readonly animated?: boolean
  readonly className?: string
  readonly children?: React.ReactNode
}

const logoSizeMap = {
  small: { width: 80, height: 40 },
  medium: { width: 120, height: 60 },
  large: { width: 160, height: 80 }
}

const spacingMap = {
  tight: 'gap-4',
  normal: 'gap-8',
  loose: 'gap-12'
}

const columnsMap = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
}

function BrandLogoBar({
  logos,
  variant = 'grid',
  heading = 'Trusted by leading companies',
  headingPosition = 'above',
  size = 'medium',
  spacing = 'normal',
  pauseOnHover = true,
  scrollSpeed = 30,
  columns = 4,
  animated = true,
  className,
  ...properties
}: BrandLogoBarProperties) {
  const [isPaused, setIsPaused] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const logoSize = logoSizeMap[size]

  // Check for dark mode on mount and when it changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    
    // Watch for changes to the document class
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const LogoItem = ({ logo, index }: { logo: Logo; index: number }) => {
    const [isHovered, setIsHovered] = useState(false)
    const logoSrc = isDarkMode && logo.darkSrc ? logo.darkSrc : logo.lightSrc
    
    const logoElement = (
      <Box
        className={cn(
          'relative flex items-center justify-center overflow-hidden transition-all duration-300 ease-out',
          variant === 'compact' ? 'p-2' : 'p-4',
          'rounded-lg'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          className={cn(
            'transition-all duration-300 ease-out',
            variant === 'grayscale' && 'grayscale',
            variant === 'grayscale' && isHovered && 'grayscale-0',
            animated && isHovered && !variant.includes('grayscale') && 'scale-105'
          )}
        >
          <Image
            src={logoSrc}
            alt={logo.name}
            width={logo.width || logoSize.width}
            height={logo.height || logoSize.height}
            className="object-contain w-full h-full"
          />
        </Box>
      </Box>
    )

    if (logo.href) {
      return (
        <a
          key={logo.id}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={`Visit ${logo.name}`}
        >
          {logoElement}
        </a>
      )
    }

    return <div key={logo.id}>{logoElement}</div>
  }

  const ScrollingMarquee = () => {
    const duplicatedLogos = [...logos, ...logos]
    
    return (
      <Box
        className="relative overflow-hidden py-4"
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <motion.div
          className={cn('flex', spacingMap[spacing], 'w-max')}
          animate={{
            x: isPaused ? 0 : '-50%'
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: scrollSpeed,
              ease: 'linear'
            }
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <Box key={`${logo.id}-${index}`} className="flex-shrink-0">
              <LogoItem logo={logo} index={index} />
            </Box>
          ))}
        </motion.div>
      </Box>
    )
  }

  const GridLayout = () => (
    <Box
      className={cn(
        'grid',
        columnsMap[columns],
        spacingMap[spacing],
        'items-center justify-items-center'
      )}
    >
      {logos.map((logo, index) => (
        <LogoItem key={logo.id} logo={logo} index={index} />
      ))}
    </Box>
  )

  const renderContent = () => {
    if (variant === 'scrolling') {
      return <ScrollingMarquee />
    }
    
    return <GridLayout />
  }

  const headingElement = (variant === 'withHeading' || heading) && (
    <Text
      className={cn(
        'text-sm font-medium text-muted-foreground',
        headingPosition === 'above' ? 'text-center mb-8' : 'flex-shrink-0'
      )}
      element="p"
    >
      {heading}
    </Text>
  )

  if (headingPosition === 'left' && headingElement) {
    return (
      <Box
        className={cn(
          'py-8 md:py-12',
          className
        )}
        {...properties}
      >
        <Box className="flex items-center gap-8">
          {headingElement}
          {renderContent()}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      className={cn(
        'py-8 md:py-12',
        className
      )}
      {...properties}
    >
      {headingElement}
      {renderContent()}
    </Box>
  )
}

BrandLogoBar.displayName = 'BrandLogoBar'

export { BrandLogoBar }