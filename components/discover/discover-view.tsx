'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Search, Shuffle, Music, Utensils, Bot, GitBranch } from 'lucide-react';
import { discoverItems } from '@/data/stories';
import { Story } from '@/types';

interface DiscoverViewProps {
  onOpenStory: (story: Story) => void;
}

const categories = ['All', 'Music', 'Food', 'Tech'];

const pulseItems = [
  {
    title: "Global Internet Outage",
    leftSide: "Cyberattack Rumor",
    rightSide: "Infrastructure Update",
    img: "https://picsum.photos/800/400?random=20",
    colorFrom: "from-amber-900/80",
    colorTo: "to-orange-900/80",
    accent: "text-amber-300",
    subAccent: "text-amber-200",
    dotColor: "bg-amber-300"
  },
  {
    title: "Market Flash Crash",
    leftSide: "AI Trading Error",
    rightSide: "Market Correction",
    img: "https://picsum.photos/800/400?random=21",
    colorFrom: "from-red-900/80",
    colorTo: "to-rose-900/80",
    accent: "text-red-300",
    subAccent: "text-red-200",
    dotColor: "bg-red-300"
  },
  {
    title: "New Energy Bill",
    leftSide: "Innovation Boost",
    rightSide: "Cost Hike Risks",
    img: "https://picsum.photos/800/400?random=22",
    colorFrom: "from-blue-900/80",
    colorTo: "to-indigo-900/80",
    accent: "text-blue-300",
    subAccent: "text-blue-200",
    dotColor: "bg-blue-300"
  }
];

export function DiscoverView({ onOpenStory }: DiscoverViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [currentPulseIndex, setCurrentPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPulseIndex((prev) => (prev + 1) % pulseItems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentPulse = pulseItems[currentPulseIndex];

  const filteredItems = useMemo(() => {
    return discoverItems.filter(item => {
      const matchesCat = filter === 'All' || item.category === filter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, filter]);

  return (
    <div className="h-full bg-black text-white overflow-hidden flex flex-col pb-[80px] pb-safe">
      <div className="px-6 pt-12 pb-4 sticky top-0 bg-black/80 backdrop-blur-md z-20 border-b border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Discover</h1>
          <button className="text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xl border border-white/30 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95 transition-transform flex items-center gap-1 hover:bg-white/20">
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
                ? "bg-white text-black border border-white px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-transform active:scale-95 flex items-center gap-2"
                : "bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap hover:bg-gray-700 transition-colors flex items-center gap-2"
              }
            >
              {cat === 'Music' && <Music size={12} />}
              {cat === 'Food' && <Utensils size={12} />}
              {cat === 'Tech' && <Bot size={12} />}
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-8 relative h-32 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
          <Image
            key={currentPulse.img} // Key forces re-render for transition
            src={currentPulse.img}
            alt="Live Pulse"
            fill
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 animate-in fade-in duration-500"
            unoptimized
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${currentPulse.colorFrom} ${currentPulse.colorTo} mix-blend-multiply transition-colors duration-500`} />
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${currentPulse.accent} animate-pulse flex items-center gap-1`}>
                <div className={`w-1.5 h-1.5 rounded-full ${currentPulse.dotColor} animate-pulse`} />
                Live Pulse
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${currentPulse.subAccent} flex items-center gap-1`}>
                <GitBranch size={10} />
                High Divergence
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white leading-tight mb-3 animate-in slide-in-from-bottom-2 duration-500 key-[title]">
              {currentPulse.title}
            </h3>
            
            <div className="flex items-center gap-3 text-xs font-medium animate-in slide-in-from-bottom-3 duration-500 delay-100">
              <div className="bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white/90 backdrop-blur-sm">
                {currentPulse.leftSide}
              </div>
              <span className="text-white/40 font-bold text-[10px] uppercase">VS</span>
              <div className="bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white/90 backdrop-blur-sm">
                {currentPulse.rightSide}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div 
              key={currentPulseIndex} // Key restart animation on change
              className="h-full bg-white/50 origin-left animate-[progress_8s_linear]"
            />
          </div>
        </div>

        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">Trending Now</h3>
        <div className="space-y-1 pb-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => {
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
                <span className="text-lg font-bold text-cyan-500/30 w-4 flex-shrink-0 text-center mt-0.5 group-hover:text-cyan-400/60 transition-colors font-mono">
                  {index + 1}
                </span>
                
                <div className="flex-1 min-w-0 py-0.5">
                  <h4 className="text-sm font-medium text-gray-200 leading-snug mb-1.5 group-hover:text-white transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                     <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-cyan-500/10 flex items-center justify-center text-[6px] text-cyan-300 font-bold border border-cyan-500/20">P</div>
                        <span>Prism Wire</span>
                     </div>
                     <span className="text-gray-700">•</span>
                     <span>4h ago</span>
                  </div>
                </div>

                <div className="w-16 h-16 rounded-lg overflow-hidden relative flex-shrink-0 border border-white/10 bg-gray-900 group-hover:border-cyan-500/20 transition-colors">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    unoptimized
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-sm py-8">No stories found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

