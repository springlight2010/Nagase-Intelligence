# Task List: EdTech Intelligence Dashboard

## Phase 1: Design & Planning
- [x] データ構造とワイヤーフレームの提案 (`implementation_plan.md`) <!-- id: 0 -->
  - [x] Create `src/lib/gemini.ts`
  - [x] Add Retry Delay (1s) in `gemini.ts`
    - [x] Update Error Message in `useNewsData.ts`
  - [/] **Sidebar & Filtering Refactor**
    - [x] Change "Competitors" to "Categories" in Sidebar
    - [x] Implement Category Filtering (with localized labels)
    - [x] Verify Load More & Date Grouping work with filters
  - [/] **Data Freshness & Filtering**
    - [ ] Update `rss.ts` (Sort Descending, Cache Invalidation)
    - [ ] Fix Date Filter Logic (Today/Weekly/Monthly)
    - [ ] Ensure Category + Date Filter AND logic
  - [x] Fix 404 Model Error (Use `gemini-3-flash-preview` or `gemini-1.5-flash`)
  - [x] Refactor: On-Demand Analysis (Click) & Structured Output (📌, 🔍, 💡)
  - [x] Add Loading State in NewsDetail
  - [x] Implement Retry Logic (503/429 Handling) & Error Message
  - [/] Refine Prompt & Parsing (Fix "Not Found" issue)
- [ ] **UI Polish & Animations**
  - [/] **UI Refinements**
    - [ ] Add Article Content Preview in `NewsDetail`
    - [ ] Compact `NewsList` (Remove Analysis Preview)
    - [ ] Rebrand Sidebar to "Nagase Intelligence"

## Phase 2: Project Setup
- [x] Next.js プロジェクトの初期化 (TypeScript, Tailwind CSS) <!-- id: 2 -->
- [x] 必要なライブラリのインストール (Lucide-React, etc.) <!-- id: 3 -->
- [x] コンポーネント設計の策定 <!-- id: 4 -->

## Phase 3: Implementation
- [x] モックデータサービスの作成 (RSS/APIレスポンスのシミュレーション) <!-- id: 5 -->
- [x] アプリレイアウトの実装 (Sidebar, Header) <!-- id: 6 -->
- [x] ニュースカードコンポーネントの実装 (AI分析セクション含む) <!-- id: 7 -->
- [x] ダッシュボードメインフィードの実装 <!-- id: 8 -->
- [x] フィルター/検索ロジックの実装 <!-- id: 9 -->

## Phase 4: Refinement (Current)
- [x] コンテンツの刷新（情報I、競合、生成AI記事の追加） <!-- id: 10 -->
- [x] ニュースカードの表示更新（ナガセ視点の示唆を表示） <!-- id: 11 -->
- [x] RSSフィード連携機能の実装 (Google News) <!-- id: 12 -->
- [x] LLM(AI)によるリアルタイム考察生成の実装 <!-- id: 13 -->
## Phase 4: Refinement (Current)
- [x] コンテンツの刷新（情報I、競合、生成AI記事の追加） <!-- id: 10 -->
- [x] ニュースカードの表示更新（ナガセ視点の示唆を表示） <!-- id: 11 -->
- [x] RSSフィード連携機能の実装 (Google News) <!-- id: 12 -->
- [x] LLM(AI)によるリアルタイム考察生成の実装 <!-- id: 13 -->
- [x] 左メニュー（競合）によるフィルタリング実装 <!-- id: 14 -->
- [x] 検索バーと日付フィルタの実装 <!-- id: 15 -->
- [x] RSSソースの追加と件数増加 (Load More機能) <!-- id: 16 -->
- [x] 取得キーワードの精緻化と除外フィルタの実装 <!-- id: 17 -->
- [x] Gemini APIキー設定機能とクライアントサイドAI実装 <!-- id: 18 -->
- [ ] デザインの調整 (アニメーション, レスポンシブ確認) <!-- id: 19 -->
- [ ] 全体レビューとウォークスルー作成 <!-- id: 20 -->
