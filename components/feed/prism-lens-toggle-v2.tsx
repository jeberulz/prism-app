'use client';

import { PrismLens } from '@/types';
import { cn } from '@/lib/utils';
import { FileText, Lightbulb, ShieldCheck } from 'lucide-react';

interface PrismLensToggleV2Props {
  currentLens: PrismLens;
  onLensChange: (lens: PrismLens) => void;
}

const lensConfig = {
  raw: {
    label: 'Raw',
    icon: FileText,
    activeWeight: 'font-semibold',
    inactiveWeight: 'font-medium',
  },
  explained: {
    label: 'Explained',
    icon: Lightbulb,
    activeWeight: 'font-semibold',
    inactiveWeight: 'font-medium',
  },
  debunked: {
    label: 'Debunked',
    icon: ShieldCheck,
    activeWeight: 'font-bold',
    inactiveWeight: 'font-medium',
  },
};

export function PrismLensToggleV2({ currentLens, onLensChange }: PrismLensToggleV2Props) {
  const lenses: PrismLens[] = ['raw', 'explained', 'debunked'];

  return (
    <div className="pointer-events-auto flex items-center gap-1 bg-black/40 backdrop-blur-xl rounded-full p-1 border border-white/10 shadow-lg transform scale-90 origin-top">
      {lenses.map((lens) => {
        const config = lensConfig[lens];
        const Icon = config.icon;
        const isActive = currentLens === lens;

        return (
          <button
            key={lens}
            onClick={() => onLensChange(lens)}
            className={cn(
              "px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5",
              isActive
                ? "text-white bg-white/10 border border-white/5 shadow-inner"
                : "text-gray-400 hover:text-white hover:bg-white/5",
              isActive ? config.activeWeight : config.inactiveWeight
            )}
          >
            <Icon 
              size={12} 
              className={cn(
                "transition-all duration-300",
                isActive && "scale-110"
              )} 
            />
            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}



