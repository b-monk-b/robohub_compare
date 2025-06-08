import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Define the AspectRatio type
type AspectRatio = '1/1' | '4/3' | '16/9' | '21/9' | '3/4' | '9/16' | '9/21' | 'custom';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /** The aspect ratio to maintain (e.g., '16/9', '4/3', '1/1') */
  ratio?: AspectRatio;
  /** Custom aspect ratio as a number (width / height) */
  ratioValue?: number;
  /** Maximum width of the container */
  maxWidth?: number | string;
  /** Maximum height of the container */
  maxHeight?: number | string;
  /** Whether to fit the content within the container */
  contain?: boolean;
  /** Custom class name for the inner content wrapper */
  contentClassName?: string;
  /** Custom styles for the inner content wrapper */
  contentStyle?: React.CSSProperties;
}

/**
 * A component that maintains a specific aspect ratio for its children.
 * Useful for responsive images, videos, or any content that needs to maintain a specific ratio.
 */
const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    {
      className,
      ratio = '16/9',
      ratioValue,
      maxWidth,
      maxHeight,
      contain = false,
      children,
      contentClassName,
      contentStyle,
      style,
      ...props
    },
    ref
  ) => {
    const aspectRatios: Record<AspectRatio, number> = {
      '1/1': 1,
      '4/3': 4 / 3,
      '16/9': 16 / 9,
      '21/9': 21 / 9,
      '3/4': 3 / 4,
      '9/16': 9 / 16,
      '9/21': 9 / 21,
      'custom': ratioValue || 1,
    };

    const aspectRatio = ratio === 'custom' && ratioValue ? ratioValue : aspectRatios[ratio];
    const paddingBottom = `${(1 / aspectRatio) * 100}%`;

    const containerStyles = {
      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
      maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
      ...style,
    };

    const contentStyles = {
      ...(contain ? { objectFit: 'contain' as const } : { objectFit: 'cover' as const }),
      ...contentStyle,
    };

    return (
      <div
        ref={ref}
        className={cn('relative w-full overflow-hidden', className)}
        style={containerStyles}
        {...props}
      >
        <div 
          style={{ 
            width: '100%',
            paddingBottom: paddingBottom,
            position: 'relative',
          }}
          aria-hidden="true"
        />
        <div
          className={cn(
            'absolute inset-0',
            'flex items-center justify-center',
            'overflow-hidden',
            contentClassName
          )}
          style={contentStyles}
        >
          {children}
        </div>
      </div>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';

// Export the component only once
export { AspectRatio };
