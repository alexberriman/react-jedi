import { cn } from '../../../lib/utils';
import type { IconType } from 'react-icons';

const sizeMap = {
  xs: '12px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
} as const;

export interface IconProperties {
  icon: IconType;
  size?: keyof typeof sizeMap | number;
  color?: string;
  variant?: 'default' | 'filled' | 'outlined' | 'background';
  background?: string;
  animated?: boolean;
  animationType?: 'spin' | 'pulse' | 'bounce';
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({
  icon: IconComponent,
  size = 'md',
  color = 'currentColor',
  variant = 'default',
  background,
  animated = false,
  animationType = 'spin',
  onClick,
  ariaLabel,
  className,
  style,
}: Readonly<IconProperties>) {
  const iconSize = typeof size === 'number' ? `${size}px` : sizeMap[size];
  
  const animationClasses = animated
    ? {
        spin: 'animate-spin',
        pulse: 'animate-pulse',
        bounce: 'animate-bounce',
      }[animationType]
    : undefined;

  const variantClasses = {
    default: '',
    filled: '',
    outlined: '',
    background: 'rounded-lg p-2',
  }[variant];

  const wrapperStyle: React.CSSProperties = {
    ...style,
    ...(variant === 'background' && {
      backgroundColor: background || '#f3f4f6',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  };

  const iconElement = (
    <IconComponent
      size={iconSize}
      color={color}
      className={cn(animationClasses, className)}
      style={{
        minWidth: iconSize,
        minHeight: iconSize,
      }}
    />
  );

  if (variant === 'background') {
    return (
      <span
        className={cn(variantClasses, onClick && 'cursor-pointer transition-opacity hover:opacity-80')}
        style={wrapperStyle}
        onClick={onClick}
        onKeyDown={(e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
          }
        }}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={ariaLabel}
      >
        {iconElement}
      </span>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        className={cn('inline-flex items-center justify-center transition-opacity hover:opacity-80', className)}
        onClick={onClick}
        aria-label={ariaLabel}
        style={style}
      >
        {iconElement}
      </button>
    );
  }

  return (
    <span
      className={cn('inline-flex items-center justify-center', className)}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      style={style}
    >
      {iconElement}
    </span>
  );
}