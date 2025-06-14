import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
      'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

/**
 * A higher-level component that combines the tooltip parts
 */
interface TooltipWrapperProps {
  /** The element that triggers the tooltip */
  children: React.ReactNode;
  /** The content to show in the tooltip */
  content: React.ReactNode;
  /** The side of the trigger to render the tooltip */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** The alignment of the tooltip relative to the trigger */
  align?: 'start' | 'center' | 'end';
  /** Delay in milliseconds before the tooltip appears */
  delayDuration?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Additional class name for the tooltip content */
  className?: string;
  /** Additional props for the tooltip content */
  contentProps?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;
}

/**
 * A complete tooltip component with sensible defaults
 */
const TooltipWrapper = ({
  children,
  content,
  side = 'top',
  align = 'center',
  delayDuration = 300,
  disabled = false,
  className,
  contentProps,
}: TooltipWrapperProps) => {
  if (disabled) return <>{children}</>;

  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        className={cn('max-w-xs', className)}
        {...contentProps}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipWrapper,
};
