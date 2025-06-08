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

const ComponentsDemoClient = () => {
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
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Button States</h2>
              <div className="flex items-center gap-4">
                <Button disabled>Disabled</Button>
                <Button onClick={simulateLoading}>
                  {isLoading ? 'Loading...' : 'Click to Load'}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cards">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
              <p className="text-gray-600">This is a basic card with some content.</p>
            </Card>

            <Card className="overflow-hidden">
              <AspectRatio ratio="16/9">
                <div className="bg-gray-200 flex items-center justify-center h-full">
                  <span className="text-gray-500">Image</span>
                </div>
              </AspectRatio>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Card with Image</h3>
                <p className="text-gray-600 mb-4">This card has an image with a 16:9 aspect ratio.</p>
                <Button variant="outline">Learn More</Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Card with Badge</h3>
                <Badge variant="outline">New</Badge>
              </div>
              <p className="text-gray-600 mb-4">This card includes a badge component.</p>
              <div className="flex gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Toast Notifications</h2>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => showToast('default')}>Default</Button>
                <Button onClick={() => showToast('success')} variant="success">
                  Success
                </Button>
                <Button onClick={() => showToast('error')} variant="outline" className="bg-red-500 text-white hover:bg-red-600">
                  Error
                </Button>
                <Button onClick={() => showToast('warning')} variant="warning">
                  Warning
                </Button>
                <Button onClick={() => showToast('info')} variant="outline">
                  Info
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Dialog</h2>
              <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                    <Dialog.Description>
                      This is a dialog component. Click outside or press Escape to close.
                    </Dialog.Description>
                  </Dialog.Header>
                  <div className="py-4">
                    <p className="text-gray-700">
                      This is the dialog content. You can put any React component here.
                    </p>
                  </div>
                  <Dialog.Footer>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Save Changes</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComponentsDemoClient;
