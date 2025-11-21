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
  "Entertainment": { subtitle: "Analyzing Cultural Impact", sentiment: "Mixed", bias: "Slightly Negative", summary: "Current discourse is heavily polarized. While fanbase engagement is at an all-time high, critical reception suggests potential burnout regarding this topic." },
  "Food": { subtitle: "Analyzing Market Trends", sentiment: "Positive", bias: "Neutral", summary: "This trend is driven by economic factors (inflation) rather than taste. Social sentiment is sympathetic, with high engagement on cost-saving alternatives." },
  "Tech": { subtitle: "Analyzing Innovation Cycle", sentiment: "Cautious", bias: "Tech-Optimist", summary: "Innovation is praised, but privacy concerns are dominating the narrative. Regulatory discussions are heating up in the EU and California." },
  "Safety": { subtitle: "Analyzing Public Sentiment", sentiment: "Negative", bias: "Alarmist", summary: "Fear-based engagement is driving visibility. Data suggests the actual incident rate is lower than perceived, but viral clips are skewing public perception." },
  "Default": { subtitle: "Analyzing Context", sentiment: "Neutral", bias: "None Detected", summary: "This topic is currently developing. Early indicators suggest a moderate impact on the general discourse with steady engagement metrics." }
};

