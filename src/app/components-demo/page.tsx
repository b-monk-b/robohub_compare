export default function ComponentsDemo() {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">UI Components</h1>
      <p className="text-lg text-gray-600 mb-6">
        This page demonstrates our UI component library. Currently, all interactive components
        are available in our client-side application. This server-rendered page provides
        basic information about our design system.
      </p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Buttons</h3>
          <p className="text-gray-600">
            Various button styles including primary, secondary, outline, and ghost variants.
          </p>
        </div>
        
        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Cards</h3>
          <p className="text-gray-600">
            Flexible card components with different layouts and content styles.
          </p>
        </div>
        
        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Dialogs</h3>
          <p className="text-gray-600">
            Modal dialogs for important content, notifications and confirmations.
          </p>
        </div>
        
        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Tabs</h3>
          <p className="text-gray-600">
            Tab interfaces for organizing and switching between groups of content.
          </p>
        </div>
        
        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Form Elements</h3>
          <p className="text-gray-600">
            Input fields, selects, checkboxes and other form controls.
          </p>
        </div>
        
        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Notifications</h3>
          <p className="text-gray-600">
            Toast notifications and alert components for user feedback.
          </p>
        </div>
      </div>
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold mb-4">Interactive Demo</h2>
        <p>For the full interactive component demo, please visit our client-side application.</p>
      </div>
    </div>
  );
}
