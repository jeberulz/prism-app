export type PrismLens = 'raw' | 'explained' | 'debunked';

export interface LensData {
  raw: { title: string; summary: string };
  explained: { title: string; summary: string };
  debunked: { title: string; summary: string };
}

export interface Story {
  category: string;
  color: string;
  source: string;
  time: string;
  title: string;
  img: string;
  nuance: string | null;
  likeCount: string;
  lensData: LensData;
  hasVideo?: boolean;
}

export interface DiscoverItem {
  title: string;
  category: string;
  img: string;
  trend: string | null;
}

export interface AIContext {
  subtitle: string;
  sentiment: string;
  bias: string;
  summary: string;
  atAGlance?: string;
  commonGround?: string[];
  officialSource?: {
    title: string;
    url: string;
    source: string;
  };
  coreDivergence?: {
    title: string;
    description: string;
  };
  perspectives?: {
    left: {
      title: string;
      text: string;
      source: string;
    };
    right: {
      title: string;
      text: string;
      source: string;
    };
  };
  languageAnalysis?: {
    term: string;
    type: string;
    percentage: number;
    usedBy: string;
    color: 'blue' | 'purple';
  }[];
  sourceCredibility?: {
    methodology: string;
    sources: {
      name: string;
      credibilityScore: number;
      trackRecord: {
        factCheckAccuracy: number;
        retractionRate: number;
      };
      biasPattern: {
        political: 'left' | 'center' | 'right';
        economic: 'progressive' | 'moderate' | 'conservative';
      };
      lastVerified: string;
    }[];
  };
}

