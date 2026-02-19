# Implementation Plan - EdTech Intelligence Dashboard

## Goal Description
教育業界、特に東進ハイスクールの戦略担当者に向けた、ニュース収集・分析ダッシュボードを構築します。
AIを活用して、一般的なニュース要約だけでなく、「自社（東進ハイスクール）への戦略的示唆」を提示することで、意思決定を支援します。

## User Review Required
> [!IMPORTANT]
> **データ構造とワイヤーフレームの提案**
> 本ドキュメント内の「Proposed Data Structure」および「Wireframe Proposal」をご確認ください。

## Proposed Changes

### Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Icons: Lucide-React
- Data Fetching: Simulated RSS/API (Initial Phase)

### Proposed Data Structure (日本語訳付き)

ニュース記事とAI分析結果を格納するデータ構造案です。

```typescript
// ニュースのカテゴリ分類
type NewsCategory =
  | 'UniversityEntrance' // 大学入試改革・動向
  | 'EdTech'             // 教育ICT利活用
  | 'Competitor'         // 競合他社動向 (河合塾, 駿台等)
  | 'Policy'             // 文科省・政策
  | 'Other';             // その他

// AIによる分析結果
interface AIAnalysis {
  background: string;           // 背景: なぜこのニュースが重要か
  summaryPoints: string[];      // 要点: 3点の箇条書き要約
  strategicImplications: string; // 戦略的示唆: 東進ハイスクール視点での影響・対策案
  relevanceScore: number;       // 関連度スコア (1-5): 戦略的重要度
  keywords: string[];           // 抽出キーワード
}

// ニュース記事本体
interface NewsArticle {
  id: string;
  title: string;          // 記事タイトル
  url: string;            // 元記事URL
  publishedAt: string;    // 公開日時 (ISO String)
  sourceName: string;     // 情報源 (例: 日本経済新聞, EdTechZine)
  category: NewsCategory; // カテゴリ
  // AI分析データ (ここが本アプリの核)
  analysis: AIAnalysis;
}
```

### Wireframe Proposal (画面構成案)

#### 1. Analyze Dashboard (メイン画面)
情報の洪水を防ぎ、戦略的に重要なニュースを一目で把握できるデザインにします。

- **Header Area**
  - **Logo**: "EdTech Intelligence"
  - **Search**: キーワード検索バー
  - **Date Filter**: 期間指定 (今日, 今週, 今月)

- **Highlights Section (Top)**
  - **"Strategic Alert"**: `relevanceScore` が 4以上の記事をカルーセル等で大きく表示。
  - **"Today's Insight"**: 今日のニュース全体の傾向をAIが一行で要約。

- **Main Feed (2 Column Layout)**
  - **Left: News Cards**
    - コンテンツ: タイトル, 媒体名, 日付, カテゴリタグ。
    - アクション: クリックで詳細展開。
  - **Right: AI Strategic Detail (Selected Article)**
    - 選択した記事の「東進ハイスクール視点の示唆」を常に表示。
    - **背景 (Context)**: 業界知識を踏まえた解説。
    - **要約 (Summary)**: 3つのポイント。
    - **提言 (Implication)**: 「模試事業への影響」「志望校対策講座への応用」など具体的なアクション案。

#### 2. Settings / Configuration
- **Keyword Management**: 監視対象キーワードの追加・削除。
- **Competitor Watchlist**: 競合予備校名の登録。

## Verification Plan

### Automated Tests
- コンポーネントのレンダリングテスト (Jest/React Testing Library)
- モックデータを用いた表示ロジックの検証

### Manual Verification
- **UI/UX Check**:
  - レスポンシブデザインの確認 (PC/Tablet想定)
  - ダークモード/ライトモードの視認性確認
- **Data Logic**:
  - カテゴリフィルタリングが正しく動作するか
  - 重要度スコア順にソートされているか
