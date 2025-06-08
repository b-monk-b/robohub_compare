import { useState, forwardRef, useEffect, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
type ImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'custom';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError' | 'onLoad'> {
  /** Alternative text for the image */
  alt: string;
  /** Source URL of the image */
  src: string;
  /** Fallback image source if the main image fails to load */
  fallbackSrc?: string;
  /** How the image should be resized to fit its container */
  fit?: ImageFit;
  /** Rounded corners style */
  rounded?: ImageRounded;
  /** Custom border radius (only works with rounded="custom") */
  customRounded?: string;
  /** Whether to show a loading skeleton */
  showSkeleton?: boolean;
  /** Custom loading element */
  loadingElement?: React.ReactNode;
  /** Custom error element */
  errorElement?: React.ReactNode;
  /** Callback when image fails to load */
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  /** Callback when image loads successfully */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  /** Whether to disable the default error state */
  disableErrorState?: boolean;
  /** Whether to disable the default loading state */
  disableLoadingState?: boolean;
  /** Additional wrapper class name */
  wrapperClassName?: string;
}

/**
 * An enhanced image component with built-in loading states, error handling, and responsive image support.
 */
const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      className,
      wrapperClassName,
      fallbackSrc,
      fit = 'cover',
      rounded = 'none',
      customRounded,
      showSkeleton = true,
      loadingElement,
      errorElement,
      onError: onErrorProp,
      onLoad: onLoadProp,
      disableErrorState = false,
      disableLoadingState = false,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [currentSrc, setCurrentSrc] = useState<string>(src);

    const roundness = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      full: 'rounded-full',
      custom: customRounded || 'rounded-none',
    };

    const objectFit = {
      contain: 'object-contain',
      cover: 'object-cover',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    };

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (fallbackSrc && !hasError) {
        setCurrentSrc(fallbackSrc);
        setHasError(true);
      } else if (onErrorProp) {
        onErrorProp(event);
      } else if (!disableErrorState) {
        setHasError(true);
      }
    };

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLoading(false);
      if (onLoadProp) {
        onLoadProp(event);
      }
    };

    // Reset loading and error states when src changes
    useEffect(() => {
      setIsLoading(true);
      setHasError(false);
      setCurrentSrc(src);
    }, [src]);

    // Show loading state
    if (isLoading && !disableLoadingState && showSkeleton) {
      return (
        <div
          className={cn(
            'relative overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse',
            roundness[rounded],
            wrapperClassName
          )}
          style={{
            aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : 'auto',
          }}
        >
          {loadingElement || (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      );
    }

    // Show error state
    if (hasError && !disableErrorState) {
      return (
        <div
          className={cn(
            'relative flex items-center justify-center bg-gray-100 dark:bg-gray-800',
            roundness[rounded],
            wrapperClassName
          )}
          style={{
            aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : 'auto',
          }}
        >
          {errorElement || (
            <div className="flex flex-col items-center p-4 text-center">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Failed to load image
              </span>
            </div>
          )}
        </div>
      );
    }

    // Render the image
    return (
      <div className={cn('relative', wrapperClassName)}>
        <img
          ref={ref}
          src={currentSrc}
          alt={alt}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            objectFit[fit],
            roundness[rounded],
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          onError={handleError}
          onLoad={handleLoad}
          loading={props.loading || 'lazy'}
          {...props}
        />
      </div>
    );
  }
);

Image.displayName = 'Image';

export { Image };
export type { ImageFit, ImageRounded };
