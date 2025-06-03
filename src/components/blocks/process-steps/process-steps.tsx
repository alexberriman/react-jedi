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
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
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
            'relative flex items-center justify-center rounded-full transition-all',
            iconSizeClasses[size],
            step.status === 'completed' && 'bg-green-500 text-white',
            step.status === 'current' && 'bg-blue-500 text-white ring-4 ring-blue-500/20',
            step.status === 'upcoming' && 'bg-gray-200 text-gray-500',
            step.status === 'disabled' && 'bg-gray-100 text-gray-400',
            isClickable && 'hover:scale-110'
          )}
        >
          {renderStepIcon(step, index)}
          {step.badge && (
            <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">
              {step.badge}
            </span>
          )}
        </div>
        <div className={cn('mt-3 text-center', variant === 'horizontal' && 'max-w-[150px]')}>
          <h3 className={cn('font-semibold', sizeClasses[size], step.status === 'disabled' && 'text-gray-400')}>
            {step.title}
          </h3>
          {step.description && (
            <p className={cn('mt-1 text-gray-600', getDescriptionTextSize(size))}>
              {step.description}
            </p>
          )}
        </div>
      </StepWrapper>
    )
  }

  const renderConnector = (index: number) => {
    if (!showConnectors || index === enrichedSteps.length - 1) return null
    
    const isCompleted = enrichedSteps[index].status === 'completed' && 
                       enrichedSteps[index + 1].status !== 'upcoming'
    
    const ConnectorWrapper = animated ? motion.div : 'div'
    const animationProps = animated ? {
      initial: { scaleX: 0 },
      animate: { scaleX: 1 },
      transition: { delay: index * 0.1 + 0.2 }
    } : {}

    if (variant === 'horizontal') {
      return (
        <ConnectorWrapper
          className={cn(
            'absolute top-6 w-full h-0.5 -right-1/2 transform -translate-x-1/2',
            isCompleted ? 'bg-green-500' : 'bg-gray-300',
            connectorStyle === 'dashed' && 'border-t-2 border-dashed bg-transparent',
            connectorStyle === 'arrow' && 'arrow-connector'
          )}
          style={{ 
            width: 'calc(100% - 3rem)',
            left: '50%'
          }}
          {...animationProps}
        />
      )
    }

    if (variant === 'vertical') {
      return (
        <ConnectorWrapper
          className={cn(
            'absolute left-6 w-0.5 h-full top-12',
            isCompleted ? 'bg-green-500' : 'bg-gray-300',
            connectorStyle === 'dashed' && 'border-l-2 border-dashed bg-transparent'
          )}
          style={{ height: 'calc(100% - 3rem)' }}
          {...animationProps}
        />
      )
    }

    return null
  }

  if (variant === 'horizontal') {
    return (
      <div className={cn('relative', className)} {...properties}>
        <div className="flex items-start justify-between space-x-4 overflow-x-auto pb-4">
          {enrichedSteps.map((step, index) => (
            <div key={index} className="relative flex-shrink-0">
              {renderStep(step, index)}
              {renderConnector(index)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div className={cn('relative', className)} {...properties}>
        <div className="space-y-8">
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
                stroke={isCompleted ? '#10b981' : '#d1d5db'}
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
          'relative p-6 rounded-lg border transition-all',
          step.status === 'completed' && 'border-green-500 bg-green-50',
          step.status === 'current' && 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20',
          step.status === 'upcoming' && 'border-gray-300 bg-white',
          step.status === 'disabled' && 'border-gray-200 bg-gray-50 opacity-50',
          isClickable && 'cursor-pointer hover:shadow-lg'
        )}
        onClick={() => isClickable && onStepClick?.(index)}
        {...animationProps}
      >
        <div className="flex items-start space-x-4">
          <div
            className={cn(
              'flex-shrink-0 flex items-center justify-center rounded-full',
              iconSizeClasses[size],
              step.status === 'completed' && 'bg-green-500 text-white',
              step.status === 'current' && 'bg-blue-500 text-white',
              step.status === 'upcoming' && 'bg-gray-200 text-gray-500',
              step.status === 'disabled' && 'bg-gray-100 text-gray-400'
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
          <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">
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