import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
type CardRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** The variant of the card */
  variant?: CardVariant;
  /** Rounded corners style */
  rounded?: CardRounded;
  /** Makes the card clickable with hover/focus styles */
  isClickable?: boolean;
  /** Shows a loading state */
  isLoading?: boolean;
  /** Disables the card interaction */
  isDisabled?: boolean;
  /** Makes the card full width */
  fullWidth?: boolean;
  /** Optional header content */
  header?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Optional image to display at the top of the card */
  image?: {
    src: string;
    alt: string;
    height?: number | string;
    width?: number | string;
    className?: string;
  };
  /** Optional action buttons */
  actions?: React.ReactNode;
}

/**
 * A flexible card component that can be used to display content and actions.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      rounded = 'md',
      isClickable = false,
      isLoading = false,
      isDisabled = false,
      fullWidth = false,
      header,
      footer,
      image,
      actions,
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = isClickable && !isDisabled && !isLoading;

    const baseStyles = [
      'relative flex flex-col overflow-hidden',
      'transition-all duration-200',
      fullWidth && 'w-full',
      isDisabled && 'opacity-60 cursor-not-allowed',
      isInteractive && 'hover:shadow-md hover:-translate-y-0.5',
    ];

    const variants = {
      default: [
        'bg-white dark:bg-gray-800',
        'border border-gray-200 dark:border-gray-700',
      ],
      elevated: [
        'bg-white dark:bg-gray-800',
        'shadow-sm hover:shadow-md',
        'border border-gray-100 dark:border-gray-700',
      ],
      outlined: [
        'bg-transparent',
        'border border-gray-200 dark:border-gray-700',
      ],
      filled: [
        'bg-gray-50 dark:bg-gray-800/50',
        'border border-gray-100 dark:border-gray-700',
      ],
    };

    const roundness = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      full: 'rounded-full',
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          roundness[rounded],
          isInteractive && 'cursor-pointer',
          className
        )}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 z-10 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {image && (
          <div className="relative w-full overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                'w-full object-cover',
                {
                  'h-32': !image.height,
                  'h-auto': image.height === 'auto',
                },
                image.className
              )}
              style={{
                height: image.height,
                width: image.width || '100%',
              }}
              loading="lazy"
            />
          </div>
        )}

        {header && (
          <div className="px-4 pt-4 sm:px-6">
            {typeof header === 'string' ? (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {header}
              </h3>
            ) : (
              header
            )}
          </div>
        )}

        <div className="flex-1 p-4 sm:p-6">
          {typeof children === 'string' ? (
            <p className="text-gray-600 dark:text-gray-300">{children}</p>
          ) : (
            children
          )}
        </div>

        {actions && (
          <div className="px-4 pb-4 sm:px-6">
            <div className="flex items-center justify-end space-x-2">
              {actions}
            </div>
          </div>
        )}

        {footer && (
          <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-3 sm:px-6 border-t border-gray-200 dark:border-gray-700">
            {typeof footer === 'string' ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">{footer}</p>
            ) : (
              footer
            )}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
export type { CardVariant, CardRounded };
