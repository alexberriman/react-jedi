import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface PageSectionBackground {
  type: 'color' | 'gradient' | 'image' | 'pattern';
  value: string;
  opacity?: number;
}

export interface PageSectionHeading {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

export interface PageSectionProperties {
  readonly variant?: 'full-width' | 'contained' | 'split' | 'angled' | 'curved' | 'pattern';
  readonly background?: PageSectionBackground;
  readonly padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  readonly heading?: PageSectionHeading;
  readonly contentAlignment?: 'left' | 'center' | 'right';
  readonly parallax?: boolean;
  readonly animate?: boolean;
  readonly animationType?: 'fade' | 'slide' | 'zoom';
  readonly dividerTop?: 'wave' | 'angle' | 'curve' | 'none';
  readonly dividerBottom?: 'wave' | 'angle' | 'curve' | 'none';
  readonly dividerColor?: string;
  readonly className?: string;
  readonly id?: string;
  readonly children: React.ReactNode;
}

const paddingClasses = {
  none: 'py-0',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-20 md:py-32',
  '2xl': 'py-24 md:py-40'
} as const;

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
} as const;

function PageSection({
  variant = 'full-width',
  background,
  padding = 'lg',
  heading,
  contentAlignment = 'left',
  parallax = false,
  animate = false,
  animationType = 'fade',
  dividerTop = 'none',
  dividerBottom = 'none',
  dividerColor = 'currentColor',
  className,
  id,
  children
}: PageSectionProperties) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isInView, setIsInView] = React.useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', parallax ? '20%' : '0%']);

  React.useEffect(() => {
    if (!animate) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animate]);

  const getBackgroundStyle = React.useMemo(() => {
    if (!background) return {};
    
    const style: React.CSSProperties = {};
    
    switch (background.type) {
      case 'color': {
        style.backgroundColor = background.value;
        break;
      }
      case 'gradient': {
        style.backgroundImage = background.value;
        break;
      }
      case 'image': {
        style.backgroundImage = `url(${background.value})`;
        style.backgroundSize = 'cover';
        style.backgroundPosition = 'center';
        break;
      }
      case 'pattern': {
        style.backgroundImage = getPatternBackground(background.value);
        break;
      }
    }
    
    if (background.opacity !== undefined) {
      style.opacity = background.opacity;
    }
    
    return style;
  }, [background]);

  const getAnimationProps = () => {
    if (!animate) return {};
    
    const baseAnimation = {
      initial: { opacity: 0 },
      animate: isInView ? { opacity: 1 } : { opacity: 0 },
      transition: { duration: 0.8, ease: "easeOut" }
    };
    
    switch (animationType) {
      case 'slide': {
        return {
          ...baseAnimation,
          initial: { opacity: 0, y: 50 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        };
      }
      case 'zoom': {
        return {
          ...baseAnimation,
          initial: { opacity: 0, scale: 0.95 },
          animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        };
      }
      default: {
        return baseAnimation;
      }
    }
  };

  const containerClasses = cn(
    'relative overflow-hidden',
    paddingClasses[padding],
    alignmentClasses[contentAlignment],
    className
  );

  const contentClasses = cn(
    'relative z-10',
    variant === 'contained' && 'container mx-auto px-4 sm:px-6 lg:px-8',
    variant === 'split' && 'grid md:grid-cols-2 gap-8 container mx-auto px-4 sm:px-6 lg:px-8'
  );

  const MotionComponent = animate ? motion.section : 'section';

  return (
    <MotionComponent
      ref={sectionRef}
      id={id}
      className={containerClasses}
      {...(animate ? getAnimationProps() : {})}
    >
      {dividerTop !== 'none' && (
        <div className="absolute top-0 left-0 right-0 z-0">
          {renderDivider(dividerTop, 'top', dividerColor)}
        </div>
      )}
      
      {background && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            ...getBackgroundStyle,
            y: parallax ? parallaxY : 0
          }}
        />
      )}
      
      <div className={contentClasses}>
        {heading && (
          <div className={cn(
            'mb-8 md:mb-12',
            alignmentClasses[heading.alignment || contentAlignment]
          )}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {heading.title}
            </h2>
            {heading.subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                {heading.subtitle}
              </p>
            )}
          </div>
        )}
        
        {children}
      </div>
      
      {dividerBottom !== 'none' && (
        <div className="absolute bottom-0 left-0 right-0 z-0">
          {renderDivider(dividerBottom, 'bottom', dividerColor)}
        </div>
      )}
    </MotionComponent>
  );
}

function getPatternBackground(pattern: string): string {
  const patterns: Record<string, string> = {
    dots: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
    grid: `
      linear-gradient(currentColor 1px, transparent 1px),
      linear-gradient(90deg, currentColor 1px, transparent 1px)
    `,
    diagonal: `repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      currentColor 10px,
      currentColor 11px
    )`,
    waves: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`
  };
  
  return patterns[pattern] || patterns.dots;
}

function renderDivider(type: 'wave' | 'angle' | 'curve', position: 'top' | 'bottom', color: string) {
  const transform = position === 'top' ? 'rotate(180deg)' : '';
  
  switch (type) {
    case 'wave': {
      return (
        <svg
          className="w-full h-12 md:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform }}
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill={color}
          />
        </svg>
      );
    }
    case 'angle': {
      return (
        <svg
          className="w-full h-12 md:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform }}
        >
          <path
            d="M0,0 L0,40 L1200,120 L1200,0 Z"
            fill={color}
          />
        </svg>
      );
    }
    case 'curve': {
      return (
        <svg
          className="w-full h-12 md:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform }}
        >
          <path
            d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z"
            fill={color}
          />
        </svg>
      );
    }
    default: {
      return null;
    }
  }
}

export { PageSection };