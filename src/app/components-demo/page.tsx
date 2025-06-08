'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import the client component with SSR disabled
const ComponentsDemoClient = dynamic(
  () => import('./components-demo-client'),
  { 
    ssr: false,
    loading: () => <div>Loading components...</div>
  }
);

export default function ComponentsDemo() {
  return (
    <div className="min-h-screen bg-background">
      <ComponentsDemoClient />
    </div>
  );
}
