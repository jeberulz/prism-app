'use client';

import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Scale, ChevronDown, Info, X, BrainCircuit, Search, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- 1. Prism Insight Component ---
export function PrismInsight({ type, preview, content }: { type: 'fact' | 'context' | 'counterpoint', preview: string, content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const icons = { 
    fact: <CheckCircle2 size={14} />, 
    context: <Sparkles size={14} />, 
    counterpoint: <Scale size={14} /> 
  };
  
  const colors = {
    fact: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20",
    context: "text-purple-400 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20",
    counterpoint: "text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20"
  };

  return (
    <div className="my-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all group",
          colors[type]
        )}
      >
        <div className="group-hover:scale-110 transition-transform">{icons[type]}</div>
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{type}</span>
        <div className="h-3 w-[1px] bg-current opacity-20" />
        <span className="text-sm truncate flex-1 text-left text-gray-200 group-hover:text-white transition-colors">{preview}</span>
        <ChevronDown size={16} className={`opacity-60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={cn(
        "grid transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr] mt-2 opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <div className="p-4 bg-[#111] border border-white/5 rounded-xl">
            <p className="text-sm text-gray-300 leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. Smart Entity Component ---
interface SmartEntityProps {
  term: string;
  type: 'person' | 'company' | 'concept' | 'legal';
  definition: string;
}

export function SmartEntity({ term, type, definition }: SmartEntityProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const typeColors = {
    person: "border-blue-500/30 text-blue-300 hover:bg-blue-500/10",
    company: "border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10",
    concept: "border-purple-500/30 text-purple-300 hover:bg-purple-500/10",
    legal: "border-rose-500/30 text-rose-300 hover:bg-rose-500/10"
  };

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "border-b border-dashed transition-colors px-0.5 rounded mx-0.5 font-medium",
          typeColors[type],
          isOpen && "bg-white/10 text-white border-solid border-white/40"
        )}
      >
        {term}
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[50]" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 z-[51] animate-in fade-in zoom-in-95 duration-200 origin-bottom">
            <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-3 shadow-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{type}</span>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                  <X size={12} />
                </button>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{term}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{definition}</p>
            </div>
            <div className="w-3 h-3 bg-[#1A1A1A] border-r border-b border-white/10 transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
          </div>
        </>
      )}
    </span>
  );
}

// --- 3. Sentiment Wrapper Component ---
export function SentimentWrapper({ 
  sentiment, 
  children 
}: { 
  sentiment: 'positive' | 'negative' | 'neutral' | 'controversial', 
  children: React.ReactNode 
}) {
  const styles = {
    positive: {
      border: "from-emerald-500",
      bg: "group-hover:bg-emerald-500/5"
    },
    negative: {
      border: "from-rose-500",
      bg: "group-hover:bg-rose-500/5"
    },
    neutral: {
      border: "from-gray-500",
      bg: "group-hover:bg-gray-500/5"
    },
    controversial: {
      border: "from-amber-500",
      bg: "group-hover:bg-amber-500/5"
    }
  };

  const style = styles[sentiment];

  return (
    <div className={cn("relative pl-5 -ml-5 py-1 group transition-colors rounded-r-lg", style.bg)}>
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b to-transparent opacity-40 group-hover:opacity-100 transition-opacity",
        style.border
      )} />
      {children}
    </div>
  );
}

// --- 4. Demo Controls Component ---
export type DemoMode = 'standard' | 'insights' | 'entities' | 'sentiment';

export function DemoControls({ currentMode, onModeChange }: { currentMode: DemoMode, onModeChange: (mode: DemoMode) => void }) {
  const modes: { id: DemoMode, icon: React.ReactNode, label: string }[] = [
    { id: 'standard', icon: <Info size={14} />, label: 'Standard' },
    { id: 'insights', icon: <BrainCircuit size={14} />, label: 'Insights' },
    { id: 'entities', icon: <Search size={14} />, label: 'Entities' },
    { id: 'sentiment', icon: <Activity size={14} />, label: 'Sentiment' },
  ];

  return (
    <div className="flex items-center justify-center w-full mb-8">
      <div className="bg-white/5 p-1 rounded-xl border border-white/5 flex gap-1 overflow-x-auto max-w-full no-scrollbar">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
              currentMode === mode.id 
                ? "bg-white text-black shadow-sm" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            {mode.icon}
            <span>{mode.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

