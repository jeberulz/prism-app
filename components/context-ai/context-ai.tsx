'use client';

import { X, Sparkles } from 'lucide-react';
import { aiContexts } from '@/data/stories';
import { useState, useEffect } from 'react';

interface ContextAIProps {
  category: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContextAI({ category, isOpen, onClose }: ContextAIProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isOpen || !category || !isVisible) return null;

  const data = aiContexts[category] || aiContexts['Default'];

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end transition-all duration-300">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity opacity-100"
        onClick={onClose}
      />

      <div className="glass-panel w-full h-[70vh] rounded-t-[32px] transform transition-transform duration-400 flex flex-col overflow-hidden relative z-10 border-t border-white/20 shadow-2xl slide-up-panel">
        <div className="w-full flex justify-center pt-3 pb-1 cursor-pointer bg-transparent" onClick={onClose}>
          <div className="w-12 h-1 bg-white/30 rounded-full" />
        </div>

        <div className="px-6 pt-2 pb-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-white">Prism Intelligence</h3>
              <p className="text-[10px] text-gray-400 font-medium">{data.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Sentiment</div>
              <div className="text-lg font-semibold text-white">{data.sentiment}</div>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Bias Check</div>
              <div className="text-lg font-semibold text-white">{data.bias}</div>
            </div>
          </div>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">Executive Summary</div>
            <p className="text-sm text-gray-300 leading-relaxed">{data.summary}</p>
          </div>

          <div className="space-y-3">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Key Players</div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                Public Sentiment
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                Media Outlets
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                Regulators
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

