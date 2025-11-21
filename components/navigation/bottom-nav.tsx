'use client';

import { Home, Compass, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'home' | 'discover' | 'profile';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  const tabs: { id: Tab; icon: typeof Home; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-[80px] z-30 glass-nav flex justify-around items-center border-t border-white/5 pb-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <div
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 cursor-pointer w-16 transition-colors",
              isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
            )}
          >
            <Icon size={24} className={cn("transition-all", isActive && "stroke-[2.5]")} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

