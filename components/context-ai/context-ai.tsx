'use client';

import { X, Sparkles, Scale, CheckCircle2, FileText, Send, GitBranch, Eye, Shield, TrendingUp, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { aiContexts } from '@/data/stories';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ContextAIProps {
  category: string | null;
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'consensus' | 'perspectives' | 'copilot';

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: Date;
}

export function ContextAI({ category, isOpen, onClose }: ContextAIProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('consensus');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedCredibility, setExpandedCredibility] = useState<string | null>(null);
  const [methodologyExpanded, setMethodologyExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to trigger animation
      setTimeout(() => setIsAnimating(true), 10);
      setActiveTab('consensus');
      // Initialize with welcome message when opening Copilot tab
      if (category) {
        const welcomeMessage: Message = {
          id: 'welcome',
          text: `I've analyzed 14 sources. The main disagreement is about whether high prices are caused by monopoly power or simple supply and demand. What would you like to explore?`,
          isAI: true,
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
        setMessages([]);
        setInputValue('');
      }, 300);
    }
  }, [isOpen, category]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (activeTab === 'copilot') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [activeTab]);

  const suggestedQuestions = [
    "Explain like I'm 5",
    "Who funds these sources?",
    "What's not being said?",
  ];

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('explain') || lowerMessage.includes('5') || lowerMessage.includes('simple')) {
      return "Think of it like a lemonade stand. If one kid controls all the lemons in town, they can charge whatever they want. That's monopoly power. But if lemons are just expensive everywhere because of bad weather, that's supply and demand. The debate is: which one is happening here?";
    }
    
    if (lowerMessage.includes('fund') || lowerMessage.includes('who') || lowerMessage.includes('source')) {
      return "The sources range from consumer advocacy groups (often funded by donations) to industry trade associations (funded by companies). Academic sources are typically university-funded. I've found that funding doesn't always predict position—some industry sources acknowledge problems, and some consumer groups have nuanced views.";
    }
    
    if (lowerMessage.includes('not') || lowerMessage.includes('missing') || lowerMessage.includes('said')) {
      return "What's often missing from the discussion: the role of secondary markets, how international competition affects pricing, and the long-term impact on innovation. Also, there's less discussion about whether consumers actually want lower prices if it means less variety or quality.";
    }
    
    // Default responses based on category
    const responses: Record<string, string[]> = {
      Entertainment: [
        "The entertainment industry is complex. The main tension is between protecting artist rights and enabling innovation. Many argue both sides have valid points.",
        "There's a generational divide here. Older consumers value traditional models, while younger audiences embrace new formats. Both perspectives matter.",
        "The data shows mixed signals. Some metrics suggest problems, others suggest the system is working. Context matters a lot here.",
      ],
      Food: [
        "Food pricing involves many factors: supply chains, labor costs, and market dynamics. It's not just one thing causing price increases.",
        "The wellness industry specifically has seen premium pricing for years. The question is whether current increases are justified or opportunistic.",
        "Consumer behavior is shifting—people are willing to pay more for certain foods but are also seeking alternatives. This creates a complex market.",
      ],
      Tech: [
        "Technology regulation is always tricky. Innovation moves fast, but we need safeguards. Finding the balance is the challenge.",
        "Privacy concerns are real, but so are the benefits of new technologies. The debate is about where to draw the line.",
        "Different countries are taking different approaches. Some are more restrictive, others more permissive. Time will tell which works best.",
      ],
    };
    
    const categoryResponses = responses[category || 'Default'] || [
      "That's an interesting question. Let me think about the different angles here...",
      "There are multiple perspectives on this. Some argue one way, others see it differently.",
      "The data suggests a nuanced situation. It's not black and white.",
    ];
    
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: messageText,
      isAI: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        text: simulateAIResponse(messageText),
        isAI: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  if (!isOpen || !category || !isVisible) return null;

  const data = aiContexts[category] || aiContexts['Default'];

  const tabs: { id: Tab; label: string }[] = [
    { id: 'consensus', label: 'Consensus' },
    { id: 'perspectives', label: 'Perspectives' },
    { id: 'copilot', label: 'Copilot' },
  ];

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col justify-end pointer-events-none">
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      <div 
        className={cn(
          "glass-panel w-full h-[80vh] max-h-[calc(100vh-80px)] rounded-t-[32px] flex flex-col overflow-hidden relative z-10 border-t border-white/20 shadow-2xl pointer-events-auto",
          isAnimating ? "slide-up-panel" : "slide-down-panel"
        )}
        style={{ bottom: '80px' }}
      >
        <div className="w-full flex justify-center pt-3 pb-1 cursor-pointer bg-transparent" onClick={onClose}>
          <div className="w-12 h-1 bg-white/30 rounded-full" />
        </div>

        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
             {/* Minimal Prism Icon */}
             <div className="w-6 h-6 flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
             </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-white leading-none">Prism Intelligence</h3>
              {data.subtitle && <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-wider">{data.subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs - Minimal */}
        <div className="flex gap-8 px-6 border-b border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-white border-b-2 border-white"
                  : "text-gray-500 hover:text-gray-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-24 space-y-4">
          {activeTab === 'consensus' && (
            <>
              {/* AT A GLANCE Card */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">At a Glance</h4>
                <p className="text-base text-gray-100 leading-relaxed font-light">
                  {data.atAGlance || data.summary}
                </p>
              </div>

              {/* COMMON GROUND Card */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Common Ground</h4>
                <ul className="space-y-3">
                  {(data.commonGround || []).map((point, index) => (
                    <li key={index} className="text-sm text-gray-300 leading-relaxed flex items-start gap-3 pl-1 border-l border-white/10">
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official Source Link */}
              {data.officialSource && (
                <div className="mb-6">
                   <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Primary Source</h4>
                    <a href="#" className="block group">
                      <div className="flex items-center justify-between py-3 border-b border-white/10 group-hover:border-white/30 transition-colors">
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{data.officialSource.title}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {data.officialSource.source}
                          </div>
                        </div>
                        <FileText size={16} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </a>
                </div>
              )}
              
              {/* Source Credibility Scoring - Simplified */}
              {data.sourceCredibility && (
                <div className="space-y-4">
                   <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">Source Analysis</h4>
                      <button
                        onClick={() => setMethodologyExpanded(!methodologyExpanded)}
                        className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
                      >
                        <Info size={10} />
                        Methodology
                      </button>
                   </div>

                    {methodologyExpanded && (
                      <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/5">
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {data.sourceCredibility.methodology}
                        </p>
                      </div>
                    )}

                    <div className="space-y-1">
                      {data.sourceCredibility.sources.map((source, index) => {
                        const scoreColor = source.credibilityScore >= 80 ? 'text-emerald-400' : source.credibilityScore >= 65 ? 'text-amber-400' : 'text-rose-400';
                        const isExpanded = expandedCredibility === source.name;
                        
                        return (
                          <div
                            key={index}
                            className="border-b border-white/5 last:border-0"
                          >
                            <button
                              onClick={() => setExpandedCredibility(isExpanded ? null : source.name)}
                              className="w-full py-3 flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-3">
                                 <div className={cn("text-xs font-mono font-bold w-8 text-right", scoreColor)}>
                                    {source.credibilityScore}
                                  </div>
                                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{source.name}</span>
                              </div>
                              {isExpanded ? (
                                <ChevronUp size={14} className="text-gray-600" />
                              ) : (
                                <ChevronDown size={14} className="text-gray-600" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="pl-11 pb-4 pr-4 space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <div className="text-[10px] text-gray-500 uppercase mb-1">Accuracy</div>
                                      <div className="text-sm font-medium text-gray-200">{source.trackRecord.factCheckAccuracy}%</div>
                                    </div>
                                    <div>
                                      <div className="text-[10px] text-gray-500 uppercase mb-1">Bias</div>
                                      <div className="text-sm font-medium text-gray-200">
                                         {source.biasPattern.political.charAt(0).toUpperCase() + source.biasPattern.political.slice(1)}
                                      </div>
                                    </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'perspectives' && (
            <div className="space-y-8">
              {/* CORE DIVERGENCE */}
              {data.coreDivergence && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Core Divergence</h4>
                  <p className="text-base text-gray-100 leading-relaxed font-light">
                    {data.coreDivergence.title}
                  </p>
                </div>
              )}

              {/* PERSPECTIVES - Side by Side */}
              {data.perspectives && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Perspective */}
                  <div className="relative pl-4 border-l-2 border-blue-500/30">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
                      {data.perspectives.left.title}
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed mb-3">
                      {data.perspectives.left.text}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Source: {data.perspectives.left.source}
                      </span>
                    </div>
                  </div>

                  {/* Right Perspective */}
                  <div className="relative pl-4 border-l-2 border-purple-500/30">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
                      {data.perspectives.right.title}
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed mb-3">
                      {data.perspectives.right.text}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Source: {data.perspectives.right.source}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* LANGUAGE ANALYSIS */}
              {data.languageAnalysis && data.languageAnalysis.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Language Analysis</h4>
                  <div className="space-y-4">
                    {data.languageAnalysis.map((analysis, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                             <span className="text-gray-200 font-medium">&ldquo;{analysis.term}&rdquo;</span>
                             <span className="text-gray-500 text-xs">({analysis.type})</span>
                          </div>
                          <span className={cn(
                            "text-xs font-medium",
                            analysis.color === 'blue' ? "text-blue-400" : "text-purple-400"
                          )}>
                            Used by {analysis.usedBy}
                          </span>
                        </div>
                        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "absolute left-0 top-0 h-full rounded-full transition-all",
                              analysis.color === 'blue'
                                ? "bg-blue-500/50"
                                : "bg-purple-500/50"
                            )}
                            style={{ width: `${analysis.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'copilot' && (
            <div className="flex flex-col h-full">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-24 px-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-4",
                      message.isAI ? "items-start" : "items-end flex-row-reverse"
                    )}
                  >
                    {message.isAI && (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles size={14} className="text-white/70" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[85%] text-sm leading-relaxed",
                        message.isAI
                          ? "text-gray-200"
                          : "bg-white/10 text-white px-4 py-2.5 rounded-2xl rounded-tr-none"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={14} className="text-white/70" />
                    </div>
                    <div className="flex gap-1 pt-3">
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                {/* Suggested Questions */}
                {messages.length === 1 && !isTyping && (
                  <div className="grid grid-cols-1 gap-2 pt-4 pl-12">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors py-2 border-b border-white/5 last:border-0 flex items-center gap-2 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        {question}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="pt-4 pb-6 px-6 border-t border-white/10 bg-[#121212]">
                <div className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-full px-2 py-2 focus-within:border-white/20 focus-within:bg-white/10 transition-all">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask follow-up..."
                    className="flex-1 bg-transparent border-none text-sm text-white placeholder:text-gray-500 focus:ring-0 px-3"
                    disabled={isTyping}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0",
                      inputValue.trim() && !isTyping
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-white/5 text-gray-500 cursor-not-allowed"
                    )}
                    aria-label="Send message"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
