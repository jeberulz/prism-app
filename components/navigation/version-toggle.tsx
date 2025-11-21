'use client';

import { useVersion } from '@/contexts/version-context';
import { cn } from '@/lib/utils';

export function VersionToggle() {
  const { version, toggleVersion } = useVersion();

  return (
    <button
      onClick={toggleVersion}
      className={cn(
        "pointer-events-auto px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300",
        "bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg",
        "hover:bg-white/10 hover:border-white/20 active:scale-95",
        version === 'v2' && "bg-white/10 border-white/20"
      )}
      aria-label={`Switch to ${version === 'v1' ? 'v2' : 'v1'}`}
    >
      <span className="text-white/90">{version}</span>
    </button>
  );
}

