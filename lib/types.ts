export type Domain = "诗歌" | "噜噜" | "扣扣" | "肌肉猫" | "2076零" | "通用";

export type RecommendTag = "必读" | "重要" | "关注";

export type TrackTag = "量子计算" | "核能" | "AI芯片" | "宏观" | "地缘风险";

export interface ArticleAnalysis {
  eventNature: string;
  keyVariable: string;
  transmission: string;
  trap: string;
  falsifyPoint: string;
  profitOutlet: string;
  bull: string;
  bear: string;
}

export interface Article {
  id: number;
  title: string;
  titleZh: string | null;
  url: string;
  source: string;
  date: string;
  publishedAt: string | null;
  tags: string[];
  zeroEval: string;
  summary: string;
  recommendLevel: number;
  obiRef: string;
  analysis: ArticleAnalysis | null;
  pushedAt: string | null;
  pushedMorningAt: string | null;
  pushedEveningAt: string | null;
  createdAt: string;
  readAt: string | null;
}

export interface ObiCard {
  id: number;
  cardId: string;
  content: string;
  domain: Domain;
  layer: "00_SEED" | "01_BODY" | "02_LIVE" | "03_RUNTIME";
  source: string;
  date: string;
}

export interface Lesson {
  id: number;
  date: string;
  concept: string;
  explanation: string;
  example: string;
  source: string;
}

export interface UpdateRun {
  id: number;
  slot: "morning" | "evening";
  status: "success" | "error";
  collected: number;
  inserted: number;
  pushed: number;
  message: string;
  runAt: string;
}

export interface ApiSuccess<T> {
  data: T;
}

export interface ApiError {
  error: string;
}
