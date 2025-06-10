# Robot Hub

A modern web application for discovering, comparing, and connecting with robotics solutions in India and Asia. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Blog System**: Read and manage blog posts with rich text content
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean and professional interface with Tailwind CSS
- **Fast Performance**: Optimized for speed with Next.js
- **SEO Friendly**: Built-in SEO optimization with Next.js

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Supabase](https://supabase.com/)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: [Heroicons](https://heroicons.com/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Supabase account (for database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/b-monk-b/robohub_compare.git
   cd robohub_compare
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   # Required for database operations (seed scripts, etc.)
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # App router
│   ├── blog/               # Blog pages
│   │   └── [slug]/         # Individual blog posts
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
│   ├── blog/               # Blog components
│   ├── layout/             # Layout components
│   └── ui/                 # UI components
├── lib/                    # Utility functions
│   └── supabase/           # Supabase client and utilities
└── styles/                 # Global styles
```

## Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a GitHub repository
2. Import the repository on Vercel
3. Add your environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/b-monk-b/robohub_compare](https://github.com/b-monk-b/robohub_compare)

