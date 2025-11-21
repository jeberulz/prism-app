import { Story, DiscoverItem, AIContext } from '@/types';

export const stories: Story[] = [
  {
    category: "Entertainment", color: "purple", source: "Rolling Stone", time: "1h ago",
    title: "The Weeknd's AI vocals controversy sparks industry-wide legal battle.",
    img: "https://picsum.photos/800/1200?random=1",
    nuance: "Missing Context", likeCount: "124k",
    lensData: {
      raw: { title: "The Weeknd's AI vocals controversy sparks industry-wide legal battle.", summary: "Click the headline above to read the full story and analysis..." },
      explained: { title: "Why The Weeknd is suing over AI voice clones.", summary: "Artists are fighting for the right to own their voice. This lawsuit could set a major precedent for AI copyright." },
      debunked: { title: "No, The Weeknd didn't sue OpenAI directly (yet).", summary: "The lawsuit is actually against a specific startup, not the major AI labs. It's a targeted strike, not a general ban." }
    }
  },
  {
    category: "Entertainment", color: "pink", source: "Variety", time: "2h ago",
    title: "Euphoria Season 3 delayed again: HBO cites 'creative overhaul'.",
    img: "https://picsum.photos/800/1200?random=2",
    nuance: null, likeCount: "89k",
    lensData: {
      raw: { title: "Euphoria Season 3 delayed again: HBO cites 'creative overhaul'.", summary: "Click the headline above to read the full story and analysis..." },
      explained: { title: "Euphoria S3 is on hold to age up the characters.", summary: "HBO wants to move the show out of high school. The delay allows for a time-jump narrative." },
      debunked: { title: "Euphoria isn't cancelled, despite the rumors.", summary: "Social media claims of cancellation are false. Scripts are being rewritten, but production is confirmed." }
    }
  },
  {
    category: "Music", color: "purple", source: "Billboard", time: "3h ago",
    title: "TikTok vs UMG: The silent library is hurting emerging artists most.",
    img: "https://picsum.photos/800/1200?random=3",
    nuance: "Biased", likeCount: "45k",
    lensData: {
      raw: { title: "TikTok vs UMG: The silent library is hurting emerging artists most.", summary: "Click the headline above to read the full story and analysis..." },
      explained: { title: "Why your favorite songs are gone from TikTok.", summary: "Universal Music Group pulled their catalog over royalty disputes. Small artists are losing their main discovery platform." },
      debunked: { title: "UMG isn't just 'greedy', TikTok pays very little.", summary: "While UMG is a giant, TikTok pays a fraction of what Spotify does per stream. It's a complex leverage battle." }
    }
  },
  {
    category: "Movies", color: "indigo", source: "Deadline", time: "4h ago",
    title: "A24's new horror marketing strategy is terrifyingly effective.",
    img: "https://picsum.photos/800/1200?random=4",
    nuance: null, likeCount: "67k",
    lensData: {
      raw: { title: "A24's new horror marketing strategy is terrifyingly effective.", summary: "Click the headline above to read the full story and analysis..." },
      explained: { title: "How A24 uses viral stunts to sell scary movies.", summary: "From fake websites to real-life pranks, they build hype by blurring reality and fiction." },
      debunked: { title: "The 'viral' stunts are carefully paid ads.", summary: "It feels organic, but most of the 'fan theories' are seeded by marketing agencies. It's manufactured virality." }
    }
  },
  {
    category: "Streaming", color: "red", source: "The Verge", time: "5h ago",
    title: "Netflix password crackdown results are in: Subscribers represent huge spike.",
    img: "https://picsum.photos/800/1200?random=5",
    nuance: "Data Dispute", likeCount: "32k",
    lensData: {
      raw: { title: "Netflix password crackdown results are in: Subscribers represent huge spike.", summary: "Click the headline above to read the full story and analysis..." },
      explained: { title: "Stopping password sharing actually made Netflix money.", summary: "People complained, but then they signed up. It worked, and other streamers will likely follow." },
      debunked: { title: "Subscriber numbers are up, but satisfaction is down.", summary: "The 'spike' includes ad-tier signups. Long-term retention might suffer as prices keep rising." }
    }
  },
  {
    category: "Food", color: "orange", source: "Eater", time: "2h ago",
    title: "The $18 Smoothie: Why inflation hit the wellness industry hardest.",
    img: "https://picsum.photos/800/1200?random=6",
    nuance: "High Nuance", likeCount: "28k",
    lensData: {
      raw: { title: "The $18 Smoothie: Why inflation hit the wellness industry hardest.", summary: "Click the headline above to read the full story and analysis..." },
      explained: { title: "Why healthy food is getting so expensive.", summary: "Supply chain issues + high demand for 'superfoods' = skyrocketing prices for your morning smoothie." },
      debunked: { title: "It's not just inflation, it's 'Wellness Tax'.", summary: "Brands are marking up products simply because they are labeled 'healthy'. Basic ingredients haven't risen that much." }
    }
  },
  {
    category: "Tech", color: "blue", source: "Wired", time: "5h ago",
    title: "Lab-grown meat hits grocery shelves in Singapore: Is the US next?",
    img: "https://picsum.photos/800/1200?random=7",
    nuance: "Safety Debate", likeCount: "61k",
    lensData: {
      raw: { title: "Lab-grown meat hits grocery shelves in Singapore: Is the US next?", summary: "Click the headline above to read the full story and analysis..." },
      explained: { title: "Real meat, no animals. It's finally here.", summary: "Cultivated meat is grown from cells. It solves ethical issues, but cost and scaling are still huge hurdles." },
      debunked: { title: "It's not 'fake' meat, but it's not cheap either.", summary: "Don't expect this at Walmart soon. It's a luxury product for now, and US regulators are very cautious." }
    }
  },
  {
    category: "Safety", color: "red", source: "CityLab", time: "1h ago",
    title: "New AI surveillance in subways: Safety breakthrough or privacy nightmare?",
    img: "https://picsum.photos/800/1200?random=8",
    nuance: "High Controversy", likeCount: "18k",
    lensData: {
      raw: { title: "New AI surveillance in subways: Safety breakthrough or privacy nightmare?", summary: "Click the headline above to read the full story and analysis..." },
      explained: { title: "AI cameras are scanning for weapons in the subway.", summary: "The goal is to stop crime before it happens. It detects guns, but critics worry about false positives." },
      debunked: { title: "It's not 'Minority Report' yet.", summary: "The tech is basic object detection, not mind reading. But the privacy trade-off is a very real concern." }
    }
  },
  {
    category: "Traffic", color: "yellow", source: "Urbanist", time: "5h ago",
    title: "Congestion Pricing starts next month: How it impacts your commute.",
    img: "https://picsum.photos/800/1200?random=9",
    nuance: "Polarizing", likeCount: "31k",
    lensData: {
      raw: { title: "Congestion Pricing starts next month: How it impacts your commute.", summary: "Click the headline above to read the full story and analysis..." },
      explained: { title: "Driving into the city is about to cost $15 more.", summary: "To reduce traffic, you pay to enter busy zones. The money fixes the subway. It's controversial but standard in London." },
      debunked: { title: "It won't fix traffic overnight.", summary: "Studies show it takes years to change behavior. Expect chaos for the first few months." }
    }
  },
  {
    category: "Gaming", color: "green", source: "IGN", time: "7h ago",
    title: "Twitch's new payout model causes mass exodus of top streamers.",
    img: "https://picsum.photos/800/1200?random=10",
    nuance: null, likeCount: "55k",
    lensData: {
      raw: { title: "Twitch's new payout model causes mass exodus of top streamers.", summary: "Click the headline above to read the full story and analysis..." },
      explained: { title: "Why streamers are quitting Twitch for Kick.", summary: "Twitch is taking a bigger cut of the money. Competitors are offering better deals to steal talent." },
      debunked: { title: "It's not a 'mass exodus', it's a negotiation tactic.", summary: "Most top streamers are staying. They are just making noise to get better contracts." }
    }
  }
];

