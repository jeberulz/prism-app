'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, X, MessageSquare } from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

interface InlineAIChatProps {
  children: React.ReactNode;
}

export function InlineAIChat({ children }: InlineAIChatProps) {
  const [selection, setSelection] = useState<{ text: string; rect: DOMRect } | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      if (isChatOpen) return; // Don't update selection while chat is open

      const selected = window.getSelection();
      if (!selected || selected.isCollapsed || !containerRef.current?.contains(selected.anchorNode)) {
        // Only clear if we aren't interacting with the chat
        if (!isChatOpen) {
          setSelection(null);
        }
        return;
      }

      const text = selected.toString().trim();
      if (text.length < 5) return; // Ignore tiny selections

      const range = selected.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelection({
        text,
        rect
      });
    };

    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, [isChatOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
        setIsChatOpen(false);
        setSelection(null);
        setMessages([]);
        window.getSelection()?.removeAllRanges();
      }
    };

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isChatOpen]);

  const handleAskAI = () => {
    if (!selection) return;
    setIsChatOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: generateMockResponse(selection?.text || '', userMsg.text)
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1000);
  };

  const generateMockResponse = (context: string, query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('explain') || q.includes('what')) {
      return "This passage highlights a key shift in market dynamics. Essentially, it's saying that consumer preferences are changing faster than companies can adapt, leading to a disconnect.";
    }
    if (q.includes('why') || q.includes('reason')) {
      return "The primary driver here is social media acceleration. Information spreads instantly, meaning brands don't have the luxury of time they once had.";
    }
    if (q.includes('example') || q.includes('instance')) {
      return "A good example would be the rapid rise and fall of fast-fashion micro-trends, where demand spikes and vanishes within weeks rather than seasons.";
    }
    return "That's an interesting point. Based on the text, the author is suggesting that this isn't just a temporary blip, but a structural change in how value is perceived.";
  };

  // Calculate position for the floating element
  // We want it centered above the selection
  const getPosition = () => {
    if (!selection) return { top: 0, left: 0 };
    
    // Use scroll positions to handle page scrolling
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    return {
      top: selection.rect.top + scrollY - 10, // 10px above selection
      left: selection.rect.left + scrollX + (selection.rect.width / 2)
    };
  };

  const position = getPosition();

  return (
    <div ref={containerRef} className="relative">
      {children}

      {selection && createPortal(
        <div 
          ref={chatRef}
          className="absolute z-[9999] pointer-events-auto"
          style={{ 
            top: position.top, 
            left: position.left,
            transform: 'translate(-50%, -100%)' // Center horizontally, place above
          }}
        >
          {!isChatOpen ? (
            // 1. Trigger Button
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAskAI();
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] text-white rounded-full shadow-xl border border-white/10 hover:scale-105 transition-transform animate-in fade-in zoom-in duration-200 group"
            >
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-xs font-medium pr-1">Ask AI</span>
            </button>
          ) : (
            // 2. Chat Interface
            <div className="w-[320px] bg-[#1A1A1A] rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-bottom">
              {/* Context Header */}
              <div className="p-3 border-b border-white/5 bg-white/5 flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-1.5 mb-1">
                      <MessageSquare size={10} className="text-purple-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Context</span>
                   </div>
                   <p className="text-xs text-gray-300 italic line-clamp-2 pl-1 border-l-2 border-purple-500/30">
                     &ldquo;{selection.text}&rdquo;
                   </p>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-white flex-shrink-0">
                  <X size={14} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="max-h-[200px] overflow-y-auto p-4 space-y-4 no-scrollbar">
                {messages.length === 0 && (
                  <p className="text-xs text-center text-gray-500 py-2">
                    Ask anything about this section...
                  </p>
                )}
                
                {messages.map(msg => (
                  <div key={msg.id} className={cn("flex gap-2", msg.role === 'user' ? "flex-row-reverse" : "")}>
                    {msg.role === 'ai' && (
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles size={10} className="text-purple-400" />
                      </div>
                    )}
                    <div className={cn(
                      "text-xs p-2.5 rounded-2xl max-w-[85%] leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-white/10 text-white rounded-tr-none" 
                        : "bg-[#222] text-gray-200 border border-white/5 rounded-tl-none"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isThinking && (
                  <div className="flex gap-2">
                     <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles size={10} className="text-purple-400" />
                      </div>
                      <div className="flex gap-1 items-center h-8 px-2">
                        <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-white/10 bg-[#111]">
                <div className="flex items-center gap-2 bg-white/5 rounded-full px-1 py-1 border border-white/5 focus-within:border-purple-500/30 transition-colors">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a question..."
                    className="flex-1 bg-transparent border-none text-xs text-white px-3 focus:ring-0 placeholder:text-gray-600 h-8"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isThinking}
                    className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors flex-shrink-0"
                  >
                    <Send size={12} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}

