'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Shuffle } from 'lucide-react';
import { discoverItems } from '@/data/stories';
import { Story } from '@/types';

interface DiscoverViewProps {
  onOpenStory: (story: Story) => void;
}

const categories = ['All', 'Music', 'Food', 'Tech'];

export function DiscoverView({ onOpenStory }: DiscoverViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredItems = useMemo(() => {
    return discoverItems.filter(item => {
      const matchesCat = filter === 'All' || item.category === filter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, filter]);

  return (
    <div className="h-full bg-black text-white overflow-hidden flex flex-col pb-20">
      <div className="px-6 pt-12 pb-4 sticky top-0 bg-black/80 backdrop-blur-md z-20 border-b border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Discover</h1>
          <button className="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] active:scale-95 transition-transform flex items-center gap-1">
            <Shuffle size={12} />
            Surprise Me
          </button>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
          <input
            id="discover-search-input"
            type="text"
            placeholder="Search topics, sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 text-sm text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
          />
        </div>
      </div>

      <div className="overflow-y-auto no-scrollbar flex-1 px-6 pt-4">
        <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cat === filter
                ? "bg-white text-black border border-white px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-transform active:scale-95"
                : "bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap hover:bg-gray-700 transition-colors"
              }
            >
              {cat === 'Music' && '🎵 '}
              {cat === 'Food' && '🍜 '}
              {cat === 'Tech' && '🤖 '}
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-8 relative h-32 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
          <Image
            src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop"
            alt="Live Pulse"
            fill
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80 mix-blend-multiply" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-1 animate-pulse">
              Live Pulse
            </span>
            <h3 className="text-xl font-bold text-white leading-tight mb-1">Global Internet Outage</h3>
            <p className="text-xs text-gray-300">Affecting 12 countries • 45k posts/min</p>
          </div>
        </div>

        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Trending Now</h3>
        <div className="grid grid-cols-2 gap-4 pb-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} className="space-y-2 cursor-pointer group" onClick={() => {
                // Find matching story or create a mock one
                const story = discoverItems.find(s => s.title === item.title);
                if (story) {
                  // Create a mock story for discover items
                  onOpenStory({
                    category: item.category,
                    color: 'blue',
                    source: 'Prism Wire',
                    time: 'Just now',
                    title: item.title,
                    img: item.img,
                    nuance: null,
                    likeCount: '0',
                    lensData: {
                      raw: { title: item.title, summary: 'Click to read more...' },
                      explained: { title: item.title, summary: 'Click to read more...' },
                      debunked: { title: item.title, summary: 'Click to read more...' },
                    },
                  } as Story);
                }
              }}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-800 relative">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  {item.trend && (
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-medium text-green-300 border border-green-500/30">
                      {item.trend}
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium leading-snug text-gray-200 group-hover:text-white transition-colors">
                  {item.title}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 text-sm py-8">No stories found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

