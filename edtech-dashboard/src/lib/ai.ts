import OpenAI from "openai";
import { AIAnalysis } from "@/types";

// Initialize OpenAI client
// Note: This requires OPENAI_API_KEY in environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy-key", // Prevent crash if missing, but calls will fail
    dangerouslyAllowBrowser: true // For prototype only, to allow client-side calls if needed (though we use server actions)
});

export async function generateAnalysis(
    title: string,
    snippet: string,
    keyword: string
): Promise<AIAnalysis | null> {
    if (!process.env.OPENAI_API_KEY) {
        console.warn("OPENAI_API_KEY is not set. Skipping AI analysis.");
        return null;
    }

    try {
        const prompt = `
    あなたは大学受験予備校「東進ハイスクール」（ナガセ）の経営戦略担当者です。
    以下のニュース記事（タイトルと概要）を分析し、東進ハイスクールにとっての戦略的示唆を導き出してください。

    # Input Data
    Keyword: ${keyword}
    Title: ${title}
    Snippet: ${snippet}

    # Output Format (JSON only)
    Please output valid JSON matching the following structure:
    {
      "background": "ニュースの背景（業界知識を踏まえて）",
      "summaryPoints": ["要点1", "要点2", "要点3"],
      "strategicImplications": "東進ハイスクールとしての具体的な注視点・対策案（「ナガセとしては...」等で始める）",
      "relevanceScore": 1-5 (Integer, 5 being most critical),
      "keywords": ["tag1", "tag2", "tag3"]
    }
    `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Use a fast, cost-effective model
            messages: [
                { role: "system", content: "You are a helpful AI assistant that outputs structured JSON." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content;
        if (!content) return null;

        const result = JSON.parse(content) as AIAnalysis;
        return result;

    } catch (error) {
        console.error("OpenAI Analysis Failed:", error);
        return null;
    }
}
