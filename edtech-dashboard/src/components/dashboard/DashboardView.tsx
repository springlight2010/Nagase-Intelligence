"use client";

import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { NewsList } from "./NewsList";
import { NewsDetail } from "./NewsDetail";
import { useRef } from "react";
import { useNewsData } from "@/hooks/useNewsData";
import { useBookmarks } from "@/hooks/useBookmarks"; // Import useBookmarks
import { RefreshCcw } from "lucide-react";
import { NewsCategory } from "@/types"; // Import NewsCategory

export default function DashboardView() {
    const {
        filteredArticles,
        isLoading,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        dateFilter,
        setDateFilter,
        lastUpdated
    } = useNewsData();

    const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
    const [viewMode, setViewMode] = useState<'all' | 'saved'>('all');

    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(10);

    // Determine which articles to show
    const displayedArticles = viewMode === 'saved'
        ? [...bookmarks].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        : filteredArticles;

    const handleSelectArticle = useCallback((id: string) => {
        setSelectedArticleId(id);
    }, []);

    const handleCategorySelect = (category: NewsCategory | 'Saved' | null) => {
        if (category === 'Saved') {
            setViewMode('saved');
            setSelectedCategory(null); // Clear underlying category filter to unlock list
        } else {
            setViewMode('all');
            setSelectedCategory(category as any);
        }
        setVisibleCount(10);
        setSelectedArticleId(null); // Reset selection on category change
    };

    // Auto-select first article and reset visible count only when list changes
    useEffect(() => {
        if (displayedArticles.length > 0 && !selectedArticleId) {
            handleSelectArticle(displayedArticles[0].id);
        }
        setVisibleCount(10);
        // Only run when list content changes, NOT when selection changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayedArticles]);

    // Force re-selection when switching modes if needed
    useEffect(() => {
        if (displayedArticles.length > 0) {
            // If current selection is not in list, select first
            const exists = displayedArticles.find(a => a.id === selectedArticleId);
            if (!exists) {
                handleSelectArticle(displayedArticles[0].id);
            }
        } else {
            setSelectedArticleId(null);
        }
    }, [viewMode, displayedArticles, handleSelectArticle, selectedArticleId]);


    const selectedArticle = displayedArticles.find(a => a.id === selectedArticleId) || null;

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
            <Sidebar
                className=""
                selectedCategory={viewMode === 'saved' ? 'Saved' : selectedCategory}
                onSelectCategory={handleCategorySelect}
            />

            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <Header
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    dateFilter={dateFilter}
                    onDateFilterChange={setDateFilter}
                />
                <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    {isLoading ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <RefreshCcw className="h-8 w-8 animate-spin mb-2" />
                            <p>Loading Latest EdTech Intelligence...</p>
                        </div>
                    ) : (
                        <div className="flex h-full gap-6">
                            <NewsList
                                articles={displayedArticles}
                                selectedArticleId={selectedArticleId}
                                onSelectArticle={handleSelectArticle}
                                searchQuery={searchQuery}
                                selectedCategory={viewMode === 'saved' ? 'Saved' : selectedCategory}
                                dateFilter={dateFilter}
                                visibleCount={visibleCount}
                                lastUpdated={lastUpdated}
                                onLoadMore={() => setVisibleCount(p => p + 10)}
                                isBookmarked={isBookmarked}
                                onToggleBookmark={toggleBookmark}
                            />
                            <div className="flex-1 h-full min-w-0">
                                <NewsDetail
                                    article={selectedArticle}
                                />
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}