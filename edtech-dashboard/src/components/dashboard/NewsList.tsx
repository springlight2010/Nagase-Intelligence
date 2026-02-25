"use client";

import { NewsArticle } from "@/types";
import { NewsCard } from "./NewsCard";

interface NewsListProps {
    articles: NewsArticle[];
    selectedArticleId: string | null;
    onSelectArticle: (id: string) => void;
    searchQuery: string;
    selectedCategory: string | null;
    dateFilter: string;
    visibleCount: number;
    lastUpdated: string | null;
    onLoadMore: () => void;
    isBookmarked: (id: string) => boolean;
    onToggleBookmark: (article: NewsArticle) => void;
}

export function NewsList({
    articles,
    selectedArticleId,
    onSelectArticle,
    searchQuery,
    selectedCategory,
    dateFilter,
    visibleCount,
    lastUpdated,
    onLoadMore,
    isBookmarked,
    onToggleBookmark
}: NewsListProps) {
    const displayedArticles = articles.slice(0, visibleCount);

    const getCategoryLabel = (cat: string) => {
        const map: Record<string, string> = {
            'UniversityEntrance': '大学入試',
            'Competitor': '競合動向',
            'EdTech': '教育DX',
            'Policy': '文科省・政策',
            'Saved': 'Saved Items'
        };
        return map[cat] || cat;
    };

    return (
        <div className="w-1/3 flex flex-col min-w-[320px] max-w-[400px]">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        {selectedCategory && (
                            <span className={`text-sm px-2 py-0.5 rounded ${selectedCategory === 'Saved'
                                    ? "bg-indigo-100 text-indigo-800"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}>
                                {getCategoryLabel(selectedCategory)}
                            </span>
                        )}
                        {searchQuery && (
                            <span className="bg-slate-200 text-slate-700 text-sm px-2 py-0.5 rounded">
                                Search: "{searchQuery}"
                            </span>
                        )}
                        {!selectedCategory && !searchQuery && (
                            <span>
                                Latest News <span className="text-xs text-slate-400 font-normal ml-2">({articles.length} items fetched)</span>
                            </span>
                        )}
                    </h2>
                    {lastUpdated && (
                        <p className="text-[10px] text-slate-400 mt-0.5">
                            Last Updated: {lastUpdated}
                        </p>
                    )}
                </div>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {displayedArticles.length} / {articles.length}
                </span>
            </div>

            {/* Info Input Key Warning - REMOVED for CSV Mode */}

            {articles.length === 0 ? (
                <div className="text-slate-400 text-sm p-8 text-center border border-dashed rounded-lg bg-slate-50/50">
                    {selectedCategory === 'Saved'
                        ? "No saved articles yet. Bookmark news to see them here."
                        : "No updates found matching your filters."}
                </div>
            ) : (
                <div className="space-y-2 overflow-y-auto pr-2 pb-4 flex-1">
                    {displayedArticles.map((article, index) => {
                        const currentDate = new Date(article.publishedAt).toLocaleDateString();
                        const prevDate = index > 0
                            ? new Date(displayedArticles[index - 1].publishedAt).toLocaleDateString()
                            : null;
                        const showDate = currentDate !== prevDate;

                        return (
                            <div key={article.id} className={showDate ? "mt-6" : ""}>
                                {showDate && (
                                    <div className="text-xs font-bold text-slate-400 mb-2 pl-1">
                                        {currentDate}
                                    </div>
                                )}
                                <NewsCard
                                    article={article}
                                    isSelected={article.id === selectedArticleId}
                                    onClick={() => onSelectArticle(article.id)}
                                    isBookmarked={isBookmarked(article.id)}
                                    onToggleBookmark={() => onToggleBookmark(article)}
                                />
                            </div>
                        );
                    })}

                    {/* Load More Button */}
                    {visibleCount < articles.length && (
                        <div className="pt-4">
                            <button
                                onClick={onLoadMore}
                                className="w-full py-3 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-dashed border-slate-300"
                            >
                                Load More News...
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
