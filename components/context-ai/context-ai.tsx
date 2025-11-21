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
      setTimeout(() => setIsVisible(false), 300);
      setMessages([]);
      setInputValue('');
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
    <div className="fixed inset-0 z-[10000] flex flex-col justify-end transition-all duration-300">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity opacity-100"
        onClick={onClose}
      />

      <div className="glass-panel w-full h-[80vh] max-h-[calc(100vh-80px)] rounded-t-[32px] transform transition-transform duration-400 flex flex-col overflow-hidden relative z-10 border-t border-white/20 shadow-2xl slide-up-panel" style={{ bottom: '80px' }}>
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

        {/* Tabs */}
        <div className="flex gap-6 px-6 pt-4 border-b border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-24 space-y-4">
          {activeTab === 'consensus' && (
            <>
              {/* AT A GLANCE Card */}
              <div className="bg-gray-900/60 rounded-2xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Scale size={16} className="text-blue-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">AT A GLANCE</h4>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {data.atAGlance || data.summary}
                </p>
              </div>

              {/* COMMON GROUND Card */}
              <div className="bg-gray-900/60 rounded-2xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">COMMON GROUND</h4>
                </div>
                <ul className="space-y-2">
                  {(data.commonGround || []).map((point, index) => (
                    <li key={index} className="text-sm text-gray-200 leading-relaxed flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official Source Link */}
              {data.officialSource && (
                <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 rounded-xl p-4 border border-blue-500/30 flex items-center gap-3 transition-colors text-left">
                  <FileText size={20} className="text-blue-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{data.officialSource.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Verified Primary Source • {data.officialSource.source}
                    </div>
                  </div>
                </button>
              )}

              {/* Source Credibility Scoring */}
              {data.sourceCredibility && (
                <div className="space-y-4">
                  <div className="bg-gray-900/60 rounded-2xl p-5 border border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield size={16} className="text-purple-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">SOURCE CREDIBILITY</h4>
                    </div>

                    {/* Methodology Toggle */}
                    <button
                      onClick={() => setMethodologyExpanded(!methodologyExpanded)}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors mb-4"
                    >
                      <div className="flex items-center gap-2">
                        <Info size={14} className="text-gray-400" />
                        <span className="text-xs font-medium text-gray-300">Scoring Methodology</span>
                      </div>
                      {methodologyExpanded ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>

                    {methodologyExpanded && (
                      <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/5">
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {data.sourceCredibility.methodology}
                        </p>
                      </div>
                    )}

                    {/* Source Cards */}
                    <div className="space-y-3">
                      {data.sourceCredibility.sources.map((source, index) => {
                        const scoreColor = source.credibilityScore >= 80 ? 'text-green-400' : source.credibilityScore >= 65 ? 'text-yellow-400' : 'text-red-400';
                        const scoreBgColor = source.credibilityScore >= 80 ? 'bg-green-500/20 border-green-500/30' : source.credibilityScore >= 65 ? 'bg-yellow-500/20 border-yellow-500/30' : 'bg-red-500/20 border-red-500/30';
                        const isExpanded = expandedCredibility === source.name;
                        
                        return (
                          <div
                            key={index}
                            className={cn(
                              "rounded-xl border transition-all",
                              scoreBgColor,
                              isExpanded && "border-opacity-50"
                            )}
                          >
                            <button
                              onClick={() => setExpandedCredibility(isExpanded ? null : source.name)}
                              className="w-full p-4 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3 flex-1 text-left">
                                <div className="flex flex-col items-center min-w-[50px]">
                                  <div className={cn("text-2xl font-bold", scoreColor)}>
                                    {source.credibilityScore}
                                  </div>
                                  <div className="text-[9px] text-gray-400 uppercase tracking-wider">Score</div>
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-semibold text-white mb-1">{source.name}</div>
                                  <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                      <TrendingUp size={12} />
                                      {source.trackRecord.factCheckAccuracy}% accuracy
                                    </span>
                                    <span>•</span>
                                    <span>{source.trackRecord.retractionRate}% retractions</span>
                                  </div>
                                </div>
                              </div>
                              {isExpanded ? (
                                <ChevronUp size={16} className="text-gray-400 ml-2" />
                              ) : (
                                <ChevronDown size={16} className="text-gray-400 ml-2" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                                {/* Track Record */}
                                <div className="space-y-2">
                                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Track Record</div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white/5 rounded-lg p-2">
                                      <div className="text-xs text-gray-400 mb-1">Fact-Check Accuracy</div>
                                      <div className="text-sm font-semibold text-white">{source.trackRecord.factCheckAccuracy}%</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-2">
                                      <div className="text-xs text-gray-400 mb-1">Retraction Rate</div>
                                      <div className="text-sm font-semibold text-white">{source.trackRecord.retractionRate}%</div>
                                    </div>
                                  </div>
                                </div>

                                {/* Bias Pattern */}
                                <div className="space-y-2">
                                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Bias Pattern</div>
                                  <div className="flex gap-2 flex-wrap">
                                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                                      {source.biasPattern.political.charAt(0).toUpperCase() + source.biasPattern.political.slice(1)}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                                      {source.biasPattern.economic.charAt(0).toUpperCase() + source.biasPattern.economic.slice(1)}
                                    </span>
                                  </div>
                                </div>

                                {/* Last Verified */}
                                <div className="text-xs text-gray-500">
                                  Last verified: {new Date(source.lastVerified).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'perspectives' && (
            <div className="space-y-4">
              {/* CORE DIVERGENCE */}
              {data.coreDivergence && (
                <div className="bg-gray-900/60 rounded-2xl p-5 border border-orange-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch size={16} className="text-orange-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">CORE DIVERGENCE</h4>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {data.coreDivergence.title}
                  </p>
                </div>
              )}

              {/* PERSPECTIVES - Side by Side */}
              {data.perspectives && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Perspective */}
                  <div className="bg-gray-900/60 rounded-2xl p-5 border border-blue-500/30">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                      {data.perspectives.left.title}
                    </h4>
                    <p className="text-sm text-gray-200 leading-relaxed mb-3">
                      {data.perspectives.left.text}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <span className="text-[10px] font-medium text-blue-300">
                          {data.perspectives.left.source}
                        </span>
                      </div>
                      {data.sourceCredibility && (() => {
                        const source = data.sourceCredibility.sources.find(s => s.name === data.perspectives?.left.source);
                        if (source) {
                          const scoreColor = source.credibilityScore >= 80 ? 'text-green-400 border-green-500/30 bg-green-500/10' : source.credibilityScore >= 65 ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' : 'text-red-400 border-red-500/30 bg-red-500/10';
                          return (
                            <div className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium", scoreColor)}>
                              <Shield size={10} />
                              {source.credibilityScore}
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>

                  {/* Right Perspective */}
                  <div className="bg-gray-900/60 rounded-2xl p-5 border border-purple-500/30">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
                      {data.perspectives.right.title}
                    </h4>
                    <p className="text-sm text-gray-200 leading-relaxed mb-3">
                      {data.perspectives.right.text}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                        <span className="text-[10px] font-medium text-purple-300">
                          {data.perspectives.right.source}
                        </span>
                      </div>
                      {data.sourceCredibility && (() => {
                        const source = data.sourceCredibility.sources.find(s => s.name === data.perspectives?.right.source);
                        if (source) {
                          const scoreColor = source.credibilityScore >= 80 ? 'text-green-400 border-green-500/30 bg-green-500/10' : source.credibilityScore >= 65 ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' : 'text-red-400 border-red-500/30 bg-red-500/10';
                          return (
                            <div className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium", scoreColor)}>
                              <Shield size={10} />
                              {source.credibilityScore}
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* LANGUAGE ANALYSIS */}
              {data.languageAnalysis && data.languageAnalysis.length > 0 && (
                <div className="bg-gray-900/60 rounded-2xl p-5 border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye size={16} className="text-purple-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">LANGUAGE ANALYSIS</h4>
                  </div>
                  <div className="space-y-4">
                    {data.languageAnalysis.map((analysis, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-200">
                              &ldquo;{analysis.term}&rdquo;
                            </span>
                            <span className="text-xs text-gray-400 ml-2">
                              ({analysis.type})
                            </span>
                          </div>
                          <span className={cn(
                            "text-xs font-medium",
                            analysis.color === 'blue' ? "text-blue-400" : "text-purple-400"
                          )}>
                            {analysis.usedBy}
                          </span>
                        </div>
                        <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "absolute left-0 top-0 h-full rounded-full transition-all",
                              analysis.color === 'blue'
                                ? "bg-blue-500"
                                : "bg-purple-500"
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
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-24 px-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.isAI ? "items-start" : "items-end flex-row-reverse"
                    )}
                  >
                    {message.isAI && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles size={12} className="text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 max-w-[80%]",
                        message.isAI
                          ? "bg-gray-900/60 border border-white/5"
                          : "bg-blue-500/20 border border-blue-500/30"
                      )}
                    >
                      <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <Sparkles size={12} className="text-white" />
                    </div>
                    <div className="bg-gray-900/60 rounded-2xl px-4 py-3 border border-white/5">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggested Questions */}
                {messages.length === 1 && !isTyping && (
                  <div className="space-y-2 pt-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="w-full text-left bg-gray-900/60 hover:bg-gray-900/80 rounded-xl px-4 py-3 border border-white/5 text-sm text-gray-200 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="pt-4 pb-6 px-6 border-t border-white/5">
                <div className="flex gap-2 items-center">
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
                    placeholder="Ask Prism anything..."
                    className="flex-1 bg-gray-900/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    disabled={isTyping}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0",
                      inputValue.trim() && !isTyping
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    )}
                    aria-label="Send message"
                  >
                    <Send size={18} />
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
