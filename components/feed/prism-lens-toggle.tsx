'use client';

import { PrismLens } from '@/types';
import { cn } from '@/lib/utils';

interface PrismLensToggleProps {
  currentLens: PrismLens;
  onLensChange: (lens: PrismLens) => void;
}

export function PrismLensToggle({ currentLens, onLensChange }: PrismLensToggleProps) {
  const lenses: { value: PrismLens; label: string }[] = [
    { value: 'raw', label: 'Raw' },
    { value: 'explained', label: 'Explained' },
    { value: 'debunked', label: 'Debunked' },
  ];

  return (
    <div className="pointer-events-auto flex items-center gap-1 bg-black/40 backdrop-blur-xl rounded-full p-1 border border-white/10 shadow-lg transform scale-90 origin-top">
      {lenses.map((lens) => (
        <button
          key={lens.value}
          onClick={() => onLensChange(lens.value)}
          className={cn(
            "px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all",
            currentLens === lens.value
              ? "text-white bg-white/10 border border-white/5 shadow-inner"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          {lens.label}
        </button>
      ))}
    </div>
  );
}

