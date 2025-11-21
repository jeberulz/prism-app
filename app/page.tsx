'use client';

import { useState } from 'react';
import { FeedContainer } from '@/components/feed/feed-container';
import { DiscoverView } from '@/components/discover/discover-view';
import { ProfileView } from '@/components/profile/profile-view';
import { StoryReader } from '@/components/story-reader/story-reader';
import { ContextAI } from '@/components/context-ai/context-ai';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { Story } from '@/types';

type Tab = 'home' | 'discover' | 'profile';

export default function Home() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isStoryReaderOpen, setIsStoryReaderOpen] = useState(false);
  const [contextCategory, setContextCategory] = useState<string | null>(null);
  const [isContextOpen, setIsContextOpen] = useState(false);

  const handleOpenStory = (story: Story) => {
    setSelectedStory(story);
    setIsStoryReaderOpen(true);
  };

  const handleCloseStory = () => {
    setIsStoryReaderOpen(false);
    setTimeout(() => setSelectedStory(null), 300);
  };

  const handleOpenContext = (category: string) => {
    setContextCategory(category);
    setIsContextOpen(true);
  };

  const handleCloseContext = () => {
    setIsContextOpen(false);
    setTimeout(() => setContextCategory(null), 300);
  };

  const handleNavigateToSearch = () => {
    setCurrentTab('discover');
  };

  return (
    <div className="overflow-hidden flex justify-center text-white bg-[#050505] w-full h-screen selection:bg-purple-500/30">
      <div className="w-full h-full md:max-w-[420px] md:h-[95vh] md:my-auto md:rounded-[32px] relative overflow-hidden bg-black shadow-2xl border-gray-800 md:border ring-1 ring-white/10 z-10" style={{ paddingBottom: 'max(calc(80px + env(safe-area-inset-bottom)), 80px)' }}>
        {currentTab === 'home' && (
          <FeedContainer
            onOpenStory={handleOpenStory}
            onOpenContext={handleOpenContext}
            onNavigateToSearch={handleNavigateToSearch}
          />
        )}
        {currentTab === 'discover' && <DiscoverView onOpenStory={handleOpenStory} />}
        {currentTab === 'profile' && <ProfileView />}

        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />

        <StoryReader story={selectedStory} isOpen={isStoryReaderOpen} onClose={handleCloseStory} />
        <ContextAI category={contextCategory} isOpen={isContextOpen} onClose={handleCloseContext} />
      </div>
    </div>
  );
}

