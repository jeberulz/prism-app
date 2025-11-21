'use client';

import Image from 'next/image';
import { ChevronDown, Bookmark, Share2 } from 'lucide-react';
import { Story } from '@/types';
import { useState, useEffect } from 'react';

interface StoryReaderProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StoryReader({ story, isOpen, onClose }: StoryReaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isOpen || !story || !isVisible) return null;

  return (
    <div className={isOpen ? "absolute inset-0 z-40 flex flex-col bg-black overflow-hidden slide-up-panel" : "hidden"}>
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none">
        <button
          onClick={onClose}
          className="pointer-events-auto p-3 bg-black/30 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
          aria-label="Close story"
        >
          <ChevronDown size={24} />
        </button>
        <div className="flex gap-3 pointer-events-auto">
          <button className="p-3 bg-black/30 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Bookmark size={20} />
          </button>
          <button className="p-3 bg-black/30 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto h-full no-scrollbar bg-[#050505]">
        <div className="relative h-[55vh] w-full">
          <Image
            src={story.img}
            alt={story.title}
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
        </div>
        <div className="px-6 -mt-16 relative z-10 pb-32">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 backdrop-blur-sm text-white border border-white/10">
              {story.category}
            </span>
            <span className="text-xs font-medium text-gray-300">
              {story.source} • {story.time}
            </span>
          </div>
          <h1 className="text-[26px] font-bold leading-[1.2] text-white mb-6 tracking-tight">
            {story.title}
          </h1>

          <div className="space-y-5 text-gray-300 leading-relaxed text-[15px] font-light tracking-wide">
            <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-white first-letter:mr-1 first-letter:float-left text-gray-200 font-normal">
              The rapid shift in consumer behavior has taken analysts by surprise. What started as a niche trend on social media has quickly evolved into a significant market force.
            </p>
            <p>
              &ldquo;We haven&apos;t seen engagement metrics this high since 2019,&rdquo; notes a senior analyst from the firm. The data suggests a fundamental disconnect between traditional forecasting models and the actual pulse of the demographic.
            </p>
            <div className="my-8 border-l-[3px] border-purple-500 pl-5 py-1">
              <p className="text-white font-medium italic text-lg leading-snug">
                &ldquo;It&apos;s not just a trend, it&apos;s a complete restructuring of value perception.&rdquo;
              </p>
            </div>
            <p>
              As the situation develops, experts warn that companies failing to adapt to this speed of information travel will be left behind. The viral nature of the phenomenon means reputation can be built or dismantled in hours, not weeks.
            </p>
            <p>
              Moving forward, the focus shifts to sustainability. Can this momentum be maintained, or is it another flash in the pan? Early indicators suggest the former.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Related Coverage</h4>
            <div className="bg-gray-900/40 p-4 rounded-xl border border-white/5 flex gap-4 active:bg-gray-900/60 transition-colors cursor-pointer">
              <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                  alt="Related"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[10px] text-purple-400 mb-1 font-medium uppercase tracking-wide">
                  Analysis
                </div>
                <div className="text-sm font-semibold text-white leading-snug">
                  Why the algorithms favor controversy over facts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

