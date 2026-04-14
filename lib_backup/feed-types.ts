export const FEED_CATEGORIES = ["macro", "market", "civilization", "deep"] as const;
export const FEED_PRIORITIES = ["FLASH", "PRIORITY", "ROUTINE"] as const;
export const FEED_SOURCES = ["siqitian", "koukou", "fanpai", "manual"] as const;

export type FeedCategory = (typeof FEED_CATEGORIES)[number];
export type FeedPriority = (typeof FEED_PRIORITIES)[number];
export type FeedSource = (typeof FEED_SOURCES)[number];

export type FeedEntry = {
  id: string;
  source: FeedSource;
  category: FeedCategory;
  priority: FeedPriority;
  title: string;
  summary: string;
  content: string | null;
  url: string | null;
  tags: string[];
  confidence: number | null;
  createdAt: string;
  isRead: boolean;
  readingTime: string | null;
};

export type Briefing = {
  id: string;
  macroTrack: string;
  marketTrack: string;
  sentimentTrack: string;
  riskLevel: FeedPriority;
  vix: number | null;
  fearGreed: number | null;
  tnx: number | null;
  createdAt: string;
};

export type FeedInsertInput = {
  source: FeedSource;
  category: FeedCategory;
  priority: FeedPriority;
  title: string;
  summary: string;
  content?: string;
  url?: string;
  tags?: string[];
  confidence?: number;
  timestamp: string;
};

export type BriefingInsertInput = {
  macro_track: string;
  market_track: string;
  sentiment_track: string;
  risk_level: FeedPriority;
  vix?: number;
  fear_greed?: number;
  tnx?: number;
  timestamp: string;
};

export type FeedFilters = {
  category?: FeedCategory;
  priority?: FeedPriority;
  limit?: number;
};
