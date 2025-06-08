import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline' | 'secondary';
type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The visual style of the badge */
  variant?: BadgeVariant;
  /** The size of the badge */
  size?: BadgeSize;
  /** Rounded corners style */
  rounded?: BadgeRounded;
  /** Optional left icon */
  leftIcon?: ReactNode;
  /** Optional right icon */
  rightIcon?: ReactNode;
  /** Whether the badge should be interactive (hover/active states) */
  interactive?: boolean;
  /** Custom color for the badge (overrides variant colors) */
  color?: string;
  /** Custom background color for the badge (overrides variant colors) */
  bgColor?: string;
  /** Custom border color for the badge (overrides variant colors) */
  borderColor?: string;
  /** Whether the badge should have a dot indicator */
  withDot?: boolean;
  /** Color of the dot indicator (defaults to current text color) */
  dotColor?: string;
  /** Whether the badge should be in a loading state */
  isLoading?: boolean;
  /** Custom class name for the badge content */
  contentClassName?: string;
}

/**
 * A small status descriptor for UI elements.
 * Can be used to highlight important information like status, categories, or labels.
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      rounded = 'md',
      leftIcon,
      rightIcon,
      interactive = false,
      color,
      bgColor,
      borderColor,
      withDot = false,
      dotColor,
      isLoading = false,
      children,
      contentClassName,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'inline-flex items-center font-medium whitespace-nowrap',
      'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      interactive && 'cursor-pointer',
    ];

    const variants = {
      default: [
        'bg-gray-100 text-gray-800',
        'dark:bg-gray-700 dark:text-gray-100',
        interactive && 'hover:bg-gray-200 dark:hover:bg-gray-600',
      ],
      primary: [
        'bg-blue-100 text-blue-800',
        'dark:bg-blue-900/30 dark:text-blue-300',
        interactive && 'hover:bg-blue-200 dark:hover:bg-blue-800/50',
      ],
      success: [
        'bg-green-100 text-green-800',
        'dark:bg-green-900/30 dark:text-green-300',
        interactive && 'hover:bg-green-200 dark:hover:bg-green-800/50',
      ],
      warning: [
        'bg-yellow-100 text-yellow-800',
        'dark:bg-yellow-900/30 dark:text-yellow-300',
        interactive && 'hover:bg-yellow-200 dark:hover:bg-yellow-800/50',
      ],
      danger: [
        'bg-red-100 text-red-800',
        'dark:bg-red-900/30 dark:text-red-300',
        interactive && 'hover:bg-red-200 dark:hover:bg-red-800/50',
      ],
      outline: [
        'bg-transparent border',
        'text-gray-700 border-gray-300',
        'dark:text-gray-300 dark:border-gray-600',
        interactive && 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
      ],
      secondary: [
        'bg-gray-800 text-white',
        'dark:bg-gray-700 dark:text-gray-100',
        interactive && 'hover:bg-gray-700 dark:hover:bg-gray-600',
      ],
    };

    const sizes = {
      sm: 'text-xs px-1.5 py-0.5',
      md: 'text-xs px-2 py-0.5',
      lg: 'text-sm px-2.5 py-1',
    };

    const roundness = {
      none: 'rounded-none',
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    const iconSizes = {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    };

    const dotSizes = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    };

    const customStyles = {
      ...(color && { color }),
      ...(bgColor && { backgroundColor: bgColor }),
      ...(borderColor && { borderColor }),
    };

    const dot = (
      <span
        className={cn(
          'inline-block rounded-full',
          dotColor ? `bg-${dotColor}` : 'bg-current',
          dotSizes[size],
          'mr-1.5'
        )}
        style={dotColor ? { backgroundColor: dotColor } : undefined}
      />
    );

    const content = (
      <span className={cn('flex items-center', contentClassName)}>
        {withDot && dot}
        {leftIcon && (
          <span className={cn('mr-1.5 flex-shrink-0', iconSizes[size])}>
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className={cn('ml-1.5 flex-shrink-0', iconSizes[size])}>
            {rightIcon}
          </span>
        )}
      </span>
    );

    if (isLoading) {
      return (
        <span
          ref={ref}
          className={cn(
            baseStyles,
            'animate-pulse bg-gray-200 dark:bg-gray-700',
            sizes[size],
            roundness[rounded],
            className
          )}
          style={customStyles}
          {...props}
        >
          <span className="invisible">{content}</span>
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          roundness[rounded],
          className
        )}
        style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
        {...props}
      >
        {content}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeVariant, BadgeSize, BadgeRounded };
