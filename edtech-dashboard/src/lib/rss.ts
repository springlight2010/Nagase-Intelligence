"use client";

import { NewsArticle, NewsCategory } from "@/types";

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vToAMT7brEGGyIhwHkFrrHaWOJ--Z2Et4dOB1t77Vf923-Ksbz66E-pNhi_0xLuyduPtmjWjPRFl7lo/pub?gid=0&single=true&output=csv";

function splitCSVLine(line: string): string[] {
    const result = [];
    let cur = "";
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' && line[i + 1] === '"') {
            cur += '"'; i++;
        } else if (char === '"') {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            result.push(cur);
            cur = "";
        } else {
            cur += char;
        }
    }
    result.push(cur);
    return result;
}

function parseCSV(text: string) {
    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);

    const parsed = lines.slice(1).map((line, i) => {
        const clean = splitCSVLine(line).map(c => c.replace(/^"|"$/g, '').trim());

        const rawDate = clean[0];
        const categoryJP = clean[1]; // スプシ上の日本語カテゴリ
        const title = clean[2];
        const content = clean[3];
        const analysis = clean[4];
        const url = clean[5];

        // --- カテゴリを日本語からシステム用の英語IDに変換 (色とフィルタのため) ---
        let category: NewsCategory = "Other";
        if (categoryJP === "大学入試") category = "UniversityEntrance";
        else if (categoryJP === "教育DX") category = "EdTech";
        else if (categoryJP === "教育政策") category = "Policy";
        else if (categoryJP === "競合動向") category = "Competitor";
        else if (categoryJP === "塾・予備校") category = "General";

        // 日付の解析
        let finalDate = new Date();
        if (rawDate) {
            const d = new Date(rawDate.replace(/-/g, '/'));
            if (!isNaN(d.getTime())) {
                finalDate = d;
            }
        }

        return {
            id: `article-${i}-${finalDate.getTime()}`,
            publishedAt: finalDate.toISOString(),
            category: category, // ここを英語IDに
            title: title || "タイトルなし",
            content: (content || "").replace(/\[BR\]/g, '\n'),
            url: url || "#",
            sourceName: "Google News",
            analysis: {
                strategicImplications: (analysis || "").replace(/\[BR\]/g, '\n'),
                relevanceScore: 3,
                keywords: []
            }
        } as NewsArticle;
    });

    // --- 【修正1】最新の日付順にソートして返す ---
    return parsed.sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function fetchNewsFromRSS(): Promise<NewsArticle[]> {
    try {
        const response = await fetch(SHEET_CSV_URL, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const text = await response.text();
        return parseCSV(text);
    } catch (error: any) {
        console.error("Fetch Error:", error);
        return [];
    }
}