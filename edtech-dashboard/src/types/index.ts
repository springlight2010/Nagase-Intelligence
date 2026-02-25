export type NewsCategory =
  | 'UniversityEntrance' // 大学入試改革・動向
  | 'EdTech'             // 教育ICT利活用
  | 'Competitor'         // 競合他社動向 (河合塾, 駿台等)
  | 'Policy'             // 文科省・政策
  | 'General'            // 塾・予備校
  | 'Other';             // その他

export type DateFilterType = "This Week" | "This Month" | "All Time";

export interface AIAnalysis {
  background: string;           // 背景: なぜこのニュースが重要か
  summaryPoints: string[];      // 要点: 3点の箇条書き要約
  strategicImplications: string; // 戦略的示唆: 東進ハイスクール視点での影響・対策案
  relevanceScore: number;       // 関連度スコア (1-5): 戦略的重要度
  keywords: string[];           // 抽出キーワード
}

export interface NewsArticle {
  id: string;
  title: string;          // 記事タイトル
  url: string;            // 元記事URL
  publishedAt: string;    // 公開日時 (ISO String)
  sourceName: string;     // 情報源 (例: 日本経済新聞, EdTechZine)
  category: NewsCategory; // カテゴリ
  content: string;        // 記事本文プレビュー (New)
  // AI分析データ (ここが本アプリの核)
  analysis: AIAnalysis;
}
