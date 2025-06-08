'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog } from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

export default function ComponentsDemo() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buttons');
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (variant: 'default' | 'success' | 'error' | 'warning' | 'info') => {
    toast({
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
      description: 'This is a toast notification.',
      variant,
    });
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">UI Components Demo</h1>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Toasts</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Button Sizes</h2>
              <div className="flex items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Loading States</h2>
              <div className="flex items-center gap-4">
                <Button 
                  isLoading={isLoading}
                  onClick={simulateLoading}
                >
                  {isLoading ? 'Loading...' : 'Click to Load'}
                </Button>
                <Button 
                  variant="primary" 
                  isLoading={isLoading}
                  loadingText="Processing..."
                  onClick={simulateLoading}
                >
                  With Loading Text
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This is a basic card with some content. You can put any content here.
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">Save</Button>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">With Badge</h3>
                  <Badge variant="success">New</Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  This card has a border and includes a badge in the header.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <AspectRatio ratio="16/9" className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">Image Placeholder</span>
              </AspectRatio>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">With Aspect Ratio</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This card maintains a 16:9 aspect ratio for its media content.
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Toast Notifications</h2>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => showToast('default')}>Default Toast</Button>
                <Button variant="primary" onClick={() => showToast('success')}>
                  Success Toast
                </Button>
                <Button variant="danger" onClick={() => showToast('error')}>
                  Error Toast
                </Button>
                <Button variant="warning" onClick={() => showToast('warning')}>
                  Warning Toast
                </Button>
                <Button variant="info" onClick={() => showToast('info')}>
                  Info Toast
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Dialog</h2>
              <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Content>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      This action cannot be undone. This will permanently delete your account.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        variant="danger"
                        onClick={() => {
                          setIsDialogOpen(false);
                          showToast('success');
                        }}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Loading States</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <Skeleton className="h-[125px] w-full rounded-xl" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
