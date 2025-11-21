# Prism - Gen Z Pulse

A Next.js application for AI-powered news aggregation with multi-perspective analysis. View news through different lenses: Raw, Explained, and Debunked.

## Features

- 🔍 **Prism Lens** - View news through 3 different perspectives (Raw, Explained, Debunked)
- 📱 **Mobile-First Design** - Optimized for mobile devices with snap scrolling
- 🎨 **Modern UI** - Glass morphism effects and smooth animations
- 🔖 **Discover Feed** - Browse trending topics and search functionality
- 👤 **Profile** - User profile with stats and bookmarks
- 🤖 **AI Context** - Get AI-powered analysis of news topics

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **shadcn/ui** - Component library (utilities)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts and global styles
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and animations
├── components/
│   ├── feed/               # Feed components
│   ├── discover/           # Discover page components
│   ├── profile/            # Profile page components
│   ├── story-reader/       # Story reader modal
│   ├── context-ai/         # AI context panel
│   └── navigation/         # Navigation components
├── data/
│   └── stories.ts          # Mock data for stories and discover items
├── lib/
│   └── utils.ts           # Utility functions (cn helper)
└── types/
    └── index.ts            # TypeScript type definitions
```

## Key Features Implementation

### Prism Lens System
Switch between three viewing modes:
- **Raw**: Original headline and summary
- **Explained**: Contextual explanation of the story
- **Debunked**: Fact-checking and debunking information

### Snap Scrolling Feed
Vertical feed with snap scrolling for smooth mobile experience.

### AI Context Panel
Get AI-powered analysis including:
- Sentiment analysis
- Bias detection
- Executive summary
- Key players

## Development

The project uses:
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Next.js Image** component for optimized images
- **Lucide React** for icons

## License

MIT

