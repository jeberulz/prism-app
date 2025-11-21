'use client';

import { useState, useEffect } from 'react';
import { Story, PrismLens } from '@/types';
import { stories } from '@/data/stories';
import { StoryCard } from './story-card';
import { PrismLensToggle } from './prism-lens-toggle';
import { Search } from 'lucide-react';

interface FeedContainerProps {
  onOpenStory: (story: Story) => void;
  onOpenContext: (category: string) => void;
  onNavigateToSearch: () => void;
}

export function FeedContainer({ onOpenStory, onOpenContext, onNavigateToSearch }: FeedContainerProps) {
  const [currentLens, setCurrentLens] = useState<PrismLens>('raw');
  const [feedData, setFeedData] = useState<Story[]>(stories);

  useEffect(() => {
    // Re-render feed when lens changes
    setFeedData([...stories]);
  }, [currentLens]);

  return (
    <div className="h-full relative group/home">
      <header className="absolute top-0 left-0 right-0 z-30 pt-6 pb-4 flex flex-col gap-3 justify-center items-center text-sm font-medium text-white/60 pointer-events-none transition-opacity duration-300 bg-gradient-to-b from-black/80 to-transparent">
        <PrismLensToggle currentLens={currentLens} onLensChange={setCurrentLens} />
        
        <button
          onClick={onNavigateToSearch}
          className="absolute right-5 top-6 pointer-events-auto p-2.5 rounded-full bg-black/30 backdrop-blur-md active:scale-95 transition-transform border border-white/10 hover:bg-white/10"
          aria-label="Search"
        >
          <Search size={20} className="text-white" />
        </button>
      </header>

      <div className="w-full h-full relative">
        <main className="snap-container no-scrollbar w-full h-full z-10">
          {feedData.map((story, index) => (
            <StoryCard
              key={index}
              story={story}
              currentLens={currentLens}
              onOpenStory={onOpenStory}
              onOpenContext={onOpenContext}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

