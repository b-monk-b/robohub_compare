import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The variant of the button */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** Rounded corners style */
  rounded?: ButtonRounded;
  /** Show loading spinner */
  isLoading?: boolean;
  /** Optional icon to display before the button text */
  leftIcon?: ReactNode;
  /** Optional icon to display after the button text */
  rightIcon?: ReactNode;
  /** Makes the button full width */
  fullWidth?: boolean;
  /** Disables the button and shows a loading spinner */
  loadingText?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      rounded = 'md',
      isLoading = false,
      disabled = false,
      children,
      leftIcon,
      rightIcon,
      fullWidth = false,
      loadingText,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const showLoading = isLoading && !loadingText;
    
    const baseStyles = [
      'inline-flex items-center justify-center font-medium transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      'whitespace-nowrap',
      fullWidth && 'w-full',
    ];
    
    const variants = {
      primary: [
        'bg-blue-600 text-white',
        'hover:bg-blue-700',
        'active:bg-blue-800',
        'focus-visible:ring-blue-500',
      ],
      secondary: [
        'bg-gray-100 text-gray-900',
        'hover:bg-gray-200',
        'active:bg-gray-300',
        'focus-visible:ring-gray-400',
      ],
      success: [
        'bg-green-600 text-white',
        'hover:bg-green-700',
        'active:bg-green-800',
        'focus-visible:ring-green-500',
      ],
      danger: [
        'bg-red-600 text-white',
        'hover:bg-red-700',
        'active:bg-red-800',
        'focus-visible:ring-red-500',
      ],
      warning: [
        'bg-yellow-500 text-white',
        'hover:bg-yellow-600',
        'active:bg-yellow-700',
        'focus-visible:ring-yellow-500',
      ],
      info: [
        'bg-blue-500 text-white',
        'hover:bg-blue-600',
        'active:bg-blue-700',
        'focus-visible:ring-blue-500',
      ],
      outline: [
        'border border-gray-300 bg-transparent',
        'hover:bg-gray-50',
        'dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800',
        'focus-visible:ring-blue-500',
      ],
      ghost: [
        'bg-transparent',
        'hover:bg-gray-100',
        'dark:hover:bg-gray-800',
        'focus-visible:ring-blue-500',
      ],
      link: [
        'bg-transparent text-blue-600',
        'hover:underline p-0 h-auto',
        'dark:text-blue-400',
        'focus-visible:ring-blue-500',
      ],
    };

    const sizes = {
      xs: 'h-7 px-2.5 text-xs',
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
      xl: 'h-14 px-8 text-xl',
    };

    const roundness = {
      none: 'rounded-none',
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    const loadingSpinner = (
      <svg
        className={cn(
          'animate-spin',
          {
            'h-3.5 w-3.5': size === 'xs',
            'h-4 w-4': size === 'sm',
            'h-5 w-5': size === 'md',
            'h-6 w-6': size === 'lg' || size === 'xl',
          },
          loadingText ? 'mr-2' : ''
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    return (
      <button
        type={type}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          roundness[rounded],
          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (loadingText || !leftIcon) && (
          <span className={cn({
            'mr-2': !!children || !!loadingText,
            'opacity-0': !showLoading,
          })}>
            {loadingSpinner}
          </span>
        )}
        
        {!isLoading && leftIcon && (
          <span className="mr-2">
            {leftIcon}
          </span>
        )}
        
        {isLoading && loadingText ? loadingText : children}
        
        {!isLoading && rightIcon && (
          <span className="ml-2">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

export type { ButtonVariant, ButtonSize, ButtonRounded };

