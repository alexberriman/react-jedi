import React, { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export interface ProcessStep {
  title: string
  description?: string
  icon?: React.ReactNode
  number?: string | number
  status?: 'completed' | 'current' | 'upcoming' | 'disabled'
  badge?: string
  branches?: ProcessStep[]
}

export interface ProcessStepsProps {
  steps: ProcessStep[]
  variant?: 'horizontal' | 'vertical' | 'circular' | 'cards' | 'branching'
  currentStep?: number
  completedSteps?: number[]
  showConnectors?: boolean
  connectorStyle?: 'solid' | 'dashed' | 'arrow'
  animated?: boolean
  interactive?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onStepClick?: (stepIndex: number) => void
  children?: React.ReactNode
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

const iconSizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20'
}

const connectorHeights = {
  sm: 'h-20',
  md: 'h-24',
  lg: 'h-28'
}

const getConnectorPosition = (size: string) => {
  if (size === 'sm') return '20px'
  if (size === 'md') return '28px'
  return '40px'
}

const getConnectorHeight = (size: string) => {
  if (size === 'sm') return '80px'
  if (size === 'md') return '96px'
  return '112px'
}

const getIconTextSize = (size: string) => {
  if (size === 'sm') return 'text-base'
  if (size === 'md') return 'text-xl'
  return 'text-2xl'
}

const getDescriptionTextSize = (size: string) => {
  if (size === 'sm') return 'text-xs'
  if (size === 'md') return 'text-sm'
  return 'text-base'
}

const getVerticalSpacing = (size: string) => {
  if (size === 'sm') return 'space-y-20'
  if (size === 'md') return 'space-y-24'
  return 'space-y-28'
}

const getStepStatusClasses = (status: string) => {
  switch (status) {
    case 'completed': {
      return 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-emerald-200'
    }
    case 'current': {
      return 'bg-gradient-to-br from-blue-400 to-blue-600 text-white ring-4 ring-blue-400/30 shadow-blue-200'
    }
    case 'upcoming': {
      return 'bg-gradient-to-br from-gray-50 to-gray-200 text-gray-600 shadow-gray-200'
    }
    case 'disabled': {
      return 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400 shadow-gray-100'
    }
    default: {
      return ''
    }
  }
}

const getTitleColorClasses = (status: string) => {
  switch (status) {
    case 'completed': {
      return 'text-emerald-700'
    }
    case 'current': {
      return 'text-blue-700'
    }
    case 'upcoming': {
      return 'text-gray-700'
    }
    case 'disabled': {
      return 'text-gray-400'
    }
    default: {
      return ''
    }
  }
}

const getDescriptionColorClasses = (status: string) => {
  switch (status) {
    case 'completed': {
      return 'text-emerald-600'
    }
    case 'current': {
      return 'text-blue-600'
    }
    case 'upcoming': {
      return 'text-gray-600'
    }
    case 'disabled': {
      return 'text-gray-400'
    }
    default: {
      return ''
    }
  }
}

const getCardStatusClasses = (status: string) => {
  switch (status) {
    case 'completed': {
      return 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100/50 shadow-lg shadow-emerald-100'
    }
    case 'current': {
      return 'border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100/50 ring-2 ring-blue-400/20 shadow-lg shadow-blue-100'
    }
    case 'upcoming': {
      return 'border-gray-200 bg-gradient-to-br from-white to-gray-50/50 shadow-md'
    }
    case 'disabled': {
      return 'border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100/50 opacity-60'
    }
    default: {
      return ''
    }
  }
}

const getCardIconStatusClasses = (status: string) => {
  switch (status) {
    case 'completed': {
      return 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white'
    }
    case 'current': {
      return 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
    }
    case 'upcoming': {
      return 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'
    }
    case 'disabled': {
      return 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400'
    }
    default: {
      return ''
    }
  }
}

export function ProcessSteps({
  steps,
  variant = 'horizontal',
  currentStep,
  completedSteps = [],
  showConnectors = true,
  connectorStyle = 'solid',
  animated = true,
  interactive = false,
  size = 'md',
  className,
  onStepClick,
  ...properties
}: Readonly<ProcessStepsProps>) {
  const enrichedSteps = useMemo(() => {
    return steps.map((step, index) => {
      let status = step.status
      if (!status) {
        if (completedSteps.includes(index)) {
          status = 'completed'
        } else if (currentStep === index) {
          status = 'current'
        } else if (currentStep !== undefined && index < currentStep) {
          status = 'completed'
        } else {
          status = 'upcoming'
        }
      }
      return { ...step, status }
    })
  }, [steps, currentStep, completedSteps])

  const renderStepIcon = (step: ProcessStep & { status: string }, index: number) => {
    if (step.icon) {
      return (
        <div className={cn('flex items-center justify-center', getIconTextSize(size))}>
          {step.icon}
        </div>
      )
    }
    
    if (step.status === 'completed') {
      return <Check className={cn('w-1/2 h-1/2')} />
    }
    
    return (
      <span className={cn('font-semibold', sizeClasses[size])}>
        {step.number || index + 1}
      </span>
    )
  }

  const renderStep = (step: ProcessStep & { status: string }, index: number) => {
    const isClickable = interactive && step.status !== 'disabled'
    const StepWrapper = animated ? motion.div : 'div'
    const animationProps = animated ? {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.1 }
    } : {}

    return (
      <StepWrapper
        key={index}
        className={cn(
          'relative flex flex-col items-center',
          isClickable && 'cursor-pointer',
          step.status === 'disabled' && 'opacity-50'
        )}
        onClick={() => isClickable && onStepClick?.(index)}
        {...animationProps}
      >
        <div
          className={cn(
            'relative flex items-center justify-center rounded-full transition-all duration-300 shadow-lg',
            iconSizeClasses[size],
            getStepStatusClasses(step.status),
            isClickable && 'hover:scale-110 hover:shadow-xl cursor-pointer'
          )}
        >
          {renderStepIcon(step, index)}
          {step.badge && (
            <span className="absolute -top-2 -right-2 px-2.5 py-0.5 text-xs font-medium bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full shadow-md">
              {step.badge}
            </span>
          )}
        </div>
        <div className={cn('mt-4 text-center', variant === 'horizontal' && 'max-w-[180px]')}>
          <h3 className={cn(
            'font-semibold transition-colors duration-200',
            sizeClasses[size],
            getTitleColorClasses(step.status)
          )}>
            {step.title}
          </h3>
          {step.description && (
            <p className={cn(
              'mt-1 transition-colors duration-200',
              getDescriptionTextSize(size),
              getDescriptionColorClasses(step.status)
            )}>
              {step.description}
            </p>
          )}
        </div>
      </StepWrapper>
    )
  }

  const getConnectorClasses = (isCompleted: boolean, isHorizontal: boolean) => {
    const classes = [isHorizontal ? 'absolute h-1 origin-left' : 'absolute w-1 origin-top']
    
    if (isHorizontal) {
      classes.push(isCompleted ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-gray-200 to-gray-300')
    } else {
      classes.push(isCompleted ? 'bg-gradient-to-b from-emerald-400 to-emerald-500' : 'bg-gradient-to-b from-gray-200 to-gray-300')
    }
    
    if (connectorStyle === 'dashed') {
      classes.push(isHorizontal ? 'bg-none border-t-2 border-dashed' : 'bg-none border-l-2 border-dashed')
      classes.push(isCompleted ? 'border-emerald-400' : 'border-gray-300')
    }
    
    return classes
  }

  const renderHorizontalConnector = (index: number, isCompleted: boolean, stepWidth?: number) => {
    const ConnectorWrapper = animated ? motion.div : 'div'
    const animationProps = animated ? {
      initial: { scaleX: 0 },
      animate: { scaleX: 1 },
      transition: { delay: index * 0.1 + 0.2, duration: 0.4 }
    } : {}
    
    const iconSize = iconSizeClasses[size].split(' ')[0].replace('w-', '')
    const iconSizeNum = Number.parseInt(iconSize) * 4
    
    return (
      <ConnectorWrapper
        className={cn(...getConnectorClasses(isCompleted, true))}
        style={{ 
          width: stepWidth ? `calc(${stepWidth}px - ${iconSizeNum}px - 1rem)` : '100px',
          left: `calc(50% + ${iconSizeNum / 2}px)`,
          top: getConnectorPosition(size)
        }}
        {...animationProps}
      />
    )
  }

  const renderVerticalConnector = (index: number, isCompleted: boolean) => {
    const ConnectorWrapper = animated ? motion.div : 'div'
    const animationProps = animated ? {
      initial: { scaleY: 0 },
      animate: { scaleY: 1 },
      transition: { delay: index * 0.1 + 0.2, duration: 0.4 }
    } : {}
    
    const iconSize = iconSizeClasses[size].split(' ')[1].replace('h-', '')
    const iconSizeNum = Number.parseInt(iconSize) * 4
    
    return (
      <ConnectorWrapper
        className={cn(...getConnectorClasses(isCompleted, false))}
        style={{ 
          height: getConnectorHeight(size),
          left: getConnectorPosition(size),
          top: `calc(50% + ${iconSizeNum / 2}px)`
        }}
        {...animationProps}
      />
    )
  }

  const renderConnector = (index: number, stepWidth?: number) => {
    if (!showConnectors || index === enrichedSteps.length - 1) return null
    
    const isCompleted = enrichedSteps[index].status === 'completed' && 
                       enrichedSteps[index + 1].status !== 'upcoming'
    
    if (variant === 'horizontal') {
      return renderHorizontalConnector(index, isCompleted, stepWidth)
    }

    if (variant === 'vertical') {
      return renderVerticalConnector(index, isCompleted)
    }

    return null
  }

  if (variant === 'horizontal') {
    return (
      <div className={cn('relative', className)} {...properties}>
        <div className="flex items-start justify-between overflow-x-auto pb-4">
          {enrichedSteps.map((step, index, arr) => {
            const stepWidth = arr.length > 1 ? Math.max(200, 100 / arr.length) : 200
            return (
              <div 
                key={index} 
                className="relative flex-1 flex flex-col items-center"
                style={{ minWidth: `${stepWidth}px` }}
              >
                {renderStep(step, index)}
                {index < arr.length - 1 && (
                  <div className="absolute inset-0 flex items-start justify-end pointer-events-none"
                       style={{ paddingTop: getConnectorPosition(size) }}>
                    {renderConnector(index, stepWidth)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div className={cn('relative', className)} {...properties}>
        <div className={cn(
          getVerticalSpacing(size)
        )}>
          {enrichedSteps.map((step, index) => (
            <div key={index} className="relative">
              {renderStep(step, index)}
              {renderConnector(index)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'circular') {
    let radius = 200
    if (size === 'sm') {
      radius = 100
    } else if (size === 'md') {
      radius = 150
    }
    const angleStep = (2 * Math.PI) / enrichedSteps.length
    const startAngle = -Math.PI / 2

    return (
      <div className={cn('relative mx-auto', className)} 
           style={{ width: radius * 2 + 100, height: radius * 2 + 100 }}
           {...properties}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${radius * 2 + 100} ${radius * 2 + 100}`}
        >
          {showConnectors && enrichedSteps.map((step, index) => {
            const angle = startAngle + index * angleStep
            const nextAngle = startAngle + ((index + 1) % enrichedSteps.length) * angleStep
            const x1 = radius + 50 + radius * Math.cos(angle)
            const y1 = radius + 50 + radius * Math.sin(angle)
            const x2 = radius + 50 + radius * Math.cos(nextAngle)
            const y2 = radius + 50 + radius * Math.sin(nextAngle)
            
            const isCompleted = step.status === 'completed'
            
            return (
              <line
                key={`connector-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isCompleted ? '#34d399' : '#e5e7eb'}
                strokeWidth="2"
                strokeDasharray={connectorStyle === 'dashed' ? '5,5' : undefined}
              />
            )
          })}
        </svg>
        {enrichedSteps.map((step, index) => {
          const angle = startAngle + index * angleStep
          const x = radius + 50 + radius * Math.cos(angle)
          const y = radius + 50 + radius * Math.sin(angle)
          
          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: x, top: y }}
            >
              {renderStep(step, index)}
            </div>
          )
        })}
      </div>
    )
  }

  const renderCardStep = (step: ProcessStep & { status: string }, index: number) => {
    const isClickable = interactive && step.status !== 'disabled'
    const CardWrapper = animated ? motion.div : 'div'
    const animationProps = animated ? {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: index * 0.1 }
    } : {}

    return (
      <CardWrapper
        key={index}
        className={cn(
          'relative p-6 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm',
          getCardStatusClasses(step.status),
          isClickable && 'cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1'
        )}
        onClick={() => isClickable && onStepClick?.(index)}
        {...animationProps}
      >
        <div className="flex items-start space-x-4">
          <div
            className={cn(
              'flex-shrink-0 flex items-center justify-center rounded-full shadow-md transition-all duration-300',
              iconSizeClasses[size],
              getCardIconStatusClasses(step.status)
            )}
          >
            {renderStepIcon(step, index)}
          </div>
          <div className="flex-1">
            <h3 className={cn('font-semibold', sizeClasses[size])}>
              {step.title}
            </h3>
            {step.description && (
              <p className={cn('mt-1 text-gray-600', getDescriptionTextSize(size))}>
                {step.description}
              </p>
            )}
          </div>
        </div>
        {step.badge && (
          <span className="absolute -top-2 -right-2 px-3 py-1 text-xs font-medium bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full shadow-md">
            {step.badge}
          </span>
        )}
      </CardWrapper>
    )
  }

  if (variant === 'cards') {
    return (
      <div className={cn('grid gap-6', 
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )} {...properties}>
        {enrichedSteps.map((step, index) => renderCardStep(step, index))}
      </div>
    )
  }

  if (variant === 'branching') {
    return (
      <div className={cn('relative', className)} {...properties}>
        <div className="space-y-8">
          {enrichedSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start space-x-4">
                {renderStep(step, index)}
              </div>
              {step.branches && step.branches.length > 0 && (
                <div className="ml-16 mt-4 space-y-4">
                  <div className="relative before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gray-300">
                    {step.branches.map((branch, branchIndex) => (
                      <div key={branchIndex} className="relative pl-8">
                        <div className="absolute left-0 top-6 w-8 h-0.5 bg-gray-300" />
                        {renderStep({ ...branch, status: branch.status || 'upcoming' }, index * 100 + branchIndex)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {index < enrichedSteps.length - 1 && !step.branches && renderConnector(index)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}