import { NewsArticle } from "@/types";
import { fetchNewsFromRSS } from "./rss";

// Exporting mock data for fallback/reference if needed, but fetchNews will use RSS
export const mockNewsArticles: NewsArticle[] = [
    {
        id: "1",
        title: "共通テスト『情報I』、一部国立大で配点比率20%超えの方針発表",
        url: "#",
        publishedAt: new Date().toISOString(),
        sourceName: "大学入試センター広報",
        category: "UniversityEntrance",
        content: "2025年度入試より新設される『情報I』について、旧帝大を含む主要国立大学が配点方針を公表しました...",
        analysis: {
            background: "2025年度入試より新設される『情報I』について、旧帝大を含む主要国立大学が配点方針を公表。予想以上に『情報』重視の大学が出現しており、受験生の対策優先度が急上昇している。",
            summaryPoints: [
                "北海道大学・徳島大学などで高配点化の動き",
                "浪人生への経過措置はあるものの、現役生有利の傾向",
                "プログラミング未経験者の不安増大"
            ],
            strategicImplications: "【ナガセ注視点】東進の『情報I』講座および『全統模試』での情報科目のクオリティが、今年度の現役生獲得の決定打になる。特に高配点大学志望者への優先的なカリキュラム提案と、未習得者への短期集中講座の販促強化が必要。",
            relevanceScore: 5,
            keywords: ["情報I", "共通テスト配点", "2025年入試"]
        }
    },
    {
        id: "2",
        title: "河合塾、高1・2生向け模試を大幅リニューアル。CBT方式を標準化へ",
        url: "#",
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        sourceName: "教育産業ニュース",
        category: "Competitor",
        content: "河合塾が若年層からの囲い込みを強化するため、従来の記述模試に加え、タブレットを用いた即時採点型のCBT模試を導入...",
        analysis: {
            background: "河合塾が若年層からの囲い込みを強化。従来の記述模試に加え、タブレットを用いた即時採点型のCBT模試を標準ラインナップに追加する方針。",
            summaryPoints: [
                "返却期間を従来の1ヶ月から3日に短縮",
                "学習到達度の時系列分析機能を保護者アプリに提供",
                "学校単位での導入を目指す"
            ],
            strategicImplications: "【ナガセ注視点】東進CBT模試の「即日返却」というUSP（独自の強み）が脅かされる。東進は「診断」だけでなく「処方箋（AI演習）」までシームレスに繋がっている点を差別化としてより強く打ち出す必要がある。",
            relevanceScore: 4,
            keywords: ["CBT模試", "河合塾", "早期教育"]
        }
    },
    {
        id: "3",
        title: "生成AI活用『対話型個別指導AI』、atama+が一部教室で試験導入開始",
        url: "#",
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        sourceName: "EdTech Trends",
        category: "EdTech",
        content: "生徒の回答プロセスに対して「なぜそう考えたか？」を問いかけるコーチング型AIの実装が試験的に開始されました...",
        analysis: {
            background: "一方的な解説動画や単なるドリルではなく、生徒の回答プロセスに対して「なぜそう考えたか？」を問いかけるコーチング型AIの実装が進んでいる。",
            summaryPoints: [
                "生徒の思考の詰まりを検知し、ヒントを出し分け",
                "解法だけでなく学習意欲の維持もサポート",
                "人間の講師はメンタリングに特化"
            ],
            strategicImplications: "【ナガセ注視点】東進の映像授業×担任助手モデルに対する破壊的イノベーションになり得る。AIがティーチングを代替する中で、東進の担任助手の役割を「管理」から「動機付け・伴走」へどう進化させるか、現場オペレーションの再定義が急務。",
            relevanceScore: 5,
            keywords: ["生成AI", "atama+", "コーチング"]
        }
    }
];

