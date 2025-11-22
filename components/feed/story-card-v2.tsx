'use client';

import Image from 'next/image';
import { Heart, Sparkles, Share2, Scale, Clock, AlertTriangle, FileText, Lightbulb, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Story, PrismLens } from '@/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getLensContentFormat } from '@/lib/lens-formatters';

interface StoryCardV2Props {
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

export function StoryCardV2({ story, currentLens, onOpenStory, onOpenContext }: StoryCardV2Props) {
  const [isLiked, setIsLiked] = useState(false);
  const tagClass = colorMap[story.color] || colorMap['blue'];
  const lensContent = story.lensData[currentLens] || story.lensData.raw;
  const contentFormat = getLensContentFormat(currentLens, lensContent.summary);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Lens-specific styling
  const lensStyles = {
    raw: {
      titleSize: 'text-xl',
      titleWeight: 'font-semibold',
      padding: 'px-5 pb-24',
      spacing: 'mb-2',
      icon: FileText,
      iconSize: 14,
    },
    explained: {
      titleSize: 'text-2xl',
      titleWeight: 'font-semibold',
      padding: 'px-6 pb-28',
      spacing: 'mb-4',
      icon: Lightbulb,
      iconSize: 16,
    },
    debunked: {
      titleSize: 'text-xl',
      titleWeight: 'font-bold',
      padding: 'px-5 pb-24',
      spacing: 'mb-3',
      icon: ShieldCheck,
      iconSize: 14,
    },
  };

  const currentStyle = lensStyles[currentLens];
  const LensIcon = currentStyle.icon;

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
          <div className="p-2.5 rounded-full backdrop-blur-xl bg-white/10 border border-white/30 group-hover:bg-white/20 group-hover:border-white/50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all shadow-lg relative overflow-hidden active:scale-90">
            <Sparkles size={24} className="text-white relative z-10" />
          </div>
          <span className="text-xs font-medium drop-shadow-md font-bold text-white/90 group-hover:text-white transition-colors">Prism</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2.5 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-all active:scale-90">
            <Share2 size={24} className="text-white" />
          </div>
          <span className="text-xs font-medium drop-shadow-md">Share</span>
        </button>
      </div>

      <div className={cn("relative z-10 w-full max-w-[85%] pointer-events-none transition-all duration-500", currentStyle.padding)}>
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
          className={cn(
            "leading-snug text-shadow pr-4 pointer-events-auto cursor-pointer hover:underline underline-offset-4 decoration-white/30 transition-all duration-300",
            currentStyle.titleSize,
            currentStyle.titleWeight,
            currentStyle.spacing
          )}
        >
          {lensContent.title}
        </h2>

        {/* Content based on lens type */}
        <div className="transition-all duration-500 animate-in fade-in">
          {currentLens === 'raw' && (
            <p className="text-sm text-gray-300 line-clamp-2 mb-4 leading-relaxed text-shadow">
              {contentFormat.type === 'paragraph' && contentFormat.text}
            </p>
          )}

          {currentLens === 'explained' && (
            <div className="mb-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} className="text-white/60" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Context</span>
              </div>
              {contentFormat.type === 'bullets' && (
                <ul className="space-y-2">
                  {contentFormat.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-sm text-gray-300 leading-relaxed text-shadow flex items-start gap-2 opacity-0 animate-[fadeInSlideLeft_0.4s_ease-out_forwards]" style={{ animationDelay: `${idx * 100}ms` }}>
                      <span className="text-white/40 mt-1.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {currentLens === 'debunked' && (
            <div className="mb-4 space-y-3">
              {contentFormat.type === 'fact-check' && (
                <>
                  {contentFormat.factCheck.claim && (
                    <div className="bg-red-500/10 border-l-2 border-red-400/40 pl-3 py-2 rounded-r">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-300">Claim</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{contentFormat.factCheck.claim}</p>
                    </div>
                  )}
                  <div className="bg-green-500/10 border-l-2 border-green-400/40 pl-3 py-2 rounded-r opacity-0 animate-[fadeInSlideRight_0.4s_ease-out_forwards]">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 size={12} className="text-green-400 opacity-0 animate-[zoomIn_0.5s_ease-out_forwards]" style={{ animationDelay: '200ms' }} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-green-300">Reality</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{contentFormat.factCheck.reality}</p>
                    {contentFormat.factCheck.points.length > 0 && (
                      <ul className="mt-2 space-y-1.5">
                        {contentFormat.factCheck.points.map((point, idx) => (
                          <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                            <CheckCircle2 size={10} className="text-green-400/60 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

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

