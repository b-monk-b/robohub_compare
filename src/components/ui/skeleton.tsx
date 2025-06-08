import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type SkeletonVariant = 'text' | 'circle' | 'rectangle' | 'rounded';
type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** The type of skeleton to display */
  variant?: SkeletonVariant;
  /** Animation effect to use */
  animation?: SkeletonAnimation;
  /** Custom width */
  width?: number | string;
  /** Custom height */
  height?: number | string;
  /** Whether the skeleton should take up the full width of its container */
  fullWidth?: boolean;
  /** Whether the skeleton should take up the full height of its container */
  fullHeight?: boolean;
  /** Border radius (only applies to 'rounded' variant) */
  borderRadius?: string | number;
  /** Custom class name for the skeleton wrapper */
  wrapperClassName?: string;
}

/**
 * A placeholder preview for content before it loads, providing a better user experience.
 */
const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = 'text',
      animation = 'pulse',
      width,
      height,
      fullWidth = false,
      fullHeight = false,
      borderRadius,
      wrapperClassName,
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'bg-gray-200 dark:bg-gray-700',
      'relative overflow-hidden',
      animation === 'pulse' && 'animate-pulse',
      animation === 'wave' && 'overflow-hidden',
      fullWidth && 'w-full',
      fullHeight && 'h-full',
    ];

    const variants = {
      text: 'h-4 rounded',
      circle: 'rounded-full',
      rectangle: '',
      rounded: 'rounded-md',
    };

    const skeletonStyle = {
      width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      ...(variant === 'rounded' && borderRadius ? { borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius } : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          className
        )}
        style={skeletonStyle}
        {...props}
      >
        {animation === 'wave' && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-wave">
            &nbsp;
          </div>
        )}
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';

/**
 * A component to display multiple skeleton loaders in a grid layout.
 */
const SkeletonGroup = ({
  count = 3,
  className,
  itemClassName,
  containerClassName,
  ...props
}: SkeletonProps & {
  /** Number of skeleton items to render */
  count?: number;
  /** Class name for each skeleton item */
  itemClassName?: string;
  /** Class name for the container */
  containerClassName?: string;
}) => {
  return (
    <div className={cn('space-y-4', containerClassName)}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(itemClassName, className)}
          {...props}
        />
      ))}
    </div>
  );
};

export { Skeleton, SkeletonGroup };
export type { SkeletonVariant, SkeletonAnimation };
