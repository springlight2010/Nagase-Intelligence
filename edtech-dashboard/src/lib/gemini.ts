import { GoogleGenerativeAI } from "@google/generative-ai";

// Models to try in order of preference (Fastest -> Most Capable -> Experimental)
const MODELS = [
    "gemini-2.0-flash",     // Priority 1: User requested stable
    "gemini-1.5-flash",     // Priority 2: Fallback stable
    "gemini-2.0-flash-exp", // Priority 3: Latest experimental
];

export interface AIAnalysisResult {
    background: string;
    summaryPoints: string[];
    strategicImplications: string;
    relevanceScore: number;
}

export async function generateGeminiAnalysis(apiKey: string, title: string, content: string, context: string = "Education"): Promise<AIAnalysisResult | null> {
    const genAI = new GoogleGenerativeAI(apiKey);

    for (const modelName of MODELS) {
        try {
            console.log(`Gemini: Attempting with model "${modelName}"...`);
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.7,
                }
            });

            // Wait 2 seconds before EVERY attempt (including the first one if looping fast, but here mainly for retries)
            // User requested wait mechanism. To be safe/simple, we can wait 2s *after* a failure before continuing.
            // But user said "wait >2s interval". I will put it in catch block?
            // "各試行の間に...2秒以上の間隔を空けてください" -> wait after failure.

            // Ultra-Lightweight Japanese Prompt (User Request Match)
            const prompt = `
以下の教育ニュースを、民間教育機関（ナガセ）の視点で、注視すべき理由を3点以内で簡潔に述べよ。
Output correct JSON.

記事タイトル: ${title}
記事本文: ${content.substring(0, 250)}

JSON Schema:
{
  "background": "ニュースの背景（1文）",
  "summaryPoints": ["理由1", "理由2", "理由3"],
  "strategicImplications": "ナガセへの示唆（1文）",
  "relevanceScore": 3
}
`;

            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            // Extract JSON
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("No JSON found in response");

            const parsed = JSON.parse(jsonMatch[0]);

            return {
                background: parsed.background || "分析データを取得できませんでした。",
                summaryPoints: parsed.summaryPoints?.slice(0, 3) || [],
                strategicImplications: parsed.strategicImplications || "特になし",
                relevanceScore: parsed.relevanceScore || 3
            };

        } catch (error) {
            console.warn(`Gemini: Failed with ${modelName}. Retrying in 2s...`, error);
            // Wait 2 seconds before next model
            await new Promise(resolve => setTimeout(resolve, 2000));
            continue;
        }
    }

    console.error("Gemini: All models failed.");

    // Silent Fail: Return special object indicating failure but not crashing app
    return {
        background: "分析エラー (All Models Failed)",
        summaryPoints: ["【現在AIが混雑しています】", "しばらく時間を置いてから再度クリックしてください。"],
        strategicImplications: "AI分析を完了できませんでした。時間をおいて再試行してください。",
        relevanceScore: 0
    };
}
