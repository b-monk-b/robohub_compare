# Homepage Components

This directory contains the main components used on the homepage of the RoboHub Compare platform.

## Components

### 1. TrustedBy
Displays a grid of company logos that trust the platform.

**Props:** None

### 2. WhyChooseUs
Highlights the key features and benefits of using RoboHub Compare.

**Props:** None

### 3. FeaturedRobots
Shows a selection of featured robots with their details, ratings, and pricing.

**Props:** None (currently uses dummy data)

### 4. BlogSection
Displays a preview of the latest blog posts with featured images and excerpts.

**Props:** None

### 5. CallToAction
Encourages users to take action with a prominent CTA section.

**Props:** None

## Usage

Import and use these components in your page like this:

```tsx
import { 
  TrustedBy, 
  WhyChooseUs, 
  FeaturedRobots, 
  BlogSection,
  CallToAction 
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      <TrustedBy />
      <WhyChooseUs />
      <FeaturedRobots />
      <BlogSection />
      <CallToAction />
    </>
  );
}
```

## Styling

All components use Tailwind CSS for styling. The color scheme follows the project's design system:

- Primary: Blue-600
- Background: White (light) / Gray-950 (dark)
- Text: Gray-900 (light) / White (dark)
- Secondary Text: Gray-600 (light) / Gray-400 (dark)

## Adding New Components

1. Create a new file in this directory with a descriptive name (PascalCase).
2. Export the component as default.
3. Use TypeScript for type safety.
4. Follow the existing styling patterns using Tailwind CSS.
5. Add dark mode support using the `dark:` variant.
6. Document the component in this README.

## Dependencies

- React
- Next.js
- Tailwind CSS
- Heroicons (for icons)
- Classnames (for conditional class names)