export async function fetchNews(): Promise<NewsArticle[]> {
    // Use the real RSS fetcher
    // In a real app, you might want to cache this or handle errors more gracefully
    try {
        const rssData = await fetchNewsFromRSS();
        if (rssData.length > 0) {
            return rssData;
        }
    } catch (e) {
        console.error("RSS fetch failed, falling back to mock data", e);
    }

    // Fallback to static mock data if RSS fails or returns empty
    // (We'll re-include the static list here to ensure fallback works)
    return [
        {
            id: "1",
            title: "共通テスト『情報I』、一部国立大で配点比率20%超えの方針発表",
            url: "#",
            publishedAt: new Date().toISOString(),
            sourceName: "大学入試センター広報",
            category: "UniversityEntrance",
            content: "2025年度入試より新設される『情報I』について、旧帝大を含む主要国立大学が配点方針を公表しました...",
            analysis: {
                background: "2025年度入試より新設される『情報I』について、旧帝大を含む主要国立大学が配点方針を公表。予想以上に『情報』重視の大学が出現しており、受験生の対策優先度が急上昇している。",
                summaryPoints: [
                    "北海道大学・徳島大学などで高配点化の動き",
                    "浪人生への経過措置はあるものの、現役生有利の傾向",
                    "プログラミング未経験者の不安増大"
                ],
                strategicImplications: "【ナガセ注視点】東進の『情報I』講座および『全統模試』での情報科目のクオリティが、今年度の現役生獲得の決定打になる。特に高配点大学志望者への優先的なカリキュラム提案と、未習得者への短期集中講座の販促強化が必要。",
                relevanceScore: 5,
                keywords: ["情報I", "共通テスト配点", "2025年入試"]
            }
        },
        {
            id: "2",
            title: "河合塾、高1・2生向け模試を大幅リニューアル。CBT方式を標準化へ",
            url: "#",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            sourceName: "教育産業ニュース",
            category: "Competitor",
            content: "河合塾が若年層からの囲い込みを強化するため、従来の記述模試に加え、タブレットを用いた即時採点型のCBT模試を導入...",
            analysis: {
                background: "河合塾が若年層からの囲い込みを強化。従来の記述模試に加え、タブレットを用いた即時採点型のCBT模試を標準ラインナップに追加する方針。",
                summaryPoints: [
                    "返却期間を従来の1ヶ月から3日に短縮",
                    "学習到達度の時系列分析機能を保護者アプリに提供",
                    "学校単位での導入を目指す"
                ],
                strategicImplications: "【ナガセ注視点】東進CBT模試の「即日返却」というUSP（独自の強み）が脅かされる。東進は「診断」だけでなく「処方箋（AI演習）」までシームレスに繋がっている点を差別化としてより強く打ち出す必要がある。",
                relevanceScore: 4,
                keywords: ["CBT模試", "河合塾", "早期教育"]
            }
        },
        {
            id: "3",
            title: "生成AI活用『対話型個別指導AI』、atama+が一部教室で試験導入開始",
            url: "#",
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            sourceName: "EdTech Trends",
            category: "EdTech",
            content: "生徒の回答プロセスに対して「なぜそう考えたか？」を問いかけるコーチング型AIの実装が試験的に開始されました...",
            analysis: {
                background: "一方的な解説動画や単なるドリルではなく、生徒の回答プロセスに対して「なぜそう考えたか？」を問いかけるコーチング型AIの実装が進んでいる。",
                summaryPoints: [
                    "生徒の思考の詰まりを検知し、ヒントを出し分け",
                    "解法だけでなく学習意欲の維持もサポート",
                    "人間の講師はメンタリングに特化"
                ],
                strategicImplications: "【ナガセ注視点】東進の映像授業×担任助手モデルに対する破壊的イノベーションになり得る。AIがティーチングを代替する中で、東進の担任助手の役割を「管理」から「動機付け・伴走」へどう進化させるか、現場オペレーションの再定義が急務。",
                relevanceScore: 5,
                keywords: ["生成AI", "atama+", "コーチング"]
            }
        }
    ];
}
