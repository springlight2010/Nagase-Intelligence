import { NewsArticle } from "@/types";
import { Lightbulb, Target, BookOpen, ArrowRight } from "lucide-react";

interface NewsDetailProps {
    article: NewsArticle | null;
}

export function NewsDetail({ article }: NewsDetailProps) {
    if (!article) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 p-8">
                <BookOpen className="h-12 w-12 mb-4 opacity-20" />
                <p>Select an article to view AI Intelligence</p>
            </div>
        );
    }

    const { analysis } = article;
    const isAnalyzed = analysis.relevanceScore > 0;

    return (
        <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header Image or Gradient */}
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-400" />

            <div className="p-6 overflow-y-auto flex-1">
                {/* Title Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2 leading-tight">
                        {article.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="font-medium text-emerald-600">{article.sourceName}</span>
                        <span>•</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-auto flex items-center gap-1 text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                            Read Original <ArrowRight className="h-3 w-3" />
                        </a>
                    </div>
                </div>

                {/* Article Content Preview */}
                <div className="mb-8 p-5 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-slate-500 text-sm leading-relaxed mb-2 font-medium whitespace-pre-wrap">
                        {article.content || <span className="text-slate-400 italic">本文を取得中、またはデータがありません</span>}
                    </p>
                    {/* Read More Link */}
                    <a href={article.url} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 hover:underline">
                        Read full article
                    </a>
                </div>

                {/* AI Analysis Sections */}
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">

                    {/* 1. ナガセとしての注視点 */}
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 relative">
                        <h3 className="flex items-center gap-2 text-indigo-900 font-bold mb-3">
                            <Target className="h-5 w-5 text-indigo-600" />
                            ナガセとしての注視すべき点
                        </h3>
                        <div className="text-indigo-900 leading-relaxed font-medium whitespace-pre-wrap" style={{ whiteSpace: 'pre-wrap' }}>
                            {article.analysis?.strategicImplications || "No analysis provided."}
                        </div>
                    </div>

                    {/* 2. 背景・文脈 */}
                    {article.analysis?.background && (
                        <div className="bg-white border border-slate-100 rounded-xl p-5">
                            <h3 className="flex items-center gap-2 text-slate-700 font-bold mb-3">
                                <BookOpen className="h-5 w-5 text-slate-400" />
                                背景・文脈
                            </h3>
                            <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {article.analysis.background}
                            </div>
                        </div>
                    )}

                    {/* 3. 戦略的アクション */}
                    {article.analysis?.summaryPoints && article.analysis.summaryPoints.length > 0 && (
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                            <h3 className="flex items-center gap-2 text-amber-800 font-bold mb-3">
                                <Lightbulb className="h-5 w-5 text-amber-500" />
                                戦略的アクション
                            </h3>
                            <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {article.analysis.summaryPoints[0]}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    {article.analysis?.keywords && article.analysis.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4">
                            {article.analysis.keywords.map((kw: string) => (
                                <span key={kw} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                    #{kw}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
