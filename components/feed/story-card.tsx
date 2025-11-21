'use client';

import Image from 'next/image';
import { Heart, Sparkles, Share2, Scale, Clock, AlertTriangle } from 'lucide-react';
import { Story, PrismLens } from '@/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface StoryCardProps {
  story: Story;
  currentLens: PrismLens;
  onOpenStory: (story: Story) => void;
  onOpenContext: (category: string) => void;
}

const colorMap: Record<string, string> = {
  purple: 'bg-purple-500/20 border-purple-500/30 text-purple-200',
  pink: 'bg-pink-500/20 border-pink-500/30 text-pink-200',
  indigo: 'bg-indigo-500/20 border-indigo-500/30 text-indigo-200',
  red: 'bg-red-500/20 border-red-500/30 text-red-200',
  orange: 'bg-orange-500/20 border-orange-500/30 text-orange-200',
  yellow: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-200',
  green: 'bg-green-500/20 border-green-500/30 text-green-200',
  blue: 'bg-blue-500/20 border-blue-500/30 text-blue-200',
};

export function StoryCard({ story, currentLens, onOpenStory, onOpenContext }: StoryCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const tagClass = colorMap[story.color] || colorMap['blue'];
  const lensContent = story.lensData[currentLens] || story.lensData.raw;

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <article className="snap-item w-full h-full bg-gray-900 flex items-end relative">
      <Image
        src={story.img}
        alt={story.title}
        fill
        className="object-cover opacity-80"
        sizes="100vw"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent h-[65%] mt-auto" />
      
      {story.nuance && (
        <div className="absolute top-24 left-4 z-20 animate-pulse cursor-pointer active:scale-95 transition-transform" onClick={() => onOpenContext(story.category)}>
          <div className="bg-yellow-500/20 backdrop-blur-md border border-yellow-500/40 text-yellow-100 px-3 py-1.5 rounded-full text-[10px] font-medium flex items-center gap-2 shadow-lg">
            <AlertTriangle size={12} />
            <span>{story.nuance}</span>
          </div>
        </div>
      )}

      <div className="absolute right-2 bottom-24 flex flex-col items-center gap-6 z-20 pb-4">
        <div className="w-11 h-11 rounded-full border-2 border-white p-0.5 bg-black overflow-hidden relative shadow-lg">
          <div className="w-full h-full bg-black flex items-center justify-center text-center leading-none">
            <span className="font-bold text-white text-[8px]">{story.source}</span>
          </div>
        </div>
        
        <button className="flex flex-col items-center gap-1 group" onClick={handleLike}>
          <div className={cn(
            "p-2.5 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-all active:scale-90",
            isLiked && "heart-pop"
          )}>
            <Heart size={24} className={cn("text-white transition-colors duration-300", isLiked && "fill-red-500 text-red-500")} />
          </div>
          <span className="text-xs font-medium drop-shadow-md">{story.likeCount}</span>
        </button>

        <button onClick={() => onOpenContext(story.category)} className="flex flex-col items-center gap-1 group">
          <div className="p-2.5 rounded-full backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all shadow-lg relative overflow-hidden active:scale-90">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 via-purple-500/40 to-pink-500/40 opacity-50" />
            <Sparkles size={24} className="text-white relative z-10" />
          </div>
          <span className="text-xs font-medium drop-shadow-md prism-text font-bold">Prism</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2.5 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-all active:scale-90">
            <Share2 size={24} className="text-white" />
          </div>
          <span className="text-xs font-medium drop-shadow-md">Share</span>
        </button>
      </div>

      <div className="relative z-10 px-5 pb-24 w-full max-w-[85%] pointer-events-none">
        <div className="flex items-center gap-2 mb-3 pointer-events-auto">
          <span className={cn(tagClass, "backdrop-blur-md border text-[10px] font-medium px-2 py-1 rounded uppercase tracking-widest shadow-sm")}>
            {story.category}
          </span>
          <span className="text-xs text-gray-300 font-medium flex items-center gap-1">
            <Clock size={12} />
            {story.time}
          </span>
        </div>
        <h2
          onClick={() => onOpenStory(story)}
          className="text-xl font-semibold leading-snug text-shadow mb-2 pr-4 pointer-events-auto cursor-pointer hover:underline underline-offset-4 decoration-white/30 transition-all duration-300"
        >
          {lensContent.title}
        </h2>
        <p className="text-sm text-gray-300 line-clamp-2 mb-4 leading-relaxed text-shadow transition-all duration-300">
          {lensContent.summary}
        </p>
        <div className="flex items-center gap-2 cursor-pointer pointer-events-auto w-fit" onClick={() => onOpenContext(story.category)}>
          <Scale size={16} className="text-white/80" />
          <span className="text-xs font-medium text-white/90 border-white/40 border-b pb-0.5 hover:text-white hover:border-white transition-colors">
            Analyze Impact
          </span>
        </div>
      </div>
    </article>
  );
}

