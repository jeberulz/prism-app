'use client';

import Image from 'next/image';
import { Settings, Camera, ChevronRight } from 'lucide-react';

export function ProfileView() {
  return (
    <div className="h-full bg-black text-white overflow-hidden flex flex-col pb-[80px] pb-safe">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-12">
        <div className="flex justify-end mb-4">
          <button className="p-2 text-gray-400 hover:text-white">
            <Settings size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full border-2 border-gray-800 p-1 mb-4 relative group cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces"
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full rounded-full object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={24} className="text-white" />
            </div>
          </div>
          <h2 className="text-xl font-semibold tracking-tight">John Iseghohi</h2>
          <span className="text-sm text-gray-500">@john_iseghohi</span>
          <div className="flex gap-6 mt-4 text-sm">
            <div className="text-center">
              <span className="font-bold text-white">248</span>{' '}
              <span className="text-gray-500">Read</span>
            </div>
            <div className="text-center">
              <span className="font-bold text-white">52</span>{' '}
              <span className="text-gray-500">Saved</span>
            </div>
            <div className="text-center">
              <span className="font-bold text-white">12k</span>{' '}
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-sm font-medium text-gray-200">Interest Profile</h3>
            <span className="text-xs text-blue-400">View Analysis</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex mb-2">
            <div className="h-full bg-purple-500" style={{ width: '45%' }} />
            <div className="h-full bg-orange-500" style={{ width: '30%' }} />
            <div className="h-full bg-blue-500" style={{ width: '25%' }} />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest mt-2">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              Culture
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              Lifestyle
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              Tech
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest px-1">Bookmarks</h3>
          <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-800 flex gap-4 items-center">
            <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="https://picsum.photos/200/200?random=22"
                alt="Bookmark"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate">Why algorithms favor controversy</h4>
              <p className="text-xs text-gray-500">Tech • 5m read</p>
            </div>
            <button className="text-gray-500">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

