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
}

