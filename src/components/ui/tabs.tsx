import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

type TabsVariant = 'default' | 'pills' | 'underline' | 'segmented';
type TabsSize = 'sm' | 'md' | 'lg';

interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  /** The variant of the tabs */
  variant?: TabsVariant;
  /** The size of the tabs */
  size?: TabsSize;
  /** Whether to take up the full width of the container */
  fullWidth?: boolean;
  /** Additional class name for the tabs list */
  listClassName?: string;
}

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /** Whether to take up the full width of the container */
  fullWidth?: boolean;
}

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** Whether the tab has an error state */
  hasError?: boolean;
  /** Optional icon to display before the tab text */
  icon?: React.ReactNode;
  /** Optional count to display after the tab text */
  count?: number | string;
}

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 */
const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant = 'default', size = 'md', fullWidth, listClassName, children, ...props }, ref) => {
  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cn('space-y-4', className)}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsList) {
          return React.cloneElement(child, {
            variant,
            size,
            fullWidth,
            className: cn(listClassName, child.props.className),
          } as TabsListProps);
        }
        return child;
      })}
    </TabsPrimitive.Root>
  );
});
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: TabsVariant;
    size?: TabsSize;
    fullWidth?: boolean;
  }
>(({ className, variant = 'default', size = 'md', fullWidth, ...props }, ref) => {
  const baseStyles = [
    'inline-flex items-center justify-start',
    'transition-colors',
    'data-[variant=default]:border-b data-[variant=default]:border-gray-200',
    'data-[variant=underline]:border-b data-[variant=underline]:border-gray-200',
    'data-[variant=pills]:gap-1 data-[variant=pills]:p-1 data-[variant=pills]:bg-gray-100 data-[variant=pills]:dark:bg-gray-800 data-[variant=pills]:rounded-lg',
    'data-[variant=segmented]:gap-0.5 data-[variant=segmented]:p-0.5 data-[variant=segmented]:bg-gray-100 data-[variant=segmented]:dark:bg-gray-800 data-[variant=segmented]:rounded-md',
    'data-[full-width=true]:w-full',
  ];

  const sizes = {
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base',
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        baseStyles,
        sizes[size],
        className
      )}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, children, hasError, icon, count, ...props }, ref) => {
  const parentElement = React.useContext(TabsPrimitive.TabsContext);
  const variant = parentElement?.dataVariant as TabsVariant || 'default';
  const size = parentElement?.dataSize as TabsSize || 'md';
  const fullWidth = parentElement?.dataFullWidth === 'true';

  const baseStyles = [
    'inline-flex items-center justify-center whitespace-nowrap transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=active]:text-primary',
    'data-[variant=default]:rounded-t-sm data-[variant=default]:border-b-2 data-[variant=default]:border-transparent data-[variant=default]:data-[state=active]:border-primary',
    'data-[variant=underline]:border-b-2 data-[variant=underline]:border-transparent data-[variant=underline]:data-[state=active]:border-primary',
    'data-[variant=pills]:rounded-md data-[variant=pills]:data-[state=active]:bg-white data-[variant=pills]:data-[state=active]:shadow-sm data-[variant=pills]:data-[state=active]:text-primary',
    'data-[variant=segmented]:rounded-sm data-[variant=segmented]:data-[state=active]:bg-white data-[variant=segmented]:data-[state=active]:shadow-sm data-[variant=segmented]:data-[state=active]:text-primary',
    'data-[full-width=true]:flex-1',
  ];

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const paddingStyles = {
    default: sizes[size],
    underline: sizes[size],
    pills: 'px-3 py-1.5',
    segmented: 'px-3 py-1.5',
  };

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {typeof count !== 'undefined' && (
        <span
          className={cn(
            'ml-2 rounded-full px-1.5 py-0.5 text-xs font-medium',
            hasError
              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
            'transition-colors group-hover:bg-opacity-80 group-data-[state=active]:bg-opacity-100',
            'group-data-[state=active]:bg-primary/10 group-data-[state=active]:text-primary',
            hasError && 'group-data-[state=active]:bg-red-100 group-data-[state=active]:text-red-800',
          )}
        >
          {count}
        </span>
      )}
    </>
  );

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'group',
        baseStyles,
        paddingStyles[variant] || sizes[size],
        hasError && 'text-red-600 data-[state=active]:border-red-600',
        className
      )}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth}
      {...props}
    >
      {content}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};

export type { TabsVariant, TabsSize, TabsListProps, TabsTriggerProps };