export const discoverItems: DiscoverItem[] = [
  { title: "Matcha prices soar 200% globally.", category: "Food", img: "https://picsum.photos/800/600?random=11", trend: "Trending" },
  { title: "Subway surfing crackdown.", category: "Safety", img: "https://picsum.photos/800/600?random=12", trend: null },
  { title: "New VR headset sells out in minutes.", category: "Tech", img: "https://picsum.photos/800/600?random=13", trend: "Hot" },
  { title: "The best ramen spots in NYC right now.", category: "Food", img: "https://picsum.photos/800/600?random=14", trend: null },
  { title: "Indie sleaze fashion return confirmed.", category: "Culture", img: "https://picsum.photos/800/600?random=15", trend: "Viral" },
  { title: "SpaceX launches new satellite network.", category: "Tech", img: "https://picsum.photos/800/600?random=16", trend: null }
];

export const aiContexts: Record<string, AIContext> = {
  "Entertainment": {
    subtitle: "Analyzing Cultural Impact",
    sentiment: "Mixed",
    bias: "Slightly Negative",
    summary: "Current discourse is heavily polarized. While fanbase engagement is at an all-time high, critical reception suggests potential burnout regarding this topic.",
    atAGlance: "The entertainment industry is experiencing a significant shift in how content is consumed and monetized. Recent controversies around AI-generated content and streaming platform disputes are reshaping the landscape.",
    commonGround: [
      "Fan engagement metrics are at record highs across platforms.",
      "Both creators and platforms are seeking fair revenue distribution.",
      "AI technology is becoming a central point of industry discussion."
    ],
    officialSource: {
      title: "Industry Report (PDF)",
      url: "#",
      source: "Entertainment Weekly"
    },
    coreDivergence: {
      title: "Sources disagree on whether 'Dynamic Pricing' is a tool for efficiency (Industry View) or exploitation (Consumer View).",
      description: "The fundamental disagreement centers on the interpretation of pricing strategies and their impact on consumers."
    },
    perspectives: {
      left: {
        title: "CONSUMER RIGHTS",
        text: "The monopoly allows Live Nation to bully venues and charge junk fees with no alternative for fans.",
        source: "Vo: Vice"
      },
      right: {
        title: "MARKET/INDUSTRY",
        text: "Breaking up the company won't lower prices. High demand and scalpers are the real issue.",
        source: "WSCNBC"
      }
    },
    languageAnalysis: [
      {
        term: "Extortion",
        type: "Loaded Language",
        percentage: 75,
        usedBy: "Used by Consumer Orgs",
        color: "blue"
      },
      {
        term: "Market Value",
        type: "Euphemism",
        percentage: 80,
        usedBy: "Used by Industry",
        color: "purple"
      }
    ],
    sourceCredibility: {
      methodology: "Credibility scores are calculated using a weighted algorithm that factors in fact-check accuracy (40%), retraction rate (30%), editorial independence (20%), and source transparency (10%). Scores are verified quarterly by independent media analysts.",
      sources: [
        {
          name: "Vo: Vice",
          credibilityScore: 72,
          trackRecord: {
            factCheckAccuracy: 78,
            retractionRate: 2.1
          },
          biasPattern: {
            political: "left",
            economic: "progressive"
          },
          lastVerified: "2024-01-15"
        },
        {
          name: "WSCNBC",
          credibilityScore: 85,
          trackRecord: {
            factCheckAccuracy: 92,
            retractionRate: 0.8
          },
          biasPattern: {
            political: "center",
            economic: "moderate"
          },
          lastVerified: "2024-01-20"
        },
        {
          name: "Rolling Stone",
          credibilityScore: 78,
          trackRecord: {
            factCheckAccuracy: 82,
            retractionRate: 1.5
          },
          biasPattern: {
            political: "left",
            economic: "progressive"
          },
          lastVerified: "2024-01-18"
        },
        {
          name: "Variety",
          credibilityScore: 81,
          trackRecord: {
            factCheckAccuracy: 88,
            retractionRate: 1.2
          },
          biasPattern: {
            political: "center",
            economic: "moderate"
          },
          lastVerified: "2024-01-19"
        }
      ]
    }
  },
  "Food": {
    subtitle: "Analyzing Market Trends",
    sentiment: "Positive",
    bias: "Neutral",
    summary: "This trend is driven by economic factors (inflation) rather than taste. Social sentiment is sympathetic, with high engagement on cost-saving alternatives.",
    atAGlance: "Food prices have surged globally, with wellness and specialty items seeing the highest increases. Consumers are adapting by seeking alternatives and sharing cost-saving strategies.",
    commonGround: [
      "Inflation has affected food prices across all categories.",
      "Consumers are actively seeking budget-friendly alternatives.",
      "Social media is amplifying cost-saving tips and recipes."
    ],
    officialSource: {
      title: "Market Analysis (PDF)",
      url: "#",
      source: "Food Industry Report"
    },
    coreDivergence: {
      title: "Sources disagree on whether price increases are driven by inflation (Economic View) or corporate greed (Consumer View).",
      description: "The debate centers on the root cause of rising food costs."
    },
    perspectives: {
      left: {
        title: "CONSUMER RIGHTS",
        text: "Brands are marking up products simply because they are labeled 'healthy'. Basic ingredients haven't risen that much.",
        source: "Consumer Reports"
      },
      right: {
        title: "MARKET/INDUSTRY",
        text: "Supply chain disruptions and increased demand for premium ingredients drive costs. It's basic economics, not exploitation.",
        source: "Food Industry Weekly"
      }
    },
    languageAnalysis: [
      {
        term: "Wellness Tax",
        type: "Loaded Language",
        percentage: 70,
        usedBy: "Used by Consumer Orgs",
        color: "blue"
      },
      {
        term: "Premium Pricing",
        type: "Euphemism",
        percentage: 75,
        usedBy: "Used by Industry",
        color: "purple"
      }
    ],
    sourceCredibility: {
      methodology: "Credibility scores are calculated using a weighted algorithm that factors in fact-check accuracy (40%), retraction rate (30%), editorial independence (20%), and source transparency (10%). Scores are verified quarterly by independent media analysts.",
      sources: [
        {
          name: "Consumer Reports",
          credibilityScore: 88,
          trackRecord: {
            factCheckAccuracy: 94,
            retractionRate: 0.5
          },
          biasPattern: {
            political: "center",
            economic: "moderate"
          },
          lastVerified: "2024-01-22"
        },
        {
          name: "Food Industry Weekly",
          credibilityScore: 75,
          trackRecord: {
            factCheckAccuracy: 81,
            retractionRate: 2.3
          },
          biasPattern: {
            political: "center",
            economic: "conservative"
          },
          lastVerified: "2024-01-21"
        },
        {
          name: "Eater",
          credibilityScore: 82,
          trackRecord: {
            factCheckAccuracy: 86,
            retractionRate: 1.4
          },
          biasPattern: {
            political: "left",
            economic: "progressive"
          },
          lastVerified: "2024-01-20"
        }
      ]
    }
  },
  "Tech": {
    subtitle: "Analyzing Innovation Cycle",
    sentiment: "Cautious",
    bias: "Tech-Optimist",
    summary: "Innovation is praised, but privacy concerns are dominating the narrative. Regulatory discussions are heating up in the EU and California.",
    atAGlance: "Breakthrough technologies are emerging rapidly, but regulatory frameworks are struggling to keep pace. Privacy and ethical concerns are central to public discourse.",
    commonGround: [
      "Innovation is advancing faster than regulation.",
      "Privacy concerns are shared across demographics.",
      "Both industry and regulators seek balanced solutions."
    ],
    officialSource: {
      title: "Regulatory Framework (PDF)",
      url: "#",
      source: "Tech Policy Institute"
    },
    coreDivergence: {
      title: "Sources disagree on whether AI surveillance enhances safety (Security View) or violates privacy (Privacy View).",
      description: "The core debate is about the trade-off between security and individual privacy rights."
    },
    perspectives: {
      left: {
        title: "CONSUMER RIGHTS",
        text: "Mass surveillance creates a chilling effect and violates fundamental privacy rights. The technology is being deployed without proper oversight.",
        source: "Privacy Watch"
      },
      right: {
        title: "MARKET/INDUSTRY",
        text: "AI surveillance prevents crime and saves lives. The technology is sophisticated enough to respect privacy while enhancing security.",
        source: "Tech Security Review"
      }
    },
    languageAnalysis: [
      {
        term: "Surveillance State",
        type: "Loaded Language",
        percentage: 65,
        usedBy: "Used by Consumer Orgs",
        color: "blue"
      },
      {
        term: "Smart Security",
        type: "Euphemism",
        percentage: 70,
        usedBy: "Used by Industry",
        color: "purple"
      }
    ],
    sourceCredibility: {
      methodology: "Credibility scores are calculated using a weighted algorithm that factors in fact-check accuracy (40%), retraction rate (30%), editorial independence (20%), and source transparency (10%). Scores are verified quarterly by independent media analysts.",
      sources: [
        {
          name: "Privacy Watch",
          credibilityScore: 79,
          trackRecord: {
            factCheckAccuracy: 85,
            retractionRate: 1.8
          },
          biasPattern: {
            political: "left",
            economic: "progressive"
          },
          lastVerified: "2024-01-19"
        },
        {
          name: "Tech Security Review",
          credibilityScore: 83,
          trackRecord: {
            factCheckAccuracy: 89,
            retractionRate: 1.1
          },
          biasPattern: {
            political: "center",
            economic: "moderate"
          },
          lastVerified: "2024-01-21"
        },
        {
          name: "Wired",
          credibilityScore: 86,
          trackRecord: {
            factCheckAccuracy: 91,
            retractionRate: 0.9
          },
          biasPattern: {
            political: "center",
            economic: "moderate"
          },
          lastVerified: "2024-01-20"
        }
      ]
    }
  },
  "Safety": {
    subtitle: "Analyzing Public Sentiment",
    sentiment: "Negative",
    bias: "Alarmist",
    summary: "Fear-based engagement is driving visibility. Data suggests the actual incident rate is lower than perceived, but viral clips are skewing public perception.",
    atAGlance: "Public safety concerns are heightened due to viral content, though statistical data shows mixed trends. The gap between perception and reality is significant.",
    commonGround: [
      "Public safety is a priority for all stakeholders.",
      "Data collection and analysis methods vary widely.",
      "Transparency in reporting is universally requested."
    ],
    officialSource: {
      title: "Safety Report (PDF)",
      url: "#",
      source: "Public Safety Bureau"
    },
    coreDivergence: {
      title: "Sources disagree on whether incidents are increasing (Media View) or perception is distorted by viral content (Data View).",
      description: "The debate centers on whether the problem is real or amplified by social media."
    },
    perspectives: {
      left: {
        title: "CONSUMER RIGHTS",
        text: "Viral videos expose real dangers that official statistics downplay. The incidents are happening more frequently than reported.",
        source: "Safety Watch"
      },
      right: {
        title: "MARKET/INDUSTRY",
        text: "Data shows incidents are actually decreasing. Viral clips create false perception. The real issue is media amplification.",
        source: "Data Analytics Inc"
      }
    },
    languageAnalysis: [
      {
        term: "Epidemic",
        type: "Loaded Language",
        percentage: 60,
        usedBy: "Used by Consumer Orgs",
        color: "blue"
      },
      {
        term: "Isolated Incidents",
        type: "Euphemism",
        percentage: 65,
        usedBy: "Used by Industry",
        color: "purple"
      }
    ],
    sourceCredibility: {
      methodology: "Credibility scores are calculated using a weighted algorithm that factors in fact-check accuracy (40%), retraction rate (30%), editorial independence (20%), and source transparency (10%). Scores are verified quarterly by independent media analysts.",
      sources: [
        {
          name: "Safety Watch",
          credibilityScore: 71,
          trackRecord: {
            factCheckAccuracy: 76,
            retractionRate: 2.8
          },
          biasPattern: {
            political: "left",
            economic: "progressive"
          },
          lastVerified: "2024-01-17"
        },
        {
          name: "Data Analytics Inc",
          credibilityScore: 87,
          trackRecord: {
            factCheckAccuracy: 93,
            retractionRate: 0.7
          },
          biasPattern: {
            political: "center",
            economic: "moderate"
          },
          lastVerified: "2024-01-22"
        },
        {
          name: "CityLab",
          credibilityScore: 80,
          trackRecord: {
            factCheckAccuracy: 84,
            retractionRate: 1.6
          },
          biasPattern: {
            political: "left",
            economic: "progressive"
          },
          lastVerified: "2024-01-18"
        }
      ]
    }
  },
  "Default": {
    subtitle: "Analyzing Context",
    sentiment: "Neutral",
    bias: "None Detected",
    summary: "This topic is currently developing. Early indicators suggest a moderate impact on the general discourse with steady engagement metrics.",
    atAGlance: "This story is still developing. Early analysis suggests moderate public interest with steady engagement across platforms.",
    commonGround: [
      "The story is actively being covered by multiple sources.",
      "Public interest is steady but not yet peaked.",
      "More information is expected to emerge."
    ],
    officialSource: {
      title: "Source Document (PDF)",
      url: "#",
      source: "Primary Source"
    },
    coreDivergence: {
      title: "Sources disagree on the primary cause and potential solutions.",
      description: "Multiple perspectives are emerging as the story develops."
    },
    perspectives: {
      left: {
        title: "CONSUMER RIGHTS",
        text: "The current system disadvantages consumers and needs reform.",
        source: "Consumer Voice"
      },
      right: {
        title: "MARKET/INDUSTRY",
        text: "Market forces are working as intended. Changes could disrupt efficiency.",
        source: "Industry Report"
      }
    },
    languageAnalysis: [
      {
        term: "Exploitation",
        type: "Loaded Language",
        percentage: 50,
        usedBy: "Used by Consumer Orgs",
        color: "blue"
      },
      {
        term: "Market Dynamics",
        type: "Euphemism",
        percentage: 55,
        usedBy: "Used by Industry",
        color: "purple"
      }
    ],
    sourceCredibility: {
      methodology: "Credibility scores are calculated using a weighted algorithm that factors in fact-check accuracy (40%), retraction rate (30%), editorial independence (20%), and source transparency (10%). Scores are verified quarterly by independent media analysts.",
      sources: [
        {
          name: "Consumer Voice",
          credibilityScore: 74,
          trackRecord: {
            factCheckAccuracy: 79,
            retractionRate: 2.2
          },
          biasPattern: {
            political: "left",
            economic: "progressive"
          },
          lastVerified: "2024-01-16"
        },
        {
          name: "Industry Report",
          credibilityScore: 77,
          trackRecord: {
            factCheckAccuracy: 83,
            retractionRate: 1.9
          },
          biasPattern: {
            political: "center",
            economic: "conservative"
          },
          lastVerified: "2024-01-19"
        }
      ]
    }
  }
};

